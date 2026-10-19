import { existsSync } from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Locates a WebAssembly file. In the built action it sits next to the bundle
 * (scripts/build.mjs copies it there); when the TypeScript sources run directly
 * (tests, `vitest`), it comes from the package in node_modules.
 */
export function wasmFile(name: string, packagePath: string): string {
  const here = dirname(fileURLToPath(import.meta.url));
  const local = join(here, name);
  if (existsSync(local)) return local;
  const require = createRequire(import.meta.url);
  return require.resolve(packagePath);
}
