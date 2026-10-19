# lurie-guard

[English](README.md) | **Português**

**Uma GitHub Action que revisa pull requests em busca dos erros que causam incidentes em produção e custo de nuvem, com evidência medida por trás de cada regra.**

> Status: **MVP em desenvolvimento, pré-release** (`0.1.0`, ainda sem tag nem publicação). O pacote PostgreSQL está construído e testado: 21 regras, o engine, as quatro saídas, a CLI. Ainda não rodou em um repositório real; os pilotos vêm a seguir ([docs/ROADMAP.md](docs/ROADMAP.md)). Os documentos em [`docs/`](docs/) são a especificação que o código segue.

A maioria dos incidentes de banco começa com uma migration que parecia boa na revisão: um `CREATE INDEX` que segura um lock `SHARE` na tabela de pedidos durante toda a construção, um `ALTER TABLE` enfileirado atrás de um relatório longo enquanto toda consulta nova enfileira atrás dele, um `SET NOT NULL` que varre cem milhões de linhas sob `ACCESS EXCLUSIVE`. O manual do PostgreSQL documenta cada um deles. O PR é aprovado mesmo assim.

O lurie-guard analisa as migrations de um PR com o próprio parser do PostgreSQL, aplica regras determinísticas e diz ao desenvolvedor o que vai acontecer, o que escrever no lugar e quando a regra não se aplica. Cada regra aponta para um teste em [db-skills](https://github.com/rafapeixer/db-skills) que roda contra PostgreSQL 15 e 18 de verdade e mostra o lock, a reescrita ou a varredura que ela evita.

## O que ele faz

```yaml
# .github/workflows/lurie-guard.yml
name: lurie-guard
on:
  pull_request:
permissions:
  contents: read          # ler o diff e a configuração
  pull-requests: write    # publicar os comentários de revisão
  security-events: write  # usado só quando você opta pelo envio ao code scanning (veja SARIF abaixo)
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
- **SARIF** 2.1.0 escrito em toda execução, com fingerprints estáveis e a documentação da regra. O envio ao code scanning é opcional (`outputs: {sarif: true}` no `.lurie-guard.yml`, ou o input `upload_sarif: true`): ele adiciona o histórico na aba Security, e o GitHub também comenta cada achado no PR, ao lado do comentário do lurie-guard ([ADR 0011](docs/adr/0011-sarif-upload-opt-in.md)).
- **Um resumo do job** com todos os achados, todas as supressões e seus motivos.
- **Só relata, por padrão.** Todo achado é relatado e o check passa. Quando você confiar nos achados, adicione `fail_on: error` ao `.lurie-guard.yml` e os erros bloqueiam o merge; o arquivo é lido do branch base para que um PR não consiga desligar as próprias verificações ([ADR 0007](docs/adr/0007-report-only-default.md)).

  ```yaml
  # .lurie-guard.yml (opcional)
  version: 1
  fail_on: error     # bloqueia o merge em achados error; o padrão é none (só relata)
  ```
- **Supressão inline com motivo**: `-- lurie-guard: ignore PG001 reason="orders é nova nesta release"`. Uma supressão sem motivo é relatada e não suprime nada; uma supressão sem uso também é relatada.
- **Sem servidor, sem telemetria.** O código nunca sai do runner. O único host que a action contata é `api.github.com`; com a sua própria chave da Anthropic, também `api.anthropic.com`, de dentro do seu runner e sob os termos da sua API, e a explicação que ela adiciona nunca decide se um achado existe.

### O que funciona no MVP

| Peça | Estado |
|---|---|
| Parser | O próprio parser do PostgreSQL (`libpg_query` 18, WebAssembly), instruções posicionadas no arquivo de origem; um arquivo que não parseia gera um achado `info` e a execução continua |
| Regras | As 21 regras abaixo, cada uma com fixtures `bad`/`good`, um link de evidência para o db-skills em um commit fixo e (para regras `error`) um teste de custo que roda em PostgreSQL 15 e 18 |
| Exceção de "tabela existente" | Uma tabela criada por `CREATE TABLE` em qualquer arquivo de migration adicionado no PR é nova; as regras PG001 a PG015 a ignoram |
| Frameworks | Transação por framework (tabela abaixo, goose incluído), `.conf` do Flyway, `runInTransaction` do Liquibase, `disable_ddl_transaction!` do Rails, `atomic = False` do Django, `autocommit_block()` do Alembic, `transaction:false` do dbmate |
| Linguagens hospedeiras | SQL bruto de `execute` (Rails), `RunSQL` (Django), `op.execute` (Alembic); os helpers do Rails `add_index`, `add_column`, `add_foreign_key`, `change_column_null`, `change_column` (mais `create_table`, `drop_table`, `remove_column`, `rename_column`, `rename_table`) mapeados para SQL; todo o resto listado como "não analisado" |
| Configuração | `.lurie-guard.yml` lido do branch base; chaves, ids de regra ou severidades desconhecidas falham a execução nomeando a chave |
| Saídas | Uma revisão por execução com sugestões de alteração e fingerprints idempotentes; SARIF 2.1.0 validado contra o schema, com `partialFingerprints` e supressões in-source, enviado pela action quando se opta por isso (ADR 0011); resumo do job; anotações; outputs e código de saída |
| PRs de fork | Resumo, anotações e código de saída; comentários e upload pulados (o token é somente leitura) |
| Explicador | Opcional, com a sua chave, o texto da skill da regra como contexto em cache, custo mostrado no resumo. Implementado e testado com um cliente falso; ainda não exercitado contra a API real |
| CLI | `node dist/cli.js` (em breve `npx lurie-guard`): o mesmo engine sobre uma pasta ou uma lista de arquivos, para varrer o histórico |
| Ainda não | Chamadas DSL de Django e Alembic (`AddField`, `op.add_column`, ...) esperam o primeiro piloto que pedir ([ADR 0008](docs/adr/0008-host-language-migrations-mvp-scope.md)); o teste de aceitação com proxy de saída roda só no CI, depois de publicar o repositório |

### Frameworks

| Framework | Arquivos | Envolvido em transação | Opt-out que o detector reconhece | SQL analisado |
|---|---|---|---|---|
| SQL puro | `**/migrations/**/*.sql`, `**/db/migrations/**/*.sql`, `**/sql/migrations/**/*.sql` (em qualquer profundidade, então `services/<nome>/migrations/` funciona) | Não (ou `transaction: always`) | `BEGIN`/`COMMIT` explicitam a região envolvida | Todo |
| Flyway | `**/db/migration/V*__*.sql`, `R*__*.sql` | Sim | `<arquivo>.sql.conf` com `executeInTransaction=false` | Todo |
| Liquibase | `**/changelog/**/*.sql` com o cabeçalho `--liquibase formatted sql` | Sim | `--changeset ... runInTransaction:false` | Todo |
| Rails | `db/migrate/*.rb` | Sim | `disable_ddl_transaction!` | Strings e heredocs de `execute`; os helpers acima |
| Django | `**/migrations/[0-9]*.py` | Sim | `atomic = False` | Strings e listas de `RunSQL` |
| Alembic | `**/versions/*.py` | Sim | `autocommit_block()`, um `COMMIT` explícito | Strings e `text()` de `op.execute` |
| Prisma | `prisma/migrations/*/migration.sql` | Sim, sem opt-out | - | Todo |
| golang-migrate | `**/*.up.sql` (`*.down.sql` com `analyze_down`) | Não | - | Todo |
| dbmate | `db/migrations/*.sql` com `-- migrate:up` | Sim | `-- migrate:up transaction:false` | Todo |
| Sqitch | `deploy/*.sql` | Sim | - | Todo |
| goose | qualquer `*.sql` com `-- +goose Up` | Sim | `-- +goose NO TRANSACTION` no topo | A seção Up |

Saída de build, dependências e VCS é ignorada por padrão (`target/`, `build/`, `.gradle/`, `out/`, `bin/`, `obj/`, `dist/`, `node_modules/`, `vendor/`, `.venv/`, `venv/`, `__pycache__/`, `.tox/`, `.git/`), então uma migration do Flyway copiada para `target/classes/` não é relatada duas vezes; `exclude` estende essa lista e `default_excludes: false` a desliga. Seções de rollback (`Down` do goose, `migrate:down` do dbmate, `*.down.sql`, `def down` do Rails, `downgrade()` do Alembic) não são analisadas por padrão, porque um rollback reverte a migration e seus drops são por natureza; `analyze_down: true` as liga ([ADR 0013](docs/adr/0013-goose-and-rollback-sections.md)). `paths`, `exclude`, `framework` e `transaction` no `.lurie-guard.yml` sobrescrevem todos os padrões. `datetime` do Rails mapeia para `timestamp(6)`, o padrão do framework; uma aplicação que define `datetime_type = :timestamptz` desliga a PG019.

### Rode localmente

```sh
npm ci && npm run build
node dist/cli.js --root . db/migrate/20261019120000_add_index.rb   # um ou mais arquivos
node dist/cli.js --root . --format sarif --out findings.sarif        # toda migration sob a raiz
node dist/cli.js --root . --fail-on error                            # sai com 1 em erros
```

A CLI é o mesmo bundle da action e lê o mesmo `.lurie-guard.yml`; é como os pilotos varrem o histórico de um repositório.

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
| PG011 | `ALTER COLUMN ... TYPE` que reescreve a tabela | warning | pg-online-migrations |
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
