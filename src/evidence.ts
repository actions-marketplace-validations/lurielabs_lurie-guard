// The sister repository commit the evidence links point at. scripts/validate.sh
// reads DB_SKILLS_REF from this file and resolves every RULE.md evidence path
// at that commit. Bumping it is its own PR (ARCHITECTURE.md, "How evidence and
// fixtures are versioned").
export const DB_SKILLS_REF = 'c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57';
export const DB_SKILLS_REPO = 'https://github.com/rafapeixer/db-skills';

/** Turns a frontmatter evidence entry into a URL at the pinned commit. */
export function evidenceUrl(entry: string): string {
  if (/^https?:\/\//.test(entry)) return entry;
  const m = /^db-skills\/(.+?)(#L\d+(?:-L\d+)?)?$/.exec(entry);
  if (!m) return entry;
  return `${DB_SKILLS_REPO}/blob/${DB_SKILLS_REF}/${m[1]}${m[2] ?? ''}`;
}
