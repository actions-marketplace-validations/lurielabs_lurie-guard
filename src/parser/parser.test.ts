import { describe, expect, it } from 'vitest';
import { parseSegment } from './pg.js';

describe('parser', () => {
  it('positions statements in the host file, skipping comments, with whole-line detection', async () => {
    const sql = `-- header\n\nCREATE TABLE t (\n  id int\n);\n/* c */ SELECT 1; SELECT 2;\n  ALTER TABLE t ADD COLUMN a int -- trailing\n`;
    const out = await parseSegment({ sql, line: 10 }, 'f.sql', 0);
    expect(out.failure).toBeUndefined();
    expect(out.statements.map((s) => [s.kind, s.line, s.endLine, s.wholeLines])).toEqual([
      ['CreateStmt', 12, 14, true],
      ['SelectStmt', 15, 15, false],
      ['SelectStmt', 15, 15, false],
      ['AlterTableStmt', 16, 16, true],
    ]);
    expect(out.statements[0].text).toBe('CREATE TABLE t (\n  id int\n)');
    expect(out.statements[3].text).toBe('ALTER TABLE t ADD COLUMN a int');
    expect(out.statements[3].index).toBe(3);
  });

  it('maps node byte locations to lines, including after multi-byte characters', async () => {
    const sql = `-- çãõ é\nCREATE TABLE t (\n  id int,\n  nome varchar(20)\n);\n`;
    const out = await parseSegment({ sql, line: 1 }, 'f.sql', 0);
    const create = out.statements[0];
    const cols = create.inner.tableElts.map((e: { ColumnDef: { location: number } }) => create.lineAt(e.ColumnDef.location));
    expect(cols).toEqual([3, 4]);
  });

  it('reports a parse failure with the line and column, in the host file', async () => {
    const out = await parseSegment({ sql: 'SELECT 1;\nALTER TABL t ADD COLUMN a int;\n', line: 5 }, 'f.sql', 0);
    expect(out.statements).toEqual([]);
    expect(out.failure).toMatchObject({ path: 'f.sql', line: 6, column: 7 });
    expect(out.failure?.message).toMatch(/syntax error/);
  });

  it('exposes the statement tokens with keywords', async () => {
    const out = await parseSegment({ sql: 'CREATE UNIQUE INDEX i ON t (a);', line: 1 }, 'f.sql', 0);
    expect(out.statements[0].tokens().map((t) => t.keyword || t.text)).toEqual(['CREATE', 'UNIQUE', 'INDEX', 'i', 'ON', 't', '(', 'a', ')']);
  });

  it('an empty segment has no statements', async () => {
    const out = await parseSegment({ sql: '  \n-- only a comment\n', line: 1 }, 'f.sql', 0);
    expect(out.statements).toEqual([]);
    expect(out.failure).toBeUndefined();
  });
});
