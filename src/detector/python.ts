// Django and Alembic migrations: raw SQL from `RunSQL` and `op.execute`
// string literals, plus the transaction opt-outs. DSL operations (AddField,
// op.add_column, ...) are listed as not analyzed in this release (ADR 0008).
import type { Node } from 'web-tree-sitter';
import type { HostExtraction } from './ruby.js';
import { hostParser } from './treesitter.js';

function stringLiteral(n: Node): { text: string; line: number } | undefined {
  if (n.type === 'string') {
    const start = n.namedChildren.find((c) => c?.type === 'string_start');
    if (start && /[fF]/.test(start.text)) return undefined; // f-string: not a literal
    if (n.namedChildren.some((c) => c && c.type === 'interpolation')) return undefined;
    const content = n.namedChildren.filter((c): c is Node => c !== null && c.type === 'string_content');
    const text = content.map((c) => c.text).join('');
    const line = (content[0] ?? n).startPosition.row + 1;
    return { text, line };
  }
  if (n.type === 'concatenated_string') {
    const parts = n.namedChildren.filter((c): c is Node => c !== null && c.type === 'string');
    const lits = parts.map(stringLiteral);
    if (lits.some((l) => l === undefined) || lits.length === 0) return undefined;
    return { text: lits.map((l) => l!.text).join(''), line: lits[0]!.line };
  }
  if (n.type === 'parenthesized_expression') {
    const inner = n.namedChildren.filter((c): c is Node => c !== null);
    return inner.length === 1 ? stringLiteral(inner[0]) : undefined;
  }
  if (n.type === 'call') {
    // sqlalchemy.text("...")
    const fn = n.childForFieldName('function');
    const fnName = fn?.type === 'attribute' ? fn.childForFieldName('attribute')?.text : fn?.text;
    if (fnName !== 'text') return undefined;
    const args = n.childForFieldName('arguments')?.namedChildren.filter((c): c is Node => c !== null) ?? [];
    return args.length >= 1 ? stringLiteral(args[0]) : undefined;
  }
  return undefined;
}

function functionName(call: Node): { full: string; last: string } | undefined {
  const fn = call.childForFieldName('function');
  if (!fn) return undefined;
  if (fn.type === 'identifier') return { full: fn.text, last: fn.text };
  if (fn.type === 'attribute') {
    const attr = fn.childForFieldName('attribute')?.text;
    return attr ? { full: fn.text, last: attr } : undefined;
  }
  return undefined;
}

function sqlArgument(call: Node, keyword: string): Node | undefined {
  const args = call.childForFieldName('arguments');
  if (!args) return undefined;
  let positional: Node | undefined;
  for (const c of args.namedChildren) {
    if (!c) continue;
    if (c.type === 'keyword_argument') {
      if (c.childForFieldName('name')?.text === keyword) return c.childForFieldName('value') ?? undefined;
      continue;
    }
    if (c.type === 'comment') continue;
    if (!positional) positional = c;
  }
  return positional;
}

export async function extractPython(content: string, framework: 'django' | 'alembic'): Promise<HostExtraction> {
  const parser = await hostParser('python');
  const tree = parser.parse(content);
  const out: HostExtraction = { segments: [], notAnalyzed: [], comments: [], transactionOptOut: false };
  if (!tree) return out;
  let committed = false;

  const pushSql = (valueNode: Node, line: number, label: string, optOut: boolean): void => {
    const nodes: Node[] = valueNode.type === 'list' || valueNode.type === 'tuple'
      ? valueNode.namedChildren.filter((c): c is Node => c !== null && c.type !== 'comment')
      : [valueNode];
    if (nodes.length === 0) {
      out.notAnalyzed.push({ line, reason: `\`${label}\`: empty statement list` });
      return;
    }
    for (const n of nodes) {
      const lit = stringLiteral(n);
      if (!lit) {
        out.notAnalyzed.push({ line: n.startPosition.row + 1, reason: `\`${label}\`: argument is not a plain string literal` });
        continue;
      }
      out.segments.push({ sql: lit.text, line: lit.line, transactionOptOut: optOut || undefined });
    }
  };

  const visit = (n: Node, inAutocommit: boolean): void => {
    if (n.type === 'comment') {
      out.comments.push({ line: n.startPosition.row + 1, text: n.text.replace(/^#/, '') });
      return;
    }
    if (n.type === 'assignment' && framework === 'django') {
      const left = n.childForFieldName('left');
      const right = n.childForFieldName('right');
      if (left?.text === 'atomic' && right?.type === 'false') out.transactionOptOut = true;
    }
    if (n.type === 'with_statement' && framework === 'alembic' && /autocommit_block\s*\(/.test(n.text.split('\n')[0] ?? '')) {
      const body = n.childForFieldName('body');
      if (body) visit(body, true);
      return;
    }
    if (n.type === 'call') {
      const fn = functionName(n);
      const line = n.startPosition.row + 1;
      if (fn) {
        if (framework === 'django' && (fn.full === 'migrations.RunSQL' || fn.full === 'RunSQL')) {
          const value = sqlArgument(n, 'sql');
          if (value) pushSql(value, line, 'RunSQL', false);
          else out.notAnalyzed.push({ line, reason: '`RunSQL`: no sql argument' });
          return;
        }
        if (framework === 'django' && fn.full.startsWith('migrations.') && fn.last !== 'RunPython') {
          out.notAnalyzed.push({ line, reason: `\`${fn.full}\` is not mapped in this release (ADR 0008)` });
          return;
        }
        if (framework === 'alembic' && fn.full === 'op.execute') {
          const value = sqlArgument(n, 'sqltext');
          if (value) {
            const lit = stringLiteral(value);
            if (lit && /^\s*commit\s*;?\s*$/i.test(lit.text)) {
              committed = true;
              return;
            }
            pushSql(value, line, 'op.execute', inAutocommit || committed);
          } else out.notAnalyzed.push({ line, reason: '`op.execute`: no argument' });
          return;
        }
        if (framework === 'alembic' && /\.execute$/.test(fn.full) && fn.full.includes('get_bind')) {
          const value = sqlArgument(n, 'statement');
          const lit = value ? stringLiteral(value) : undefined;
          if (lit && /^\s*commit\s*;?\s*$/i.test(lit.text)) committed = true;
          return;
        }
        if (framework === 'alembic' && fn.full.startsWith('op.') && fn.full !== 'op.get_bind' && fn.full !== 'op.get_context') {
          out.notAnalyzed.push({ line, reason: `\`${fn.full}\` is not mapped in this release (ADR 0008)` });
          return;
        }
      }
    }
    for (const c of n.namedChildren) if (c) visit(c, inAutocommit);
  };
  visit(tree.rootNode, false);
  out.segments.sort((a, b) => a.line - b.line);
  return out;
}
