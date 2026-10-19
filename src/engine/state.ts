// The engine's state transitions. Rules never mutate state; after each
// statement the engine applies exactly these transitions, so two rules cannot
// disagree about the state (ARCHITECTURE.md, "Rule engine").
import { alterCmds, constraintKeys, notNullCheckColumn, qualifiedName, relName } from '../parser/ast.js';
import type { FileState, MigrationFile, PrState, Statement } from '../types.js';

export function newPrState(): PrState {
  return {
    newTables: new Set(),
    newIndexes: new Set(),
    validatedNotNullChecks: new Set(),
    validatedNotNullConstraints: new Set(),
  };
}

export function newFileState(): FileState {
  return { explicitTransaction: false, txn: 's0', lockTimeoutSet: false, notValid: new Map() };
}

/** First pass over the added files: what this migration set creates. */
export function collectCreated(file: MigrationFile, statements: Statement[], pr: PrState): void {
  if (file.status !== 'added') return;
  for (const s of statements) {
    if (s.kind === 'CreateStmt' || s.kind === 'CreateTableAsStmt') {
      const rv = s.kind === 'CreateStmt' ? relName(s.inner.relation) : relName(s.inner.into?.rel);
      if (rv) pr.newTables.add(rv.key);
    }
    if (s.kind === 'IndexStmt' && typeof s.inner.idxname === 'string') {
      const rv = relName(s.inner.relation);
      pr.newIndexes.add(indexKey(s.inner.idxname, rv?.schema));
    }
    if (s.kind === 'AlterTableStmt') {
      const rv = relName(s.inner.relation);
      for (const cmd of alterCmds(s.inner)) {
        const c = cmd.def?.Constraint;
        if (cmd.subtype === 'AT_AddConstraint' && c?.conname && (c.contype === 'CONSTR_UNIQUE' || c.contype === 'CONSTR_PRIMARY'))
          pr.newIndexes.add(indexKey(c.conname, rv?.schema));
      }
    }
  }
}

export function indexKey(name: string, schema?: string): string {
  return (schema ? `${schema}.${name}` : name).toLowerCase();
}

/** The transaction the next statement runs in, before the statement's own transition. */
export function currentTxn(file: MigrationFile, state: FileState, stmt: Statement): string {
  if (state.explicitTransaction) return state.txn;
  if (file.wrapped && !stmt.segment.transactionOptOut) return 'file';
  return `s${stmt.index}`;
}

/** Applies the statement's effect on the file and PR state. */
export function transition(file: MigrationFile, state: FileState, pr: PrState, stmt: Statement, txn: string): void {
  const inner = stmt.inner;
  switch (stmt.kind) {
    case 'TransactionStmt': {
      const kind: string = inner.kind;
      if (kind === 'TRANS_STMT_BEGIN' || kind === 'TRANS_STMT_START') {
        state.explicitTransaction = true;
        state.txn = `x${stmt.index}`;
      } else if (kind === 'TRANS_STMT_COMMIT' || kind === 'TRANS_STMT_ROLLBACK') {
        state.explicitTransaction = false;
      }
      return;
    }
    case 'VariableSetStmt': {
      if (typeof inner.name !== 'string' || inner.name.toLowerCase() !== 'lock_timeout') return;
      if (inner.kind === 'VAR_RESET' || inner.kind === 'VAR_SET_DEFAULT') {
        state.lockTimeoutSet = false;
        return;
      }
      const arg = inner.args?.[0]?.A_Const;
      const raw = arg?.sval?.sval ?? (arg?.ival ? String(arg.ival.ival ?? 0) : undefined);
      const value = typeof raw === 'string' ? raw.trim() : '';
      // `0` disables the timeout; anything else sets it.
      state.lockTimeoutSet = value !== '' && !/^0+\s*(ms|s|min|h|d)?$/i.test(value);
      return;
    }
    case 'AlterTableStmt': {
      const rv = relName(inner.relation);
      if (!rv) return;
      for (const cmd of alterCmds(inner)) {
        if (cmd.subtype === 'AT_AddConstraint') {
          const c = cmd.def?.Constraint;
          if (!c) continue;
          if (c.contype === 'CONSTR_CHECK') {
            const column = notNullCheckColumn(c.raw_expr);
            if (c.skip_validation) {
              if (c.conname)
                state.notValid.set(c.conname.toLowerCase(), {
                  name: c.conname,
                  table: rv.key,
                  txn,
                  kind: 'check',
                  column,
                  validated: false,
                });
            } else if (column) {
              pr.validatedNotNullChecks.add(`${rv.key}.${column.toLowerCase()}`);
            }
          } else if (c.contype === 'CONSTR_FOREIGN' && c.skip_validation && c.conname) {
            state.notValid.set(c.conname.toLowerCase(), { name: c.conname, table: rv.key, txn, kind: 'foreign', validated: false });
          } else if (c.contype === 'CONSTR_NOTNULL') {
            const column = constraintKeys(c)[0];
            if (c.skip_validation) {
              if (c.conname)
                state.notValid.set(c.conname.toLowerCase(), {
                  name: c.conname,
                  table: rv.key,
                  txn,
                  kind: 'notnull',
                  column,
                  validated: false,
                });
            } else if (column) {
              pr.validatedNotNullConstraints.add(`${rv.key}.${column.toLowerCase()}`);
            }
          }
        } else if (cmd.subtype === 'AT_ValidateConstraint' && typeof cmd.name === 'string') {
          const nv = state.notValid.get(cmd.name.toLowerCase());
          if (!nv) continue;
          nv.validated = true;
          if (nv.column) {
            const key = `${nv.table}.${nv.column.toLowerCase()}`;
            if (nv.kind === 'check') pr.validatedNotNullChecks.add(key);
            if (nv.kind === 'notnull') pr.validatedNotNullConstraints.add(key);
          }
        } else if (cmd.subtype === 'AT_DropConstraint' && typeof cmd.name === 'string') {
          state.notValid.delete(cmd.name.toLowerCase());
        }
      }
      return;
    }
    case 'DropStmt': {
      if (inner.removeType === 'OBJECT_TABLE') {
        for (const obj of inner.objects ?? []) {
          const q = qualifiedName(obj?.List?.items);
          if (q) pr.newTables.delete(q.key);
        }
      }
      return;
    }
    default:
      return;
  }
}
