export type Severity = 'error' | 'warning' | 'info';

export type Framework =
  | 'sql'
  | 'flyway'
  | 'liquibase'
  | 'rails'
  | 'django'
  | 'alembic'
  | 'prisma'
  | 'golang-migrate'
  | 'dbmate'
  | 'sqitch';

export type FileStatus = 'added' | 'modified';

/** A piece of SQL extracted from a file, with the host line where it starts. */
export interface SqlSegment {
  sql: string;
  /** 1-based line of the host file where `sql[0]` sits. */
  line: number;
  /**
   * Set when the SQL was synthesized from a host-language DSL call
   * (Rails `add_index`, ...). Findings then point at the call's line.
   */
  synthesized?: { call: string };
  /** Liquibase: the changeset this segment belongs to has `runInTransaction:false`. */
  transactionOptOut?: boolean;
}

export interface NotAnalyzed {
  line: number;
  reason: string;
}

/** A file the migration detector classified as a migration. */
export interface MigrationFile {
  path: string;
  status: FileStatus;
  content: string;
  framework: Framework;
  /** The framework (or an explicit BEGIN) wraps the file in one transaction. */
  wrapped: boolean;
  wrapReason: string;
  segments: SqlSegment[];
  notAnalyzed: NotAnalyzed[];
  /** Host-language comments (Ruby, Python), for suppressions; SQL comments come from the scanner. */
  comments?: { line: number; text: string }[];
}

export interface Token {
  /** Byte offsets into the segment's SQL. */
  start: number;
  end: number;
  kind: string;
  keyword: string;
  text: string;
}

/** One parsed statement, positioned in the host file. */
export interface Statement {
  /** The raw statement node, for example `{ IndexStmt: {...} }`. */
  node: Record<string, unknown>;
  /** The node type: `IndexStmt`, `AlterTableStmt`, ... */
  kind: string;
  /** The node's contents. Untyped: PostgreSQL's parse tree as JSON. */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inner: any;
  /** The statement's text, without the terminating semicolon. */
  text: string;
  line: number;
  endLine: number;
  /** True when the statement occupies whole lines (a suggested change can replace them). */
  wholeLines: boolean;
  segment: SqlSegment;
  /** Index of the statement within its file (all segments). */
  index: number;
  /** Maps a node `location` (byte offset in the segment) to a host line. */
  lineAt(byteOffset: number): number;
  /** The scanner tokens of this statement. */
  tokens(): Token[];
}

export interface ParseFailure {
  path: string;
  line: number;
  column: number;
  message: string;
}

export interface Fix {
  /** `suggestion`: a GitHub suggested change replacing lines startLine..endLine. `block`: a code block in the comment. */
  kind: 'suggestion' | 'block';
  text: string;
  startLine?: number;
  endLine?: number;
}

export interface RuleResult {
  /** Three-part message without the trailing `(ID, evidence)`; the engine appends it. */
  message: string;
  /** Defaults to the statement's line range. */
  line?: number;
  endLine?: number;
  /** The table the finding is about, for the fingerprint. */
  table?: string;
  /** Extra discriminator for the fingerprint (a column name, for column-level findings). */
  key?: string;
  fix?: Fix;
}

export interface Finding {
  ruleId: string;
  severity: Severity;
  path: string;
  line: number;
  endLine: number;
  message: string;
  table?: string;
  fix?: Fix;
  fingerprint: string;
  /** The statement text, for the explainer. */
  statement?: string;
  /** Set when an inline suppression with a reason matched. */
  suppressed?: { reason: string; line: number };
}

export interface SuppressionRecord {
  path: string;
  line: number;
  ruleIds: string[] | 'all';
  reason?: string;
  matched: number;
}

export interface ResolvedConfig {
  version: 1;
  postgresVersion: number;
  paths?: string[];
  /** Extends the built-in list (DEFAULT_EXCLUDES) unless defaultExcludes is false. */
  exclude: string[];
  /** Apply the built-in build/dependency/VCS output excludes. */
  defaultExcludes: boolean;
  framework: 'auto' | Framework;
  transaction: 'auto' | 'always' | 'never';
  lockTimeoutSetByRunner: boolean;
  failOn: 'none' | 'warning' | 'error';
  /** Effective severity per rule id; absent means off. */
  rules: Record<string, Severity>;
  ruleExcludes: Record<string, string[]>;
  outputs: { reviewComments: boolean; sarif: boolean; summary: boolean; maxComments: number };
  llm: { model: string; explain: boolean; extraChecks: boolean; maxCostUsdPerRun: number };
}

export interface PrState {
  /** Tables created by CREATE TABLE in any added migration file (lowercase, schema-qualified when given). */
  newTables: Set<string>;
  newIndexes: Set<string>;
  /** `table.column` pairs proven NOT NULL by a validated CHECK (col IS NOT NULL). */
  validatedNotNullChecks: Set<string>;
  /** PG 18: `table.column` pairs with a NOT NULL constraint added NOT VALID then validated. */
  validatedNotNullConstraints: Set<string>;
}

export interface NotValidConstraint {
  name: string;
  table: string;
  txn: string;
  kind: 'foreign' | 'check' | 'notnull';
  /** For CHECK (col IS NOT NULL) and PG 18 NOT NULL constraints. */
  column?: string;
  validated: boolean;
}

export interface FileState {
  explicitTransaction: boolean;
  /** Identifies the current transaction; equal values mean "same transaction". */
  txn: string;
  lockTimeoutSet: boolean;
  notValid: Map<string, NotValidConstraint>;
}

export interface RuleContext {
  file: MigrationFile;
  state: FileState;
  pr: PrState;
  config: ResolvedConfig;
  /** True when the referenced table was created in this migration set (added files of the PR). */
  isNewTable(rangeVar: unknown): boolean;
  isNewIndex(name: string): boolean;
  /** `schema.name` or `name`, as written, for messages. */
  tableName(rangeVar: unknown): string;
  /** True inside an explicit BEGIN block or a framework-wrapped file. */
  inTransaction(): boolean;
  /** Identifier of the transaction the current statement runs in (equal values: same transaction). */
  currentTxn(): string;
}

export interface Rule {
  id: string;
  name: string;
  severity: Severity;
  /** `false` for `info` rules that are off unless enabled in the config. */
  defaultOn: boolean;
  check(stmt: Statement, ctx: RuleContext): RuleResult[] | RuleResult | undefined | void;
}

export interface RuleCatalogEntry {
  id: string;
  name: string;
  severity: Severity;
  pack: string;
  folder: string;
  since: string;
  status: string;
  skill: string;
  evidence: string[];
  verified: string;
  title: string;
  help: string;
  messageTemplate: string;
}

export interface FileReport {
  path: string;
  framework: Framework;
  wrapped: boolean;
  wrapReason: string;
  status: 'analyzed' | 'parse-error';
  statements: number;
  notAnalyzed: NotAnalyzed[];
}

export interface AnalysisResult {
  findings: Finding[];
  suppressions: SuppressionRecord[];
  files: FileReport[];
  parseFailures: ParseFailure[];
  /** Milliseconds spent parsing and running rules. */
  engineMs: number;
}
