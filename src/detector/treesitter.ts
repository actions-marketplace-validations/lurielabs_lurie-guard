// tree-sitter grammars for Ruby and Python, compiled to WebAssembly, loaded on
// first use so SQL-only repositories never pay for them (ADR 0008).
import { Language, Parser } from 'web-tree-sitter';
import { wasmFile } from '../wasm.js';

export type HostLanguage = 'ruby' | 'python';

let initialized: Promise<void> | undefined;
const languages = new Map<HostLanguage, Promise<Language>>();

const GRAMMARS: Record<HostLanguage, [string, string]> = {
  ruby: ['tree-sitter-ruby.wasm', 'tree-sitter-ruby/tree-sitter-ruby.wasm'],
  python: ['tree-sitter-python.wasm', 'tree-sitter-python/tree-sitter-python.wasm'],
};

export async function hostParser(lang: HostLanguage): Promise<Parser> {
  if (!initialized) {
    initialized = Parser.init({
      locateFile: () => wasmFile('web-tree-sitter.wasm', 'web-tree-sitter/web-tree-sitter.wasm'),
    });
  }
  await initialized;
  let language = languages.get(lang);
  if (!language) {
    const [name, pkg] = GRAMMARS[lang];
    language = Language.load(wasmFile(name, pkg));
    languages.set(lang, language);
  }
  const parser = new Parser();
  parser.setLanguage(await language);
  return parser;
}
