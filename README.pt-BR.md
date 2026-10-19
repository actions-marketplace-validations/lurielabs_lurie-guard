# lurie-guard

[English](README.md) | **Português**

**Uma GitHub Action que revisa pull requests em busca dos erros que causam incidentes em produção e custo de nuvem, com evidência medida por trás de cada regra.**

> Status: **em design**. Ainda não há código do produto. Os documentos em [`docs/`](docs/) são a especificação; a primeira release segue o que está neles.

A maioria dos incidentes de banco começa com uma migration que parecia boa na revisão: um `CREATE INDEX` que segura um lock `SHARE` na tabela de pedidos durante toda a construção, um `ALTER TABLE` enfileirado atrás de um relatório longo enquanto toda consulta nova enfileira atrás dele, um `SET NOT NULL` que varre cem milhões de linhas sob `ACCESS EXCLUSIVE`. O manual do PostgreSQL documenta cada um deles. O PR é aprovado mesmo assim.

O lurie-guard analisa as migrations de um PR com o próprio parser do PostgreSQL, aplica regras determinísticas e diz ao desenvolvedor o que vai acontecer, o que escrever no lugar e quando a regra não se aplica. Cada regra aponta para um teste em [db-skills](https://github.com/rafapeixer/db-skills) que roda contra PostgreSQL 15 e 18 de verdade e mostra o lock, a reescrita ou a varredura que ela evita.

## O que ele vai fazer

```yaml
# .github/workflows/lurie-guard.yml
name: lurie-guard
on:
  pull_request:
permissions:
  contents: read          # ler o diff e a configuração
  pull-requests: write    # publicar os comentários de revisão
  security-events: write  # enviar o SARIF para o code scanning
jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7          # fixe em um SHA de commit no seu repositório
      - uses: lurielabs/lurie-guard@v1       # fixe em um SHA de commit no seu repositório
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}   # opcional: explicações em linguagem simples com a sua própria chave
```

- **Comentários de revisão** na linha exata, com uma sugestão de alteração quando a correção é uma única instrução.
- **SARIF** enviado ao code scanning do GitHub, com fingerprints estáveis e a documentação da regra.
- **Um resumo do job** com todos os achados, todas as supressões e seus motivos.
- **Bloqueio do merge** em erros (`fail_on: error`), configurável por regra em `.lurie-guard.yml`, lido do branch base para que um PR não consiga desligar as próprias verificações.
- **Supressão inline com motivo**: `-- lurie-guard: ignore PG001 reason="orders é nova nesta release"`.
- **Sem servidor, sem telemetria.** O código nunca sai do runner. Com a sua própria chave da Anthropic, a explicação opcional roda dentro do seu runner, sob os termos da sua API.

## Regras (pacote PostgreSQL, MVP)

Toda regra corresponde a uma skill testada do db-skills. `error` significa que um fixture medido mostra o lock, a reescrita, a varredura ou a falha; `warning` significa um custo documentado com exceções comuns; `info` fica desligada por padrão.

| Id | Regra | Severidade | Skill |
|---|---|---|---|
| PG001 | `CREATE INDEX` sem `CONCURRENTLY` em tabela existente | error | [pg-online-migrations](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-online-migrations/SKILL.md) |
| PG002 | `DROP INDEX` sem `CONCURRENTLY` | error | pg-online-migrations |
| PG003 | `CONCURRENTLY` dentro de transação (explícita ou do framework: Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate) | error | pg-online-migrations |
| PG004 | DDL que toma lock pesado sem `SET lock_timeout` | warning | pg-online-migrations |
| PG005 | `ADD COLUMN` que reescreve a tabela (default volátil, coluna gerada stored, identity) | error | pg-online-migrations |
| PG006 | `ADD COLUMN ... NOT NULL` sem default em tabela existente | error | pg-online-migrations |
| PG007 | `SET NOT NULL` sem um `CHECK (col IS NOT NULL)` validado (ou o caminho `NOT VALID` do PG 18) | error | pg-online-migrations |
| PG008 | `ADD FOREIGN KEY` sem `NOT VALID` | error | pg-online-migrations |
| PG009 | `ADD CHECK` sem `NOT VALID` | error | pg-online-migrations |
| PG010 | `VALIDATE CONSTRAINT` na mesma transação do `ADD ... NOT VALID` | error | pg-online-migrations |
| PG011 | `ALTER COLUMN ... TYPE` que reescreve a tabela | error | pg-online-migrations |
| PG012 | `ADD UNIQUE` / `ADD PRIMARY KEY` sem `USING INDEX` | error | pg-online-migrations |
| PG013 | `RENAME COLUMN` / `RENAME TABLE` em um passo só | warning | pg-online-migrations |
| PG014 | `DROP COLUMN` / `DROP TABLE` | warning | pg-online-migrations |
| PG015 | `VACUUM FULL`, `CLUSTER`, `REINDEX` sem `CONCURRENTLY` | error | [pg-vacuum-and-bloat](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-vacuum-and-bloat/SKILL.md) |
| PG016 | `CREATE INDEX CONCURRENTLY IF NOT EXISTS` (pula um índice inválido de uma construção que falhou) | warning | pg-online-migrations |
| PG017 | Chave primária `serial` / `integer` | warning | [pg-keys-and-types](https://github.com/rafapeixer/db-skills/blob/main/skills/pg-keys-and-types/SKILL.md) |
| PG018 | Chave primária UUID aleatória (`gen_random_uuid()`, `uuid_generate_v4()`) | warning | pg-keys-and-types |
| PG019 | `timestamp` sem fuso horário | warning | pg-keys-and-types |
| PG020 | Coluna `json` em vez de `jsonb` | warning | pg-keys-and-types |
| PG021 | `varchar(n)` / `char(n)` | info | pg-keys-and-types |

A lógica de detecção completa, as mensagens, as exceções e os fixtures estão em [docs/SPEC-MVP.md](docs/SPEC-MVP.md).

## Comparação honesta

O [Squawk](https://github.com/sbdchd/squawk) já faz lint de SQL de migrations PostgreSQL com 78 regras, é gratuito, mantido ativamente e cobre a maior parte da lista acima. Se você quer um linter de arquivos SQL com comentário no PR hoje, use-o. O lurie-guard difere na evidência por regra, na detecção de transação por framework (Flyway, Rails, Django, Prisma), no SARIF e nas sugestões de alteração, na camada opcional de explicação e nos pacotes que vêm a seguir (MySQL, Java, Go) a partir dos repositórios irmãos. A comparação completa, incluindo Atlas, Eugene, strong_migrations e os revisores de IA, está em [docs/COMPETITION.md](docs/COMPETITION.md).

## Documentos

| Documento | O que diz |
|---|---|
| [docs/VISION.md](docs/VISION.md) | O problema, quem paga, por que agora, como é o sucesso |
| [docs/SPEC-MVP.md](docs/SPEC-MVP.md) | O MVP preciso: regras, configuração, supressão, saídas, critérios de aceitação |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Componentes, runtime, fluxo de dados, modelo de segurança, como os pacotes se encaixam |
| [docs/RULES.md](docs/RULES.md) | O padrão de autoria de regras: fixtures, evidência, severidade, falsos positivos |
| [docs/ROADMAP.md](docs/ROADMAP.md) | Fases com critérios de saída, pilotos, pacotes, o plano de skills por linguagem |
| [docs/COMPETITION.md](docs/COMPETITION.md) | O que existe e onde o lurie-guard compete e onde não compete |
| [docs/adr/](docs/adr/) | Um registro de decisão por decisão-chave |
| [CLAUDE.md](CLAUDE.md) | Como agentes e contribuidores trabalham neste repositório |

## Repositórios irmãos

- [db-skills](https://github.com/rafapeixer/db-skills): skills de PostgreSQL e MySQL com exemplos testados em bancos reais. A evidência deste pacote.
- [go-skills](https://github.com/rafapeixer/go-skills) e [java-skills](https://github.com/rafapeixer/java-skills): skills de linguagem com evals e benchmarks de carga. A evidência dos pacotes que vêm a seguir.

## Licença

Apache-2.0. Veja [LICENSE](LICENSE) e [docs/adr/0006-license.md](docs/adr/0006-license.md).
