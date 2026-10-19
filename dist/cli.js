import { createRequire as __lgCreateRequire } from 'node:module';
import { fileURLToPath as __lgFileURLToPath } from 'node:url';
import { dirname as __lgDirname } from 'node:path';
const require = __lgCreateRequire(import.meta.url);
const __filename = __lgFileURLToPath(import.meta.url);
const __dirname = __lgDirname(__filename);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  try {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  } catch (e) {
    throw mod = 0, e;
  }
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// node_modules/picomatch/lib/constants.js
var require_constants = __commonJS({
  "node_modules/picomatch/lib/constants.js"(exports, module2) {
    "use strict";
    var WIN_SLASH = "\\\\/";
    var WIN_NO_SLASH = `[^${WIN_SLASH}]`;
    var DEFAULT_MAX_EXTGLOB_RECURSION = 0;
    var DOT_LITERAL = "\\.";
    var PLUS_LITERAL = "\\+";
    var QMARK_LITERAL = "\\?";
    var SLASH_LITERAL = "\\/";
    var ONE_CHAR = "(?=.)";
    var QMARK = "[^/]";
    var END_ANCHOR = `(?:${SLASH_LITERAL}|$)`;
    var START_ANCHOR = `(?:^|${SLASH_LITERAL})`;
    var DOTS_SLASH = `${DOT_LITERAL}{1,2}${END_ANCHOR}`;
    var NO_DOT = `(?!${DOT_LITERAL})`;
    var NO_DOTS = `(?!${START_ANCHOR}${DOTS_SLASH})`;
    var NO_DOT_SLASH = `(?!${DOT_LITERAL}{0,1}${END_ANCHOR})`;
    var NO_DOTS_SLASH = `(?!${DOTS_SLASH})`;
    var QMARK_NO_DOT = `[^.${SLASH_LITERAL}]`;
    var STAR = `${QMARK}*?`;
    var SEP = "/";
    var POSIX_CHARS = {
      DOT_LITERAL,
      PLUS_LITERAL,
      QMARK_LITERAL,
      SLASH_LITERAL,
      ONE_CHAR,
      QMARK,
      END_ANCHOR,
      DOTS_SLASH,
      NO_DOT,
      NO_DOTS,
      NO_DOT_SLASH,
      NO_DOTS_SLASH,
      QMARK_NO_DOT,
      STAR,
      START_ANCHOR,
      SEP
    };
    var WINDOWS_CHARS = {
      ...POSIX_CHARS,
      SLASH_LITERAL: `[${WIN_SLASH}]`,
      QMARK: WIN_NO_SLASH,
      STAR: `${WIN_NO_SLASH}*?`,
      DOTS_SLASH: `${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$)`,
      NO_DOT: `(?!${DOT_LITERAL})`,
      NO_DOTS: `(?!(?:^|[${WIN_SLASH}])${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      NO_DOT_SLASH: `(?!${DOT_LITERAL}{0,1}(?:[${WIN_SLASH}]|$))`,
      NO_DOTS_SLASH: `(?!${DOT_LITERAL}{1,2}(?:[${WIN_SLASH}]|$))`,
      QMARK_NO_DOT: `[^.${WIN_SLASH}]`,
      START_ANCHOR: `(?:^|[${WIN_SLASH}])`,
      END_ANCHOR: `(?:[${WIN_SLASH}]|$)`,
      SEP: "\\"
    };
    var POSIX_REGEX_SOURCE = {
      __proto__: null,
      alnum: "a-zA-Z0-9",
      alpha: "a-zA-Z",
      ascii: "\\x00-\\x7F",
      blank: " \\t",
      cntrl: "\\x00-\\x1F\\x7F",
      digit: "0-9",
      graph: "\\x21-\\x7E",
      lower: "a-z",
      print: "\\x20-\\x7E ",
      punct: "\\-!\"#$%&'()\\*+,./:;<=>?@[\\]^_`{|}~",
      space: " \\t\\r\\n\\v\\f",
      upper: "A-Z",
      word: "A-Za-z0-9_",
      xdigit: "A-Fa-f0-9"
    };
    module2.exports = {
      DEFAULT_MAX_EXTGLOB_RECURSION,
      MAX_LENGTH: 1024 * 64,
      POSIX_REGEX_SOURCE,
      // regular expressions
      REGEX_BACKSLASH: /\\(?![*+?^${}(|)[\]])/g,
      REGEX_NON_SPECIAL_CHARS: /^[^@![\].,$*+?^{}()|\\/]+/,
      REGEX_SPECIAL_CHARS: /[-*+?.^${}(|)[\]]/,
      REGEX_SPECIAL_CHARS_BACKREF: /(\\?)((\W)(\3*))/g,
      REGEX_SPECIAL_CHARS_GLOBAL: /([-*+?.^${}(|)[\]])/g,
      REGEX_REMOVE_BACKSLASH: /(?:\[.*?[^\\]\]|\\(?=.))/g,
      // Replace globs with equivalent patterns to reduce parsing time.
      REPLACEMENTS: {
        __proto__: null,
        "***": "*",
        "**/**": "**",
        "**/**/**": "**"
      },
      // Digits
      CHAR_0: 48,
      /* 0 */
      CHAR_9: 57,
      /* 9 */
      // Alphabet chars.
      CHAR_UPPERCASE_A: 65,
      /* A */
      CHAR_LOWERCASE_A: 97,
      /* a */
      CHAR_UPPERCASE_Z: 90,
      /* Z */
      CHAR_LOWERCASE_Z: 122,
      /* z */
      CHAR_LEFT_PARENTHESES: 40,
      /* ( */
      CHAR_RIGHT_PARENTHESES: 41,
      /* ) */
      CHAR_ASTERISK: 42,
      /* * */
      // Non-alphabetic chars.
      CHAR_AMPERSAND: 38,
      /* & */
      CHAR_AT: 64,
      /* @ */
      CHAR_BACKWARD_SLASH: 92,
      /* \ */
      CHAR_CARRIAGE_RETURN: 13,
      /* \r */
      CHAR_CIRCUMFLEX_ACCENT: 94,
      /* ^ */
      CHAR_COLON: 58,
      /* : */
      CHAR_COMMA: 44,
      /* , */
      CHAR_DOT: 46,
      /* . */
      CHAR_DOUBLE_QUOTE: 34,
      /* " */
      CHAR_EQUAL: 61,
      /* = */
      CHAR_EXCLAMATION_MARK: 33,
      /* ! */
      CHAR_FORM_FEED: 12,
      /* \f */
      CHAR_FORWARD_SLASH: 47,
      /* / */
      CHAR_GRAVE_ACCENT: 96,
      /* ` */
      CHAR_HASH: 35,
      /* # */
      CHAR_HYPHEN_MINUS: 45,
      /* - */
      CHAR_LEFT_ANGLE_BRACKET: 60,
      /* < */
      CHAR_LEFT_CURLY_BRACE: 123,
      /* { */
      CHAR_LEFT_SQUARE_BRACKET: 91,
      /* [ */
      CHAR_LINE_FEED: 10,
      /* \n */
      CHAR_NO_BREAK_SPACE: 160,
      /* \u00A0 */
      CHAR_PERCENT: 37,
      /* % */
      CHAR_PLUS: 43,
      /* + */
      CHAR_QUESTION_MARK: 63,
      /* ? */
      CHAR_RIGHT_ANGLE_BRACKET: 62,
      /* > */
      CHAR_RIGHT_CURLY_BRACE: 125,
      /* } */
      CHAR_RIGHT_SQUARE_BRACKET: 93,
      /* ] */
      CHAR_SEMICOLON: 59,
      /* ; */
      CHAR_SINGLE_QUOTE: 39,
      /* ' */
      CHAR_SPACE: 32,
      /*   */
      CHAR_TAB: 9,
      /* \t */
      CHAR_UNDERSCORE: 95,
      /* _ */
      CHAR_VERTICAL_LINE: 124,
      /* | */
      CHAR_ZERO_WIDTH_NOBREAK_SPACE: 65279,
      /* \uFEFF */
      /**
       * Create EXTGLOB_CHARS
       */
      extglobChars(chars) {
        return {
          "!": { type: "negate", open: "(?:(?!(?:", close: `))${chars.STAR})` },
          "?": { type: "qmark", open: "(?:", close: ")?" },
          "+": { type: "plus", open: "(?:", close: ")+" },
          "*": { type: "star", open: "(?:", close: ")*" },
          "@": { type: "at", open: "(?:", close: ")" }
        };
      },
      /**
       * Create GLOB_CHARS
       */
      globChars(win32) {
        return win32 === true ? WINDOWS_CHARS : POSIX_CHARS;
      }
    };
  }
});

// node_modules/picomatch/lib/utils.js
var require_utils = __commonJS({
  "node_modules/picomatch/lib/utils.js"(exports) {
    "use strict";
    var {
      REGEX_BACKSLASH,
      REGEX_REMOVE_BACKSLASH,
      REGEX_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_GLOBAL
    } = require_constants();
    exports.isObject = (val) => val !== null && typeof val === "object" && !Array.isArray(val);
    exports.hasRegexChars = (str) => REGEX_SPECIAL_CHARS.test(str);
    exports.isRegexChar = (str) => str.length === 1 && exports.hasRegexChars(str);
    exports.escapeRegex = (str) => str.replace(REGEX_SPECIAL_CHARS_GLOBAL, "\\$1");
    exports.toPosixSlashes = (str) => str.replace(REGEX_BACKSLASH, "/");
    exports.isWindows = () => {
      if (typeof navigator !== "undefined" && navigator.platform) {
        const platform = navigator.platform.toLowerCase();
        return platform === "win32" || platform === "windows";
      }
      if (typeof process !== "undefined" && process.platform) {
        return process.platform === "win32";
      }
      return false;
    };
    exports.removeBackslashes = (str) => {
      return str.replace(REGEX_REMOVE_BACKSLASH, (match) => {
        return match === "\\" ? "" : match;
      });
    };
    exports.escapeLast = (input, char, lastIdx) => {
      const idx = input.lastIndexOf(char, lastIdx);
      if (idx === -1) return input;
      if (input[idx - 1] === "\\") return exports.escapeLast(input, char, idx - 1);
      return `${input.slice(0, idx)}\\${input.slice(idx)}`;
    };
    exports.removePrefix = (input, state = {}) => {
      let output = input;
      if (output.startsWith("./")) {
        output = output.slice(2);
        state.prefix = "./";
      }
      return output;
    };
    exports.wrapOutput = (input, state = {}, options = {}) => {
      const prepend = options.contains ? "" : "^";
      const append = options.contains ? "" : "$";
      let output = `${prepend}(?:${input})${append}`;
      if (state.negated === true) {
        output = `(?:^(?!${output}).*$)`;
      }
      return output;
    };
    exports.basename = (path, { windows } = {}) => {
      const segs = path.split(windows ? /[\\/]/ : "/");
      const last = segs[segs.length - 1];
      if (last === "") {
        return segs[segs.length - 2];
      }
      return last;
    };
  }
});

// node_modules/picomatch/lib/scan.js
var require_scan = __commonJS({
  "node_modules/picomatch/lib/scan.js"(exports, module2) {
    "use strict";
    var utils = require_utils();
    var {
      CHAR_ASTERISK,
      /* * */
      CHAR_AT,
      /* @ */
      CHAR_BACKWARD_SLASH,
      /* \ */
      CHAR_COMMA,
      /* , */
      CHAR_DOT,
      /* . */
      CHAR_EXCLAMATION_MARK,
      /* ! */
      CHAR_FORWARD_SLASH,
      /* / */
      CHAR_LEFT_CURLY_BRACE,
      /* { */
      CHAR_LEFT_PARENTHESES,
      /* ( */
      CHAR_LEFT_SQUARE_BRACKET,
      /* [ */
      CHAR_PLUS,
      /* + */
      CHAR_QUESTION_MARK,
      /* ? */
      CHAR_RIGHT_CURLY_BRACE,
      /* } */
      CHAR_RIGHT_PARENTHESES,
      /* ) */
      CHAR_RIGHT_SQUARE_BRACKET
      /* ] */
    } = require_constants();
    var isPathSeparator = (code) => {
      return code === CHAR_FORWARD_SLASH || code === CHAR_BACKWARD_SLASH;
    };
    var depth = (token) => {
      if (token.isPrefix !== true) {
        token.depth = token.isGlobstar ? Infinity : 1;
      }
    };
    var scan2 = (input, options) => {
      const opts = options || {};
      const length = input.length - 1;
      const scanToEnd = opts.parts === true || opts.tokens === true || opts.scanToEnd === true;
      const slashes = [];
      const tokens = [];
      const parts2 = [];
      let str = input;
      let index = -1;
      let start2 = 0;
      let lastIndex = 0;
      let isBrace = false;
      let isBracket = false;
      let isGlob = false;
      let isExtglob = false;
      let isGlobstar = false;
      let braceEscaped = false;
      let backslashes = false;
      let negated = false;
      let negatedExtglob = false;
      let finished = false;
      let braces = 0;
      let prev;
      let code;
      let token = { value: "", depth: 0, isGlob: false };
      const eos = () => index >= length;
      const peek = () => str.charCodeAt(index + 1);
      const advance = () => {
        prev = code;
        return str.charCodeAt(++index);
      };
      while (index < length) {
        code = advance();
        let next;
        if (code === CHAR_BACKWARD_SLASH) {
          backslashes = token.backslashes = true;
          code = advance();
          if (code === CHAR_LEFT_CURLY_BRACE) {
            braceEscaped = true;
          }
          continue;
        }
        if (braceEscaped === true || code === CHAR_LEFT_CURLY_BRACE) {
          braces++;
          while (eos() !== true && (code = advance())) {
            if (code === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (code === CHAR_LEFT_CURLY_BRACE) {
              braces++;
              continue;
            }
            if (braceEscaped !== true && code === CHAR_DOT && (code = advance()) === CHAR_DOT) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (braceEscaped !== true && code === CHAR_COMMA) {
              isBrace = token.isBrace = true;
              isGlob = token.isGlob = true;
              finished = true;
              if (scanToEnd === true) {
                continue;
              }
              break;
            }
            if (code === CHAR_RIGHT_CURLY_BRACE) {
              braces--;
              if (braces === 0) {
                braceEscaped = false;
                isBrace = token.isBrace = true;
                finished = true;
                break;
              }
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_FORWARD_SLASH) {
          slashes.push(index);
          tokens.push(token);
          token = { value: "", depth: 0, isGlob: false };
          if (finished === true) continue;
          if (prev === CHAR_DOT && index === start2 + 1) {
            start2 += 2;
            continue;
          }
          lastIndex = index + 1;
          continue;
        }
        if (opts.noext !== true) {
          const isExtglobChar = code === CHAR_PLUS || code === CHAR_AT || code === CHAR_ASTERISK || code === CHAR_QUESTION_MARK || code === CHAR_EXCLAMATION_MARK;
          if (isExtglobChar === true && peek() === CHAR_LEFT_PARENTHESES) {
            isGlob = token.isGlob = true;
            isExtglob = token.isExtglob = true;
            finished = true;
            if (code === CHAR_EXCLAMATION_MARK && index === start2) {
              negatedExtglob = true;
            }
            if (scanToEnd === true) {
              let parens = 0;
              while (eos() !== true && (code = advance())) {
                if (code === CHAR_BACKWARD_SLASH) {
                  backslashes = token.backslashes = true;
                  advance();
                  continue;
                }
                if (code === CHAR_LEFT_PARENTHESES) {
                  parens++;
                  continue;
                }
                if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                  finished = true;
                  break;
                }
              }
              continue;
            }
            break;
          }
        }
        if (code === CHAR_ASTERISK) {
          if (prev === CHAR_ASTERISK) isGlobstar = token.isGlobstar = true;
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_QUESTION_MARK) {
          isGlob = token.isGlob = true;
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (code === CHAR_LEFT_SQUARE_BRACKET) {
          while (eos() !== true && (next = advance())) {
            if (next === CHAR_BACKWARD_SLASH) {
              backslashes = token.backslashes = true;
              advance();
              continue;
            }
            if (next === CHAR_RIGHT_SQUARE_BRACKET) {
              isBracket = token.isBracket = true;
              isGlob = token.isGlob = true;
              finished = true;
              break;
            }
          }
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
        if (opts.nonegate !== true && code === CHAR_EXCLAMATION_MARK && index === start2) {
          negated = token.negated = true;
          start2++;
          continue;
        }
        if (opts.noparen !== true && code === CHAR_LEFT_PARENTHESES) {
          isGlob = token.isGlob = true;
          if (scanToEnd === true) {
            let parens = 1;
            while (eos() !== true && (code = advance())) {
              if (code === CHAR_BACKWARD_SLASH) {
                backslashes = token.backslashes = true;
                advance();
                continue;
              }
              if (code === CHAR_LEFT_PARENTHESES) {
                parens++;
                continue;
              }
              if (code === CHAR_RIGHT_PARENTHESES && --parens === 0) {
                finished = true;
                break;
              }
            }
            continue;
          }
          break;
        }
        if (isGlob === true) {
          finished = true;
          if (scanToEnd === true) {
            continue;
          }
          break;
        }
      }
      if (opts.noext === true) {
        isExtglob = false;
        isGlob = false;
      }
      let base = str;
      let prefix = "";
      let glob = "";
      if (start2 > 0) {
        prefix = str.slice(0, start2);
        str = str.slice(start2);
        lastIndex -= start2;
      }
      if (base && isGlob === true && lastIndex > 0) {
        base = str.slice(0, lastIndex);
        glob = str.slice(lastIndex);
      } else if (isGlob === true) {
        base = "";
        glob = str;
      } else {
        base = str;
      }
      if (base && base !== "" && base !== "/" && base !== str) {
        if (isPathSeparator(base.charCodeAt(base.length - 1))) {
          base = base.slice(0, -1);
        }
      }
      if (opts.unescape === true) {
        if (glob) glob = utils.removeBackslashes(glob);
        if (base && backslashes === true) {
          base = utils.removeBackslashes(base);
        }
      }
      const state = {
        prefix,
        input,
        start: start2,
        base,
        glob,
        isBrace,
        isBracket,
        isGlob,
        isExtglob,
        isGlobstar,
        negated,
        negatedExtglob
      };
      if (opts.tokens === true) {
        state.maxDepth = 0;
        if (!isPathSeparator(code)) {
          tokens.push(token);
        }
        state.tokens = tokens;
      }
      if (opts.parts === true || opts.tokens === true) {
        let prevIndex;
        for (let idx = 0; idx < slashes.length; idx++) {
          const n2 = prevIndex !== void 0 ? prevIndex + 1 : start2;
          const i2 = slashes[idx];
          const value2 = input.slice(n2, i2);
          if (opts.tokens) {
            if (idx === 0 && start2 !== 0) {
              tokens[idx].isPrefix = true;
              tokens[idx].value = prefix;
            } else {
              tokens[idx].value = value2;
            }
            depth(tokens[idx]);
            state.maxDepth += tokens[idx].depth;
          }
          if (i2 >= start2) {
            parts2.push(value2);
            prevIndex = i2;
          }
        }
        const n = prevIndex !== void 0 ? prevIndex + 1 : start2;
        const value = input.slice(n);
        parts2.push(value);
        if (opts.tokens && prevIndex && prevIndex + 1 < input.length) {
          tokens[tokens.length - 1].value = value;
          depth(tokens[tokens.length - 1]);
          state.maxDepth += tokens[tokens.length - 1].depth;
        }
        state.slashes = slashes;
        state.parts = parts2;
      }
      return state;
    };
    module2.exports = scan2;
  }
});

// node_modules/picomatch/lib/parse.js
var require_parse = __commonJS({
  "node_modules/picomatch/lib/parse.js"(exports, module2) {
    "use strict";
    var constants = require_constants();
    var utils = require_utils();
    var {
      MAX_LENGTH,
      POSIX_REGEX_SOURCE,
      REGEX_NON_SPECIAL_CHARS,
      REGEX_SPECIAL_CHARS_BACKREF,
      REPLACEMENTS
    } = constants;
    var expandRange = (args2, options) => {
      if (typeof options.expandRange === "function") {
        return options.expandRange(...args2, options);
      }
      args2.sort();
      const value = `[${args2.join("-")}]`;
      try {
        new RegExp(value);
      } catch (ex) {
        return args2.map((v) => utils.escapeRegex(v)).join("..");
      }
      return value;
    };
    var syntaxError = (type, char) => {
      return `Missing ${type}: "${char}" - use "\\\\${char}" to match literal characters`;
    };
    var splitTopLevel = (input) => {
      const parts2 = [];
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let value = "";
      let escaped = false;
      for (const ch of input) {
        if (escaped === true) {
          value += ch;
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          value += ch;
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          value += ch;
          continue;
        }
        if (quote === 0) {
          if (ch === "[") {
            bracket++;
          } else if (ch === "]" && bracket > 0) {
            bracket--;
          } else if (bracket === 0) {
            if (ch === "(") {
              paren++;
            } else if (ch === ")" && paren > 0) {
              paren--;
            } else if (ch === "|" && paren === 0) {
              parts2.push(value);
              value = "";
              continue;
            }
          }
        }
        value += ch;
      }
      parts2.push(value);
      return parts2;
    };
    var isPlainBranch = (branch) => {
      let escaped = false;
      for (const ch of branch) {
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (/[?*+@!()[\]{}]/.test(ch)) {
          return false;
        }
      }
      return true;
    };
    var normalizeSimpleBranch = (branch) => {
      let value = branch.trim();
      let changed = true;
      while (changed === true) {
        changed = false;
        if (/^@\([^\\()[\]{}|]+\)$/.test(value)) {
          value = value.slice(2, -1);
          changed = true;
        }
      }
      if (!isPlainBranch(value)) {
        return;
      }
      return value.replace(/\\(.)/g, "$1");
    };
    var hasRepeatedCharPrefixOverlap = (branches) => {
      const values = branches.map(normalizeSimpleBranch).filter(Boolean);
      for (let i2 = 0; i2 < values.length; i2++) {
        for (let j = i2 + 1; j < values.length; j++) {
          const a = values[i2];
          const b = values[j];
          const char = a[0];
          if (!char || a !== char.repeat(a.length) || b !== char.repeat(b.length)) {
            continue;
          }
          if (a === b || a.startsWith(b) || b.startsWith(a)) {
            return true;
          }
        }
      }
      return false;
    };
    var parseRepeatedExtglob = (pattern, requireEnd = true) => {
      if (pattern[0] !== "+" && pattern[0] !== "*" || pattern[1] !== "(") {
        return;
      }
      let bracket = 0;
      let paren = 0;
      let quote = 0;
      let escaped = false;
      for (let i2 = 1; i2 < pattern.length; i2++) {
        const ch = pattern[i2];
        if (escaped === true) {
          escaped = false;
          continue;
        }
        if (ch === "\\") {
          escaped = true;
          continue;
        }
        if (ch === '"') {
          quote = quote === 1 ? 0 : 1;
          continue;
        }
        if (quote === 1) {
          continue;
        }
        if (ch === "[") {
          bracket++;
          continue;
        }
        if (ch === "]" && bracket > 0) {
          bracket--;
          continue;
        }
        if (bracket > 0) {
          continue;
        }
        if (ch === "(") {
          paren++;
          continue;
        }
        if (ch === ")") {
          paren--;
          if (paren === 0) {
            if (requireEnd === true && i2 !== pattern.length - 1) {
              return;
            }
            return {
              type: pattern[0],
              body: pattern.slice(2, i2),
              end: i2
            };
          }
        }
      }
    };
    var buildCharClassStar = (chars) => {
      const source = chars.length === 1 ? utils.escapeRegex(chars[0]) : `[${chars.map((ch) => utils.escapeRegex(ch)).join("")}]`;
      return `${source}*`;
    };
    var getStarExtglobSequenceChars = (pattern) => {
      let index = 0;
      const chars = [];
      while (index < pattern.length) {
        const match = parseRepeatedExtglob(pattern.slice(index), false);
        if (!match || match.type !== "*") {
          return;
        }
        const branches = splitTopLevel(match.body).map((branch2) => branch2.trim());
        if (branches.length !== 1) {
          return;
        }
        const branch = normalizeSimpleBranch(branches[0]);
        if (!branch || branch.length !== 1) {
          return;
        }
        chars.push(branch);
        index += match.end + 1;
      }
      if (chars.length < 1) {
        return;
      }
      return chars;
    };
    var repeatedExtglobRecursion = (pattern) => {
      let depth = 0;
      let value = pattern.trim();
      let match = parseRepeatedExtglob(value);
      while (match) {
        depth++;
        value = match.body.trim();
        match = parseRepeatedExtglob(value);
      }
      return depth;
    };
    var analyzeRepeatedExtglob = (body2, options) => {
      if (options.maxExtglobRecursion === false) {
        return { risky: false };
      }
      const max = typeof options.maxExtglobRecursion === "number" ? options.maxExtglobRecursion : constants.DEFAULT_MAX_EXTGLOB_RECURSION;
      const branches = splitTopLevel(body2).map((branch) => branch.trim());
      if (branches.length > 1) {
        if (branches.some((branch) => branch === "") || branches.some((branch) => /^[*?]+$/.test(branch)) || hasRepeatedCharPrefixOverlap(branches)) {
          return { risky: true };
        }
      }
      const safeChars = [];
      let sawStarSequence = false;
      let combinable = true;
      for (const branch of branches) {
        const chars = getStarExtglobSequenceChars(branch);
        if (chars) {
          sawStarSequence = true;
          safeChars.push(...chars);
          continue;
        }
        const literal2 = normalizeSimpleBranch(branch);
        if (literal2 && literal2.length === 1) {
          safeChars.push(literal2);
          continue;
        }
        combinable = false;
        if (repeatedExtglobRecursion(branch) > max) {
          return { risky: true };
        }
      }
      if (sawStarSequence) {
        return combinable ? { risky: true, safeOutput: buildCharClassStar([...new Set(safeChars)]) } : { risky: true };
      }
      return { risky: false };
    };
    var parse2 = (input, options) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected a string");
      }
      input = REPLACEMENTS[input] || input;
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      let len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      const bos = { type: "bos", value: "", output: opts.prepend || "" };
      const tokens = [bos];
      const capture = opts.capture ? "" : "?:";
      const PLATFORM_CHARS = constants.globChars(opts.windows);
      const EXTGLOB_CHARS = constants.extglobChars(PLATFORM_CHARS);
      const {
        DOT_LITERAL,
        PLUS_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOT_SLASH,
        NO_DOTS_SLASH,
        QMARK,
        QMARK_NO_DOT,
        STAR,
        START_ANCHOR
      } = PLATFORM_CHARS;
      const globstar = (opts2) => {
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const nodot = opts.dot ? "" : NO_DOT;
      const qmarkNoDot = opts.dot ? QMARK : QMARK_NO_DOT;
      let star = opts.bash === true ? globstar(opts) : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      if (typeof opts.noext === "boolean") {
        opts.noextglob = opts.noext;
      }
      const state = {
        input,
        index: -1,
        start: 0,
        dot: opts.dot === true,
        consumed: "",
        output: "",
        prefix: "",
        backtrack: false,
        negated: false,
        brackets: 0,
        braces: 0,
        parens: 0,
        quotes: 0,
        globstar: false,
        tokens
      };
      input = utils.removePrefix(input, state);
      len = input.length;
      const extglobs = [];
      const braces = [];
      const stack = [];
      let prev = bos;
      let value;
      const eos = () => state.index === len - 1;
      const peek = state.peek = (n = 1) => input[state.index + n];
      const advance = state.advance = () => input[++state.index] || "";
      const remaining = () => input.slice(state.index + 1);
      const consume = (value2 = "", num = 0) => {
        state.consumed += value2;
        state.index += num;
      };
      const append = (token) => {
        state.output += token.output != null ? token.output : token.value;
        consume(token.value);
      };
      const negate = () => {
        let count = 1;
        while (peek() === "!" && (peek(2) !== "(" || peek(3) === "?")) {
          advance();
          state.start++;
          count++;
        }
        if (count % 2 === 0) {
          return false;
        }
        state.negated = true;
        state.start++;
        return true;
      };
      const increment = (type) => {
        state[type]++;
        stack.push(type);
      };
      const decrement = (type) => {
        state[type]--;
        stack.pop();
      };
      const push = (tok) => {
        if (prev.type === "globstar") {
          const isBrace = state.braces > 0 && (tok.type === "comma" || tok.type === "brace");
          const isExtglob = tok.extglob === true || extglobs.length && (tok.type === "pipe" || tok.type === "paren");
          if (tok.type !== "slash" && tok.type !== "paren" && !isBrace && !isExtglob) {
            state.output = state.output.slice(0, -prev.output.length);
            prev.type = "star";
            prev.value = "*";
            prev.output = star;
            state.output += prev.output;
          }
        }
        if (extglobs.length && tok.type !== "paren") {
          extglobs[extglobs.length - 1].inner += tok.value;
        }
        if (tok.value || tok.output) append(tok);
        if (prev && prev.type === "text" && tok.type === "text") {
          prev.output = (prev.output || prev.value) + tok.value;
          prev.value += tok.value;
          return;
        }
        tok.prev = prev;
        tokens.push(tok);
        prev = tok;
      };
      const extglobOpen = (type, value2) => {
        const token = { ...EXTGLOB_CHARS[value2], conditions: 1, inner: "" };
        token.prev = prev;
        token.parens = state.parens;
        token.output = state.output;
        token.startIndex = state.index;
        token.tokensIndex = tokens.length;
        const output = (opts.capture ? "(" : "") + token.open;
        increment("parens");
        push({ type, value: value2, output: state.output ? "" : ONE_CHAR });
        push({ type: "paren", extglob: true, value: advance(), output });
        extglobs.push(token);
      };
      const extglobClose = (token) => {
        const literal2 = input.slice(token.startIndex, state.index + 1);
        const body2 = input.slice(token.startIndex + 2, state.index);
        const analysis = analyzeRepeatedExtglob(body2, opts);
        if ((token.type === "plus" || token.type === "star") && analysis.risky) {
          const safeOutput = analysis.safeOutput ? (token.output ? "" : ONE_CHAR) + (opts.capture ? `(${analysis.safeOutput})` : analysis.safeOutput) : void 0;
          const open = tokens[token.tokensIndex];
          open.type = "text";
          open.value = literal2;
          open.output = safeOutput || utils.escapeRegex(literal2);
          for (let i2 = token.tokensIndex + 1; i2 < tokens.length; i2++) {
            tokens[i2].value = "";
            tokens[i2].output = "";
            delete tokens[i2].suffix;
          }
          state.output = token.output + open.output;
          state.backtrack = true;
          push({ type: "paren", extglob: true, value, output: "" });
          decrement("parens");
          return;
        }
        let output = token.close + (opts.capture ? ")" : "");
        let rest;
        if (token.type === "negate") {
          let extglobStar = star;
          if (token.inner && token.inner.length > 1 && token.inner.includes("/")) {
            extglobStar = globstar(opts);
          }
          if (extglobStar !== star || eos() || /^\)+$/.test(remaining())) {
            output = token.close = `)$))${extglobStar}`;
          }
          if (token.inner.includes("*") && (rest = remaining()) && /^\.[^\\/.]+$/.test(rest)) {
            const expression = parse2(rest, { ...options, fastpaths: false }).output;
            output = token.close = `)${expression})${extglobStar})`;
          }
          if (token.prev.type === "bos") {
            state.negatedExtglob = true;
          }
        }
        push({ type: "paren", extglob: true, value, output });
        decrement("parens");
      };
      if (opts.fastpaths !== false && !/(^[*!]|[/()[\]{}"])/.test(input)) {
        let backslashes = false;
        let output = input.replace(REGEX_SPECIAL_CHARS_BACKREF, (m, esc, chars, first, rest, index) => {
          if (first === "\\") {
            backslashes = true;
            return m;
          }
          if (first === "?") {
            if (esc) {
              return esc + first + (rest ? QMARK.repeat(rest.length) : "");
            }
            if (index === 0) {
              return qmarkNoDot + (rest ? QMARK.repeat(rest.length) : "");
            }
            return QMARK.repeat(chars.length);
          }
          if (first === ".") {
            return DOT_LITERAL.repeat(chars.length);
          }
          if (first === "*") {
            if (esc) {
              return esc + first + (rest ? star : "");
            }
            return star;
          }
          return esc ? m : `\\${m}`;
        });
        if (backslashes === true) {
          if (opts.unescape === true) {
            output = output.replace(/\\/g, "");
          } else {
            output = output.replace(/\\+/g, (m) => {
              return m.length % 2 === 0 ? "\\\\" : m ? "\\" : "";
            });
          }
        }
        if (output === input && opts.contains === true) {
          state.output = input;
          return state;
        }
        state.output = utils.wrapOutput(output, state, options);
        return state;
      }
      while (!eos()) {
        value = advance();
        if (value === "\0") {
          continue;
        }
        if (value === "\\") {
          const next = peek();
          if (next === "/" && opts.bash !== true) {
            continue;
          }
          if (next === "." || next === ";") {
            continue;
          }
          if (!next) {
            value += "\\";
            push({ type: "text", value });
            continue;
          }
          const match = /^\\+/.exec(remaining());
          let slashes = 0;
          if (match && match[0].length > 2) {
            slashes = match[0].length;
            state.index += slashes;
            if (slashes % 2 !== 0) {
              value += "\\";
            }
          }
          if (opts.unescape === true) {
            value = advance();
          } else {
            value += advance();
          }
          if (state.brackets === 0) {
            push({ type: "text", value });
            continue;
          }
        }
        if (state.brackets > 0 && (value !== "]" || prev.value === "[" || prev.value === "[^")) {
          if (opts.posix !== false && value === ":") {
            const inner = prev.value.slice(1);
            if (inner.includes("[")) {
              prev.posix = true;
              if (inner.includes(":")) {
                const idx = prev.value.lastIndexOf("[");
                const pre = prev.value.slice(0, idx);
                const rest2 = prev.value.slice(idx + 2);
                const posix = POSIX_REGEX_SOURCE[rest2];
                if (posix) {
                  prev.value = pre + posix;
                  state.backtrack = true;
                  advance();
                  if (!bos.output && tokens.indexOf(prev) === 1) {
                    bos.output = ONE_CHAR;
                  }
                  continue;
                }
              }
            }
          }
          if (value === "[" && peek() !== ":" || value === "-" && peek() === "]") {
            value = `\\${value}`;
          }
          if (value === "]" && (prev.value === "[" || prev.value === "[^")) {
            value = `\\${value}`;
          }
          if (opts.posix === true && value === "!" && prev.value === "[") {
            value = "^";
          }
          prev.value += value;
          append({ value });
          continue;
        }
        if (state.quotes === 1 && value !== '"') {
          value = utils.escapeRegex(value);
          prev.value += value;
          append({ value });
          continue;
        }
        if (value === '"') {
          state.quotes = state.quotes === 1 ? 0 : 1;
          if (opts.keepQuotes === true) {
            push({ type: "text", value });
          }
          continue;
        }
        if (value === "(") {
          increment("parens");
          push({ type: "paren", value });
          continue;
        }
        if (value === ")") {
          if (state.parens === 0 && opts.strictBrackets === true) {
            throw new SyntaxError(syntaxError("opening", "("));
          }
          const extglob = extglobs[extglobs.length - 1];
          if (extglob && state.parens === extglob.parens + 1) {
            extglobClose(extglobs.pop());
            continue;
          }
          push({ type: "paren", value, output: state.parens ? ")" : "\\)" });
          decrement("parens");
          continue;
        }
        if (value === "[") {
          if (opts.nobracket === true || !remaining().includes("]")) {
            if (opts.nobracket !== true && opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("closing", "]"));
            }
            value = `\\${value}`;
          } else {
            increment("brackets");
          }
          push({ type: "bracket", value });
          continue;
        }
        if (value === "]") {
          if (opts.nobracket === true || prev && prev.type === "bracket" && prev.value.length === 1) {
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          if (state.brackets === 0) {
            if (opts.strictBrackets === true) {
              throw new SyntaxError(syntaxError("opening", "["));
            }
            push({ type: "text", value, output: `\\${value}` });
            continue;
          }
          decrement("brackets");
          const prevValue = prev.value.slice(1);
          if (prev.posix !== true && prevValue[0] === "^" && !prevValue.includes("/")) {
            value = `/${value}`;
          }
          prev.value += value;
          append({ value });
          if (opts.literalBrackets === false || utils.hasRegexChars(prevValue)) {
            continue;
          }
          const escaped = utils.escapeRegex(prev.value);
          state.output = state.output.slice(0, -prev.value.length);
          if (opts.literalBrackets === true) {
            state.output += escaped;
            prev.value = escaped;
            continue;
          }
          prev.value = `(${capture}${escaped}|${prev.value})`;
          state.output += prev.value;
          continue;
        }
        if (value === "{" && opts.nobrace !== true) {
          increment("braces");
          const open = {
            type: "brace",
            value,
            output: "(",
            outputIndex: state.output.length,
            tokensIndex: state.tokens.length
          };
          braces.push(open);
          push(open);
          continue;
        }
        if (value === "}") {
          const brace = braces[braces.length - 1];
          if (opts.nobrace === true || !brace) {
            push({ type: "text", value, output: value });
            continue;
          }
          let output = ")";
          if (brace.dots === true) {
            const arr = tokens.slice();
            const range = [];
            for (let i2 = arr.length - 1; i2 >= 0; i2--) {
              tokens.pop();
              if (arr[i2].type === "brace") {
                break;
              }
              if (arr[i2].type !== "dots") {
                range.unshift(arr[i2].value);
              }
            }
            output = expandRange(range, opts);
            state.backtrack = true;
          }
          if (brace.comma !== true && brace.dots !== true) {
            const out2 = state.output.slice(0, brace.outputIndex);
            const toks = state.tokens.slice(brace.tokensIndex);
            brace.value = brace.output = "\\{";
            value = output = "\\}";
            state.output = out2;
            for (const t of toks) {
              state.output += t.output || t.value;
            }
          }
          push({ type: "brace", value, output });
          decrement("braces");
          braces.pop();
          continue;
        }
        if (value === "|") {
          if (extglobs.length > 0) {
            extglobs[extglobs.length - 1].conditions++;
          }
          push({ type: "text", value });
          continue;
        }
        if (value === ",") {
          let output = value;
          const brace = braces[braces.length - 1];
          if (brace && stack[stack.length - 1] === "braces") {
            brace.comma = true;
            output = "|";
          }
          push({ type: "comma", value, output });
          continue;
        }
        if (value === "/") {
          if (prev.type === "dot" && state.index === state.start + 1) {
            state.start = state.index + 1;
            state.consumed = "";
            state.output = "";
            tokens.pop();
            prev = bos;
            continue;
          }
          push({ type: "slash", value, output: SLASH_LITERAL });
          continue;
        }
        if (value === ".") {
          if (state.braces > 0 && prev.type === "dot") {
            if (prev.value === ".") prev.output = DOT_LITERAL;
            const brace = braces[braces.length - 1];
            prev.type = "dots";
            prev.output += value;
            prev.value += value;
            brace.dots = true;
            continue;
          }
          if (state.braces + state.parens === 0 && prev.type !== "bos" && prev.type !== "slash") {
            push({ type: "text", value, output: DOT_LITERAL });
            continue;
          }
          push({ type: "dot", value, output: DOT_LITERAL });
          continue;
        }
        if (value === "?") {
          const isGroup = prev && prev.value === "(";
          if (!isGroup && opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("qmark", value);
            continue;
          }
          if (prev && prev.type === "paren") {
            const next = peek();
            let output = value;
            if (prev.value === "(" && !/[!=<:]/.test(next) || next === "<" && !/<([!=]|\w+>)/.test(remaining())) {
              output = `\\${value}`;
            }
            push({ type: "text", value, output });
            continue;
          }
          if (opts.dot !== true && (prev.type === "slash" || prev.type === "bos")) {
            push({ type: "qmark", value, output: QMARK_NO_DOT });
            continue;
          }
          push({ type: "qmark", value, output: QMARK });
          continue;
        }
        if (value === "!") {
          if (opts.noextglob !== true && peek() === "(") {
            if (peek(2) !== "?" || !/[!=<:]/.test(peek(3))) {
              extglobOpen("negate", value);
              continue;
            }
          }
          if (opts.nonegate !== true && state.index === 0) {
            negate();
            continue;
          }
        }
        if (value === "+") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            extglobOpen("plus", value);
            continue;
          }
          if (prev && prev.value === "(" || opts.regex === false) {
            push({ type: "plus", value, output: PLUS_LITERAL });
            continue;
          }
          if (prev && (prev.type === "bracket" || prev.type === "paren" || prev.type === "brace") || state.parens > 0) {
            push({ type: "plus", value });
            continue;
          }
          push({ type: "plus", value: PLUS_LITERAL });
          continue;
        }
        if (value === "@") {
          if (opts.noextglob !== true && peek() === "(" && peek(2) !== "?") {
            push({ type: "at", extglob: true, value, output: "" });
            continue;
          }
          push({ type: "text", value });
          continue;
        }
        if (value !== "*") {
          if (value === "$" || value === "^") {
            value = `\\${value}`;
          }
          const match = REGEX_NON_SPECIAL_CHARS.exec(remaining());
          if (match) {
            value += match[0];
            state.index += match[0].length;
          }
          push({ type: "text", value });
          continue;
        }
        if (prev && (prev.type === "globstar" || prev.star === true)) {
          prev.type = "star";
          prev.star = true;
          prev.value += value;
          prev.output = star;
          state.backtrack = true;
          state.globstar = true;
          consume(value);
          continue;
        }
        let rest = remaining();
        if (opts.noextglob !== true && /^\([^?]/.test(rest)) {
          extglobOpen("star", value);
          continue;
        }
        if (prev.type === "star") {
          if (opts.noglobstar === true) {
            consume(value);
            continue;
          }
          const prior = prev.prev;
          const before = prior.prev;
          const isStart = prior.type === "slash" || prior.type === "bos";
          const afterStar = before && (before.type === "star" || before.type === "globstar");
          if (opts.bash === true && (!isStart || rest[0] && rest[0] !== "/")) {
            push({ type: "star", value, output: "" });
            continue;
          }
          const isBrace = state.braces > 0 && (prior.type === "comma" || prior.type === "brace");
          const isExtglob = extglobs.length && (prior.type === "pipe" || prior.type === "paren");
          if (!isStart && prior.type !== "paren" && !isBrace && !isExtglob) {
            push({ type: "star", value, output: "" });
            continue;
          }
          while (rest.slice(0, 3) === "/**") {
            const after = input[state.index + 4];
            if (after && after !== "/") {
              break;
            }
            rest = rest.slice(3);
            consume("/**", 3);
          }
          const isEnd = eos() || state.parens > 0 && rest === ")".repeat(state.parens) && !extglobs.some((extglob) => extglob.type === "negate");
          if (prior.type === "bos" && eos()) {
            prev.type = "globstar";
            prev.value += value;
            prev.output = globstar(opts);
            state.output = prev.output;
            state.globstar = true;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && !afterStar && isEnd) {
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = globstar(opts) + (opts.strictSlashes ? ")" : "|$)");
            prev.value += value;
            state.globstar = true;
            state.output += prior.output + prev.output;
            consume(value);
            continue;
          }
          if (prior.type === "slash" && prior.prev.type !== "bos" && rest[0] === "/") {
            const end = rest[1] !== void 0 ? "|$" : "";
            state.output = state.output.slice(0, -(prior.output + prev.output).length);
            prior.output = `(?:${prior.output}`;
            prev.type = "globstar";
            prev.output = `${globstar(opts)}${SLASH_LITERAL}|${SLASH_LITERAL}${end})`;
            prev.value += value;
            state.output += prior.output + prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          if (prior.type === "bos" && rest[0] === "/") {
            prev.type = "globstar";
            prev.value += value;
            prev.output = `(?:^|${SLASH_LITERAL}|${globstar(opts)}${SLASH_LITERAL})`;
            state.output = prev.output;
            state.globstar = true;
            consume(value + advance());
            push({ type: "slash", value: "/", output: "" });
            continue;
          }
          state.output = state.output.slice(0, -prev.output.length);
          prev.type = "globstar";
          prev.output = globstar(opts);
          prev.value += value;
          state.output += prev.output;
          state.globstar = true;
          consume(value);
          continue;
        }
        const token = { type: "star", value, output: star };
        if (opts.bash === true) {
          token.output = ".*?";
          if (prev.type === "bos" || prev.type === "slash") {
            token.output = nodot + token.output;
          }
          push(token);
          continue;
        }
        if (prev && (prev.type === "bracket" || prev.type === "paren") && opts.regex === true) {
          token.output = value;
          push(token);
          continue;
        }
        if (state.index === state.start || prev.type === "slash" || prev.type === "dot") {
          if (prev.type === "dot") {
            state.output += NO_DOT_SLASH;
            prev.output += NO_DOT_SLASH;
          } else if (opts.dot === true) {
            state.output += NO_DOTS_SLASH;
            prev.output += NO_DOTS_SLASH;
          } else {
            state.output += nodot;
            prev.output += nodot;
          }
          if (peek() !== "*") {
            state.output += ONE_CHAR;
            prev.output += ONE_CHAR;
          }
        }
        push(token);
      }
      while (state.brackets > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "]"));
        state.output = utils.escapeLast(state.output, "[");
        decrement("brackets");
      }
      while (state.parens > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", ")"));
        state.output = utils.escapeLast(state.output, "(");
        decrement("parens");
      }
      while (state.braces > 0) {
        if (opts.strictBrackets === true) throw new SyntaxError(syntaxError("closing", "}"));
        state.output = utils.escapeLast(state.output, "{");
        decrement("braces");
      }
      if (opts.strictSlashes !== true && (prev.type === "star" || prev.type === "bracket")) {
        push({ type: "maybe_slash", value: "", output: `${SLASH_LITERAL}?` });
      }
      if (state.backtrack === true) {
        state.output = "";
        for (const token of state.tokens) {
          state.output += token.output != null ? token.output : token.value;
          if (token.suffix) {
            state.output += token.suffix;
          }
        }
      }
      return state;
    };
    parse2.fastpaths = (input, options) => {
      const opts = { ...options };
      const max = typeof opts.maxLength === "number" ? Math.min(MAX_LENGTH, opts.maxLength) : MAX_LENGTH;
      const len = input.length;
      if (len > max) {
        throw new SyntaxError(`Input length: ${len}, exceeds maximum allowed length: ${max}`);
      }
      input = REPLACEMENTS[input] || input;
      const {
        DOT_LITERAL,
        SLASH_LITERAL,
        ONE_CHAR,
        DOTS_SLASH,
        NO_DOT,
        NO_DOTS,
        NO_DOTS_SLASH,
        STAR,
        START_ANCHOR
      } = constants.globChars(opts.windows);
      const nodot = opts.dot ? NO_DOTS : NO_DOT;
      const slashDot = opts.dot ? NO_DOTS_SLASH : NO_DOT;
      const capture = opts.capture ? "" : "?:";
      const state = { negated: false, prefix: "" };
      let star = opts.bash === true ? ".*?" : STAR;
      if (opts.capture) {
        star = `(${star})`;
      }
      const globstar = (opts2) => {
        if (opts2.noglobstar === true) return star;
        return `(${capture}(?:(?!${START_ANCHOR}${opts2.dot ? DOTS_SLASH : DOT_LITERAL}).)*?)`;
      };
      const create = (str) => {
        switch (str) {
          case "*":
            return `${nodot}${ONE_CHAR}${star}`;
          case ".*":
            return `${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*.*":
            return `${nodot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "*/*":
            return `${nodot}${star}${SLASH_LITERAL}${ONE_CHAR}${slashDot}${star}`;
          case "**":
            return nodot + globstar(opts);
          case "**/*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${ONE_CHAR}${star}`;
          case "**/*.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${slashDot}${star}${DOT_LITERAL}${ONE_CHAR}${star}`;
          case "**/.*":
            return `(?:${nodot}${globstar(opts)}${SLASH_LITERAL})?${DOT_LITERAL}${ONE_CHAR}${star}`;
          default: {
            const match = /^(.*?)\.(\w+)$/.exec(str);
            if (!match) return;
            const source2 = create(match[1]);
            if (!source2) return;
            return source2 + DOT_LITERAL + match[2];
          }
        }
      };
      const output = utils.removePrefix(input, state);
      let source = create(output);
      if (source && opts.strictSlashes !== true) {
        source += `${SLASH_LITERAL}?`;
      }
      return source;
    };
    module2.exports = parse2;
  }
});

// node_modules/picomatch/lib/picomatch.js
var require_picomatch = __commonJS({
  "node_modules/picomatch/lib/picomatch.js"(exports, module2) {
    "use strict";
    var scan2 = require_scan();
    var parse2 = require_parse();
    var utils = require_utils();
    var constants = require_constants();
    var isObject = (val) => val && typeof val === "object" && !Array.isArray(val);
    var picomatch3 = (glob, options, returnState = false) => {
      if (Array.isArray(glob)) {
        const fns = glob.map((input) => picomatch3(input, options, returnState));
        const arrayMatcher = (str) => {
          for (const isMatch of fns) {
            const state2 = isMatch(str);
            if (state2) return state2;
          }
          return false;
        };
        return arrayMatcher;
      }
      const isState = isObject(glob) && glob.tokens && glob.input;
      if (glob === "" || typeof glob !== "string" && !isState) {
        throw new TypeError("Expected pattern to be a non-empty string");
      }
      const opts = options || {};
      const posix = opts.windows;
      const regex = isState ? picomatch3.compileRe(glob, options) : picomatch3.makeRe(glob, options, false, true);
      const state = regex.state;
      delete regex.state;
      let isIgnored = () => false;
      if (opts.ignore) {
        const ignoreOpts = { ...options, ignore: null, onMatch: null, onResult: null };
        isIgnored = picomatch3(opts.ignore, ignoreOpts, returnState);
      }
      const matcher = (input, returnObject = false) => {
        const { isMatch, match, output } = picomatch3.test(input, regex, options, { glob, posix });
        const result = { glob, state, regex, posix, input, output, match, isMatch };
        if (typeof opts.onResult === "function") {
          opts.onResult(result);
        }
        if (isMatch === false) {
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (isIgnored(input)) {
          if (typeof opts.onIgnore === "function") {
            opts.onIgnore(result);
          }
          result.isMatch = false;
          return returnObject ? result : false;
        }
        if (typeof opts.onMatch === "function") {
          opts.onMatch(result);
        }
        return returnObject ? result : true;
      };
      if (returnState) {
        matcher.state = state;
      }
      return matcher;
    };
    picomatch3.test = (input, regex, options, { glob, posix } = {}) => {
      if (typeof input !== "string") {
        throw new TypeError("Expected input to be a string");
      }
      if (input === "") {
        return { isMatch: false, output: "" };
      }
      const opts = options || {};
      const format = opts.format || (posix ? utils.toPosixSlashes : null);
      let match = input === glob;
      let output = match && format ? format(input) : input;
      if (match === false) {
        output = format ? format(input) : input;
        match = output === glob;
      }
      if (match === false || opts.capture === true) {
        if (opts.matchBase === true || opts.basename === true) {
          match = picomatch3.matchBase(input, regex, options, posix);
        } else {
          match = regex.exec(output);
        }
      }
      return { isMatch: Boolean(match), match, output };
    };
    picomatch3.matchBase = (input, glob, options, posix = options && options.windows) => {
      const regex = glob instanceof RegExp ? glob : picomatch3.makeRe(glob, options);
      return regex.test(utils.basename(input, { windows: posix }));
    };
    picomatch3.isMatch = (str, patterns, options) => picomatch3(patterns, options)(str);
    picomatch3.parse = (pattern, options) => {
      if (Array.isArray(pattern)) return pattern.map((p) => picomatch3.parse(p, options));
      return parse2(pattern, { ...options, fastpaths: false });
    };
    picomatch3.scan = (input, options) => scan2(input, options);
    picomatch3.compileRe = (state, options, returnOutput = false, returnState = false) => {
      if (returnOutput === true) {
        return state.output;
      }
      const opts = options || {};
      const prepend = opts.contains ? "" : "^";
      const append = opts.contains ? "" : "$";
      let source = `${prepend}(?:${state.output})${append}`;
      if (state && state.negated === true) {
        source = `^(?!${source}).*$`;
      }
      const regex = picomatch3.toRegex(source, options);
      if (returnState === true) {
        regex.state = state;
      }
      return regex;
    };
    picomatch3.makeRe = (input, options = {}, returnOutput = false, returnState = false) => {
      if (!input || typeof input !== "string") {
        throw new TypeError("Expected a non-empty string");
      }
      let parsed = { negated: false, fastpaths: true };
      if (options.fastpaths !== false && (input[0] === "." || input[0] === "*")) {
        parsed.output = parse2.fastpaths(input, options);
      }
      if (!parsed.output) {
        parsed = parse2(input, options);
      }
      return picomatch3.compileRe(parsed, options, returnOutput, returnState);
    };
    picomatch3.toRegex = (source, options) => {
      try {
        const opts = options || {};
        return new RegExp(source, opts.flags || (opts.nocase ? "i" : ""));
      } catch (err2) {
        if (options && options.debug === true) throw err2;
        return /$^/;
      }
    };
    picomatch3.constants = constants;
    module2.exports = picomatch3;
  }
});

// node_modules/picomatch/index.js
var require_picomatch2 = __commonJS({
  "node_modules/picomatch/index.js"(exports, module2) {
    "use strict";
    var pico = require_picomatch();
    var utils = require_utils();
    function picomatch3(glob, options, returnState = false) {
      if (options && (options.windows === null || options.windows === void 0)) {
        options = { ...options, windows: utils.isWindows() };
      }
      return pico(glob, options, returnState);
    }
    Object.assign(picomatch3, pico);
    module2.exports = picomatch3;
  }
});

// node_modules/yaml/dist/nodes/identity.js
var require_identity = __commonJS({
  "node_modules/yaml/dist/nodes/identity.js"(exports) {
    "use strict";
    var ALIAS = /* @__PURE__ */ Symbol.for("yaml.alias");
    var DOC = /* @__PURE__ */ Symbol.for("yaml.document");
    var MAP = /* @__PURE__ */ Symbol.for("yaml.map");
    var PAIR = /* @__PURE__ */ Symbol.for("yaml.pair");
    var SCALAR = /* @__PURE__ */ Symbol.for("yaml.scalar");
    var SEQ = /* @__PURE__ */ Symbol.for("yaml.seq");
    var NODE_TYPE = /* @__PURE__ */ Symbol.for("yaml.node.type");
    var isAlias = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === ALIAS;
    var isDocument = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === DOC;
    var isMap = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === MAP;
    var isPair = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === PAIR;
    var isScalar = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SCALAR;
    var isSeq = (node) => !!node && typeof node === "object" && node[NODE_TYPE] === SEQ;
    function isCollection(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case MAP:
          case SEQ:
            return true;
        }
      return false;
    }
    function isNode(node) {
      if (node && typeof node === "object")
        switch (node[NODE_TYPE]) {
          case ALIAS:
          case MAP:
          case SCALAR:
          case SEQ:
            return true;
        }
      return false;
    }
    var hasAnchor = (node) => (isScalar(node) || isCollection(node)) && !!node.anchor;
    exports.ALIAS = ALIAS;
    exports.DOC = DOC;
    exports.MAP = MAP;
    exports.NODE_TYPE = NODE_TYPE;
    exports.PAIR = PAIR;
    exports.SCALAR = SCALAR;
    exports.SEQ = SEQ;
    exports.hasAnchor = hasAnchor;
    exports.isAlias = isAlias;
    exports.isCollection = isCollection;
    exports.isDocument = isDocument;
    exports.isMap = isMap;
    exports.isNode = isNode;
    exports.isPair = isPair;
    exports.isScalar = isScalar;
    exports.isSeq = isSeq;
  }
});

// node_modules/yaml/dist/visit.js
var require_visit = __commonJS({
  "node_modules/yaml/dist/visit.js"(exports) {
    "use strict";
    var identity = require_identity();
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove node");
    function visit(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = visit_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        visit_(null, node, visitor_, Object.freeze([]));
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    function visit_(key, node, visitor, path) {
      const ctrl = callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visit_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i2 = 0; i2 < node.items.length; ++i2) {
            const ci = visit_(i2, node.items[i2], visitor, path);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i2, 1);
              i2 -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = visit_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = visit_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    async function visitAsync(node, visitor) {
      const visitor_ = initVisitor(visitor);
      if (identity.isDocument(node)) {
        const cd = await visitAsync_(null, node.contents, visitor_, Object.freeze([node]));
        if (cd === REMOVE)
          node.contents = null;
      } else
        await visitAsync_(null, node, visitor_, Object.freeze([]));
    }
    visitAsync.BREAK = BREAK;
    visitAsync.SKIP = SKIP;
    visitAsync.REMOVE = REMOVE;
    async function visitAsync_(key, node, visitor, path) {
      const ctrl = await callVisitor(key, node, visitor, path);
      if (identity.isNode(ctrl) || identity.isPair(ctrl)) {
        replaceNode(key, path, ctrl);
        return visitAsync_(key, ctrl, visitor, path);
      }
      if (typeof ctrl !== "symbol") {
        if (identity.isCollection(node)) {
          path = Object.freeze(path.concat(node));
          for (let i2 = 0; i2 < node.items.length; ++i2) {
            const ci = await visitAsync_(i2, node.items[i2], visitor, path);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              node.items.splice(i2, 1);
              i2 -= 1;
            }
          }
        } else if (identity.isPair(node)) {
          path = Object.freeze(path.concat(node));
          const ck = await visitAsync_("key", node.key, visitor, path);
          if (ck === BREAK)
            return BREAK;
          else if (ck === REMOVE)
            node.key = null;
          const cv = await visitAsync_("value", node.value, visitor, path);
          if (cv === BREAK)
            return BREAK;
          else if (cv === REMOVE)
            node.value = null;
        }
      }
      return ctrl;
    }
    function initVisitor(visitor) {
      if (typeof visitor === "object" && (visitor.Collection || visitor.Node || visitor.Value)) {
        return Object.assign({
          Alias: visitor.Node,
          Map: visitor.Node,
          Scalar: visitor.Node,
          Seq: visitor.Node
        }, visitor.Value && {
          Map: visitor.Value,
          Scalar: visitor.Value,
          Seq: visitor.Value
        }, visitor.Collection && {
          Map: visitor.Collection,
          Seq: visitor.Collection
        }, visitor);
      }
      return visitor;
    }
    function callVisitor(key, node, visitor, path) {
      if (typeof visitor === "function")
        return visitor(key, node, path);
      if (identity.isMap(node))
        return visitor.Map?.(key, node, path);
      if (identity.isSeq(node))
        return visitor.Seq?.(key, node, path);
      if (identity.isPair(node))
        return visitor.Pair?.(key, node, path);
      if (identity.isScalar(node))
        return visitor.Scalar?.(key, node, path);
      if (identity.isAlias(node))
        return visitor.Alias?.(key, node, path);
      return void 0;
    }
    function replaceNode(key, path, node) {
      const parent = path[path.length - 1];
      if (identity.isCollection(parent)) {
        parent.items[key] = node;
      } else if (identity.isPair(parent)) {
        if (key === "key")
          parent.key = node;
        else
          parent.value = node;
      } else if (identity.isDocument(parent)) {
        parent.contents = node;
      } else {
        const pt = identity.isAlias(parent) ? "alias" : "scalar";
        throw new Error(`Cannot replace node with ${pt} parent`);
      }
    }
    exports.visit = visit;
    exports.visitAsync = visitAsync;
  }
});

// node_modules/yaml/dist/doc/directives.js
var require_directives = __commonJS({
  "node_modules/yaml/dist/doc/directives.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    var escapeChars = {
      "!": "%21",
      ",": "%2C",
      "[": "%5B",
      "]": "%5D",
      "{": "%7B",
      "}": "%7D"
    };
    var escapeTagName = (tn) => tn.replace(/[!,[\]{}]/g, (ch) => escapeChars[ch]);
    var Directives = class _Directives {
      constructor(yaml, tags) {
        this.docStart = null;
        this.docEnd = false;
        this.yaml = Object.assign({}, _Directives.defaultYaml, yaml);
        this.tags = Object.assign({}, _Directives.defaultTags, tags);
      }
      clone() {
        const copy = new _Directives(this.yaml, this.tags);
        copy.docStart = this.docStart;
        return copy;
      }
      /**
       * During parsing, get a Directives instance for the current document and
       * update the stream state according to the current version's spec.
       */
      atDocument() {
        const res = new _Directives(this.yaml, this.tags);
        switch (this.yaml.version) {
          case "1.1":
            this.atNextDocument = true;
            break;
          case "1.2":
            this.atNextDocument = false;
            this.yaml = {
              explicit: _Directives.defaultYaml.explicit,
              version: "1.2"
            };
            this.tags = Object.assign({}, _Directives.defaultTags);
            break;
        }
        return res;
      }
      /**
       * @param onError - May be called even if the action was successful
       * @returns `true` on success
       */
      add(line, onError) {
        if (this.atNextDocument) {
          this.yaml = { explicit: _Directives.defaultYaml.explicit, version: "1.1" };
          this.tags = Object.assign({}, _Directives.defaultTags);
          this.atNextDocument = false;
        }
        const parts2 = line.trim().split(/[ \t]+/);
        const name2 = parts2.shift();
        switch (name2) {
          case "%TAG": {
            if (parts2.length !== 2) {
              onError(0, "%TAG directive should contain exactly two parts");
              if (parts2.length < 2)
                return false;
            }
            const [handle2, prefix] = parts2;
            this.tags[handle2] = prefix;
            return true;
          }
          case "%YAML": {
            this.yaml.explicit = true;
            if (parts2.length !== 1) {
              onError(0, "%YAML directive should contain exactly one part");
              return false;
            }
            const [version] = parts2;
            if (version === "1.1" || version === "1.2") {
              this.yaml.version = version;
              return true;
            } else {
              const isValid = /^\d+\.\d+$/.test(version);
              onError(6, `Unsupported YAML version ${version}`, isValid);
              return false;
            }
          }
          default:
            onError(0, `Unknown directive ${name2}`, true);
            return false;
        }
      }
      /**
       * Resolves a tag, matching handles to those defined in %TAG directives.
       *
       * @returns Resolved tag, which may also be the non-specific tag `'!'` or a
       *   `'!local'` tag, or `null` if unresolvable.
       */
      tagName(source, onError) {
        if (source === "!")
          return "!";
        if (source[0] !== "!") {
          onError(`Not a valid tag: ${source}`);
          return null;
        }
        if (source[1] === "<") {
          const verbatim = source.slice(2, -1);
          if (verbatim === "!" || verbatim === "!!") {
            onError(`Verbatim tags aren't resolved, so ${source} is invalid.`);
            return null;
          }
          if (source[source.length - 1] !== ">")
            onError("Verbatim tags must end with a >");
          return verbatim;
        }
        const [, handle2, suffix] = source.match(/^(.*!)([^!]*)$/s);
        if (!suffix)
          onError(`The ${source} tag has no suffix`);
        const prefix = this.tags[handle2];
        if (prefix) {
          try {
            return prefix + decodeURIComponent(suffix);
          } catch (error) {
            onError(String(error));
            return null;
          }
        }
        if (handle2 === "!")
          return source;
        onError(`Could not resolve tag: ${source}`);
        return null;
      }
      /**
       * Given a fully resolved tag, returns its printable string form,
       * taking into account current tag prefixes and defaults.
       */
      tagString(tag) {
        for (const [handle2, prefix] of Object.entries(this.tags)) {
          if (tag.startsWith(prefix))
            return handle2 + escapeTagName(tag.substring(prefix.length));
        }
        return tag[0] === "!" ? tag : `!<${tag}>`;
      }
      toString(doc) {
        const lines = this.yaml.explicit ? [`%YAML ${this.yaml.version || "1.2"}`] : [];
        const tagEntries = Object.entries(this.tags);
        let tagNames;
        if (doc && tagEntries.length > 0 && identity.isNode(doc.contents)) {
          const tags = {};
          visit.visit(doc.contents, (_key, node) => {
            if (identity.isNode(node) && node.tag)
              tags[node.tag] = true;
          });
          tagNames = Object.keys(tags);
        } else
          tagNames = [];
        for (const [handle2, prefix] of tagEntries) {
          if (handle2 === "!!" && prefix === "tag:yaml.org,2002:")
            continue;
          if (!doc || tagNames.some((tn) => tn.startsWith(prefix)))
            lines.push(`%TAG ${handle2} ${prefix}`);
        }
        return lines.join("\n");
      }
    };
    Directives.defaultYaml = { explicit: false, version: "1.2" };
    Directives.defaultTags = { "!!": "tag:yaml.org,2002:" };
    exports.Directives = Directives;
  }
});

// node_modules/yaml/dist/doc/anchors.js
var require_anchors = __commonJS({
  "node_modules/yaml/dist/doc/anchors.js"(exports) {
    "use strict";
    var identity = require_identity();
    var visit = require_visit();
    function anchorIsValid(anchor) {
      if (/[\x00-\x19\s,[\]{}]/.test(anchor)) {
        const sa = JSON.stringify(anchor);
        const msg = `Anchor must not contain whitespace or control characters: ${sa}`;
        throw new Error(msg);
      }
      return true;
    }
    function anchorNames(root) {
      const anchors = /* @__PURE__ */ new Set();
      visit.visit(root, {
        Value(_key, node) {
          if (node.anchor)
            anchors.add(node.anchor);
        }
      });
      return anchors;
    }
    function findNewAnchor(prefix, exclude) {
      for (let i2 = 1; true; ++i2) {
        const name2 = `${prefix}${i2}`;
        if (!exclude.has(name2))
          return name2;
      }
    }
    function createNodeAnchors(doc, prefix) {
      const aliasObjects = [];
      const sourceObjects = /* @__PURE__ */ new Map();
      let prevAnchors = null;
      return {
        onAnchor: (source) => {
          aliasObjects.push(source);
          prevAnchors ?? (prevAnchors = anchorNames(doc));
          const anchor = findNewAnchor(prefix, prevAnchors);
          prevAnchors.add(anchor);
          return anchor;
        },
        /**
         * With circular references, the source node is only resolved after all
         * of its child nodes are. This is why anchors are set only after all of
         * the nodes have been created.
         */
        setAnchors: () => {
          for (const source of aliasObjects) {
            const ref = sourceObjects.get(source);
            if (typeof ref === "object" && ref.anchor && (identity.isScalar(ref.node) || identity.isCollection(ref.node))) {
              ref.node.anchor = ref.anchor;
            } else {
              const error = new Error("Failed to resolve repeated object (this should not happen)");
              error.source = source;
              throw error;
            }
          }
        },
        sourceObjects
      };
    }
    exports.anchorIsValid = anchorIsValid;
    exports.anchorNames = anchorNames;
    exports.createNodeAnchors = createNodeAnchors;
    exports.findNewAnchor = findNewAnchor;
  }
});

// node_modules/yaml/dist/doc/applyReviver.js
var require_applyReviver = __commonJS({
  "node_modules/yaml/dist/doc/applyReviver.js"(exports) {
    "use strict";
    function applyReviver(reviver, obj, key, val) {
      if (val && typeof val === "object") {
        if (Array.isArray(val)) {
          for (let i2 = 0, len = val.length; i2 < len; ++i2) {
            const v0 = val[i2];
            const v1 = applyReviver(reviver, val, String(i2), v0);
            if (v1 === void 0)
              delete val[i2];
            else if (v1 !== v0)
              val[i2] = v1;
          }
        } else if (val instanceof Map) {
          for (const k of Array.from(val.keys())) {
            const v0 = val.get(k);
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              val.delete(k);
            else if (v1 !== v0)
              val.set(k, v1);
          }
        } else if (val instanceof Set) {
          for (const v0 of Array.from(val)) {
            const v1 = applyReviver(reviver, val, v0, v0);
            if (v1 === void 0)
              val.delete(v0);
            else if (v1 !== v0) {
              val.delete(v0);
              val.add(v1);
            }
          }
        } else {
          for (const [k, v0] of Object.entries(val)) {
            const v1 = applyReviver(reviver, val, k, v0);
            if (v1 === void 0)
              delete val[k];
            else if (v1 !== v0)
              val[k] = v1;
          }
        }
      }
      return reviver.call(obj, key, val);
    }
    exports.applyReviver = applyReviver;
  }
});

// node_modules/yaml/dist/nodes/toJS.js
var require_toJS = __commonJS({
  "node_modules/yaml/dist/nodes/toJS.js"(exports) {
    "use strict";
    var identity = require_identity();
    function toJS(value, arg, ctx) {
      if (Array.isArray(value))
        return value.map((v, i2) => toJS(v, String(i2), ctx));
      if (value && typeof value.toJSON === "function") {
        if (!ctx || !identity.hasAnchor(value))
          return value.toJSON(arg, ctx);
        const data = { aliasCount: 0, count: 1, res: void 0 };
        ctx.anchors.set(value, data);
        ctx.onCreate = (res2) => {
          data.res = res2;
          delete ctx.onCreate;
        };
        const res = value.toJSON(arg, ctx);
        if (ctx.onCreate)
          ctx.onCreate(res);
        return res;
      }
      if (typeof value === "bigint" && !ctx?.keep)
        return Number(value);
      return value;
    }
    exports.toJS = toJS;
  }
});

// node_modules/yaml/dist/nodes/Node.js
var require_Node = __commonJS({
  "node_modules/yaml/dist/nodes/Node.js"(exports) {
    "use strict";
    var applyReviver = require_applyReviver();
    var identity = require_identity();
    var toJS = require_toJS();
    var NodeBase = class {
      constructor(type) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: type });
      }
      /** Create a copy of this node.  */
      clone() {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** A plain JavaScript representation of this node. */
      toJS(doc, { mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        if (!identity.isDocument(doc))
          throw new TypeError("A document argument is required");
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc,
          keep: true,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this, "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
    };
    exports.NodeBase = NodeBase;
  }
});

// node_modules/yaml/dist/nodes/Alias.js
var require_Alias = __commonJS({
  "node_modules/yaml/dist/nodes/Alias.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var visit = require_visit();
    var identity = require_identity();
    var Node2 = require_Node();
    var toJS = require_toJS();
    var Alias = class extends Node2.NodeBase {
      constructor(source) {
        super(identity.ALIAS);
        this.source = source;
        Object.defineProperty(this, "tag", {
          set() {
            throw new Error("Alias nodes cannot have tags");
          }
        });
      }
      /**
       * Resolve the value of this alias within `doc`, finding the last
       * instance of the `source` anchor before this node.
       */
      resolve(doc, ctx) {
        if (ctx?.maxAliasCount === 0)
          throw new ReferenceError("Alias resolution is disabled");
        let nodes;
        if (ctx?.aliasResolveCache) {
          nodes = ctx.aliasResolveCache;
        } else {
          nodes = [];
          visit.visit(doc, {
            Node: (_key, node) => {
              if (identity.isAlias(node) || identity.hasAnchor(node))
                nodes.push(node);
            }
          });
          if (ctx)
            ctx.aliasResolveCache = nodes;
        }
        let found = void 0;
        for (const node of nodes) {
          if (node === this)
            break;
          if (node.anchor === this.source)
            found = node;
        }
        if (found && ctx) {
          const { anchors: anchors2, doc: doc2, maxAliasCount } = ctx;
          let data = anchors2.get(found);
          if (!data) {
            toJS.toJS(found, null, ctx);
            data = anchors2.get(found);
          }
          if (data?.res === void 0) {
            const msg = "This should not happen: Alias anchor was not resolved?";
            throw new ReferenceError(msg);
          }
          if (maxAliasCount >= 0) {
            data.count += 1;
            if (data.aliasCount === 0)
              data.aliasCount = getAliasCount(doc2, found, anchors2);
            if (data.count * data.aliasCount > maxAliasCount) {
              const msg = "Excessive alias count indicates a resource exhaustion attack";
              throw new ReferenceError(msg);
            }
          }
        }
        return found;
      }
      toJSON(_arg, ctx) {
        if (!ctx)
          return { source: this.source };
        const source = this.resolve(ctx.doc, ctx);
        if (!source) {
          const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
          throw new ReferenceError(msg);
        }
        return ctx.anchors.get(source).res;
      }
      toString(ctx, _onComment, _onChompKeep) {
        const src = `*${this.source}`;
        if (ctx) {
          anchors.anchorIsValid(this.source);
          if (ctx.options.verifyAliasOrder && !ctx.anchors.has(this.source)) {
            const msg = `Unresolved alias (the anchor must be set before the alias): ${this.source}`;
            throw new Error(msg);
          }
          if (ctx.implicitKey)
            return `${src} `;
        }
        return src;
      }
    };
    function getAliasCount(doc, node, anchors2) {
      if (identity.isAlias(node)) {
        const source = node.resolve(doc);
        const anchor = anchors2 && source && anchors2.get(source);
        return anchor ? anchor.count * anchor.aliasCount : 0;
      } else if (identity.isCollection(node)) {
        let count = 0;
        for (const item of node.items) {
          const c = getAliasCount(doc, item, anchors2);
          if (c > count)
            count = c;
        }
        return count;
      } else if (identity.isPair(node)) {
        const kc = getAliasCount(doc, node.key, anchors2);
        const vc = getAliasCount(doc, node.value, anchors2);
        return Math.max(kc, vc);
      }
      return 1;
    }
    exports.Alias = Alias;
  }
});

// node_modules/yaml/dist/nodes/Scalar.js
var require_Scalar = __commonJS({
  "node_modules/yaml/dist/nodes/Scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Node2 = require_Node();
    var toJS = require_toJS();
    var isScalarValue = (value) => !value || typeof value !== "function" && typeof value !== "object";
    var Scalar = class extends Node2.NodeBase {
      constructor(value) {
        super(identity.SCALAR);
        this.value = value;
      }
      toJSON(arg, ctx) {
        return ctx?.keep ? this.value : toJS.toJS(this.value, arg, ctx);
      }
      toString() {
        return String(this.value);
      }
    };
    Scalar.BLOCK_FOLDED = "BLOCK_FOLDED";
    Scalar.BLOCK_LITERAL = "BLOCK_LITERAL";
    Scalar.PLAIN = "PLAIN";
    Scalar.QUOTE_DOUBLE = "QUOTE_DOUBLE";
    Scalar.QUOTE_SINGLE = "QUOTE_SINGLE";
    exports.Scalar = Scalar;
    exports.isScalarValue = isScalarValue;
  }
});

// node_modules/yaml/dist/doc/createNode.js
var require_createNode = __commonJS({
  "node_modules/yaml/dist/doc/createNode.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var defaultTagPrefix = "tag:yaml.org,2002:";
    function findTagObject(value, tagName, tags) {
      if (tagName) {
        const match = tags.filter((t) => t.tag === tagName);
        const tagObj = match.find((t) => !t.format) ?? match[0];
        if (!tagObj)
          throw new Error(`Tag ${tagName} not found`);
        return tagObj;
      }
      return tags.find((t) => t.identify?.(value) && !t.format);
    }
    function createNode(value, tagName, ctx) {
      if (identity.isDocument(value))
        value = value.contents;
      if (identity.isNode(value))
        return value;
      if (identity.isPair(value)) {
        const map = ctx.schema[identity.MAP].createNode?.(ctx.schema, null, ctx);
        map.items.push(value);
        return map;
      }
      if (value instanceof String || value instanceof Number || value instanceof Boolean || typeof BigInt !== "undefined" && value instanceof BigInt) {
        value = value.valueOf();
      }
      const { aliasDuplicateObjects, onAnchor, onTagObj, schema, sourceObjects } = ctx;
      let ref = void 0;
      if (aliasDuplicateObjects && value && typeof value === "object") {
        ref = sourceObjects.get(value);
        if (ref) {
          ref.anchor ?? (ref.anchor = onAnchor(value));
          return new Alias.Alias(ref.anchor);
        } else {
          ref = { anchor: null, node: null };
          sourceObjects.set(value, ref);
        }
      }
      if (tagName?.startsWith("!!"))
        tagName = defaultTagPrefix + tagName.slice(2);
      let tagObj = findTagObject(value, tagName, schema.tags);
      if (!tagObj) {
        if (value && typeof value.toJSON === "function") {
          value = value.toJSON();
        }
        if (!value || typeof value !== "object") {
          const node2 = new Scalar.Scalar(value);
          if (ref)
            ref.node = node2;
          return node2;
        }
        tagObj = value instanceof Map ? schema[identity.MAP] : Symbol.iterator in Object(value) ? schema[identity.SEQ] : schema[identity.MAP];
      }
      if (onTagObj) {
        onTagObj(tagObj);
        delete ctx.onTagObj;
      }
      const node = tagObj?.createNode ? tagObj.createNode(ctx.schema, value, ctx) : typeof tagObj?.nodeClass?.from === "function" ? tagObj.nodeClass.from(ctx.schema, value, ctx) : new Scalar.Scalar(value);
      if (tagName)
        node.tag = tagName;
      else if (!tagObj.default)
        node.tag = tagObj.tag;
      if (ref)
        ref.node = node;
      return node;
    }
    exports.createNode = createNode;
  }
});

// node_modules/yaml/dist/nodes/Collection.js
var require_Collection = __commonJS({
  "node_modules/yaml/dist/nodes/Collection.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var identity = require_identity();
    var Node2 = require_Node();
    function collectionFromPath(schema, path, value) {
      let v = value;
      for (let i2 = path.length - 1; i2 >= 0; --i2) {
        const k = path[i2];
        if (typeof k === "number" && Number.isInteger(k) && k >= 0) {
          const a = [];
          a[k] = v;
          v = a;
        } else {
          v = /* @__PURE__ */ new Map([[k, v]]);
        }
      }
      return createNode.createNode(v, void 0, {
        aliasDuplicateObjects: false,
        keepUndefined: false,
        onAnchor: () => {
          throw new Error("This should not happen, please report a bug.");
        },
        schema,
        sourceObjects: /* @__PURE__ */ new Map()
      });
    }
    var isEmptyPath = (path) => path == null || typeof path === "object" && !!path[Symbol.iterator]().next().done;
    var Collection = class extends Node2.NodeBase {
      constructor(type, schema) {
        super(type);
        Object.defineProperty(this, "schema", {
          value: schema,
          configurable: true,
          enumerable: false,
          writable: true
        });
      }
      /**
       * Create a copy of this collection.
       *
       * @param schema - If defined, overwrites the original's schema
       */
      clone(schema) {
        const copy = Object.create(Object.getPrototypeOf(this), Object.getOwnPropertyDescriptors(this));
        if (schema)
          copy.schema = schema;
        copy.items = copy.items.map((it) => identity.isNode(it) || identity.isPair(it) ? it.clone(schema) : it);
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /**
       * Adds a value to the collection. For `!!map` and `!!omap` the value must
       * be a Pair instance or a `{ key, value }` object, which may not have a key
       * that already exists in the map.
       */
      addIn(path, value) {
        if (isEmptyPath(path))
          this.add(value);
        else {
          const [key, ...rest] = path;
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.addIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
      /**
       * Removes a value from the collection.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.delete(key);
        const node = this.get(key, true);
        if (identity.isCollection(node))
          return node.deleteIn(rest);
        else
          throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        const [key, ...rest] = path;
        const node = this.get(key, true);
        if (rest.length === 0)
          return !keepScalar && identity.isScalar(node) ? node.value : node;
        else
          return identity.isCollection(node) ? node.getIn(rest, keepScalar) : void 0;
      }
      hasAllNullValues(allowScalar) {
        return this.items.every((node) => {
          if (!identity.isPair(node))
            return false;
          const n = node.value;
          return n == null || allowScalar && identity.isScalar(n) && n.value == null && !n.commentBefore && !n.comment && !n.tag;
        });
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       */
      hasIn(path) {
        const [key, ...rest] = path;
        if (rest.length === 0)
          return this.has(key);
        const node = this.get(key, true);
        return identity.isCollection(node) ? node.hasIn(rest) : false;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        const [key, ...rest] = path;
        if (rest.length === 0) {
          this.set(key, value);
        } else {
          const node = this.get(key, true);
          if (identity.isCollection(node))
            node.setIn(rest, value);
          else if (node === void 0 && this.schema)
            this.set(key, collectionFromPath(this.schema, rest, value));
          else
            throw new Error(`Expected YAML collection at ${key}. Remaining path: ${rest}`);
        }
      }
    };
    exports.Collection = Collection;
    exports.collectionFromPath = collectionFromPath;
    exports.isEmptyPath = isEmptyPath;
  }
});

// node_modules/yaml/dist/stringify/stringifyComment.js
var require_stringifyComment = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyComment.js"(exports) {
    "use strict";
    var stringifyComment = (str) => str.replace(/^(?!$)(?: $)?/gm, "#");
    function indentComment(comment, indent) {
      if (/^\n+$/.test(comment))
        return comment.substring(1);
      return indent ? comment.replace(/^(?! *$)/gm, indent) : comment;
    }
    var lineComment = (str, indent, comment) => str.endsWith("\n") ? indentComment(comment, indent) : comment.includes("\n") ? "\n" + indentComment(comment, indent) : (str.endsWith(" ") ? "" : " ") + comment;
    exports.indentComment = indentComment;
    exports.lineComment = lineComment;
    exports.stringifyComment = stringifyComment;
  }
});

// node_modules/yaml/dist/stringify/foldFlowLines.js
var require_foldFlowLines = __commonJS({
  "node_modules/yaml/dist/stringify/foldFlowLines.js"(exports) {
    "use strict";
    var FOLD_FLOW = "flow";
    var FOLD_BLOCK = "block";
    var FOLD_QUOTED = "quoted";
    function foldFlowLines(text, indent, mode = "flow", { indentAtStart, lineWidth = 80, minContentWidth = 20, onFold, onOverflow } = {}) {
      if (!lineWidth || lineWidth < 0)
        return text;
      if (lineWidth < minContentWidth)
        minContentWidth = 0;
      const endStep = Math.max(1 + minContentWidth, 1 + lineWidth - indent.length);
      if (text.length <= endStep)
        return text;
      const folds = [];
      const escapedFolds = {};
      let end = lineWidth - indent.length;
      if (typeof indentAtStart === "number") {
        if (indentAtStart > lineWidth - Math.max(2, minContentWidth))
          folds.push(0);
        else
          end = lineWidth - indentAtStart;
      }
      let split = void 0;
      let prev = void 0;
      let overflow = false;
      let i2 = -1;
      let escStart = -1;
      let escEnd = -1;
      if (mode === FOLD_BLOCK) {
        i2 = consumeMoreIndentedLines(text, i2, indent.length);
        if (i2 !== -1)
          end = i2 + endStep;
      }
      for (let ch; ch = text[i2 += 1]; ) {
        if (mode === FOLD_QUOTED && ch === "\\") {
          escStart = i2;
          switch (text[i2 + 1]) {
            case "x":
              i2 += 3;
              break;
            case "u":
              i2 += 5;
              break;
            case "U":
              i2 += 9;
              break;
            default:
              i2 += 1;
          }
          escEnd = i2;
        }
        if (ch === "\n") {
          if (mode === FOLD_BLOCK)
            i2 = consumeMoreIndentedLines(text, i2, indent.length);
          end = i2 + indent.length + endStep;
          split = void 0;
        } else {
          if (ch === " " && prev && prev !== " " && prev !== "\n" && prev !== "	") {
            const next = text[i2 + 1];
            if (next && next !== " " && next !== "\n" && next !== "	")
              split = i2;
          }
          if (i2 >= end) {
            if (split) {
              folds.push(split);
              end = split + endStep;
              split = void 0;
            } else if (mode === FOLD_QUOTED) {
              while (prev === " " || prev === "	") {
                prev = ch;
                ch = text[i2 += 1];
                overflow = true;
              }
              const j = i2 > escEnd + 1 ? i2 - 2 : escStart - 1;
              if (escapedFolds[j])
                return text;
              folds.push(j);
              escapedFolds[j] = true;
              end = j + endStep;
              split = void 0;
            } else {
              overflow = true;
            }
          }
        }
        prev = ch;
      }
      if (overflow && onOverflow)
        onOverflow();
      if (folds.length === 0)
        return text;
      if (onFold)
        onFold();
      let res = text.slice(0, folds[0]);
      for (let i3 = 0; i3 < folds.length; ++i3) {
        const fold = folds[i3];
        const end2 = folds[i3 + 1] || text.length;
        if (fold === 0)
          res = `
${indent}${text.slice(0, end2)}`;
        else {
          if (mode === FOLD_QUOTED && escapedFolds[fold])
            res += `${text[fold]}\\`;
          res += `
${indent}${text.slice(fold + 1, end2)}`;
        }
      }
      return res;
    }
    function consumeMoreIndentedLines(text, i2, indent) {
      let end = i2;
      let start2 = i2 + 1;
      let ch = text[start2];
      while (ch === " " || ch === "	") {
        if (i2 < start2 + indent) {
          ch = text[++i2];
        } else {
          do {
            ch = text[++i2];
          } while (ch && ch !== "\n");
          end = i2;
          start2 = i2 + 1;
          ch = text[start2];
        }
      }
      return end;
    }
    exports.FOLD_BLOCK = FOLD_BLOCK;
    exports.FOLD_FLOW = FOLD_FLOW;
    exports.FOLD_QUOTED = FOLD_QUOTED;
    exports.foldFlowLines = foldFlowLines;
  }
});

// node_modules/yaml/dist/stringify/stringifyString.js
var require_stringifyString = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyString.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var foldFlowLines = require_foldFlowLines();
    var getFoldOptions = (ctx, isBlock) => ({
      indentAtStart: isBlock ? ctx.indent.length : ctx.indentAtStart,
      lineWidth: ctx.options.lineWidth,
      minContentWidth: ctx.options.minContentWidth
    });
    var containsDocumentMarker = (str) => /^(%|---|\.\.\.)/m.test(str);
    function lineLengthOverLimit(str, lineWidth, indentLength) {
      if (!lineWidth || lineWidth < 0)
        return false;
      const limit = lineWidth - indentLength;
      const strLen = str.length;
      if (strLen <= limit)
        return false;
      for (let i2 = 0, start2 = 0; i2 < strLen; ++i2) {
        if (str[i2] === "\n") {
          if (i2 - start2 > limit)
            return true;
          start2 = i2 + 1;
          if (strLen - start2 <= limit)
            return false;
        }
      }
      return true;
    }
    function doubleQuotedString(value, ctx) {
      const json = JSON.stringify(value);
      if (ctx.options.doubleQuotedAsJSON)
        return json;
      const { implicitKey } = ctx;
      const minMultiLineLength = ctx.options.doubleQuotedMinMultiLineLength;
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      let str = "";
      let start2 = 0;
      for (let i2 = 0, ch = json[i2]; ch; ch = json[++i2]) {
        if (ch === " " && json[i2 + 1] === "\\" && json[i2 + 2] === "n") {
          str += json.slice(start2, i2) + "\\ ";
          i2 += 1;
          start2 = i2;
          ch = "\\";
        }
        if (ch === "\\")
          switch (json[i2 + 1]) {
            case "u":
              {
                str += json.slice(start2, i2);
                const code = json.substr(i2 + 2, 4);
                switch (code) {
                  case "0000":
                    str += "\\0";
                    break;
                  case "0007":
                    str += "\\a";
                    break;
                  case "000b":
                    str += "\\v";
                    break;
                  case "001b":
                    str += "\\e";
                    break;
                  case "0085":
                    str += "\\N";
                    break;
                  case "00a0":
                    str += "\\_";
                    break;
                  case "2028":
                    str += "\\L";
                    break;
                  case "2029":
                    str += "\\P";
                    break;
                  default:
                    if (code.substr(0, 2) === "00")
                      str += "\\x" + code.substr(2);
                    else
                      str += json.substr(i2, 6);
                }
                i2 += 5;
                start2 = i2 + 1;
              }
              break;
            case "n":
              if (implicitKey || json[i2 + 2] === '"' || json.length < minMultiLineLength) {
                i2 += 1;
              } else {
                str += json.slice(start2, i2) + "\n\n";
                while (json[i2 + 2] === "\\" && json[i2 + 3] === "n" && json[i2 + 4] !== '"') {
                  str += "\n";
                  i2 += 2;
                }
                str += indent;
                if (json[i2 + 2] === " ")
                  str += "\\";
                i2 += 1;
                start2 = i2 + 1;
              }
              break;
            default:
              i2 += 1;
          }
      }
      str = start2 ? str + json.slice(start2) : json;
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_QUOTED, getFoldOptions(ctx, false));
    }
    function singleQuotedString(value, ctx) {
      if (ctx.options.singleQuote === false || ctx.implicitKey && value.includes("\n") || /[ \t]\n|\n[ \t]/.test(value))
        return doubleQuotedString(value, ctx);
      const indent = ctx.indent || (containsDocumentMarker(value) ? "  " : "");
      const res = "'" + value.replace(/'/g, "''").replace(/\n+/g, `$&
${indent}`) + "'";
      return ctx.implicitKey ? res : foldFlowLines.foldFlowLines(res, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function quotedString(value, ctx) {
      const { singleQuote } = ctx.options;
      let qs;
      if (singleQuote === false)
        qs = doubleQuotedString;
      else {
        const hasDouble = value.includes('"');
        const hasSingle = value.includes("'");
        if (hasDouble && !hasSingle)
          qs = singleQuotedString;
        else if (hasSingle && !hasDouble)
          qs = doubleQuotedString;
        else
          qs = singleQuote ? singleQuotedString : doubleQuotedString;
      }
      return qs(value, ctx);
    }
    var blockEndNewlines;
    try {
      blockEndNewlines = new RegExp("(^|(?<!\n))\n+(?!\n|$)", "g");
    } catch {
      blockEndNewlines = /\n+(?!\n|$)/g;
    }
    function blockString({ comment, type, value }, ctx, onComment, onChompKeep) {
      const { blockQuote, commentString, lineWidth } = ctx.options;
      if (!blockQuote || /\n[\t ]+$/.test(value)) {
        return quotedString(value, ctx);
      }
      const indent = ctx.indent || (ctx.forceBlockIndent || containsDocumentMarker(value) ? "  " : "");
      const literal2 = blockQuote === "literal" ? true : blockQuote === "folded" || type === Scalar.Scalar.BLOCK_FOLDED ? false : type === Scalar.Scalar.BLOCK_LITERAL ? true : !lineLengthOverLimit(value, lineWidth, indent.length);
      if (!value)
        return literal2 ? "|\n" : ">\n";
      let chomp;
      let endStart;
      for (endStart = value.length; endStart > 0; --endStart) {
        const ch = value[endStart - 1];
        if (ch !== "\n" && ch !== "	" && ch !== " ")
          break;
      }
      let end = value.substring(endStart);
      const endNlPos = end.indexOf("\n");
      if (endNlPos === -1) {
        chomp = "-";
      } else if (value === end || endNlPos !== end.length - 1) {
        chomp = "+";
        if (onChompKeep)
          onChompKeep();
      } else {
        chomp = "";
      }
      if (end) {
        value = value.slice(0, -end.length);
        if (end[end.length - 1] === "\n")
          end = end.slice(0, -1);
        end = end.replace(blockEndNewlines, `$&${indent}`);
      }
      let startWithSpace = false;
      let startEnd;
      let startNlPos = -1;
      for (startEnd = 0; startEnd < value.length; ++startEnd) {
        const ch = value[startEnd];
        if (ch === " ")
          startWithSpace = true;
        else if (ch === "\n")
          startNlPos = startEnd;
        else
          break;
      }
      let start2 = value.substring(0, startNlPos < startEnd ? startNlPos + 1 : startEnd);
      if (start2) {
        value = value.substring(start2.length);
        start2 = start2.replace(/\n+/g, `$&${indent}`);
      }
      const indentSize = indent ? "2" : "1";
      let header = (startWithSpace ? indentSize : "") + chomp;
      if (comment) {
        header += " " + commentString(comment.replace(/ ?[\r\n]+/g, " "));
        if (onComment)
          onComment();
      }
      if (!literal2) {
        const foldedValue = value.replace(/\n+/g, "\n$&").replace(/(?:^|\n)([\t ].*)(?:([\n\t ]*)\n(?![\n\t ]))?/g, "$1$2").replace(/\n+/g, `$&${indent}`);
        let literalFallback = false;
        const foldOptions = getFoldOptions(ctx, true);
        if (blockQuote !== "folded" && type !== Scalar.Scalar.BLOCK_FOLDED) {
          foldOptions.onOverflow = () => {
            literalFallback = true;
          };
        }
        const body2 = foldFlowLines.foldFlowLines(`${start2}${foldedValue}${end}`, indent, foldFlowLines.FOLD_BLOCK, foldOptions);
        if (!literalFallback)
          return `>${header}
${indent}${body2}`;
      }
      value = value.replace(/\n+/g, `$&${indent}`);
      return `|${header}
${indent}${start2}${value}${end}`;
    }
    function plainString(item, ctx, onComment, onChompKeep) {
      const { type, value } = item;
      const { actualString, implicitKey, indent, indentStep, inFlow } = ctx;
      if (implicitKey && value.includes("\n") || inFlow && /[[\]{},]/.test(value)) {
        return quotedString(value, ctx);
      }
      if (/^[\n\t ,[\]{}#&*!|>'"%@`]|^[?-]$|^[?-][ \t]|[\n:][ \t]|[ \t]\n|[\n\t ]#|[\n\t :]$/.test(value)) {
        return implicitKey || inFlow || !value.includes("\n") ? quotedString(value, ctx) : blockString(item, ctx, onComment, onChompKeep);
      }
      if (!implicitKey && !inFlow && type !== Scalar.Scalar.PLAIN && value.includes("\n")) {
        return blockString(item, ctx, onComment, onChompKeep);
      }
      if (containsDocumentMarker(value)) {
        if (indent === "") {
          ctx.forceBlockIndent = true;
          return blockString(item, ctx, onComment, onChompKeep);
        } else if (implicitKey && indent === indentStep) {
          return quotedString(value, ctx);
        }
      }
      const str = value.replace(/\n+/g, `$&
${indent}`);
      if (actualString) {
        const test = (tag) => tag.default && tag.tag !== "tag:yaml.org,2002:str" && tag.test?.test(str);
        const { compat, tags } = ctx.doc.schema;
        if (tags.some(test) || compat?.some(test))
          return quotedString(value, ctx);
      }
      return implicitKey ? str : foldFlowLines.foldFlowLines(str, indent, foldFlowLines.FOLD_FLOW, getFoldOptions(ctx, false));
    }
    function stringifyString(item, ctx, onComment, onChompKeep) {
      const { implicitKey, inFlow } = ctx;
      const ss = typeof item.value === "string" ? item : Object.assign({}, item, { value: String(item.value) });
      let { type } = item;
      if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
        if (/[\x00-\x08\x0b-\x1f\x7f-\x9f\u{D800}-\u{DFFF}]/u.test(ss.value))
          type = Scalar.Scalar.QUOTE_DOUBLE;
      }
      const _stringify = (_type) => {
        switch (_type) {
          case Scalar.Scalar.BLOCK_FOLDED:
          case Scalar.Scalar.BLOCK_LITERAL:
            return implicitKey || inFlow ? quotedString(ss.value, ctx) : blockString(ss, ctx, onComment, onChompKeep);
          case Scalar.Scalar.QUOTE_DOUBLE:
            return doubleQuotedString(ss.value, ctx);
          case Scalar.Scalar.QUOTE_SINGLE:
            return singleQuotedString(ss.value, ctx);
          case Scalar.Scalar.PLAIN:
            return plainString(ss, ctx, onComment, onChompKeep);
          default:
            return null;
        }
      };
      let res = _stringify(type);
      if (res === null) {
        const { defaultKeyType, defaultStringType } = ctx.options;
        const t = implicitKey && defaultKeyType || defaultStringType;
        res = _stringify(t);
        if (res === null)
          throw new Error(`Unsupported default string type ${t}`);
      }
      return res;
    }
    exports.stringifyString = stringifyString;
  }
});

// node_modules/yaml/dist/stringify/stringify.js
var require_stringify = __commonJS({
  "node_modules/yaml/dist/stringify/stringify.js"(exports) {
    "use strict";
    var anchors = require_anchors();
    var identity = require_identity();
    var stringifyComment = require_stringifyComment();
    var stringifyString = require_stringifyString();
    function createStringifyContext(doc, options) {
      const opt = Object.assign({
        blockQuote: true,
        commentString: stringifyComment.stringifyComment,
        defaultKeyType: null,
        defaultStringType: "PLAIN",
        directives: null,
        doubleQuotedAsJSON: false,
        doubleQuotedMinMultiLineLength: 40,
        falseStr: "false",
        flowCollectionPadding: true,
        indentSeq: true,
        lineWidth: 80,
        minContentWidth: 20,
        nullStr: "null",
        simpleKeys: false,
        singleQuote: null,
        trailingComma: false,
        trueStr: "true",
        verifyAliasOrder: true
      }, doc.schema.toStringOptions, options);
      let inFlow;
      switch (opt.collectionStyle) {
        case "block":
          inFlow = false;
          break;
        case "flow":
          inFlow = true;
          break;
        default:
          inFlow = null;
      }
      return {
        anchors: /* @__PURE__ */ new Set(),
        doc,
        flowCollectionPadding: opt.flowCollectionPadding ? " " : "",
        indent: "",
        indentStep: typeof opt.indent === "number" ? " ".repeat(opt.indent) : "  ",
        inFlow,
        options: opt
      };
    }
    function getTagObject(tags, item) {
      if (item.tag) {
        const match = tags.filter((t) => t.tag === item.tag);
        if (match.length > 0)
          return match.find((t) => t.format === item.format) ?? match[0];
      }
      let tagObj = void 0;
      let obj;
      if (identity.isScalar(item)) {
        obj = item.value;
        let match = tags.filter((t) => t.identify?.(obj));
        if (match.length > 1) {
          const testMatch = match.filter((t) => t.test);
          if (testMatch.length > 0)
            match = testMatch;
        }
        tagObj = match.find((t) => t.format === item.format) ?? match.find((t) => !t.format);
      } else {
        obj = item;
        tagObj = tags.find((t) => t.nodeClass && obj instanceof t.nodeClass);
      }
      if (!tagObj) {
        const name2 = obj?.constructor?.name ?? (obj === null ? "null" : typeof obj);
        throw new Error(`Tag not resolved for ${name2} value`);
      }
      return tagObj;
    }
    function stringifyProps(node, tagObj, { anchors: anchors$1, doc }) {
      if (!doc.directives)
        return "";
      const props = [];
      const anchor = (identity.isScalar(node) || identity.isCollection(node)) && node.anchor;
      if (anchor && anchors.anchorIsValid(anchor)) {
        anchors$1.add(anchor);
        props.push(`&${anchor}`);
      }
      const tag = node.tag ?? (tagObj.default ? null : tagObj.tag);
      if (tag)
        props.push(doc.directives.tagString(tag));
      return props.join(" ");
    }
    function stringify(item, ctx, onComment, onChompKeep) {
      if (identity.isPair(item))
        return item.toString(ctx, onComment, onChompKeep);
      if (identity.isAlias(item)) {
        if (ctx.doc.directives)
          return item.toString(ctx);
        if (ctx.resolvedAliases?.has(item)) {
          throw new TypeError(`Cannot stringify circular structure without alias nodes`);
        } else {
          if (ctx.resolvedAliases)
            ctx.resolvedAliases.add(item);
          else
            ctx.resolvedAliases = /* @__PURE__ */ new Set([item]);
          item = item.resolve(ctx.doc);
        }
      }
      let tagObj = void 0;
      const node = identity.isNode(item) ? item : ctx.doc.createNode(item, { onTagObj: (o) => tagObj = o });
      tagObj ?? (tagObj = getTagObject(ctx.doc.schema.tags, node));
      const props = stringifyProps(node, tagObj, ctx);
      if (props.length > 0)
        ctx.indentAtStart = (ctx.indentAtStart ?? 0) + props.length + 1;
      const str = typeof tagObj.stringify === "function" ? tagObj.stringify(node, ctx, onComment, onChompKeep) : identity.isScalar(node) ? stringifyString.stringifyString(node, ctx, onComment, onChompKeep) : node.toString(ctx, onComment, onChompKeep);
      if (!props)
        return str;
      return identity.isScalar(node) || str[0] === "{" || str[0] === "[" ? `${props} ${str}` : `${props}
${ctx.indent}${str}`;
    }
    exports.createStringifyContext = createStringifyContext;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/stringify/stringifyPair.js
var require_stringifyPair = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyPair.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyPair({ key, value }, ctx, onComment, onChompKeep) {
      const { allNullValues, doc, indent, indentStep, options: { commentString, indentSeq, simpleKeys } } = ctx;
      let keyComment = identity.isNode(key) && key.comment || null;
      if (simpleKeys) {
        if (keyComment) {
          throw new Error("With simple keys, key nodes cannot have comments");
        }
        if (identity.isCollection(key) || !identity.isNode(key) && typeof key === "object") {
          const msg = "With simple keys, collection cannot be used as a key value";
          throw new Error(msg);
        }
      }
      let explicitKey = !simpleKeys && (!key || keyComment && value == null && !ctx.inFlow || identity.isCollection(key) || (identity.isScalar(key) ? key.type === Scalar.Scalar.BLOCK_FOLDED || key.type === Scalar.Scalar.BLOCK_LITERAL : typeof key === "object"));
      ctx = Object.assign({}, ctx, {
        allNullValues: false,
        implicitKey: !explicitKey && (simpleKeys || !allNullValues),
        indent: indent + indentStep
      });
      let keyCommentDone = false;
      let chompKeep = false;
      let str = stringify.stringify(key, ctx, () => keyCommentDone = true, () => chompKeep = true);
      if (!explicitKey && !ctx.inFlow && str.length > 1024) {
        if (simpleKeys)
          throw new Error("With simple keys, single line scalar must not span more than 1024 characters");
        explicitKey = true;
      }
      if (ctx.inFlow) {
        if (allNullValues || value == null) {
          if (keyCommentDone && onComment)
            onComment();
          return str === "" ? "?" : explicitKey ? `? ${str}` : str;
        }
      } else if (allNullValues && !simpleKeys || value == null && explicitKey) {
        str = `? ${str}`;
        if (keyComment && !keyCommentDone) {
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        } else if (chompKeep && onChompKeep)
          onChompKeep();
        return str;
      }
      if (keyCommentDone)
        keyComment = null;
      if (explicitKey) {
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
        str = `? ${str}
${indent}:`;
      } else {
        str = `${str}:`;
        if (keyComment)
          str += stringifyComment.lineComment(str, ctx.indent, commentString(keyComment));
      }
      let vsb, vcb, valueComment;
      if (identity.isNode(value)) {
        vsb = !!value.spaceBefore;
        vcb = value.commentBefore;
        valueComment = value.comment;
      } else {
        vsb = false;
        vcb = null;
        valueComment = null;
        if (value && typeof value === "object")
          value = doc.createNode(value);
      }
      ctx.implicitKey = false;
      if (!explicitKey && !keyComment && identity.isScalar(value))
        ctx.indentAtStart = str.length + 1;
      chompKeep = false;
      if (!indentSeq && indentStep.length >= 2 && !ctx.inFlow && !explicitKey && identity.isSeq(value) && !value.flow && !value.tag && !value.anchor) {
        ctx.indent = ctx.indent.substring(2);
      }
      let valueCommentDone = false;
      const valueStr = stringify.stringify(value, ctx, () => valueCommentDone = true, () => chompKeep = true);
      let ws = " ";
      if (keyComment || vsb || vcb) {
        ws = vsb ? "\n" : "";
        if (vcb) {
          const cs = commentString(vcb);
          ws += `
${stringifyComment.indentComment(cs, ctx.indent)}`;
        }
        if (valueStr === "" && !ctx.inFlow) {
          if (ws === "\n" && valueComment)
            ws = "\n\n";
        } else {
          ws += `
${ctx.indent}`;
        }
      } else if (!explicitKey && identity.isCollection(value)) {
        const vs0 = valueStr[0];
        const nl0 = valueStr.indexOf("\n");
        const hasNewline = nl0 !== -1;
        const flow = ctx.inFlow ?? value.flow ?? value.items.length === 0;
        if (hasNewline || !flow) {
          let hasPropsLine = false;
          if (hasNewline && (vs0 === "&" || vs0 === "!")) {
            let sp0 = valueStr.indexOf(" ");
            if (vs0 === "&" && sp0 !== -1 && sp0 < nl0 && valueStr[sp0 + 1] === "!") {
              sp0 = valueStr.indexOf(" ", sp0 + 1);
            }
            if (sp0 === -1 || nl0 < sp0)
              hasPropsLine = true;
          }
          if (!hasPropsLine)
            ws = `
${ctx.indent}`;
        }
      } else if (valueStr === "" || valueStr[0] === "\n") {
        ws = "";
      }
      str += ws + valueStr;
      if (ctx.inFlow) {
        if (valueCommentDone && onComment)
          onComment();
      } else if (valueComment && !valueCommentDone) {
        str += stringifyComment.lineComment(str, ctx.indent, commentString(valueComment));
      } else if (chompKeep && onChompKeep) {
        onChompKeep();
      }
      return str;
    }
    exports.stringifyPair = stringifyPair;
  }
});

// node_modules/yaml/dist/log.js
var require_log = __commonJS({
  "node_modules/yaml/dist/log.js"(exports) {
    "use strict";
    var node_process = __require("process");
    function debug(logLevel, ...messages) {
      if (logLevel === "debug")
        console.log(...messages);
    }
    function warn(logLevel, warning) {
      if (logLevel === "debug" || logLevel === "warn") {
        if (typeof node_process.emitWarning === "function")
          node_process.emitWarning(warning);
        else
          console.warn(warning);
      }
    }
    exports.debug = debug;
    exports.warn = warn;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/merge.js
var require_merge = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/merge.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var MERGE_KEY = "<<";
    var merge = {
      identify: (value) => value === MERGE_KEY || typeof value === "symbol" && value.description === MERGE_KEY,
      default: "key",
      tag: "tag:yaml.org,2002:merge",
      test: /^<<$/,
      resolve: () => Object.assign(new Scalar.Scalar(Symbol(MERGE_KEY)), {
        addToJSMap: addMergeToJSMap
      }),
      stringify: () => MERGE_KEY
    };
    var isMergeKey = (ctx, key) => (merge.identify(key) || identity.isScalar(key) && (!key.type || key.type === Scalar.Scalar.PLAIN) && merge.identify(key.value)) && ctx?.doc.schema.tags.some((tag) => tag.tag === merge.tag && tag.default);
    function addMergeToJSMap(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (identity.isSeq(source))
        for (const it of source.items)
          mergeValue(ctx, map, it);
      else if (Array.isArray(source))
        for (const it of source)
          mergeValue(ctx, map, it);
      else
        mergeValue(ctx, map, source);
    }
    function mergeValue(ctx, map, value) {
      const source = resolveAliasValue(ctx, value);
      if (!identity.isMap(source))
        throw new Error("Merge sources must be maps or map aliases");
      const srcMap = source.toJSON(null, ctx, Map);
      for (const [key, value2] of srcMap) {
        if (map instanceof Map) {
          if (!map.has(key))
            map.set(key, value2);
        } else if (map instanceof Set) {
          map.add(key);
        } else if (!Object.prototype.hasOwnProperty.call(map, key)) {
          Object.defineProperty(map, key, {
            value: value2,
            writable: true,
            enumerable: true,
            configurable: true
          });
        }
      }
      return map;
    }
    function resolveAliasValue(ctx, value) {
      return ctx && identity.isAlias(value) ? value.resolve(ctx.doc, ctx) : value;
    }
    exports.addMergeToJSMap = addMergeToJSMap;
    exports.isMergeKey = isMergeKey;
    exports.merge = merge;
  }
});

// node_modules/yaml/dist/nodes/addPairToJSMap.js
var require_addPairToJSMap = __commonJS({
  "node_modules/yaml/dist/nodes/addPairToJSMap.js"(exports) {
    "use strict";
    var log = require_log();
    var merge = require_merge();
    var stringify = require_stringify();
    var identity = require_identity();
    var toJS = require_toJS();
    function addPairToJSMap(ctx, map, { key, value }) {
      if (identity.isNode(key) && key.addToJSMap)
        key.addToJSMap(ctx, map, value);
      else if (merge.isMergeKey(ctx, key))
        merge.addMergeToJSMap(ctx, map, value);
      else {
        const jsKey = toJS.toJS(key, "", ctx);
        if (map instanceof Map) {
          map.set(jsKey, toJS.toJS(value, jsKey, ctx));
        } else if (map instanceof Set) {
          map.add(jsKey);
        } else {
          const stringKey = stringifyKey(key, jsKey, ctx);
          const jsValue = toJS.toJS(value, stringKey, ctx);
          if (stringKey in map)
            Object.defineProperty(map, stringKey, {
              value: jsValue,
              writable: true,
              enumerable: true,
              configurable: true
            });
          else
            map[stringKey] = jsValue;
        }
      }
      return map;
    }
    function stringifyKey(key, jsKey, ctx) {
      if (jsKey === null)
        return "";
      if (typeof jsKey !== "object")
        return String(jsKey);
      if (identity.isNode(key) && ctx?.doc) {
        const strCtx = stringify.createStringifyContext(ctx.doc, {});
        strCtx.anchors = /* @__PURE__ */ new Set();
        for (const node of ctx.anchors.keys())
          strCtx.anchors.add(node.anchor);
        strCtx.inFlow = true;
        strCtx.inStringifyKey = true;
        const strKey = key.toString(strCtx);
        if (!ctx.mapKeyWarned) {
          let jsonStr = JSON.stringify(strKey);
          if (jsonStr.length > 40)
            jsonStr = jsonStr.substring(0, 36) + '..."';
          log.warn(ctx.doc.options.logLevel, `Keys with collection values will be stringified due to JS Object restrictions: ${jsonStr}. Set mapAsMap: true to use object keys.`);
          ctx.mapKeyWarned = true;
        }
        return strKey;
      }
      return JSON.stringify(jsKey);
    }
    exports.addPairToJSMap = addPairToJSMap;
  }
});

// node_modules/yaml/dist/nodes/Pair.js
var require_Pair = __commonJS({
  "node_modules/yaml/dist/nodes/Pair.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyPair = require_stringifyPair();
    var addPairToJSMap = require_addPairToJSMap();
    var identity = require_identity();
    function createPair(key, value, ctx) {
      const k = createNode.createNode(key, void 0, ctx);
      const v = createNode.createNode(value, void 0, ctx);
      return new Pair(k, v);
    }
    var Pair = class _Pair {
      constructor(key, value = null) {
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.PAIR });
        this.key = key;
        this.value = value;
      }
      clone(schema) {
        let { key, value } = this;
        if (identity.isNode(key))
          key = key.clone(schema);
        if (identity.isNode(value))
          value = value.clone(schema);
        return new _Pair(key, value);
      }
      toJSON(_, ctx) {
        const pair = ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        return addPairToJSMap.addPairToJSMap(ctx, pair, this);
      }
      toString(ctx, onComment, onChompKeep) {
        return ctx?.doc ? stringifyPair.stringifyPair(this, ctx, onComment, onChompKeep) : JSON.stringify(this);
      }
    };
    exports.Pair = Pair;
    exports.createPair = createPair;
  }
});

// node_modules/yaml/dist/stringify/stringifyCollection.js
var require_stringifyCollection = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyCollection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyCollection(collection, ctx, options) {
      const flow = ctx.inFlow ?? collection.flow;
      const stringify2 = flow ? stringifyFlowCollection : stringifyBlockCollection;
      return stringify2(collection, ctx, options);
    }
    function stringifyBlockCollection({ comment, items }, ctx, { blockItemPrefix, flowChars, itemIndent, onChompKeep, onComment }) {
      const { indent, options: { commentString } } = ctx;
      const itemCtx = Object.assign({}, ctx, { indent: itemIndent, type: null });
      let chompKeep = false;
      const lines = [];
      for (let i2 = 0; i2 < items.length; ++i2) {
        const item = items[i2];
        let comment2 = null;
        if (identity.isNode(item)) {
          if (!chompKeep && item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, chompKeep);
          if (item.comment)
            comment2 = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (!chompKeep && ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, chompKeep);
          }
        }
        chompKeep = false;
        let str2 = stringify.stringify(item, itemCtx, () => comment2 = null, () => chompKeep = true);
        if (comment2)
          str2 += stringifyComment.lineComment(str2, itemIndent, commentString(comment2));
        if (chompKeep && comment2)
          chompKeep = false;
        lines.push(blockItemPrefix + str2);
      }
      let str;
      if (lines.length === 0) {
        str = flowChars.start + flowChars.end;
      } else {
        str = lines[0];
        for (let i2 = 1; i2 < lines.length; ++i2) {
          const line = lines[i2];
          str += line ? `
${indent}${line}` : "\n";
        }
      }
      if (comment) {
        str += "\n" + stringifyComment.indentComment(commentString(comment), indent);
        if (onComment)
          onComment();
      } else if (chompKeep && onChompKeep)
        onChompKeep();
      return str;
    }
    function stringifyFlowCollection({ items }, ctx, { flowChars, itemIndent }) {
      const { indent, indentStep, flowCollectionPadding: fcPadding, options: { commentString } } = ctx;
      itemIndent += indentStep;
      const itemCtx = Object.assign({}, ctx, {
        indent: itemIndent,
        inFlow: true,
        type: null
      });
      let reqNewline = false;
      let linesAtValue = 0;
      const lines = [];
      for (let i2 = 0; i2 < items.length; ++i2) {
        const item = items[i2];
        let comment = null;
        if (identity.isNode(item)) {
          if (item.spaceBefore)
            lines.push("");
          addCommentBefore(ctx, lines, item.commentBefore, false);
          if (item.comment)
            comment = item.comment;
        } else if (identity.isPair(item)) {
          const ik = identity.isNode(item.key) ? item.key : null;
          if (ik) {
            if (ik.spaceBefore)
              lines.push("");
            addCommentBefore(ctx, lines, ik.commentBefore, false);
            if (ik.comment)
              reqNewline = true;
          }
          const iv = identity.isNode(item.value) ? item.value : null;
          if (iv) {
            if (iv.comment)
              comment = iv.comment;
            if (iv.commentBefore)
              reqNewline = true;
          } else if (item.value == null && ik?.comment) {
            comment = ik.comment;
          }
        }
        if (comment)
          reqNewline = true;
        let str = stringify.stringify(item, itemCtx, () => comment = null);
        reqNewline || (reqNewline = lines.length > linesAtValue || str.includes("\n"));
        if (i2 < items.length - 1) {
          str += ",";
        } else if (ctx.options.trailingComma) {
          if (ctx.options.lineWidth > 0) {
            reqNewline || (reqNewline = lines.reduce((sum, line) => sum + line.length + 2, 2) + (str.length + 2) > ctx.options.lineWidth);
          }
          if (reqNewline) {
            str += ",";
          }
        }
        if (comment)
          str += stringifyComment.lineComment(str, itemIndent, commentString(comment));
        lines.push(str);
        linesAtValue = lines.length;
      }
      const { start: start2, end } = flowChars;
      if (lines.length === 0) {
        return start2 + end;
      } else {
        if (!reqNewline) {
          const len = lines.reduce((sum, line) => sum + line.length + 2, 2);
          reqNewline = ctx.options.lineWidth > 0 && len > ctx.options.lineWidth;
        }
        if (reqNewline) {
          let str = start2;
          for (const line of lines)
            str += line ? `
${indentStep}${indent}${line}` : "\n";
          return `${str}
${indent}${end}`;
        } else {
          return `${start2}${fcPadding}${lines.join(" ")}${fcPadding}${end}`;
        }
      }
    }
    function addCommentBefore({ indent, options: { commentString } }, lines, comment, chompKeep) {
      if (comment && chompKeep)
        comment = comment.replace(/^\n+/, "");
      if (comment) {
        const ic = stringifyComment.indentComment(commentString(comment), indent);
        lines.push(ic.trimStart());
      }
    }
    exports.stringifyCollection = stringifyCollection;
  }
});

// node_modules/yaml/dist/nodes/YAMLMap.js
var require_YAMLMap = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLMap.js"(exports) {
    "use strict";
    var stringifyCollection = require_stringifyCollection();
    var addPairToJSMap = require_addPairToJSMap();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    function findPair(items, key) {
      const k = identity.isScalar(key) ? key.value : key;
      for (const it of items) {
        if (identity.isPair(it)) {
          if (it.key === key || it.key === k)
            return it;
          if (identity.isScalar(it.key) && it.key.value === k)
            return it;
        }
      }
      return void 0;
    }
    var YAMLMap = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:map";
      }
      constructor(schema) {
        super(identity.MAP, schema);
        this.items = [];
      }
      /**
       * A generic collection parsing method that can be extended
       * to other node classes that inherit from YAMLMap
       */
      static from(schema, obj, ctx) {
        const { keepUndefined, replacer } = ctx;
        const map = new this(schema);
        const add = (key, value) => {
          if (typeof replacer === "function")
            value = replacer.call(obj, key, value);
          else if (Array.isArray(replacer) && !replacer.includes(key))
            return;
          if (value !== void 0 || keepUndefined)
            map.items.push(Pair.createPair(key, value, ctx));
        };
        if (obj instanceof Map) {
          for (const [key, value] of obj)
            add(key, value);
        } else if (obj && typeof obj === "object") {
          for (const key of Object.keys(obj))
            add(key, obj[key]);
        }
        if (typeof schema.sortMapEntries === "function") {
          map.items.sort(schema.sortMapEntries);
        }
        return map;
      }
      /**
       * Adds a value to the collection.
       *
       * @param overwrite - If not set `true`, using a key that is already in the
       *   collection will throw. Otherwise, overwrites the previous value.
       */
      add(pair, overwrite) {
        let _pair;
        if (identity.isPair(pair))
          _pair = pair;
        else if (!pair || typeof pair !== "object" || !("key" in pair)) {
          _pair = new Pair.Pair(pair, pair?.value);
        } else
          _pair = new Pair.Pair(pair.key, pair.value);
        const prev = findPair(this.items, _pair.key);
        const sortEntries = this.schema?.sortMapEntries;
        if (prev) {
          if (!overwrite)
            throw new Error(`Key ${_pair.key} already set`);
          if (identity.isScalar(prev.value) && Scalar.isScalarValue(_pair.value))
            prev.value.value = _pair.value;
          else
            prev.value = _pair.value;
        } else if (sortEntries) {
          const i2 = this.items.findIndex((item) => sortEntries(_pair, item) < 0);
          if (i2 === -1)
            this.items.push(_pair);
          else
            this.items.splice(i2, 0, _pair);
        } else {
          this.items.push(_pair);
        }
      }
      delete(key) {
        const it = findPair(this.items, key);
        if (!it)
          return false;
        const del = this.items.splice(this.items.indexOf(it), 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const it = findPair(this.items, key);
        const node = it?.value;
        return (!keepScalar && identity.isScalar(node) ? node.value : node) ?? void 0;
      }
      has(key) {
        return !!findPair(this.items, key);
      }
      set(key, value) {
        this.add(new Pair.Pair(key, value), true);
      }
      /**
       * @param ctx - Conversion context, originally set in Document#toJS()
       * @param {Class} Type - If set, forces the returned collection type
       * @returns Instance of Type, Map, or Object
       */
      toJSON(_, ctx, Type) {
        const map = Type ? new Type() : ctx?.mapAsMap ? /* @__PURE__ */ new Map() : {};
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const item of this.items)
          addPairToJSMap.addPairToJSMap(ctx, map, item);
        return map;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        for (const item of this.items) {
          if (!identity.isPair(item))
            throw new Error(`Map items must all be pairs; found ${JSON.stringify(item)} instead`);
        }
        if (!ctx.allNullValues && this.hasAllNullValues(false))
          ctx = Object.assign({}, ctx, { allNullValues: true });
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "",
          flowChars: { start: "{", end: "}" },
          itemIndent: ctx.indent || "",
          onChompKeep,
          onComment
        });
      }
    };
    exports.YAMLMap = YAMLMap;
    exports.findPair = findPair;
  }
});

// node_modules/yaml/dist/schema/common/map.js
var require_map = __commonJS({
  "node_modules/yaml/dist/schema/common/map.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLMap = require_YAMLMap();
    var map = {
      collection: "map",
      default: true,
      nodeClass: YAMLMap.YAMLMap,
      tag: "tag:yaml.org,2002:map",
      resolve(map2, onError) {
        if (!identity.isMap(map2))
          onError("Expected a mapping for this tag");
        return map2;
      },
      createNode: (schema, obj, ctx) => YAMLMap.YAMLMap.from(schema, obj, ctx)
    };
    exports.map = map;
  }
});

// node_modules/yaml/dist/nodes/YAMLSeq.js
var require_YAMLSeq = __commonJS({
  "node_modules/yaml/dist/nodes/YAMLSeq.js"(exports) {
    "use strict";
    var createNode = require_createNode();
    var stringifyCollection = require_stringifyCollection();
    var Collection = require_Collection();
    var identity = require_identity();
    var Scalar = require_Scalar();
    var toJS = require_toJS();
    var YAMLSeq = class extends Collection.Collection {
      static get tagName() {
        return "tag:yaml.org,2002:seq";
      }
      constructor(schema) {
        super(identity.SEQ, schema);
        this.items = [];
      }
      add(value) {
        this.items.push(value);
      }
      /**
       * Removes a value from the collection.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       *
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return false;
        const del = this.items.splice(idx, 1);
        return del.length > 0;
      }
      get(key, keepScalar) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          return void 0;
        const it = this.items[idx];
        return !keepScalar && identity.isScalar(it) ? it.value : it;
      }
      /**
       * Checks if the collection includes a value with the key `key`.
       *
       * `key` must contain a representation of an integer for this to succeed.
       * It may be wrapped in a `Scalar`.
       */
      has(key) {
        const idx = asItemIndex(key);
        return typeof idx === "number" && idx < this.items.length;
      }
      /**
       * Sets a value in this collection. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       *
       * If `key` does not contain a representation of an integer, this will throw.
       * It may be wrapped in a `Scalar`.
       */
      set(key, value) {
        const idx = asItemIndex(key);
        if (typeof idx !== "number")
          throw new Error(`Expected a valid index, not ${key}.`);
        const prev = this.items[idx];
        if (identity.isScalar(prev) && Scalar.isScalarValue(value))
          prev.value = value;
        else
          this.items[idx] = value;
      }
      toJSON(_, ctx) {
        const seq = [];
        if (ctx?.onCreate)
          ctx.onCreate(seq);
        let i2 = 0;
        for (const item of this.items)
          seq.push(toJS.toJS(item, String(i2++), ctx));
        return seq;
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        return stringifyCollection.stringifyCollection(this, ctx, {
          blockItemPrefix: "- ",
          flowChars: { start: "[", end: "]" },
          itemIndent: (ctx.indent || "") + "  ",
          onChompKeep,
          onComment
        });
      }
      static from(schema, obj, ctx) {
        const { replacer } = ctx;
        const seq = new this(schema);
        if (obj && Symbol.iterator in Object(obj)) {
          let i2 = 0;
          for (let it of obj) {
            if (typeof replacer === "function") {
              const key = obj instanceof Set ? it : String(i2++);
              it = replacer.call(obj, key, it);
            }
            seq.items.push(createNode.createNode(it, void 0, ctx));
          }
        }
        return seq;
      }
    };
    function asItemIndex(key) {
      let idx = identity.isScalar(key) ? key.value : key;
      if (idx && typeof idx === "string")
        idx = Number(idx);
      return typeof idx === "number" && Number.isInteger(idx) && idx >= 0 ? idx : null;
    }
    exports.YAMLSeq = YAMLSeq;
  }
});

// node_modules/yaml/dist/schema/common/seq.js
var require_seq = __commonJS({
  "node_modules/yaml/dist/schema/common/seq.js"(exports) {
    "use strict";
    var identity = require_identity();
    var YAMLSeq = require_YAMLSeq();
    var seq = {
      collection: "seq",
      default: true,
      nodeClass: YAMLSeq.YAMLSeq,
      tag: "tag:yaml.org,2002:seq",
      resolve(seq2, onError) {
        if (!identity.isSeq(seq2))
          onError("Expected a sequence for this tag");
        return seq2;
      },
      createNode: (schema, obj, ctx) => YAMLSeq.YAMLSeq.from(schema, obj, ctx)
    };
    exports.seq = seq;
  }
});

// node_modules/yaml/dist/schema/common/string.js
var require_string = __commonJS({
  "node_modules/yaml/dist/schema/common/string.js"(exports) {
    "use strict";
    var stringifyString = require_stringifyString();
    var string = {
      identify: (value) => typeof value === "string",
      default: true,
      tag: "tag:yaml.org,2002:str",
      resolve: (str) => str,
      stringify(item, ctx, onComment, onChompKeep) {
        ctx = Object.assign({ actualString: true }, ctx);
        return stringifyString.stringifyString(item, ctx, onComment, onChompKeep);
      }
    };
    exports.string = string;
  }
});

// node_modules/yaml/dist/schema/common/null.js
var require_null = __commonJS({
  "node_modules/yaml/dist/schema/common/null.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var nullTag = {
      identify: (value) => value == null,
      createNode: () => new Scalar.Scalar(null),
      default: true,
      tag: "tag:yaml.org,2002:null",
      test: /^(?:~|[Nn]ull|NULL)?$/,
      resolve: () => new Scalar.Scalar(null),
      stringify: ({ source }, ctx) => typeof source === "string" && nullTag.test.test(source) ? source : ctx.options.nullStr
    };
    exports.nullTag = nullTag;
  }
});

// node_modules/yaml/dist/schema/core/bool.js
var require_bool = __commonJS({
  "node_modules/yaml/dist/schema/core/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var boolTag = {
      identify: (value) => typeof value === "boolean",
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:[Tt]rue|TRUE|[Ff]alse|FALSE)$/,
      resolve: (str) => new Scalar.Scalar(str[0] === "t" || str[0] === "T"),
      stringify({ source, value }, ctx) {
        if (source && boolTag.test.test(source)) {
          const sv = source[0] === "t" || source[0] === "T";
          if (value === sv)
            return source;
        }
        return value ? ctx.options.trueStr : ctx.options.falseStr;
      }
    };
    exports.boolTag = boolTag;
  }
});

// node_modules/yaml/dist/stringify/stringifyNumber.js
var require_stringifyNumber = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyNumber.js"(exports) {
    "use strict";
    function stringifyNumber({ format, minFractionDigits, tag, value }) {
      if (typeof value === "bigint")
        return String(value);
      const num = typeof value === "number" ? value : Number(value);
      if (!isFinite(num))
        return isNaN(num) ? ".nan" : num < 0 ? "-.inf" : ".inf";
      let n = Object.is(value, -0) ? "-0" : JSON.stringify(value);
      if (!format && minFractionDigits && (!tag || tag === "tag:yaml.org,2002:float") && /^-?\d/.test(n) && !n.includes("e")) {
        let i2 = n.indexOf(".");
        if (i2 < 0) {
          i2 = n.length;
          n += ".";
        }
        let d = minFractionDigits - (n.length - i2 - 1);
        while (d-- > 0)
          n += "0";
      }
      return n;
    }
    exports.stringifyNumber = stringifyNumber;
  }
});

// node_modules/yaml/dist/schema/core/float.js
var require_float = __commonJS({
  "node_modules/yaml/dist/schema/core/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+(?:\.[0-9]*)?)[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:\.[0-9]+|[0-9]+\.[0-9]*)$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str));
        const dot = str.indexOf(".");
        if (dot !== -1 && str[str.length - 1] === "0")
          node.minFractionDigits = str.length - dot - 1;
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/core/int.js
var require_int = __commonJS({
  "node_modules/yaml/dist/schema/core/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    var intResolve = (str, offset, radix, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str.substring(offset), radix);
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value) && value >= 0)
        return prefix + value.toString(radix);
      return stringifyNumber.stringifyNumber(node);
    }
    var intOct = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^0o[0-7]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 8, opt),
      stringify: (node) => intStringify(node, 8, "0o")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: (value) => intIdentify(value) && value >= 0,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^0x[0-9a-fA-F]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/core/schema.js
var require_schema = __commonJS({
  "node_modules/yaml/dist/schema/core/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.boolTag,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/json/schema.js
var require_schema2 = __commonJS({
  "node_modules/yaml/dist/schema/json/schema.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var map = require_map();
    var seq = require_seq();
    function intIdentify(value) {
      return typeof value === "bigint" || Number.isInteger(value);
    }
    var stringifyJSON = ({ value }) => JSON.stringify(value);
    var jsonScalars = [
      {
        identify: (value) => typeof value === "string",
        default: true,
        tag: "tag:yaml.org,2002:str",
        resolve: (str) => str,
        stringify: stringifyJSON
      },
      {
        identify: (value) => value == null,
        createNode: () => new Scalar.Scalar(null),
        default: true,
        tag: "tag:yaml.org,2002:null",
        test: /^null$/,
        resolve: () => null,
        stringify: stringifyJSON
      },
      {
        identify: (value) => typeof value === "boolean",
        default: true,
        tag: "tag:yaml.org,2002:bool",
        test: /^true$|^false$/,
        resolve: (str) => str === "true",
        stringify: stringifyJSON
      },
      {
        identify: intIdentify,
        default: true,
        tag: "tag:yaml.org,2002:int",
        test: /^-?(?:0|[1-9][0-9]*)$/,
        resolve: (str, _onError, { intAsBigInt }) => intAsBigInt ? BigInt(str) : parseInt(str, 10),
        stringify: ({ value }) => intIdentify(value) ? value.toString() : JSON.stringify(value)
      },
      {
        identify: (value) => typeof value === "number",
        default: true,
        tag: "tag:yaml.org,2002:float",
        test: /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]*)?(?:[eE][-+]?[0-9]+)?$/,
        resolve: (str) => parseFloat(str),
        stringify: stringifyJSON
      }
    ];
    var jsonError = {
      default: true,
      tag: "",
      test: /^/,
      resolve(str, onError) {
        onError(`Unresolved plain scalar ${JSON.stringify(str)}`);
        return str;
      }
    };
    var schema = [map.map, seq.seq].concat(jsonScalars, jsonError);
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/binary.js
var require_binary = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/binary.js"(exports) {
    "use strict";
    var node_buffer = __require("buffer");
    var Scalar = require_Scalar();
    var stringifyString = require_stringifyString();
    var binary2 = {
      identify: (value) => value instanceof Uint8Array,
      // Buffer inherits from Uint8Array
      default: false,
      tag: "tag:yaml.org,2002:binary",
      /**
       * Returns a Buffer in node and an Uint8Array in browsers
       *
       * To use the resulting buffer as an image, you'll want to do something like:
       *
       *   const blob = new Blob([buffer], { type: 'image/jpeg' })
       *   document.querySelector('#photo').src = URL.createObjectURL(blob)
       */
      resolve(src, onError) {
        if (typeof node_buffer.Buffer === "function") {
          return node_buffer.Buffer.from(src, "base64");
        } else if (typeof atob === "function") {
          const str = atob(src.replace(/[\n\r]/g, ""));
          const buffer = new Uint8Array(str.length);
          for (let i2 = 0; i2 < str.length; ++i2)
            buffer[i2] = str.charCodeAt(i2);
          return buffer;
        } else {
          onError("This environment does not support reading binary tags; either Buffer or atob is required");
          return src;
        }
      },
      stringify({ comment, type, value }, ctx, onComment, onChompKeep) {
        if (!value)
          return "";
        const buf = value;
        let str;
        if (typeof node_buffer.Buffer === "function") {
          str = buf instanceof node_buffer.Buffer ? buf.toString("base64") : node_buffer.Buffer.from(buf.buffer).toString("base64");
        } else if (typeof btoa === "function") {
          let s = "";
          for (let i2 = 0; i2 < buf.length; ++i2)
            s += String.fromCharCode(buf[i2]);
          str = btoa(s);
        } else {
          throw new Error("This environment does not support writing binary tags; either Buffer or btoa is required");
        }
        type ?? (type = Scalar.Scalar.BLOCK_LITERAL);
        if (type !== Scalar.Scalar.QUOTE_DOUBLE) {
          const lineWidth = Math.max(ctx.options.lineWidth - ctx.indent.length, ctx.options.minContentWidth);
          const n = Math.ceil(str.length / lineWidth);
          const lines = new Array(n);
          for (let i2 = 0, o = 0; i2 < n; ++i2, o += lineWidth) {
            lines[i2] = str.substr(o, lineWidth);
          }
          str = lines.join(type === Scalar.Scalar.BLOCK_LITERAL ? "\n" : " ");
        }
        return stringifyString.stringifyString({ comment, type, value: str }, ctx, onComment, onChompKeep);
      }
    };
    exports.binary = binary2;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/pairs.js
var require_pairs = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/pairs.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLSeq = require_YAMLSeq();
    function resolvePairs(seq, onError) {
      if (identity.isSeq(seq)) {
        for (let i2 = 0; i2 < seq.items.length; ++i2) {
          let item = seq.items[i2];
          if (identity.isPair(item))
            continue;
          else if (identity.isMap(item)) {
            if (item.items.length > 1)
              onError("Each pair must have its own sequence indicator");
            const pair = item.items[0] || new Pair.Pair(new Scalar.Scalar(null));
            if (item.commentBefore)
              pair.key.commentBefore = pair.key.commentBefore ? `${item.commentBefore}
${pair.key.commentBefore}` : item.commentBefore;
            if (item.comment) {
              const cn = pair.value ?? pair.key;
              cn.comment = cn.comment ? `${item.comment}
${cn.comment}` : item.comment;
            }
            item = pair;
          }
          seq.items[i2] = identity.isPair(item) ? item : new Pair.Pair(item);
        }
      } else
        onError("Expected a sequence for this tag");
      return seq;
    }
    function createPairs(schema, iterable, ctx) {
      const { replacer } = ctx;
      const pairs2 = new YAMLSeq.YAMLSeq(schema);
      pairs2.tag = "tag:yaml.org,2002:pairs";
      let i2 = 0;
      if (iterable && Symbol.iterator in Object(iterable))
        for (let it of iterable) {
          if (typeof replacer === "function")
            it = replacer.call(iterable, String(i2++), it);
          let key, value;
          if (Array.isArray(it)) {
            if (it.length === 2) {
              key = it[0];
              value = it[1];
            } else
              throw new TypeError(`Expected [key, value] tuple: ${it}`);
          } else if (it && it instanceof Object) {
            const keys = Object.keys(it);
            if (keys.length === 1) {
              key = keys[0];
              value = it[key];
            } else {
              throw new TypeError(`Expected tuple with one key, not ${keys.length} keys`);
            }
          } else {
            key = it;
          }
          pairs2.items.push(Pair.createPair(key, value, ctx));
        }
      return pairs2;
    }
    var pairs = {
      collection: "seq",
      default: false,
      tag: "tag:yaml.org,2002:pairs",
      resolve: resolvePairs,
      createNode: createPairs
    };
    exports.createPairs = createPairs;
    exports.pairs = pairs;
    exports.resolvePairs = resolvePairs;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/omap.js
var require_omap = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/omap.js"(exports) {
    "use strict";
    var identity = require_identity();
    var toJS = require_toJS();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var pairs = require_pairs();
    var YAMLOMap = class _YAMLOMap extends YAMLSeq.YAMLSeq {
      constructor() {
        super();
        this.add = YAMLMap.YAMLMap.prototype.add.bind(this);
        this.delete = YAMLMap.YAMLMap.prototype.delete.bind(this);
        this.get = YAMLMap.YAMLMap.prototype.get.bind(this);
        this.has = YAMLMap.YAMLMap.prototype.has.bind(this);
        this.set = YAMLMap.YAMLMap.prototype.set.bind(this);
        this.tag = _YAMLOMap.tag;
      }
      /**
       * If `ctx` is given, the return type is actually `Map<unknown, unknown>`,
       * but TypeScript won't allow widening the signature of a child method.
       */
      toJSON(_, ctx) {
        if (!ctx)
          return super.toJSON(_);
        const map = /* @__PURE__ */ new Map();
        if (ctx?.onCreate)
          ctx.onCreate(map);
        for (const pair of this.items) {
          let key, value;
          if (identity.isPair(pair)) {
            key = toJS.toJS(pair.key, "", ctx);
            value = toJS.toJS(pair.value, key, ctx);
          } else {
            key = toJS.toJS(pair, "", ctx);
          }
          if (map.has(key))
            throw new Error("Ordered maps must not include duplicate keys");
          map.set(key, value);
        }
        return map;
      }
      static from(schema, iterable, ctx) {
        const pairs$1 = pairs.createPairs(schema, iterable, ctx);
        const omap2 = new this();
        omap2.items = pairs$1.items;
        return omap2;
      }
    };
    YAMLOMap.tag = "tag:yaml.org,2002:omap";
    var omap = {
      collection: "seq",
      identify: (value) => value instanceof Map,
      nodeClass: YAMLOMap,
      default: false,
      tag: "tag:yaml.org,2002:omap",
      resolve(seq, onError) {
        const pairs$1 = pairs.resolvePairs(seq, onError);
        const seenKeys = [];
        for (const { key } of pairs$1.items) {
          if (identity.isScalar(key)) {
            if (seenKeys.includes(key.value)) {
              onError(`Ordered maps must not include duplicate keys: ${key.value}`);
            } else {
              seenKeys.push(key.value);
            }
          }
        }
        return Object.assign(new YAMLOMap(), pairs$1);
      },
      createNode: (schema, iterable, ctx) => YAMLOMap.from(schema, iterable, ctx)
    };
    exports.YAMLOMap = YAMLOMap;
    exports.omap = omap;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/bool.js
var require_bool2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/bool.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function boolStringify({ value, source }, ctx) {
      const boolObj = value ? trueTag : falseTag;
      if (source && boolObj.test.test(source))
        return source;
      return value ? ctx.options.trueStr : ctx.options.falseStr;
    }
    var trueTag = {
      identify: (value) => value === true,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:Y|y|[Yy]es|YES|[Tt]rue|TRUE|[Oo]n|ON)$/,
      resolve: () => new Scalar.Scalar(true),
      stringify: boolStringify
    };
    var falseTag = {
      identify: (value) => value === false,
      default: true,
      tag: "tag:yaml.org,2002:bool",
      test: /^(?:N|n|[Nn]o|NO|[Ff]alse|FALSE|[Oo]ff|OFF)$/,
      resolve: () => new Scalar.Scalar(false),
      stringify: boolStringify
    };
    exports.falseTag = falseTag;
    exports.trueTag = trueTag;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/float.js
var require_float2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/float.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var stringifyNumber = require_stringifyNumber();
    var floatNaN = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^(?:[-+]?\.(?:inf|Inf|INF)|\.nan|\.NaN|\.NAN)$/,
      resolve: (str) => str.slice(-3).toLowerCase() === "nan" ? NaN : str[0] === "-" ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY,
      stringify: stringifyNumber.stringifyNumber
    };
    var floatExp = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "EXP",
      test: /^[-+]?(?:[0-9][0-9_]*)?(?:\.[0-9_]*)?[eE][-+]?[0-9]+$/,
      resolve: (str) => parseFloat(str.replace(/_/g, "")),
      stringify(node) {
        const num = Number(node.value);
        return isFinite(num) ? num.toExponential() : stringifyNumber.stringifyNumber(node);
      }
    };
    var float = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      test: /^[-+]?(?:[0-9][0-9_]*)?\.[0-9_]*$/,
      resolve(str) {
        const node = new Scalar.Scalar(parseFloat(str.replace(/_/g, "")));
        const dot = str.indexOf(".");
        if (dot !== -1) {
          const f = str.substring(dot + 1).replace(/_/g, "");
          if (f[f.length - 1] === "0")
            node.minFractionDigits = f.length;
        }
        return node;
      },
      stringify: stringifyNumber.stringifyNumber
    };
    exports.float = float;
    exports.floatExp = floatExp;
    exports.floatNaN = floatNaN;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/int.js
var require_int2 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/int.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    var intIdentify = (value) => typeof value === "bigint" || Number.isInteger(value);
    function intResolve(str, offset, radix, { intAsBigInt }) {
      const sign = str[0];
      if (sign === "-" || sign === "+")
        offset += 1;
      str = str.substring(offset).replace(/_/g, "");
      if (intAsBigInt) {
        switch (radix) {
          case 2:
            str = `0b${str}`;
            break;
          case 8:
            str = `0o${str}`;
            break;
          case 16:
            str = `0x${str}`;
            break;
        }
        const n2 = BigInt(str);
        return sign === "-" ? BigInt(-1) * n2 : n2;
      }
      const n = parseInt(str, radix);
      return sign === "-" ? -1 * n : n;
    }
    function intStringify(node, radix, prefix) {
      const { value } = node;
      if (intIdentify(value)) {
        const str = value.toString(radix);
        return value < 0 ? "-" + prefix + str.substr(1) : prefix + str;
      }
      return stringifyNumber.stringifyNumber(node);
    }
    var intBin = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "BIN",
      test: /^[-+]?0b[0-1_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 2, opt),
      stringify: (node) => intStringify(node, 2, "0b")
    };
    var intOct = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "OCT",
      test: /^[-+]?0[0-7_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 1, 8, opt),
      stringify: (node) => intStringify(node, 8, "0")
    };
    var int = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      test: /^[-+]?[0-9][0-9_]*$/,
      resolve: (str, _onError, opt) => intResolve(str, 0, 10, opt),
      stringify: stringifyNumber.stringifyNumber
    };
    var intHex = {
      identify: intIdentify,
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "HEX",
      test: /^[-+]?0x[0-9a-fA-F_]+$/,
      resolve: (str, _onError, opt) => intResolve(str, 2, 16, opt),
      stringify: (node) => intStringify(node, 16, "0x")
    };
    exports.int = int;
    exports.intBin = intBin;
    exports.intHex = intHex;
    exports.intOct = intOct;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/set.js
var require_set = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/set.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSet = class _YAMLSet extends YAMLMap.YAMLMap {
      constructor(schema) {
        super(schema);
        this.tag = _YAMLSet.tag;
      }
      add(key) {
        let pair;
        if (identity.isPair(key))
          pair = key;
        else if (key && typeof key === "object" && "key" in key && "value" in key && key.value === null)
          pair = new Pair.Pair(key.key, null);
        else
          pair = new Pair.Pair(key, null);
        const prev = YAMLMap.findPair(this.items, pair.key);
        if (!prev)
          this.items.push(pair);
      }
      /**
       * If `keepPair` is `true`, returns the Pair matching `key`.
       * Otherwise, returns the value of that Pair's key.
       */
      get(key, keepPair) {
        const pair = YAMLMap.findPair(this.items, key);
        return !keepPair && identity.isPair(pair) ? identity.isScalar(pair.key) ? pair.key.value : pair.key : pair;
      }
      set(key, value) {
        if (typeof value !== "boolean")
          throw new Error(`Expected boolean value for set(key, value) in a YAML set, not ${typeof value}`);
        const prev = YAMLMap.findPair(this.items, key);
        if (prev && !value) {
          this.items.splice(this.items.indexOf(prev), 1);
        } else if (!prev && value) {
          this.items.push(new Pair.Pair(key));
        }
      }
      toJSON(_, ctx) {
        return super.toJSON(_, ctx, Set);
      }
      toString(ctx, onComment, onChompKeep) {
        if (!ctx)
          return JSON.stringify(this);
        if (this.hasAllNullValues(true))
          return super.toString(Object.assign({}, ctx, { allNullValues: true }), onComment, onChompKeep);
        else
          throw new Error("Set items must all have null values");
      }
      static from(schema, iterable, ctx) {
        const { replacer } = ctx;
        const set2 = new this(schema);
        if (iterable && Symbol.iterator in Object(iterable))
          for (let value of iterable) {
            if (typeof replacer === "function")
              value = replacer.call(iterable, value, value);
            set2.items.push(Pair.createPair(value, null, ctx));
          }
        return set2;
      }
    };
    YAMLSet.tag = "tag:yaml.org,2002:set";
    var set = {
      collection: "map",
      identify: (value) => value instanceof Set,
      nodeClass: YAMLSet,
      default: false,
      tag: "tag:yaml.org,2002:set",
      createNode: (schema, iterable, ctx) => YAMLSet.from(schema, iterable, ctx),
      resolve(map, onError) {
        if (identity.isMap(map)) {
          if (map.hasAllNullValues(true))
            return Object.assign(new YAMLSet(), map);
          else
            onError("Set items must all have null values");
        } else
          onError("Expected a mapping for this tag");
        return map;
      }
    };
    exports.YAMLSet = YAMLSet;
    exports.set = set;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/timestamp.js
var require_timestamp = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/timestamp.js"(exports) {
    "use strict";
    var stringifyNumber = require_stringifyNumber();
    function parseSexagesimal(str, asBigInt) {
      const sign = str[0];
      const parts2 = sign === "-" || sign === "+" ? str.substring(1) : str;
      const num = (n) => asBigInt ? BigInt(n) : Number(n);
      const res = parts2.replace(/_/g, "").split(":").reduce((res2, p) => res2 * num(60) + num(p), num(0));
      return sign === "-" ? num(-1) * res : res;
    }
    function stringifySexagesimal(node) {
      let { value } = node;
      let num = (n) => n;
      if (typeof value === "bigint")
        num = (n) => BigInt(n);
      else if (isNaN(value) || !isFinite(value))
        return stringifyNumber.stringifyNumber(node);
      let sign = "";
      if (value < 0) {
        sign = "-";
        value *= num(-1);
      }
      const _60 = num(60);
      const parts2 = [value % _60];
      if (value < 60) {
        parts2.unshift(0);
      } else {
        value = (value - parts2[0]) / _60;
        parts2.unshift(value % _60);
        if (value >= 60) {
          value = (value - parts2[0]) / _60;
          parts2.unshift(value);
        }
      }
      return sign + parts2.map((n) => String(n).padStart(2, "0")).join(":").replace(/000000\d*$/, "");
    }
    var intTime = {
      identify: (value) => typeof value === "bigint" || Number.isInteger(value),
      default: true,
      tag: "tag:yaml.org,2002:int",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+$/,
      resolve: (str, _onError, { intAsBigInt }) => parseSexagesimal(str, intAsBigInt),
      stringify: stringifySexagesimal
    };
    var floatTime = {
      identify: (value) => typeof value === "number",
      default: true,
      tag: "tag:yaml.org,2002:float",
      format: "TIME",
      test: /^[-+]?[0-9][0-9_]*(?::[0-5]?[0-9])+\.[0-9_]*$/,
      resolve: (str) => parseSexagesimal(str, false),
      stringify: stringifySexagesimal
    };
    var timestamp = {
      identify: (value) => value instanceof Date,
      default: true,
      tag: "tag:yaml.org,2002:timestamp",
      // If the time zone is omitted, the timestamp is assumed to be specified in UTC. The time part
      // may be omitted altogether, resulting in a date format. In such a case, the time part is
      // assumed to be 00:00:00Z (start of day, UTC).
      test: RegExp("^([0-9]{4})-([0-9]{1,2})-([0-9]{1,2})(?:(?:t|T|[ \\t]+)([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2}(\\.[0-9]+)?)(?:[ \\t]*(Z|[-+][012]?[0-9](?::[0-9]{2})?))?)?$"),
      resolve(str) {
        const match = str.match(timestamp.test);
        if (!match)
          throw new Error("!!timestamp expects a date, starting with yyyy-mm-dd");
        const [, year, month, day, hour, minute, second] = match.map(Number);
        const millisec = match[7] ? Number((match[7] + "00").substr(1, 3)) : 0;
        let date = Date.UTC(year, month - 1, day, hour || 0, minute || 0, second || 0, millisec);
        const tz = match[8];
        if (tz && tz !== "Z") {
          let d = parseSexagesimal(tz, false);
          if (Math.abs(d) < 30)
            d *= 60;
          date -= 6e4 * d;
        }
        return new Date(date);
      },
      stringify: ({ value }) => value?.toISOString().replace(/(T00:00:00)?\.000Z$/, "") ?? ""
    };
    exports.floatTime = floatTime;
    exports.intTime = intTime;
    exports.timestamp = timestamp;
  }
});

// node_modules/yaml/dist/schema/yaml-1.1/schema.js
var require_schema3 = __commonJS({
  "node_modules/yaml/dist/schema/yaml-1.1/schema.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var binary2 = require_binary();
    var bool = require_bool2();
    var float = require_float2();
    var int = require_int2();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var set = require_set();
    var timestamp = require_timestamp();
    var schema = [
      map.map,
      seq.seq,
      string.string,
      _null.nullTag,
      bool.trueTag,
      bool.falseTag,
      int.intBin,
      int.intOct,
      int.int,
      int.intHex,
      float.floatNaN,
      float.floatExp,
      float.float,
      binary2.binary,
      merge.merge,
      omap.omap,
      pairs.pairs,
      set.set,
      timestamp.intTime,
      timestamp.floatTime,
      timestamp.timestamp
    ];
    exports.schema = schema;
  }
});

// node_modules/yaml/dist/schema/tags.js
var require_tags = __commonJS({
  "node_modules/yaml/dist/schema/tags.js"(exports) {
    "use strict";
    var map = require_map();
    var _null = require_null();
    var seq = require_seq();
    var string = require_string();
    var bool = require_bool();
    var float = require_float();
    var int = require_int();
    var schema = require_schema();
    var schema$1 = require_schema2();
    var binary2 = require_binary();
    var merge = require_merge();
    var omap = require_omap();
    var pairs = require_pairs();
    var schema$2 = require_schema3();
    var set = require_set();
    var timestamp = require_timestamp();
    var schemas = /* @__PURE__ */ new Map([
      ["core", schema.schema],
      ["failsafe", [map.map, seq.seq, string.string]],
      ["json", schema$1.schema],
      ["yaml11", schema$2.schema],
      ["yaml-1.1", schema$2.schema]
    ]);
    var tagsByName = {
      binary: binary2.binary,
      bool: bool.boolTag,
      float: float.float,
      floatExp: float.floatExp,
      floatNaN: float.floatNaN,
      floatTime: timestamp.floatTime,
      int: int.int,
      intHex: int.intHex,
      intOct: int.intOct,
      intTime: timestamp.intTime,
      map: map.map,
      merge: merge.merge,
      null: _null.nullTag,
      omap: omap.omap,
      pairs: pairs.pairs,
      seq: seq.seq,
      set: set.set,
      timestamp: timestamp.timestamp
    };
    var coreKnownTags = {
      "tag:yaml.org,2002:binary": binary2.binary,
      "tag:yaml.org,2002:merge": merge.merge,
      "tag:yaml.org,2002:omap": omap.omap,
      "tag:yaml.org,2002:pairs": pairs.pairs,
      "tag:yaml.org,2002:set": set.set,
      "tag:yaml.org,2002:timestamp": timestamp.timestamp
    };
    function getTags(customTags, schemaName, addMergeTag) {
      const schemaTags = schemas.get(schemaName);
      if (schemaTags && !customTags) {
        return addMergeTag && !schemaTags.includes(merge.merge) ? schemaTags.concat(merge.merge) : schemaTags.slice();
      }
      let tags = schemaTags;
      if (!tags) {
        if (Array.isArray(customTags))
          tags = [];
        else {
          const keys = Array.from(schemas.keys()).filter((key) => key !== "yaml11").map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown schema "${schemaName}"; use one of ${keys} or define customTags array`);
        }
      }
      if (Array.isArray(customTags)) {
        for (const tag of customTags)
          tags = tags.concat(tag);
      } else if (typeof customTags === "function") {
        tags = customTags(tags.slice());
      }
      if (addMergeTag)
        tags = tags.concat(merge.merge);
      return tags.reduce((tags2, tag) => {
        const tagObj = typeof tag === "string" ? tagsByName[tag] : tag;
        if (!tagObj) {
          const tagName = JSON.stringify(tag);
          const keys = Object.keys(tagsByName).map((key) => JSON.stringify(key)).join(", ");
          throw new Error(`Unknown custom tag ${tagName}; use one of ${keys}`);
        }
        if (!tags2.includes(tagObj))
          tags2.push(tagObj);
        return tags2;
      }, []);
    }
    exports.coreKnownTags = coreKnownTags;
    exports.getTags = getTags;
  }
});

// node_modules/yaml/dist/schema/Schema.js
var require_Schema = __commonJS({
  "node_modules/yaml/dist/schema/Schema.js"(exports) {
    "use strict";
    var identity = require_identity();
    var map = require_map();
    var seq = require_seq();
    var string = require_string();
    var tags = require_tags();
    var sortMapEntriesByKey = (a, b) => a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    var Schema = class _Schema {
      constructor({ compat, customTags, merge, resolveKnownTags, schema, sortMapEntries, toStringDefaults }) {
        this.compat = Array.isArray(compat) ? tags.getTags(compat, "compat") : compat ? tags.getTags(null, compat) : null;
        this.name = typeof schema === "string" && schema || "core";
        this.knownTags = resolveKnownTags ? tags.coreKnownTags : {};
        this.tags = tags.getTags(customTags, this.name, merge);
        this.toStringOptions = toStringDefaults ?? null;
        Object.defineProperty(this, identity.MAP, { value: map.map });
        Object.defineProperty(this, identity.SCALAR, { value: string.string });
        Object.defineProperty(this, identity.SEQ, { value: seq.seq });
        this.sortMapEntries = typeof sortMapEntries === "function" ? sortMapEntries : sortMapEntries === true ? sortMapEntriesByKey : null;
      }
      clone() {
        const copy = Object.create(_Schema.prototype, Object.getOwnPropertyDescriptors(this));
        copy.tags = this.tags.slice();
        return copy;
      }
    };
    exports.Schema = Schema;
  }
});

// node_modules/yaml/dist/stringify/stringifyDocument.js
var require_stringifyDocument = __commonJS({
  "node_modules/yaml/dist/stringify/stringifyDocument.js"(exports) {
    "use strict";
    var identity = require_identity();
    var stringify = require_stringify();
    var stringifyComment = require_stringifyComment();
    function stringifyDocument(doc, options) {
      const lines = [];
      let hasDirectives = options.directives === true;
      if (options.directives !== false && doc.directives) {
        const dir = doc.directives.toString(doc);
        if (dir) {
          lines.push(dir);
          hasDirectives = true;
        } else if (doc.directives.docStart)
          hasDirectives = true;
      }
      if (hasDirectives)
        lines.push("---");
      const ctx = stringify.createStringifyContext(doc, options);
      const { commentString } = ctx.options;
      if (doc.commentBefore) {
        if (lines.length !== 1)
          lines.unshift("");
        const cs = commentString(doc.commentBefore);
        lines.unshift(stringifyComment.indentComment(cs, ""));
      }
      let chompKeep = false;
      let contentComment = null;
      if (doc.contents) {
        if (identity.isNode(doc.contents)) {
          if (doc.contents.spaceBefore && hasDirectives)
            lines.push("");
          if (doc.contents.commentBefore) {
            const cs = commentString(doc.contents.commentBefore);
            lines.push(stringifyComment.indentComment(cs, ""));
          }
          ctx.forceBlockIndent = !!doc.comment;
          contentComment = doc.contents.comment;
        }
        const onChompKeep = contentComment ? void 0 : () => chompKeep = true;
        let body2 = stringify.stringify(doc.contents, ctx, () => contentComment = null, onChompKeep);
        if (contentComment)
          body2 += stringifyComment.lineComment(body2, "", commentString(contentComment));
        if ((body2[0] === "|" || body2[0] === ">") && lines[lines.length - 1] === "---") {
          lines[lines.length - 1] = `--- ${body2}`;
        } else
          lines.push(body2);
      } else {
        lines.push(stringify.stringify(doc.contents, ctx));
      }
      if (doc.directives?.docEnd) {
        if (doc.comment) {
          const cs = commentString(doc.comment);
          if (cs.includes("\n")) {
            lines.push("...");
            lines.push(stringifyComment.indentComment(cs, ""));
          } else {
            lines.push(`... ${cs}`);
          }
        } else {
          lines.push("...");
        }
      } else {
        let dc = doc.comment;
        if (dc && chompKeep)
          dc = dc.replace(/^\n+/, "");
        if (dc) {
          if ((!chompKeep || contentComment) && lines[lines.length - 1] !== "")
            lines.push("");
          lines.push(stringifyComment.indentComment(commentString(dc), ""));
        }
      }
      return lines.join("\n") + "\n";
    }
    exports.stringifyDocument = stringifyDocument;
  }
});

// node_modules/yaml/dist/doc/Document.js
var require_Document = __commonJS({
  "node_modules/yaml/dist/doc/Document.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var Collection = require_Collection();
    var identity = require_identity();
    var Pair = require_Pair();
    var toJS = require_toJS();
    var Schema = require_Schema();
    var stringifyDocument = require_stringifyDocument();
    var anchors = require_anchors();
    var applyReviver = require_applyReviver();
    var createNode = require_createNode();
    var directives = require_directives();
    var Document = class _Document {
      constructor(value, replacer, options) {
        this.commentBefore = null;
        this.comment = null;
        this.errors = [];
        this.warnings = [];
        Object.defineProperty(this, identity.NODE_TYPE, { value: identity.DOC });
        let _replacer = null;
        if (typeof replacer === "function" || Array.isArray(replacer)) {
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const opt = Object.assign({
          intAsBigInt: false,
          keepSourceTokens: false,
          logLevel: "warn",
          prettyErrors: true,
          strict: true,
          stringKeys: false,
          uniqueKeys: true,
          version: "1.2"
        }, options);
        this.options = opt;
        let { version } = opt;
        if (options?._directives) {
          this.directives = options._directives.atDocument();
          if (this.directives.yaml.explicit)
            version = this.directives.yaml.version;
        } else
          this.directives = new directives.Directives({ version });
        this.setSchema(version, options);
        this.contents = value === void 0 ? null : this.createNode(value, _replacer, options);
      }
      /**
       * Create a deep copy of this Document and its contents.
       *
       * Custom Node values that inherit from `Object` still refer to their original instances.
       */
      clone() {
        const copy = Object.create(_Document.prototype, {
          [identity.NODE_TYPE]: { value: identity.DOC }
        });
        copy.commentBefore = this.commentBefore;
        copy.comment = this.comment;
        copy.errors = this.errors.slice();
        copy.warnings = this.warnings.slice();
        copy.options = Object.assign({}, this.options);
        if (this.directives)
          copy.directives = this.directives.clone();
        copy.schema = this.schema.clone();
        copy.contents = identity.isNode(this.contents) ? this.contents.clone(copy.schema) : this.contents;
        if (this.range)
          copy.range = this.range.slice();
        return copy;
      }
      /** Adds a value to the document. */
      add(value) {
        if (assertCollection(this.contents))
          this.contents.add(value);
      }
      /** Adds a value to the document. */
      addIn(path, value) {
        if (assertCollection(this.contents))
          this.contents.addIn(path, value);
      }
      /**
       * Create a new `Alias` node, ensuring that the target `node` has the required anchor.
       *
       * If `node` already has an anchor, `name` is ignored.
       * Otherwise, the `node.anchor` value will be set to `name`,
       * or if an anchor with that name is already present in the document,
       * `name` will be used as a prefix for a new unique anchor.
       * If `name` is undefined, the generated anchor will use 'a' as a prefix.
       */
      createAlias(node, name2) {
        if (!node.anchor) {
          const prev = anchors.anchorNames(this);
          node.anchor = // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          !name2 || prev.has(name2) ? anchors.findNewAnchor(name2 || "a", prev) : name2;
        }
        return new Alias.Alias(node.anchor);
      }
      createNode(value, replacer, options) {
        let _replacer = void 0;
        if (typeof replacer === "function") {
          value = replacer.call({ "": value }, "", value);
          _replacer = replacer;
        } else if (Array.isArray(replacer)) {
          const keyToStr = (v) => typeof v === "number" || v instanceof String || v instanceof Number;
          const asStr = replacer.filter(keyToStr).map(String);
          if (asStr.length > 0)
            replacer = replacer.concat(asStr);
          _replacer = replacer;
        } else if (options === void 0 && replacer) {
          options = replacer;
          replacer = void 0;
        }
        const { aliasDuplicateObjects, anchorPrefix, flow, keepUndefined, onTagObj, tag } = options ?? {};
        const { onAnchor, setAnchors, sourceObjects } = anchors.createNodeAnchors(
          this,
          // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
          anchorPrefix || "a"
        );
        const ctx = {
          aliasDuplicateObjects: aliasDuplicateObjects ?? true,
          keepUndefined: keepUndefined ?? false,
          onAnchor,
          onTagObj,
          replacer: _replacer,
          schema: this.schema,
          sourceObjects
        };
        const node = createNode.createNode(value, tag, ctx);
        if (flow && identity.isCollection(node))
          node.flow = true;
        setAnchors();
        return node;
      }
      /**
       * Convert a key and a value into a `Pair` using the current schema,
       * recursively wrapping all values as `Scalar` or `Collection` nodes.
       */
      createPair(key, value, options = {}) {
        const k = this.createNode(key, null, options);
        const v = this.createNode(value, null, options);
        return new Pair.Pair(k, v);
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      delete(key) {
        return assertCollection(this.contents) ? this.contents.delete(key) : false;
      }
      /**
       * Removes a value from the document.
       * @returns `true` if the item was found and removed.
       */
      deleteIn(path) {
        if (Collection.isEmptyPath(path)) {
          if (this.contents == null)
            return false;
          this.contents = null;
          return true;
        }
        return assertCollection(this.contents) ? this.contents.deleteIn(path) : false;
      }
      /**
       * Returns item at `key`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      get(key, keepScalar) {
        return identity.isCollection(this.contents) ? this.contents.get(key, keepScalar) : void 0;
      }
      /**
       * Returns item at `path`, or `undefined` if not found. By default unwraps
       * scalar values from their surrounding node; to disable set `keepScalar` to
       * `true` (collections are always returned intact).
       */
      getIn(path, keepScalar) {
        if (Collection.isEmptyPath(path))
          return !keepScalar && identity.isScalar(this.contents) ? this.contents.value : this.contents;
        return identity.isCollection(this.contents) ? this.contents.getIn(path, keepScalar) : void 0;
      }
      /**
       * Checks if the document includes a value with the key `key`.
       */
      has(key) {
        return identity.isCollection(this.contents) ? this.contents.has(key) : false;
      }
      /**
       * Checks if the document includes a value at `path`.
       */
      hasIn(path) {
        if (Collection.isEmptyPath(path))
          return this.contents !== void 0;
        return identity.isCollection(this.contents) ? this.contents.hasIn(path) : false;
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      set(key, value) {
        if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, [key], value);
        } else if (assertCollection(this.contents)) {
          this.contents.set(key, value);
        }
      }
      /**
       * Sets a value in this document. For `!!set`, `value` needs to be a
       * boolean to add/remove the item from the set.
       */
      setIn(path, value) {
        if (Collection.isEmptyPath(path)) {
          this.contents = value;
        } else if (this.contents == null) {
          this.contents = Collection.collectionFromPath(this.schema, Array.from(path), value);
        } else if (assertCollection(this.contents)) {
          this.contents.setIn(path, value);
        }
      }
      /**
       * Change the YAML version and schema used by the document.
       * A `null` version disables support for directives, explicit tags, anchors, and aliases.
       * It also requires the `schema` option to be given as a `Schema` instance value.
       *
       * Overrides all previously set schema options.
       */
      setSchema(version, options = {}) {
        if (typeof version === "number")
          version = String(version);
        let opt;
        switch (version) {
          case "1.1":
            if (this.directives)
              this.directives.yaml.version = "1.1";
            else
              this.directives = new directives.Directives({ version: "1.1" });
            opt = { resolveKnownTags: false, schema: "yaml-1.1" };
            break;
          case "1.2":
          case "next":
            if (this.directives)
              this.directives.yaml.version = version;
            else
              this.directives = new directives.Directives({ version });
            opt = { resolveKnownTags: true, schema: "core" };
            break;
          case null:
            if (this.directives)
              delete this.directives;
            opt = null;
            break;
          default: {
            const sv = JSON.stringify(version);
            throw new Error(`Expected '1.1', '1.2' or null as first argument, but found: ${sv}`);
          }
        }
        if (options.schema instanceof Object)
          this.schema = options.schema;
        else if (opt)
          this.schema = new Schema.Schema(Object.assign(opt, options));
        else
          throw new Error(`With a null YAML version, the { schema: Schema } option is required`);
      }
      // json & jsonArg are only used from toJSON()
      toJS({ json, jsonArg, mapAsMap, maxAliasCount, onAnchor, reviver } = {}) {
        const ctx = {
          anchors: /* @__PURE__ */ new Map(),
          doc: this,
          keep: !json,
          mapAsMap: mapAsMap === true,
          mapKeyWarned: false,
          maxAliasCount: typeof maxAliasCount === "number" ? maxAliasCount : 100
        };
        const res = toJS.toJS(this.contents, jsonArg ?? "", ctx);
        if (typeof onAnchor === "function")
          for (const { count, res: res2 } of ctx.anchors.values())
            onAnchor(res2, count);
        return typeof reviver === "function" ? applyReviver.applyReviver(reviver, { "": res }, "", res) : res;
      }
      /**
       * A JSON representation of the document `contents`.
       *
       * @param jsonArg Used by `JSON.stringify` to indicate the array index or
       *   property name.
       */
      toJSON(jsonArg, onAnchor) {
        return this.toJS({ json: true, jsonArg, mapAsMap: false, onAnchor });
      }
      /** A YAML representation of the document. */
      toString(options = {}) {
        if (this.errors.length > 0)
          throw new Error("Document with errors cannot be stringified");
        if ("indent" in options && (!Number.isInteger(options.indent) || Number(options.indent) <= 0)) {
          const s = JSON.stringify(options.indent);
          throw new Error(`"indent" option must be a positive integer, not ${s}`);
        }
        return stringifyDocument.stringifyDocument(this, options);
      }
    };
    function assertCollection(contents) {
      if (identity.isCollection(contents))
        return true;
      throw new Error("Expected a YAML collection as document contents");
    }
    exports.Document = Document;
  }
});

// node_modules/yaml/dist/errors.js
var require_errors = __commonJS({
  "node_modules/yaml/dist/errors.js"(exports) {
    "use strict";
    var YAMLError = class extends Error {
      constructor(name2, pos, code, message) {
        super();
        this.name = name2;
        this.code = code;
        this.message = message;
        this.pos = pos;
      }
    };
    var YAMLParseError = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLParseError", pos, code, message);
      }
    };
    var YAMLWarning = class extends YAMLError {
      constructor(pos, code, message) {
        super("YAMLWarning", pos, code, message);
      }
    };
    var prettifyError = (src, lc) => (error) => {
      if (error.pos[0] === -1)
        return;
      error.linePos = error.pos.map((pos) => lc.linePos(pos));
      const { line, col } = error.linePos[0];
      error.message += ` at line ${line}, column ${col}`;
      let ci = col - 1;
      let lineStr = src.substring(lc.lineStarts[line - 1], lc.lineStarts[line]).replace(/[\n\r]+$/, "");
      if (ci >= 60 && lineStr.length > 80) {
        const trimStart = Math.min(ci - 39, lineStr.length - 79);
        lineStr = "\u2026" + lineStr.substring(trimStart);
        ci -= trimStart - 1;
      }
      if (lineStr.length > 80)
        lineStr = lineStr.substring(0, 79) + "\u2026";
      if (line > 1 && /^ *$/.test(lineStr.substring(0, ci))) {
        let prev = src.substring(lc.lineStarts[line - 2], lc.lineStarts[line - 1]);
        if (prev.length > 80)
          prev = prev.substring(0, 79) + "\u2026\n";
        lineStr = prev + lineStr;
      }
      if (/[^ ]/.test(lineStr)) {
        let count = 1;
        const end = error.linePos[1];
        if (end?.line === line && end.col > col) {
          count = Math.max(1, Math.min(end.col - col, 80 - ci));
        }
        const pointer = " ".repeat(ci) + "^".repeat(count);
        error.message += `:

${lineStr}
${pointer}
`;
      }
    };
    exports.YAMLError = YAMLError;
    exports.YAMLParseError = YAMLParseError;
    exports.YAMLWarning = YAMLWarning;
    exports.prettifyError = prettifyError;
  }
});

// node_modules/yaml/dist/compose/resolve-props.js
var require_resolve_props = __commonJS({
  "node_modules/yaml/dist/compose/resolve-props.js"(exports) {
    "use strict";
    function resolveProps(tokens, { flow, indicator, next, offset, onError, parentIndent, startOnNewline }) {
      let spaceBefore = false;
      let atNewline = startOnNewline;
      let hasSpace = startOnNewline;
      let comment = "";
      let commentSep = "";
      let hasNewline = false;
      let reqSpace = false;
      let tab = null;
      let anchor = null;
      let tag = null;
      let newlineAfterProp = null;
      let comma = null;
      let found = null;
      let start2 = null;
      for (const token of tokens) {
        if (reqSpace) {
          if (token.type !== "space" && token.type !== "newline" && token.type !== "comma")
            onError(token.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
          reqSpace = false;
        }
        if (tab) {
          if (atNewline && token.type !== "comment" && token.type !== "newline") {
            onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
          }
          tab = null;
        }
        switch (token.type) {
          case "space":
            if (!flow && (indicator !== "doc-start" || next?.type !== "flow-collection") && token.source.includes("	")) {
              tab = token;
            }
            hasSpace = true;
            break;
          case "comment": {
            if (!hasSpace)
              onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
            const cb = token.source.substring(1) || " ";
            if (!comment)
              comment = cb;
            else
              comment += commentSep + cb;
            commentSep = "";
            atNewline = false;
            break;
          }
          case "newline":
            if (atNewline) {
              if (comment)
                comment += token.source;
              else if (!found || indicator !== "seq-item-ind")
                spaceBefore = true;
            } else
              commentSep += token.source;
            atNewline = true;
            hasNewline = true;
            if (anchor || tag)
              newlineAfterProp = token;
            hasSpace = true;
            break;
          case "anchor":
            if (anchor)
              onError(token, "MULTIPLE_ANCHORS", "A node can have at most one anchor");
            if (token.source.endsWith(":"))
              onError(token.offset + token.source.length - 1, "BAD_ALIAS", "Anchor ending in : is ambiguous", true);
            anchor = token;
            start2 ?? (start2 = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          case "tag": {
            if (tag)
              onError(token, "MULTIPLE_TAGS", "A node can have at most one tag");
            tag = token;
            start2 ?? (start2 = token.offset);
            atNewline = false;
            hasSpace = false;
            reqSpace = true;
            break;
          }
          case indicator:
            if (anchor || tag)
              onError(token, "BAD_PROP_ORDER", `Anchors and tags must be after the ${token.source} indicator`);
            if (found)
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.source} in ${flow ?? "collection"}`);
            found = token;
            atNewline = indicator === "seq-item-ind" || indicator === "explicit-key-ind";
            hasSpace = false;
            break;
          case "comma":
            if (flow) {
              if (comma)
                onError(token, "UNEXPECTED_TOKEN", `Unexpected , in ${flow}`);
              comma = token;
              atNewline = false;
              hasSpace = false;
              break;
            }
          // else fallthrough
          default:
            onError(token, "UNEXPECTED_TOKEN", `Unexpected ${token.type} token`);
            atNewline = false;
            hasSpace = false;
        }
      }
      const last = tokens[tokens.length - 1];
      const end = last ? last.offset + last.source.length : offset;
      if (reqSpace && next && next.type !== "space" && next.type !== "newline" && next.type !== "comma" && (next.type !== "scalar" || next.source !== "")) {
        onError(next.offset, "MISSING_CHAR", "Tags and anchors must be separated from the next token by white space");
      }
      if (tab && (atNewline && tab.indent <= parentIndent || next?.type === "block-map" || next?.type === "block-seq"))
        onError(tab, "TAB_AS_INDENT", "Tabs are not allowed as indentation");
      return {
        comma,
        found,
        spaceBefore,
        comment,
        hasNewline,
        anchor,
        tag,
        newlineAfterProp,
        end,
        start: start2 ?? end
      };
    }
    exports.resolveProps = resolveProps;
  }
});

// node_modules/yaml/dist/compose/util-contains-newline.js
var require_util_contains_newline = __commonJS({
  "node_modules/yaml/dist/compose/util-contains-newline.js"(exports) {
    "use strict";
    function containsNewline(key) {
      if (!key)
        return null;
      switch (key.type) {
        case "alias":
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          if (key.source.includes("\n"))
            return true;
          if (key.end) {
            for (const st of key.end)
              if (st.type === "newline")
                return true;
          }
          return false;
        case "flow-collection":
          for (const it of key.items) {
            for (const st of it.start)
              if (st.type === "newline")
                return true;
            if (it.sep) {
              for (const st of it.sep)
                if (st.type === "newline")
                  return true;
            }
            if (containsNewline(it.key) || containsNewline(it.value))
              return true;
          }
          return false;
        default:
          return true;
      }
    }
    exports.containsNewline = containsNewline;
  }
});

// node_modules/yaml/dist/compose/util-flow-indent-check.js
var require_util_flow_indent_check = __commonJS({
  "node_modules/yaml/dist/compose/util-flow-indent-check.js"(exports) {
    "use strict";
    var utilContainsNewline = require_util_contains_newline();
    function flowIndentCheck(indent, fc, onError) {
      if (fc?.type === "flow-collection") {
        const end = fc.end[0];
        if (end.indent === indent && (end.source === "]" || end.source === "}") && utilContainsNewline.containsNewline(fc)) {
          const msg = "Flow end indicator should be more indented than parent";
          onError(end, "BAD_INDENT", msg, true);
        }
      }
    }
    exports.flowIndentCheck = flowIndentCheck;
  }
});

// node_modules/yaml/dist/compose/util-map-includes.js
var require_util_map_includes = __commonJS({
  "node_modules/yaml/dist/compose/util-map-includes.js"(exports) {
    "use strict";
    var identity = require_identity();
    function mapIncludes(ctx, items, search) {
      const { uniqueKeys } = ctx.options;
      if (uniqueKeys === false)
        return false;
      const isEqual = typeof uniqueKeys === "function" ? uniqueKeys : (a, b) => a === b || identity.isScalar(a) && identity.isScalar(b) && a.value === b.value;
      return items.some((pair) => isEqual(pair.key, search));
    }
    exports.mapIncludes = mapIncludes;
  }
});

// node_modules/yaml/dist/compose/resolve-block-map.js
var require_resolve_block_map = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-map.js"(exports) {
    "use strict";
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    var utilMapIncludes = require_util_map_includes();
    var startColMsg = "All mapping items must start at the same column";
    function resolveBlockMap({ composeNode, composeEmptyNode }, ctx, bm, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLMap.YAMLMap;
      const map = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      let offset = bm.offset;
      let commentEnd = null;
      for (const collItem of bm.items) {
        const { start: start2, key, sep, value } = collItem;
        const keyProps = resolveProps.resolveProps(start2, {
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: bm.indent,
          startOnNewline: true
        });
        const implicitKey = !keyProps.found;
        if (implicitKey) {
          if (key) {
            if (key.type === "block-seq")
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "A block sequence may not be used as an implicit map key");
            else if ("indent" in key && key.indent !== bm.indent)
              onError(offset, "BAD_INDENT", startColMsg);
          }
          if (!keyProps.anchor && !keyProps.tag && !sep) {
            commentEnd = keyProps.end;
            if (keyProps.comment) {
              if (map.comment)
                map.comment += "\n" + keyProps.comment;
              else
                map.comment = keyProps.comment;
            }
            continue;
          }
          if (keyProps.newlineAfterProp || utilContainsNewline.containsNewline(key)) {
            onError(key ?? start2[start2.length - 1], "MULTILINE_IMPLICIT_KEY", "Implicit keys need to be on a single line");
          }
        } else if (keyProps.found?.indent !== bm.indent) {
          onError(offset, "BAD_INDENT", startColMsg);
        }
        ctx.atKey = true;
        const keyStart = keyProps.end;
        const keyNode = key ? composeNode(ctx, key, keyProps, onError) : composeEmptyNode(ctx, keyStart, start2, null, keyProps, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bm.indent, key, onError);
        ctx.atKey = false;
        if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
          onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
        const valueProps = resolveProps.resolveProps(sep ?? [], {
          indicator: "map-value-ind",
          next: value,
          offset: keyNode.range[2],
          onError,
          parentIndent: bm.indent,
          startOnNewline: !key || key.type === "block-scalar"
        });
        offset = valueProps.end;
        if (valueProps.found) {
          if (implicitKey) {
            if (value?.type === "block-map" && !valueProps.hasNewline)
              onError(offset, "BLOCK_AS_IMPLICIT_KEY", "Nested mappings are not allowed in compact mappings");
            if (ctx.options.strict && keyProps.start < valueProps.found.offset - 1024)
              onError(keyNode.range, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit block mapping key");
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : composeEmptyNode(ctx, offset, sep, null, valueProps, onError);
          if (ctx.schema.compat)
            utilFlowIndentCheck.flowIndentCheck(bm.indent, value, onError);
          offset = valueNode.range[2];
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        } else {
          if (implicitKey)
            onError(keyNode.range, "MISSING_CHAR", "Implicit map keys need to be followed by map values");
          if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          map.items.push(pair);
        }
      }
      if (commentEnd && commentEnd < offset)
        onError(commentEnd, "IMPOSSIBLE", "Map comment with trailing content");
      map.range = [bm.offset, offset, commentEnd ?? offset];
      return map;
    }
    exports.resolveBlockMap = resolveBlockMap;
  }
});

// node_modules/yaml/dist/compose/resolve-block-seq.js
var require_resolve_block_seq = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-seq.js"(exports) {
    "use strict";
    var YAMLSeq = require_YAMLSeq();
    var resolveProps = require_resolve_props();
    var utilFlowIndentCheck = require_util_flow_indent_check();
    function resolveBlockSeq({ composeNode, composeEmptyNode }, ctx, bs, onError, tag) {
      const NodeClass = tag?.nodeClass ?? YAMLSeq.YAMLSeq;
      const seq = new NodeClass(ctx.schema);
      if (ctx.atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = bs.offset;
      let commentEnd = null;
      for (const { start: start2, value } of bs.items) {
        const props = resolveProps.resolveProps(start2, {
          indicator: "seq-item-ind",
          next: value,
          offset,
          onError,
          parentIndent: bs.indent,
          startOnNewline: true
        });
        if (!props.found) {
          if (props.anchor || props.tag || value) {
            if (value?.type === "block-seq")
              onError(props.end, "BAD_INDENT", "All sequence items must start at the same column");
            else
              onError(offset, "MISSING_CHAR", "Sequence item without - indicator");
          } else {
            commentEnd = props.end;
            if (props.comment)
              seq.comment = props.comment;
            continue;
          }
        }
        const node = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, start2, null, props, onError);
        if (ctx.schema.compat)
          utilFlowIndentCheck.flowIndentCheck(bs.indent, value, onError);
        offset = node.range[2];
        seq.items.push(node);
      }
      seq.range = [bs.offset, offset, commentEnd ?? offset];
      return seq;
    }
    exports.resolveBlockSeq = resolveBlockSeq;
  }
});

// node_modules/yaml/dist/compose/resolve-end.js
var require_resolve_end = __commonJS({
  "node_modules/yaml/dist/compose/resolve-end.js"(exports) {
    "use strict";
    function resolveEnd(end, offset, reqSpace, onError) {
      let comment = "";
      if (end) {
        let hasSpace = false;
        let sep = "";
        for (const token of end) {
          const { source, type } = token;
          switch (type) {
            case "space":
              hasSpace = true;
              break;
            case "comment": {
              if (reqSpace && !hasSpace)
                onError(token, "MISSING_CHAR", "Comments must be separated from other tokens by white space characters");
              const cb = source.substring(1) || " ";
              if (!comment)
                comment = cb;
              else
                comment += sep + cb;
              sep = "";
              break;
            }
            case "newline":
              if (comment)
                sep += source;
              hasSpace = true;
              break;
            default:
              onError(token, "UNEXPECTED_TOKEN", `Unexpected ${type} at node end`);
          }
          offset += source.length;
        }
      }
      return { comment, offset };
    }
    exports.resolveEnd = resolveEnd;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-collection.js
var require_resolve_flow_collection = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Pair = require_Pair();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    var utilContainsNewline = require_util_contains_newline();
    var utilMapIncludes = require_util_map_includes();
    var blockMsg = "Block collections are not allowed within flow collections";
    var isBlock = (token) => token && (token.type === "block-map" || token.type === "block-seq");
    function resolveFlowCollection({ composeNode, composeEmptyNode }, ctx, fc, onError, tag) {
      const isMap = fc.start.source === "{";
      const fcName = isMap ? "flow map" : "flow sequence";
      const NodeClass = tag?.nodeClass ?? (isMap ? YAMLMap.YAMLMap : YAMLSeq.YAMLSeq);
      const coll = new NodeClass(ctx.schema);
      coll.flow = true;
      const atRoot = ctx.atRoot;
      if (atRoot)
        ctx.atRoot = false;
      if (ctx.atKey)
        ctx.atKey = false;
      let offset = fc.offset + fc.start.source.length;
      for (let i2 = 0; i2 < fc.items.length; ++i2) {
        const collItem = fc.items[i2];
        const { start: start2, key, sep, value } = collItem;
        const props = resolveProps.resolveProps(start2, {
          flow: fcName,
          indicator: "explicit-key-ind",
          next: key ?? sep?.[0],
          offset,
          onError,
          parentIndent: fc.indent,
          startOnNewline: false
        });
        if (!props.found) {
          if (!props.anchor && !props.tag && !sep && !value) {
            if (i2 === 0 && props.comma)
              onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
            else if (i2 < fc.items.length - 1)
              onError(props.start, "UNEXPECTED_TOKEN", `Unexpected empty item in ${fcName}`);
            if (props.comment) {
              if (coll.comment)
                coll.comment += "\n" + props.comment;
              else
                coll.comment = props.comment;
            }
            offset = props.end;
            continue;
          }
          if (!isMap && ctx.options.strict && utilContainsNewline.containsNewline(key))
            onError(
              key,
              // checked by containsNewline()
              "MULTILINE_IMPLICIT_KEY",
              "Implicit keys of flow sequence pairs need to be on a single line"
            );
        }
        if (i2 === 0) {
          if (props.comma)
            onError(props.comma, "UNEXPECTED_TOKEN", `Unexpected , in ${fcName}`);
        } else {
          if (!props.comma)
            onError(props.start, "MISSING_CHAR", `Missing , between ${fcName} items`);
          if (props.comment) {
            let prevItemComment = "";
            loop: for (const st of start2) {
              switch (st.type) {
                case "comma":
                case "space":
                  break;
                case "comment":
                  prevItemComment = st.source.substring(1);
                  break loop;
                default:
                  break loop;
              }
            }
            if (prevItemComment) {
              let prev = coll.items[coll.items.length - 1];
              if (identity.isPair(prev))
                prev = prev.value ?? prev.key;
              if (prev.comment)
                prev.comment += "\n" + prevItemComment;
              else
                prev.comment = prevItemComment;
              props.comment = props.comment.substring(prevItemComment.length + 1);
            }
          }
        }
        if (!isMap && !sep && !props.found) {
          const valueNode = value ? composeNode(ctx, value, props, onError) : composeEmptyNode(ctx, props.end, sep, null, props, onError);
          coll.items.push(valueNode);
          offset = valueNode.range[2];
          if (isBlock(value))
            onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
        } else {
          ctx.atKey = true;
          const keyStart = props.end;
          const keyNode = key ? composeNode(ctx, key, props, onError) : composeEmptyNode(ctx, keyStart, start2, null, props, onError);
          if (isBlock(key))
            onError(keyNode.range, "BLOCK_IN_FLOW", blockMsg);
          ctx.atKey = false;
          const valueProps = resolveProps.resolveProps(sep ?? [], {
            flow: fcName,
            indicator: "map-value-ind",
            next: value,
            offset: keyNode.range[2],
            onError,
            parentIndent: fc.indent,
            startOnNewline: false
          });
          if (valueProps.found) {
            if (!isMap && !props.found && ctx.options.strict) {
              if (sep)
                for (const st of sep) {
                  if (st === valueProps.found)
                    break;
                  if (st.type === "newline") {
                    onError(st, "MULTILINE_IMPLICIT_KEY", "Implicit keys of flow sequence pairs need to be on a single line");
                    break;
                  }
                }
              if (props.start < valueProps.found.offset - 1024)
                onError(valueProps.found, "KEY_OVER_1024_CHARS", "The : indicator must be at most 1024 chars after the start of an implicit flow sequence key");
            }
          } else if (value) {
            if ("source" in value && value.source?.[0] === ":")
              onError(value, "MISSING_CHAR", `Missing space after : in ${fcName}`);
            else
              onError(valueProps.start, "MISSING_CHAR", `Missing , or : between ${fcName} items`);
          }
          const valueNode = value ? composeNode(ctx, value, valueProps, onError) : valueProps.found ? composeEmptyNode(ctx, valueProps.end, sep, null, valueProps, onError) : null;
          if (valueNode) {
            if (isBlock(value))
              onError(valueNode.range, "BLOCK_IN_FLOW", blockMsg);
          } else if (valueProps.comment) {
            if (keyNode.comment)
              keyNode.comment += "\n" + valueProps.comment;
            else
              keyNode.comment = valueProps.comment;
          }
          const pair = new Pair.Pair(keyNode, valueNode);
          if (ctx.options.keepSourceTokens)
            pair.srcToken = collItem;
          if (isMap) {
            const map = coll;
            if (utilMapIncludes.mapIncludes(ctx, map.items, keyNode))
              onError(keyStart, "DUPLICATE_KEY", "Map keys must be unique");
            map.items.push(pair);
          } else {
            const map = new YAMLMap.YAMLMap(ctx.schema);
            map.flow = true;
            map.items.push(pair);
            const endRange = (valueNode ?? keyNode).range;
            map.range = [keyNode.range[0], endRange[1], endRange[2]];
            coll.items.push(map);
          }
          offset = valueNode ? valueNode.range[2] : valueProps.end;
        }
      }
      const expectedEnd = isMap ? "}" : "]";
      const [ce, ...ee] = fc.end;
      let cePos = offset;
      if (ce?.source === expectedEnd)
        cePos = ce.offset + ce.source.length;
      else {
        const name2 = fcName[0].toUpperCase() + fcName.substring(1);
        const msg = atRoot ? `${name2} must end with a ${expectedEnd}` : `${name2} in block collection must be sufficiently indented and end with a ${expectedEnd}`;
        onError(offset, atRoot ? "MISSING_CHAR" : "BAD_INDENT", msg);
        if (ce && ce.source.length !== 1)
          ee.unshift(ce);
      }
      if (ee.length > 0) {
        const end = resolveEnd.resolveEnd(ee, cePos, ctx.options.strict, onError);
        if (end.comment) {
          if (coll.comment)
            coll.comment += "\n" + end.comment;
          else
            coll.comment = end.comment;
        }
        coll.range = [fc.offset, cePos, end.offset];
      } else {
        coll.range = [fc.offset, cePos, cePos];
      }
      return coll;
    }
    exports.resolveFlowCollection = resolveFlowCollection;
  }
});

// node_modules/yaml/dist/compose/compose-collection.js
var require_compose_collection = __commonJS({
  "node_modules/yaml/dist/compose/compose-collection.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var resolveBlockMap = require_resolve_block_map();
    var resolveBlockSeq = require_resolve_block_seq();
    var resolveFlowCollection = require_resolve_flow_collection();
    function resolveCollection(CN, ctx, token, onError, tagName, tag) {
      const coll = token.type === "block-map" ? resolveBlockMap.resolveBlockMap(CN, ctx, token, onError, tag) : token.type === "block-seq" ? resolveBlockSeq.resolveBlockSeq(CN, ctx, token, onError, tag) : resolveFlowCollection.resolveFlowCollection(CN, ctx, token, onError, tag);
      const Coll = coll.constructor;
      if (tagName === "!" || tagName === Coll.tagName) {
        coll.tag = Coll.tagName;
        return coll;
      }
      if (tagName)
        coll.tag = tagName;
      return coll;
    }
    function composeCollection(CN, ctx, token, props, onError) {
      const tagToken = props.tag;
      const tagName = !tagToken ? null : ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg));
      if (token.type === "block-seq") {
        const { anchor, newlineAfterProp: nl } = props;
        const lastProp = anchor && tagToken ? anchor.offset > tagToken.offset ? anchor : tagToken : anchor ?? tagToken;
        if (lastProp && (!nl || nl.offset < lastProp.offset)) {
          const message = "Missing newline after block sequence props";
          onError(lastProp, "MISSING_CHAR", message);
        }
      }
      const expType = token.type === "block-map" ? "map" : token.type === "block-seq" ? "seq" : token.start.source === "{" ? "map" : "seq";
      if (!tagToken || !tagName || tagName === "!" || tagName === YAMLMap.YAMLMap.tagName && expType === "map" || tagName === YAMLSeq.YAMLSeq.tagName && expType === "seq") {
        return resolveCollection(CN, ctx, token, onError, tagName);
      }
      let tag = ctx.schema.tags.find((t) => t.tag === tagName && t.collection === expType);
      if (!tag) {
        const kt = ctx.schema.knownTags[tagName];
        if (kt?.collection === expType) {
          ctx.schema.tags.push(Object.assign({}, kt, { default: false }));
          tag = kt;
        } else {
          if (kt) {
            onError(tagToken, "BAD_COLLECTION_TYPE", `${kt.tag} used for ${expType} collection, but expects ${kt.collection ?? "scalar"}`, true);
          } else {
            onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, true);
          }
          return resolveCollection(CN, ctx, token, onError, tagName);
        }
      }
      const coll = resolveCollection(CN, ctx, token, onError, tagName, tag);
      const res = tag.resolve?.(coll, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg), ctx.options) ?? coll;
      const node = identity.isNode(res) ? res : new Scalar.Scalar(res);
      node.range = coll.range;
      node.tag = tagName;
      if (tag?.format)
        node.format = tag.format;
      return node;
    }
    exports.composeCollection = composeCollection;
  }
});

// node_modules/yaml/dist/compose/resolve-block-scalar.js
var require_resolve_block_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-block-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    function resolveBlockScalar(ctx, scalar, onError) {
      const start2 = scalar.offset;
      const header = parseBlockScalarHeader(scalar, ctx.options.strict, onError);
      if (!header)
        return { value: "", type: null, comment: "", range: [start2, start2, start2] };
      const type = header.mode === ">" ? Scalar.Scalar.BLOCK_FOLDED : Scalar.Scalar.BLOCK_LITERAL;
      const lines = scalar.source ? splitLines(scalar.source) : [];
      let chompStart = lines.length;
      for (let i2 = lines.length - 1; i2 >= 0; --i2) {
        const content = lines[i2][1];
        if (content === "" || content === "\r")
          chompStart = i2;
        else
          break;
      }
      if (chompStart === 0) {
        const value2 = header.chomp === "+" && lines.length > 0 ? "\n".repeat(Math.max(1, lines.length - 1)) : "";
        let end2 = start2 + header.length;
        if (scalar.source)
          end2 += scalar.source.length;
        return { value: value2, type, comment: header.comment, range: [start2, end2, end2] };
      }
      let trimIndent = scalar.indent + header.indent;
      let offset = scalar.offset + header.length;
      let contentStart = 0;
      for (let i2 = 0; i2 < chompStart; ++i2) {
        const [indent, content] = lines[i2];
        if (content === "" || content === "\r") {
          if (header.indent === 0 && indent.length > trimIndent)
            trimIndent = indent.length;
        } else {
          if (indent.length < trimIndent) {
            const message = "Block scalars with more-indented leading empty lines must use an explicit indentation indicator";
            onError(offset + indent.length, "MISSING_CHAR", message);
          }
          if (header.indent === 0)
            trimIndent = indent.length;
          contentStart = i2;
          if (trimIndent === 0 && !ctx.atRoot) {
            const message = "Block scalar values in collections must be indented";
            onError(offset, "BAD_INDENT", message);
          }
          break;
        }
        offset += indent.length + content.length + 1;
      }
      for (let i2 = lines.length - 1; i2 >= chompStart; --i2) {
        if (lines[i2][0].length > trimIndent)
          chompStart = i2 + 1;
      }
      let value = "";
      let sep = "";
      let prevMoreIndented = false;
      for (let i2 = 0; i2 < contentStart; ++i2)
        value += lines[i2][0].slice(trimIndent) + "\n";
      for (let i2 = contentStart; i2 < chompStart; ++i2) {
        let [indent, content] = lines[i2];
        offset += indent.length + content.length + 1;
        const crlf = content[content.length - 1] === "\r";
        if (crlf)
          content = content.slice(0, -1);
        if (content && indent.length < trimIndent) {
          const src = header.indent ? "explicit indentation indicator" : "first line";
          const message = `Block scalar lines must not be less indented than their ${src}`;
          onError(offset - content.length - (crlf ? 2 : 1), "BAD_INDENT", message);
          indent = "";
        }
        if (type === Scalar.Scalar.BLOCK_LITERAL) {
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
        } else if (indent.length > trimIndent || content[0] === "	") {
          if (sep === " ")
            sep = "\n";
          else if (!prevMoreIndented && sep === "\n")
            sep = "\n\n";
          value += sep + indent.slice(trimIndent) + content;
          sep = "\n";
          prevMoreIndented = true;
        } else if (content === "") {
          if (sep === "\n")
            value += "\n";
          else
            sep = "\n";
        } else {
          value += sep + content;
          sep = " ";
          prevMoreIndented = false;
        }
      }
      switch (header.chomp) {
        case "-":
          break;
        case "+":
          for (let i2 = chompStart; i2 < lines.length; ++i2)
            value += "\n" + lines[i2][0].slice(trimIndent);
          if (value[value.length - 1] !== "\n")
            value += "\n";
          break;
        default:
          value += "\n";
      }
      const end = start2 + header.length + scalar.source.length;
      return { value, type, comment: header.comment, range: [start2, end, end] };
    }
    function parseBlockScalarHeader({ offset, props }, strict, onError) {
      if (props[0].type !== "block-scalar-header") {
        onError(props[0], "IMPOSSIBLE", "Block scalar header not found");
        return null;
      }
      const { source } = props[0];
      const mode = source[0];
      let indent = 0;
      let chomp = "";
      let error = -1;
      for (let i2 = 1; i2 < source.length; ++i2) {
        const ch = source[i2];
        if (!chomp && (ch === "-" || ch === "+"))
          chomp = ch;
        else {
          const n = Number(ch);
          if (!indent && n)
            indent = n;
          else if (error === -1)
            error = offset + i2;
        }
      }
      if (error !== -1)
        onError(error, "UNEXPECTED_TOKEN", `Block scalar header includes extra characters: ${source}`);
      let hasSpace = false;
      let comment = "";
      let length = source.length;
      for (let i2 = 1; i2 < props.length; ++i2) {
        const token = props[i2];
        switch (token.type) {
          case "space":
            hasSpace = true;
          // fallthrough
          case "newline":
            length += token.source.length;
            break;
          case "comment":
            if (strict && !hasSpace) {
              const message = "Comments must be separated from other tokens by white space characters";
              onError(token, "MISSING_CHAR", message);
            }
            length += token.source.length;
            comment = token.source.substring(1);
            break;
          case "error":
            onError(token, "UNEXPECTED_TOKEN", token.message);
            length += token.source.length;
            break;
          /* istanbul ignore next should not happen */
          default: {
            const message = `Unexpected token in block scalar header: ${token.type}`;
            onError(token, "UNEXPECTED_TOKEN", message);
            const ts = token.source;
            if (ts && typeof ts === "string")
              length += ts.length;
          }
        }
      }
      return { mode, indent, chomp, comment, length };
    }
    function splitLines(source) {
      const split = source.split(/\n( *)/);
      const first = split[0];
      const m = first.match(/^( *)/);
      const line0 = m?.[1] ? [m[1], first.slice(m[1].length)] : ["", first];
      const lines = [line0];
      for (let i2 = 1; i2 < split.length; i2 += 2)
        lines.push([split[i2], split[i2 + 1]]);
      return lines;
    }
    exports.resolveBlockScalar = resolveBlockScalar;
  }
});

// node_modules/yaml/dist/compose/resolve-flow-scalar.js
var require_resolve_flow_scalar = __commonJS({
  "node_modules/yaml/dist/compose/resolve-flow-scalar.js"(exports) {
    "use strict";
    var Scalar = require_Scalar();
    var resolveEnd = require_resolve_end();
    function resolveFlowScalar(scalar, strict, onError) {
      const { offset, type, source, end } = scalar;
      let _type;
      let value;
      const _onError = (rel, code, msg) => onError(offset + rel, code, msg);
      switch (type) {
        case "scalar":
          _type = Scalar.Scalar.PLAIN;
          value = plainValue(source, _onError);
          break;
        case "single-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_SINGLE;
          value = singleQuotedValue(source, _onError);
          break;
        case "double-quoted-scalar":
          _type = Scalar.Scalar.QUOTE_DOUBLE;
          value = doubleQuotedValue(source, _onError);
          break;
        /* istanbul ignore next should not happen */
        default:
          onError(scalar, "UNEXPECTED_TOKEN", `Expected a flow scalar value, but found: ${type}`);
          return {
            value: "",
            type: null,
            comment: "",
            range: [offset, offset + source.length, offset + source.length]
          };
      }
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, strict, onError);
      return {
        value,
        type: _type,
        comment: re.comment,
        range: [offset, valueEnd, re.offset]
      };
    }
    function plainValue(source, onError) {
      let badChar = "";
      switch (source[0]) {
        /* istanbul ignore next should not happen */
        case "	":
          badChar = "a tab character";
          break;
        case ",":
          badChar = "flow indicator character ,";
          break;
        case "%":
          badChar = "directive indicator character %";
          break;
        case "|":
        case ">": {
          badChar = `block scalar indicator ${source[0]}`;
          break;
        }
        case "@":
        case "`": {
          badChar = `reserved character ${source[0]}`;
          break;
        }
      }
      if (badChar)
        onError(0, "BAD_SCALAR_START", `Plain value cannot start with ${badChar}`);
      return unfoldLines(source);
    }
    function singleQuotedValue(source, onError) {
      if (source[source.length - 1] !== "'" || source.length === 1)
        onError(source.length, "MISSING_CHAR", "Missing closing 'quote");
      return unfoldLines(source.slice(1, -1)).replace(/''/g, "'");
    }
    function unfoldLines(source) {
      const line = /(.*?)\r?\n/sy;
      let match = line.exec(source);
      if (!match)
        return source;
      let trimEnd, trimBoth;
      try {
        trimEnd = new RegExp("(?<![ 	])[ 	]+$");
        trimBoth = new RegExp("^[ 	]+|(?<![ 	])[ 	]+$", "g");
      } catch {
        trimEnd = /[ \t]+$/;
        trimBoth = /^[ \t]+|[ \t]+$/g;
      }
      let res = match[1].replace(trimEnd, "");
      let sep = " ";
      let pos = line.lastIndex;
      while (match = line.exec(source)) {
        const lm = match[1].replace(trimBoth, "");
        if (lm === "") {
          if (sep === "\n")
            res += sep;
          else
            sep = "\n";
        } else {
          res += sep + lm;
          sep = " ";
        }
        pos = line.lastIndex;
      }
      const last = /[ \t]*(.*)/sy;
      last.lastIndex = pos;
      match = last.exec(source);
      return res + sep + (match?.[1] ?? "");
    }
    function doubleQuotedValue(source, onError) {
      let res = "";
      for (let i2 = 1; i2 < source.length - 1; ++i2) {
        const ch = source[i2];
        if (ch === "\r" && source[i2 + 1] === "\n")
          continue;
        if (ch === "\n") {
          const { fold, offset } = foldNewline(source, i2);
          res += fold;
          i2 = offset;
        } else if (ch === "\\") {
          let next = source[++i2];
          const cc = escapeCodes[next];
          if (cc)
            res += cc;
          else if (next === "\n") {
            next = source[i2 + 1];
            while (next === " " || next === "	")
              next = source[++i2 + 1];
          } else if (next === "\r" && source[i2 + 1] === "\n") {
            next = source[++i2 + 1];
            while (next === " " || next === "	")
              next = source[++i2 + 1];
          } else if (next === "x" || next === "u" || next === "U") {
            const length = next === "x" ? 2 : next === "u" ? 4 : 8;
            res += parseCharCode(source, i2 + 1, length, onError);
            i2 += length;
          } else {
            const raw = source.substr(i2 - 1, 2);
            onError(i2 - 1, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
            res += raw;
          }
        } else if (ch === " " || ch === "	") {
          const wsStart = i2;
          let next = source[i2 + 1];
          while (next === " " || next === "	")
            next = source[++i2 + 1];
          if (next !== "\n" && !(next === "\r" && source[i2 + 2] === "\n"))
            res += i2 > wsStart ? source.slice(wsStart, i2 + 1) : ch;
        } else {
          res += ch;
        }
      }
      if (source[source.length - 1] !== '"' || source.length === 1)
        onError(source.length, "MISSING_CHAR", 'Missing closing "quote');
      return res;
    }
    function foldNewline(source, offset) {
      let fold = "";
      let ch = source[offset + 1];
      while (ch === " " || ch === "	" || ch === "\n" || ch === "\r") {
        if (ch === "\r" && source[offset + 2] !== "\n")
          break;
        if (ch === "\n")
          fold += "\n";
        offset += 1;
        ch = source[offset + 1];
      }
      if (!fold)
        fold = " ";
      return { fold, offset };
    }
    var escapeCodes = {
      "0": "\0",
      // null character
      a: "\x07",
      // bell character
      b: "\b",
      // backspace
      e: "\x1B",
      // escape character
      f: "\f",
      // form feed
      n: "\n",
      // line feed
      r: "\r",
      // carriage return
      t: "	",
      // horizontal tab
      v: "\v",
      // vertical tab
      N: "\x85",
      // Unicode next line
      _: "\xA0",
      // Unicode non-breaking space
      L: "\u2028",
      // Unicode line separator
      P: "\u2029",
      // Unicode paragraph separator
      " ": " ",
      '"': '"',
      "/": "/",
      "\\": "\\",
      "	": "	"
    };
    function parseCharCode(source, offset, length, onError) {
      const cc = source.substr(offset, length);
      const ok = cc.length === length && /^[0-9a-fA-F]+$/.test(cc);
      const code = ok ? parseInt(cc, 16) : NaN;
      try {
        return String.fromCodePoint(code);
      } catch {
        const raw = source.substr(offset - 2, length + 2);
        onError(offset - 2, "BAD_DQ_ESCAPE", `Invalid escape sequence ${raw}`);
        return raw;
      }
    }
    exports.resolveFlowScalar = resolveFlowScalar;
  }
});

// node_modules/yaml/dist/compose/compose-scalar.js
var require_compose_scalar = __commonJS({
  "node_modules/yaml/dist/compose/compose-scalar.js"(exports) {
    "use strict";
    var identity = require_identity();
    var Scalar = require_Scalar();
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    function composeScalar(ctx, token, tagToken, onError) {
      const { value, type, comment, range } = token.type === "block-scalar" ? resolveBlockScalar.resolveBlockScalar(ctx, token, onError) : resolveFlowScalar.resolveFlowScalar(token, ctx.options.strict, onError);
      const tagName = tagToken ? ctx.directives.tagName(tagToken.source, (msg) => onError(tagToken, "TAG_RESOLVE_FAILED", msg)) : null;
      let tag;
      if (ctx.options.stringKeys && ctx.atKey) {
        tag = ctx.schema[identity.SCALAR];
      } else if (tagName)
        tag = findScalarTagByName(ctx.schema, value, tagName, tagToken, onError);
      else if (token.type === "scalar")
        tag = findScalarTagByTest(ctx, value, token, onError);
      else
        tag = ctx.schema[identity.SCALAR];
      let scalar;
      try {
        const res = tag.resolve(value, (msg) => onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg), ctx.options);
        scalar = identity.isScalar(res) ? res : new Scalar.Scalar(res);
      } catch (error) {
        const msg = error instanceof Error ? error.message : String(error);
        onError(tagToken ?? token, "TAG_RESOLVE_FAILED", msg);
        scalar = new Scalar.Scalar(value);
      }
      scalar.range = range;
      scalar.source = value;
      if (type)
        scalar.type = type;
      if (tagName)
        scalar.tag = tagName;
      if (tag.format)
        scalar.format = tag.format;
      if (comment)
        scalar.comment = comment;
      return scalar;
    }
    function findScalarTagByName(schema, value, tagName, tagToken, onError) {
      if (tagName === "!")
        return schema[identity.SCALAR];
      const matchWithTest = [];
      for (const tag of schema.tags) {
        if (!tag.collection && tag.tag === tagName) {
          if (tag.default && tag.test)
            matchWithTest.push(tag);
          else
            return tag;
        }
      }
      for (const tag of matchWithTest)
        if (tag.test?.test(value))
          return tag;
      const kt = schema.knownTags[tagName];
      if (kt && !kt.collection) {
        schema.tags.push(Object.assign({}, kt, { default: false, test: void 0 }));
        return kt;
      }
      onError(tagToken, "TAG_RESOLVE_FAILED", `Unresolved tag: ${tagName}`, tagName !== "tag:yaml.org,2002:str");
      return schema[identity.SCALAR];
    }
    function findScalarTagByTest({ atKey, directives, schema }, value, token, onError) {
      const tag = schema.tags.find((tag2) => (tag2.default === true || atKey && tag2.default === "key") && tag2.test?.test(value)) || schema[identity.SCALAR];
      if (schema.compat) {
        const compat = schema.compat.find((tag2) => tag2.default && tag2.test?.test(value)) ?? schema[identity.SCALAR];
        if (tag.tag !== compat.tag) {
          const ts = directives.tagString(tag.tag);
          const cs = directives.tagString(compat.tag);
          const msg = `Value may be parsed as either ${ts} or ${cs}`;
          onError(token, "TAG_RESOLVE_FAILED", msg, true);
        }
      }
      return tag;
    }
    exports.composeScalar = composeScalar;
  }
});

// node_modules/yaml/dist/compose/util-empty-scalar-position.js
var require_util_empty_scalar_position = __commonJS({
  "node_modules/yaml/dist/compose/util-empty-scalar-position.js"(exports) {
    "use strict";
    function emptyScalarPosition(offset, before, pos) {
      if (before) {
        pos ?? (pos = before.length);
        for (let i2 = pos - 1; i2 >= 0; --i2) {
          let st = before[i2];
          switch (st.type) {
            case "space":
            case "comment":
            case "newline":
              offset -= st.source.length;
              continue;
          }
          st = before[++i2];
          while (st?.type === "space") {
            offset += st.source.length;
            st = before[++i2];
          }
          break;
        }
      }
      return offset;
    }
    exports.emptyScalarPosition = emptyScalarPosition;
  }
});

// node_modules/yaml/dist/compose/compose-node.js
var require_compose_node = __commonJS({
  "node_modules/yaml/dist/compose/compose-node.js"(exports) {
    "use strict";
    var Alias = require_Alias();
    var identity = require_identity();
    var composeCollection = require_compose_collection();
    var composeScalar = require_compose_scalar();
    var resolveEnd = require_resolve_end();
    var utilEmptyScalarPosition = require_util_empty_scalar_position();
    var CN = { composeNode, composeEmptyNode };
    function composeNode(ctx, token, props, onError) {
      const atKey = ctx.atKey;
      const { spaceBefore, comment, anchor, tag } = props;
      let node;
      let isSrcToken = true;
      switch (token.type) {
        case "alias":
          node = composeAlias(ctx, token, onError);
          if (anchor || tag)
            onError(token, "ALIAS_PROPS", "An alias node must not specify any properties");
          break;
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "block-scalar":
          node = composeScalar.composeScalar(ctx, token, tag, onError);
          if (anchor)
            node.anchor = anchor.source.substring(1);
          break;
        case "block-map":
        case "block-seq":
        case "flow-collection":
          try {
            node = composeCollection.composeCollection(CN, ctx, token, props, onError);
            if (anchor)
              node.anchor = anchor.source.substring(1);
          } catch (error) {
            const message = error instanceof Error ? error.message : String(error);
            onError(token, "RESOURCE_EXHAUSTION", message);
          }
          break;
        default: {
          const message = token.type === "error" ? token.message : `Unsupported token (type: ${token.type})`;
          onError(token, "UNEXPECTED_TOKEN", message);
          isSrcToken = false;
        }
      }
      node ?? (node = composeEmptyNode(ctx, token.offset, void 0, null, props, onError));
      if (anchor && node.anchor === "")
        onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      if (atKey && ctx.options.stringKeys && (!identity.isScalar(node) || typeof node.value !== "string" || node.tag && node.tag !== "tag:yaml.org,2002:str")) {
        const msg = "With stringKeys, all keys must be strings";
        onError(tag ?? token, "NON_STRING_KEY", msg);
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        if (token.type === "scalar" && token.source === "")
          node.comment = comment;
        else
          node.commentBefore = comment;
      }
      if (ctx.options.keepSourceTokens && isSrcToken)
        node.srcToken = token;
      return node;
    }
    function composeEmptyNode(ctx, offset, before, pos, { spaceBefore, comment, anchor, tag, end }, onError) {
      const token = {
        type: "scalar",
        offset: utilEmptyScalarPosition.emptyScalarPosition(offset, before, pos),
        indent: -1,
        source: ""
      };
      const node = composeScalar.composeScalar(ctx, token, tag, onError);
      if (anchor) {
        node.anchor = anchor.source.substring(1);
        if (node.anchor === "")
          onError(anchor, "BAD_ALIAS", "Anchor cannot be an empty string");
      }
      if (spaceBefore)
        node.spaceBefore = true;
      if (comment) {
        node.comment = comment;
        node.range[2] = end;
      }
      return node;
    }
    function composeAlias({ options }, { offset, source, end }, onError) {
      const alias = new Alias.Alias(source.substring(1));
      if (alias.source === "")
        onError(offset, "BAD_ALIAS", "Alias cannot be an empty string");
      if (alias.source.endsWith(":"))
        onError(offset + source.length - 1, "BAD_ALIAS", "Alias ending in : is ambiguous", true);
      const valueEnd = offset + source.length;
      const re = resolveEnd.resolveEnd(end, valueEnd, options.strict, onError);
      alias.range = [offset, valueEnd, re.offset];
      if (re.comment)
        alias.comment = re.comment;
      return alias;
    }
    exports.composeEmptyNode = composeEmptyNode;
    exports.composeNode = composeNode;
  }
});

// node_modules/yaml/dist/compose/compose-doc.js
var require_compose_doc = __commonJS({
  "node_modules/yaml/dist/compose/compose-doc.js"(exports) {
    "use strict";
    var Document = require_Document();
    var composeNode = require_compose_node();
    var resolveEnd = require_resolve_end();
    var resolveProps = require_resolve_props();
    function composeDoc(options, directives, { offset, start: start2, value, end }, onError) {
      const opts = Object.assign({ _directives: directives }, options);
      const doc = new Document.Document(void 0, opts);
      const ctx = {
        atKey: false,
        atRoot: true,
        directives: doc.directives,
        options: doc.options,
        schema: doc.schema
      };
      const props = resolveProps.resolveProps(start2, {
        indicator: "doc-start",
        next: value ?? end?.[0],
        offset,
        onError,
        parentIndent: 0,
        startOnNewline: true
      });
      if (props.found) {
        doc.directives.docStart = true;
        if (value && (value.type === "block-map" || value.type === "block-seq") && !props.hasNewline)
          onError(props.end, "MISSING_CHAR", "Block collection cannot start on same line with directives-end marker");
      }
      doc.contents = value ? composeNode.composeNode(ctx, value, props, onError) : composeNode.composeEmptyNode(ctx, props.end, start2, null, props, onError);
      const contentEnd = doc.contents.range[2];
      const re = resolveEnd.resolveEnd(end, contentEnd, false, onError);
      if (re.comment)
        doc.comment = re.comment;
      doc.range = [offset, contentEnd, re.offset];
      return doc;
    }
    exports.composeDoc = composeDoc;
  }
});

// node_modules/yaml/dist/compose/composer.js
var require_composer = __commonJS({
  "node_modules/yaml/dist/compose/composer.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var directives = require_directives();
    var Document = require_Document();
    var errors = require_errors();
    var identity = require_identity();
    var composeDoc = require_compose_doc();
    var resolveEnd = require_resolve_end();
    function getErrorPos(src) {
      if (typeof src === "number")
        return [src, src + 1];
      if (Array.isArray(src))
        return src.length === 2 ? src : [src[0], src[1]];
      const { offset, source } = src;
      return [offset, offset + (typeof source === "string" ? source.length : 1)];
    }
    function parsePrelude(prelude) {
      let comment = "";
      let atComment = false;
      let afterEmptyLine = false;
      for (let i2 = 0; i2 < prelude.length; ++i2) {
        const source = prelude[i2];
        switch (source[0]) {
          case "#":
            comment += (comment === "" ? "" : afterEmptyLine ? "\n\n" : "\n") + (source.substring(1) || " ");
            atComment = true;
            afterEmptyLine = false;
            break;
          case "%":
            if (prelude[i2 + 1]?.[0] !== "#")
              i2 += 1;
            atComment = false;
            break;
          default:
            if (!atComment)
              afterEmptyLine = true;
            atComment = false;
        }
      }
      return { comment, afterEmptyLine };
    }
    var Composer = class {
      constructor(options = {}) {
        this.doc = null;
        this.atDirectives = false;
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
        this.onError = (source, code, message, warning) => {
          const pos = getErrorPos(source);
          if (warning)
            this.warnings.push(new errors.YAMLWarning(pos, code, message));
          else
            this.errors.push(new errors.YAMLParseError(pos, code, message));
        };
        this.directives = new directives.Directives({ version: options.version || "1.2" });
        this.options = options;
      }
      decorate(doc, afterDoc) {
        const { comment, afterEmptyLine } = parsePrelude(this.prelude);
        if (comment) {
          const dc = doc.contents;
          if (afterDoc) {
            doc.comment = doc.comment ? `${doc.comment}
${comment}` : comment;
          } else if (afterEmptyLine || doc.directives.docStart || !dc) {
            doc.commentBefore = comment;
          } else if (identity.isCollection(dc) && !dc.flow && dc.items.length > 0) {
            let it = dc.items[0];
            if (identity.isPair(it))
              it = it.key;
            const cb = it.commentBefore;
            it.commentBefore = cb ? `${comment}
${cb}` : comment;
          } else {
            const cb = dc.commentBefore;
            dc.commentBefore = cb ? `${comment}
${cb}` : comment;
          }
        }
        if (afterDoc) {
          for (let i2 = 0; i2 < this.errors.length; ++i2)
            doc.errors.push(this.errors[i2]);
          for (let i2 = 0; i2 < this.warnings.length; ++i2)
            doc.warnings.push(this.warnings[i2]);
        } else {
          doc.errors = this.errors;
          doc.warnings = this.warnings;
        }
        this.prelude = [];
        this.errors = [];
        this.warnings = [];
      }
      /**
       * Current stream status information.
       *
       * Mostly useful at the end of input for an empty stream.
       */
      streamInfo() {
        return {
          comment: parsePrelude(this.prelude).comment,
          directives: this.directives,
          errors: this.errors,
          warnings: this.warnings
        };
      }
      /**
       * Compose tokens into documents.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *compose(tokens, forceDoc = false, endOffset = -1) {
        for (const token of tokens)
          yield* this.next(token);
        yield* this.end(forceDoc, endOffset);
      }
      /** Advance the composer by one CST token. */
      *next(token) {
        if (node_process.env.LOG_STREAM)
          console.dir(token, { depth: null });
        switch (token.type) {
          case "directive":
            this.directives.add(token.source, (offset, message, warning) => {
              const pos = getErrorPos(token);
              pos[0] += offset;
              this.onError(pos, "BAD_DIRECTIVE", message, warning);
            });
            this.prelude.push(token.source);
            this.atDirectives = true;
            break;
          case "document": {
            const doc = composeDoc.composeDoc(this.options, this.directives, token, this.onError);
            if (this.atDirectives && !doc.directives.docStart)
              this.onError(token, "MISSING_CHAR", "Missing directives-end/doc-start indicator line");
            this.decorate(doc, false);
            if (this.doc)
              yield this.doc;
            this.doc = doc;
            this.atDirectives = false;
            break;
          }
          case "byte-order-mark":
          case "space":
            break;
          case "comment":
          case "newline":
            this.prelude.push(token.source);
            break;
          case "error": {
            const msg = token.source ? `${token.message}: ${JSON.stringify(token.source)}` : token.message;
            const error = new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg);
            if (this.atDirectives || !this.doc)
              this.errors.push(error);
            else
              this.doc.errors.push(error);
            break;
          }
          case "doc-end": {
            if (!this.doc) {
              const msg = "Unexpected doc-end without preceding document";
              this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", msg));
              break;
            }
            this.doc.directives.docEnd = true;
            const end = resolveEnd.resolveEnd(token.end, token.offset + token.source.length, this.doc.options.strict, this.onError);
            this.decorate(this.doc, true);
            if (end.comment) {
              const dc = this.doc.comment;
              this.doc.comment = dc ? `${dc}
${end.comment}` : end.comment;
            }
            this.doc.range[2] = end.offset;
            break;
          }
          default:
            this.errors.push(new errors.YAMLParseError(getErrorPos(token), "UNEXPECTED_TOKEN", `Unsupported token ${token.type}`));
        }
      }
      /**
       * Call at end of input to yield any remaining document.
       *
       * @param forceDoc - If the stream contains no document, still emit a final document including any comments and directives that would be applied to a subsequent document.
       * @param endOffset - Should be set if `forceDoc` is also set, to set the document range end and to indicate errors correctly.
       */
      *end(forceDoc = false, endOffset = -1) {
        if (this.doc) {
          this.decorate(this.doc, true);
          yield this.doc;
          this.doc = null;
        } else if (forceDoc) {
          const opts = Object.assign({ _directives: this.directives }, this.options);
          const doc = new Document.Document(void 0, opts);
          if (this.atDirectives)
            this.onError(endOffset, "MISSING_CHAR", "Missing directives-end indicator line");
          doc.range = [0, endOffset, endOffset];
          this.decorate(doc, false);
          yield doc;
        }
      }
    };
    exports.Composer = Composer;
  }
});

// node_modules/yaml/dist/parse/cst-scalar.js
var require_cst_scalar = __commonJS({
  "node_modules/yaml/dist/parse/cst-scalar.js"(exports) {
    "use strict";
    var resolveBlockScalar = require_resolve_block_scalar();
    var resolveFlowScalar = require_resolve_flow_scalar();
    var errors = require_errors();
    var stringifyString = require_stringifyString();
    function resolveAsScalar(token, strict = true, onError) {
      if (token) {
        const _onError = (pos, code, message) => {
          const offset = typeof pos === "number" ? pos : Array.isArray(pos) ? pos[0] : pos.offset;
          if (onError)
            onError(offset, code, message);
          else
            throw new errors.YAMLParseError([offset, offset + 1], code, message);
        };
        switch (token.type) {
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return resolveFlowScalar.resolveFlowScalar(token, strict, _onError);
          case "block-scalar":
            return resolveBlockScalar.resolveBlockScalar({ options: { strict } }, token, _onError);
        }
      }
      return null;
    }
    function createScalarToken(value, context) {
      const { implicitKey = false, indent, inFlow = false, offset = -1, type = "PLAIN" } = context;
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey,
        indent: indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      const end = context.end ?? [
        { type: "newline", offset: -1, indent, source: "\n" }
      ];
      switch (source[0]) {
        case "|":
        case ">": {
          const he = source.indexOf("\n");
          const head = source.substring(0, he);
          const body2 = source.substring(he + 1) + "\n";
          const props = [
            { type: "block-scalar-header", offset, indent, source: head }
          ];
          if (!addEndtoBlockProps(props, end))
            props.push({ type: "newline", offset: -1, indent, source: "\n" });
          return { type: "block-scalar", offset, indent, props, source: body2 };
        }
        case '"':
          return { type: "double-quoted-scalar", offset, indent, source, end };
        case "'":
          return { type: "single-quoted-scalar", offset, indent, source, end };
        default:
          return { type: "scalar", offset, indent, source, end };
      }
    }
    function setScalarValue(token, value, context = {}) {
      let { afterKey = false, implicitKey = false, inFlow = false, type } = context;
      let indent = "indent" in token ? token.indent : null;
      if (afterKey && typeof indent === "number")
        indent += 2;
      if (!type)
        switch (token.type) {
          case "single-quoted-scalar":
            type = "QUOTE_SINGLE";
            break;
          case "double-quoted-scalar":
            type = "QUOTE_DOUBLE";
            break;
          case "block-scalar": {
            const header = token.props[0];
            if (header.type !== "block-scalar-header")
              throw new Error("Invalid block scalar header");
            type = header.source[0] === ">" ? "BLOCK_FOLDED" : "BLOCK_LITERAL";
            break;
          }
          default:
            type = "PLAIN";
        }
      const source = stringifyString.stringifyString({ type, value }, {
        implicitKey: implicitKey || indent === null,
        indent: indent !== null && indent > 0 ? " ".repeat(indent) : "",
        inFlow,
        options: { blockQuote: true, lineWidth: -1 }
      });
      switch (source[0]) {
        case "|":
        case ">":
          setBlockScalarValue(token, source);
          break;
        case '"':
          setFlowScalarValue(token, source, "double-quoted-scalar");
          break;
        case "'":
          setFlowScalarValue(token, source, "single-quoted-scalar");
          break;
        default:
          setFlowScalarValue(token, source, "scalar");
      }
    }
    function setBlockScalarValue(token, source) {
      const he = source.indexOf("\n");
      const head = source.substring(0, he);
      const body2 = source.substring(he + 1) + "\n";
      if (token.type === "block-scalar") {
        const header = token.props[0];
        if (header.type !== "block-scalar-header")
          throw new Error("Invalid block scalar header");
        header.source = head;
        token.source = body2;
      } else {
        const { offset } = token;
        const indent = "indent" in token ? token.indent : -1;
        const props = [
          { type: "block-scalar-header", offset, indent, source: head }
        ];
        if (!addEndtoBlockProps(props, "end" in token ? token.end : void 0))
          props.push({ type: "newline", offset: -1, indent, source: "\n" });
        for (const key of Object.keys(token))
          if (key !== "type" && key !== "offset")
            delete token[key];
        Object.assign(token, { type: "block-scalar", indent, props, source: body2 });
      }
    }
    function addEndtoBlockProps(props, end) {
      if (end)
        for (const st of end)
          switch (st.type) {
            case "space":
            case "comment":
              props.push(st);
              break;
            case "newline":
              props.push(st);
              return true;
          }
      return false;
    }
    function setFlowScalarValue(token, source, type) {
      switch (token.type) {
        case "scalar":
        case "double-quoted-scalar":
        case "single-quoted-scalar":
          token.type = type;
          token.source = source;
          break;
        case "block-scalar": {
          const end = token.props.slice(1);
          let oa = source.length;
          if (token.props[0].type === "block-scalar-header")
            oa -= token.props[0].source.length;
          for (const tok of end)
            tok.offset += oa;
          delete token.props;
          Object.assign(token, { type, source, end });
          break;
        }
        case "block-map":
        case "block-seq": {
          const offset = token.offset + source.length;
          const nl = { type: "newline", offset, indent: token.indent, source: "\n" };
          delete token.items;
          Object.assign(token, { type, source, end: [nl] });
          break;
        }
        default: {
          const indent = "indent" in token ? token.indent : -1;
          const end = "end" in token && Array.isArray(token.end) ? token.end.filter((st) => st.type === "space" || st.type === "comment" || st.type === "newline") : [];
          for (const key of Object.keys(token))
            if (key !== "type" && key !== "offset")
              delete token[key];
          Object.assign(token, { type, indent, source, end });
        }
      }
    }
    exports.createScalarToken = createScalarToken;
    exports.resolveAsScalar = resolveAsScalar;
    exports.setScalarValue = setScalarValue;
  }
});

// node_modules/yaml/dist/parse/cst-stringify.js
var require_cst_stringify = __commonJS({
  "node_modules/yaml/dist/parse/cst-stringify.js"(exports) {
    "use strict";
    var stringify = (cst) => "type" in cst ? stringifyToken(cst) : stringifyItem(cst);
    function stringifyToken(token) {
      switch (token.type) {
        case "block-scalar": {
          let res = "";
          for (const tok of token.props)
            res += stringifyToken(tok);
          return res + token.source;
        }
        case "block-map":
        case "block-seq": {
          let res = "";
          for (const item of token.items)
            res += stringifyItem(item);
          return res;
        }
        case "flow-collection": {
          let res = token.start.source;
          for (const item of token.items)
            res += stringifyItem(item);
          for (const st of token.end)
            res += st.source;
          return res;
        }
        case "document": {
          let res = stringifyItem(token);
          if (token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
        default: {
          let res = token.source;
          if ("end" in token && token.end)
            for (const st of token.end)
              res += st.source;
          return res;
        }
      }
    }
    function stringifyItem({ start: start2, key, sep, value }) {
      let res = "";
      for (const st of start2)
        res += st.source;
      if (key)
        res += stringifyToken(key);
      if (sep)
        for (const st of sep)
          res += st.source;
      if (value)
        res += stringifyToken(value);
      return res;
    }
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/parse/cst-visit.js
var require_cst_visit = __commonJS({
  "node_modules/yaml/dist/parse/cst-visit.js"(exports) {
    "use strict";
    var BREAK = /* @__PURE__ */ Symbol("break visit");
    var SKIP = /* @__PURE__ */ Symbol("skip children");
    var REMOVE = /* @__PURE__ */ Symbol("remove item");
    function visit(cst, visitor) {
      if ("type" in cst && cst.type === "document")
        cst = { start: cst.start, value: cst.value };
      _visit(Object.freeze([]), cst, visitor);
    }
    visit.BREAK = BREAK;
    visit.SKIP = SKIP;
    visit.REMOVE = REMOVE;
    visit.itemAtPath = (cst, path) => {
      let item = cst;
      for (const [field, index] of path) {
        const tok = item?.[field];
        if (tok && "items" in tok) {
          item = tok.items[index];
        } else
          return void 0;
      }
      return item;
    };
    visit.parentCollection = (cst, path) => {
      const parent = visit.itemAtPath(cst, path.slice(0, -1));
      const field = path[path.length - 1][0];
      const coll = parent?.[field];
      if (coll && "items" in coll)
        return coll;
      throw new Error("Parent collection not found");
    };
    function _visit(path, item, visitor) {
      let ctrl = visitor(item, path);
      if (typeof ctrl === "symbol")
        return ctrl;
      for (const field of ["key", "value"]) {
        const token = item[field];
        if (token && "items" in token) {
          for (let i2 = 0; i2 < token.items.length; ++i2) {
            const ci = _visit(Object.freeze(path.concat([[field, i2]])), token.items[i2], visitor);
            if (typeof ci === "number")
              i2 = ci - 1;
            else if (ci === BREAK)
              return BREAK;
            else if (ci === REMOVE) {
              token.items.splice(i2, 1);
              i2 -= 1;
            }
          }
          if (typeof ctrl === "function" && field === "key")
            ctrl = ctrl(item, path);
        }
      }
      return typeof ctrl === "function" ? ctrl(item, path) : ctrl;
    }
    exports.visit = visit;
  }
});

// node_modules/yaml/dist/parse/cst.js
var require_cst = __commonJS({
  "node_modules/yaml/dist/parse/cst.js"(exports) {
    "use strict";
    var cstScalar = require_cst_scalar();
    var cstStringify = require_cst_stringify();
    var cstVisit = require_cst_visit();
    var BOM = "\uFEFF";
    var DOCUMENT = "";
    var FLOW_END = "";
    var SCALAR = "";
    var isCollection = (token) => !!token && "items" in token;
    var isScalar = (token) => !!token && (token.type === "scalar" || token.type === "single-quoted-scalar" || token.type === "double-quoted-scalar" || token.type === "block-scalar");
    function prettyToken(token) {
      switch (token) {
        case BOM:
          return "<BOM>";
        case DOCUMENT:
          return "<DOC>";
        case FLOW_END:
          return "<FLOW_END>";
        case SCALAR:
          return "<SCALAR>";
        default:
          return JSON.stringify(token);
      }
    }
    function tokenType(source) {
      switch (source) {
        case BOM:
          return "byte-order-mark";
        case DOCUMENT:
          return "doc-mode";
        case FLOW_END:
          return "flow-error-end";
        case SCALAR:
          return "scalar";
        case "---":
          return "doc-start";
        case "...":
          return "doc-end";
        case "":
        case "\n":
        case "\r\n":
          return "newline";
        case "-":
          return "seq-item-ind";
        case "?":
          return "explicit-key-ind";
        case ":":
          return "map-value-ind";
        case "{":
          return "flow-map-start";
        case "}":
          return "flow-map-end";
        case "[":
          return "flow-seq-start";
        case "]":
          return "flow-seq-end";
        case ",":
          return "comma";
      }
      switch (source[0]) {
        case " ":
        case "	":
          return "space";
        case "#":
          return "comment";
        case "%":
          return "directive-line";
        case "*":
          return "alias";
        case "&":
          return "anchor";
        case "!":
          return "tag";
        case "'":
          return "single-quoted-scalar";
        case '"':
          return "double-quoted-scalar";
        case "|":
        case ">":
          return "block-scalar-header";
      }
      return null;
    }
    exports.createScalarToken = cstScalar.createScalarToken;
    exports.resolveAsScalar = cstScalar.resolveAsScalar;
    exports.setScalarValue = cstScalar.setScalarValue;
    exports.stringify = cstStringify.stringify;
    exports.visit = cstVisit.visit;
    exports.BOM = BOM;
    exports.DOCUMENT = DOCUMENT;
    exports.FLOW_END = FLOW_END;
    exports.SCALAR = SCALAR;
    exports.isCollection = isCollection;
    exports.isScalar = isScalar;
    exports.prettyToken = prettyToken;
    exports.tokenType = tokenType;
  }
});

// node_modules/yaml/dist/parse/lexer.js
var require_lexer = __commonJS({
  "node_modules/yaml/dist/parse/lexer.js"(exports) {
    "use strict";
    var cst = require_cst();
    function isEmpty(ch) {
      switch (ch) {
        case void 0:
        case " ":
        case "\n":
        case "\r":
        case "	":
          return true;
        default:
          return false;
      }
    }
    var hexDigits = new Set("0123456789ABCDEFabcdef");
    var tagChars = new Set("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-#;/?:@&=+$_.!~*'()");
    var flowIndicatorChars = new Set(",[]{}");
    var invalidAnchorChars = new Set(" ,[]{}\n\r	");
    var isNotAnchorChar = (ch) => !ch || invalidAnchorChars.has(ch);
    var Lexer = class {
      constructor() {
        this.atEnd = false;
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        this.buffer = "";
        this.flowKey = false;
        this.flowLevel = 0;
        this.indentNext = 0;
        this.indentValue = 0;
        this.lineEndPos = null;
        this.next = null;
        this.pos = 0;
      }
      /**
       * Generate YAML tokens from the `source` string. If `incomplete`,
       * a part of the last line may be left as a buffer for the next call.
       *
       * @returns A generator of lexical tokens
       */
      *lex(source, incomplete = false) {
        if (source) {
          if (typeof source !== "string")
            throw TypeError("source is not a string");
          this.buffer = this.buffer ? this.buffer + source : source;
          this.lineEndPos = null;
        }
        this.atEnd = !incomplete;
        let next = this.next ?? "stream";
        while (next && (incomplete || this.hasChars(1)))
          next = yield* this.parseNext(next);
      }
      atLineEnd() {
        let i2 = this.pos;
        let ch = this.buffer[i2];
        while (ch === " " || ch === "	")
          ch = this.buffer[++i2];
        if (!ch || ch === "#" || ch === "\n")
          return true;
        if (ch === "\r")
          return this.buffer[i2 + 1] === "\n";
        return false;
      }
      charAt(n) {
        return this.buffer[this.pos + n];
      }
      continueScalar(offset) {
        let ch = this.buffer[offset];
        if (this.indentNext > 0) {
          let indent = 0;
          while (ch === " ")
            ch = this.buffer[++indent + offset];
          if (ch === "\r") {
            const next = this.buffer[indent + offset + 1];
            if (next === "\n" || !next && !this.atEnd)
              return offset + indent + 1;
          }
          return ch === "\n" || indent >= this.indentNext || !ch && !this.atEnd ? offset + indent : -1;
        }
        if (ch === "-" || ch === ".") {
          const dt = this.buffer.substr(offset, 3);
          if ((dt === "---" || dt === "...") && isEmpty(this.buffer[offset + 3]))
            return -1;
        }
        return offset;
      }
      getLine() {
        let end = this.lineEndPos;
        if (typeof end !== "number" || end !== -1 && end < this.pos) {
          end = this.buffer.indexOf("\n", this.pos);
          this.lineEndPos = end;
        }
        if (end === -1)
          return this.atEnd ? this.buffer.substring(this.pos) : null;
        if (this.buffer[end - 1] === "\r")
          end -= 1;
        return this.buffer.substring(this.pos, end);
      }
      hasChars(n) {
        return this.pos + n <= this.buffer.length;
      }
      setNext(state) {
        this.buffer = this.buffer.substring(this.pos);
        this.pos = 0;
        this.lineEndPos = null;
        this.next = state;
        return null;
      }
      peek(n) {
        return this.buffer.substr(this.pos, n);
      }
      *parseNext(next) {
        switch (next) {
          case "stream":
            return yield* this.parseStream();
          case "line-start":
            return yield* this.parseLineStart();
          case "block-start":
            return yield* this.parseBlockStart();
          case "doc":
            return yield* this.parseDocument();
          case "flow":
            return yield* this.parseFlowCollection();
          case "quoted-scalar":
            return yield* this.parseQuotedScalar();
          case "block-scalar":
            return yield* this.parseBlockScalar();
          case "plain-scalar":
            return yield* this.parsePlainScalar();
        }
      }
      *parseStream() {
        let line = this.getLine();
        if (line === null)
          return this.setNext("stream");
        if (line[0] === cst.BOM) {
          yield* this.pushCount(1);
          line = line.substring(1);
        }
        if (line[0] === "%") {
          let dirEnd = line.length;
          let cs = line.indexOf("#");
          while (cs !== -1) {
            const ch = line[cs - 1];
            if (ch === " " || ch === "	") {
              dirEnd = cs - 1;
              break;
            } else {
              cs = line.indexOf("#", cs + 1);
            }
          }
          while (true) {
            const ch = line[dirEnd - 1];
            if (ch === " " || ch === "	")
              dirEnd -= 1;
            else
              break;
          }
          const n = (yield* this.pushCount(dirEnd)) + (yield* this.pushSpaces(true));
          yield* this.pushCount(line.length - n);
          this.pushNewline();
          return "stream";
        }
        if (this.atLineEnd()) {
          const sp = yield* this.pushSpaces(true);
          yield* this.pushCount(line.length - sp);
          yield* this.pushNewline();
          return "stream";
        }
        yield cst.DOCUMENT;
        return yield* this.parseLineStart();
      }
      *parseLineStart() {
        const ch = this.charAt(0);
        if (!ch && !this.atEnd)
          return this.setNext("line-start");
        if (ch === "-" || ch === ".") {
          if (!this.atEnd && !this.hasChars(4))
            return this.setNext("line-start");
          const s = this.peek(3);
          if ((s === "---" || s === "...") && isEmpty(this.charAt(3))) {
            yield* this.pushCount(3);
            this.indentValue = 0;
            this.indentNext = 0;
            return s === "---" ? "doc" : "stream";
          }
        }
        this.indentValue = yield* this.pushSpaces(false);
        if (this.indentNext > this.indentValue && !isEmpty(this.charAt(1)))
          this.indentNext = this.indentValue;
        return yield* this.parseBlockStart();
      }
      *parseBlockStart() {
        const [ch0, ch1] = this.peek(2);
        if (!ch1 && !this.atEnd)
          return this.setNext("block-start");
        if ((ch0 === "-" || ch0 === "?" || ch0 === ":") && isEmpty(ch1)) {
          const n = (yield* this.pushCount(1)) + (yield* this.pushSpaces(true));
          this.indentNext = this.indentValue + 1;
          this.indentValue += n;
          return "block-start";
        }
        return "doc";
      }
      *parseDocument() {
        yield* this.pushSpaces(true);
        const line = this.getLine();
        if (line === null)
          return this.setNext("doc");
        let n = yield* this.pushIndicators();
        switch (line[n]) {
          case "#":
            yield* this.pushCount(line.length - n);
          // fallthrough
          case void 0:
            yield* this.pushNewline();
            return yield* this.parseLineStart();
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel = 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            return "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "doc";
          case '"':
          case "'":
            return yield* this.parseQuotedScalar();
          case "|":
          case ">":
            n += yield* this.parseBlockScalarHeader();
            n += yield* this.pushSpaces(true);
            yield* this.pushCount(line.length - n);
            yield* this.pushNewline();
            return yield* this.parseBlockScalar();
          default:
            return yield* this.parsePlainScalar();
        }
      }
      *parseFlowCollection() {
        let nl, sp;
        let indent = -1;
        do {
          nl = yield* this.pushNewline();
          if (nl > 0) {
            sp = yield* this.pushSpaces(false);
            this.indentValue = indent = sp;
          } else {
            sp = 0;
          }
          sp += yield* this.pushSpaces(true);
        } while (nl + sp > 0);
        const line = this.getLine();
        if (line === null)
          return this.setNext("flow");
        if (indent !== -1 && indent < this.indentNext && line[0] !== "#" || indent === 0 && (line.startsWith("---") || line.startsWith("...")) && isEmpty(line[3])) {
          const atFlowEndMarker = indent === this.indentNext - 1 && this.flowLevel === 1 && (line[0] === "]" || line[0] === "}");
          if (!atFlowEndMarker) {
            this.flowLevel = 0;
            yield cst.FLOW_END;
            return yield* this.parseLineStart();
          }
        }
        let n = 0;
        while (line[n] === ",") {
          n += yield* this.pushCount(1);
          n += yield* this.pushSpaces(true);
          this.flowKey = false;
        }
        n += yield* this.pushIndicators();
        switch (line[n]) {
          case void 0:
            return "flow";
          case "#":
            yield* this.pushCount(line.length - n);
            return "flow";
          case "{":
          case "[":
            yield* this.pushCount(1);
            this.flowKey = false;
            this.flowLevel += 1;
            return "flow";
          case "}":
          case "]":
            yield* this.pushCount(1);
            this.flowKey = true;
            this.flowLevel -= 1;
            return this.flowLevel ? "flow" : "doc";
          case "*":
            yield* this.pushUntil(isNotAnchorChar);
            return "flow";
          case '"':
          case "'":
            this.flowKey = true;
            return yield* this.parseQuotedScalar();
          case ":": {
            const next = this.charAt(1);
            if (this.flowKey || isEmpty(next) || next === ",") {
              this.flowKey = false;
              yield* this.pushCount(1);
              yield* this.pushSpaces(true);
              return "flow";
            }
          }
          // fallthrough
          default:
            this.flowKey = false;
            return yield* this.parsePlainScalar();
        }
      }
      *parseQuotedScalar() {
        const quote = this.charAt(0);
        let end = this.buffer.indexOf(quote, this.pos + 1);
        if (quote === "'") {
          while (end !== -1 && this.buffer[end + 1] === "'")
            end = this.buffer.indexOf("'", end + 2);
        } else {
          while (end !== -1) {
            let n = 0;
            while (this.buffer[end - 1 - n] === "\\")
              n += 1;
            if (n % 2 === 0)
              break;
            end = this.buffer.indexOf('"', end + 1);
          }
        }
        const qb = this.buffer.substring(0, end);
        let nl = qb.indexOf("\n", this.pos);
        if (nl !== -1) {
          while (nl !== -1) {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = qb.indexOf("\n", cs);
          }
          if (nl !== -1) {
            end = nl - (qb[nl - 1] === "\r" ? 2 : 1);
          }
        }
        if (end === -1) {
          if (!this.atEnd)
            return this.setNext("quoted-scalar");
          end = this.buffer.length;
        }
        yield* this.pushToIndex(end + 1, false);
        return this.flowLevel ? "flow" : "doc";
      }
      *parseBlockScalarHeader() {
        this.blockScalarIndent = -1;
        this.blockScalarKeep = false;
        let i2 = this.pos;
        while (true) {
          const ch = this.buffer[++i2];
          if (ch === "+")
            this.blockScalarKeep = true;
          else if (ch > "0" && ch <= "9")
            this.blockScalarIndent = Number(ch) - 1;
          else if (ch !== "-")
            break;
        }
        return yield* this.pushUntil((ch) => isEmpty(ch) || ch === "#");
      }
      *parseBlockScalar() {
        let nl = this.pos - 1;
        let indent = 0;
        let ch;
        loop: for (let i3 = this.pos; ch = this.buffer[i3]; ++i3) {
          switch (ch) {
            case " ":
              indent += 1;
              break;
            case "\n":
              nl = i3;
              indent = 0;
              break;
            case "\r": {
              const next = this.buffer[i3 + 1];
              if (!next && !this.atEnd)
                return this.setNext("block-scalar");
              if (next === "\n")
                break;
            }
            // fallthrough
            default:
              break loop;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("block-scalar");
        if (indent >= this.indentNext) {
          if (this.blockScalarIndent === -1)
            this.indentNext = indent;
          else {
            this.indentNext = this.blockScalarIndent + (this.indentNext === 0 ? 1 : this.indentNext);
          }
          do {
            const cs = this.continueScalar(nl + 1);
            if (cs === -1)
              break;
            nl = this.buffer.indexOf("\n", cs);
          } while (nl !== -1);
          if (nl === -1) {
            if (!this.atEnd)
              return this.setNext("block-scalar");
            nl = this.buffer.length;
          }
        }
        let i2 = nl + 1;
        ch = this.buffer[i2];
        while (ch === " ")
          ch = this.buffer[++i2];
        if (ch === "	") {
          while (ch === "	" || ch === " " || ch === "\r" || ch === "\n")
            ch = this.buffer[++i2];
          nl = i2 - 1;
        } else if (!this.blockScalarKeep) {
          do {
            let i3 = nl - 1;
            let ch2 = this.buffer[i3];
            if (ch2 === "\r")
              ch2 = this.buffer[--i3];
            const lastChar = i3;
            while (ch2 === " ")
              ch2 = this.buffer[--i3];
            if (ch2 === "\n" && i3 >= this.pos && i3 + 1 + indent > lastChar)
              nl = i3;
            else
              break;
          } while (true);
        }
        yield cst.SCALAR;
        yield* this.pushToIndex(nl + 1, true);
        return yield* this.parseLineStart();
      }
      *parsePlainScalar() {
        const inFlow = this.flowLevel > 0;
        let end = this.pos - 1;
        let i2 = this.pos - 1;
        let ch;
        while (ch = this.buffer[++i2]) {
          if (ch === ":") {
            const next = this.buffer[i2 + 1];
            if (isEmpty(next) || inFlow && flowIndicatorChars.has(next))
              break;
            end = i2;
          } else if (isEmpty(ch)) {
            let next = this.buffer[i2 + 1];
            if (ch === "\r") {
              if (next === "\n") {
                i2 += 1;
                ch = "\n";
                next = this.buffer[i2 + 1];
              } else
                end = i2;
            }
            if (next === "#" || inFlow && flowIndicatorChars.has(next))
              break;
            if (ch === "\n") {
              const cs = this.continueScalar(i2 + 1);
              if (cs === -1)
                break;
              i2 = Math.max(i2, cs - 2);
            }
          } else {
            if (inFlow && flowIndicatorChars.has(ch))
              break;
            end = i2;
          }
        }
        if (!ch && !this.atEnd)
          return this.setNext("plain-scalar");
        yield cst.SCALAR;
        yield* this.pushToIndex(end + 1, true);
        return inFlow ? "flow" : "doc";
      }
      *pushCount(n) {
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos += n;
          return n;
        }
        return 0;
      }
      *pushToIndex(i2, allowEmpty) {
        const s = this.buffer.slice(this.pos, i2);
        if (s) {
          yield s;
          this.pos += s.length;
          return s.length;
        } else if (allowEmpty)
          yield "";
        return 0;
      }
      *pushIndicators() {
        let n = 0;
        loop: while (true) {
          switch (this.charAt(0)) {
            case "!":
              n += yield* this.pushTag();
              n += yield* this.pushSpaces(true);
              continue loop;
            case "&":
              n += yield* this.pushUntil(isNotAnchorChar);
              n += yield* this.pushSpaces(true);
              continue loop;
            case "-":
            // this is an error
            case "?":
            // this is an error outside flow collections
            case ":": {
              const inFlow = this.flowLevel > 0;
              const ch1 = this.charAt(1);
              if (isEmpty(ch1) || inFlow && flowIndicatorChars.has(ch1)) {
                if (!inFlow)
                  this.indentNext = this.indentValue + 1;
                else if (this.flowKey)
                  this.flowKey = false;
                n += yield* this.pushCount(1);
                n += yield* this.pushSpaces(true);
                continue loop;
              }
            }
          }
          break loop;
        }
        return n;
      }
      *pushTag() {
        if (this.charAt(1) === "<") {
          let i2 = this.pos + 2;
          let ch = this.buffer[i2];
          while (!isEmpty(ch) && ch !== ">")
            ch = this.buffer[++i2];
          return yield* this.pushToIndex(ch === ">" ? i2 + 1 : i2, false);
        } else {
          let i2 = this.pos + 1;
          let ch = this.buffer[i2];
          while (ch) {
            if (tagChars.has(ch))
              ch = this.buffer[++i2];
            else if (ch === "%" && hexDigits.has(this.buffer[i2 + 1]) && hexDigits.has(this.buffer[i2 + 2])) {
              ch = this.buffer[i2 += 3];
            } else
              break;
          }
          return yield* this.pushToIndex(i2, false);
        }
      }
      *pushNewline() {
        const ch = this.buffer[this.pos];
        if (ch === "\n")
          return yield* this.pushCount(1);
        else if (ch === "\r" && this.charAt(1) === "\n")
          return yield* this.pushCount(2);
        else
          return 0;
      }
      *pushSpaces(allowTabs) {
        let i2 = this.pos - 1;
        let ch;
        do {
          ch = this.buffer[++i2];
        } while (ch === " " || allowTabs && ch === "	");
        const n = i2 - this.pos;
        if (n > 0) {
          yield this.buffer.substr(this.pos, n);
          this.pos = i2;
        }
        return n;
      }
      *pushUntil(test) {
        let i2 = this.pos;
        let ch = this.buffer[i2];
        while (!test(ch))
          ch = this.buffer[++i2];
        return yield* this.pushToIndex(i2, false);
      }
    };
    exports.Lexer = Lexer;
  }
});

// node_modules/yaml/dist/parse/line-counter.js
var require_line_counter = __commonJS({
  "node_modules/yaml/dist/parse/line-counter.js"(exports) {
    "use strict";
    var LineCounter = class {
      constructor() {
        this.lineStarts = [];
        this.addNewLine = (offset) => this.lineStarts.push(offset);
        this.linePos = (offset) => {
          let low = 0;
          let high = this.lineStarts.length;
          while (low < high) {
            const mid = low + high >> 1;
            if (this.lineStarts[mid] < offset)
              low = mid + 1;
            else
              high = mid;
          }
          if (this.lineStarts[low] === offset)
            return { line: low + 1, col: 1 };
          if (low === 0)
            return { line: 0, col: offset };
          const start2 = this.lineStarts[low - 1];
          return { line: low, col: offset - start2 + 1 };
        };
      }
    };
    exports.LineCounter = LineCounter;
  }
});

// node_modules/yaml/dist/parse/parser.js
var require_parser = __commonJS({
  "node_modules/yaml/dist/parse/parser.js"(exports) {
    "use strict";
    var node_process = __require("process");
    var cst = require_cst();
    var lexer = require_lexer();
    function includesToken(list, type) {
      for (let i2 = 0; i2 < list.length; ++i2)
        if (list[i2].type === type)
          return true;
      return false;
    }
    function findNonEmptyIndex(list) {
      for (let i2 = 0; i2 < list.length; ++i2) {
        switch (list[i2].type) {
          case "space":
          case "comment":
          case "newline":
            break;
          default:
            return i2;
        }
      }
      return -1;
    }
    function isFlowToken(token) {
      switch (token?.type) {
        case "alias":
        case "scalar":
        case "single-quoted-scalar":
        case "double-quoted-scalar":
        case "flow-collection":
          return true;
        default:
          return false;
      }
    }
    function getPrevProps(parent) {
      switch (parent.type) {
        case "document":
          return parent.start;
        case "block-map": {
          const it = parent.items[parent.items.length - 1];
          return it.sep ?? it.start;
        }
        case "block-seq":
          return parent.items[parent.items.length - 1].start;
        /* istanbul ignore next should not happen */
        default:
          return [];
      }
    }
    function getFirstKeyStartProps(prev) {
      if (prev.length === 0)
        return [];
      let i2 = prev.length;
      loop: while (--i2 >= 0) {
        switch (prev[i2].type) {
          case "doc-start":
          case "explicit-key-ind":
          case "map-value-ind":
          case "seq-item-ind":
          case "newline":
            break loop;
        }
      }
      while (prev[++i2]?.type === "space") {
      }
      return prev.splice(i2, prev.length);
    }
    function arrayPushArray(target, source) {
      if (source.length < 1e5)
        Array.prototype.push.apply(target, source);
      else
        for (let i2 = 0; i2 < source.length; ++i2)
          target.push(source[i2]);
    }
    function fixFlowSeqItems(fc) {
      if (fc.start.type === "flow-seq-start") {
        for (const it of fc.items) {
          if (it.sep && !it.value && !includesToken(it.start, "explicit-key-ind") && !includesToken(it.sep, "map-value-ind")) {
            if (it.key)
              it.value = it.key;
            delete it.key;
            if (isFlowToken(it.value)) {
              if (it.value.end)
                arrayPushArray(it.value.end, it.sep);
              else
                it.value.end = it.sep;
            } else
              arrayPushArray(it.start, it.sep);
            delete it.sep;
          }
        }
      }
    }
    var Parser2 = class {
      /**
       * @param onNewLine - If defined, called separately with the start position of
       *   each new line (in `parse()`, including the start of input).
       */
      constructor(onNewLine) {
        this.atNewLine = true;
        this.atScalar = false;
        this.indent = 0;
        this.offset = 0;
        this.onKeyLine = false;
        this.stack = [];
        this.source = "";
        this.type = "";
        this.lexer = new lexer.Lexer();
        this.onNewLine = onNewLine;
      }
      /**
       * Parse `source` as a YAML stream.
       * If `incomplete`, a part of the last line may be left as a buffer for the next call.
       *
       * Errors are not thrown, but yielded as `{ type: 'error', message }` tokens.
       *
       * @returns A generator of tokens representing each directive, document, and other structure.
       */
      *parse(source, incomplete = false) {
        if (this.onNewLine && this.offset === 0)
          this.onNewLine(0);
        for (const lexeme of this.lexer.lex(source, incomplete))
          yield* this.next(lexeme);
        if (!incomplete)
          yield* this.end();
      }
      /**
       * Advance the parser by the `source` of one lexical token.
       */
      *next(source) {
        this.source = source;
        if (node_process.env.LOG_TOKENS)
          console.log("|", cst.prettyToken(source));
        if (this.atScalar) {
          this.atScalar = false;
          yield* this.step();
          this.offset += source.length;
          return;
        }
        const type = cst.tokenType(source);
        if (!type) {
          const message = `Not a YAML token: ${source}`;
          yield* this.pop({ type: "error", offset: this.offset, message, source });
          this.offset += source.length;
        } else if (type === "scalar") {
          this.atNewLine = false;
          this.atScalar = true;
          this.type = "scalar";
        } else {
          this.type = type;
          yield* this.step();
          switch (type) {
            case "newline":
              this.atNewLine = true;
              this.indent = 0;
              if (this.onNewLine)
                this.onNewLine(this.offset + source.length);
              break;
            case "space":
              if (this.atNewLine && source[0] === " ")
                this.indent += source.length;
              break;
            case "explicit-key-ind":
            case "map-value-ind":
            case "seq-item-ind":
              if (this.atNewLine)
                this.indent += source.length;
              break;
            case "doc-mode":
            case "flow-error-end":
              return;
            default:
              this.atNewLine = false;
          }
          this.offset += source.length;
        }
      }
      /** Call at end of input to push out any remaining constructions */
      *end() {
        while (this.stack.length > 0)
          yield* this.pop();
      }
      get sourceToken() {
        const st = {
          type: this.type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
        return st;
      }
      *step() {
        const top = this.peek(1);
        if (this.type === "doc-end" && top?.type !== "doc-end") {
          while (this.stack.length > 0)
            yield* this.pop();
          this.stack.push({
            type: "doc-end",
            offset: this.offset,
            source: this.source
          });
          return;
        }
        if (!top)
          return yield* this.stream();
        switch (top.type) {
          case "document":
            return yield* this.document(top);
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return yield* this.scalar(top);
          case "block-scalar":
            return yield* this.blockScalar(top);
          case "block-map":
            return yield* this.blockMap(top);
          case "block-seq":
            return yield* this.blockSequence(top);
          case "flow-collection":
            return yield* this.flowCollection(top);
          case "doc-end":
            return yield* this.documentEnd(top);
        }
        yield* this.pop();
      }
      peek(n) {
        return this.stack[this.stack.length - n];
      }
      *pop(error) {
        const token = error ?? this.stack.pop();
        if (!token) {
          const message = "Tried to pop an empty stack";
          yield { type: "error", offset: this.offset, source: "", message };
        } else if (this.stack.length === 0) {
          yield token;
        } else {
          const top = this.peek(1);
          if (token.type === "block-scalar") {
            token.indent = "indent" in top ? top.indent : 0;
          } else if (token.type === "flow-collection" && top.type === "document") {
            token.indent = 0;
          }
          if (token.type === "flow-collection")
            fixFlowSeqItems(token);
          switch (top.type) {
            case "document":
              top.value = token;
              break;
            case "block-scalar":
              top.props.push(token);
              break;
            case "block-map": {
              const it = top.items[top.items.length - 1];
              if (it.value) {
                top.items.push({ start: [], key: token, sep: [] });
                this.onKeyLine = true;
                return;
              } else if (it.sep) {
                it.value = token;
              } else {
                Object.assign(it, { key: token, sep: [] });
                this.onKeyLine = !it.explicitKey;
                return;
              }
              break;
            }
            case "block-seq": {
              const it = top.items[top.items.length - 1];
              if (it.value)
                top.items.push({ start: [], value: token });
              else
                it.value = token;
              break;
            }
            case "flow-collection": {
              const it = top.items[top.items.length - 1];
              if (!it || it.value)
                top.items.push({ start: [], key: token, sep: [] });
              else if (it.sep)
                it.value = token;
              else
                Object.assign(it, { key: token, sep: [] });
              return;
            }
            /* istanbul ignore next should not happen */
            default:
              yield* this.pop();
              yield* this.pop(token);
          }
          if ((top.type === "document" || top.type === "block-map" || top.type === "block-seq") && (token.type === "block-map" || token.type === "block-seq")) {
            const last = token.items[token.items.length - 1];
            if (last && !last.sep && !last.value && last.start.length > 0 && findNonEmptyIndex(last.start) === -1 && (token.indent === 0 || last.start.every((st) => st.type !== "comment" || st.indent < token.indent))) {
              if (top.type === "document")
                top.end = last.start;
              else
                top.items.push({ start: last.start });
              token.items.splice(-1, 1);
            }
          }
        }
      }
      *stream() {
        switch (this.type) {
          case "directive-line":
            yield { type: "directive", offset: this.offset, source: this.source };
            return;
          case "byte-order-mark":
          case "space":
          case "comment":
          case "newline":
            yield this.sourceToken;
            return;
          case "doc-mode":
          case "doc-start": {
            const doc = {
              type: "document",
              offset: this.offset,
              start: []
            };
            if (this.type === "doc-start")
              doc.start.push(this.sourceToken);
            this.stack.push(doc);
            return;
          }
        }
        yield {
          type: "error",
          offset: this.offset,
          message: `Unexpected ${this.type} token in YAML stream`,
          source: this.source
        };
      }
      *document(doc) {
        if (doc.value)
          return yield* this.lineEnd(doc);
        switch (this.type) {
          case "doc-start": {
            if (findNonEmptyIndex(doc.start) !== -1) {
              yield* this.pop();
              yield* this.step();
            } else
              doc.start.push(this.sourceToken);
            return;
          }
          case "anchor":
          case "tag":
          case "space":
          case "comment":
          case "newline":
            doc.start.push(this.sourceToken);
            return;
        }
        const bv = this.startBlockValue(doc);
        if (bv)
          this.stack.push(bv);
        else {
          yield {
            type: "error",
            offset: this.offset,
            message: `Unexpected ${this.type} token in YAML document`,
            source: this.source
          };
        }
      }
      *scalar(scalar) {
        if (this.type === "map-value-ind") {
          const prev = getPrevProps(this.peek(2));
          const start2 = getFirstKeyStartProps(prev);
          let sep;
          if (scalar.end) {
            sep = scalar.end;
            sep.push(this.sourceToken);
            delete scalar.end;
          } else
            sep = [this.sourceToken];
          const map = {
            type: "block-map",
            offset: scalar.offset,
            indent: scalar.indent,
            items: [{ start: start2, key: scalar, sep }]
          };
          this.onKeyLine = true;
          this.stack[this.stack.length - 1] = map;
        } else
          yield* this.lineEnd(scalar);
      }
      *blockScalar(scalar) {
        switch (this.type) {
          case "space":
          case "comment":
          case "newline":
            scalar.props.push(this.sourceToken);
            return;
          case "scalar":
            scalar.source = this.source;
            this.atNewLine = true;
            this.indent = 0;
            if (this.onNewLine) {
              let nl = this.source.indexOf("\n") + 1;
              while (nl !== 0) {
                this.onNewLine(this.offset + nl);
                nl = this.source.indexOf("\n", nl) + 1;
              }
            }
            yield* this.pop();
            break;
          /* istanbul ignore next should not happen */
          default:
            yield* this.pop();
            yield* this.step();
        }
      }
      *blockMap(map) {
        const it = map.items[map.items.length - 1];
        switch (this.type) {
          case "newline":
            this.onKeyLine = false;
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              it.start.push(this.sourceToken);
            }
            return;
          case "space":
          case "comment":
            if (it.value) {
              map.items.push({ start: [this.sourceToken] });
            } else if (it.sep) {
              it.sep.push(this.sourceToken);
            } else {
              if (this.atIndentedComment(it.start, map.indent)) {
                const prev = map.items[map.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  map.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
        }
        if (this.indent >= map.indent) {
          const atMapIndent = !this.onKeyLine && this.indent === map.indent;
          const atNextItem = atMapIndent && (it.sep || it.explicitKey) && this.type !== "seq-item-ind";
          let start2 = [];
          if (atNextItem && it.sep && !it.value) {
            const nl = [];
            for (let i2 = 0; i2 < it.sep.length; ++i2) {
              const st = it.sep[i2];
              switch (st.type) {
                case "newline":
                  nl.push(i2);
                  break;
                case "space":
                  break;
                case "comment":
                  if (st.indent > map.indent)
                    nl.length = 0;
                  break;
                default:
                  nl.length = 0;
              }
            }
            if (nl.length >= 2)
              start2 = it.sep.splice(nl[1]);
          }
          switch (this.type) {
            case "anchor":
            case "tag":
              if (atNextItem || it.value) {
                start2.push(this.sourceToken);
                map.items.push({ start: start2 });
                this.onKeyLine = true;
              } else if (it.sep) {
                it.sep.push(this.sourceToken);
              } else {
                it.start.push(this.sourceToken);
              }
              return;
            case "explicit-key-ind":
              if (!it.sep && !it.explicitKey) {
                it.start.push(this.sourceToken);
                it.explicitKey = true;
              } else if (atNextItem || it.value) {
                start2.push(this.sourceToken);
                map.items.push({ start: start2, explicitKey: true });
              } else {
                this.stack.push({
                  type: "block-map",
                  offset: this.offset,
                  indent: this.indent,
                  items: [{ start: [this.sourceToken], explicitKey: true }]
                });
              }
              this.onKeyLine = true;
              return;
            case "map-value-ind":
              if (it.explicitKey) {
                if (!it.sep) {
                  if (includesToken(it.start, "newline")) {
                    Object.assign(it, { key: null, sep: [this.sourceToken] });
                  } else {
                    const start3 = getFirstKeyStartProps(it.start);
                    this.stack.push({
                      type: "block-map",
                      offset: this.offset,
                      indent: this.indent,
                      items: [{ start: start3, key: null, sep: [this.sourceToken] }]
                    });
                  }
                } else if (it.value) {
                  map.items.push({ start: [], key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start2, key: null, sep: [this.sourceToken] }]
                  });
                } else if (isFlowToken(it.key) && !includesToken(it.sep, "newline")) {
                  const start3 = getFirstKeyStartProps(it.start);
                  const key = it.key;
                  const sep = it.sep;
                  sep.push(this.sourceToken);
                  delete it.key;
                  delete it.sep;
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: start3, key, sep }]
                  });
                } else if (start2.length > 0) {
                  it.sep = it.sep.concat(start2, this.sourceToken);
                } else {
                  it.sep.push(this.sourceToken);
                }
              } else {
                if (!it.sep) {
                  Object.assign(it, { key: null, sep: [this.sourceToken] });
                } else if (it.value || atNextItem) {
                  map.items.push({ start: start2, key: null, sep: [this.sourceToken] });
                } else if (includesToken(it.sep, "map-value-ind")) {
                  this.stack.push({
                    type: "block-map",
                    offset: this.offset,
                    indent: this.indent,
                    items: [{ start: [], key: null, sep: [this.sourceToken] }]
                  });
                } else {
                  it.sep.push(this.sourceToken);
                }
              }
              this.onKeyLine = true;
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs2 = this.flowScalar(this.type);
              if (atNextItem || it.value) {
                map.items.push({ start: start2, key: fs2, sep: [] });
                this.onKeyLine = true;
              } else if (it.sep) {
                this.stack.push(fs2);
              } else {
                Object.assign(it, { key: fs2, sep: [] });
                this.onKeyLine = true;
              }
              return;
            }
            default: {
              const bv = this.startBlockValue(map);
              if (bv) {
                if (bv.type === "block-seq") {
                  if (!it.explicitKey && it.sep && !includesToken(it.sep, "newline")) {
                    yield* this.pop({
                      type: "error",
                      offset: this.offset,
                      message: "Unexpected block-seq-ind on same line with key",
                      source: this.source
                    });
                    return;
                  }
                } else if (atMapIndent) {
                  map.items.push({ start: start2 });
                }
                this.stack.push(bv);
                return;
              }
            }
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *blockSequence(seq) {
        const it = seq.items[seq.items.length - 1];
        switch (this.type) {
          case "newline":
            if (it.value) {
              const end = "end" in it.value ? it.value.end : void 0;
              const last = Array.isArray(end) ? end[end.length - 1] : void 0;
              if (last?.type === "comment")
                end?.push(this.sourceToken);
              else
                seq.items.push({ start: [this.sourceToken] });
            } else
              it.start.push(this.sourceToken);
            return;
          case "space":
          case "comment":
            if (it.value)
              seq.items.push({ start: [this.sourceToken] });
            else {
              if (this.atIndentedComment(it.start, seq.indent)) {
                const prev = seq.items[seq.items.length - 2];
                const end = prev?.value?.end;
                if (Array.isArray(end)) {
                  arrayPushArray(end, it.start);
                  end.push(this.sourceToken);
                  seq.items.pop();
                  return;
                }
              }
              it.start.push(this.sourceToken);
            }
            return;
          case "anchor":
          case "tag":
            if (it.value || this.indent <= seq.indent)
              break;
            it.start.push(this.sourceToken);
            return;
          case "seq-item-ind":
            if (this.indent !== seq.indent)
              break;
            if (it.value || includesToken(it.start, "seq-item-ind"))
              seq.items.push({ start: [this.sourceToken] });
            else
              it.start.push(this.sourceToken);
            return;
        }
        if (this.indent > seq.indent) {
          const bv = this.startBlockValue(seq);
          if (bv) {
            this.stack.push(bv);
            return;
          }
        }
        yield* this.pop();
        yield* this.step();
      }
      *flowCollection(fc) {
        const it = fc.items[fc.items.length - 1];
        if (this.type === "flow-error-end") {
          let top;
          do {
            yield* this.pop();
            top = this.peek(1);
          } while (top?.type === "flow-collection");
        } else if (fc.end.length === 0) {
          switch (this.type) {
            case "comma":
            case "explicit-key-ind":
              if (!it || it.sep)
                fc.items.push({ start: [this.sourceToken] });
              else
                it.start.push(this.sourceToken);
              return;
            case "map-value-ind":
              if (!it || it.value)
                fc.items.push({ start: [], key: null, sep: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                Object.assign(it, { key: null, sep: [this.sourceToken] });
              return;
            case "space":
            case "comment":
            case "newline":
            case "anchor":
            case "tag":
              if (!it || it.value)
                fc.items.push({ start: [this.sourceToken] });
              else if (it.sep)
                it.sep.push(this.sourceToken);
              else
                it.start.push(this.sourceToken);
              return;
            case "alias":
            case "scalar":
            case "single-quoted-scalar":
            case "double-quoted-scalar": {
              const fs2 = this.flowScalar(this.type);
              if (!it || it.value)
                fc.items.push({ start: [], key: fs2, sep: [] });
              else if (it.sep)
                this.stack.push(fs2);
              else
                Object.assign(it, { key: fs2, sep: [] });
              return;
            }
            case "flow-map-end":
            case "flow-seq-end":
              fc.end.push(this.sourceToken);
              return;
          }
          const bv = this.startBlockValue(fc);
          if (bv)
            this.stack.push(bv);
          else {
            yield* this.pop();
            yield* this.step();
          }
        } else {
          const parent = this.peek(2);
          if (parent.type === "block-map" && (this.type === "map-value-ind" && parent.indent === fc.indent || this.type === "newline" && !parent.items[parent.items.length - 1].sep)) {
            yield* this.pop();
            yield* this.step();
          } else if (this.type === "map-value-ind" && parent.type !== "flow-collection") {
            const prev = getPrevProps(parent);
            const start2 = getFirstKeyStartProps(prev);
            fixFlowSeqItems(fc);
            const sep = fc.end.splice(1, fc.end.length);
            sep.push(this.sourceToken);
            const map = {
              type: "block-map",
              offset: fc.offset,
              indent: fc.indent,
              items: [{ start: start2, key: fc, sep }]
            };
            this.onKeyLine = true;
            this.stack[this.stack.length - 1] = map;
          } else {
            yield* this.lineEnd(fc);
          }
        }
      }
      flowScalar(type) {
        if (this.onNewLine) {
          let nl = this.source.indexOf("\n") + 1;
          while (nl !== 0) {
            this.onNewLine(this.offset + nl);
            nl = this.source.indexOf("\n", nl) + 1;
          }
        }
        return {
          type,
          offset: this.offset,
          indent: this.indent,
          source: this.source
        };
      }
      startBlockValue(parent) {
        switch (this.type) {
          case "alias":
          case "scalar":
          case "single-quoted-scalar":
          case "double-quoted-scalar":
            return this.flowScalar(this.type);
          case "block-scalar-header":
            return {
              type: "block-scalar",
              offset: this.offset,
              indent: this.indent,
              props: [this.sourceToken],
              source: ""
            };
          case "flow-map-start":
          case "flow-seq-start":
            return {
              type: "flow-collection",
              offset: this.offset,
              indent: this.indent,
              start: this.sourceToken,
              items: [],
              end: []
            };
          case "seq-item-ind":
            return {
              type: "block-seq",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: [this.sourceToken] }]
            };
          case "explicit-key-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start2 = getFirstKeyStartProps(prev);
            start2.push(this.sourceToken);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: start2, explicitKey: true }]
            };
          }
          case "map-value-ind": {
            this.onKeyLine = true;
            const prev = getPrevProps(parent);
            const start2 = getFirstKeyStartProps(prev);
            return {
              type: "block-map",
              offset: this.offset,
              indent: this.indent,
              items: [{ start: start2, key: null, sep: [this.sourceToken] }]
            };
          }
        }
        return null;
      }
      atIndentedComment(start2, indent) {
        if (this.type !== "comment")
          return false;
        if (this.indent <= indent)
          return false;
        return start2.every((st) => st.type === "newline" || st.type === "space");
      }
      *documentEnd(docEnd) {
        if (this.type !== "doc-mode") {
          if (docEnd.end)
            docEnd.end.push(this.sourceToken);
          else
            docEnd.end = [this.sourceToken];
          if (this.type === "newline")
            yield* this.pop();
        }
      }
      *lineEnd(token) {
        switch (this.type) {
          case "comma":
          case "doc-start":
          case "doc-end":
          case "flow-seq-end":
          case "flow-map-end":
          case "map-value-ind":
            yield* this.pop();
            yield* this.step();
            break;
          case "newline":
            this.onKeyLine = false;
          // fallthrough
          case "space":
          case "comment":
          default:
            if (token.end)
              token.end.push(this.sourceToken);
            else
              token.end = [this.sourceToken];
            if (this.type === "newline")
              yield* this.pop();
        }
      }
    };
    exports.Parser = Parser2;
  }
});

// node_modules/yaml/dist/public-api.js
var require_public_api = __commonJS({
  "node_modules/yaml/dist/public-api.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var errors = require_errors();
    var log = require_log();
    var identity = require_identity();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    function parseOptions(options) {
      const prettyErrors = options.prettyErrors !== false;
      const lineCounter$1 = options.lineCounter || prettyErrors && new lineCounter.LineCounter() || null;
      return { lineCounter: lineCounter$1, prettyErrors };
    }
    function parseAllDocuments(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      const docs = Array.from(composer$1.compose(parser$1.parse(source)));
      if (prettyErrors && lineCounter2)
        for (const doc of docs) {
          doc.errors.forEach(errors.prettifyError(source, lineCounter2));
          doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
        }
      if (docs.length > 0)
        return docs;
      return Object.assign([], { empty: true }, composer$1.streamInfo());
    }
    function parseDocument(source, options = {}) {
      const { lineCounter: lineCounter2, prettyErrors } = parseOptions(options);
      const parser$1 = new parser.Parser(lineCounter2?.addNewLine);
      const composer$1 = new composer.Composer(options);
      let doc = null;
      for (const _doc of composer$1.compose(parser$1.parse(source), true, source.length)) {
        if (!doc)
          doc = _doc;
        else if (doc.options.logLevel !== "silent") {
          doc.errors.push(new errors.YAMLParseError(_doc.range.slice(0, 2), "MULTIPLE_DOCS", "Source contains multiple documents; please use YAML.parseAllDocuments()"));
          break;
        }
      }
      if (prettyErrors && lineCounter2) {
        doc.errors.forEach(errors.prettifyError(source, lineCounter2));
        doc.warnings.forEach(errors.prettifyError(source, lineCounter2));
      }
      return doc;
    }
    function parse2(src, reviver, options) {
      let _reviver = void 0;
      if (typeof reviver === "function") {
        _reviver = reviver;
      } else if (options === void 0 && reviver && typeof reviver === "object") {
        options = reviver;
      }
      const doc = parseDocument(src, options);
      if (!doc)
        return null;
      doc.warnings.forEach((warning) => log.warn(doc.options.logLevel, warning));
      if (doc.errors.length > 0) {
        if (doc.options.logLevel !== "silent")
          throw doc.errors[0];
        else
          doc.errors = [];
      }
      return doc.toJS(Object.assign({ reviver: _reviver }, options));
    }
    function stringify(value, replacer, options) {
      let _replacer = null;
      if (typeof replacer === "function" || Array.isArray(replacer)) {
        _replacer = replacer;
      } else if (options === void 0 && replacer) {
        options = replacer;
      }
      if (typeof options === "string")
        options = options.length;
      if (typeof options === "number") {
        const indent = Math.round(options);
        options = indent < 1 ? void 0 : indent > 8 ? { indent: 8 } : { indent };
      }
      if (value === void 0) {
        const { keepUndefined } = options ?? replacer ?? {};
        if (!keepUndefined)
          return void 0;
      }
      if (identity.isDocument(value) && !_replacer)
        return value.toString(options);
      return new Document.Document(value, _replacer, options).toString(options);
    }
    exports.parse = parse2;
    exports.parseAllDocuments = parseAllDocuments;
    exports.parseDocument = parseDocument;
    exports.stringify = stringify;
  }
});

// node_modules/yaml/dist/index.js
var require_dist = __commonJS({
  "node_modules/yaml/dist/index.js"(exports) {
    "use strict";
    var composer = require_composer();
    var Document = require_Document();
    var Schema = require_Schema();
    var errors = require_errors();
    var Alias = require_Alias();
    var identity = require_identity();
    var Pair = require_Pair();
    var Scalar = require_Scalar();
    var YAMLMap = require_YAMLMap();
    var YAMLSeq = require_YAMLSeq();
    var cst = require_cst();
    var lexer = require_lexer();
    var lineCounter = require_line_counter();
    var parser = require_parser();
    var publicApi = require_public_api();
    var visit = require_visit();
    exports.Composer = composer.Composer;
    exports.Document = Document.Document;
    exports.Schema = Schema.Schema;
    exports.YAMLError = errors.YAMLError;
    exports.YAMLParseError = errors.YAMLParseError;
    exports.YAMLWarning = errors.YAMLWarning;
    exports.Alias = Alias.Alias;
    exports.isAlias = identity.isAlias;
    exports.isCollection = identity.isCollection;
    exports.isDocument = identity.isDocument;
    exports.isMap = identity.isMap;
    exports.isNode = identity.isNode;
    exports.isPair = identity.isPair;
    exports.isScalar = identity.isScalar;
    exports.isSeq = identity.isSeq;
    exports.Pair = Pair.Pair;
    exports.Scalar = Scalar.Scalar;
    exports.YAMLMap = YAMLMap.YAMLMap;
    exports.YAMLSeq = YAMLSeq.YAMLSeq;
    exports.CST = cst;
    exports.Lexer = lexer.Lexer;
    exports.LineCounter = lineCounter.LineCounter;
    exports.Parser = parser.Parser;
    exports.parse = publicApi.parse;
    exports.parseAllDocuments = publicApi.parseAllDocuments;
    exports.parseDocument = publicApi.parseDocument;
    exports.stringify = publicApi.stringify;
    exports.visit = visit.visit;
    exports.visitAsync = visit.visitAsync;
  }
});

// node_modules/@pgsql/types/types.js
var require_types = __commonJS({
  "node_modules/@pgsql/types/types.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@pgsql/types/enums.js
var require_enums = __commonJS({
  "node_modules/@pgsql/types/enums.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
  }
});

// node_modules/@pgsql/types/index.js
var require_types2 = __commonJS({
  "node_modules/@pgsql/types/index.js"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(require_types(), exports);
    __exportStar(require_enums(), exports);
  }
});

// node_modules/libpg-query/wasm/libpg-query.js
var require_libpg_query = __commonJS({
  "node_modules/libpg-query/wasm/libpg-query.js"(exports, module2) {
    var PgQueryModule = (() => {
      var _scriptName2 = globalThis.document?.currentScript?.src;
      return async function(moduleArg2 = {}) {
        var Module4 = moduleArg2;
        var ENVIRONMENT_IS_WEB2 = !!globalThis.window;
        var ENVIRONMENT_IS_WORKER2 = !!globalThis.WorkerGlobalScope;
        var ENVIRONMENT_IS_NODE2 = globalThis.process?.versions?.node && globalThis.process?.type != "renderer";
        var programArgs = [];
        var thisProgram2 = "./this.program";
        var quit_2 = (status, toThrow) => {
          throw toThrow;
        };
        if (typeof __filename != "undefined") {
          _scriptName2 = __filename;
        } else if (ENVIRONMENT_IS_WORKER2) {
          _scriptName2 = self.location.href;
        }
        var scriptDirectory2 = "";
        function locateFile2(path) {
          if (Module4["locateFile"]) {
            return Module4["locateFile"](path, scriptDirectory2);
          }
          return scriptDirectory2 + path;
        }
        var readAsync2, readBinary2;
        if (ENVIRONMENT_IS_NODE2) {
          var fs2 = __require("node:fs");
          scriptDirectory2 = __dirname + "/";
          readBinary2 = (filename) => {
            filename = isFileURI2(filename) ? new URL(filename) : filename;
            var ret = fs2.readFileSync(filename);
            return ret;
          };
          readAsync2 = async (filename, binary2 = true) => {
            filename = isFileURI2(filename) ? new URL(filename) : filename;
            var ret = fs2.readFileSync(filename, binary2 ? void 0 : "utf8");
            return ret;
          };
          if (process.argv.length > 1) {
            thisProgram2 = process.argv[1].replace(/\\/g, "/");
          }
          programArgs = process.argv.slice(2);
          quit_2 = (status, toThrow) => {
            process.exitCode = status;
            throw toThrow;
          };
        } else if (ENVIRONMENT_IS_WEB2 || ENVIRONMENT_IS_WORKER2) {
          try {
            scriptDirectory2 = new URL(".", _scriptName2).href;
          } catch {
          }
          {
            if (ENVIRONMENT_IS_WORKER2) {
              readBinary2 = (url) => {
                var xhr = new XMLHttpRequest();
                xhr.open("GET", url, false);
                xhr.responseType = "arraybuffer";
                xhr.send(null);
                return new Uint8Array(xhr.response);
              };
            }
            readAsync2 = async (url) => {
              var response = await fetch(url, { credentials: "same-origin" });
              if (response.ok) {
                return response.arrayBuffer();
              }
              throw new Error(response.status + " : " + response.url);
            };
          }
        } else {
        }
        var out2 = console.log.bind(console);
        var err2 = console.error.bind(console);
        var wasmBinary2;
        var ABORT2 = false;
        var EXITSTATUS2;
        var isFileURI2 = (filename) => filename.startsWith("file://");
        class EmscriptenEH {
        }
        class EmscriptenSjLj extends EmscriptenEH {
        }
        var runtimeInitialized2 = false;
        function getMemoryBuffer() {
          return wasmMemory2.buffer;
        }
        function updateMemoryViews2() {
          if (HEAP82?.buffer?.resizable) return;
          var b = getMemoryBuffer();
          HEAP82 = new Int8Array(b);
          HEAP162 = new Int16Array(b);
          Module4["HEAPU8"] = HEAPU82 = new Uint8Array(b);
          HEAPU162 = new Uint16Array(b);
          HEAP322 = new Int32Array(b);
          Module4["HEAPU32"] = HEAPU322 = new Uint32Array(b);
          HEAPF322 = new Float32Array(b);
          HEAPF642 = new Float64Array(b);
          HEAP642 = new BigInt64Array(b);
          HEAPU642 = new BigUint64Array(b);
        }
        function preRun2() {
          var preRun3 = Module4["preRun"];
          if (preRun3) {
            if (typeof preRun3 == "function") preRun3 = [preRun3];
            onPreRuns2.push(...preRun3);
          }
          callRuntimeCallbacks2(onPreRuns2);
        }
        function initRuntime2() {
          runtimeInitialized2 = true;
          if (!Module4["noFSInit"] && !FS.initialized) FS.init();
          TTY.init();
          wasmExports2["A"]();
          FS.ignorePermissions = false;
        }
        function postRun2() {
          var postRun3 = Module4["postRun"];
          if (postRun3) {
            if (typeof postRun3 == "function") postRun3 = [postRun3];
            onPostRuns2.push(...postRun3);
          }
          callRuntimeCallbacks2(onPostRuns2);
        }
        function abort2(what) {
          Module4["onAbort"]?.(what);
          what = `Aborted(${what})`;
          err2(what);
          ABORT2 = true;
          what += ". Build with -sASSERTIONS for more info.";
          var e = new WebAssembly.RuntimeError(what);
          throw e;
        }
        var wasmBinaryFile2;
        function findWasmBinary2() {
          return locateFile2("libpg-query.wasm");
        }
        function getBinarySync2(file) {
          if (readBinary2) {
            return readBinary2(file);
          }
          throw "both async and sync fetching of the wasm failed";
        }
        async function getWasmBinary2(binaryFile) {
          if (!wasmBinary2) {
            try {
              var response = await readAsync2(binaryFile);
              return new Uint8Array(response);
            } catch {
            }
          }
          return getBinarySync2(binaryFile);
        }
        async function instantiateArrayBuffer2(binaryFile, imports) {
          try {
            var binary2 = await getWasmBinary2(binaryFile);
            var instance2 = await WebAssembly.instantiate(binary2, imports);
            return instance2;
          } catch (reason) {
            err2(`failed to asynchronously prepare wasm: ${reason}`);
            abort2(reason);
          }
        }
        async function instantiateAsync2(binary2, binaryFile, imports) {
          if (!binary2 && !ENVIRONMENT_IS_NODE2) {
            try {
              var response = fetch(binaryFile, { credentials: "same-origin" });
              var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
              return instantiationResult;
            } catch (reason) {
              err2(`wasm streaming compile failed: ${reason}`);
              err2("falling back to ArrayBuffer instantiation");
            }
          }
          return instantiateArrayBuffer2(binaryFile, imports);
        }
        function getWasmImports2() {
          var imports = { a: wasmImports2 };
          return imports;
        }
        async function createWasm2() {
          function receiveInstance(instance2) {
            wasmExports2 = instance2.exports;
            assignWasmExports2(wasmExports2);
            updateMemoryViews2();
            return wasmExports2;
          }
          function receiveInstantiationResult(result2) {
            return receiveInstance(result2["instance"]);
          }
          var info2 = getWasmImports2();
          var instantiateWasm = Module4["instantiateWasm"];
          if (instantiateWasm) {
            return new Promise((resolve2) => {
              instantiateWasm(info2, (inst) => resolve2(receiveInstance(inst)));
            });
          }
          wasmBinaryFile2 ??= findWasmBinary2();
          var result = await instantiateAsync2(wasmBinary2, wasmBinaryFile2, info2);
          var exports2 = receiveInstantiationResult(result);
          return exports2;
        }
        class ExitStatus2 {
          name = "ExitStatus";
          constructor(status) {
            this.message = `Program terminated with exit(${status})`;
            this.status = status;
          }
        }
        var HEAP162;
        var HEAP322;
        var HEAP642;
        var HEAP82;
        var HEAPF322;
        var HEAPF642;
        var HEAPU162;
        var HEAPU322;
        var HEAPU642;
        var HEAPU82;
        var callRuntimeCallbacks2 = (callbacks) => {
          while (callbacks.length > 0) {
            callbacks.shift()(Module4);
          }
        };
        var onPostRuns2 = [];
        var onPreRuns2 = [];
        function getValue2(ptr, type = "i8") {
          if (type.endsWith("*")) type = "*";
          switch (type) {
            case "i1":
              return HEAP82[ptr];
            case "i8":
              return HEAP82[ptr];
            case "i16":
              return HEAP162[ptr >> 1];
            case "i32":
              return HEAP322[ptr >> 2];
            case "i64":
              return HEAP642[ptr >> 3];
            case "float":
              return HEAPF322[ptr >> 2];
            case "double":
              return HEAPF642[ptr >> 3];
            case "*":
              return HEAPU322[ptr >> 2];
            default:
              abort2(`invalid type for getValue: ${type}`);
          }
        }
        var noExitRuntime2 = true;
        var stackRestore2 = (val) => __emscripten_stack_restore2(val);
        var stackSave2 = () => _emscripten_stack_get_current2();
        var UTF8Decoder2 = globalThis.TextDecoder && new TextDecoder();
        var findStringEnd2 = (heapOrArray, idx, maxBytesToRead, ignoreNul) => {
          var maxIdx = idx + maxBytesToRead;
          if (ignoreNul) return maxIdx;
          while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
          return idx;
        };
        var UTF8ArrayToString2 = (heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
          var endPtr = findStringEnd2(heapOrArray, idx, maxBytesToRead, ignoreNul);
          if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder2) {
            return UTF8Decoder2.decode(heapOrArray.subarray(idx, endPtr));
          }
          var str = "";
          while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
          return str;
        };
        var UTF8ToString2 = (ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString2(HEAPU82, ptr, maxBytesToRead, ignoreNul) : "";
        var ___assert_fail = (condition, filename, line, func2) => abort2(`Assertion failed: ${UTF8ToString2(condition)}, at: ` + [filename ? UTF8ToString2(filename) : "unknown filename", line, func2 ? UTF8ToString2(func2) : "unknown function"]);
        var __abort_js2 = () => abort2("");
        var runtimeKeepaliveCounter2 = 0;
        var __emscripten_runtime_keepalive_clear = () => {
          noExitRuntime2 = false;
          runtimeKeepaliveCounter2 = 0;
        };
        var __emscripten_throw_longjmp = () => {
          throw new EmscriptenSjLj();
        };
        var timers = {};
        var handleException2 = (e) => {
          if (e instanceof ExitStatus2 || e == "unwind") {
            return EXITSTATUS2;
          }
          quit_2(1, e);
        };
        var keepRuntimeAlive2 = () => noExitRuntime2 || runtimeKeepaliveCounter2 > 0;
        var _proc_exit2 = (code) => {
          EXITSTATUS2 = code;
          if (!keepRuntimeAlive2()) {
            Module4["onExit"]?.(code);
            ABORT2 = true;
          }
          quit_2(code, new ExitStatus2(code));
        };
        var exitJS2 = (status, implicit) => {
          EXITSTATUS2 = status;
          _proc_exit2(status);
        };
        var _exit = exitJS2;
        var maybeExit = () => {
          if (!keepRuntimeAlive2()) {
            try {
              _exit(EXITSTATUS2);
            } catch (e) {
              handleException2(e);
            }
          }
        };
        var callUserCallback = (func2) => {
          if (ABORT2) {
            return;
          }
          try {
            return func2();
          } catch (e) {
            handleException2(e);
          } finally {
            maybeExit();
          }
        };
        var _emscripten_get_now = () => performance.now();
        var __setitimer_js = (which, timeout_ms) => {
          if (timers[which]) {
            clearTimeout(timers[which].id);
            delete timers[which];
          }
          if (!timeout_ms) return 0;
          var id = setTimeout(() => {
            delete timers[which];
            callUserCallback(() => __emscripten_timeout(which, _emscripten_get_now()));
          }, timeout_ms);
          timers[which] = { id, timeout_ms };
          return 0;
        };
        var getHeapMax2 = () => 1073741824;
        var alignMemory2 = (size, alignment) => Math.ceil(size / alignment) * alignment;
        var growMemory2 = (size) => {
          var oldHeapSize = wasmMemory2.buffer.byteLength;
          var pages = (size - oldHeapSize + 65535) / 65536 | 0;
          try {
            wasmMemory2.grow(pages);
            updateMemoryViews2();
            return 1;
          } catch (e) {
          }
        };
        var _emscripten_resize_heap2 = (requestedSize) => {
          var oldSize = HEAPU82.length;
          requestedSize >>>= 0;
          var maxHeapSize = getHeapMax2();
          if (requestedSize > maxHeapSize) {
            return false;
          }
          for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
            var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
            overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
            var newSize = Math.min(maxHeapSize, alignMemory2(Math.max(requestedSize, overGrownHeapSize), 65536));
            var replacement = growMemory2(newSize);
            if (replacement) {
              return true;
            }
          }
          return false;
        };
        var PATH = { isAbs: (path) => path.charAt(0) === "/", splitPath: (filename) => {
          var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
          return splitPathRe.exec(filename).slice(1);
        }, normalizeArray: (parts2, allowAboveRoot) => {
          var up = 0;
          for (var i2 = parts2.length - 1; i2 >= 0; i2--) {
            var last = parts2[i2];
            if (last === ".") {
              parts2.splice(i2, 1);
            } else if (last === "..") {
              parts2.splice(i2, 1);
              up++;
            } else if (up) {
              parts2.splice(i2, 1);
              up--;
            }
          }
          if (allowAboveRoot) {
            for (; up; up--) {
              parts2.unshift("..");
            }
          }
          return parts2;
        }, normalize: (path) => {
          var isAbsolute = PATH.isAbs(path), trailingSlash = path.slice(-1) === "/";
          path = PATH.normalizeArray(path.split("/").filter((p) => !!p), !isAbsolute).join("/");
          if (!path && !isAbsolute) {
            path = ".";
          }
          if (path && trailingSlash) {
            path += "/";
          }
          return (isAbsolute ? "/" : "") + path;
        }, dirname: (path) => {
          var result = PATH.splitPath(path), root = result[0], dir = result[1];
          if (!root && !dir) {
            return ".";
          }
          if (dir) {
            dir = dir.slice(0, -1);
          }
          return root + dir;
        }, basename: (path) => path && path.match(/([^\/]+|\/)\/*$/)[1], join: (...paths) => PATH.normalize(paths.join("/")), join2: (l, r) => PATH.normalize(l + "/" + r) };
        var initRandomFill = () => {
          if (ENVIRONMENT_IS_NODE2) {
            var nodeCrypto = __require("node:crypto");
            return (view) => (nodeCrypto.randomFillSync(view), 0);
          }
          return (view) => (crypto.getRandomValues(view), 0);
        };
        var randomFill = (view) => (randomFill = initRandomFill())(view);
        var PATH_FS = { resolve: (...args2) => {
          var resolvedPath = "", resolvedAbsolute = false;
          for (var i2 = args2.length - 1; i2 >= -1 && !resolvedAbsolute; i2--) {
            var path = i2 >= 0 ? args2[i2] : FS.cwd();
            if (typeof path != "string") {
              throw new TypeError("Arguments to path.resolve must be strings");
            } else if (!path) {
              return "";
            }
            resolvedPath = path + "/" + resolvedPath;
            resolvedAbsolute = PATH.isAbs(path);
          }
          resolvedPath = PATH.normalizeArray(resolvedPath.split("/").filter((p) => !!p), !resolvedAbsolute).join("/");
          return (resolvedAbsolute ? "/" : "") + resolvedPath || ".";
        }, relative: (from, to) => {
          from = PATH_FS.resolve(from).slice(1);
          to = PATH_FS.resolve(to).slice(1);
          function trim(arr) {
            var start2 = 0;
            for (; start2 < arr.length; start2++) {
              if (arr[start2] !== "") break;
            }
            var end = arr.length - 1;
            for (; end >= 0; end--) {
              if (arr[end] !== "") break;
            }
            if (start2 > end) return [];
            return arr.slice(start2, end - start2 + 1);
          }
          var fromParts = trim(from.split("/"));
          var toParts = trim(to.split("/"));
          var length = Math.min(fromParts.length, toParts.length);
          var samePartsLength = length;
          for (var i2 = 0; i2 < length; i2++) {
            if (fromParts[i2] !== toParts[i2]) {
              samePartsLength = i2;
              break;
            }
          }
          var outputParts = [];
          for (var i2 = samePartsLength; i2 < fromParts.length; i2++) {
            outputParts.push("..");
          }
          outputParts = outputParts.concat(toParts.slice(samePartsLength));
          return outputParts.join("/");
        } };
        var FS_stdin_getChar_buffer = [];
        var lengthBytesUTF82 = (str) => {
          var len = 0;
          for (var i2 = 0; i2 < str.length; ++i2) {
            var c = str.charCodeAt(i2);
            if (c <= 127) {
              len++;
            } else if (c <= 2047) {
              len += 2;
            } else if (c >= 55296 && c <= 57343) {
              len += 4;
              ++i2;
            } else {
              len += 3;
            }
          }
          return len;
        };
        var stringToUTF8Array2 = (str, heap, outIdx, maxBytesToWrite) => {
          if (!(maxBytesToWrite > 0)) return 0;
          var startIdx = outIdx;
          var endIdx = outIdx + maxBytesToWrite - 1;
          for (var i2 = 0; i2 < str.length; ++i2) {
            var u = str.codePointAt(i2);
            if (u <= 127) {
              if (outIdx >= endIdx) break;
              heap[outIdx++] = u;
            } else if (u <= 2047) {
              if (outIdx + 1 >= endIdx) break;
              heap[outIdx++] = 192 | u >> 6;
              heap[outIdx++] = 128 | u & 63;
            } else if (u <= 65535) {
              if (outIdx + 2 >= endIdx) break;
              heap[outIdx++] = 224 | u >> 12;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
            } else {
              if (outIdx + 3 >= endIdx) break;
              heap[outIdx++] = 240 | u >> 18;
              heap[outIdx++] = 128 | u >> 12 & 63;
              heap[outIdx++] = 128 | u >> 6 & 63;
              heap[outIdx++] = 128 | u & 63;
              i2++;
            }
          }
          heap[outIdx] = 0;
          return outIdx - startIdx;
        };
        var intArrayFromString = (stringy, dontAddNull, length) => {
          var len = length > 0 ? length : lengthBytesUTF82(stringy) + 1;
          var u8array = new Array(len);
          var numBytesWritten = stringToUTF8Array2(stringy, u8array, 0, u8array.length);
          if (dontAddNull) u8array.length = numBytesWritten;
          return u8array;
        };
        var FS_stdin_getChar = () => {
          if (!FS_stdin_getChar_buffer.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE2) {
              var BUFSIZE = 256;
              var buf = Buffer.alloc(BUFSIZE);
              var bytesRead = 0;
              var fd = process.stdin.fd;
              try {
                bytesRead = fs2.readSync(fd, buf, 0, BUFSIZE);
              } catch (e) {
                if (e.toString().includes("EOF")) bytesRead = 0;
                else throw e;
              }
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString("utf-8");
              }
            } else if (globalThis.window?.prompt) {
              result = window.prompt("Input: ");
              if (result !== null) {
                result += "\n";
              }
            } else {
            }
            if (!result) {
              return null;
            }
            FS_stdin_getChar_buffer = intArrayFromString(result, true);
          }
          return FS_stdin_getChar_buffer.shift();
        };
        var TTY = { ttys: [], init() {
        }, shutdown() {
        }, register(dev, ops) {
          TTY.ttys[dev] = { input: [], output: [], ops };
          FS.registerDevice(dev, TTY.stream_ops);
        }, stream_ops: { open(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        }, close(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, fsync(stream) {
          stream.tty.ops.fsync(stream.tty);
        }, read(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i2 = 0; i2 < length; i2++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === void 0 && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === void 0) break;
            bytesRead++;
            buffer[offset + i2] = result;
          }
          if (bytesRead) {
            stream.node.atime = Date.now();
          }
          return bytesRead;
        }, write(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i2 = 0; i2 < length; i2++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset + i2]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.mtime = stream.node.ctime = Date.now();
          }
          return i2;
        } }, default_tty_ops: { get_char(tty) {
          return FS_stdin_getChar();
        }, put_char(tty, val) {
          if (val === null || val === 10) {
            out2(UTF8ArrayToString2(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            out2(UTF8ArrayToString2(tty.output));
            tty.output = [];
          }
        }, ioctl_tcgets(tty) {
          return { c_iflag: 25856, c_oflag: 5, c_cflag: 191, c_lflag: 35387, c_cc: [3, 28, 127, 21, 4, 0, 1, 0, 17, 19, 26, 0, 18, 15, 23, 22, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0] };
        }, ioctl_tcsets(tty, optional_actions, data) {
          return 0;
        }, ioctl_tiocgwinsz(tty) {
          return [24, 80];
        } }, default_tty1_ops: { put_char(tty, val) {
          if (val === null || val === 10) {
            err2(UTF8ArrayToString2(tty.output));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        }, fsync(tty) {
          if (tty.output?.length > 0) {
            err2(UTF8ArrayToString2(tty.output));
            tty.output = [];
          }
        } } };
        var mmapAlloc = (size) => {
          abort2();
        };
        var MEMFS = { ops_table: null, mount(mount) {
          return MEMFS.createNode(null, "/", 16895, 0);
        }, createNode(parent, name2, mode, dev) {
          if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
            throw new FS.ErrnoError(63);
          }
          MEMFS.ops_table ||= { dir: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, lookup: MEMFS.node_ops.lookup, mknod: MEMFS.node_ops.mknod, rename: MEMFS.node_ops.rename, unlink: MEMFS.node_ops.unlink, rmdir: MEMFS.node_ops.rmdir, readdir: MEMFS.node_ops.readdir, symlink: MEMFS.node_ops.symlink }, stream: { llseek: MEMFS.stream_ops.llseek } }, file: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: { llseek: MEMFS.stream_ops.llseek, read: MEMFS.stream_ops.read, write: MEMFS.stream_ops.write, mmap: MEMFS.stream_ops.mmap, msync: MEMFS.stream_ops.msync } }, link: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr, readlink: MEMFS.node_ops.readlink }, stream: {} }, chrdev: { node: { getattr: MEMFS.node_ops.getattr, setattr: MEMFS.node_ops.setattr }, stream: FS.chrdev_stream_ops } };
          var node = FS.createNode(parent, name2, mode, dev);
          if (FS.isDir(node.mode)) {
            node.node_ops = MEMFS.ops_table.dir.node;
            node.stream_ops = MEMFS.ops_table.dir.stream;
            node.contents = {};
          } else if (FS.isFile(node.mode)) {
            node.node_ops = MEMFS.ops_table.file.node;
            node.stream_ops = MEMFS.ops_table.file.stream;
            node.usedBytes = 0;
            node.contents = MEMFS.emptyFileContents ??= new Uint8Array(0);
          } else if (FS.isLink(node.mode)) {
            node.node_ops = MEMFS.ops_table.link.node;
            node.stream_ops = MEMFS.ops_table.link.stream;
          } else if (FS.isChrdev(node.mode)) {
            node.node_ops = MEMFS.ops_table.chrdev.node;
            node.stream_ops = MEMFS.ops_table.chrdev.stream;
          }
          node.atime = node.mtime = node.ctime = Date.now();
          if (parent) {
            parent.contents[name2] = node;
            parent.atime = parent.mtime = parent.ctime = node.atime;
          }
          return node;
        }, getFileDataAsTypedArray(node) {
          return node.contents.subarray(0, node.usedBytes);
        }, expandFileStorage(node, newCapacity) {
          var prevCapacity = node.contents.length;
          if (prevCapacity >= newCapacity) return;
          var CAPACITY_DOUBLING_MAX = 1024 * 1024;
          newCapacity = Math.max(newCapacity, prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2 : 1.125) >>> 0);
          if (prevCapacity) newCapacity = Math.max(newCapacity, 256);
          var oldContents = MEMFS.getFileDataAsTypedArray(node);
          node.contents = new Uint8Array(newCapacity);
          node.contents.set(oldContents);
        }, resizeFileStorage(node, newSize) {
          if (node.usedBytes == newSize) return;
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize);
          node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes)));
          node.usedBytes = newSize;
        }, node_ops: { getattr(node) {
          var attr = {};
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.atime);
          attr.mtime = new Date(node.mtime);
          attr.ctime = new Date(node.ctime);
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        }, setattr(node, attr) {
          for (const key of ["mode", "atime", "mtime", "ctime"]) {
            if (attr[key] != null) {
              node[key] = attr[key];
            }
          }
          if (attr.size !== void 0) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        }, lookup(parent, name2) {
          if (!MEMFS.doesNotExistError) {
            MEMFS.doesNotExistError = new FS.ErrnoError(44);
            MEMFS.doesNotExistError.stack = "<generic error, no stack>";
          }
          throw MEMFS.doesNotExistError;
        }, mknod(parent, name2, mode, dev) {
          return MEMFS.createNode(parent, name2, mode, dev);
        }, rename(old_node, new_dir, new_name) {
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (new_node) {
            if (FS.isDir(old_node.mode)) {
              for (var i2 in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
            FS.hashRemoveNode(new_node);
          }
          delete old_node.parent.contents[old_node.name];
          new_dir.contents[new_name] = old_node;
          old_node.name = new_name;
          new_dir.ctime = new_dir.mtime = old_node.parent.ctime = old_node.parent.mtime = Date.now();
        }, unlink(parent, name2) {
          delete parent.contents[name2];
          parent.ctime = parent.mtime = Date.now();
        }, rmdir(parent, name2) {
          var node = FS.lookupNode(parent, name2);
          for (var i2 in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name2];
          parent.ctime = parent.mtime = Date.now();
        }, readdir(node) {
          return [".", "..", ...Object.keys(node.contents)];
        }, symlink(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 | 40960, 0);
          node.link = oldpath;
          return node;
        }, readlink(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        } }, stream_ops: { read(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          buffer.set(contents.subarray(position, position + size), offset);
          return size;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (buffer.buffer === HEAP82.buffer) {
            canOwn = false;
          }
          if (!length) return 0;
          var node = stream.node;
          node.mtime = node.ctime = Date.now();
          if (canOwn) {
            node.contents = buffer.subarray(offset, offset + length);
            node.usedBytes = length;
          } else if (node.usedBytes === 0 && position === 0) {
            node.contents = buffer.slice(offset, offset + length);
            node.usedBytes = length;
          } else {
            MEMFS.expandFileStorage(node, position + length);
            node.contents.set(buffer.subarray(offset, offset + length), position);
            node.usedBytes = Math.max(node.usedBytes, position + length);
          }
          return length;
        }, llseek(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        }, mmap(stream, length, position, prot, flags2) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          if (!(flags2 & 2) && contents.buffer === HEAP82.buffer) {
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            allocated = true;
            ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            if (contents) {
              if (position > 0 || position + length < contents.length) {
                if (contents.subarray) {
                  contents = contents.subarray(position, position + length);
                } else {
                  contents = Array.prototype.slice.call(contents, position, position + length);
                }
              }
              HEAP82.set(contents, ptr);
            }
          }
          return { ptr, allocated };
        }, msync(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          return 0;
        } } };
        var FS_modeStringToFlags = (str) => {
          if (typeof str != "string") return str;
          var flagModes = { r: 0, "r+": 2, w: 512 | 64 | 1, "w+": 512 | 64 | 2, a: 1024 | 64 | 1, "a+": 1024 | 64 | 2 };
          var flags2 = flagModes[str];
          if (typeof flags2 == "undefined") {
            throw new Error(`Unknown file open mode: ${str}`);
          }
          return flags2;
        };
        var FS_fileDataToTypedArray = (data) => {
          if (typeof data == "string") {
            data = intArrayFromString(data, true);
          }
          if (!data.subarray) {
            data = new Uint8Array(data);
          }
          return data;
        };
        var FS_getMode = (canRead, canWrite) => {
          var mode = 0;
          if (canRead) mode |= 292 | 73;
          if (canWrite) mode |= 146;
          return mode;
        };
        var asyncLoad2 = async (url) => {
          var arrayBuffer = await readAsync2(url);
          return new Uint8Array(arrayBuffer);
        };
        var FS_createDataFile = (...args2) => FS.createDataFile(...args2);
        var getUniqueRunDependency = (id) => id;
        var dependenciesPromise = null;
        var resolveRunDependencies = async () => dependenciesPromise;
        var runDependencies2 = 0;
        var dependenciesPromiseResolve = null;
        var removeRunDependency2 = (id) => {
          runDependencies2--;
          Module4["monitorRunDependencies"]?.(runDependencies2);
          if (!runDependencies2) {
            dependenciesPromiseResolve();
          }
        };
        var addRunDependency2 = (id) => {
          if (!runDependencies2) {
            dependenciesPromise = new Promise((resolve2) => dependenciesPromiseResolve = resolve2);
          }
          runDependencies2++;
          Module4["monitorRunDependencies"]?.(runDependencies2);
        };
        var preloadPlugins = [];
        var FS_handledByPreloadPlugin = async (byteArray, fullname) => {
          if (typeof Browser != "undefined") Browser.init();
          for (var plugin of preloadPlugins) {
            if (plugin["canHandle"](fullname)) {
              return plugin["handle"](byteArray, fullname);
            }
          }
          return byteArray;
        };
        var FS_preloadFile = async (parent, name2, url, canRead, canWrite, dontCreateFile, canOwn, preFinish) => {
          var fullname = name2 ? PATH_FS.resolve(PATH.join2(parent, name2)) : parent;
          var dep = getUniqueRunDependency(`cp ${fullname}`);
          addRunDependency2(dep);
          try {
            var byteArray = url;
            if (typeof url == "string") {
              byteArray = await asyncLoad2(url);
            }
            byteArray = await FS_handledByPreloadPlugin(byteArray, fullname);
            preFinish?.();
            if (!dontCreateFile) {
              FS_createDataFile(parent, name2, byteArray, canRead, canWrite, canOwn);
            }
          } finally {
            removeRunDependency2(dep);
          }
        };
        var FS_createPreloadedFile = (parent, name2, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
          FS_preloadFile(parent, name2, url, canRead, canWrite, dontCreateFile, canOwn, preFinish).then(onload).catch(onerror);
        };
        var FS = { root: null, mounts: [], devices: {}, streams: [], nextInode: 1, nameTable: null, currentPath: "/", initialized: false, ignorePermissions: true, filesystems: null, syncFSRequests: 0, ErrnoError: class {
          name = "ErrnoError";
          constructor(errno) {
            this.errno = errno;
          }
        }, FSStream: class {
          shared = {};
          get object() {
            return this.node;
          }
          set object(val) {
            this.node = val;
          }
          get isRead() {
            return (this.flags & 2097155) !== 1;
          }
          get isWrite() {
            return (this.flags & 2097155) !== 0;
          }
          get isAppend() {
            return this.flags & 1024;
          }
          get flags() {
            return this.shared.flags;
          }
          set flags(val) {
            this.shared.flags = val;
          }
          get position() {
            return this.shared.position;
          }
          set position(val) {
            this.shared.position = val;
          }
        }, FSNode: class {
          node_ops = {};
          stream_ops = {};
          readMode = 292 | 73;
          writeMode = 146;
          mounted = null;
          constructor(parent, name2, mode, rdev) {
            if (!parent) {
              parent = this;
            }
            this.parent = parent;
            this.mount = parent.mount;
            this.id = FS.nextInode++;
            this.name = name2;
            this.mode = mode;
            this.rdev = rdev;
            this.atime = this.mtime = this.ctime = Date.now();
          }
          get read() {
            return (this.mode & this.readMode) === this.readMode;
          }
          set read(val) {
            val ? this.mode |= this.readMode : this.mode &= ~this.readMode;
          }
          get write() {
            return (this.mode & this.writeMode) === this.writeMode;
          }
          set write(val) {
            val ? this.mode |= this.writeMode : this.mode &= ~this.writeMode;
          }
          get isFolder() {
            return FS.isDir(this.mode);
          }
          get isDevice() {
            return FS.isChrdev(this.mode);
          }
          addListener(cb, exclusive = false) {
            var entry = { cb, exclusive };
            var listeners = this.listeners ??= /* @__PURE__ */ new Set();
            listeners.add(entry);
            return { listeners, entry };
          }
          notifyListeners(flags2) {
            if (!this.listeners) return;
            var excl;
            for (var entry of this.listeners) {
              if (entry.exclusive) (excl ||= []).push(entry);
              else entry.cb(flags2);
            }
            if (excl) {
              var i2 = (this.exclTurn || 0) % excl.length;
              this.exclTurn = i2 + 1;
              excl[i2].cb(flags2);
            }
          }
        }, lookupPath(path, opts = {}) {
          if (!path) {
            throw new FS.ErrnoError(44);
          }
          opts.follow_mount ??= true;
          if (!PATH.isAbs(path)) {
            path = FS.cwd() + "/" + path;
          }
          linkloop: for (var nlinks = 0; nlinks < 40; nlinks++) {
            var parts2 = path.split("/").filter((p) => !!p);
            var current = FS.root;
            var current_path = "/";
            for (var i2 = 0; i2 < parts2.length; i2++) {
              var islast = i2 === parts2.length - 1;
              if (islast && opts.parent) {
                break;
              }
              if (parts2[i2] === ".") {
                continue;
              }
              if (parts2[i2] === "..") {
                current_path = PATH.dirname(current_path);
                if (FS.isRoot(current)) {
                  path = current_path + "/" + parts2.slice(i2 + 1).join("/");
                  nlinks--;
                  continue linkloop;
                } else {
                  current = current.parent;
                }
                continue;
              }
              current_path = PATH.join2(current_path, parts2[i2]);
              try {
                current = FS.lookupNode(current, parts2[i2]);
              } catch (e) {
                if (e?.errno === 44 && islast && opts.noent_okay) {
                  return { path: current_path };
                }
                throw e;
              }
              if (FS.isMountpoint(current) && (!islast || opts.follow_mount)) {
                current = current.mounted.root;
              }
              if (FS.isLink(current.mode) && (!islast || opts.follow)) {
                if (!current.node_ops.readlink) {
                  throw new FS.ErrnoError(52);
                }
                var link = current.node_ops.readlink(current);
                if (!PATH.isAbs(link)) {
                  link = PATH.dirname(current_path) + "/" + link;
                }
                path = link + "/" + parts2.slice(i2 + 1).join("/");
                continue linkloop;
              }
            }
            return { path: current_path, node: current };
          }
          throw new FS.ErrnoError(32);
        }, getPath(node) {
          var path;
          while (true) {
            if (FS.isRoot(node)) {
              var mount = node.mount.mountpoint;
              if (!path) return mount;
              return mount[mount.length - 1] !== "/" ? `${mount}/${path}` : mount + path;
            }
            path = path ? `${node.name}/${path}` : node.name;
            node = node.parent;
          }
        }, hashName(parentid, name2) {
          var hash = 0;
          for (var i2 = 0; i2 < name2.length; i2++) {
            hash = (hash << 5) - hash + name2.charCodeAt(i2) | 0;
          }
          return (parentid + hash >>> 0) % FS.nameTable.length;
        }, hashAddNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          node.name_next = FS.nameTable[hash];
          FS.nameTable[hash] = node;
        }, hashRemoveNode(node) {
          var hash = FS.hashName(node.parent.id, node.name);
          if (FS.nameTable[hash] === node) {
            FS.nameTable[hash] = node.name_next;
          } else {
            var current = FS.nameTable[hash];
            while (current) {
              if (current.name_next === node) {
                current.name_next = node.name_next;
                break;
              }
              current = current.name_next;
            }
          }
        }, lookupNode(parent, name2) {
          var errCode = FS.mayLookup(parent);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          var hash = FS.hashName(parent.id, name2);
          for (var node = FS.nameTable[hash]; node; node = node.name_next) {
            var nodeName = node.name;
            if (node.parent.id === parent.id && nodeName === name2) {
              return node;
            }
          }
          return FS.lookup(parent, name2);
        }, createNode(parent, name2, mode, rdev) {
          var node = new FS.FSNode(parent, name2, mode, rdev);
          FS.hashAddNode(node);
          return node;
        }, destroyNode(node) {
          FS.hashRemoveNode(node);
        }, isRoot(node) {
          return node === node.parent;
        }, isMountpoint(node) {
          return !!node.mounted;
        }, isFile(mode) {
          return (mode & 61440) === 32768;
        }, isDir(mode) {
          return (mode & 61440) === 16384;
        }, isLink(mode) {
          return (mode & 61440) === 40960;
        }, isChrdev(mode) {
          return (mode & 61440) === 8192;
        }, isBlkdev(mode) {
          return (mode & 61440) === 24576;
        }, isFIFO(mode) {
          return (mode & 61440) === 4096;
        }, isSocket(mode) {
          return (mode & 49152) === 49152;
        }, flagsToPermissionString(flag) {
          var perms = ["r", "w", "rw"][flag & 3];
          if (flag & 512) {
            perms += "w";
          }
          return perms;
        }, nodePermissions(node, perms) {
          if (FS.ignorePermissions) {
            return 0;
          }
          if (perms.includes("r") && !(node.mode & 292)) {
            return 2;
          }
          if (perms.includes("w") && !(node.mode & 146)) {
            return 2;
          }
          if (perms.includes("x") && !(node.mode & 73)) {
            return 2;
          }
          return 0;
        }, mayLookup(dir) {
          if (!FS.isDir(dir.mode)) return 54;
          var errCode = FS.nodePermissions(dir, "x");
          if (errCode) return errCode;
          if (!dir.node_ops.lookup) return 2;
          return 0;
        }, mayCreate(dir, name2) {
          if (!FS.isDir(dir.mode)) {
            return 54;
          }
          try {
            var node = FS.lookupNode(dir, name2);
            return 20;
          } catch (e) {
          }
          return FS.nodePermissions(dir, "wx");
        }, mayDelete(dir, name2, isdir) {
          var node;
          try {
            node = FS.lookupNode(dir, name2);
          } catch (e) {
            return e.errno;
          }
          var errCode = FS.nodePermissions(dir, "wx");
          if (errCode) {
            return errCode;
          }
          if (isdir) {
            if (!FS.isDir(node.mode)) {
              return 54;
            }
            if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
              return 10;
            }
          } else if (FS.isDir(node.mode)) {
            return 31;
          }
          return 0;
        }, mayOpen(node, flags2) {
          if (!node) {
            return 44;
          }
          if (FS.isLink(node.mode)) {
            return 32;
          }
          var mode = FS.flagsToPermissionString(flags2);
          if (FS.isDir(node.mode)) {
            if (mode !== "r" || flags2 & (512 | 64)) {
              return 31;
            }
          }
          return FS.nodePermissions(node, mode);
        }, checkOpExists(op, err3) {
          if (!op) {
            throw new FS.ErrnoError(err3);
          }
          return op;
        }, MAX_OPEN_FDS: 4096, nextfd() {
          for (var fd = 0; fd <= FS.MAX_OPEN_FDS; fd++) {
            if (!FS.streams[fd]) {
              return fd;
            }
          }
          throw new FS.ErrnoError(33);
        }, getStreamChecked(fd) {
          var stream = FS.getStream(fd);
          if (!stream) {
            throw new FS.ErrnoError(8);
          }
          return stream;
        }, getStream: (fd) => FS.streams[fd], createStream(stream, fd = -1) {
          stream = Object.assign(new FS.FSStream(), stream);
          if (fd == -1) {
            fd = FS.nextfd();
          }
          stream.fd = fd;
          FS.streams[fd] = stream;
          return stream;
        }, closeStream(fd) {
          FS.streams[fd] = null;
        }, dupStream(origStream, fd = -1) {
          var stream = FS.createStream(origStream, fd);
          stream.stream_ops?.dup?.(stream);
          return stream;
        }, doSetAttr(stream, node, attr) {
          var setattr = stream?.stream_ops.setattr;
          var arg = setattr ? stream : node;
          setattr ??= node.node_ops.setattr;
          FS.checkOpExists(setattr, 63);
          try {
            setattr(arg, attr);
          } catch (e) {
            if (e instanceof RangeError) {
              throw new FS.ErrnoError(22);
            }
            throw e;
          }
        }, chrdev_stream_ops: { open(stream) {
          var device = FS.getDevice(stream.node.rdev);
          stream.stream_ops = device.stream_ops;
          stream.stream_ops.open?.(stream);
        }, llseek() {
          throw new FS.ErrnoError(70);
        } }, major: (dev) => dev >> 8, minor: (dev) => dev & 255, makedev: (ma, mi) => ma << 8 | mi, registerDevice(dev, ops) {
          FS.devices[dev] = { stream_ops: ops };
        }, getDevice: (dev) => FS.devices[dev], getMounts(mount) {
          var mounts = [];
          var check = [mount];
          while (check.length) {
            var m = check.pop();
            mounts.push(m);
            check.push(...m.mounts);
          }
          return mounts;
        }, syncfs(populate, callback) {
          if (typeof populate == "function") {
            callback = populate;
            populate = false;
          }
          FS.syncFSRequests++;
          if (FS.syncFSRequests > 1) {
            err2(`warning: ${FS.syncFSRequests} FS.syncfs operations in flight at once, probably just doing extra work`);
          }
          var mounts = FS.getMounts(FS.root.mount);
          var completed = 0;
          function doCallback(errCode) {
            FS.syncFSRequests--;
            return callback(errCode);
          }
          function done(errCode) {
            if (errCode) {
              if (!done.errored) {
                done.errored = true;
                return doCallback(errCode);
              }
              return;
            }
            if (++completed >= mounts.length) {
              doCallback(null);
            }
          }
          for (var mount of mounts) {
            if (mount.type.syncfs) {
              mount.type.syncfs(mount, populate, done);
            } else {
              done(null);
            }
          }
        }, mount(type, opts, mountpoint) {
          var root = mountpoint === "/";
          var pseudo = !mountpoint;
          var node;
          if (root && FS.root) {
            throw new FS.ErrnoError(10);
          } else if (!root && !pseudo) {
            var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
            mountpoint = lookup.path;
            node = lookup.node;
            if (FS.isMountpoint(node)) {
              throw new FS.ErrnoError(10);
            }
            if (!FS.isDir(node.mode)) {
              throw new FS.ErrnoError(54);
            }
          }
          var mount = { type, opts, mountpoint, mounts: [] };
          var mountRoot = type.mount(mount);
          mountRoot.mount = mount;
          mount.root = mountRoot;
          if (root) {
            FS.root = mountRoot;
          } else if (node) {
            node.mounted = mount;
            if (node.mount) {
              node.mount.mounts.push(mount);
            }
          }
          return mountRoot;
        }, unmount(mountpoint) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
          if (!FS.isMountpoint(lookup.node)) {
            throw new FS.ErrnoError(28);
          }
          var node = lookup.node;
          var mount = node.mounted;
          var mounts = FS.getMounts(mount);
          for (var [hash, current] of Object.entries(FS.nameTable)) {
            while (current) {
              var next = current.name_next;
              if (mounts.includes(current.mount)) {
                FS.destroyNode(current);
              }
              current = next;
            }
          }
          node.mounted = null;
          var idx = node.mount.mounts.indexOf(mount);
          node.mount.mounts.splice(idx, 1);
        }, lookup(parent, name2) {
          return parent.node_ops.lookup(parent, name2);
        }, mknod(path, mode, dev) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name2 = PATH.basename(path);
          if (!name2) {
            throw new FS.ErrnoError(28);
          }
          if (name2 === "." || name2 === "..") {
            throw new FS.ErrnoError(20);
          }
          var errCode = FS.mayCreate(parent, name2);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.mknod) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.mknod(parent, name2, mode, dev);
        }, statfs(path) {
          return FS.statfsNode(FS.lookupPath(path, { follow: true }).node);
        }, statfsStream(stream) {
          return FS.statfsNode(stream.node);
        }, statfsNode(node) {
          var rtn = { bsize: 4096, frsize: 4096, blocks: 1e6, bfree: 5e5, bavail: 5e5, files: FS.nextInode, ffree: FS.nextInode - 1, fsid: 42, flags: 2, namelen: 255 };
          if (node.node_ops.statfs) {
            Object.assign(rtn, node.node_ops.statfs(node.mount.opts.root));
          }
          return rtn;
        }, create(path, mode = 438) {
          mode &= 4095;
          mode |= 32768;
          return FS.mknod(path, mode, 0);
        }, mkdir(path, mode = 511) {
          mode &= 511 | 512;
          mode |= 16384;
          return FS.mknod(path, mode, 0);
        }, mkdirTree(path, mode) {
          var dirs = path.split("/");
          var d = "";
          for (var dir of dirs) {
            if (!dir) continue;
            if (d || PATH.isAbs(path)) d += "/";
            d += dir;
            try {
              FS.mkdir(d, mode);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
          }
        }, mkdev(path, mode, dev) {
          if (typeof dev == "undefined") {
            dev = mode;
            mode = 438;
          }
          mode |= 8192;
          return FS.mknod(path, mode, dev);
        }, symlink(oldpath, newpath) {
          if (!PATH_FS.resolve(oldpath)) {
            throw new FS.ErrnoError(44);
          }
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.symlink) {
            throw new FS.ErrnoError(63);
          }
          return parent.node_ops.symlink(parent, newname, oldpath);
        }, link(oldpath, newpath, flags2) {
          var lookup = FS.lookupPath(newpath, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var newname = PATH.basename(newpath);
          var errCode = FS.mayCreate(parent, newname);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.link) {
            throw new FS.ErrnoError(34);
          }
          return parent.node_ops.link(parent, newname, oldpath, flags2);
        }, rename(old_path, new_path) {
          var old_dirname = PATH.dirname(old_path);
          var new_dirname = PATH.dirname(new_path);
          var old_name = PATH.basename(old_path);
          var new_name = PATH.basename(new_path);
          var lookup, old_dir, new_dir;
          lookup = FS.lookupPath(old_path, { parent: true });
          old_dir = lookup.node;
          lookup = FS.lookupPath(new_path, { parent: true });
          new_dir = lookup.node;
          if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
          if (old_dir.mount !== new_dir.mount) {
            throw new FS.ErrnoError(75);
          }
          var old_node = FS.lookupNode(old_dir, old_name);
          var relative3 = PATH_FS.relative(old_path, new_dirname);
          if (relative3.charAt(0) !== ".") {
            throw new FS.ErrnoError(28);
          }
          relative3 = PATH_FS.relative(new_path, old_dirname);
          if (relative3.charAt(0) !== ".") {
            throw new FS.ErrnoError(55);
          }
          var new_node;
          try {
            new_node = FS.lookupNode(new_dir, new_name);
          } catch (e) {
          }
          if (old_node === new_node) {
            return;
          }
          var isdir = FS.isDir(old_node.mode);
          var errCode = FS.mayDelete(old_dir, old_name, isdir);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          errCode = new_node ? FS.mayDelete(new_dir, new_name, isdir) : FS.mayCreate(new_dir, new_name);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!old_dir.node_ops.rename) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(old_node) || new_node && FS.isMountpoint(new_node)) {
            throw new FS.ErrnoError(10);
          }
          if (new_dir !== old_dir) {
            errCode = FS.nodePermissions(old_dir, "w");
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          FS.hashRemoveNode(old_node);
          try {
            old_dir.node_ops.rename(old_node, new_dir, new_name);
            old_node.parent = new_dir;
          } catch (e) {
            throw e;
          } finally {
            FS.hashAddNode(old_node);
          }
        }, rmdir(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          var name2 = PATH.basename(path);
          var node = FS.lookupNode(parent, name2);
          var errCode = FS.mayDelete(parent, name2, true);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.rmdir) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.rmdir(parent, name2);
          FS.destroyNode(node);
        }, readdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          var node = lookup.node;
          var readdir = FS.checkOpExists(node.node_ops.readdir, 54);
          return readdir(node);
        }, unlink(path) {
          var lookup = FS.lookupPath(path, { parent: true });
          var parent = lookup.node;
          if (!parent) {
            throw new FS.ErrnoError(44);
          }
          var name2 = PATH.basename(path);
          var node = FS.lookupNode(parent, name2);
          var errCode = FS.mayDelete(parent, name2, false);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          if (!parent.node_ops.unlink) {
            throw new FS.ErrnoError(63);
          }
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
          parent.node_ops.unlink(parent, name2);
          FS.destroyNode(node);
        }, readlink(path) {
          var lookup = FS.lookupPath(path);
          var link = lookup.node;
          if (!link) {
            throw new FS.ErrnoError(44);
          }
          if (!link.node_ops.readlink) {
            throw new FS.ErrnoError(28);
          }
          return link.node_ops.readlink(link);
        }, stat(path, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          var node = lookup.node;
          var getattr = FS.checkOpExists(node.node_ops.getattr, 63);
          return getattr(node);
        }, fstat(fd) {
          var stream = FS.getStreamChecked(fd);
          var node = stream.node;
          var getattr = stream.stream_ops.getattr;
          var arg = getattr ? stream : node;
          getattr ??= node.node_ops.getattr;
          FS.checkOpExists(getattr, 63);
          return getattr(arg);
        }, lstat(path) {
          return FS.stat(path, true);
        }, doChmod(stream, node, mode, dontFollow) {
          FS.doSetAttr(stream, node, { mode: mode & 4095 | node.mode & ~4095, ctime: Date.now(), dontFollow });
        }, chmod(path, mode, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChmod(null, node, mode, dontFollow);
        }, lchmod(path, mode) {
          FS.chmod(path, mode, true);
        }, fchmod(fd, mode) {
          var stream = FS.getStreamChecked(fd);
          FS.doChmod(stream, stream.node, mode, false);
        }, doChown(stream, node, dontFollow) {
          FS.doSetAttr(stream, node, { timestamp: Date.now(), dontFollow });
        }, chown(path, uid, gid, dontFollow) {
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: !dontFollow });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doChown(null, node, dontFollow);
        }, lchown(path, uid, gid) {
          FS.chown(path, uid, gid, true);
        }, fchown(fd, uid, gid) {
          var stream = FS.getStreamChecked(fd);
          FS.doChown(stream, stream.node, false);
        }, doTruncate(stream, node, len) {
          if (FS.isDir(node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!FS.isFile(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          var errCode = FS.nodePermissions(node, "w");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.doSetAttr(stream, node, { size: len, timestamp: Date.now() });
        }, truncate(path, len) {
          if (len < 0) {
            throw new FS.ErrnoError(28);
          }
          var node;
          if (typeof path == "string") {
            var lookup = FS.lookupPath(path, { follow: true });
            node = lookup.node;
          } else {
            node = path;
          }
          FS.doTruncate(null, node, len);
        }, ftruncate(fd, len) {
          var stream = FS.getStreamChecked(fd);
          if (len < 0 || (stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(28);
          }
          FS.doTruncate(stream, stream.node, len);
        }, utime(path, atime, mtime, dontFollow) {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          FS.doSetAttr(null, lookup.node, { atime, mtime, dontFollow });
        }, open(path, flags2, mode = 438) {
          if (path === "") {
            throw new FS.ErrnoError(44);
          }
          flags2 = FS_modeStringToFlags(flags2);
          if (flags2 & 64) {
            mode = mode & 4095 | 32768;
          } else {
            mode = 0;
          }
          var node;
          var isDirPath;
          if (typeof path == "object") {
            node = path;
          } else {
            isDirPath = path.endsWith("/");
            var lookup = FS.lookupPath(path, { follow: !(flags2 & 131072), noent_okay: true });
            node = lookup.node;
            path = lookup.path;
          }
          var created = false;
          if (flags2 & 64) {
            if (node) {
              if (flags2 & 128) {
                throw new FS.ErrnoError(20);
              }
            } else if (isDirPath) {
              throw new FS.ErrnoError(31);
            } else {
              node = FS.mknod(path, mode | 511, 0);
              created = true;
            }
          }
          if (!node) {
            throw new FS.ErrnoError(44);
          }
          if (FS.isChrdev(node.mode)) {
            flags2 &= ~512;
          }
          if (flags2 & 65536 && !FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
          if (!created) {
            var errCode = FS.mayOpen(node, flags2);
            if (errCode) {
              throw new FS.ErrnoError(errCode);
            }
          }
          if (flags2 & 512 && !created) {
            FS.truncate(node, 0);
          }
          flags2 &= ~(128 | 512 | 131072);
          var stream = FS.createStream({ node, path: FS.getPath(node), flags: flags2, seekable: true, position: 0, stream_ops: node.stream_ops, ungotten: [], error: false });
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
          if (created) {
            FS.chmod(node, mode & 511);
          }
          return stream;
        }, close(stream) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (stream.getdents) stream.getdents = null;
          stream.node?.notifyListeners(32);
          try {
            if (stream.stream_ops.close) {
              stream.stream_ops.close(stream);
            }
          } catch (e) {
            throw e;
          } finally {
            FS.closeStream(stream.fd);
          }
          stream.fd = null;
        }, isClosed(stream) {
          return stream.fd === null;
        }, llseek(stream, offset, whence) {
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if (!stream.seekable || !stream.stream_ops.llseek) {
            throw new FS.ErrnoError(70);
          }
          if (whence != 0 && whence != 1 && whence != 2) {
            throw new FS.ErrnoError(28);
          }
          stream.position = stream.stream_ops.llseek(stream, offset, whence);
          stream.ungotten = [];
          return stream.position;
        }, read(stream, buffer, offset, length, position) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.read) {
            throw new FS.ErrnoError(28);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
          if (!seeking) stream.position += bytesRead;
          return bytesRead;
        }, write(stream, buffer, offset, length, position, canOwn) {
          if (length < 0 || position < 0) {
            throw new FS.ErrnoError(28);
          }
          if (FS.isClosed(stream)) {
            throw new FS.ErrnoError(8);
          }
          if ((stream.flags & 2097155) === 0) {
            throw new FS.ErrnoError(8);
          }
          if (FS.isDir(stream.node.mode)) {
            throw new FS.ErrnoError(31);
          }
          if (!stream.stream_ops.write) {
            throw new FS.ErrnoError(28);
          }
          if (stream.seekable && stream.flags & 1024) {
            FS.llseek(stream, 0, 2);
          }
          var seeking = typeof position != "undefined";
          if (!seeking) {
            position = stream.position;
          } else if (!stream.seekable) {
            throw new FS.ErrnoError(70);
          }
          var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
          if (!seeking) stream.position += bytesWritten;
          return bytesWritten;
        }, mmap(stream, length, position, prot, flags2) {
          if ((prot & 2) !== 0 && (flags2 & 2) === 0 && (stream.flags & 2097155) !== 2) {
            throw new FS.ErrnoError(2);
          }
          if ((stream.flags & 2097155) === 1) {
            throw new FS.ErrnoError(2);
          }
          if (!stream.stream_ops.mmap) {
            throw new FS.ErrnoError(43);
          }
          if (!length) {
            throw new FS.ErrnoError(28);
          }
          return stream.stream_ops.mmap(stream, length, position, prot, flags2);
        }, msync(stream, buffer, offset, length, mmapFlags) {
          if (!stream.stream_ops.msync) {
            return 0;
          }
          return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
        }, ioctl(stream, cmd, arg) {
          if (!stream.stream_ops.ioctl) {
            throw new FS.ErrnoError(59);
          }
          return stream.stream_ops.ioctl(stream, cmd, arg);
        }, readFile(path, opts = {}) {
          opts.flags = opts.flags ?? 0;
          opts.encoding = opts.encoding ?? "binary";
          if (opts.encoding !== "utf8" && opts.encoding !== "binary") {
            abort2(`Invalid encoding type "${opts.encoding}"`);
          }
          var stream = FS.open(path, opts.flags);
          var stat = FS.stat(path);
          var length = stat.size;
          var buf = new Uint8Array(length);
          FS.read(stream, buf, 0, length, 0);
          if (opts.encoding === "utf8") {
            buf = UTF8ArrayToString2(buf);
          }
          FS.close(stream);
          return buf;
        }, writeFile(path, data, opts = {}) {
          opts.flags = opts.flags ?? 577;
          var stream = FS.open(path, opts.flags, opts.mode);
          data = FS_fileDataToTypedArray(data);
          FS.write(stream, data, 0, data.byteLength, void 0, opts.canOwn);
          FS.close(stream);
        }, cwd: () => FS.currentPath, chdir(path) {
          var lookup = FS.lookupPath(path, { follow: true });
          if (lookup.node === null) {
            throw new FS.ErrnoError(44);
          }
          if (!FS.isDir(lookup.node.mode)) {
            throw new FS.ErrnoError(54);
          }
          var errCode = FS.nodePermissions(lookup.node, "x");
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
          FS.currentPath = lookup.path;
        }, createDefaultDirectories() {
          FS.mkdir("/tmp");
          FS.mkdir("/home");
          FS.mkdir("/home/web_user");
        }, createDefaultDevices() {
          FS.mkdir("/dev");
          FS.registerDevice(FS.makedev(1, 3), { read: () => 0, write: (stream, buffer, offset, length, pos) => length, llseek: () => 0 });
          FS.mkdev("/dev/null", FS.makedev(1, 3));
          TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
          TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
          FS.mkdev("/dev/tty", FS.makedev(5, 0));
          FS.mkdev("/dev/tty1", FS.makedev(6, 0));
          var randomBuffer = new Uint8Array(1024), randomLeft = 0;
          var randomByte = () => {
            if (randomLeft === 0) {
              randomFill(randomBuffer);
              randomLeft = randomBuffer.byteLength;
            }
            return randomBuffer[--randomLeft];
          };
          FS.createDevice("/dev", "random", randomByte);
          FS.createDevice("/dev", "urandom", randomByte);
          FS.mkdir("/dev/shm");
          FS.mkdir("/dev/shm/tmp");
        }, createSpecialDirectories() {
          FS.mkdir("/proc");
          var proc_self = FS.mkdir("/proc/self");
          FS.mkdir("/proc/self/fd");
          FS.mount({ mount() {
            var node = FS.createNode(proc_self, "fd", 16895, 73);
            node.stream_ops = { llseek: MEMFS.stream_ops.llseek };
            node.node_ops = { lookup(parent, name2) {
              var fd = +name2;
              var stream = FS.getStreamChecked(fd);
              var ret = { parent: null, mount: { mountpoint: "fake" }, node_ops: { readlink: () => stream.path }, id: fd + 1 };
              ret.parent = ret;
              return ret;
            }, readdir() {
              return Array.from(FS.streams.entries()).filter(([k, v]) => v).map(([k, v]) => k.toString());
            } };
            return node;
          } }, {}, "/proc/self/fd");
        }, createStandardStreams(input, output, error) {
          if (input) {
            FS.createDevice("/dev", "stdin", input);
          } else {
            FS.symlink("/dev/tty", "/dev/stdin");
          }
          if (output) {
            FS.createDevice("/dev", "stdout", null, output);
          } else {
            FS.symlink("/dev/tty", "/dev/stdout");
          }
          if (error) {
            FS.createDevice("/dev", "stderr", null, error);
          } else {
            FS.symlink("/dev/tty1", "/dev/stderr");
          }
          var stdin = FS.open("/dev/stdin", 0);
          var stdout = FS.open("/dev/stdout", 1);
          var stderr = FS.open("/dev/stderr", 1);
        }, staticInit() {
          FS.nameTable = new Array(4096);
          FS.mount(MEMFS, {}, "/");
          FS.createDefaultDirectories();
          FS.createDefaultDevices();
          FS.createSpecialDirectories();
          FS.filesystems = { MEMFS };
        }, init(input, output, error) {
          FS.initialized = true;
          input ??= Module4["stdin"];
          output ??= Module4["stdout"];
          error ??= Module4["stderr"];
          FS.createStandardStreams(input, output, error);
        }, quit() {
          FS.initialized = false;
          for (var stream of FS.streams) {
            if (stream) {
              FS.close(stream);
            }
          }
        }, findObject(path, dontResolveLastLink) {
          var ret = FS.analyzePath(path, dontResolveLastLink);
          if (!ret.exists) {
            return null;
          }
          return ret.object;
        }, analyzePath(path, dontResolveLastLink) {
          try {
            var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            path = lookup.path;
          } catch (e) {
          }
          var ret = { isRoot: false, exists: false, error: 0, name: null, path: null, object: null, parentExists: false, parentPath: null, parentObject: null };
          try {
            var lookup = FS.lookupPath(path, { parent: true });
            ret.parentExists = true;
            ret.parentPath = lookup.path;
            ret.parentObject = lookup.node;
            ret.name = PATH.basename(path);
            lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
            ret.exists = true;
            ret.path = lookup.path;
            ret.object = lookup.node;
            ret.name = lookup.node.name;
            ret.isRoot = lookup.path === "/";
          } catch (e) {
            ret.error = e.errno;
          }
          return ret;
        }, createPath(parent, path, canRead, canWrite) {
          parent = typeof parent == "string" ? parent : FS.getPath(parent);
          var parts2 = path.split("/").reverse();
          while (parts2.length) {
            var part = parts2.pop();
            if (!part) continue;
            var current = PATH.join2(parent, part);
            try {
              FS.mkdir(current);
            } catch (e) {
              if (e.errno != 20) throw e;
            }
            parent = current;
          }
          return current;
        }, createFile(parent, name2, properties, canRead, canWrite) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name2);
          var mode = FS_getMode(canRead, canWrite);
          return FS.create(path, mode);
        }, createDataFile(parent, name2, data, canRead, canWrite, canOwn) {
          var path = name2;
          if (parent) {
            parent = typeof parent == "string" ? parent : FS.getPath(parent);
            path = name2 ? PATH.join2(parent, name2) : parent;
          }
          var mode = FS_getMode(canRead, canWrite);
          var node = FS.create(path, mode);
          if (data) {
            data = FS_fileDataToTypedArray(data);
            FS.chmod(node, mode | 146);
            var stream = FS.open(node, 577);
            FS.write(stream, data, 0, data.length, 0, canOwn);
            FS.close(stream);
            FS.chmod(node, mode);
          }
        }, createDevice(parent, name2, input, output) {
          var path = PATH.join2(typeof parent == "string" ? parent : FS.getPath(parent), name2);
          var mode = FS_getMode(!!input, !!output);
          FS.createDevice.major ??= 64;
          var dev = FS.makedev(FS.createDevice.major++, 0);
          FS.registerDevice(dev, { open(stream) {
            stream.seekable = false;
          }, close(stream) {
            if (output?.buffer?.length) {
              output(10);
            }
          }, read(stream, buffer, offset, length, pos) {
            var bytesRead = 0;
            for (var i2 = 0; i2 < length; i2++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === void 0 && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === void 0) break;
              bytesRead++;
              buffer[offset + i2] = result;
            }
            if (bytesRead) {
              stream.node.atime = Date.now();
            }
            return bytesRead;
          }, write(stream, buffer, offset, length, pos) {
            for (var i2 = 0; i2 < length; i2++) {
              try {
                output(buffer[offset + i2]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.mtime = stream.node.ctime = Date.now();
            }
            return i2;
          } });
          return FS.mkdev(path, mode, dev);
        }, forceLoadFile(obj) {
          if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
          if (globalThis.XMLHttpRequest) {
            abort2("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
          } else {
            try {
              obj.contents = readBinary2(obj.url);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
          }
        }, createLazyFile(parent, name2, url, canRead, canWrite) {
          class LazyUint8Array {
            lengthKnown = false;
            chunks = [];
            get(idx) {
              if (idx > this.length - 1 || idx < 0) {
                return void 0;
              }
              var chunkOffset = idx % this.chunkSize;
              var chunkNum = idx / this.chunkSize | 0;
              return this.getter(chunkNum)[chunkOffset];
            }
            setDataGetter(getter) {
              this.getter = getter;
            }
            cacheLength() {
              var xhr = new XMLHttpRequest();
              xhr.open("HEAD", url, false);
              xhr.send(null);
              if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) abort2("Couldn't load " + url + ". Status: " + xhr.status);
              var datalength = Number(xhr.getResponseHeader("Content-length"));
              var header;
              var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
              var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
              var chunkSize = 1024 * 1024;
              if (!hasByteServing) chunkSize = datalength;
              var doXHR = (from, to) => {
                if (from > to) abort2(`invalid range (${from}, ${to}) or no bytes requested!`);
                if (to > datalength - 1) abort2(`only ${datalength} bytes available! programmer error!`);
                var xhr2 = new XMLHttpRequest();
                xhr2.open("GET", url, false);
                if (datalength !== chunkSize) xhr2.setRequestHeader("Range", "bytes=" + from + "-" + to);
                xhr2.responseType = "arraybuffer";
                if (xhr2.overrideMimeType) {
                  xhr2.overrideMimeType("text/plain; charset=x-user-defined");
                }
                xhr2.send(null);
                if (!(xhr2.status >= 200 && xhr2.status < 300 || xhr2.status === 304)) abort2("Couldn't load " + url + ". Status: " + xhr2.status);
                if (xhr2.response !== void 0) {
                  return new Uint8Array(xhr2.response || []);
                }
                return intArrayFromString(xhr2.responseText ?? "", true);
              };
              var lazyArray2 = this;
              lazyArray2.setDataGetter((chunkNum) => {
                var start2 = chunkNum * chunkSize;
                var end = (chunkNum + 1) * chunkSize - 1;
                end = Math.min(end, datalength - 1);
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") {
                  lazyArray2.chunks[chunkNum] = doXHR(start2, end);
                }
                if (typeof lazyArray2.chunks[chunkNum] == "undefined") abort2("doXHR failed!");
                return lazyArray2.chunks[chunkNum];
              });
              if (usesGzip || !datalength) {
                chunkSize = datalength = 1;
                datalength = this.getter(0).length;
                chunkSize = datalength;
                out2("LazyFiles on gzip forces download of the whole file when length is accessed");
              }
              this._length = datalength;
              this._chunkSize = chunkSize;
              this.lengthKnown = true;
            }
            get length() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._length;
            }
            get chunkSize() {
              if (!this.lengthKnown) {
                this.cacheLength();
              }
              return this._chunkSize;
            }
          }
          if (globalThis.XMLHttpRequest) {
            if (!ENVIRONMENT_IS_WORKER2) abort2("Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc");
            var lazyArray = new LazyUint8Array();
            var properties = { isDevice: false, contents: lazyArray };
          } else {
            var properties = { isDevice: false, url };
          }
          var node = FS.createFile(parent, name2, properties, canRead, canWrite);
          if (properties.contents) {
            node.contents = properties.contents;
          } else if (properties.url) {
            node.contents = null;
            node.url = properties.url;
          }
          Object.defineProperties(node, { usedBytes: { get: function() {
            return this.contents.length;
          } } });
          var stream_ops = {};
          for (const [key, fn] of Object.entries(node.stream_ops)) {
            stream_ops[key] = (...args2) => {
              FS.forceLoadFile(node);
              return fn(...args2);
            };
          }
          function writeChunks(stream, buffer, offset, length, position) {
            var contents = stream.node.contents;
            if (position >= contents.length) return 0;
            var size = Math.min(contents.length - position, length);
            if (contents.slice) {
              for (var i2 = 0; i2 < size; i2++) {
                buffer[offset + i2] = contents[position + i2];
              }
            } else {
              for (var i2 = 0; i2 < size; i2++) {
                buffer[offset + i2] = contents.get(position + i2);
              }
            }
            return size;
          }
          stream_ops.read = (stream, buffer, offset, length, position) => {
            FS.forceLoadFile(node);
            return writeChunks(stream, buffer, offset, length, position);
          };
          stream_ops.mmap = (stream, length, position, prot, flags2) => {
            FS.forceLoadFile(node);
            var ptr = mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            writeChunks(stream, HEAP82, ptr, length, position);
            return { ptr, allocated: true };
          };
          node.stream_ops = stream_ops;
          return node;
        } };
        var SYSCALLS = { currentUmask: 18, calculateAt(dirfd, path, allowEmpty) {
          if (PATH.isAbs(path)) {
            return path;
          }
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = SYSCALLS.getStreamFromFD(dirfd);
            dir = dirstream.path;
          }
          if (path.length == 0) {
            if (!allowEmpty) {
              throw new FS.ErrnoError(44);
            }
            return dir;
          }
          return dir + "/" + path;
        }, writeStat(buf, stat) {
          HEAPU322[buf >> 2] = stat.dev;
          HEAPU322[buf + 4 >> 2] = stat.mode;
          HEAPU322[buf + 8 >> 2] = stat.nlink;
          HEAPU322[buf + 12 >> 2] = stat.uid;
          HEAPU322[buf + 16 >> 2] = stat.gid;
          HEAPU322[buf + 20 >> 2] = stat.rdev;
          HEAP642[buf + 24 >> 3] = BigInt(stat.size);
          HEAP322[buf + 32 >> 2] = 4096;
          HEAP322[buf + 36 >> 2] = stat.blocks;
          var atime = stat.atime.getTime();
          var mtime = stat.mtime.getTime();
          var ctime = stat.ctime.getTime();
          HEAP642[buf + 40 >> 3] = BigInt(Math.floor(atime / 1e3));
          HEAPU322[buf + 48 >> 2] = atime % 1e3 * 1e3 * 1e3;
          HEAP642[buf + 56 >> 3] = BigInt(Math.floor(mtime / 1e3));
          HEAPU322[buf + 64 >> 2] = mtime % 1e3 * 1e3 * 1e3;
          HEAP642[buf + 72 >> 3] = BigInt(Math.floor(ctime / 1e3));
          HEAPU322[buf + 80 >> 2] = ctime % 1e3 * 1e3 * 1e3;
          HEAP642[buf + 88 >> 3] = BigInt(stat.ino);
          return 0;
        }, writeStatFs(buf, stats) {
          HEAPU322[buf + 4 >> 2] = stats.bsize;
          HEAPU322[buf + 60 >> 2] = stats.bsize;
          HEAP642[buf + 8 >> 3] = BigInt(stats.blocks);
          HEAP642[buf + 16 >> 3] = BigInt(stats.bfree);
          HEAP642[buf + 24 >> 3] = BigInt(stats.bavail);
          HEAP642[buf + 32 >> 3] = BigInt(stats.files);
          HEAP642[buf + 40 >> 3] = BigInt(stats.ffree);
          HEAPU322[buf + 48 >> 2] = stats.fsid;
          HEAPU322[buf + 64 >> 2] = stats.flags;
          HEAPU322[buf + 56 >> 2] = stats.namelen;
        }, doMsync(addr2, stream, len, flags2, offset) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (flags2 & 2) {
            return 0;
          }
          var buffer = HEAPU82.subarray(addr2, addr2 + len);
          FS.msync(stream, buffer, offset, len, flags2);
        }, getStreamFromFD(fd) {
          var stream = FS.getStreamChecked(fd);
          return stream;
        }, varargs: void 0, getStr(ptr) {
          var ret = UTF8ToString2(ptr);
          return ret;
        } };
        function _fd_close2(fd) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.close(stream);
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doReadv = (stream, iov, iovcnt, offset) => {
          var ret = 0;
          for (var i2 = 0; i2 < iovcnt; i2++) {
            var ptr = HEAPU322[iov >> 2];
            var len = HEAPU322[iov + 4 >> 2];
            iov += 8;
            try {
              var curr = FS.read(stream, HEAP82, ptr, len, offset);
            } catch (e) {
              if (ret > 0 && e instanceof FS.ErrnoError && (e.errno == 6 || e.errno == 6)) {
                break;
              }
              throw e;
            }
            if (curr < 0) return -1;
            ret += curr;
            if (curr < len) break;
            if (typeof offset != "undefined") {
              offset += curr;
            }
          }
          return ret;
        };
        function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU322[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var INT53_MAX2 = 9007199254740992;
        var INT53_MIN2 = -9007199254740992;
        var bigintToI53Checked2 = (num) => num < INT53_MIN2 || num > INT53_MAX2 ? NaN : Number(num);
        function _fd_seek2(fd, offset, whence, newOffset) {
          offset = bigintToI53Checked2(offset);
          try {
            if (isNaN(offset)) return 22;
            var stream = SYSCALLS.getStreamFromFD(fd);
            FS.llseek(stream, offset, whence);
            HEAP642[newOffset >> 3] = BigInt(stream.position);
            if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var doWritev = (stream, iov, iovcnt, offset) => {
          if (iovcnt == 1) {
            return FS.write(stream, HEAP82, HEAPU322[iov >> 2], HEAPU322[iov + 4 >> 2], offset);
          }
          var total = 0;
          for (var i2 = 0, p = iov; i2 < iovcnt; i2++, p += 8) {
            total += HEAPU322[p + 4 >> 2];
          }
          var view = new Uint8Array(total);
          var voff = 0;
          for (var i2 = 0; i2 < iovcnt; i2++, iov += 8) {
            var ptr = HEAPU322[iov >> 2];
            var len = HEAPU322[iov + 4 >> 2];
            view.set(HEAPU82.subarray(ptr, ptr + len), voff);
            voff += len;
          }
          return FS.write(stream, view, 0, total, offset);
        };
        function _fd_write2(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doWritev(stream, iov, iovcnt);
            HEAPU322[pnum >> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e.name === "ErrnoError")) throw e;
            return e.errno;
          }
        }
        var wasmTableMirror2 = [];
        var getWasmTableEntry2 = (funcPtr) => {
          var func2 = wasmTableMirror2[funcPtr];
          if (!func2) {
            wasmTableMirror2[funcPtr] = func2 = wasmTable2.get(funcPtr);
          }
          return func2;
        };
        var stringToUTF82 = (str, outPtr, maxBytesToWrite) => stringToUTF8Array2(str, HEAPU82, outPtr, maxBytesToWrite);
        FS.createPreloadedFile = FS_createPreloadedFile;
        FS.preloadFile = FS_preloadFile;
        FS.staticInit();
        {
          if (Module4["noExitRuntime"]) noExitRuntime2 = Module4["noExitRuntime"];
          if (Module4["print"]) out2 = Module4["print"];
          if (Module4["printErr"]) err2 = Module4["printErr"];
          if (Module4["arguments"]) programArgs = Module4["arguments"];
          if (Module4["thisProgram"]) thisProgram2 = Module4["thisProgram"];
          var preInit = Module4["preInit"];
          if (preInit) {
            if (typeof preInit == "function") Module4["preInit"] = preInit = [preInit];
            while (preInit.length > 0) {
              preInit.shift()();
            }
          }
        }
        Module4["getValue"] = getValue2;
        Module4["UTF8ToString"] = UTF8ToString2;
        Module4["stringToUTF8"] = stringToUTF82;
        Module4["lengthBytesUTF8"] = lengthBytesUTF82;
        var _wasm_parse_query, _malloc2, _free2, _wasm_parse_query_raw, _wasm_free_parse_result, _wasm_parse_plpgsql, _wasm_fingerprint, _wasm_normalize_query, _wasm_parse_query_detailed, _wasm_free_detailed_result, _wasm_scan, _wasm_free_string, __emscripten_timeout, _setThrew2, __emscripten_stack_restore2, _emscripten_stack_get_current2, memory, __indirect_function_table, wasmMemory2, wasmTable2;
        function assignWasmExports2(wasmExports3) {
          _wasm_parse_query = Module4["_wasm_parse_query"] = wasmExports3["B"];
          _malloc2 = Module4["_malloc"] = wasmExports3["C"];
          _free2 = Module4["_free"] = wasmExports3["E"];
          _wasm_parse_query_raw = Module4["_wasm_parse_query_raw"] = wasmExports3["F"];
          _wasm_free_parse_result = Module4["_wasm_free_parse_result"] = wasmExports3["G"];
          _wasm_parse_plpgsql = Module4["_wasm_parse_plpgsql"] = wasmExports3["H"];
          _wasm_fingerprint = Module4["_wasm_fingerprint"] = wasmExports3["I"];
          _wasm_normalize_query = Module4["_wasm_normalize_query"] = wasmExports3["J"];
          _wasm_parse_query_detailed = Module4["_wasm_parse_query_detailed"] = wasmExports3["K"];
          _wasm_free_detailed_result = Module4["_wasm_free_detailed_result"] = wasmExports3["L"];
          _wasm_scan = Module4["_wasm_scan"] = wasmExports3["M"];
          _wasm_free_string = Module4["_wasm_free_string"] = wasmExports3["N"];
          __emscripten_timeout = wasmExports3["O"];
          _setThrew2 = wasmExports3["P"];
          __emscripten_stack_restore2 = wasmExports3["Q"];
          _emscripten_stack_get_current2 = wasmExports3["R"];
          memory = wasmMemory2 = wasmExports3["z"];
          __indirect_function_table = wasmTable2 = wasmExports3["D"];
        }
        var wasmImports2 = { c: ___assert_fail, x: __abort_js2, w: __emscripten_runtime_keepalive_clear, p: __emscripten_throw_longjmp, o: __setitimer_js, q: _emscripten_resize_heap2, m: _exit, u: _fd_close2, r: _fd_read, s: _fd_seek2, t: _fd_write2, g: invoke_i, b: invoke_ii, a: invoke_iii, d: invoke_iiii, k: invoke_iiiii, l: invoke_ji, e: invoke_v, f: invoke_vi, h: invoke_vii, j: invoke_viii, i: invoke_viiii, y: invoke_viiiii, n: invoke_viiiiiiiiiiiii, v: _proc_exit2 };
        function invoke_iii(index, a1, a2) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)(a1, a2);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_ii(index, a1) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)(a1);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_i(index) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)();
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_v(index) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)();
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_iiii(index, a1, a2, a3) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)(a1, a2, a3);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_viiii(index, a1, a2, a3, a4) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1, a2, a3, a4);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_viiiiiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_iiiii(index, a1, a2, a3, a4) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)(a1, a2, a3, a4);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_viii(index, a1, a2, a3) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1, a2, a3);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_vi(index, a1) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_vii(index, a1, a2) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1, a2);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_viiiii(index, a1, a2, a3, a4, a5) {
          var sp = stackSave2();
          try {
            getWasmTableEntry2(index)(a1, a2, a3, a4, a5);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
          }
        }
        function invoke_ji(index, a1) {
          var sp = stackSave2();
          try {
            return getWasmTableEntry2(index)(a1);
          } catch (e) {
            stackRestore2(sp);
            if (!(e instanceof EmscriptenEH)) throw e;
            _setThrew2(1, 0);
            return 0n;
          }
        }
        async function run3() {
          preRun2();
          if (runDependencies2) {
            await resolveRunDependencies();
          }
          var setStatus = Module4["setStatus"];
          if (setStatus) {
            setStatus("Running...");
            await new Promise((resolve2) => setTimeout(resolve2, 1));
            setTimeout(setStatus, 1, "");
          }
          if (ABORT2) return;
          initRuntime2();
          Module4["onRuntimeInitialized"]?.();
          postRun2();
        }
        var wasmExports2;
        wasmExports2 = await createWasm2();
        await run3();
        ;
        return Module4;
      };
    })();
    if (typeof exports === "object" && typeof module2 === "object") {
      module2.exports = PgQueryModule;
      module2.exports.default = PgQueryModule;
    } else if (typeof define === "function" && define["amd"]) define([], () => PgQueryModule);
  }
});

// node_modules/libpg-query/wasm/index.cjs
var require_wasm = __commonJS({
  "node_modules/libpg-query/wasm/index.cjs"(exports) {
    "use strict";
    var __createBinding = exports && exports.__createBinding || (Object.create ? (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
      if (k2 === void 0) k2 = k;
      o[k2] = m[k];
    }));
    var __exportStar = exports && exports.__exportStar || function(m, exports2) {
      for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p)) __createBinding(exports2, m, p);
    };
    var __importDefault = exports && exports.__importDefault || function(mod) {
      return mod && mod.__esModule ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.scan = exports.normalize = exports.fingerprint = exports.parsePlPgSQL = exports.parse = exports.SqlError = void 0;
    exports.hasSqlDetails = hasSqlDetails;
    exports.formatSqlError = formatSqlError;
    exports.loadModule = loadModule3;
    exports.parseSync = parseSync;
    exports.parsePlPgSQLSync = parsePlPgSQLSync;
    exports.fingerprintSync = fingerprintSync;
    exports.normalizeSync = normalizeSync;
    exports.scanSync = scanSync;
    __exportStar(require_types2(), exports);
    var SqlError2 = class extends Error {
      sqlDetails;
      constructor(message, details) {
        super(message);
        this.name = "SqlError";
        this.sqlDetails = details;
      }
    };
    exports.SqlError = SqlError2;
    function hasSqlDetails(error) {
      return error instanceof SqlError2 && error.sqlDetails !== void 0;
    }
    function formatSqlError(error, query, options = {}) {
      const { showPosition = true, showQuery = true, color = false, maxQueryLength } = options;
      const lines = [];
      const red = color ? "\x1B[31m" : "";
      const yellow = color ? "\x1B[33m" : "";
      const reset = color ? "\x1B[0m" : "";
      lines.push(`${red}Error: ${error.message}${reset}`);
      if (error.sqlDetails) {
        const { cursorPosition, fileName, functionName: functionName2, lineNumber } = error.sqlDetails;
        if (cursorPosition !== void 0 && cursorPosition >= 0) {
          lines.push(`Position: ${cursorPosition}`);
        }
        if (fileName || functionName2 || lineNumber) {
          const details = [];
          if (fileName)
            details.push(`file: ${fileName}`);
          if (functionName2)
            details.push(`function: ${functionName2}`);
          if (lineNumber)
            details.push(`line: ${lineNumber}`);
          lines.push(`Source: ${details.join(", ")}`);
        }
        if (showQuery && showPosition && cursorPosition !== void 0 && cursorPosition >= 0) {
          let displayQuery = query;
          let adjustedPosition = cursorPosition;
          if (maxQueryLength && query.length > maxQueryLength) {
            const start2 = Math.max(0, cursorPosition - Math.floor(maxQueryLength / 2));
            const end = Math.min(query.length, start2 + maxQueryLength);
            displayQuery = (start2 > 0 ? "..." : "") + query.substring(start2, end) + (end < query.length ? "..." : "");
            adjustedPosition = cursorPosition - start2 + (start2 > 0 ? 3 : 0);
          }
          lines.push(displayQuery);
          lines.push(" ".repeat(adjustedPosition) + `${yellow}^${reset}`);
        }
      } else if (showQuery) {
        let displayQuery = query;
        if (maxQueryLength && query.length > maxQueryLength) {
          displayQuery = query.substring(0, maxQueryLength) + "...";
        }
        lines.push(`Query: ${displayQuery}`);
      }
      return lines.join("\n");
    }
    var libpg_query_js_1 = __importDefault(require_libpg_query());
    var wasmModule;
    var initPromise = (0, libpg_query_js_1.default)().then((module3) => {
      wasmModule = module3;
    });
    function ensureLoaded() {
      if (!wasmModule)
        throw new Error("WASM module not initialized. Call `loadModule()` first.");
    }
    async function loadModule3() {
      if (!wasmModule) {
        await initPromise;
      }
    }
    function awaitInit(fn) {
      return (async (...args2) => {
        await initPromise;
        return fn(...args2);
      });
    }
    function stringToPtr(str) {
      ensureLoaded();
      if (typeof str !== "string") {
        throw new TypeError(`Expected a string, got ${typeof str}`);
      }
      const len = wasmModule.lengthBytesUTF8(str) + 1;
      const ptr = wasmModule._malloc(len);
      try {
        wasmModule.stringToUTF8(str, ptr, len);
        return ptr;
      } catch (error) {
        wasmModule._free(ptr);
        throw error;
      }
    }
    function ptrToString(ptr) {
      ensureLoaded();
      if (typeof ptr !== "number") {
        throw new TypeError(`Expected a number, got ${typeof ptr}`);
      }
      return wasmModule.UTF8ToString(ptr);
    }
    exports.parse = awaitInit(async (query) => {
      if (query === null || query === void 0) {
        throw new Error("Query cannot be null or undefined");
      }
      if (query === "") {
        throw new Error("Query cannot be empty");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_query_raw(queryPtr);
        if (!resultPtr) {
          throw new Error("Failed to parse query: memory allocation failed");
        }
        const parseTreePtr = wasmModule.getValue(resultPtr, "i32");
        const stderrBufferPtr = wasmModule.getValue(resultPtr + 4, "i32");
        const errorPtr = wasmModule.getValue(resultPtr + 8, "i32");
        if (errorPtr) {
          const messagePtr = wasmModule.getValue(errorPtr, "i32");
          const funcnamePtr = wasmModule.getValue(errorPtr + 4, "i32");
          const filenamePtr = wasmModule.getValue(errorPtr + 8, "i32");
          const lineno = wasmModule.getValue(errorPtr + 12, "i32");
          const cursorpos = wasmModule.getValue(errorPtr + 16, "i32");
          const message = messagePtr ? wasmModule.UTF8ToString(messagePtr) : "Unknown error";
          const funcname = funcnamePtr ? wasmModule.UTF8ToString(funcnamePtr) : void 0;
          const filename = filenamePtr ? wasmModule.UTF8ToString(filenamePtr) : void 0;
          throw new SqlError2(message, {
            message,
            cursorPosition: cursorpos > 0 ? cursorpos - 1 : 0,
            // Convert to 0-based
            fileName: filename,
            functionName: funcname,
            lineNumber: lineno > 0 ? lineno : void 0
          });
        }
        if (!parseTreePtr) {
          throw new Error("No parse tree generated");
        }
        const parseTreeStr = wasmModule.UTF8ToString(parseTreePtr);
        return JSON.parse(parseTreeStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_parse_result(resultPtr);
        }
      }
    });
    exports.parsePlPgSQL = awaitInit(async (query) => {
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_plpgsql(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (!resultStr.startsWith("{")) {
          throw new Error(resultStr);
        }
        return JSON.parse(resultStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    });
    exports.fingerprint = awaitInit(async (query) => {
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_fingerprint(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return resultStr;
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    });
    exports.normalize = awaitInit(async (query) => {
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_normalize_query(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return resultStr;
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    });
    function parseSync(query) {
      if (!wasmModule) {
        throw new Error("WASM module not initialized. Call loadModule() first.");
      }
      if (query === null || query === void 0) {
        throw new Error("Query cannot be null or undefined");
      }
      if (query === "") {
        throw new Error("Query cannot be empty");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_query_raw(queryPtr);
        if (!resultPtr) {
          throw new Error("Failed to parse query: memory allocation failed");
        }
        const parseTreePtr = wasmModule.getValue(resultPtr, "i32");
        const stderrBufferPtr = wasmModule.getValue(resultPtr + 4, "i32");
        const errorPtr = wasmModule.getValue(resultPtr + 8, "i32");
        if (errorPtr) {
          const messagePtr = wasmModule.getValue(errorPtr, "i32");
          const funcnamePtr = wasmModule.getValue(errorPtr + 4, "i32");
          const filenamePtr = wasmModule.getValue(errorPtr + 8, "i32");
          const lineno = wasmModule.getValue(errorPtr + 12, "i32");
          const cursorpos = wasmModule.getValue(errorPtr + 16, "i32");
          const message = messagePtr ? wasmModule.UTF8ToString(messagePtr) : "Unknown error";
          const funcname = funcnamePtr ? wasmModule.UTF8ToString(funcnamePtr) : void 0;
          const filename = filenamePtr ? wasmModule.UTF8ToString(filenamePtr) : void 0;
          throw new SqlError2(message, {
            message,
            cursorPosition: cursorpos > 0 ? cursorpos - 1 : 0,
            // Convert to 0-based
            fileName: filename,
            functionName: funcname,
            lineNumber: lineno > 0 ? lineno : void 0
          });
        }
        if (!parseTreePtr) {
          throw new Error("No parse tree generated");
        }
        const parseTreeStr = wasmModule.UTF8ToString(parseTreePtr);
        return JSON.parse(parseTreeStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_parse_result(resultPtr);
        }
      }
    }
    function parsePlPgSQLSync(query) {
      if (!wasmModule) {
        throw new Error("WASM module not initialized. Call loadModule() first.");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_parse_plpgsql(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (!resultStr.startsWith("{")) {
          throw new Error(resultStr);
        }
        return JSON.parse(resultStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    }
    function fingerprintSync(query) {
      if (!wasmModule) {
        throw new Error("WASM module not initialized. Call loadModule() first.");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_fingerprint(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return resultStr;
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    }
    function normalizeSync(query) {
      if (!wasmModule) {
        throw new Error("WASM module not initialized. Call loadModule() first.");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_normalize_query(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return resultStr;
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    }
    exports.scan = awaitInit(async (query) => {
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_scan(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return JSON.parse(resultStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    });
    function scanSync(query) {
      if (!wasmModule) {
        throw new Error("WASM module not initialized. Call loadModule() first.");
      }
      const queryPtr = stringToPtr(query);
      let resultPtr = 0;
      try {
        resultPtr = wasmModule._wasm_scan(queryPtr);
        const resultStr = ptrToString(resultPtr);
        if (resultStr.startsWith("syntax error") || resultStr.startsWith("deparse error") || resultStr.startsWith("ERROR")) {
          throw new Error(resultStr);
        }
        return JSON.parse(resultStr);
      } finally {
        wasmModule._free(queryPtr);
        if (resultPtr) {
          wasmModule._wasm_free_string(resultPtr);
        }
      }
    }
  }
});

// src/cli.ts
import { existsSync as existsSync3, readdirSync as readdirSync2, readFileSync as readFileSync2, statSync as statSync2, writeFileSync } from "node:fs";
import { join as join3, relative as relative2, resolve } from "node:path";

// src/detector/frameworks.ts
var import_picomatch = __toESM(require_picomatch2(), 1);
var LIQUIBASE_HEADER = /^\s*--\s*liquibase\s+formatted\s+sql/im;
var DBMATE_UP = /^\s*--\s*migrate:up\b/im;
var GOOSE_UP = /^\s*--\s*\+goose\s+Up\b/im;
var GOOSE_DOWN = /^\s*--\s*\+goose\s+Down\b/i;
var GOOSE_NO_TRANSACTION = /^\s*--\s*\+goose\s+NO\s+TRANSACTION\b/im;
var FRAMEWORKS = [
  {
    name: "goose",
    globs: ["**/*.sql"],
    wrapped: true,
    wrapReason: "goose runs each migration in a transaction unless the file says -- +goose NO TRANSACTION",
    marker: (c) => GOOSE_UP.test(c)
  },
  {
    name: "liquibase",
    globs: ["**/changelog/**/*.sql"],
    wrapped: true,
    wrapReason: "Liquibase runs each changeset in a transaction unless it says runInTransaction:false",
    marker: (c) => LIQUIBASE_HEADER.test(c)
  },
  {
    name: "dbmate",
    globs: ["db/migrations/*.sql", "**/db/migrations/*.sql"],
    wrapped: true,
    wrapReason: "dbmate wraps each migration in a transaction unless the section says transaction:false",
    marker: (c) => DBMATE_UP.test(c)
  },
  {
    name: "flyway",
    globs: ["**/db/migration/V*__*.sql", "**/db/migration/R*__*.sql"],
    wrapped: true,
    wrapReason: "Flyway runs each migration in a transaction unless its script configuration sets executeInTransaction=false"
  },
  {
    name: "prisma",
    globs: ["prisma/migrations/*/migration.sql", "**/prisma/migrations/*/migration.sql"],
    wrapped: true,
    wrapReason: "Prisma Migrate runs each migration in a transaction and has no opt-out"
  },
  {
    name: "golang-migrate",
    globs: ["**/*.up.sql", "**/*.down.sql"],
    wrapped: false,
    wrapReason: "golang-migrate runs the file statement by statement unless x-multi-statement is set"
  },
  {
    name: "rails",
    globs: ["db/migrate/*.rb", "**/db/migrate/*.rb"],
    wrapped: true,
    wrapReason: "Active Record runs each migration in a transaction unless the class calls disable_ddl_transaction!"
  },
  {
    name: "alembic",
    globs: ["**/versions/*.py"],
    wrapped: true,
    wrapReason: "Alembic runs the migration in a transaction (transaction_per_migration) unless the step runs in autocommit_block() or after an explicit COMMIT"
  },
  {
    name: "django",
    globs: ["**/migrations/[0-9]*.py"],
    wrapped: true,
    wrapReason: "Django runs each migration in a transaction unless the Migration class sets atomic = False"
  },
  {
    name: "sqitch",
    globs: ["deploy/*.sql", "**/deploy/*.sql"],
    wrapped: true,
    wrapReason: "Sqitch runs each deploy script in a transaction"
  },
  {
    name: "sql",
    // Any depth (ADR 0012): monorepos keep migrations under services/<name>/migrations/.
    globs: ["**/migrations/**/*.sql", "**/db/migrations/**/*.sql", "**/sql/migrations/**/*.sql"],
    wrapped: false,
    wrapReason: "plain SQL folder: treated as not wrapped unless the config says transaction: always or the file has BEGIN/COMMIT"
  }
];
var DEFAULT_EXCLUDES = [
  "**/target/**",
  "**/build/**",
  "**/out/**",
  "**/dist/**",
  "**/node_modules/**",
  "**/vendor/**",
  "**/bin/**",
  "**/obj/**",
  "**/.gradle/**",
  "**/.git/**",
  "**/.venv/**",
  "**/venv/**",
  "**/__pycache__/**",
  "**/.tox/**"
];
var DEFAULT_EXCLUDED_DIRS = new Set(DEFAULT_EXCLUDES.map((g) => g.slice(3, -3)));
var matchers = /* @__PURE__ */ new Map();
function matcherFor(def) {
  let m = matchers.get(def.name);
  if (!m) {
    m = (0, import_picomatch.default)(def.globs, { dot: true });
    matchers.set(def.name, m);
  }
  return m;
}
function frameworkDef(name2) {
  const def = FRAMEWORKS.find((f) => f.name === name2);
  if (!def) throw new Error(`unknown framework ${name2}`);
  return def;
}
function classify(path, content, config) {
  const normalized = path.replace(/\\/g, "/").replace(/^\.\//, "");
  const excludes = [...config.defaultExcludes ? DEFAULT_EXCLUDES : [], ...config.exclude];
  if (excludes.length && (0, import_picomatch.default)(excludes, { dot: true })(normalized)) return void 0;
  if (!config.analyzeDown && /.down.sql$/i.test(normalized)) return void 0;
  const byContent = FRAMEWORKS.find((f) => f.marker && matcherFor(f)(normalized) && f.marker(content));
  const byPath = FRAMEWORKS.find((f) => !f.marker && matcherFor(f)(normalized));
  const detected = byContent ?? byPath;
  if (config.paths) {
    if (!(0, import_picomatch.default)(config.paths, { dot: true })(normalized)) return void 0;
    if (config.framework !== "auto") return frameworkDef(config.framework);
    return detected ?? frameworkDef("sql");
  }
  if (config.framework !== "auto") return detected ? frameworkDef(config.framework) : void 0;
  return detected;
}

// src/harness-core.ts
import { existsSync as existsSync2, readdirSync, readFileSync, statSync } from "node:fs";
import { basename, join as join2, relative } from "node:path";

// src/config/index.ts
var import_yaml = __toESM(require_dist(), 1);
var ConfigError = class extends Error {
  constructor(message) {
    super(`.lurie-guard.yml: ${message}`);
    this.name = "ConfigError";
  }
};
var FRAMEWORKS2 = [
  "sql",
  "flyway",
  "liquibase",
  "rails",
  "django",
  "alembic",
  "prisma",
  "golang-migrate",
  "dbmate",
  "sqitch",
  "goose"
];
var SEVERITIES = ["error", "warning", "info"];
var TOP_KEYS = /* @__PURE__ */ new Set([
  "version",
  "postgres_version",
  "paths",
  "exclude",
  "default_excludes",
  "analyze_down",
  "framework",
  "transaction",
  "lock_timeout_set_by_runner",
  "fail_on",
  "rules",
  "outputs",
  "llm"
]);
var OUTPUT_KEYS = /* @__PURE__ */ new Set(["review_comments", "sarif", "summary", "max_comments"]);
var LLM_KEYS = /* @__PURE__ */ new Set(["model", "explain", "extra_checks", "max_cost_usd_per_run"]);
var RULE_KEYS = /* @__PURE__ */ new Set(["severity", "exclude"]);
var DEFAULT_LLM_MODEL = "claude-sonnet-5-5";
function isRecord(v) {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}
function expectBoolean(v, key) {
  if (typeof v !== "boolean") throw new ConfigError(`\`${key}\` must be true or false, got ${JSON.stringify(v)}`);
  return v;
}
function expectStringList(v, key) {
  if (!Array.isArray(v) || !v.every((s) => typeof s === "string"))
    throw new ConfigError(`\`${key}\` must be a list of path globs`);
  return v;
}
function expectOneOf(v, key, allowed) {
  if (typeof v !== "string" || !allowed.includes(v))
    throw new ConfigError(`\`${key}\` must be one of ${allowed.join(", ")}, got ${JSON.stringify(v)}`);
  return v;
}
function defaultConfig(catalog2) {
  const rules2 = {};
  for (const r of catalog2) {
    if (r.status !== "active") continue;
    if (r.severity === "info") continue;
    rules2[r.id] = r.severity;
  }
  return {
    version: 1,
    postgresVersion: 15,
    exclude: [],
    defaultExcludes: true,
    analyzeDown: false,
    framework: "auto",
    transaction: "auto",
    lockTimeoutSetByRunner: false,
    failOn: "none",
    rules: rules2,
    ruleExcludes: {},
    // sarif: the upload to code scanning is opt-in (ADR 0011); the file is always written.
    outputs: { reviewComments: true, sarif: false, summary: true, maxComments: 25 },
    llm: { model: DEFAULT_LLM_MODEL, explain: true, extraChecks: false, maxCostUsdPerRun: 0.5 }
  };
}
function parseConfig(text, catalog2) {
  const config = defaultConfig(catalog2);
  if (text === void 0 || text.trim() === "") return config;
  let doc;
  try {
    doc = import_yaml.default.parse(text);
  } catch (err2) {
    throw new ConfigError(`not valid YAML: ${err2.message}`);
  }
  if (doc === null || doc === void 0) return config;
  if (!isRecord(doc)) throw new ConfigError("the file must be a YAML mapping");
  for (const key of Object.keys(doc)) {
    if (!TOP_KEYS.has(key)) throw new ConfigError(`unknown key \`${key}\``);
  }
  if ("version" in doc && doc.version !== 1) throw new ConfigError(`\`version\` must be 1, got ${JSON.stringify(doc.version)}`);
  if ("postgres_version" in doc) {
    const v = doc.postgres_version;
    if (typeof v !== "number" || !Number.isInteger(v) || v < 15)
      throw new ConfigError(`\`postgres_version\` must be an integer major of 15 or above, got ${JSON.stringify(v)}`);
    config.postgresVersion = v;
  }
  if ("paths" in doc) config.paths = expectStringList(doc.paths, "paths");
  if ("exclude" in doc) config.exclude = expectStringList(doc.exclude, "exclude");
  if ("default_excludes" in doc) config.defaultExcludes = expectBoolean(doc.default_excludes, "default_excludes");
  if ("analyze_down" in doc) config.analyzeDown = expectBoolean(doc.analyze_down, "analyze_down");
  if ("framework" in doc) config.framework = expectOneOf(doc.framework, "framework", ["auto", ...FRAMEWORKS2]);
  if ("transaction" in doc) config.transaction = expectOneOf(doc.transaction, "transaction", ["auto", "always", "never"]);
  if ("lock_timeout_set_by_runner" in doc)
    config.lockTimeoutSetByRunner = expectBoolean(doc.lock_timeout_set_by_runner, "lock_timeout_set_by_runner");
  if ("fail_on" in doc) config.failOn = expectOneOf(doc.fail_on, "fail_on", ["none", "warning", "error"]);
  if ("rules" in doc) {
    if (!isRecord(doc.rules)) throw new ConfigError("`rules` must be a mapping of rule id to severity");
    const known = new Map(catalog2.map((r) => [r.id, r]));
    for (const [id, value] of Object.entries(doc.rules)) {
      const entry = known.get(id);
      if (!entry) throw new ConfigError(`unknown rule id \`${id}\` under \`rules\``);
      let severity;
      if (typeof value === "string") severity = value;
      else if (isRecord(value)) {
        for (const k of Object.keys(value)) {
          if (!RULE_KEYS.has(k)) throw new ConfigError(`unknown key \`rules.${id}.${k}\``);
        }
        severity = typeof value.severity === "string" ? value.severity : entry.severity;
        if ("exclude" in value) config.ruleExcludes[id] = expectStringList(value.exclude, `rules.${id}.exclude`);
      } else throw new ConfigError(`\`rules.${id}\` must be off, info, warning, error or a mapping`);
      if (severity === "off") {
        delete config.rules[id];
        continue;
      }
      if (!SEVERITIES.includes(severity))
        throw new ConfigError(`\`rules.${id}\` must be off, info, warning or error, got ${JSON.stringify(severity)}`);
      config.rules[id] = severity;
    }
  }
  if ("outputs" in doc) {
    if (!isRecord(doc.outputs)) throw new ConfigError("`outputs` must be a mapping");
    for (const k of Object.keys(doc.outputs)) if (!OUTPUT_KEYS.has(k)) throw new ConfigError(`unknown key \`outputs.${k}\``);
    const o = doc.outputs;
    if ("review_comments" in o) config.outputs.reviewComments = expectBoolean(o.review_comments, "outputs.review_comments");
    if ("sarif" in o) config.outputs.sarif = expectBoolean(o.sarif, "outputs.sarif");
    if ("summary" in o) config.outputs.summary = expectBoolean(o.summary, "outputs.summary");
    if ("max_comments" in o) {
      if (typeof o.max_comments !== "number" || o.max_comments < 0)
        throw new ConfigError("`outputs.max_comments` must be a number of comments");
      config.outputs.maxComments = Math.floor(o.max_comments);
    }
  }
  if ("llm" in doc) {
    if (!isRecord(doc.llm)) throw new ConfigError("`llm` must be a mapping");
    for (const k of Object.keys(doc.llm)) if (!LLM_KEYS.has(k)) throw new ConfigError(`unknown key \`llm.${k}\``);
    const l = doc.llm;
    if ("model" in l) {
      if (typeof l.model !== "string" || l.model === "") throw new ConfigError("`llm.model` must be a model id");
      config.llm.model = l.model;
    }
    if ("explain" in l) config.llm.explain = expectBoolean(l.explain, "llm.explain");
    if ("extra_checks" in l) config.llm.extraChecks = expectBoolean(l.extra_checks, "llm.extra_checks");
    if ("max_cost_usd_per_run" in l) {
      if (typeof l.max_cost_usd_per_run !== "number" || l.max_cost_usd_per_run < 0)
        throw new ConfigError("`llm.max_cost_usd_per_run` must be a number of dollars");
      config.llm.maxCostUsdPerRun = l.max_cost_usd_per_run;
    }
  }
  return config;
}

// node_modules/web-tree-sitter/web-tree-sitter.js
var __defProp2 = Object.defineProperty;
var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
var Edit = class {
  static {
    __name(this, "Edit");
  }
  /** The start position of the change. */
  startPosition;
  /** The end position of the change before the edit. */
  oldEndPosition;
  /** The end position of the change after the edit. */
  newEndPosition;
  /** The start index of the change. */
  startIndex;
  /** The end index of the change before the edit. */
  oldEndIndex;
  /** The end index of the change after the edit. */
  newEndIndex;
  constructor({
    startIndex,
    oldEndIndex,
    newEndIndex,
    startPosition,
    oldEndPosition,
    newEndPosition
  }) {
    this.startIndex = startIndex >>> 0;
    this.oldEndIndex = oldEndIndex >>> 0;
    this.newEndIndex = newEndIndex >>> 0;
    this.startPosition = startPosition;
    this.oldEndPosition = oldEndPosition;
    this.newEndPosition = newEndPosition;
  }
  /**
   * Edit a point and index to keep it in-sync with source code that has been edited.
   *
   * This function updates a single point's byte offset and row/column position
   * based on an edit operation. This is useful for editing points without
   * requiring a tree or node instance.
   */
  editPoint(point, index) {
    let newIndex = index;
    const newPoint = { ...point };
    if (index >= this.oldEndIndex) {
      newIndex = this.newEndIndex + (index - this.oldEndIndex);
      const originalRow = point.row;
      newPoint.row = this.newEndPosition.row + (point.row - this.oldEndPosition.row);
      newPoint.column = originalRow === this.oldEndPosition.row ? this.newEndPosition.column + (point.column - this.oldEndPosition.column) : point.column;
    } else if (index > this.startIndex) {
      newIndex = this.newEndIndex;
      newPoint.row = this.newEndPosition.row;
      newPoint.column = this.newEndPosition.column;
    }
    return { point: newPoint, index: newIndex };
  }
  /**
   * Edit a range to keep it in-sync with source code that has been edited.
   *
   * This function updates a range's start and end positions based on an edit
   * operation. This is useful for editing ranges without requiring a tree
   * or node instance.
   */
  editRange(range) {
    const newRange = {
      startIndex: range.startIndex,
      startPosition: { ...range.startPosition },
      endIndex: range.endIndex,
      endPosition: { ...range.endPosition }
    };
    if (range.endIndex >= this.oldEndIndex) {
      if (range.endIndex !== Number.MAX_SAFE_INTEGER) {
        newRange.endIndex = this.newEndIndex + (range.endIndex - this.oldEndIndex);
        newRange.endPosition = {
          row: this.newEndPosition.row + (range.endPosition.row - this.oldEndPosition.row),
          column: range.endPosition.row === this.oldEndPosition.row ? this.newEndPosition.column + (range.endPosition.column - this.oldEndPosition.column) : range.endPosition.column
        };
        if (newRange.endIndex < this.newEndIndex) {
          newRange.endIndex = Number.MAX_SAFE_INTEGER;
          newRange.endPosition = { row: Number.MAX_SAFE_INTEGER, column: Number.MAX_SAFE_INTEGER };
        }
      }
    } else if (range.endIndex > this.startIndex) {
      newRange.endIndex = this.startIndex;
      newRange.endPosition = { ...this.startPosition };
    }
    if (range.startIndex >= this.oldEndIndex) {
      newRange.startIndex = this.newEndIndex + (range.startIndex - this.oldEndIndex);
      newRange.startPosition = {
        row: this.newEndPosition.row + (range.startPosition.row - this.oldEndPosition.row),
        column: range.startPosition.row === this.oldEndPosition.row ? this.newEndPosition.column + (range.startPosition.column - this.oldEndPosition.column) : range.startPosition.column
      };
      if (newRange.startIndex < this.newEndIndex) {
        newRange.startIndex = Number.MAX_SAFE_INTEGER;
        newRange.startPosition = { row: Number.MAX_SAFE_INTEGER, column: Number.MAX_SAFE_INTEGER };
      }
    } else if (range.startIndex > this.startIndex) {
      newRange.startIndex = this.startIndex;
      newRange.startPosition = { ...this.startPosition };
    }
    return newRange;
  }
};
var SIZE_OF_SHORT = 2;
var SIZE_OF_INT = 4;
var SIZE_OF_CURSOR = 4 * SIZE_OF_INT;
var SIZE_OF_NODE = 5 * SIZE_OF_INT;
var SIZE_OF_POINT = 2 * SIZE_OF_INT;
var SIZE_OF_RANGE = 2 * SIZE_OF_INT + 2 * SIZE_OF_POINT;
var ZERO_POINT = { row: 0, column: 0 };
var INTERNAL = /* @__PURE__ */ Symbol("INTERNAL");
function assertInternal(x) {
  if (x !== INTERNAL) throw new Error("Illegal constructor");
}
__name(assertInternal, "assertInternal");
function isPoint(point) {
  return !!point && typeof point.row === "number" && typeof point.column === "number";
}
__name(isPoint, "isPoint");
function setModule(module2) {
  C = module2;
}
__name(setModule, "setModule");
var C;
function newFinalizer(handler) {
  try {
    return new FinalizationRegistry(handler);
  } catch (e) {
    console.error("Unsupported FinalizationRegistry:", e);
    return;
  }
}
__name(newFinalizer, "newFinalizer");
var finalizer = newFinalizer((address) => {
  C._ts_lookahead_iterator_delete(address);
});
var LookaheadIterator = class {
  static {
    __name(this, "LookaheadIterator");
  }
  /** @internal */
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  language;
  /** @internal */
  positioned = false;
  /** @internal */
  constructor(internal, address, language) {
    assertInternal(internal);
    this[0] = address;
    this.language = language;
    finalizer?.register(this, address, this);
  }
  /**
   * Get the current symbol of the lookahead iterator.
   *
   * Returns `null` if the iterator is not positioned on a symbol:
   *
   * - Before the first iteration step
   * - After the iterator is exhausted
   * - After a {@link reset} or {@link resetState} call
   */
  get currentTypeId() {
    return this.positioned ? C._ts_lookahead_iterator_current_symbol(this[0]) : null;
  }
  /**
   * Get the current symbol name of the lookahead iterator.
   *
   * Returns `null` if the iterator is not positioned on a symbol.
   */
  get currentType() {
    const id = this.currentTypeId;
    if (id === null) return null;
    return this.language.types[id] ?? C.UTF8ToString(C._ts_language_symbol_name(this.language[0], id));
  }
  /** Delete the lookahead iterator, freeing its resources. */
  delete() {
    finalizer?.unregister(this);
    C._ts_lookahead_iterator_delete(this[0]);
    this[0] = 0;
  }
  /**
   * Reset the lookahead iterator.
   *
   * This returns `true` if the language was set successfully and `false`
   * otherwise.
   */
  reset(language, stateId) {
    if (C._ts_lookahead_iterator_reset(this[0], language[0], stateId)) {
      this.language = language;
      this.positioned = false;
      return true;
    }
    return false;
  }
  /**
   * Reset the lookahead iterator to another state.
   *
   * This returns `true` if the iterator was reset to the given state and
   * `false` otherwise.
   */
  resetState(stateId) {
    if (!C._ts_lookahead_iterator_reset_state(this[0], stateId)) return false;
    this.positioned = false;
    return true;
  }
  /**
   * Returns an iterator that iterates over the symbols of the lookahead iterator.
   *
   * The iterator will yield the current symbol name as a string for each step
   * until there are no more symbols to iterate over.
   */
  [Symbol.iterator]() {
    return {
      next: /* @__PURE__ */ __name(() => {
        this.positioned = Boolean(C._ts_lookahead_iterator_next(this[0]));
        const value = this.currentType;
        return value === null ? { done: true, value: "" } : { done: false, value };
      }, "next")
    };
  }
};
function getText(tree, startIndex, endIndex, startPosition) {
  const length = endIndex - startIndex;
  let result = tree.textCallback(startIndex, startPosition);
  if (result) {
    startIndex += result.length;
    while (startIndex < endIndex) {
      const string = tree.textCallback(startIndex, startPosition);
      if (string && string.length > 0) {
        startIndex += string.length;
        result += string;
      } else {
        break;
      }
    }
    if (startIndex > endIndex) {
      result = result.slice(0, length);
    }
  }
  return result ?? "";
}
__name(getText, "getText");
var finalizer2 = newFinalizer((address) => {
  C._ts_tree_delete(address);
});
var Tree = class _Tree {
  static {
    __name(this, "Tree");
  }
  /** @internal */
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  textCallback;
  /** The language that was used to parse the syntax tree. */
  language;
  /** @internal */
  constructor(internal, address, language, textCallback) {
    assertInternal(internal);
    this[0] = address;
    this.language = language;
    this.textCallback = textCallback;
    finalizer2?.register(this, address, this);
  }
  /** Create a shallow copy of the syntax tree. This is very fast. */
  copy() {
    const address = C._ts_tree_copy(this[0]);
    return new _Tree(INTERNAL, address, this.language, this.textCallback);
  }
  /** Delete the syntax tree, freeing its resources. */
  delete() {
    finalizer2?.unregister(this);
    C._ts_tree_delete(this[0]);
    this[0] = 0;
  }
  /** Get the root node of the syntax tree. */
  get rootNode() {
    C._ts_tree_root_node_wasm(this[0]);
    return unmarshalNode(this);
  }
  /**
   * Get the root node of the syntax tree, but with its position shifted
   * forward by the given offset.
   */
  rootNodeWithOffset(offsetBytes, offsetExtent) {
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    C.setValue(address, offsetBytes, "i32");
    marshalPoint(address + SIZE_OF_INT, offsetExtent);
    C._ts_tree_root_node_with_offset_wasm(this[0]);
    return unmarshalNode(this);
  }
  /**
   * Edit the syntax tree to keep it in sync with source code that has been
   * edited.
   *
   * You must describe the edit both in terms of byte offsets and in terms of
   * row/column coordinates.
   */
  edit(edit) {
    marshalEdit(edit);
    C._ts_tree_edit_wasm(this[0]);
  }
  /** Create a new {@link TreeCursor} starting from the root of the tree. */
  walk() {
    return this.rootNode.walk();
  }
  /**
   * Compare this old edited syntax tree to a new syntax tree representing
   * the same document, returning a sequence of ranges whose syntactic
   * structure has changed.
   *
   * For this to work correctly, this syntax tree must have been edited such
   * that its ranges match up to the new tree. Generally, you'll want to
   * call this method right after calling one of the [`Parser::parse`]
   * functions. Call it on the old tree that was passed to parse, and
   * pass the new tree that was returned from `parse`.
   */
  getChangedRanges(other) {
    if (!(other instanceof _Tree)) {
      throw new TypeError("Argument must be a Tree");
    }
    C._ts_tree_get_changed_ranges_wasm(this[0], other[0]);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = unmarshalRange(address);
        address += SIZE_OF_RANGE;
      }
      C._free(buffer);
    }
    return result;
  }
  /** Get the included ranges that were used to parse the syntax tree. */
  getIncludedRanges() {
    C._ts_tree_included_ranges_wasm(this[0]);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = unmarshalRange(address);
        address += SIZE_OF_RANGE;
      }
      C._free(buffer);
    }
    return result;
  }
};
var finalizer3 = newFinalizer((address) => {
  C._ts_tree_cursor_delete_wasm(address);
});
var TreeCursor = class _TreeCursor {
  static {
    __name(this, "TreeCursor");
  }
  /** @internal */
  // @ts-expect-error: never read
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  // @ts-expect-error: never read
  [1] = 0;
  // Internal handle for Wasm
  /** @internal */
  // @ts-expect-error: never read
  [2] = 0;
  // Internal handle for Wasm
  /** @internal */
  // @ts-expect-error: never read
  [3] = 0;
  // Internal handle for Wasm
  /** @internal */
  tree;
  /** @internal */
  constructor(internal, tree) {
    assertInternal(internal);
    this.tree = tree;
    unmarshalTreeCursor(this);
    finalizer3?.register(this, this.tree[0], this);
  }
  /** Creates a deep copy of the tree cursor. This allocates new memory. */
  copy() {
    const copy = new _TreeCursor(INTERNAL, this.tree);
    C._ts_tree_cursor_copy_wasm(this.tree[0]);
    unmarshalTreeCursor(copy);
    return copy;
  }
  /** Delete the tree cursor, freeing its resources. */
  delete() {
    finalizer3?.unregister(this);
    marshalTreeCursor(this);
    C._ts_tree_cursor_delete_wasm(this.tree[0]);
    this[0] = this[1] = this[2] = 0;
  }
  /** Get the tree cursor's current {@link Node}. */
  get currentNode() {
    marshalTreeCursor(this);
    C._ts_tree_cursor_current_node_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /**
   * Get the numerical field id of this tree cursor's current node.
   *
   * See also {@link TreeCursor#currentFieldName}.
   */
  get currentFieldId() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_field_id_wasm(this.tree[0]);
  }
  /** Get the field name of this tree cursor's current node. */
  get currentFieldName() {
    return this.tree.language.fields[this.currentFieldId];
  }
  /**
   * Get the depth of the cursor's current node relative to the original
   * node that the cursor was constructed with.
   */
  get currentDepth() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_depth_wasm(this.tree[0]);
  }
  /**
   * Get the index of the cursor's current node out of all of the
   * descendants of the original node that the cursor was constructed with.
   */
  get currentDescendantIndex() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_descendant_index_wasm(this.tree[0]);
  }
  /** Get the type of the cursor's current node. */
  get nodeType() {
    return this.tree.language.types[this.nodeTypeId] || "ERROR";
  }
  /** Get the type id of the cursor's current node. */
  get nodeTypeId() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_node_type_id_wasm(this.tree[0]);
  }
  /** Get the state id of the cursor's current node. */
  get nodeStateId() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_node_state_id_wasm(this.tree[0]);
  }
  /** Get the id of the cursor's current node. */
  get nodeId() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_node_id_wasm(this.tree[0]);
  }
  /**
   * Check if the cursor's current node is *named*.
   *
   * Named nodes correspond to named rules in the grammar, whereas
   * *anonymous* nodes correspond to string literals in the grammar.
   */
  get nodeIsNamed() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_node_is_named_wasm(this.tree[0]) === 1;
  }
  /**
   * Check if the cursor's current node is *missing*.
   *
   * Missing nodes are inserted by the parser in order to recover from
   * certain kinds of syntax errors.
   */
  get nodeIsMissing() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_current_node_is_missing_wasm(this.tree[0]) === 1;
  }
  /** Get the string content of the cursor's current node. */
  get nodeText() {
    marshalTreeCursor(this);
    const startIndex = C._ts_tree_cursor_start_index_wasm(this.tree[0]);
    const endIndex = C._ts_tree_cursor_end_index_wasm(this.tree[0]);
    C._ts_tree_cursor_start_position_wasm(this.tree[0]);
    const startPosition = unmarshalPoint(TRANSFER_BUFFER);
    return getText(this.tree, startIndex, endIndex, startPosition);
  }
  /** Get the start position of the cursor's current node. */
  get startPosition() {
    marshalTreeCursor(this);
    C._ts_tree_cursor_start_position_wasm(this.tree[0]);
    return unmarshalPoint(TRANSFER_BUFFER);
  }
  /** Get the end position of the cursor's current node. */
  get endPosition() {
    marshalTreeCursor(this);
    C._ts_tree_cursor_end_position_wasm(this.tree[0]);
    return unmarshalPoint(TRANSFER_BUFFER);
  }
  /** Get the start index of the cursor's current node. */
  get startIndex() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_start_index_wasm(this.tree[0]);
  }
  /** Get the end index of the cursor's current node. */
  get endIndex() {
    marshalTreeCursor(this);
    return C._ts_tree_cursor_end_index_wasm(this.tree[0]);
  }
  /**
   * Move this cursor to the first child of its current node.
   *
   * This returns `true` if the cursor successfully moved, and returns
   * `false` if there were no children.
   */
  gotoFirstChild() {
    marshalTreeCursor(this);
    const result = C._ts_tree_cursor_goto_first_child_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move this cursor to the last child of its current node.
   *
   * This returns `true` if the cursor successfully moved, and returns
   * `false` if there were no children.
   *
   * Note that this function may be slower than
   * {@link TreeCursor#gotoFirstChild} because it needs to
   * iterate through all the children to compute the child's position.
   */
  gotoLastChild() {
    marshalTreeCursor(this);
    const result = C._ts_tree_cursor_goto_last_child_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move this cursor to the parent of its current node.
   *
   * This returns `true` if the cursor successfully moved, and returns
   * `false` if there was no parent node (the cursor was already on the
   * root node).
   *
   * Note that the node the cursor was constructed with is considered the root
   * of the cursor, and the cursor cannot walk outside this node.
   */
  gotoParent() {
    marshalTreeCursor(this);
    const result = C._ts_tree_cursor_goto_parent_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move this cursor to the next sibling of its current node.
   *
   * This returns `true` if the cursor successfully moved, and returns
   * `false` if there was no next sibling node.
   *
   * Note that the node the cursor was constructed with is considered the root
   * of the cursor, and the cursor cannot walk outside this node.
   */
  gotoNextSibling() {
    marshalTreeCursor(this);
    const result = C._ts_tree_cursor_goto_next_sibling_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move this cursor to the previous sibling of its current node.
   *
   * This returns `true` if the cursor successfully moved, and returns
   * `false` if there was no previous sibling node.
   *
   * Note that this function may be slower than
   * {@link TreeCursor#gotoNextSibling} due to how node
   * positions are stored. In the worst case, this will need to iterate
   * through all the children up to the previous sibling node to recalculate
   * its position. Also note that the node the cursor was constructed with is
   * considered the root of the cursor, and the cursor cannot walk outside this node.
   */
  gotoPreviousSibling() {
    marshalTreeCursor(this);
    const result = C._ts_tree_cursor_goto_previous_sibling_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move the cursor to the node that is the nth descendant of
   * the original node that the cursor was constructed with, where
   * zero represents the original node itself.
   */
  gotoDescendant(goalDescendantIndex) {
    marshalTreeCursor(this);
    C._ts_tree_cursor_goto_descendant_wasm(this.tree[0], goalDescendantIndex);
    unmarshalTreeCursor(this);
  }
  /**
   * Move this cursor to the first child of its current node that contains or
   * starts after the given byte offset.
   *
   * This returns `true` if the cursor successfully moved to a child node, and returns
   * `false` if no such child was found.
   */
  gotoFirstChildForIndex(goalIndex) {
    marshalTreeCursor(this);
    C.setValue(TRANSFER_BUFFER + SIZE_OF_CURSOR, goalIndex, "i32");
    const result = C._ts_tree_cursor_goto_first_child_for_index_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Move this cursor to the first child of its current node that contains or
   * starts after the given byte offset.
   *
   * This returns the index of the child node if one was found, and returns
   * `null` if no such child was found.
   */
  gotoFirstChildForPosition(goalPosition) {
    marshalTreeCursor(this);
    marshalPoint(TRANSFER_BUFFER + SIZE_OF_CURSOR, goalPosition);
    const result = C._ts_tree_cursor_goto_first_child_for_position_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
    return result === 1;
  }
  /**
   * Re-initialize this tree cursor to start at the original node that the
   * cursor was constructed with.
   */
  reset(node) {
    marshalNode(node);
    marshalTreeCursor(this, TRANSFER_BUFFER + SIZE_OF_NODE);
    C._ts_tree_cursor_reset_wasm(this.tree[0]);
    unmarshalTreeCursor(this);
  }
  /**
   * Re-initialize a tree cursor to the same position as another cursor.
   *
   * Unlike {@link TreeCursor#reset}, this will not lose parent
   * information and allows reusing already created cursors.
   */
  resetTo(cursor) {
    marshalTreeCursor(this, TRANSFER_BUFFER);
    marshalTreeCursor(cursor, TRANSFER_BUFFER + SIZE_OF_CURSOR);
    C._ts_tree_cursor_reset_to_wasm(this.tree[0], cursor.tree[0]);
    unmarshalTreeCursor(this);
  }
};
var Node = class {
  static {
    __name(this, "Node");
  }
  /** @internal */
  // @ts-expect-error: never read
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  _children;
  /** @internal */
  _namedChildren;
  /** @internal */
  constructor(internal, {
    id,
    tree,
    startIndex,
    startPosition,
    other
  }) {
    assertInternal(internal);
    this[0] = other;
    this.id = id;
    this.tree = tree;
    this.startIndex = startIndex;
    this.startPosition = startPosition;
  }
  /**
   * The numeric id for this node that is unique.
   *
   * Within a given syntax tree, no two nodes have the same id. However:
   *
   * * If a new tree is created based on an older tree, and a node from the old tree is reused in
   *   the process, then that node will have the same id in both trees.
   *
   * * A node not marked as having changes does not guarantee it was reused.
   *
   * * If a node is marked as having changed in the old tree, it will not be reused.
   */
  id;
  /** The byte index where this node starts. */
  startIndex;
  /** The position where this node starts. */
  startPosition;
  /** The tree that this node belongs to. */
  tree;
  /** Get this node's type as a numerical id. */
  get typeId() {
    marshalNode(this);
    return C._ts_node_symbol_wasm(this.tree[0]);
  }
  /**
   * Get the node's type as a numerical id as it appears in the grammar,
   * ignoring aliases.
   */
  get grammarId() {
    marshalNode(this);
    return C._ts_node_grammar_symbol_wasm(this.tree[0]);
  }
  /** Get this node's type as a string. */
  get type() {
    return this.tree.language.types[this.typeId] || "ERROR";
  }
  /**
   * Get this node's symbol name as it appears in the grammar, ignoring
   * aliases as a string.
   */
  get grammarType() {
    return this.tree.language.types[this.grammarId] || "ERROR";
  }
  /**
   * Check if this node is *named*.
   *
   * Named nodes correspond to named rules in the grammar, whereas
   * *anonymous* nodes correspond to string literals in the grammar.
   */
  get isNamed() {
    marshalNode(this);
    return C._ts_node_is_named_wasm(this.tree[0]) === 1;
  }
  /**
   * Check if this node is *extra*.
   *
   * Extra nodes represent things like comments, which are not required
   * by the grammar, but can appear anywhere.
   */
  get isExtra() {
    marshalNode(this);
    return C._ts_node_is_extra_wasm(this.tree[0]) === 1;
  }
  /**
   * Check if this node represents a syntax error.
   *
   * Syntax errors represent parts of the code that could not be incorporated
   * into a valid syntax tree.
   */
  get isError() {
    marshalNode(this);
    return C._ts_node_is_error_wasm(this.tree[0]) === 1;
  }
  /**
   * Check if this node is *missing*.
   *
   * Missing nodes are inserted by the parser in order to recover from
   * certain kinds of syntax errors.
   */
  get isMissing() {
    marshalNode(this);
    return C._ts_node_is_missing_wasm(this.tree[0]) === 1;
  }
  /** Check if this node has been edited. */
  get hasChanges() {
    marshalNode(this);
    return C._ts_node_has_changes_wasm(this.tree[0]) === 1;
  }
  /**
   * Check if this node represents a syntax error or contains any syntax
   * errors anywhere within it.
   */
  get hasError() {
    marshalNode(this);
    return C._ts_node_has_error_wasm(this.tree[0]) === 1;
  }
  /** Get the byte index where this node ends. */
  get endIndex() {
    marshalNode(this);
    return C._ts_node_end_index_wasm(this.tree[0]);
  }
  /** Get the position where this node ends. */
  get endPosition() {
    marshalNode(this);
    C._ts_node_end_point_wasm(this.tree[0]);
    return unmarshalPoint(TRANSFER_BUFFER);
  }
  /** Get the string content of this node. */
  get text() {
    return getText(this.tree, this.startIndex, this.endIndex, this.startPosition);
  }
  /** Get this node's parse state. */
  get parseState() {
    marshalNode(this);
    return C._ts_node_parse_state_wasm(this.tree[0]);
  }
  /** Get the parse state after this node. */
  get nextParseState() {
    marshalNode(this);
    return C._ts_node_next_parse_state_wasm(this.tree[0]);
  }
  /** Check if this node is equal to another node. */
  equals(other) {
    return this.tree === other.tree && this.id === other.id;
  }
  /**
   * Get the node's child at the given index, where zero represents the first child.
   *
   * This method is fairly fast, but its cost is technically log(n), so if
   * you might be iterating over a long list of children, you should use
   * {@link Node#children} instead.
   */
  child(index) {
    marshalNode(this);
    C._ts_node_child_wasm(this.tree[0], index);
    return unmarshalNode(this.tree);
  }
  /**
   * Get this node's *named* child at the given index.
   *
   * See also {@link Node#isNamed}.
   * This method is fairly fast, but its cost is technically log(n), so if
   * you might be iterating over a long list of children, you should use
   * {@link Node#namedChildren} instead.
   */
  namedChild(index) {
    marshalNode(this);
    C._ts_node_named_child_wasm(this.tree[0], index);
    return unmarshalNode(this.tree);
  }
  /**
   * Get this node's child with the given numerical field id.
   *
   * See also {@link Node#childForFieldName}. You can
   * convert a field name to an id using {@link Language#fieldIdForName}.
   */
  childForFieldId(fieldId) {
    marshalNode(this);
    C._ts_node_child_by_field_id_wasm(this.tree[0], fieldId);
    return unmarshalNode(this.tree);
  }
  /**
   * Get the first child with the given field name.
   *
   * If multiple children may have the same field name, access them using
   * {@link Node#childrenForFieldName}.
   */
  childForFieldName(fieldName) {
    const fieldId = this.tree.language.fields.indexOf(fieldName);
    if (fieldId !== -1) return this.childForFieldId(fieldId);
    return null;
  }
  /** Get the field name of this node's child at the given index. */
  fieldNameForChild(index) {
    marshalNode(this);
    const address = C._ts_node_field_name_for_child_wasm(this.tree[0], index);
    if (!address) return null;
    return C.AsciiToString(address);
  }
  /** Get the field name of this node's named child at the given index. */
  fieldNameForNamedChild(index) {
    marshalNode(this);
    const address = C._ts_node_field_name_for_named_child_wasm(this.tree[0], index);
    if (!address) return null;
    return C.AsciiToString(address);
  }
  /**
   * Get an array of this node's children with a given field name.
   *
   * See also {@link Node#children}.
   */
  childrenForFieldName(fieldName) {
    const fieldId = this.tree.language.fields.indexOf(fieldName);
    if (fieldId !== -1 && fieldId !== 0) return this.childrenForFieldId(fieldId);
    return [];
  }
  /**
    * Get an array of this node's children with a given field id.
    *
    * See also {@link Node#childrenForFieldName}.
    */
  childrenForFieldId(fieldId) {
    marshalNode(this);
    C._ts_node_children_by_field_id_wasm(this.tree[0], fieldId);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = unmarshalNode(this.tree, address);
        address += SIZE_OF_NODE;
      }
      C._free(buffer);
    }
    return result;
  }
  /** Get the node's first child that contains or starts after the given byte offset. */
  firstChildForIndex(index) {
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    C.setValue(address, index, "i32");
    C._ts_node_first_child_for_byte_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the node's first named child that contains or starts after the given byte offset. */
  firstNamedChildForIndex(index) {
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    C.setValue(address, index, "i32");
    C._ts_node_first_named_child_for_byte_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get this node's number of children. */
  get childCount() {
    marshalNode(this);
    return C._ts_node_child_count_wasm(this.tree[0]);
  }
  /**
   * Get this node's number of *named* children.
   *
   * See also {@link Node#isNamed}.
   */
  get namedChildCount() {
    marshalNode(this);
    return C._ts_node_named_child_count_wasm(this.tree[0]);
  }
  /** Get this node's first child. */
  get firstChild() {
    return this.child(0);
  }
  /**
   * Get this node's first named child.
   *
   * See also {@link Node#isNamed}.
   */
  get firstNamedChild() {
    return this.namedChild(0);
  }
  /** Get this node's last child. */
  get lastChild() {
    return this.child(this.childCount - 1);
  }
  /**
   * Get this node's last named child.
   *
   * See also {@link Node#isNamed}.
   */
  get lastNamedChild() {
    return this.namedChild(this.namedChildCount - 1);
  }
  /**
   * Iterate over this node's children.
   *
   * If you're walking the tree recursively, you may want to use the
   * {@link TreeCursor} APIs directly instead.
   */
  get children() {
    if (!this._children) {
      marshalNode(this);
      C._ts_node_children_wasm(this.tree[0]);
      const count = C.getValue(TRANSFER_BUFFER, "i32");
      const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
      this._children = new Array(count);
      if (count > 0) {
        let address = buffer;
        for (let i2 = 0; i2 < count; i2++) {
          this._children[i2] = unmarshalNode(this.tree, address);
          address += SIZE_OF_NODE;
        }
        C._free(buffer);
      }
    }
    return this._children;
  }
  /**
   * Iterate over this node's named children.
   *
   * See also {@link Node#children}.
   */
  get namedChildren() {
    if (!this._namedChildren) {
      marshalNode(this);
      C._ts_node_named_children_wasm(this.tree[0]);
      const count = C.getValue(TRANSFER_BUFFER, "i32");
      const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
      this._namedChildren = new Array(count);
      if (count > 0) {
        let address = buffer;
        for (let i2 = 0; i2 < count; i2++) {
          this._namedChildren[i2] = unmarshalNode(this.tree, address);
          address += SIZE_OF_NODE;
        }
        C._free(buffer);
      }
    }
    return this._namedChildren;
  }
  /**
   * Get the descendants of this node that are the given type, or in the given types array.
   *
   * The types array should contain node type strings, which can be retrieved from {@link Language#types}.
   *
   * Additionally, a `startPosition` and `endPosition` can be passed in to restrict the search to a byte range.
   */
  descendantsOfType(types, startPosition = ZERO_POINT, endPosition = ZERO_POINT) {
    if (!Array.isArray(types)) types = [types];
    const symbols = [];
    const typesBySymbol = this.tree.language.types;
    for (const node_type of types) {
      if (node_type == "ERROR") {
        symbols.push(65535);
      }
    }
    for (let i2 = 0, n = typesBySymbol.length; i2 < n; i2++) {
      if (types.includes(typesBySymbol[i2])) {
        symbols.push(i2);
      }
    }
    const symbolsAddress = C._malloc(SIZE_OF_INT * symbols.length);
    for (let i2 = 0, n = symbols.length; i2 < n; i2++) {
      C.setValue(symbolsAddress + i2 * SIZE_OF_INT, symbols[i2], "i32");
    }
    marshalNode(this);
    C._ts_node_descendants_of_type_wasm(
      this.tree[0],
      symbolsAddress,
      symbols.length,
      startPosition.row,
      startPosition.column,
      endPosition.row,
      endPosition.column
    );
    const descendantCount = C.getValue(TRANSFER_BUFFER, "i32");
    const descendantAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(descendantCount);
    if (descendantCount > 0) {
      let address = descendantAddress;
      for (let i2 = 0; i2 < descendantCount; i2++) {
        result[i2] = unmarshalNode(this.tree, address);
        address += SIZE_OF_NODE;
      }
    }
    C._free(descendantAddress);
    C._free(symbolsAddress);
    return result;
  }
  /** Get this node's next sibling. */
  get nextSibling() {
    marshalNode(this);
    C._ts_node_next_sibling_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get this node's previous sibling. */
  get previousSibling() {
    marshalNode(this);
    C._ts_node_prev_sibling_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /**
   * Get this node's next *named* sibling.
   *
   * See also {@link Node#isNamed}.
   */
  get nextNamedSibling() {
    marshalNode(this);
    C._ts_node_next_named_sibling_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /**
   * Get this node's previous *named* sibling.
   *
   * See also {@link Node#isNamed}.
   */
  get previousNamedSibling() {
    marshalNode(this);
    C._ts_node_prev_named_sibling_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the node's number of descendants, including one for the node itself. */
  get descendantCount() {
    marshalNode(this);
    return C._ts_node_descendant_count_wasm(this.tree[0]);
  }
  /**
   * Get this node's immediate parent.
   * Prefer {@link Node#childWithDescendant} for iterating over this node's ancestors.
   */
  get parent() {
    marshalNode(this);
    C._ts_node_parent_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /**
   * Get the node that contains `descendant`.
   *
   * Note that this can return `descendant` itself.
   */
  childWithDescendant(descendant) {
    marshalNode(this);
    marshalNode(descendant, 1);
    C._ts_node_child_with_descendant_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the smallest node within this node that spans the given byte range. */
  descendantForIndex(start2, end = start2) {
    if (typeof start2 !== "number" || typeof end !== "number") {
      throw new Error("Arguments must be numbers");
    }
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    C.setValue(address, start2, "i32");
    C.setValue(address + SIZE_OF_INT, end, "i32");
    C._ts_node_descendant_for_index_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the smallest named node within this node that spans the given byte range. */
  namedDescendantForIndex(start2, end = start2) {
    if (typeof start2 !== "number" || typeof end !== "number") {
      throw new Error("Arguments must be numbers");
    }
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    C.setValue(address, start2, "i32");
    C.setValue(address + SIZE_OF_INT, end, "i32");
    C._ts_node_named_descendant_for_index_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the smallest node within this node that spans the given point range. */
  descendantForPosition(start2, end = start2) {
    if (!isPoint(start2) || !isPoint(end)) {
      throw new Error("Arguments must be {row, column} objects");
    }
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    marshalPoint(address, start2);
    marshalPoint(address + SIZE_OF_POINT, end);
    C._ts_node_descendant_for_position_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /** Get the smallest named node within this node that spans the given point range. */
  namedDescendantForPosition(start2, end = start2) {
    if (!isPoint(start2) || !isPoint(end)) {
      throw new Error("Arguments must be {row, column} objects");
    }
    marshalNode(this);
    const address = TRANSFER_BUFFER + SIZE_OF_NODE;
    marshalPoint(address, start2);
    marshalPoint(address + SIZE_OF_POINT, end);
    C._ts_node_named_descendant_for_position_wasm(this.tree[0]);
    return unmarshalNode(this.tree);
  }
  /**
   * Create a new {@link TreeCursor} starting from this node.
   *
   * Note that the given node is considered the root of the cursor,
   * and the cursor cannot walk outside this node.
   */
  walk() {
    marshalNode(this);
    C._ts_tree_cursor_new_wasm(this.tree[0]);
    return new TreeCursor(INTERNAL, this.tree);
  }
  /**
   * Edit this node to keep it in-sync with source code that has been edited.
   *
   * This function is only rarely needed. When you edit a syntax tree with
   * the {@link Tree#edit} method, all of the nodes that you retrieve from
   * the tree afterward will already reflect the edit. You only need to
   * use {@link Node#edit} when you have a specific {@link Node} instance that
   * you want to keep and continue to use after an edit.
   */
  edit(edit) {
    if (this.startIndex >= edit.oldEndIndex) {
      this.startIndex = edit.newEndIndex + (this.startIndex - edit.oldEndIndex);
      let subbedPointRow;
      let subbedPointColumn;
      if (this.startPosition.row > edit.oldEndPosition.row) {
        subbedPointRow = this.startPosition.row - edit.oldEndPosition.row;
        subbedPointColumn = this.startPosition.column;
      } else {
        subbedPointRow = 0;
        subbedPointColumn = this.startPosition.column;
        if (this.startPosition.column >= edit.oldEndPosition.column) {
          subbedPointColumn = this.startPosition.column - edit.oldEndPosition.column;
        }
      }
      if (subbedPointRow > 0) {
        this.startPosition.row += subbedPointRow;
        this.startPosition.column = subbedPointColumn;
      } else {
        this.startPosition.column += subbedPointColumn;
      }
    } else if (this.startIndex > edit.startIndex) {
      this.startIndex = edit.newEndIndex;
      this.startPosition.row = edit.newEndPosition.row;
      this.startPosition.column = edit.newEndPosition.column;
    }
  }
  /** Get the S-expression representation of this node. */
  toString() {
    marshalNode(this);
    const address = C._ts_node_to_string_wasm(this.tree[0]);
    const result = C.AsciiToString(address);
    C._free(address);
    return result;
  }
};
function unmarshalCaptures(query, tree, address, patternIndex, result) {
  for (let i2 = 0, n = result.length; i2 < n; i2++) {
    const captureIndex = C.getValue(address, "i32");
    address += SIZE_OF_INT;
    const node = unmarshalNode(tree, address);
    address += SIZE_OF_NODE;
    result[i2] = { patternIndex, name: query.captureNames[captureIndex], node };
  }
  return address;
}
__name(unmarshalCaptures, "unmarshalCaptures");
function marshalNode(node, index = 0) {
  let address = TRANSFER_BUFFER + index * SIZE_OF_NODE;
  C.setValue(address, node.id, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, node.startIndex, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, node.startPosition.row, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, node.startPosition.column, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, node[0], "i32");
}
__name(marshalNode, "marshalNode");
function unmarshalNode(tree, address = TRANSFER_BUFFER) {
  const id = C.getValue(address, "i32");
  address += SIZE_OF_INT;
  if (id === 0) return null;
  const index = C.getValue(address, "i32");
  address += SIZE_OF_INT;
  const row = C.getValue(address, "i32");
  address += SIZE_OF_INT;
  const column = C.getValue(address, "i32");
  address += SIZE_OF_INT;
  const other = C.getValue(address, "i32");
  const result = new Node(INTERNAL, {
    id,
    tree,
    startIndex: index,
    startPosition: { row, column },
    other
  });
  return result;
}
__name(unmarshalNode, "unmarshalNode");
function marshalTreeCursor(cursor, address = TRANSFER_BUFFER) {
  C.setValue(address + 0 * SIZE_OF_INT, cursor[0], "i32");
  C.setValue(address + 1 * SIZE_OF_INT, cursor[1], "i32");
  C.setValue(address + 2 * SIZE_OF_INT, cursor[2], "i32");
  C.setValue(address + 3 * SIZE_OF_INT, cursor[3], "i32");
}
__name(marshalTreeCursor, "marshalTreeCursor");
function unmarshalTreeCursor(cursor) {
  cursor[0] = C.getValue(TRANSFER_BUFFER + 0 * SIZE_OF_INT, "i32");
  cursor[1] = C.getValue(TRANSFER_BUFFER + 1 * SIZE_OF_INT, "i32");
  cursor[2] = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
  cursor[3] = C.getValue(TRANSFER_BUFFER + 3 * SIZE_OF_INT, "i32");
}
__name(unmarshalTreeCursor, "unmarshalTreeCursor");
function marshalPoint(address, point) {
  C.setValue(address, point.row, "i32");
  C.setValue(address + SIZE_OF_INT, point.column, "i32");
}
__name(marshalPoint, "marshalPoint");
function unmarshalPoint(address) {
  const result = {
    row: C.getValue(address, "i32") >>> 0,
    column: C.getValue(address + SIZE_OF_INT, "i32") >>> 0
  };
  return result;
}
__name(unmarshalPoint, "unmarshalPoint");
function marshalRange(address, range) {
  marshalPoint(address, range.startPosition);
  address += SIZE_OF_POINT;
  marshalPoint(address, range.endPosition);
  address += SIZE_OF_POINT;
  C.setValue(address, range.startIndex, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, range.endIndex, "i32");
  address += SIZE_OF_INT;
}
__name(marshalRange, "marshalRange");
function unmarshalRange(address) {
  const result = {};
  result.startPosition = unmarshalPoint(address);
  address += SIZE_OF_POINT;
  result.endPosition = unmarshalPoint(address);
  address += SIZE_OF_POINT;
  result.startIndex = C.getValue(address, "i32") >>> 0;
  address += SIZE_OF_INT;
  result.endIndex = C.getValue(address, "i32") >>> 0;
  return result;
}
__name(unmarshalRange, "unmarshalRange");
function marshalEdit(edit, address = TRANSFER_BUFFER) {
  marshalPoint(address, edit.startPosition);
  address += SIZE_OF_POINT;
  marshalPoint(address, edit.oldEndPosition);
  address += SIZE_OF_POINT;
  marshalPoint(address, edit.newEndPosition);
  address += SIZE_OF_POINT;
  C.setValue(address, edit.startIndex, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, edit.oldEndIndex, "i32");
  address += SIZE_OF_INT;
  C.setValue(address, edit.newEndIndex, "i32");
  address += SIZE_OF_INT;
}
__name(marshalEdit, "marshalEdit");
function unmarshalLanguageMetadata(address) {
  const major_version = C.getValue(address, "i32");
  const minor_version = C.getValue(address += SIZE_OF_INT, "i32");
  const patch_version = C.getValue(address += SIZE_OF_INT, "i32");
  return { major_version, minor_version, patch_version };
}
__name(unmarshalLanguageMetadata, "unmarshalLanguageMetadata");
var LANGUAGE_FUNCTION_REGEX = /^tree_sitter_\w+$/;
var Language = class _Language {
  static {
    __name(this, "Language");
  }
  /** @internal */
  [0] = 0;
  // Internal handle for Wasm
  /**
   * A list of all node types in the language. The index of each type in this
   * array is its node type id.
   */
  types;
  /**
   * A list of all field names in the language. The index of each field name in
   * this array is its field id.
   */
  fields;
  /** @internal */
  constructor(internal, address) {
    assertInternal(internal);
    this[0] = address;
    this.types = new Array(C._ts_language_symbol_count(this[0]));
    for (let i2 = 0, n = this.types.length; i2 < n; i2++) {
      if (C._ts_language_symbol_type(this[0], i2) < 2) {
        this.types[i2] = C.UTF8ToString(C._ts_language_symbol_name(this[0], i2));
      }
    }
    this.fields = new Array(C._ts_language_field_count(this[0]) + 1);
    for (let i2 = 0, n = this.fields.length; i2 < n; i2++) {
      const fieldName = C._ts_language_field_name_for_id(this[0], i2);
      if (fieldName !== 0) {
        this.fields[i2] = C.UTF8ToString(fieldName);
      } else {
        this.fields[i2] = null;
      }
    }
  }
  /**
   * Gets the name of the language.
   */
  get name() {
    const ptr = C._ts_language_name(this[0]);
    if (ptr === 0) return null;
    return C.UTF8ToString(ptr);
  }
  /**
   * Gets the ABI version of the language.
   */
  get abiVersion() {
    return C._ts_language_abi_version(this[0]);
  }
  /**
  * Get the metadata for this language. This information is generated by the
  * CLI, and relies on the language author providing the correct metadata in
  * the language's `tree-sitter.json` file.
  */
  get metadata() {
    C._ts_language_metadata_wasm(this[0]);
    const length = C.getValue(TRANSFER_BUFFER, "i32");
    if (length === 0) return null;
    return unmarshalLanguageMetadata(TRANSFER_BUFFER + SIZE_OF_INT);
  }
  /**
   * Gets the number of fields in the language.
   */
  get fieldCount() {
    return this.fields.length - 1;
  }
  /**
   * Gets the number of states in the language.
   */
  get stateCount() {
    return C._ts_language_state_count(this[0]);
  }
  /**
   * Get the field id for a field name.
   */
  fieldIdForName(fieldName) {
    const result = this.fields.indexOf(fieldName);
    return result !== -1 ? result : null;
  }
  /**
   * Get the field name for a field id.
   */
  fieldNameForId(fieldId) {
    return this.fields[fieldId] ?? null;
  }
  /**
   * Get the node type id for a node type name.
   */
  idForNodeType(type, named) {
    const typeLength = C.lengthBytesUTF8(type);
    const typeAddress = C._malloc(typeLength + 1);
    C.stringToUTF8(type, typeAddress, typeLength + 1);
    const result = C._ts_language_symbol_for_name(this[0], typeAddress, typeLength, named ? 1 : 0);
    C._free(typeAddress);
    return result || null;
  }
  /**
   * Gets the number of node types in the language.
   */
  get nodeTypeCount() {
    return C._ts_language_symbol_count(this[0]);
  }
  /**
   * Get the node type name for a node type id.
   */
  nodeTypeForId(typeId) {
    const name2 = C._ts_language_symbol_name(this[0], typeId);
    return name2 ? C.UTF8ToString(name2) : null;
  }
  /**
   * Check if a node type is named.
   *
   * @see {@link https://tree-sitter.github.io/tree-sitter/using-parsers/2-basic-parsing.html#named-vs-anonymous-nodes}
   */
  nodeTypeIsNamed(typeId) {
    return C._ts_language_type_is_named_wasm(this[0], typeId) ? true : false;
  }
  /**
   * Check if a node type is visible.
   */
  nodeTypeIsVisible(typeId) {
    return C._ts_language_type_is_visible_wasm(this[0], typeId) ? true : false;
  }
  /**
   * Get the supertypes ids of this language.
   *
   * @see {@link https://tree-sitter.github.io/tree-sitter/using-parsers/6-static-node-types.html?highlight=supertype#supertype-nodes}
   */
  get supertypes() {
    C._ts_language_supertypes_wasm(this[0]);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = C.getValue(address, "i16");
        address += SIZE_OF_SHORT;
      }
    }
    return result;
  }
  /**
   * Get the subtype ids for a given supertype node id.
   */
  subtypes(supertype) {
    C._ts_language_subtypes_wasm(this[0], supertype);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = C.getValue(address, "i16");
        address += SIZE_OF_SHORT;
      }
    }
    return result;
  }
  /**
   * Get the next state id for a given state id and node type id.
   */
  nextState(stateId, typeId) {
    return C._ts_language_next_state(this[0], stateId, typeId);
  }
  /**
   * Create a new lookahead iterator for this language and parse state.
   *
   * This returns `null` if state is invalid for this language.
   *
   * Iterating {@link LookaheadIterator} will yield valid symbols in the given
   * parse state. A newly created iterator is not positioned on a symbol, so
   * {@link LookaheadIterator#currentType} returns `null` until the first
   * iteration step.
   *
   * Lookahead iterators can be useful for generating suggestions and improving
   * syntax error diagnostics. To get symbols valid in an `ERROR` node, use the
   * lookahead iterator on its first leaf node state. For `MISSING` nodes, a
   * lookahead iterator created on the previous non-extra leaf node may be
   * appropriate.
   */
  lookaheadIterator(stateId) {
    const address = C._ts_lookahead_iterator_new(this[0], stateId);
    if (address) return new LookaheadIterator(INTERNAL, address, this);
    return null;
  }
  /**
   * Load a language from a WebAssembly module.
   * The module can be provided as a path to a file, a `URL` to a file, or as a
   * buffer.
   */
  static async load(input) {
    let binary2;
    if (input instanceof Uint8Array) {
      binary2 = input;
    } else if (globalThis.process?.versions.node) {
      const fs2 = await import("fs/promises");
      binary2 = await fs2.readFile(input);
    } else {
      const response = await fetch(input);
      if (!response.ok) {
        const body2 = await response.text();
        throw new Error(`Language.load failed with status ${response.status}.

${body2}`);
      }
      const retryResp = response.clone();
      try {
        binary2 = await WebAssembly.compileStreaming(response);
      } catch (reason) {
        console.error("wasm streaming compile failed:", reason);
        console.error("falling back to ArrayBuffer instantiation");
        binary2 = new Uint8Array(await retryResp.arrayBuffer());
      }
    }
    const mod = await C.loadWebAssemblyModule(binary2, { loadAsync: true });
    return _Language.loadFromWasmExports(mod, { sync: false });
  }
  static loadFromWasmExports(mod, { sync }) {
    const symbolNames = Object.keys(mod);
    const functionName2 = symbolNames.find((key) => LANGUAGE_FUNCTION_REGEX.test(key) && !key.includes("external_scanner_"));
    if (!functionName2) {
      console.log(`Couldn't find language function in Wasm file. Symbols:
${JSON.stringify(symbolNames, null, 2)}`);
      throw new Error(`Language.${sync ? "loadSync" : "load"} failed: no language function found in Wasm file`);
    }
    const languageAddress = mod[functionName2]();
    return new _Language(INTERNAL, languageAddress);
  }
  /**
   * Load a language synchronously from a pre-compiled WebAssembly module.
   * Use this when the host environment provides a `WebAssembly.Module` directly.
   */
  static loadSync(wasmModule) {
    const mod = C.loadWebAssemblyModule(wasmModule, { loadAsync: false });
    return _Language.loadFromWasmExports(mod, { sync: true });
  }
};
async function Module2(moduleArg = {}) {
  var moduleRtn;
  var Module = moduleArg;
  var ENVIRONMENT_IS_WEB = typeof window == "object";
  var ENVIRONMENT_IS_WORKER = typeof WorkerGlobalScope != "undefined";
  var ENVIRONMENT_IS_NODE = typeof process == "object" && process.versions?.node && process.type != "renderer";
  if (ENVIRONMENT_IS_NODE) {
    const { createRequire: createRequire2 } = await import("module");
    var require = createRequire2(import.meta.url);
  }
  Module.currentQueryProgressCallback = null;
  Module.currentProgressCallback = null;
  Module.currentLogCallback = null;
  Module.currentParseCallback = null;
  var arguments_ = [];
  var thisProgram = "./this.program";
  var quit_ = /* @__PURE__ */ __name((status, toThrow) => {
    throw toThrow;
  }, "quit_");
  var _scriptName = import.meta.url;
  var scriptDirectory = "";
  function locateFile(path) {
    if (Module["locateFile"]) {
      return Module["locateFile"](path, scriptDirectory);
    }
    return scriptDirectory + path;
  }
  __name(locateFile, "locateFile");
  var readAsync, readBinary;
  if (ENVIRONMENT_IS_NODE) {
    var fs = require("fs");
    if (_scriptName.startsWith("file:")) {
      scriptDirectory = require("path").dirname(require("url").fileURLToPath(_scriptName)) + "/";
    }
    readBinary = /* @__PURE__ */ __name((filename) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename);
      return ret;
    }, "readBinary");
    readAsync = /* @__PURE__ */ __name(async (filename, binary2 = true) => {
      filename = isFileURI(filename) ? new URL(filename) : filename;
      var ret = fs.readFileSync(filename, binary2 ? void 0 : "utf8");
      return ret;
    }, "readAsync");
    if (process.argv.length > 1) {
      thisProgram = process.argv[1].replace(/\\/g, "/");
    }
    arguments_ = process.argv.slice(2);
    quit_ = /* @__PURE__ */ __name((status, toThrow) => {
      process.exitCode = status;
      throw toThrow;
    }, "quit_");
  } else if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
    try {
      scriptDirectory = new URL(".", _scriptName).href;
    } catch {
    }
    {
      if (ENVIRONMENT_IS_WORKER) {
        readBinary = /* @__PURE__ */ __name((url) => {
          var xhr = new XMLHttpRequest();
          xhr.open("GET", url, false);
          xhr.responseType = "arraybuffer";
          xhr.send(null);
          return new Uint8Array(
            /** @type{!ArrayBuffer} */
            xhr.response
          );
        }, "readBinary");
      }
      readAsync = /* @__PURE__ */ __name(async (url) => {
        if (isFileURI(url)) {
          return new Promise((resolve2, reject) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                resolve2(xhr.response);
                return;
              }
              reject(xhr.status);
            };
            xhr.onerror = reject;
            xhr.send(null);
          });
        }
        var response = await fetch(url, {
          credentials: "same-origin"
        });
        if (response.ok) {
          return response.arrayBuffer();
        }
        throw new Error(response.status + " : " + response.url);
      }, "readAsync");
    }
  } else {
  }
  var out = console.log.bind(console);
  var err = console.error.bind(console);
  var dynamicLibraries = [];
  var wasmBinary;
  var ABORT = false;
  var EXITSTATUS;
  var isFileURI = /* @__PURE__ */ __name((filename) => filename.startsWith("file://"), "isFileURI");
  var readyPromiseResolve, readyPromiseReject;
  var wasmMemory;
  var HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
  var HEAP64, HEAPU64;
  var HEAP_DATA_VIEW;
  var runtimeInitialized = false;
  function updateMemoryViews() {
    var b = wasmMemory.buffer;
    Module["HEAP8"] = HEAP8 = new Int8Array(b);
    Module["HEAP16"] = HEAP16 = new Int16Array(b);
    Module["HEAPU8"] = HEAPU8 = new Uint8Array(b);
    Module["HEAPU16"] = HEAPU16 = new Uint16Array(b);
    Module["HEAP32"] = HEAP32 = new Int32Array(b);
    Module["HEAPU32"] = HEAPU32 = new Uint32Array(b);
    Module["HEAPF32"] = HEAPF32 = new Float32Array(b);
    Module["HEAPF64"] = HEAPF64 = new Float64Array(b);
    Module["HEAP64"] = HEAP64 = new BigInt64Array(b);
    Module["HEAPU64"] = HEAPU64 = new BigUint64Array(b);
    Module["HEAP_DATA_VIEW"] = HEAP_DATA_VIEW = new DataView(b);
    LE_HEAP_UPDATE();
  }
  __name(updateMemoryViews, "updateMemoryViews");
  function initMemory() {
    if (Module["wasmMemory"]) {
      wasmMemory = Module["wasmMemory"];
    } else {
      var INITIAL_MEMORY = Module["INITIAL_MEMORY"] || 33554432;
      wasmMemory = new WebAssembly.Memory({
        "initial": INITIAL_MEMORY / 65536,
        // In theory we should not need to emit the maximum if we want "unlimited"
        // or 4GB of memory, but VMs error on that atm, see
        // https://github.com/emscripten-core/emscripten/issues/14130
        // And in the pthreads case we definitely need to emit a maximum. So
        // always emit one.
        "maximum": 32768
      });
    }
    updateMemoryViews();
  }
  __name(initMemory, "initMemory");
  var __RELOC_FUNCS__ = [];
  function preRun() {
    if (Module["preRun"]) {
      if (typeof Module["preRun"] == "function") Module["preRun"] = [Module["preRun"]];
      while (Module["preRun"].length) {
        addOnPreRun(Module["preRun"].shift());
      }
    }
    callRuntimeCallbacks(onPreRuns);
  }
  __name(preRun, "preRun");
  function initRuntime() {
    runtimeInitialized = true;
    callRuntimeCallbacks(__RELOC_FUNCS__);
    wasmExports["__wasm_call_ctors"]();
    callRuntimeCallbacks(onPostCtors);
  }
  __name(initRuntime, "initRuntime");
  function preMain() {
  }
  __name(preMain, "preMain");
  function postRun() {
    if (Module["postRun"]) {
      if (typeof Module["postRun"] == "function") Module["postRun"] = [Module["postRun"]];
      while (Module["postRun"].length) {
        addOnPostRun(Module["postRun"].shift());
      }
    }
    callRuntimeCallbacks(onPostRuns);
  }
  __name(postRun, "postRun");
  function abort(what) {
    Module["onAbort"]?.(what);
    what = "Aborted(" + what + ")";
    err(what);
    ABORT = true;
    what += ". Build with -sASSERTIONS for more info.";
    var e = new WebAssembly.RuntimeError(what);
    readyPromiseReject?.(e);
    throw e;
  }
  __name(abort, "abort");
  var wasmBinaryFile;
  function findWasmBinary() {
    if (Module["locateFile"]) {
      return locateFile("web-tree-sitter.wasm");
    }
    return new URL("web-tree-sitter.wasm", import.meta.url).href;
  }
  __name(findWasmBinary, "findWasmBinary");
  function getBinarySync(file) {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    if (readBinary) {
      return readBinary(file);
    }
    throw "both async and sync fetching of the wasm failed";
  }
  __name(getBinarySync, "getBinarySync");
  async function getWasmBinary(binaryFile) {
    if (!wasmBinary) {
      try {
        var response = await readAsync(binaryFile);
        return new Uint8Array(response);
      } catch {
      }
    }
    return getBinarySync(binaryFile);
  }
  __name(getWasmBinary, "getWasmBinary");
  async function instantiateArrayBuffer(binaryFile, imports) {
    try {
      var binary2 = await getWasmBinary(binaryFile);
      var instance2 = await WebAssembly.instantiate(binary2, imports);
      return instance2;
    } catch (reason) {
      err(`failed to asynchronously prepare wasm: ${reason}`);
      abort(reason);
    }
  }
  __name(instantiateArrayBuffer, "instantiateArrayBuffer");
  async function instantiateAsync(binary2, binaryFile, imports) {
    if (!binary2 && !isFileURI(binaryFile) && !ENVIRONMENT_IS_NODE) {
      try {
        var response = fetch(binaryFile, {
          credentials: "same-origin"
        });
        var instantiationResult = await WebAssembly.instantiateStreaming(response, imports);
        return instantiationResult;
      } catch (reason) {
        err(`wasm streaming compile failed: ${reason}`);
        err("falling back to ArrayBuffer instantiation");
      }
    }
    return instantiateArrayBuffer(binaryFile, imports);
  }
  __name(instantiateAsync, "instantiateAsync");
  function getWasmImports() {
    return {
      "env": wasmImports,
      "wasi_snapshot_preview1": wasmImports,
      "GOT.mem": new Proxy(wasmImports, GOTHandler),
      "GOT.func": new Proxy(wasmImports, GOTHandler)
    };
  }
  __name(getWasmImports, "getWasmImports");
  async function createWasm() {
    function receiveInstance(instance2, module2) {
      wasmExports = instance2.exports;
      wasmExports = relocateExports(wasmExports, 1024);
      var metadata2 = getDylinkMetadata(module2);
      if (metadata2.neededDynlibs) {
        dynamicLibraries = metadata2.neededDynlibs.concat(dynamicLibraries);
      }
      mergeLibSymbols(wasmExports, "main");
      LDSO.init();
      loadDylibs();
      __RELOC_FUNCS__.push(wasmExports["__wasm_apply_data_relocs"]);
      assignWasmExports(wasmExports);
      return wasmExports;
    }
    __name(receiveInstance, "receiveInstance");
    function receiveInstantiationResult(result2) {
      return receiveInstance(result2["instance"], result2["module"]);
    }
    __name(receiveInstantiationResult, "receiveInstantiationResult");
    var info2 = getWasmImports();
    if (Module["instantiateWasm"]) {
      return new Promise((resolve2, reject) => {
        Module["instantiateWasm"](info2, (mod, inst) => {
          resolve2(receiveInstance(mod, inst));
        });
      });
    }
    wasmBinaryFile ??= findWasmBinary();
    var result = await instantiateAsync(wasmBinary, wasmBinaryFile, info2);
    var exports = receiveInstantiationResult(result);
    return exports;
  }
  __name(createWasm, "createWasm");
  class ExitStatus {
    static {
      __name(this, "ExitStatus");
    }
    name = "ExitStatus";
    constructor(status) {
      this.message = `Program terminated with exit(${status})`;
      this.status = status;
    }
  }
  var GOT = {};
  var currentModuleWeakSymbols = /* @__PURE__ */ new Set([]);
  var GOTHandler = {
    get(obj, symName) {
      var rtn = GOT[symName];
      if (!rtn) {
        rtn = GOT[symName] = new WebAssembly.Global({
          "value": "i32",
          "mutable": true
        });
      }
      if (!currentModuleWeakSymbols.has(symName)) {
        rtn.required = true;
      }
      return rtn;
    }
  };
  var LE_ATOMICS_NATIVE_BYTE_ORDER = [];
  var LE_HEAP_LOAD_F32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat32(byteOffset, true), "LE_HEAP_LOAD_F32");
  var LE_HEAP_LOAD_F64 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getFloat64(byteOffset, true), "LE_HEAP_LOAD_F64");
  var LE_HEAP_LOAD_I16 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt16(byteOffset, true), "LE_HEAP_LOAD_I16");
  var LE_HEAP_LOAD_I32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getInt32(byteOffset, true), "LE_HEAP_LOAD_I32");
  var LE_HEAP_LOAD_I64 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getBigInt64(byteOffset, true), "LE_HEAP_LOAD_I64");
  var LE_HEAP_LOAD_U32 = /* @__PURE__ */ __name((byteOffset) => HEAP_DATA_VIEW.getUint32(byteOffset, true), "LE_HEAP_LOAD_U32");
  var LE_HEAP_STORE_F32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat32(byteOffset, value, true), "LE_HEAP_STORE_F32");
  var LE_HEAP_STORE_F64 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setFloat64(byteOffset, value, true), "LE_HEAP_STORE_F64");
  var LE_HEAP_STORE_I16 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt16(byteOffset, value, true), "LE_HEAP_STORE_I16");
  var LE_HEAP_STORE_I32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setInt32(byteOffset, value, true), "LE_HEAP_STORE_I32");
  var LE_HEAP_STORE_I64 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setBigInt64(byteOffset, value, true), "LE_HEAP_STORE_I64");
  var LE_HEAP_STORE_U32 = /* @__PURE__ */ __name((byteOffset, value) => HEAP_DATA_VIEW.setUint32(byteOffset, value, true), "LE_HEAP_STORE_U32");
  var callRuntimeCallbacks = /* @__PURE__ */ __name((callbacks) => {
    while (callbacks.length > 0) {
      callbacks.shift()(Module);
    }
  }, "callRuntimeCallbacks");
  var onPostRuns = [];
  var addOnPostRun = /* @__PURE__ */ __name((cb) => onPostRuns.push(cb), "addOnPostRun");
  var onPreRuns = [];
  var addOnPreRun = /* @__PURE__ */ __name((cb) => onPreRuns.push(cb), "addOnPreRun");
  var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder() : void 0;
  var findStringEnd = /* @__PURE__ */ __name((heapOrArray, idx, maxBytesToRead, ignoreNul) => {
    var maxIdx = idx + maxBytesToRead;
    if (ignoreNul) return maxIdx;
    while (heapOrArray[idx] && !(idx >= maxIdx)) ++idx;
    return idx;
  }, "findStringEnd");
  var UTF8ArrayToString = /* @__PURE__ */ __name((heapOrArray, idx = 0, maxBytesToRead, ignoreNul) => {
    var endPtr = findStringEnd(heapOrArray, idx, maxBytesToRead, ignoreNul);
    if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
      return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
    }
    var str = "";
    while (idx < endPtr) {
      var u0 = heapOrArray[idx++];
      if (!(u0 & 128)) {
        str += String.fromCharCode(u0);
        continue;
      }
      var u1 = heapOrArray[idx++] & 63;
      if ((u0 & 224) == 192) {
        str += String.fromCharCode((u0 & 31) << 6 | u1);
        continue;
      }
      var u2 = heapOrArray[idx++] & 63;
      if ((u0 & 240) == 224) {
        u0 = (u0 & 15) << 12 | u1 << 6 | u2;
      } else {
        u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
      }
      if (u0 < 65536) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 65536;
        str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
      }
    }
    return str;
  }, "UTF8ArrayToString");
  var getDylinkMetadata = /* @__PURE__ */ __name((binary2) => {
    var offset = 0;
    var end = 0;
    function getU8() {
      return binary2[offset++];
    }
    __name(getU8, "getU8");
    function getLEB() {
      var ret = 0;
      var mul = 1;
      while (1) {
        var byte = binary2[offset++];
        ret += (byte & 127) * mul;
        mul *= 128;
        if (!(byte & 128)) break;
      }
      return ret;
    }
    __name(getLEB, "getLEB");
    function getString() {
      var len = getLEB();
      offset += len;
      return UTF8ArrayToString(binary2, offset - len, len);
    }
    __name(getString, "getString");
    function getStringList() {
      var count2 = getLEB();
      var rtn = [];
      while (count2--) rtn.push(getString());
      return rtn;
    }
    __name(getStringList, "getStringList");
    function failIf(condition, message) {
      if (condition) throw new Error(message);
    }
    __name(failIf, "failIf");
    if (binary2 instanceof WebAssembly.Module) {
      var dylinkSection = WebAssembly.Module.customSections(binary2, "dylink.0");
      failIf(dylinkSection.length === 0, "need dylink section");
      binary2 = new Uint8Array(dylinkSection[0]);
      end = binary2.length;
    } else {
      var int32View = new Uint32Array(new Uint8Array(binary2.subarray(0, 24)).buffer);
      var magicNumberFound = int32View[0] == 1836278016 || int32View[0] == 6386541;
      failIf(!magicNumberFound, "need to see wasm magic number");
      failIf(binary2[8] !== 0, "need the dylink section to be first");
      offset = 9;
      var section_size = getLEB();
      end = offset + section_size;
      var name2 = getString();
      failIf(name2 !== "dylink.0");
    }
    var customSection = {
      neededDynlibs: [],
      tlsExports: /* @__PURE__ */ new Set(),
      weakImports: /* @__PURE__ */ new Set(),
      runtimePaths: []
    };
    var WASM_DYLINK_MEM_INFO = 1;
    var WASM_DYLINK_NEEDED = 2;
    var WASM_DYLINK_EXPORT_INFO = 3;
    var WASM_DYLINK_IMPORT_INFO = 4;
    var WASM_DYLINK_RUNTIME_PATH = 5;
    var WASM_SYMBOL_TLS = 256;
    var WASM_SYMBOL_BINDING_MASK = 3;
    var WASM_SYMBOL_BINDING_WEAK = 1;
    while (offset < end) {
      var subsectionType = getU8();
      var subsectionSize = getLEB();
      if (subsectionType === WASM_DYLINK_MEM_INFO) {
        customSection.memorySize = getLEB();
        customSection.memoryAlign = getLEB();
        customSection.tableSize = getLEB();
        customSection.tableAlign = getLEB();
      } else if (subsectionType === WASM_DYLINK_NEEDED) {
        customSection.neededDynlibs = getStringList();
      } else if (subsectionType === WASM_DYLINK_EXPORT_INFO) {
        var count = getLEB();
        while (count--) {
          var symname = getString();
          var flags2 = getLEB();
          if (flags2 & WASM_SYMBOL_TLS) {
            customSection.tlsExports.add(symname);
          }
        }
      } else if (subsectionType === WASM_DYLINK_IMPORT_INFO) {
        var count = getLEB();
        while (count--) {
          var modname = getString();
          var symname = getString();
          var flags2 = getLEB();
          if ((flags2 & WASM_SYMBOL_BINDING_MASK) == WASM_SYMBOL_BINDING_WEAK) {
            customSection.weakImports.add(symname);
          }
        }
      } else if (subsectionType === WASM_DYLINK_RUNTIME_PATH) {
        customSection.runtimePaths = getStringList();
      } else {
        offset += subsectionSize;
      }
    }
    return customSection;
  }, "getDylinkMetadata");
  function getValue(ptr, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        return HEAP8[ptr];
      case "i8":
        return HEAP8[ptr];
      case "i16":
        return LE_HEAP_LOAD_I16((ptr >> 1) * 2);
      case "i32":
        return LE_HEAP_LOAD_I32((ptr >> 2) * 4);
      case "i64":
        return LE_HEAP_LOAD_I64((ptr >> 3) * 8);
      case "float":
        return LE_HEAP_LOAD_F32((ptr >> 2) * 4);
      case "double":
        return LE_HEAP_LOAD_F64((ptr >> 3) * 8);
      case "*":
        return LE_HEAP_LOAD_U32((ptr >> 2) * 4);
      default:
        abort(`invalid type for getValue: ${type}`);
    }
  }
  __name(getValue, "getValue");
  var newDSO = /* @__PURE__ */ __name((name2, handle2, syms) => {
    var dso = {
      refcount: Infinity,
      name: name2,
      exports: syms,
      global: true
    };
    LDSO.loadedLibsByName[name2] = dso;
    if (handle2 != void 0) {
      LDSO.loadedLibsByHandle[handle2] = dso;
    }
    return dso;
  }, "newDSO");
  var LDSO = {
    loadedLibsByName: {},
    loadedLibsByHandle: {},
    init() {
      newDSO("__main__", 0, wasmImports);
    }
  };
  var ___heap_base = 82240;
  var alignMemory = /* @__PURE__ */ __name((size, alignment) => Math.ceil(size / alignment) * alignment, "alignMemory");
  var getMemory = /* @__PURE__ */ __name((size) => {
    if (runtimeInitialized) {
      return _calloc(size, 1);
    }
    var ret = ___heap_base;
    var end = ret + alignMemory(size, 16);
    ___heap_base = end;
    GOT["__heap_base"].value = end;
    return ret;
  }, "getMemory");
  var isInternalSym = /* @__PURE__ */ __name((symName) => ["__cpp_exception", "__c_longjmp", "__wasm_apply_data_relocs", "__dso_handle", "__tls_size", "__tls_align", "__set_stack_limits", "_emscripten_tls_init", "__wasm_init_tls", "__wasm_call_ctors", "__start_em_asm", "__stop_em_asm", "__start_em_js", "__stop_em_js"].includes(symName) || symName.startsWith("__em_js__"), "isInternalSym");
  var uleb128EncodeWithLen = /* @__PURE__ */ __name((arr) => {
    const n = arr.length;
    return [n % 128 | 128, n >> 7, ...arr];
  }, "uleb128EncodeWithLen");
  var wasmTypeCodes = {
    "i": 127,
    // i32
    "p": 127,
    // i32
    "j": 126,
    // i64
    "f": 125,
    // f32
    "d": 124,
    // f64
    "e": 111
  };
  var generateTypePack = /* @__PURE__ */ __name((types) => uleb128EncodeWithLen(Array.from(types, (type) => {
    var code = wasmTypeCodes[type];
    return code;
  })), "generateTypePack");
  var convertJsFunctionToWasm = /* @__PURE__ */ __name((func2, sig) => {
    var bytes = Uint8Array.of(
      0,
      97,
      115,
      109,
      // magic ("\0asm")
      1,
      0,
      0,
      0,
      // version: 1
      1,
      ...uleb128EncodeWithLen([
        1,
        // count: 1
        96,
        // param types
        ...generateTypePack(sig.slice(1)),
        // return types (for now only supporting [] if `void` and single [T] otherwise)
        ...generateTypePack(sig[0] === "v" ? "" : sig[0])
      ]),
      // The rest of the module is static
      2,
      7,
      // import section
      // (import "e" "f" (func 0 (type 0)))
      1,
      1,
      101,
      1,
      102,
      0,
      0,
      7,
      5,
      // export section
      // (export "f" (func 0 (type 0)))
      1,
      1,
      102,
      0,
      0
    );
    var module2 = new WebAssembly.Module(bytes);
    var instance2 = new WebAssembly.Instance(module2, {
      "e": {
        "f": func2
      }
    });
    var wrappedFunc = instance2.exports["f"];
    return wrappedFunc;
  }, "convertJsFunctionToWasm");
  var wasmTableMirror = [];
  var wasmTable = new WebAssembly.Table({
    "initial": 31,
    "element": "anyfunc"
  });
  var getWasmTableEntry = /* @__PURE__ */ __name((funcPtr) => {
    var func2 = wasmTableMirror[funcPtr];
    if (!func2) {
      wasmTableMirror[funcPtr] = func2 = wasmTable.get(funcPtr);
    }
    return func2;
  }, "getWasmTableEntry");
  var updateTableMap = /* @__PURE__ */ __name((offset, count) => {
    if (functionsInTableMap) {
      for (var i2 = offset; i2 < offset + count; i2++) {
        var item = getWasmTableEntry(i2);
        if (item) {
          functionsInTableMap.set(item, i2);
        }
      }
    }
  }, "updateTableMap");
  var functionsInTableMap;
  var getFunctionAddress = /* @__PURE__ */ __name((func2) => {
    if (!functionsInTableMap) {
      functionsInTableMap = /* @__PURE__ */ new WeakMap();
      updateTableMap(0, wasmTable.length);
    }
    return functionsInTableMap.get(func2) || 0;
  }, "getFunctionAddress");
  var freeTableIndexes = [];
  var getEmptyTableSlot = /* @__PURE__ */ __name(() => {
    if (freeTableIndexes.length) {
      return freeTableIndexes.pop();
    }
    return wasmTable["grow"](1);
  }, "getEmptyTableSlot");
  var setWasmTableEntry = /* @__PURE__ */ __name((idx, func2) => {
    wasmTable.set(idx, func2);
    wasmTableMirror[idx] = wasmTable.get(idx);
  }, "setWasmTableEntry");
  var addFunction = /* @__PURE__ */ __name((func2, sig) => {
    var rtn = getFunctionAddress(func2);
    if (rtn) {
      return rtn;
    }
    var ret = getEmptyTableSlot();
    try {
      setWasmTableEntry(ret, func2);
    } catch (err2) {
      if (!(err2 instanceof TypeError)) {
        throw err2;
      }
      var wrapped = convertJsFunctionToWasm(func2, sig);
      setWasmTableEntry(ret, wrapped);
    }
    functionsInTableMap.set(func2, ret);
    return ret;
  }, "addFunction");
  var updateGOT = /* @__PURE__ */ __name((exports, replace) => {
    for (var symName in exports) {
      if (isInternalSym(symName)) {
        continue;
      }
      var value = exports[symName];
      GOT[symName] ||= new WebAssembly.Global({
        "value": "i32",
        "mutable": true
      });
      if (replace || GOT[symName].value == 0) {
        if (typeof value == "function") {
          GOT[symName].value = addFunction(value);
        } else if (typeof value == "number") {
          GOT[symName].value = value;
        } else {
          err(`unhandled export type for '${symName}': ${typeof value}`);
        }
      }
    }
  }, "updateGOT");
  var relocateExports = /* @__PURE__ */ __name((exports, memoryBase2, replace) => {
    var relocated = {};
    for (var e in exports) {
      var value = exports[e];
      if (typeof value == "object") {
        value = value.value;
      }
      if (typeof value == "number") {
        value += memoryBase2;
      }
      relocated[e] = value;
    }
    updateGOT(relocated, replace);
    return relocated;
  }, "relocateExports");
  var isSymbolDefined = /* @__PURE__ */ __name((symName) => {
    var existing = wasmImports[symName];
    if (!existing || existing.stub) {
      return false;
    }
    return true;
  }, "isSymbolDefined");
  var dynCall = /* @__PURE__ */ __name((sig, ptr, args2 = [], promising = false) => {
    var func2 = getWasmTableEntry(ptr);
    var rtn = func2(...args2);
    function convert(rtn2) {
      return rtn2;
    }
    __name(convert, "convert");
    return convert(rtn);
  }, "dynCall");
  var stackSave = /* @__PURE__ */ __name(() => _emscripten_stack_get_current(), "stackSave");
  var stackRestore = /* @__PURE__ */ __name((val) => __emscripten_stack_restore(val), "stackRestore");
  var createInvokeFunction = /* @__PURE__ */ __name((sig) => (ptr, ...args2) => {
    var sp = stackSave();
    try {
      return dynCall(sig, ptr, args2);
    } catch (e) {
      stackRestore(sp);
      if (e !== e + 0) throw e;
      _setThrew(1, 0);
      if (sig[0] == "j") return 0n;
    }
  }, "createInvokeFunction");
  var resolveGlobalSymbol = /* @__PURE__ */ __name((symName, direct = false) => {
    var sym2;
    if (isSymbolDefined(symName)) {
      sym2 = wasmImports[symName];
    } else if (symName.startsWith("invoke_")) {
      sym2 = wasmImports[symName] = createInvokeFunction(symName.split("_")[1]);
    }
    return {
      sym: sym2,
      name: symName
    };
  }, "resolveGlobalSymbol");
  var onPostCtors = [];
  var addOnPostCtor = /* @__PURE__ */ __name((cb) => onPostCtors.push(cb), "addOnPostCtor");
  var UTF8ToString = /* @__PURE__ */ __name((ptr, maxBytesToRead, ignoreNul) => ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead, ignoreNul) : "", "UTF8ToString");
  var loadWebAssemblyModule = /* @__PURE__ */ __name((binary, flags, libName, localScope, handle) => {
    var metadata = getDylinkMetadata(binary);
    function loadModule() {
      var memAlign = Math.pow(2, metadata.memoryAlign);
      var memoryBase = metadata.memorySize ? alignMemory(getMemory(metadata.memorySize + memAlign), memAlign) : 0;
      var tableBase = metadata.tableSize ? wasmTable.length : 0;
      if (handle) {
        HEAP8[handle + 8] = 1;
        LE_HEAP_STORE_U32((handle + 12 >> 2) * 4, memoryBase);
        LE_HEAP_STORE_I32((handle + 16 >> 2) * 4, metadata.memorySize);
        LE_HEAP_STORE_U32((handle + 20 >> 2) * 4, tableBase);
        LE_HEAP_STORE_I32((handle + 24 >> 2) * 4, metadata.tableSize);
      }
      if (metadata.tableSize) {
        wasmTable.grow(metadata.tableSize);
      }
      var moduleExports;
      function resolveSymbol(sym2) {
        var resolved = resolveGlobalSymbol(sym2).sym;
        if (!resolved && localScope) {
          resolved = localScope[sym2];
        }
        if (!resolved) {
          resolved = moduleExports[sym2];
        }
        return resolved;
      }
      __name(resolveSymbol, "resolveSymbol");
      var proxyHandler = {
        get(stubs, prop) {
          switch (prop) {
            case "__memory_base":
              return memoryBase;
            case "__table_base":
              return tableBase;
          }
          if (prop in wasmImports && !wasmImports[prop].stub) {
            var res = wasmImports[prop];
            return res;
          }
          if (!(prop in stubs)) {
            var resolved;
            stubs[prop] = (...args2) => {
              resolved ||= resolveSymbol(prop);
              return resolved(...args2);
            };
          }
          return stubs[prop];
        }
      };
      var proxy = new Proxy({}, proxyHandler);
      currentModuleWeakSymbols = metadata.weakImports;
      var info = {
        "GOT.mem": new Proxy({}, GOTHandler),
        "GOT.func": new Proxy({}, GOTHandler),
        "env": proxy,
        "wasi_snapshot_preview1": proxy
      };
      function postInstantiation(module, instance) {
        updateTableMap(tableBase, metadata.tableSize);
        moduleExports = relocateExports(instance.exports, memoryBase);
        if (!flags.allowUndefined) {
          reportUndefinedSymbols();
        }
        function addEmAsm(addr, body) {
          var args = [];
          var arity = 0;
          for (; arity < 16; arity++) {
            if (body.indexOf("$" + arity) != -1) {
              args.push("$" + arity);
            } else {
              break;
            }
          }
          args = args.join(",");
          var func = `(${args}) => { ${body} };`;
          ASM_CONSTS[start] = eval(func);
        }
        __name(addEmAsm, "addEmAsm");
        if ("__start_em_asm" in moduleExports) {
          var start = moduleExports["__start_em_asm"];
          var stop = moduleExports["__stop_em_asm"];
          while (start < stop) {
            var jsString = UTF8ToString(start);
            addEmAsm(start, jsString);
            start = HEAPU8.indexOf(0, start) + 1;
          }
        }
        function addEmJs(name, cSig, body) {
          var jsArgs = [];
          cSig = cSig.slice(1, -1);
          if (cSig != "void") {
            cSig = cSig.split(",");
            for (var i in cSig) {
              var jsArg = cSig[i].split(" ").pop();
              jsArgs.push(jsArg.replace("*", ""));
            }
          }
          var func = `(${jsArgs}) => ${body};`;
          moduleExports[name] = eval(func);
        }
        __name(addEmJs, "addEmJs");
        for (var name in moduleExports) {
          if (name.startsWith("__em_js__")) {
            var start = moduleExports[name];
            var jsString = UTF8ToString(start);
            var parts = jsString.split("<::>");
            addEmJs(name.replace("__em_js__", ""), parts[0], parts[1]);
            delete moduleExports[name];
          }
        }
        var applyRelocs = moduleExports["__wasm_apply_data_relocs"];
        if (applyRelocs) {
          if (runtimeInitialized) {
            applyRelocs();
          } else {
            __RELOC_FUNCS__.push(applyRelocs);
          }
        }
        var init = moduleExports["__wasm_call_ctors"];
        if (init) {
          if (runtimeInitialized) {
            init();
          } else {
            addOnPostCtor(init);
          }
        }
        return moduleExports;
      }
      __name(postInstantiation, "postInstantiation");
      if (flags.loadAsync) {
        return (async () => {
          var instance2;
          if (binary instanceof WebAssembly.Module) {
            instance2 = new WebAssembly.Instance(binary, info);
          } else {
            ({ module: binary, instance: instance2 } = await WebAssembly.instantiate(binary, info));
          }
          return postInstantiation(binary, instance2);
        })();
      }
      var module = binary instanceof WebAssembly.Module ? binary : new WebAssembly.Module(binary);
      var instance = new WebAssembly.Instance(module, info);
      return postInstantiation(module, instance);
    }
    __name(loadModule, "loadModule");
    flags = {
      ...flags,
      rpath: {
        parentLibPath: libName,
        paths: metadata.runtimePaths
      }
    };
    if (flags.loadAsync) {
      return metadata.neededDynlibs.reduce((chain, dynNeeded) => chain.then(() => loadDynamicLibrary(dynNeeded, flags, localScope)), Promise.resolve()).then(loadModule);
    }
    metadata.neededDynlibs.forEach((needed) => loadDynamicLibrary(needed, flags, localScope));
    return loadModule();
  }, "loadWebAssemblyModule");
  var mergeLibSymbols = /* @__PURE__ */ __name((exports, libName2) => {
    for (var [sym2, exp] of Object.entries(exports)) {
      const setImport = /* @__PURE__ */ __name((target) => {
        if (!isSymbolDefined(target)) {
          wasmImports[target] = exp;
        }
      }, "setImport");
      setImport(sym2);
      const main_alias = "__main_argc_argv";
      if (sym2 == "main") {
        setImport(main_alias);
      }
      if (sym2 == main_alias) {
        setImport("main");
      }
    }
  }, "mergeLibSymbols");
  var asyncLoad = /* @__PURE__ */ __name(async (url) => {
    var arrayBuffer = await readAsync(url);
    return new Uint8Array(arrayBuffer);
  }, "asyncLoad");
  function loadDynamicLibrary(libName2, flags2 = {
    global: true,
    nodelete: true
  }, localScope2, handle2) {
    var dso = LDSO.loadedLibsByName[libName2];
    if (dso) {
      if (!flags2.global) {
        if (localScope2) {
          Object.assign(localScope2, dso.exports);
        }
      } else if (!dso.global) {
        dso.global = true;
        mergeLibSymbols(dso.exports, libName2);
      }
      if (flags2.nodelete && dso.refcount !== Infinity) {
        dso.refcount = Infinity;
      }
      dso.refcount++;
      if (handle2) {
        LDSO.loadedLibsByHandle[handle2] = dso;
      }
      return flags2.loadAsync ? Promise.resolve(true) : true;
    }
    dso = newDSO(libName2, handle2, "loading");
    dso.refcount = flags2.nodelete ? Infinity : 1;
    dso.global = flags2.global;
    function loadLibData() {
      if (handle2) {
        var data = LE_HEAP_LOAD_U32((handle2 + 28 >> 2) * 4);
        var dataSize = LE_HEAP_LOAD_U32((handle2 + 32 >> 2) * 4);
        if (data && dataSize) {
          var libData = HEAP8.slice(data, data + dataSize);
          return flags2.loadAsync ? Promise.resolve(libData) : libData;
        }
      }
      var libFile = locateFile(libName2);
      if (flags2.loadAsync) {
        return asyncLoad(libFile);
      }
      if (!readBinary) {
        throw new Error(`${libFile}: file not found, and synchronous loading of external files is not available`);
      }
      return readBinary(libFile);
    }
    __name(loadLibData, "loadLibData");
    function getExports() {
      if (flags2.loadAsync) {
        return loadLibData().then((libData) => loadWebAssemblyModule(libData, flags2, libName2, localScope2, handle2));
      }
      return loadWebAssemblyModule(loadLibData(), flags2, libName2, localScope2, handle2);
    }
    __name(getExports, "getExports");
    function moduleLoaded(exports) {
      if (dso.global) {
        mergeLibSymbols(exports, libName2);
      } else if (localScope2) {
        Object.assign(localScope2, exports);
      }
      dso.exports = exports;
    }
    __name(moduleLoaded, "moduleLoaded");
    if (flags2.loadAsync) {
      return getExports().then((exports) => {
        moduleLoaded(exports);
        return true;
      });
    }
    moduleLoaded(getExports());
    return true;
  }
  __name(loadDynamicLibrary, "loadDynamicLibrary");
  var reportUndefinedSymbols = /* @__PURE__ */ __name(() => {
    for (var [symName, entry] of Object.entries(GOT)) {
      if (entry.value == 0) {
        var value = resolveGlobalSymbol(symName, true).sym;
        if (!value && !entry.required) {
          continue;
        }
        if (typeof value == "function") {
          entry.value = addFunction(value, value.sig);
        } else if (typeof value == "number") {
          entry.value = value;
        } else {
          throw new Error(`bad export type for '${symName}': ${typeof value}`);
        }
      }
    }
  }, "reportUndefinedSymbols");
  var runDependencies = 0;
  var dependenciesFulfilled = null;
  var removeRunDependency = /* @__PURE__ */ __name((id) => {
    runDependencies--;
    Module["monitorRunDependencies"]?.(runDependencies);
    if (runDependencies == 0) {
      if (dependenciesFulfilled) {
        var callback = dependenciesFulfilled;
        dependenciesFulfilled = null;
        callback();
      }
    }
  }, "removeRunDependency");
  var addRunDependency = /* @__PURE__ */ __name((id) => {
    runDependencies++;
    Module["monitorRunDependencies"]?.(runDependencies);
  }, "addRunDependency");
  var loadDylibs = /* @__PURE__ */ __name(async () => {
    if (!dynamicLibraries.length) {
      reportUndefinedSymbols();
      return;
    }
    addRunDependency("loadDylibs");
    for (var lib of dynamicLibraries) {
      await loadDynamicLibrary(lib, {
        loadAsync: true,
        global: true,
        nodelete: true,
        allowUndefined: true
      });
    }
    reportUndefinedSymbols();
    removeRunDependency("loadDylibs");
  }, "loadDylibs");
  var noExitRuntime = true;
  function setValue(ptr, value, type = "i8") {
    if (type.endsWith("*")) type = "*";
    switch (type) {
      case "i1":
        HEAP8[ptr] = value;
        break;
      case "i8":
        HEAP8[ptr] = value;
        break;
      case "i16":
        LE_HEAP_STORE_I16((ptr >> 1) * 2, value);
        break;
      case "i32":
        LE_HEAP_STORE_I32((ptr >> 2) * 4, value);
        break;
      case "i64":
        LE_HEAP_STORE_I64((ptr >> 3) * 8, BigInt(value));
        break;
      case "float":
        LE_HEAP_STORE_F32((ptr >> 2) * 4, value);
        break;
      case "double":
        LE_HEAP_STORE_F64((ptr >> 3) * 8, value);
        break;
      case "*":
        LE_HEAP_STORE_U32((ptr >> 2) * 4, value);
        break;
      default:
        abort(`invalid type for setValue: ${type}`);
    }
  }
  __name(setValue, "setValue");
  var ___memory_base = new WebAssembly.Global({
    "value": "i32",
    "mutable": false
  }, 1024);
  var ___stack_high = 82240;
  var ___stack_low = 16704;
  var ___stack_pointer = new WebAssembly.Global({
    "value": "i32",
    "mutable": true
  }, 82240);
  var ___table_base = new WebAssembly.Global({
    "value": "i32",
    "mutable": false
  }, 1);
  var __abort_js = /* @__PURE__ */ __name(() => abort(""), "__abort_js");
  __abort_js.sig = "v";
  var getHeapMax = /* @__PURE__ */ __name(() => (
    // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
    // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
    // for any code that deals with heap sizes, which would require special
    // casing all heap size related code to treat 0 specially.
    2147483648
  ), "getHeapMax");
  var growMemory = /* @__PURE__ */ __name((size) => {
    var oldHeapSize = wasmMemory.buffer.byteLength;
    var pages = (size - oldHeapSize + 65535) / 65536 | 0;
    try {
      wasmMemory.grow(pages);
      updateMemoryViews();
      return 1;
    } catch (e) {
    }
  }, "growMemory");
  var _emscripten_resize_heap = /* @__PURE__ */ __name((requestedSize) => {
    var oldSize = HEAPU8.length;
    requestedSize >>>= 0;
    var maxHeapSize = getHeapMax();
    if (requestedSize > maxHeapSize) {
      return false;
    }
    for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
      var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
      overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
      var newSize = Math.min(maxHeapSize, alignMemory(Math.max(requestedSize, overGrownHeapSize), 65536));
      var replacement = growMemory(newSize);
      if (replacement) {
        return true;
      }
    }
    return false;
  }, "_emscripten_resize_heap");
  _emscripten_resize_heap.sig = "ip";
  var _fd_close = /* @__PURE__ */ __name((fd) => 52, "_fd_close");
  _fd_close.sig = "ii";
  var INT53_MAX = 9007199254740992;
  var INT53_MIN = -9007199254740992;
  var bigintToI53Checked = /* @__PURE__ */ __name((num) => num < INT53_MIN || num > INT53_MAX ? NaN : Number(num), "bigintToI53Checked");
  function _fd_seek(fd, offset, whence, newOffset) {
    offset = bigintToI53Checked(offset);
    return 70;
  }
  __name(_fd_seek, "_fd_seek");
  _fd_seek.sig = "iijip";
  var printCharBuffers = [null, [], []];
  var printChar = /* @__PURE__ */ __name((stream, curr) => {
    var buffer = printCharBuffers[stream];
    if (curr === 0 || curr === 10) {
      (stream === 1 ? out : err)(UTF8ArrayToString(buffer));
      buffer.length = 0;
    } else {
      buffer.push(curr);
    }
  }, "printChar");
  var _fd_write = /* @__PURE__ */ __name((fd, iov, iovcnt, pnum) => {
    var num = 0;
    for (var i2 = 0; i2 < iovcnt; i2++) {
      var ptr = LE_HEAP_LOAD_U32((iov >> 2) * 4);
      var len = LE_HEAP_LOAD_U32((iov + 4 >> 2) * 4);
      iov += 8;
      for (var j = 0; j < len; j++) {
        printChar(fd, HEAPU8[ptr + j]);
      }
      num += len;
    }
    LE_HEAP_STORE_U32((pnum >> 2) * 4, num);
    return 0;
  }, "_fd_write");
  _fd_write.sig = "iippp";
  function _tree_sitter_log_callback(isLexMessage, messageAddress) {
    if (Module.currentLogCallback) {
      const message = UTF8ToString(messageAddress);
      Module.currentLogCallback(message, isLexMessage !== 0);
    }
  }
  __name(_tree_sitter_log_callback, "_tree_sitter_log_callback");
  function _tree_sitter_parse_callback(inputBufferAddress, index, row, column, lengthAddress) {
    const INPUT_BUFFER_SIZE = 10 * 1024;
    const string = Module.currentParseCallback(index, {
      row,
      column
    });
    if (typeof string === "string") {
      setValue(lengthAddress, string.length, "i32");
      stringToUTF16(string, inputBufferAddress, INPUT_BUFFER_SIZE);
    } else {
      setValue(lengthAddress, 0, "i32");
    }
  }
  __name(_tree_sitter_parse_callback, "_tree_sitter_parse_callback");
  function _tree_sitter_progress_callback(currentOffset, hasError) {
    if (Module.currentProgressCallback) {
      return Module.currentProgressCallback({
        currentOffset,
        hasError
      });
    }
    return false;
  }
  __name(_tree_sitter_progress_callback, "_tree_sitter_progress_callback");
  function _tree_sitter_query_progress_callback(currentOffset) {
    if (Module.currentQueryProgressCallback) {
      return Module.currentQueryProgressCallback({
        currentOffset
      });
    }
    return false;
  }
  __name(_tree_sitter_query_progress_callback, "_tree_sitter_query_progress_callback");
  var runtimeKeepaliveCounter = 0;
  var keepRuntimeAlive = /* @__PURE__ */ __name(() => noExitRuntime || runtimeKeepaliveCounter > 0, "keepRuntimeAlive");
  var _proc_exit = /* @__PURE__ */ __name((code) => {
    EXITSTATUS = code;
    if (!keepRuntimeAlive()) {
      Module["onExit"]?.(code);
      ABORT = true;
    }
    quit_(code, new ExitStatus(code));
  }, "_proc_exit");
  _proc_exit.sig = "vi";
  var exitJS = /* @__PURE__ */ __name((status, implicit) => {
    EXITSTATUS = status;
    _proc_exit(status);
  }, "exitJS");
  var handleException = /* @__PURE__ */ __name((e) => {
    if (e instanceof ExitStatus || e == "unwind") {
      return EXITSTATUS;
    }
    quit_(1, e);
  }, "handleException");
  var lengthBytesUTF8 = /* @__PURE__ */ __name((str) => {
    var len = 0;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var c = str.charCodeAt(i2);
      if (c <= 127) {
        len++;
      } else if (c <= 2047) {
        len += 2;
      } else if (c >= 55296 && c <= 57343) {
        len += 4;
        ++i2;
      } else {
        len += 3;
      }
    }
    return len;
  }, "lengthBytesUTF8");
  var stringToUTF8Array = /* @__PURE__ */ __name((str, heap, outIdx, maxBytesToWrite) => {
    if (!(maxBytesToWrite > 0)) return 0;
    var startIdx = outIdx;
    var endIdx = outIdx + maxBytesToWrite - 1;
    for (var i2 = 0; i2 < str.length; ++i2) {
      var u = str.codePointAt(i2);
      if (u <= 127) {
        if (outIdx >= endIdx) break;
        heap[outIdx++] = u;
      } else if (u <= 2047) {
        if (outIdx + 1 >= endIdx) break;
        heap[outIdx++] = 192 | u >> 6;
        heap[outIdx++] = 128 | u & 63;
      } else if (u <= 65535) {
        if (outIdx + 2 >= endIdx) break;
        heap[outIdx++] = 224 | u >> 12;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
      } else {
        if (outIdx + 3 >= endIdx) break;
        heap[outIdx++] = 240 | u >> 18;
        heap[outIdx++] = 128 | u >> 12 & 63;
        heap[outIdx++] = 128 | u >> 6 & 63;
        heap[outIdx++] = 128 | u & 63;
        i2++;
      }
    }
    heap[outIdx] = 0;
    return outIdx - startIdx;
  }, "stringToUTF8Array");
  var stringToUTF8 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite), "stringToUTF8");
  var stackAlloc = /* @__PURE__ */ __name((sz) => __emscripten_stack_alloc(sz), "stackAlloc");
  var stringToUTF8OnStack = /* @__PURE__ */ __name((str) => {
    var size = lengthBytesUTF8(str) + 1;
    var ret = stackAlloc(size);
    stringToUTF8(str, ret, size);
    return ret;
  }, "stringToUTF8OnStack");
  var AsciiToString = /* @__PURE__ */ __name((ptr) => {
    var str = "";
    while (1) {
      var ch = HEAPU8[ptr++];
      if (!ch) return str;
      str += String.fromCharCode(ch);
    }
  }, "AsciiToString");
  var stringToUTF16 = /* @__PURE__ */ __name((str, outPtr, maxBytesToWrite) => {
    maxBytesToWrite ??= 2147483647;
    if (maxBytesToWrite < 2) return 0;
    maxBytesToWrite -= 2;
    var startPtr = outPtr;
    var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
    for (var i2 = 0; i2 < numCharsToWrite; ++i2) {
      var codeUnit = str.charCodeAt(i2);
      LE_HEAP_STORE_I16((outPtr >> 1) * 2, codeUnit);
      outPtr += 2;
    }
    LE_HEAP_STORE_I16((outPtr >> 1) * 2, 0);
    return outPtr - startPtr;
  }, "stringToUTF16");
  LE_ATOMICS_NATIVE_BYTE_ORDER = new Int8Array(new Int16Array([1]).buffer)[0] === 1 ? [
    /* little endian */
    ((x) => x),
    ((x) => x),
    void 0,
    ((x) => x)
  ] : [
    /* big endian */
    ((x) => x),
    ((x) => ((x & 65280) << 8 | (x & 255) << 24) >> 16),
    void 0,
    ((x) => x >> 24 & 255 | x >> 8 & 65280 | (x & 65280) << 8 | (x & 255) << 24)
  ];
  function LE_HEAP_UPDATE() {
    HEAPU16.unsigned = ((x) => x & 65535);
    HEAPU32.unsigned = ((x) => x >>> 0);
  }
  __name(LE_HEAP_UPDATE, "LE_HEAP_UPDATE");
  {
    initMemory();
    if (Module["noExitRuntime"]) noExitRuntime = Module["noExitRuntime"];
    if (Module["print"]) out = Module["print"];
    if (Module["printErr"]) err = Module["printErr"];
    if (Module["dynamicLibraries"]) dynamicLibraries = Module["dynamicLibraries"];
    if (Module["wasmBinary"]) wasmBinary = Module["wasmBinary"];
    if (Module["arguments"]) arguments_ = Module["arguments"];
    if (Module["thisProgram"]) thisProgram = Module["thisProgram"];
    if (Module["preInit"]) {
      if (typeof Module["preInit"] == "function") Module["preInit"] = [Module["preInit"]];
      while (Module["preInit"].length > 0) {
        Module["preInit"].shift()();
      }
    }
  }
  Module["setValue"] = setValue;
  Module["getValue"] = getValue;
  Module["UTF8ToString"] = UTF8ToString;
  Module["stringToUTF8"] = stringToUTF8;
  Module["lengthBytesUTF8"] = lengthBytesUTF8;
  Module["AsciiToString"] = AsciiToString;
  Module["stringToUTF16"] = stringToUTF16;
  Module["loadWebAssemblyModule"] = loadWebAssemblyModule;
  Module["LE_HEAP_STORE_I64"] = LE_HEAP_STORE_I64;
  var ASM_CONSTS = {};
  var _malloc, _calloc, _realloc, _free, _ts_range_edit, _memcmp, _ts_language_symbol_count, _ts_language_state_count, _ts_language_abi_version, _ts_language_name, _ts_language_field_count, _ts_language_next_state, _ts_language_symbol_name, _ts_language_symbol_for_name, _strncmp, _ts_language_symbol_type, _ts_language_field_name_for_id, _ts_lookahead_iterator_new, _ts_lookahead_iterator_delete, _ts_lookahead_iterator_reset_state, _ts_lookahead_iterator_reset, _ts_lookahead_iterator_next, _ts_lookahead_iterator_current_symbol, _ts_point_edit, _ts_parser_delete, _ts_parser_reset, _ts_parser_set_language, _ts_parser_set_included_ranges, _ts_query_new, _ts_query_delete, _iswspace, _iswalnum, _ts_query_copy, _ts_query_pattern_count, _ts_query_capture_count, _ts_query_string_count, _ts_query_capture_name_for_id, _ts_query_capture_quantifier_for_id, _ts_query_string_value_for_id, _ts_query_predicates_for_pattern, _ts_query_start_byte_for_pattern, _ts_query_end_byte_for_pattern, _ts_query_is_pattern_rooted, _ts_query_is_pattern_non_local, _ts_query_is_pattern_guaranteed_at_step, _ts_query_disable_capture, _ts_query_disable_pattern, _ts_tree_copy, _ts_tree_delete, _ts_init, _ts_parser_new_wasm, _ts_parser_enable_logger_wasm, _ts_parser_parse_wasm, _ts_parser_included_ranges_wasm, _ts_language_type_is_named_wasm, _ts_language_type_is_visible_wasm, _ts_language_metadata_wasm, _ts_language_supertypes_wasm, _ts_language_subtypes_wasm, _ts_tree_root_node_wasm, _ts_tree_root_node_with_offset_wasm, _ts_tree_edit_wasm, _ts_tree_included_ranges_wasm, _ts_tree_get_changed_ranges_wasm, _ts_tree_cursor_new_wasm, _ts_tree_cursor_copy_wasm, _ts_tree_cursor_delete_wasm, _ts_tree_cursor_reset_wasm, _ts_tree_cursor_reset_to_wasm, _ts_tree_cursor_goto_first_child_wasm, _ts_tree_cursor_goto_last_child_wasm, _ts_tree_cursor_goto_first_child_for_index_wasm, _ts_tree_cursor_goto_first_child_for_position_wasm, _ts_tree_cursor_goto_next_sibling_wasm, _ts_tree_cursor_goto_previous_sibling_wasm, _ts_tree_cursor_goto_descendant_wasm, _ts_tree_cursor_goto_parent_wasm, _ts_tree_cursor_current_node_type_id_wasm, _ts_tree_cursor_current_node_state_id_wasm, _ts_tree_cursor_current_node_is_named_wasm, _ts_tree_cursor_current_node_is_missing_wasm, _ts_tree_cursor_current_node_id_wasm, _ts_tree_cursor_start_position_wasm, _ts_tree_cursor_end_position_wasm, _ts_tree_cursor_start_index_wasm, _ts_tree_cursor_end_index_wasm, _ts_tree_cursor_current_field_id_wasm, _ts_tree_cursor_current_depth_wasm, _ts_tree_cursor_current_descendant_index_wasm, _ts_tree_cursor_current_node_wasm, _ts_node_symbol_wasm, _ts_node_field_name_for_child_wasm, _ts_node_field_name_for_named_child_wasm, _ts_node_children_by_field_id_wasm, _ts_node_first_child_for_byte_wasm, _ts_node_first_named_child_for_byte_wasm, _ts_node_grammar_symbol_wasm, _ts_node_child_count_wasm, _ts_node_named_child_count_wasm, _ts_node_child_wasm, _ts_node_named_child_wasm, _ts_node_child_by_field_id_wasm, _ts_node_next_sibling_wasm, _ts_node_prev_sibling_wasm, _ts_node_next_named_sibling_wasm, _ts_node_prev_named_sibling_wasm, _ts_node_descendant_count_wasm, _ts_node_parent_wasm, _ts_node_child_with_descendant_wasm, _ts_node_descendant_for_index_wasm, _ts_node_named_descendant_for_index_wasm, _ts_node_descendant_for_position_wasm, _ts_node_named_descendant_for_position_wasm, _ts_node_start_point_wasm, _ts_node_end_point_wasm, _ts_node_start_index_wasm, _ts_node_end_index_wasm, _ts_node_to_string_wasm, _ts_node_children_wasm, _ts_node_named_children_wasm, _ts_node_descendants_of_type_wasm, _ts_node_is_named_wasm, _ts_node_has_changes_wasm, _ts_node_has_error_wasm, _ts_node_is_error_wasm, _ts_node_is_missing_wasm, _ts_node_is_extra_wasm, _ts_node_parse_state_wasm, _ts_node_next_parse_state_wasm, _ts_query_matches_wasm, _ts_query_captures_wasm, _memset, _memcpy, _memmove, _iswalpha, _iswblank, _iswdigit, _iswlower, _iswpunct, _iswupper, _iswxdigit, _memchr, _strlen, _strcmp, _strncat, _strncpy, _towlower, _towupper, _setThrew, __emscripten_stack_restore, __emscripten_stack_alloc, _emscripten_stack_get_current, ___wasm_apply_data_relocs;
  function assignWasmExports(wasmExports2) {
    Module["_malloc"] = _malloc = wasmExports2["malloc"];
    Module["_calloc"] = _calloc = wasmExports2["calloc"];
    Module["_realloc"] = _realloc = wasmExports2["realloc"];
    Module["_free"] = _free = wasmExports2["free"];
    Module["_ts_range_edit"] = _ts_range_edit = wasmExports2["ts_range_edit"];
    Module["_memcmp"] = _memcmp = wasmExports2["memcmp"];
    Module["_ts_language_symbol_count"] = _ts_language_symbol_count = wasmExports2["ts_language_symbol_count"];
    Module["_ts_language_state_count"] = _ts_language_state_count = wasmExports2["ts_language_state_count"];
    Module["_ts_language_abi_version"] = _ts_language_abi_version = wasmExports2["ts_language_abi_version"];
    Module["_ts_language_name"] = _ts_language_name = wasmExports2["ts_language_name"];
    Module["_ts_language_field_count"] = _ts_language_field_count = wasmExports2["ts_language_field_count"];
    Module["_ts_language_next_state"] = _ts_language_next_state = wasmExports2["ts_language_next_state"];
    Module["_ts_language_symbol_name"] = _ts_language_symbol_name = wasmExports2["ts_language_symbol_name"];
    Module["_ts_language_symbol_for_name"] = _ts_language_symbol_for_name = wasmExports2["ts_language_symbol_for_name"];
    Module["_strncmp"] = _strncmp = wasmExports2["strncmp"];
    Module["_ts_language_symbol_type"] = _ts_language_symbol_type = wasmExports2["ts_language_symbol_type"];
    Module["_ts_language_field_name_for_id"] = _ts_language_field_name_for_id = wasmExports2["ts_language_field_name_for_id"];
    Module["_ts_lookahead_iterator_new"] = _ts_lookahead_iterator_new = wasmExports2["ts_lookahead_iterator_new"];
    Module["_ts_lookahead_iterator_delete"] = _ts_lookahead_iterator_delete = wasmExports2["ts_lookahead_iterator_delete"];
    Module["_ts_lookahead_iterator_reset_state"] = _ts_lookahead_iterator_reset_state = wasmExports2["ts_lookahead_iterator_reset_state"];
    Module["_ts_lookahead_iterator_reset"] = _ts_lookahead_iterator_reset = wasmExports2["ts_lookahead_iterator_reset"];
    Module["_ts_lookahead_iterator_next"] = _ts_lookahead_iterator_next = wasmExports2["ts_lookahead_iterator_next"];
    Module["_ts_lookahead_iterator_current_symbol"] = _ts_lookahead_iterator_current_symbol = wasmExports2["ts_lookahead_iterator_current_symbol"];
    Module["_ts_point_edit"] = _ts_point_edit = wasmExports2["ts_point_edit"];
    Module["_ts_parser_delete"] = _ts_parser_delete = wasmExports2["ts_parser_delete"];
    Module["_ts_parser_reset"] = _ts_parser_reset = wasmExports2["ts_parser_reset"];
    Module["_ts_parser_set_language"] = _ts_parser_set_language = wasmExports2["ts_parser_set_language"];
    Module["_ts_parser_set_included_ranges"] = _ts_parser_set_included_ranges = wasmExports2["ts_parser_set_included_ranges"];
    Module["_ts_query_new"] = _ts_query_new = wasmExports2["ts_query_new"];
    Module["_ts_query_delete"] = _ts_query_delete = wasmExports2["ts_query_delete"];
    Module["_iswspace"] = _iswspace = wasmExports2["iswspace"];
    Module["_iswalnum"] = _iswalnum = wasmExports2["iswalnum"];
    Module["_ts_query_copy"] = _ts_query_copy = wasmExports2["ts_query_copy"];
    Module["_ts_query_pattern_count"] = _ts_query_pattern_count = wasmExports2["ts_query_pattern_count"];
    Module["_ts_query_capture_count"] = _ts_query_capture_count = wasmExports2["ts_query_capture_count"];
    Module["_ts_query_string_count"] = _ts_query_string_count = wasmExports2["ts_query_string_count"];
    Module["_ts_query_capture_name_for_id"] = _ts_query_capture_name_for_id = wasmExports2["ts_query_capture_name_for_id"];
    Module["_ts_query_capture_quantifier_for_id"] = _ts_query_capture_quantifier_for_id = wasmExports2["ts_query_capture_quantifier_for_id"];
    Module["_ts_query_string_value_for_id"] = _ts_query_string_value_for_id = wasmExports2["ts_query_string_value_for_id"];
    Module["_ts_query_predicates_for_pattern"] = _ts_query_predicates_for_pattern = wasmExports2["ts_query_predicates_for_pattern"];
    Module["_ts_query_start_byte_for_pattern"] = _ts_query_start_byte_for_pattern = wasmExports2["ts_query_start_byte_for_pattern"];
    Module["_ts_query_end_byte_for_pattern"] = _ts_query_end_byte_for_pattern = wasmExports2["ts_query_end_byte_for_pattern"];
    Module["_ts_query_is_pattern_rooted"] = _ts_query_is_pattern_rooted = wasmExports2["ts_query_is_pattern_rooted"];
    Module["_ts_query_is_pattern_non_local"] = _ts_query_is_pattern_non_local = wasmExports2["ts_query_is_pattern_non_local"];
    Module["_ts_query_is_pattern_guaranteed_at_step"] = _ts_query_is_pattern_guaranteed_at_step = wasmExports2["ts_query_is_pattern_guaranteed_at_step"];
    Module["_ts_query_disable_capture"] = _ts_query_disable_capture = wasmExports2["ts_query_disable_capture"];
    Module["_ts_query_disable_pattern"] = _ts_query_disable_pattern = wasmExports2["ts_query_disable_pattern"];
    Module["_ts_tree_copy"] = _ts_tree_copy = wasmExports2["ts_tree_copy"];
    Module["_ts_tree_delete"] = _ts_tree_delete = wasmExports2["ts_tree_delete"];
    Module["_ts_init"] = _ts_init = wasmExports2["ts_init"];
    Module["_ts_parser_new_wasm"] = _ts_parser_new_wasm = wasmExports2["ts_parser_new_wasm"];
    Module["_ts_parser_enable_logger_wasm"] = _ts_parser_enable_logger_wasm = wasmExports2["ts_parser_enable_logger_wasm"];
    Module["_ts_parser_parse_wasm"] = _ts_parser_parse_wasm = wasmExports2["ts_parser_parse_wasm"];
    Module["_ts_parser_included_ranges_wasm"] = _ts_parser_included_ranges_wasm = wasmExports2["ts_parser_included_ranges_wasm"];
    Module["_ts_language_type_is_named_wasm"] = _ts_language_type_is_named_wasm = wasmExports2["ts_language_type_is_named_wasm"];
    Module["_ts_language_type_is_visible_wasm"] = _ts_language_type_is_visible_wasm = wasmExports2["ts_language_type_is_visible_wasm"];
    Module["_ts_language_metadata_wasm"] = _ts_language_metadata_wasm = wasmExports2["ts_language_metadata_wasm"];
    Module["_ts_language_supertypes_wasm"] = _ts_language_supertypes_wasm = wasmExports2["ts_language_supertypes_wasm"];
    Module["_ts_language_subtypes_wasm"] = _ts_language_subtypes_wasm = wasmExports2["ts_language_subtypes_wasm"];
    Module["_ts_tree_root_node_wasm"] = _ts_tree_root_node_wasm = wasmExports2["ts_tree_root_node_wasm"];
    Module["_ts_tree_root_node_with_offset_wasm"] = _ts_tree_root_node_with_offset_wasm = wasmExports2["ts_tree_root_node_with_offset_wasm"];
    Module["_ts_tree_edit_wasm"] = _ts_tree_edit_wasm = wasmExports2["ts_tree_edit_wasm"];
    Module["_ts_tree_included_ranges_wasm"] = _ts_tree_included_ranges_wasm = wasmExports2["ts_tree_included_ranges_wasm"];
    Module["_ts_tree_get_changed_ranges_wasm"] = _ts_tree_get_changed_ranges_wasm = wasmExports2["ts_tree_get_changed_ranges_wasm"];
    Module["_ts_tree_cursor_new_wasm"] = _ts_tree_cursor_new_wasm = wasmExports2["ts_tree_cursor_new_wasm"];
    Module["_ts_tree_cursor_copy_wasm"] = _ts_tree_cursor_copy_wasm = wasmExports2["ts_tree_cursor_copy_wasm"];
    Module["_ts_tree_cursor_delete_wasm"] = _ts_tree_cursor_delete_wasm = wasmExports2["ts_tree_cursor_delete_wasm"];
    Module["_ts_tree_cursor_reset_wasm"] = _ts_tree_cursor_reset_wasm = wasmExports2["ts_tree_cursor_reset_wasm"];
    Module["_ts_tree_cursor_reset_to_wasm"] = _ts_tree_cursor_reset_to_wasm = wasmExports2["ts_tree_cursor_reset_to_wasm"];
    Module["_ts_tree_cursor_goto_first_child_wasm"] = _ts_tree_cursor_goto_first_child_wasm = wasmExports2["ts_tree_cursor_goto_first_child_wasm"];
    Module["_ts_tree_cursor_goto_last_child_wasm"] = _ts_tree_cursor_goto_last_child_wasm = wasmExports2["ts_tree_cursor_goto_last_child_wasm"];
    Module["_ts_tree_cursor_goto_first_child_for_index_wasm"] = _ts_tree_cursor_goto_first_child_for_index_wasm = wasmExports2["ts_tree_cursor_goto_first_child_for_index_wasm"];
    Module["_ts_tree_cursor_goto_first_child_for_position_wasm"] = _ts_tree_cursor_goto_first_child_for_position_wasm = wasmExports2["ts_tree_cursor_goto_first_child_for_position_wasm"];
    Module["_ts_tree_cursor_goto_next_sibling_wasm"] = _ts_tree_cursor_goto_next_sibling_wasm = wasmExports2["ts_tree_cursor_goto_next_sibling_wasm"];
    Module["_ts_tree_cursor_goto_previous_sibling_wasm"] = _ts_tree_cursor_goto_previous_sibling_wasm = wasmExports2["ts_tree_cursor_goto_previous_sibling_wasm"];
    Module["_ts_tree_cursor_goto_descendant_wasm"] = _ts_tree_cursor_goto_descendant_wasm = wasmExports2["ts_tree_cursor_goto_descendant_wasm"];
    Module["_ts_tree_cursor_goto_parent_wasm"] = _ts_tree_cursor_goto_parent_wasm = wasmExports2["ts_tree_cursor_goto_parent_wasm"];
    Module["_ts_tree_cursor_current_node_type_id_wasm"] = _ts_tree_cursor_current_node_type_id_wasm = wasmExports2["ts_tree_cursor_current_node_type_id_wasm"];
    Module["_ts_tree_cursor_current_node_state_id_wasm"] = _ts_tree_cursor_current_node_state_id_wasm = wasmExports2["ts_tree_cursor_current_node_state_id_wasm"];
    Module["_ts_tree_cursor_current_node_is_named_wasm"] = _ts_tree_cursor_current_node_is_named_wasm = wasmExports2["ts_tree_cursor_current_node_is_named_wasm"];
    Module["_ts_tree_cursor_current_node_is_missing_wasm"] = _ts_tree_cursor_current_node_is_missing_wasm = wasmExports2["ts_tree_cursor_current_node_is_missing_wasm"];
    Module["_ts_tree_cursor_current_node_id_wasm"] = _ts_tree_cursor_current_node_id_wasm = wasmExports2["ts_tree_cursor_current_node_id_wasm"];
    Module["_ts_tree_cursor_start_position_wasm"] = _ts_tree_cursor_start_position_wasm = wasmExports2["ts_tree_cursor_start_position_wasm"];
    Module["_ts_tree_cursor_end_position_wasm"] = _ts_tree_cursor_end_position_wasm = wasmExports2["ts_tree_cursor_end_position_wasm"];
    Module["_ts_tree_cursor_start_index_wasm"] = _ts_tree_cursor_start_index_wasm = wasmExports2["ts_tree_cursor_start_index_wasm"];
    Module["_ts_tree_cursor_end_index_wasm"] = _ts_tree_cursor_end_index_wasm = wasmExports2["ts_tree_cursor_end_index_wasm"];
    Module["_ts_tree_cursor_current_field_id_wasm"] = _ts_tree_cursor_current_field_id_wasm = wasmExports2["ts_tree_cursor_current_field_id_wasm"];
    Module["_ts_tree_cursor_current_depth_wasm"] = _ts_tree_cursor_current_depth_wasm = wasmExports2["ts_tree_cursor_current_depth_wasm"];
    Module["_ts_tree_cursor_current_descendant_index_wasm"] = _ts_tree_cursor_current_descendant_index_wasm = wasmExports2["ts_tree_cursor_current_descendant_index_wasm"];
    Module["_ts_tree_cursor_current_node_wasm"] = _ts_tree_cursor_current_node_wasm = wasmExports2["ts_tree_cursor_current_node_wasm"];
    Module["_ts_node_symbol_wasm"] = _ts_node_symbol_wasm = wasmExports2["ts_node_symbol_wasm"];
    Module["_ts_node_field_name_for_child_wasm"] = _ts_node_field_name_for_child_wasm = wasmExports2["ts_node_field_name_for_child_wasm"];
    Module["_ts_node_field_name_for_named_child_wasm"] = _ts_node_field_name_for_named_child_wasm = wasmExports2["ts_node_field_name_for_named_child_wasm"];
    Module["_ts_node_children_by_field_id_wasm"] = _ts_node_children_by_field_id_wasm = wasmExports2["ts_node_children_by_field_id_wasm"];
    Module["_ts_node_first_child_for_byte_wasm"] = _ts_node_first_child_for_byte_wasm = wasmExports2["ts_node_first_child_for_byte_wasm"];
    Module["_ts_node_first_named_child_for_byte_wasm"] = _ts_node_first_named_child_for_byte_wasm = wasmExports2["ts_node_first_named_child_for_byte_wasm"];
    Module["_ts_node_grammar_symbol_wasm"] = _ts_node_grammar_symbol_wasm = wasmExports2["ts_node_grammar_symbol_wasm"];
    Module["_ts_node_child_count_wasm"] = _ts_node_child_count_wasm = wasmExports2["ts_node_child_count_wasm"];
    Module["_ts_node_named_child_count_wasm"] = _ts_node_named_child_count_wasm = wasmExports2["ts_node_named_child_count_wasm"];
    Module["_ts_node_child_wasm"] = _ts_node_child_wasm = wasmExports2["ts_node_child_wasm"];
    Module["_ts_node_named_child_wasm"] = _ts_node_named_child_wasm = wasmExports2["ts_node_named_child_wasm"];
    Module["_ts_node_child_by_field_id_wasm"] = _ts_node_child_by_field_id_wasm = wasmExports2["ts_node_child_by_field_id_wasm"];
    Module["_ts_node_next_sibling_wasm"] = _ts_node_next_sibling_wasm = wasmExports2["ts_node_next_sibling_wasm"];
    Module["_ts_node_prev_sibling_wasm"] = _ts_node_prev_sibling_wasm = wasmExports2["ts_node_prev_sibling_wasm"];
    Module["_ts_node_next_named_sibling_wasm"] = _ts_node_next_named_sibling_wasm = wasmExports2["ts_node_next_named_sibling_wasm"];
    Module["_ts_node_prev_named_sibling_wasm"] = _ts_node_prev_named_sibling_wasm = wasmExports2["ts_node_prev_named_sibling_wasm"];
    Module["_ts_node_descendant_count_wasm"] = _ts_node_descendant_count_wasm = wasmExports2["ts_node_descendant_count_wasm"];
    Module["_ts_node_parent_wasm"] = _ts_node_parent_wasm = wasmExports2["ts_node_parent_wasm"];
    Module["_ts_node_child_with_descendant_wasm"] = _ts_node_child_with_descendant_wasm = wasmExports2["ts_node_child_with_descendant_wasm"];
    Module["_ts_node_descendant_for_index_wasm"] = _ts_node_descendant_for_index_wasm = wasmExports2["ts_node_descendant_for_index_wasm"];
    Module["_ts_node_named_descendant_for_index_wasm"] = _ts_node_named_descendant_for_index_wasm = wasmExports2["ts_node_named_descendant_for_index_wasm"];
    Module["_ts_node_descendant_for_position_wasm"] = _ts_node_descendant_for_position_wasm = wasmExports2["ts_node_descendant_for_position_wasm"];
    Module["_ts_node_named_descendant_for_position_wasm"] = _ts_node_named_descendant_for_position_wasm = wasmExports2["ts_node_named_descendant_for_position_wasm"];
    Module["_ts_node_start_point_wasm"] = _ts_node_start_point_wasm = wasmExports2["ts_node_start_point_wasm"];
    Module["_ts_node_end_point_wasm"] = _ts_node_end_point_wasm = wasmExports2["ts_node_end_point_wasm"];
    Module["_ts_node_start_index_wasm"] = _ts_node_start_index_wasm = wasmExports2["ts_node_start_index_wasm"];
    Module["_ts_node_end_index_wasm"] = _ts_node_end_index_wasm = wasmExports2["ts_node_end_index_wasm"];
    Module["_ts_node_to_string_wasm"] = _ts_node_to_string_wasm = wasmExports2["ts_node_to_string_wasm"];
    Module["_ts_node_children_wasm"] = _ts_node_children_wasm = wasmExports2["ts_node_children_wasm"];
    Module["_ts_node_named_children_wasm"] = _ts_node_named_children_wasm = wasmExports2["ts_node_named_children_wasm"];
    Module["_ts_node_descendants_of_type_wasm"] = _ts_node_descendants_of_type_wasm = wasmExports2["ts_node_descendants_of_type_wasm"];
    Module["_ts_node_is_named_wasm"] = _ts_node_is_named_wasm = wasmExports2["ts_node_is_named_wasm"];
    Module["_ts_node_has_changes_wasm"] = _ts_node_has_changes_wasm = wasmExports2["ts_node_has_changes_wasm"];
    Module["_ts_node_has_error_wasm"] = _ts_node_has_error_wasm = wasmExports2["ts_node_has_error_wasm"];
    Module["_ts_node_is_error_wasm"] = _ts_node_is_error_wasm = wasmExports2["ts_node_is_error_wasm"];
    Module["_ts_node_is_missing_wasm"] = _ts_node_is_missing_wasm = wasmExports2["ts_node_is_missing_wasm"];
    Module["_ts_node_is_extra_wasm"] = _ts_node_is_extra_wasm = wasmExports2["ts_node_is_extra_wasm"];
    Module["_ts_node_parse_state_wasm"] = _ts_node_parse_state_wasm = wasmExports2["ts_node_parse_state_wasm"];
    Module["_ts_node_next_parse_state_wasm"] = _ts_node_next_parse_state_wasm = wasmExports2["ts_node_next_parse_state_wasm"];
    Module["_ts_query_matches_wasm"] = _ts_query_matches_wasm = wasmExports2["ts_query_matches_wasm"];
    Module["_ts_query_captures_wasm"] = _ts_query_captures_wasm = wasmExports2["ts_query_captures_wasm"];
    Module["_memset"] = _memset = wasmExports2["memset"];
    Module["_memcpy"] = _memcpy = wasmExports2["memcpy"];
    Module["_memmove"] = _memmove = wasmExports2["memmove"];
    Module["_iswalpha"] = _iswalpha = wasmExports2["iswalpha"];
    Module["_iswblank"] = _iswblank = wasmExports2["iswblank"];
    Module["_iswdigit"] = _iswdigit = wasmExports2["iswdigit"];
    Module["_iswlower"] = _iswlower = wasmExports2["iswlower"];
    Module["_iswpunct"] = _iswpunct = wasmExports2["iswpunct"];
    Module["_iswupper"] = _iswupper = wasmExports2["iswupper"];
    Module["_iswxdigit"] = _iswxdigit = wasmExports2["iswxdigit"];
    Module["_memchr"] = _memchr = wasmExports2["memchr"];
    Module["_strlen"] = _strlen = wasmExports2["strlen"];
    Module["_strcmp"] = _strcmp = wasmExports2["strcmp"];
    Module["_strncat"] = _strncat = wasmExports2["strncat"];
    Module["_strncpy"] = _strncpy = wasmExports2["strncpy"];
    Module["_towlower"] = _towlower = wasmExports2["towlower"];
    Module["_towupper"] = _towupper = wasmExports2["towupper"];
    _setThrew = wasmExports2["setThrew"];
    __emscripten_stack_restore = wasmExports2["_emscripten_stack_restore"];
    __emscripten_stack_alloc = wasmExports2["_emscripten_stack_alloc"];
    _emscripten_stack_get_current = wasmExports2["emscripten_stack_get_current"];
    ___wasm_apply_data_relocs = wasmExports2["__wasm_apply_data_relocs"];
  }
  __name(assignWasmExports, "assignWasmExports");
  var wasmImports = {
    /** @export */
    __heap_base: ___heap_base,
    /** @export */
    __indirect_function_table: wasmTable,
    /** @export */
    __memory_base: ___memory_base,
    /** @export */
    __stack_high: ___stack_high,
    /** @export */
    __stack_low: ___stack_low,
    /** @export */
    __stack_pointer: ___stack_pointer,
    /** @export */
    __table_base: ___table_base,
    /** @export */
    _abort_js: __abort_js,
    /** @export */
    emscripten_resize_heap: _emscripten_resize_heap,
    /** @export */
    fd_close: _fd_close,
    /** @export */
    fd_seek: _fd_seek,
    /** @export */
    fd_write: _fd_write,
    /** @export */
    memory: wasmMemory,
    /** @export */
    tree_sitter_log_callback: _tree_sitter_log_callback,
    /** @export */
    tree_sitter_parse_callback: _tree_sitter_parse_callback,
    /** @export */
    tree_sitter_progress_callback: _tree_sitter_progress_callback,
    /** @export */
    tree_sitter_query_progress_callback: _tree_sitter_query_progress_callback
  };
  function callMain(args2 = []) {
    var entryFunction = resolveGlobalSymbol("main").sym;
    if (!entryFunction) return;
    args2.unshift(thisProgram);
    var argc = args2.length;
    var argv = stackAlloc((argc + 1) * 4);
    var argv_ptr = argv;
    args2.forEach((arg) => {
      LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, stringToUTF8OnStack(arg));
      argv_ptr += 4;
    });
    LE_HEAP_STORE_U32((argv_ptr >> 2) * 4, 0);
    try {
      var ret = entryFunction(argc, argv);
      exitJS(
        ret,
        /* implicit = */
        true
      );
      return ret;
    } catch (e) {
      return handleException(e);
    }
  }
  __name(callMain, "callMain");
  function run(args2 = arguments_) {
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    preRun();
    if (runDependencies > 0) {
      dependenciesFulfilled = run;
      return;
    }
    function doRun() {
      Module["calledRun"] = true;
      if (ABORT) return;
      initRuntime();
      preMain();
      readyPromiseResolve?.(Module);
      Module["onRuntimeInitialized"]?.();
      var noInitialRun = Module["noInitialRun"] || false;
      if (!noInitialRun) callMain(args2);
      postRun();
    }
    __name(doRun, "doRun");
    if (Module["setStatus"]) {
      Module["setStatus"]("Running...");
      setTimeout(() => {
        setTimeout(() => Module["setStatus"](""), 1);
        doRun();
      }, 1);
    } else {
      doRun();
    }
  }
  __name(run, "run");
  var wasmExports;
  wasmExports = await createWasm();
  run();
  if (runtimeInitialized) {
    moduleRtn = Module;
  } else {
    moduleRtn = new Promise((resolve2, reject) => {
      readyPromiseResolve = resolve2;
      readyPromiseReject = reject;
    });
  }
  return moduleRtn;
}
__name(Module2, "Module");
var web_tree_sitter_default = Module2;
var Module3 = null;
async function initializeBinding(moduleOptions) {
  return Module3 ??= await web_tree_sitter_default(moduleOptions);
}
__name(initializeBinding, "initializeBinding");
function checkModule() {
  return !!Module3;
}
__name(checkModule, "checkModule");
var TRANSFER_BUFFER;
var LANGUAGE_VERSION;
var MIN_COMPATIBLE_VERSION;
var finalizer4 = newFinalizer((addresses) => {
  C._ts_parser_delete(addresses[0]);
  C._free(addresses[1]);
});
var Parser = class {
  static {
    __name(this, "Parser");
  }
  /** @internal */
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  [1] = 0;
  // Internal handle for Wasm
  /** @internal */
  logCallback = null;
  /** The parser's current language. */
  language = null;
  /**
   * This must always be called before creating a Parser.
   *
   * You can optionally pass in options to configure the Wasm module, the most common
   * one being `locateFile` to help the module find the `.wasm` file.
   */
  static async init(moduleOptions) {
    setModule(await initializeBinding(moduleOptions));
    TRANSFER_BUFFER = C._ts_init();
    LANGUAGE_VERSION = C.getValue(TRANSFER_BUFFER, "i32");
    MIN_COMPATIBLE_VERSION = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
  }
  /**
   * Create a new parser.
   */
  constructor() {
    this.initialize();
    finalizer4?.register(this, [this[0], this[1]], this);
  }
  /** @internal */
  initialize() {
    if (!checkModule()) {
      throw new Error("cannot construct a Parser before calling `init()`");
    }
    C._ts_parser_new_wasm();
    this[0] = C.getValue(TRANSFER_BUFFER, "i32");
    this[1] = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
  }
  /** Delete the parser, freeing its resources. */
  delete() {
    finalizer4?.unregister(this);
    C._ts_parser_delete(this[0]);
    C._free(this[1]);
    this[0] = 0;
    this[1] = 0;
  }
  /**
   * Set the language that the parser should use for parsing.
   *
   * If the language was not successfully assigned, an error will be thrown.
   * This happens if the language was generated with an incompatible
   * version of the Tree-sitter CLI. Check the language's version using
   * {@link Language#version} and compare it to this library's
   * {@link LANGUAGE_VERSION} and {@link MIN_COMPATIBLE_VERSION} constants.
   */
  setLanguage(language) {
    let address;
    if (!language) {
      address = 0;
      this.language = null;
    } else if (language.constructor === Language) {
      address = language[0];
      const version = C._ts_language_abi_version(address);
      if (version < MIN_COMPATIBLE_VERSION || LANGUAGE_VERSION < version) {
        throw new Error(
          `Incompatible language version ${version}. Compatibility range ${MIN_COMPATIBLE_VERSION} through ${LANGUAGE_VERSION}.`
        );
      }
      this.language = language;
    } else {
      throw new Error("Argument must be a Language");
    }
    C._ts_parser_set_language(this[0], address);
    return this;
  }
  /**
   * Parse a slice of UTF8 text.
   *
   * @param {string | ParseCallback} callback - The UTF8-encoded text to parse or a callback function.
   *
   * @param {Tree | null} [oldTree] - A previous syntax tree parsed from the same document. If the text of the
   *   document has changed since `oldTree` was created, then you must edit `oldTree` to match
   *   the new text using {@link Tree#edit}.
   *
   * @param {ParseOptions} [options] - Options for parsing the text.
   *  This can be used to set the included ranges, or a progress callback.
   *
   * @returns {Tree | null} A {@link Tree} if parsing succeeded, or `null` if:
   *  - The parser has not yet had a language assigned with {@link Parser#setLanguage}.
   *  - The progress callback returned true.
   */
  parse(callback, oldTree, options) {
    if (typeof callback === "string") {
      C.currentParseCallback = (index) => callback.slice(index);
    } else if (typeof callback === "function") {
      C.currentParseCallback = callback;
    } else {
      throw new Error("Argument must be a string or a function");
    }
    if (options?.progressCallback) {
      C.currentProgressCallback = options.progressCallback;
    } else {
      C.currentProgressCallback = null;
    }
    if (this.logCallback) {
      C.currentLogCallback = this.logCallback;
      C._ts_parser_enable_logger_wasm(this[0], 1);
    } else {
      C.currentLogCallback = null;
      C._ts_parser_enable_logger_wasm(this[0], 0);
    }
    let rangeCount = 0;
    let rangeAddress = 0;
    if (options?.includedRanges) {
      rangeCount = options.includedRanges.length;
      rangeAddress = C._calloc(rangeCount, SIZE_OF_RANGE);
      let address = rangeAddress;
      for (let i2 = 0; i2 < rangeCount; i2++) {
        marshalRange(address, options.includedRanges[i2]);
        address += SIZE_OF_RANGE;
      }
    }
    const treeAddress = C._ts_parser_parse_wasm(
      this[0],
      this[1],
      oldTree ? oldTree[0] : 0,
      rangeAddress,
      rangeCount
    );
    if (!treeAddress) {
      C.currentParseCallback = null;
      C.currentLogCallback = null;
      C.currentProgressCallback = null;
      return null;
    }
    if (!this.language) {
      throw new Error("Parser must have a language to parse");
    }
    const result = new Tree(INTERNAL, treeAddress, this.language, C.currentParseCallback);
    C.currentParseCallback = null;
    C.currentLogCallback = null;
    C.currentProgressCallback = null;
    return result;
  }
  /**
   * Instruct the parser to start the next parse from the beginning.
   *
   * If the parser previously failed because of a callback, 
   * then by default, it will resume where it left off on the
   * next call to {@link Parser#parse} or other parsing functions.
   * If you don't want to resume, and instead intend to use this parser to
   * parse some other document, you must call `reset` first.
   */
  reset() {
    C._ts_parser_reset(this[0]);
  }
  /** Get the ranges of text that the parser will include when parsing. */
  getIncludedRanges() {
    C._ts_parser_included_ranges_wasm(this[0]);
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const buffer = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const result = new Array(count);
    if (count > 0) {
      let address = buffer;
      for (let i2 = 0; i2 < count; i2++) {
        result[i2] = unmarshalRange(address);
        address += SIZE_OF_RANGE;
      }
      C._free(buffer);
    }
    return result;
  }
  /** Set the logging callback that a parser should use during parsing. */
  setLogger(callback) {
    if (!callback) {
      this.logCallback = null;
    } else if (typeof callback !== "function") {
      throw new Error("Logger callback must be a function");
    } else {
      this.logCallback = callback;
    }
    return this;
  }
  /** Get the parser's current logger. */
  getLogger() {
    return this.logCallback;
  }
};
var PREDICATE_STEP_TYPE_CAPTURE = 1;
var PREDICATE_STEP_TYPE_STRING = 2;
var QUERY_WORD_REGEX = /[\w-]+/g;
var CaptureQuantifier = {
  Zero: 0,
  ZeroOrOne: 1,
  ZeroOrMore: 2,
  One: 3,
  OneOrMore: 4
};
var isCaptureStep = /* @__PURE__ */ __name((step) => step.type === "capture", "isCaptureStep");
var isStringStep = /* @__PURE__ */ __name((step) => step.type === "string", "isStringStep");
var QueryErrorKind = {
  Syntax: 1,
  NodeName: 2,
  FieldName: 3,
  CaptureName: 4,
  PatternStructure: 5
};
var QueryError = class _QueryError extends Error {
  constructor(kind, info2, index, length) {
    super(_QueryError.formatMessage(kind, info2));
    this.kind = kind;
    this.info = info2;
    this.index = index;
    this.length = length;
    this.name = "QueryError";
  }
  kind;
  info;
  index;
  length;
  static {
    __name(this, "QueryError");
  }
  /** Formats an error message based on the error kind and info */
  static formatMessage(kind, info2) {
    switch (kind) {
      case QueryErrorKind.NodeName:
        return `Bad node name '${info2.word}'`;
      case QueryErrorKind.FieldName:
        return `Bad field name '${info2.word}'`;
      case QueryErrorKind.CaptureName:
        return `Bad capture name @${info2.word}`;
      case QueryErrorKind.PatternStructure:
        return `Bad pattern structure at offset ${info2.suffix}`;
      case QueryErrorKind.Syntax:
        return `Bad syntax at offset ${info2.suffix}`;
    }
  }
};
function parseAnyPredicate(steps, index, operator, textPredicates) {
  if (steps.length !== 3) {
    throw new Error(
      `Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}`
    );
  }
  if (!isCaptureStep(steps[1])) {
    throw new Error(
      `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}"`
    );
  }
  const isPositive = operator === "eq?" || operator === "any-eq?";
  const matchAll = !operator.startsWith("any-");
  if (isCaptureStep(steps[2])) {
    const captureName1 = steps[1].name;
    const captureName2 = steps[2].name;
    textPredicates[index].push((captures) => {
      const nodes1 = [];
      const nodes2 = [];
      for (const c of captures) {
        if (c.name === captureName1) nodes1.push(c.node);
        if (c.name === captureName2) nodes2.push(c.node);
      }
      const compare = /* @__PURE__ */ __name((n1, n2, positive) => {
        return positive ? n1.text === n2.text : n1.text !== n2.text;
      }, "compare");
      return matchAll ? nodes1.every((n1) => nodes2.some((n2) => compare(n1, n2, isPositive))) : nodes1.some((n1) => nodes2.some((n2) => compare(n1, n2, isPositive)));
    });
  } else {
    const captureName = steps[1].name;
    const stringValue = steps[2].value;
    const matches = /* @__PURE__ */ __name((n) => n.text === stringValue, "matches");
    const doesNotMatch = /* @__PURE__ */ __name((n) => n.text !== stringValue, "doesNotMatch");
    textPredicates[index].push((captures) => {
      const nodes = [];
      for (const c of captures) {
        if (c.name === captureName) nodes.push(c.node);
      }
      const test = isPositive ? matches : doesNotMatch;
      return matchAll ? nodes.every(test) : nodes.some(test);
    });
  }
}
__name(parseAnyPredicate, "parseAnyPredicate");
function parseMatchPredicate(steps, index, operator, textPredicates) {
  if (steps.length !== 3) {
    throw new Error(
      `Wrong number of arguments to \`#${operator}\` predicate. Expected 2, got ${steps.length - 1}.`
    );
  }
  if (steps[1].type !== "capture") {
    throw new Error(
      `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`
    );
  }
  if (steps[2].type !== "string") {
    throw new Error(
      `Second argument of \`#${operator}\` predicate must be a string. Got @${steps[2].name}.`
    );
  }
  const isPositive = operator === "match?" || operator === "any-match?";
  const matchAll = !operator.startsWith("any-");
  const captureName = steps[1].name;
  const regex = new RegExp(steps[2].value);
  textPredicates[index].push((captures) => {
    const nodes = [];
    for (const c of captures) {
      if (c.name === captureName) nodes.push(c.node.text);
    }
    const test = /* @__PURE__ */ __name((text, positive) => {
      return positive ? regex.test(text) : !regex.test(text);
    }, "test");
    if (nodes.length === 0) return !isPositive;
    return matchAll ? nodes.every((text) => test(text, isPositive)) : nodes.some((text) => test(text, isPositive));
  });
}
__name(parseMatchPredicate, "parseMatchPredicate");
function parseAnyOfPredicate(steps, index, operator, textPredicates) {
  if (steps.length < 2) {
    throw new Error(
      `Wrong number of arguments to \`#${operator}\` predicate. Expected at least 1. Got ${steps.length - 1}.`
    );
  }
  if (steps[1].type !== "capture") {
    throw new Error(
      `First argument of \`#${operator}\` predicate must be a capture. Got "${steps[1].value}".`
    );
  }
  const isPositive = operator === "any-of?";
  const captureName = steps[1].name;
  const stringSteps = steps.slice(2);
  if (!stringSteps.every(isStringStep)) {
    throw new Error(
      `Arguments to \`#${operator}\` predicate must be strings.".`
    );
  }
  const values = stringSteps.map((s) => s.value);
  textPredicates[index].push((captures) => {
    const nodes = [];
    for (const c of captures) {
      if (c.name === captureName) nodes.push(c.node.text);
    }
    if (nodes.length === 0) return !isPositive;
    return nodes.every((text) => values.includes(text)) === isPositive;
  });
}
__name(parseAnyOfPredicate, "parseAnyOfPredicate");
function parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties) {
  if (steps.length < 2 || steps.length > 3) {
    throw new Error(
      `Wrong number of arguments to \`#${operator}\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`
    );
  }
  if (!steps.every(isStringStep)) {
    throw new Error(
      `Arguments to \`#${operator}\` predicate must be strings.".`
    );
  }
  const properties = operator === "is?" ? assertedProperties : refutedProperties;
  if (!properties[index]) properties[index] = {};
  properties[index][steps[1].value] = steps[2]?.value ?? null;
}
__name(parseIsPredicate, "parseIsPredicate");
function parseSetDirective(steps, index, setProperties) {
  if (steps.length < 2 || steps.length > 3) {
    throw new Error(`Wrong number of arguments to \`#set!\` predicate. Expected 1 or 2. Got ${steps.length - 1}.`);
  }
  if (!steps.every(isStringStep)) {
    throw new Error(`Arguments to \`#set!\` predicate must be strings.".`);
  }
  if (!setProperties[index]) setProperties[index] = {};
  setProperties[index][steps[1].value] = steps[2]?.value ?? null;
}
__name(parseSetDirective, "parseSetDirective");
function parsePattern(index, stepType, stepValueId, captureNames, stringValues, steps, textPredicates, predicates, setProperties, assertedProperties, refutedProperties) {
  if (stepType === PREDICATE_STEP_TYPE_CAPTURE) {
    const name2 = captureNames[stepValueId];
    steps.push({ type: "capture", name: name2 });
  } else if (stepType === PREDICATE_STEP_TYPE_STRING) {
    steps.push({ type: "string", value: stringValues[stepValueId] });
  } else if (steps.length > 0) {
    if (steps[0].type !== "string") {
      throw new Error("Predicates must begin with a literal value");
    }
    const operator = steps[0].value;
    switch (operator) {
      case "any-not-eq?":
      case "not-eq?":
      case "any-eq?":
      case "eq?":
        parseAnyPredicate(steps, index, operator, textPredicates);
        break;
      case "any-not-match?":
      case "not-match?":
      case "any-match?":
      case "match?":
        parseMatchPredicate(steps, index, operator, textPredicates);
        break;
      case "not-any-of?":
      case "any-of?":
        parseAnyOfPredicate(steps, index, operator, textPredicates);
        break;
      case "is?":
      case "is-not?":
        parseIsPredicate(steps, index, operator, assertedProperties, refutedProperties);
        break;
      case "set!":
        parseSetDirective(steps, index, setProperties);
        break;
      default:
        predicates[index].push({ operator, operands: steps.slice(1) });
    }
    steps.length = 0;
  }
}
__name(parsePattern, "parsePattern");
var finalizer5 = newFinalizer((address) => {
  C._ts_query_delete(address);
});
var Query = class {
  static {
    __name(this, "Query");
  }
  /** @internal */
  [0] = 0;
  // Internal handle for Wasm
  /** @internal */
  exceededMatchLimit;
  /** @internal */
  textPredicates;
  /** The names of the captures used in the query. */
  captureNames;
  /** The quantifiers of the captures used in the query. */
  captureQuantifiers;
  /**
   * The other user-defined predicates associated with the given index.
   *
   * This includes predicates with operators other than:
   * - `match?`
   * - `eq?` and `not-eq?`
   * - `any-of?` and `not-any-of?`
   * - `is?` and `is-not?`
   * - `set!`
   */
  predicates;
  /** The properties for predicates with the operator `set!`. */
  setProperties;
  /** The properties for predicates with the operator `is?`. */
  assertedProperties;
  /** The properties for predicates with the operator `is-not?`. */
  refutedProperties;
  /** The maximum number of in-progress matches for this cursor. */
  matchLimit;
  /**
   * Create a new query from a string containing one or more S-expression
   * patterns.
   *
   * The query is associated with a particular language, and can only be run
   * on syntax nodes parsed with that language. References to Queries can be
   * shared between multiple threads.
   *
   * @link {@see https://tree-sitter.github.io/tree-sitter/using-parsers/queries}
   */
  constructor(language, source) {
    const sourceLength = C.lengthBytesUTF8(source);
    const sourceAddress = C._malloc(sourceLength + 1);
    C.stringToUTF8(source, sourceAddress, sourceLength + 1);
    const address = C._ts_query_new(
      language[0],
      sourceAddress,
      sourceLength,
      TRANSFER_BUFFER,
      TRANSFER_BUFFER + SIZE_OF_INT
    );
    if (!address) {
      const errorId = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
      const errorByte = C.getValue(TRANSFER_BUFFER, "i32");
      const errorIndex = C.UTF8ToString(sourceAddress, errorByte).length;
      const suffix = source.slice(errorIndex, errorIndex + 100).split("\n")[0];
      const word = suffix.match(QUERY_WORD_REGEX)?.[0] ?? "";
      C._free(sourceAddress);
      switch (errorId) {
        case QueryErrorKind.Syntax:
          throw new QueryError(QueryErrorKind.Syntax, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0);
        case QueryErrorKind.NodeName:
          throw new QueryError(errorId, { word }, errorIndex, word.length);
        case QueryErrorKind.FieldName:
          throw new QueryError(errorId, { word }, errorIndex, word.length);
        case QueryErrorKind.CaptureName:
          throw new QueryError(errorId, { word }, errorIndex, word.length);
        case QueryErrorKind.PatternStructure:
          throw new QueryError(errorId, { suffix: `${errorIndex}: '${suffix}'...` }, errorIndex, 0);
      }
    }
    const stringCount = C._ts_query_string_count(address);
    const captureCount = C._ts_query_capture_count(address);
    const patternCount = C._ts_query_pattern_count(address);
    const captureNames = new Array(captureCount);
    const captureQuantifiers = new Array(patternCount);
    const stringValues = new Array(stringCount);
    for (let i2 = 0; i2 < captureCount; i2++) {
      const nameAddress = C._ts_query_capture_name_for_id(
        address,
        i2,
        TRANSFER_BUFFER
      );
      const nameLength = C.getValue(TRANSFER_BUFFER, "i32");
      captureNames[i2] = C.UTF8ToString(nameAddress, nameLength);
    }
    for (let i2 = 0; i2 < patternCount; i2++) {
      const captureQuantifiersArray = new Array(captureCount);
      for (let j = 0; j < captureCount; j++) {
        const quantifier = C._ts_query_capture_quantifier_for_id(address, i2, j);
        captureQuantifiersArray[j] = quantifier;
      }
      captureQuantifiers[i2] = captureQuantifiersArray;
    }
    for (let i2 = 0; i2 < stringCount; i2++) {
      const valueAddress = C._ts_query_string_value_for_id(
        address,
        i2,
        TRANSFER_BUFFER
      );
      const nameLength = C.getValue(TRANSFER_BUFFER, "i32");
      stringValues[i2] = C.UTF8ToString(valueAddress, nameLength);
    }
    const setProperties = new Array(patternCount);
    const assertedProperties = new Array(patternCount);
    const refutedProperties = new Array(patternCount);
    const predicates = new Array(patternCount);
    const textPredicates = new Array(patternCount);
    for (let i2 = 0; i2 < patternCount; i2++) {
      const predicatesAddress = C._ts_query_predicates_for_pattern(address, i2, TRANSFER_BUFFER);
      const stepCount = C.getValue(TRANSFER_BUFFER, "i32");
      predicates[i2] = [];
      textPredicates[i2] = [];
      const steps = new Array();
      let stepAddress = predicatesAddress;
      for (let j = 0; j < stepCount; j++) {
        const stepType = C.getValue(stepAddress, "i32");
        stepAddress += SIZE_OF_INT;
        const stepValueId = C.getValue(stepAddress, "i32");
        stepAddress += SIZE_OF_INT;
        parsePattern(
          i2,
          stepType,
          stepValueId,
          captureNames,
          stringValues,
          steps,
          textPredicates,
          predicates,
          setProperties,
          assertedProperties,
          refutedProperties
        );
      }
      Object.freeze(textPredicates[i2]);
      Object.freeze(predicates[i2]);
      Object.freeze(setProperties[i2]);
      Object.freeze(assertedProperties[i2]);
      Object.freeze(refutedProperties[i2]);
    }
    C._free(sourceAddress);
    this[0] = address;
    this.captureNames = captureNames;
    this.captureQuantifiers = captureQuantifiers;
    this.textPredicates = textPredicates;
    this.predicates = predicates;
    this.setProperties = setProperties;
    this.assertedProperties = assertedProperties;
    this.refutedProperties = refutedProperties;
    this.exceededMatchLimit = false;
    finalizer5?.register(this, address, this);
  }
  /** Delete the query, freeing its resources. */
  delete() {
    finalizer5?.unregister(this);
    C._ts_query_delete(this[0]);
    this[0] = 0;
  }
  /**
   * Iterate over all of the matches in the order that they were found.
   *
   * Each match contains the index of the pattern that matched, and a list of
   * captures. Because multiple patterns can match the same set of nodes,
   * one match may contain captures that appear *before* some of the
   * captures from a previous match.
   *
   * @param {Node} node - The node to execute the query on.
   *
   * @param {QueryOptions} options - Options for query execution.
   */
  matches(node, options = {}) {
    const startPosition = options.startPosition ?? ZERO_POINT;
    const endPosition = options.endPosition ?? ZERO_POINT;
    const startIndex = options.startIndex ?? 0;
    const endIndex = options.endIndex ?? 0;
    const startContainingPosition = options.startContainingPosition ?? ZERO_POINT;
    const endContainingPosition = options.endContainingPosition ?? ZERO_POINT;
    const startContainingIndex = options.startContainingIndex ?? 0;
    const endContainingIndex = options.endContainingIndex ?? 0;
    const matchLimit = options.matchLimit ?? 4294967295;
    const maxStartDepth = options.maxStartDepth ?? 4294967295;
    const progressCallback = options.progressCallback;
    if (typeof matchLimit !== "number") {
      throw new Error("Arguments must be numbers");
    }
    this.matchLimit = matchLimit;
    if (endIndex !== 0 && startIndex > endIndex) {
      throw new Error("`startIndex` cannot be greater than `endIndex`");
    }
    if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || startPosition.row === endPosition.row && startPosition.column > endPosition.column)) {
      throw new Error("`startPosition` cannot be greater than `endPosition`");
    }
    if (endContainingIndex !== 0 && startContainingIndex > endContainingIndex) {
      throw new Error("`startContainingIndex` cannot be greater than `endContainingIndex`");
    }
    if (endContainingPosition !== ZERO_POINT && (startContainingPosition.row > endContainingPosition.row || startContainingPosition.row === endContainingPosition.row && startContainingPosition.column > endContainingPosition.column)) {
      throw new Error("`startContainingPosition` cannot be greater than `endContainingPosition`");
    }
    if (progressCallback) {
      C.currentQueryProgressCallback = progressCallback;
    }
    marshalNode(node);
    C._ts_query_matches_wasm(
      this[0],
      node.tree[0],
      startPosition.row,
      startPosition.column,
      endPosition.row,
      endPosition.column,
      startIndex,
      endIndex,
      startContainingPosition.row,
      startContainingPosition.column,
      endContainingPosition.row,
      endContainingPosition.column,
      startContainingIndex,
      endContainingIndex,
      matchLimit,
      maxStartDepth
    );
    const rawCount = C.getValue(TRANSFER_BUFFER, "i32");
    const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
    const result = new Array(rawCount);
    this.exceededMatchLimit = Boolean(didExceedMatchLimit);
    let filteredCount = 0;
    let address = startAddress;
    for (let i2 = 0; i2 < rawCount; i2++) {
      const patternIndex = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const captureCount = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const captures = new Array(captureCount);
      address = unmarshalCaptures(this, node.tree, address, patternIndex, captures);
      if (this.textPredicates[patternIndex].every((p) => p(captures))) {
        result[filteredCount] = { patternIndex, captures };
        const setProperties = this.setProperties[patternIndex];
        result[filteredCount].setProperties = setProperties;
        const assertedProperties = this.assertedProperties[patternIndex];
        result[filteredCount].assertedProperties = assertedProperties;
        const refutedProperties = this.refutedProperties[patternIndex];
        result[filteredCount].refutedProperties = refutedProperties;
        filteredCount++;
      }
    }
    result.length = filteredCount;
    C._free(startAddress);
    C.currentQueryProgressCallback = null;
    return result;
  }
  /**
   * Iterate over all of the individual captures in the order that they
   * appear.
   *
   * This is useful if you don't care about which pattern matched, and just
   * want a single, ordered sequence of captures.
   *
   * @param {Node} node - The node to execute the query on.
   *
   * @param {QueryOptions} options - Options for query execution.
   */
  captures(node, options = {}) {
    const startPosition = options.startPosition ?? ZERO_POINT;
    const endPosition = options.endPosition ?? ZERO_POINT;
    const startIndex = options.startIndex ?? 0;
    const endIndex = options.endIndex ?? 0;
    const startContainingPosition = options.startContainingPosition ?? ZERO_POINT;
    const endContainingPosition = options.endContainingPosition ?? ZERO_POINT;
    const startContainingIndex = options.startContainingIndex ?? 0;
    const endContainingIndex = options.endContainingIndex ?? 0;
    const matchLimit = options.matchLimit ?? 4294967295;
    const maxStartDepth = options.maxStartDepth ?? 4294967295;
    const progressCallback = options.progressCallback;
    if (typeof matchLimit !== "number") {
      throw new Error("Arguments must be numbers");
    }
    this.matchLimit = matchLimit;
    if (endIndex !== 0 && startIndex > endIndex) {
      throw new Error("`startIndex` cannot be greater than `endIndex`");
    }
    if (endPosition !== ZERO_POINT && (startPosition.row > endPosition.row || startPosition.row === endPosition.row && startPosition.column > endPosition.column)) {
      throw new Error("`startPosition` cannot be greater than `endPosition`");
    }
    if (endContainingIndex !== 0 && startContainingIndex > endContainingIndex) {
      throw new Error("`startContainingIndex` cannot be greater than `endContainingIndex`");
    }
    if (endContainingPosition !== ZERO_POINT && (startContainingPosition.row > endContainingPosition.row || startContainingPosition.row === endContainingPosition.row && startContainingPosition.column > endContainingPosition.column)) {
      throw new Error("`startContainingPosition` cannot be greater than `endContainingPosition`");
    }
    if (progressCallback) {
      C.currentQueryProgressCallback = progressCallback;
    }
    marshalNode(node);
    C._ts_query_captures_wasm(
      this[0],
      node.tree[0],
      startPosition.row,
      startPosition.column,
      endPosition.row,
      endPosition.column,
      startIndex,
      endIndex,
      startContainingPosition.row,
      startContainingPosition.column,
      endContainingPosition.row,
      endContainingPosition.column,
      startContainingIndex,
      endContainingIndex,
      matchLimit,
      maxStartDepth
    );
    const count = C.getValue(TRANSFER_BUFFER, "i32");
    const startAddress = C.getValue(TRANSFER_BUFFER + SIZE_OF_INT, "i32");
    const didExceedMatchLimit = C.getValue(TRANSFER_BUFFER + 2 * SIZE_OF_INT, "i32");
    const result = new Array();
    this.exceededMatchLimit = Boolean(didExceedMatchLimit);
    const captures = new Array();
    let address = startAddress;
    for (let i2 = 0; i2 < count; i2++) {
      const patternIndex = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const captureCount = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      const captureIndex = C.getValue(address, "i32");
      address += SIZE_OF_INT;
      captures.length = captureCount;
      address = unmarshalCaptures(this, node.tree, address, patternIndex, captures);
      if (this.textPredicates[patternIndex].every((p) => p(captures))) {
        const capture = captures[captureIndex];
        const setProperties = this.setProperties[patternIndex];
        capture.setProperties = setProperties;
        const assertedProperties = this.assertedProperties[patternIndex];
        capture.assertedProperties = assertedProperties;
        const refutedProperties = this.refutedProperties[patternIndex];
        capture.refutedProperties = refutedProperties;
        result.push(capture);
      }
    }
    C._free(startAddress);
    C.currentQueryProgressCallback = null;
    return result;
  }
  /** Get the predicates for a given pattern. */
  predicatesForPattern(patternIndex) {
    return this.predicates[patternIndex];
  }
  /**
   * Disable a certain capture within a query.
   *
   * This prevents the capture from being returned in matches, and also
   * avoids any resource usage associated with recording the capture.
   */
  disableCapture(captureName) {
    const captureNameLength = C.lengthBytesUTF8(captureName);
    const captureNameAddress = C._malloc(captureNameLength + 1);
    C.stringToUTF8(captureName, captureNameAddress, captureNameLength + 1);
    C._ts_query_disable_capture(this[0], captureNameAddress, captureNameLength);
    C._free(captureNameAddress);
  }
  /**
   * Disable a certain pattern within a query.
   *
   * This prevents the pattern from matching, and also avoids any resource
   * usage associated with the pattern. This throws an error if the pattern
   * index is out of bounds.
   */
  disablePattern(patternIndex) {
    if (patternIndex >= this.predicates.length) {
      throw new Error(
        `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
      );
    }
    C._ts_query_disable_pattern(this[0], patternIndex);
  }
  /**
   * Check if, on its last execution, this cursor exceeded its maximum number
   * of in-progress matches.
   */
  didExceedMatchLimit() {
    return this.exceededMatchLimit;
  }
  /** Get the byte offset where the given pattern starts in the query's source. */
  startIndexForPattern(patternIndex) {
    if (patternIndex >= this.predicates.length) {
      throw new Error(
        `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
      );
    }
    return C._ts_query_start_byte_for_pattern(this[0], patternIndex);
  }
  /** Get the byte offset where the given pattern ends in the query's source. */
  endIndexForPattern(patternIndex) {
    if (patternIndex >= this.predicates.length) {
      throw new Error(
        `Pattern index is ${patternIndex} but the pattern count is ${this.predicates.length}`
      );
    }
    return C._ts_query_end_byte_for_pattern(this[0], patternIndex);
  }
  /** Get the number of patterns in the query. */
  patternCount() {
    return C._ts_query_pattern_count(this[0]);
  }
  /** Get the index for a given capture name. */
  captureIndexForName(captureName) {
    return this.captureNames.indexOf(captureName);
  }
  /** Check if a given pattern within a query has a single root node. */
  isPatternRooted(patternIndex) {
    return C._ts_query_is_pattern_rooted(this[0], patternIndex) === 1;
  }
  /** Check if a given pattern within a query has a single root node. */
  isPatternNonLocal(patternIndex) {
    return C._ts_query_is_pattern_non_local(this[0], patternIndex) === 1;
  }
  /**
   * Check if a given step in a query is 'definite'.
   *
   * A query step is 'definite' if its parent pattern will be guaranteed to
   * match successfully once it reaches the step.
   */
  isPatternGuaranteedAtStep(byteIndex) {
    return C._ts_query_is_pattern_guaranteed_at_step(this[0], byteIndex) === 1;
  }
};

// src/wasm.ts
import { existsSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
function wasmFile(name2, packagePath) {
  const here = dirname(fileURLToPath(import.meta.url));
  const local = join(here, name2);
  if (existsSync(local)) return local;
  const require2 = createRequire(import.meta.url);
  return require2.resolve(packagePath);
}

// src/detector/treesitter.ts
var initialized;
var languages = /* @__PURE__ */ new Map();
var GRAMMARS = {
  ruby: ["tree-sitter-ruby.wasm", "tree-sitter-ruby/tree-sitter-ruby.wasm"],
  python: ["tree-sitter-python.wasm", "tree-sitter-python/tree-sitter-python.wasm"]
};
async function hostParser(lang) {
  if (!initialized) {
    initialized = Parser.init({
      locateFile: () => wasmFile("web-tree-sitter.wasm", "web-tree-sitter/web-tree-sitter.wasm")
    });
  }
  await initialized;
  let language = languages.get(lang);
  if (!language) {
    const [name2, pkg] = GRAMMARS[lang];
    language = Language.load(wasmFile(name2, pkg));
    languages.set(lang, language);
  }
  const parser = new Parser();
  parser.setLanguage(await language);
  return parser;
}

// src/detector/python.ts
function stringLiteral(n) {
  if (n.type === "string") {
    const start2 = n.namedChildren.find((c) => c?.type === "string_start");
    if (start2 && /[fF]/.test(start2.text)) return void 0;
    if (n.namedChildren.some((c) => c && c.type === "interpolation")) return void 0;
    const content = n.namedChildren.filter((c) => c !== null && c.type === "string_content");
    const text = content.map((c) => c.text).join("");
    const line = (content[0] ?? n).startPosition.row + 1;
    return { text, line };
  }
  if (n.type === "concatenated_string") {
    const parts2 = n.namedChildren.filter((c) => c !== null && c.type === "string");
    const lits = parts2.map(stringLiteral);
    if (lits.some((l) => l === void 0) || lits.length === 0) return void 0;
    return { text: lits.map((l) => l.text).join(""), line: lits[0].line };
  }
  if (n.type === "parenthesized_expression") {
    const inner = n.namedChildren.filter((c) => c !== null);
    return inner.length === 1 ? stringLiteral(inner[0]) : void 0;
  }
  if (n.type === "call") {
    const fn = n.childForFieldName("function");
    const fnName = fn?.type === "attribute" ? fn.childForFieldName("attribute")?.text : fn?.text;
    if (fnName !== "text") return void 0;
    const args2 = n.childForFieldName("arguments")?.namedChildren.filter((c) => c !== null) ?? [];
    return args2.length >= 1 ? stringLiteral(args2[0]) : void 0;
  }
  return void 0;
}
function functionName(call) {
  const fn = call.childForFieldName("function");
  if (!fn) return void 0;
  if (fn.type === "identifier") return { full: fn.text, last: fn.text };
  if (fn.type === "attribute") {
    const attr = fn.childForFieldName("attribute")?.text;
    return attr ? { full: fn.text, last: attr } : void 0;
  }
  return void 0;
}
function sqlArgument(call, keyword) {
  const args2 = call.childForFieldName("arguments");
  if (!args2) return void 0;
  let positional;
  for (const c of args2.namedChildren) {
    if (!c) continue;
    if (c.type === "keyword_argument") {
      if (c.childForFieldName("name")?.text === keyword) return c.childForFieldName("value") ?? void 0;
      continue;
    }
    if (c.type === "comment") continue;
    if (!positional) positional = c;
  }
  return positional;
}
async function extractPython(content, framework, analyzeDown = true) {
  const parser = await hostParser("python");
  const tree = parser.parse(content);
  const out2 = { segments: [], notAnalyzed: [], comments: [], transactionOptOut: false };
  if (!tree) return out2;
  let committed = false;
  const pushSql = (valueNode, line, label, optOut) => {
    const nodes = valueNode.type === "list" || valueNode.type === "tuple" ? valueNode.namedChildren.filter((c) => c !== null && c.type !== "comment") : [valueNode];
    if (nodes.length === 0) {
      out2.notAnalyzed.push({ line, reason: `\`${label}\`: empty statement list` });
      return;
    }
    for (const n of nodes) {
      const lit = stringLiteral(n);
      if (!lit) {
        out2.notAnalyzed.push({ line: n.startPosition.row + 1, reason: `\`${label}\`: argument is not a plain string literal` });
        continue;
      }
      out2.segments.push({ sql: lit.text, line: lit.line, transactionOptOut: optOut || void 0 });
    }
  };
  const visit = (n, inAutocommit) => {
    if (n.type === "comment") {
      out2.comments.push({ line: n.startPosition.row + 1, text: n.text.replace(/^#/, "") });
      return;
    }
    if (n.type === "function_definition" && framework === "alembic" && !analyzeDown && n.childForFieldName("name")?.text === "downgrade") return;
    if (n.type === "assignment" && framework === "django") {
      const left = n.childForFieldName("left");
      const right = n.childForFieldName("right");
      if (left?.text === "atomic" && right?.type === "false") out2.transactionOptOut = true;
    }
    if (n.type === "with_statement" && framework === "alembic" && /autocommit_block\s*\(/.test(n.text.split("\n")[0] ?? "")) {
      const body2 = n.childForFieldName("body");
      if (body2) visit(body2, true);
      return;
    }
    if (n.type === "call") {
      const fn = functionName(n);
      const line = n.startPosition.row + 1;
      if (fn) {
        if (framework === "django" && (fn.full === "migrations.RunSQL" || fn.full === "RunSQL")) {
          const value = sqlArgument(n, "sql");
          if (value) pushSql(value, line, "RunSQL", false);
          else out2.notAnalyzed.push({ line, reason: "`RunSQL`: no sql argument" });
          return;
        }
        if (framework === "django" && fn.full.startsWith("migrations.") && fn.last !== "RunPython") {
          out2.notAnalyzed.push({ line, reason: `\`${fn.full}\` is not mapped in this release (ADR 0008)` });
          return;
        }
        if (framework === "alembic" && fn.full === "op.execute") {
          const value = sqlArgument(n, "sqltext");
          if (value) {
            const lit = stringLiteral(value);
            if (lit && /^\s*commit\s*;?\s*$/i.test(lit.text)) {
              committed = true;
              return;
            }
            pushSql(value, line, "op.execute", inAutocommit || committed);
          } else out2.notAnalyzed.push({ line, reason: "`op.execute`: no argument" });
          return;
        }
        if (framework === "alembic" && /\.execute$/.test(fn.full) && fn.full.includes("get_bind")) {
          const value = sqlArgument(n, "statement");
          const lit = value ? stringLiteral(value) : void 0;
          if (lit && /^\s*commit\s*;?\s*$/i.test(lit.text)) committed = true;
          return;
        }
        if (framework === "alembic" && fn.full.startsWith("op.") && fn.full !== "op.get_bind" && fn.full !== "op.get_context") {
          out2.notAnalyzed.push({ line, reason: `\`${fn.full}\` is not mapped in this release (ADR 0008)` });
          return;
        }
      }
    }
    for (const c of n.namedChildren) if (c) visit(c, inAutocommit);
  };
  visit(tree.rootNode, false);
  out2.segments.sort((a, b) => a.line - b.line);
  return out2;
}

// src/detector/ruby.ts
var DSL = /* @__PURE__ */ new Set([
  "execute",
  "add_index",
  "add_column",
  "add_foreign_key",
  "change_column_null",
  "change_column",
  "create_table",
  "drop_table",
  "remove_column",
  "rename_column",
  "rename_table",
  "disable_ddl_transaction!"
]);
var KNOWN_OTHER = /* @__PURE__ */ new Set([
  "remove_index",
  "add_reference",
  "add_belongs_to",
  "remove_reference",
  "remove_belongs_to",
  "add_timestamps",
  "remove_timestamps",
  "change_column_default",
  "change_column_comment",
  "change_table",
  "create_join_table",
  "drop_join_table",
  "add_check_constraint",
  "remove_check_constraint",
  "remove_foreign_key",
  "validate_constraint",
  "validate_foreign_key",
  "validate_check_constraint",
  "add_exclusion_constraint",
  "add_unique_constraint",
  "create_enum",
  "enable_extension",
  "disable_extension",
  "reversible",
  "safety_assured"
]);
var RAILS_TYPES = {
  string: "varchar",
  text: "text",
  integer: "integer",
  bigint: "bigint",
  float: "float",
  decimal: "numeric",
  numeric: "numeric",
  datetime: "timestamp",
  timestamp: "timestamp",
  timestamptz: "timestamptz",
  time: "time",
  date: "date",
  binary: "bytea",
  boolean: "boolean",
  uuid: "uuid",
  json: "json",
  jsonb: "jsonb",
  inet: "inet",
  cidr: "cidr",
  macaddr: "macaddr",
  hstore: "hstore",
  citext: "citext",
  interval: "interval",
  money: "money",
  xml: "xml",
  tsvector: "tsvector",
  ltree: "ltree",
  point: "point",
  bit: "bit",
  bit_varying: "bit varying",
  oid: "oid",
  daterange: "daterange",
  tsrange: "tsrange",
  tstzrange: "tstzrange",
  int4range: "int4range",
  int8range: "int8range",
  numrange: "numrange"
};
function ident(name2) {
  return /^[a-z_][a-z0-9_]*$/.test(name2) ? name2 : `"${name2.replace(/"/g, '""')}"`;
}
function literal(v) {
  switch (v.t) {
    case "string":
      return `'${v.v.replace(/'/g, "''")}'`;
    case "int":
    case "float":
      return String(v.v);
    case "bool":
      return v.v ? "true" : "false";
    case "lambda":
      return v.v;
    case "nil":
      return "NULL";
    default:
      return void 0;
  }
}
function singularize(table) {
  if (/ies$/.test(table)) return table.replace(/ies$/, "y");
  if (/(ses|xes|zes|ches|shes)$/.test(table)) return table.replace(/es$/, "");
  if (/s$/.test(table) && !/ss$/.test(table)) return table.replace(/s$/, "");
  return table;
}
function parseValue(n) {
  switch (n.type) {
    case "simple_symbol":
      return { t: "symbol", v: n.text.replace(/^:/, "").replace(/^"(.*)"$/, "$1") };
    case "string": {
      const parts2 = n.namedChildren;
      if (parts2.some((c) => c && c.type !== "string_content")) return { t: "unknown", text: n.text };
      return { t: "string", v: parts2.map((c) => c?.text ?? "").join("") };
    }
    case "integer":
      return { t: "int", v: Number(n.text.replace(/_/g, "")) };
    case "float":
      return { t: "float", v: Number(n.text.replace(/_/g, "")) };
    case "true":
      return { t: "bool", v: true };
    case "false":
      return { t: "bool", v: false };
    case "nil":
      return { t: "nil" };
    case "array":
      return { t: "array", v: n.namedChildren.filter((c) => c !== null).map(parseValue) };
    case "hash": {
      const m = /* @__PURE__ */ new Map();
      for (const c of n.namedChildren) {
        if (!c || c.type !== "pair") return { t: "unknown", text: n.text };
        const kv = parsePair(c);
        if (!kv) return { t: "unknown", text: n.text };
        m.set(kv[0], kv[1]);
      }
      return { t: "hash", v: m };
    }
    case "lambda": {
      let body2 = n.childForFieldName("body");
      while (body2 && body2.type !== "string") {
        const inner = body2.namedChildren.filter((c) => c !== null);
        body2 = inner.length === 1 ? inner[0] : null;
      }
      if (body2) {
        const s = parseValue(body2);
        if (s.t === "string") return { t: "lambda", v: s.v };
      }
      return { t: "unknown", text: n.text };
    }
    case "parenthesized_statements": {
      const inner = n.namedChildren.filter((c) => c !== null);
      return inner.length === 1 ? parseValue(inner[0]) : { t: "unknown", text: n.text };
    }
    default:
      return { t: "unknown", text: n.text };
  }
}
function parsePair(pair) {
  const key = pair.childForFieldName("key");
  const value = pair.childForFieldName("value");
  if (!key || !value) return void 0;
  if (key.type !== "hash_key_symbol" && key.type !== "simple_symbol") return void 0;
  return [key.text.replace(/^:/, "").replace(/:$/, ""), parseValue(value)];
}
function parseArgs(list, call) {
  const args2 = { positional: [], options: /* @__PURE__ */ new Map() };
  if (!list) return args2;
  for (const c of list.namedChildren) {
    if (!c) continue;
    if (c.type === "pair") {
      const kv = parsePair(c);
      if (!kv) return void 0;
      args2.options.set(kv[0], kv[1]);
    } else if (c.type === "hash" && c === list.namedChildren[list.namedChildren.length - 1]) {
      const h = parseValue(c);
      if (h.t !== "hash") return void 0;
      for (const [k, v] of h.v) args2.options.set(k, v);
    } else if (c.type === "heredoc_beginning") {
      let sib = call.nextNamedSibling;
      while (sib && sib.type !== "heredoc_body") sib = sib.nextNamedSibling;
      if (!sib) return void 0;
      args2.heredoc = sib;
    } else {
      args2.positional.push(parseValue(c));
    }
  }
  return args2;
}
function sym(v) {
  if (!v) return void 0;
  if (v.t === "symbol" || v.t === "string") return v.v;
  return void 0;
}
function columnList(v) {
  if (!v) return void 0;
  if (v.t === "symbol" || v.t === "string") return [v.v];
  if (v.t === "array") {
    const out2 = [];
    for (const e of v.v) {
      const s = sym(e);
      if (s === void 0) return void 0;
      out2.push(s);
    }
    return out2;
  }
  return void 0;
}
function railsType(type, options) {
  const base = RAILS_TYPES[type];
  if (!base) return void 0;
  const limit = options.get("limit");
  const precision = options.get("precision");
  const scale = options.get("scale");
  let sql;
  switch (type) {
    case "string":
      sql = limit?.t === "int" ? `varchar(${limit.v})` : "varchar";
      break;
    case "integer":
      if (limit?.t === "int") sql = limit.v <= 2 ? "smallint" : limit.v <= 4 ? "integer" : "bigint";
      else sql = "integer";
      break;
    case "datetime":
      sql = precision?.t === "int" ? `timestamp(${precision.v})` : precision?.t === "nil" ? "timestamp" : "timestamp(6)";
      break;
    case "timestamp":
    case "timestamptz":
    case "time":
      sql = precision?.t === "int" ? `${base}(${precision.v})` : base;
      break;
    case "decimal":
    case "numeric":
      if (precision?.t === "int") sql = scale?.t === "int" ? `numeric(${precision.v}, ${scale.v})` : `numeric(${precision.v})`;
      else sql = "numeric";
      break;
    default:
      sql = base;
  }
  const array = options.get("array");
  if (array?.t === "bool" && array.v) sql += "[]";
  return sql;
}
var COLUMN_OPTIONS = /* @__PURE__ */ new Set(["null", "default", "limit", "precision", "scale", "array", "comment", "if_not_exists", "collation"]);
var INDEX_OPTIONS = /* @__PURE__ */ new Set(["unique", "algorithm", "name", "if_not_exists", "using", "where", "include", "comment", "order", "opclass", "nulls_not_distinct"]);
var FK_OPTIONS = /* @__PURE__ */ new Set(["column", "primary_key", "name", "validate", "on_delete", "on_update", "deferrable", "if_not_exists", "to_table"]);
function mapCall(method, args2) {
  const p = args2.positional;
  const o = args2.options;
  const unknownOption = (allowed) => {
    for (const k of o.keys()) if (!allowed.has(k)) return `option \`${k}:\` is not mapped`;
    return void 0;
  };
  switch (method) {
    case "add_index": {
      const table = sym(p[0]);
      const cols = columnList(p[1]);
      if (!table || !cols) return { reason: "table or columns are not literals" };
      const bad = unknownOption(INDEX_OPTIONS);
      if (bad) return { reason: bad };
      const unique = o.get("unique");
      const algorithm = o.get("algorithm");
      const name2 = o.get("name");
      const ine = o.get("if_not_exists");
      const using = o.get("using");
      const where = o.get("where");
      const include = columnList(o.get("include"));
      if (algorithm && !(algorithm.t === "symbol" && algorithm.v === "concurrently") && !(algorithm.t === "symbol" && algorithm.v === "default"))
        return { reason: `algorithm: ${literalText(algorithm)} is not mapped` };
      if (where && where.t !== "string") return { reason: "where: is not a string" };
      const indexName = name2 && (name2.t === "string" || name2.t === "symbol") ? name2.v : `index_${table}_on_${cols.join("_and_")}`;
      return {
        sql: `CREATE ${unique?.t === "bool" && unique.v ? "UNIQUE " : ""}INDEX ${algorithm?.t === "symbol" && algorithm.v === "concurrently" ? "CONCURRENTLY " : ""}${ine?.t === "bool" && ine.v ? "IF NOT EXISTS " : ""}${ident(indexName)} ON ${ident(table)}${using && sym(using) ? ` USING ${sym(using)}` : ""} (${cols.map(ident).join(", ")})${include ? ` INCLUDE (${include.map(ident).join(", ")})` : ""}${where && where.t === "string" ? ` WHERE ${where.v}` : ""}`
      };
    }
    case "add_column": {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const type = sym(p[2]);
      if (!table || !col || !type) return { reason: "table, column or type are not literals" };
      const bad = unknownOption(COLUMN_OPTIONS);
      if (bad) return { reason: bad };
      const sqlType = railsType(type, o);
      if (!sqlType) return { reason: `type :${type} is not mapped` };
      const nul = o.get("null");
      const def = o.get("default");
      const ine = o.get("if_not_exists");
      let sql = `ALTER TABLE ${ident(table)} ADD COLUMN ${ine?.t === "bool" && ine.v ? "IF NOT EXISTS " : ""}${ident(col)} ${sqlType}`;
      if (def !== void 0 && def.t !== "nil") {
        const lit = literal(def);
        if (lit === void 0) return { reason: "default: is not a literal or a lambda with an SQL string" };
        sql += ` DEFAULT ${lit}`;
      }
      if (nul?.t === "bool" && !nul.v) sql += " NOT NULL";
      return { sql };
    }
    case "add_foreign_key": {
      const from = sym(p[0]);
      const to = sym(p[1]);
      if (!from || !to) return { reason: "tables are not literals" };
      const bad = unknownOption(FK_OPTIONS);
      if (bad) return { reason: bad };
      const column = sym(o.get("column")) ?? `${singularize(to)}_id`;
      const pk = sym(o.get("primary_key")) ?? "id";
      const name2 = sym(o.get("name")) ?? `fk_rails_${from}_${column}`;
      const validate = o.get("validate");
      const onDelete = sym(o.get("on_delete"));
      const onUpdate = sym(o.get("on_update"));
      const actions = { cascade: "CASCADE", nullify: "SET NULL", restrict: "RESTRICT" };
      let sql = `ALTER TABLE ${ident(from)} ADD CONSTRAINT ${ident(name2)} FOREIGN KEY (${ident(column)}) REFERENCES ${ident(to)} (${ident(pk)})`;
      if (onDelete) {
        if (!actions[onDelete]) return { reason: `on_delete: :${onDelete} is not mapped` };
        sql += ` ON DELETE ${actions[onDelete]}`;
      }
      if (onUpdate) {
        if (!actions[onUpdate]) return { reason: `on_update: :${onUpdate} is not mapped` };
        sql += ` ON UPDATE ${actions[onUpdate]}`;
      }
      const deferrable = o.get("deferrable");
      if (deferrable?.t === "bool" && deferrable.v) sql += " DEFERRABLE";
      else if (deferrable?.t === "symbol") sql += ` DEFERRABLE INITIALLY ${deferrable.v.toUpperCase()}`;
      if (validate?.t === "bool" && !validate.v) sql += " NOT VALID";
      return { sql };
    }
    case "change_column_null": {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const nul = p[2];
      if (!table || !col || !nul || nul.t !== "bool") return { reason: "arguments are not literals" };
      return { sql: `ALTER TABLE ${ident(table)} ALTER COLUMN ${ident(col)} ${nul.v ? "DROP NOT NULL" : "SET NOT NULL"}` };
    }
    case "change_column": {
      const table = sym(p[0]);
      const col = sym(p[1]);
      const type = sym(p[2]);
      if (!table || !col || !type) return { reason: "table, column or type are not literals" };
      const bad = unknownOption(COLUMN_OPTIONS);
      if (bad) return { reason: bad };
      const sqlType = railsType(type, o);
      if (!sqlType) return { reason: `type :${type} is not mapped` };
      const cmds = [`ALTER COLUMN ${ident(col)} TYPE ${sqlType}`];
      const def = o.get("default");
      if (def !== void 0) {
        const lit = def.t === "nil" ? void 0 : literal(def);
        cmds.push(lit === void 0 ? `ALTER COLUMN ${ident(col)} DROP DEFAULT` : `ALTER COLUMN ${ident(col)} SET DEFAULT ${lit}`);
      }
      const nul = o.get("null");
      if (nul?.t === "bool") cmds.push(`ALTER COLUMN ${ident(col)} ${nul.v ? "DROP NOT NULL" : "SET NOT NULL"}`);
      return { sql: `ALTER TABLE ${ident(table)} ${cmds.join(", ")}` };
    }
    case "create_table": {
      const table = sym(p[0]);
      if (!table) return { reason: "table is not a literal" };
      return { sql: `CREATE TABLE ${ident(table)} ()` };
    }
    case "drop_table": {
      const table = sym(p[0]);
      if (!table) return { reason: "table is not a literal" };
      return { sql: `DROP TABLE ${ident(table)}` };
    }
    case "remove_column": {
      const table = sym(p[0]);
      const col = sym(p[1]);
      if (!table || !col) return { reason: "table or column are not literals" };
      return { sql: `ALTER TABLE ${ident(table)} DROP COLUMN ${ident(col)}` };
    }
    case "rename_column": {
      const table = sym(p[0]);
      const from = sym(p[1]);
      const to = sym(p[2]);
      if (!table || !from || !to) return { reason: "arguments are not literals" };
      return { sql: `ALTER TABLE ${ident(table)} RENAME COLUMN ${ident(from)} TO ${ident(to)}` };
    }
    case "rename_table": {
      const from = sym(p[0]);
      const to = sym(p[1]);
      if (!from || !to) return { reason: "arguments are not literals" };
      return { sql: `ALTER TABLE ${ident(from)} RENAME TO ${ident(to)}` };
    }
    default:
      return { reason: "not mapped" };
  }
}
function literalText(v) {
  return v.t === "unknown" ? v.text : v.t === "symbol" ? `:${v.v}` : v.t === "string" ? `"${v.v}"` : JSON.stringify("v" in v ? v.v : null);
}
async function extractRuby(content, analyzeDown = true) {
  const parser = await hostParser("ruby");
  const tree = parser.parse(content);
  const out2 = { segments: [], notAnalyzed: [], comments: [], transactionOptOut: false };
  if (!tree) return out2;
  const visit = (n) => {
    if (n.type === "comment") {
      out2.comments.push({ line: n.startPosition.row + 1, text: n.text.replace(/^#/, "") });
      return;
    }
    if (n.type === "method" && !analyzeDown && n.childForFieldName("name")?.text === "down") return;
    if (n.type === "call" || n.type === "identifier") {
      const method = n.type === "call" ? n.childForFieldName("method") : n;
      const receiver = n.type === "call" ? n.childForFieldName("receiver") : null;
      const name2 = method?.type === "identifier" ? method.text : void 0;
      if (name2 && !receiver) {
        if (name2 === "disable_ddl_transaction!") {
          out2.transactionOptOut = true;
          return;
        }
        if (DSL.has(name2)) {
          handleCall(n, name2, out2);
          const block = n.type === "call" ? n.childForFieldName("block") : null;
          if (name2 === "create_table" && block) visit(block);
          return;
        } else if (KNOWN_OTHER.has(name2) && n.type === "call") {
          out2.notAnalyzed.push({ line: n.startPosition.row + 1, reason: `\`${name2}\` is not mapped in this release (ADR 0008)` });
          return;
        }
      }
    }
    for (const c of n.namedChildren) if (c) visit(c);
  };
  visit(tree.rootNode);
  out2.segments.sort((a, b) => a.line - b.line);
  return out2;
}
function handleCall(n, name2, out2) {
  const line = n.startPosition.row + 1;
  const argList = n.type === "call" ? n.childForFieldName("arguments") : null;
  const args2 = parseArgs(argList, n);
  if (!args2) {
    out2.notAnalyzed.push({ line, reason: `\`${name2}\`: arguments are not literals` });
    return;
  }
  if (name2 === "execute") {
    if (args2.heredoc) {
      const body2 = args2.heredoc.namedChildren.find((c) => c?.type === "heredoc_content");
      if (!body2) {
        out2.notAnalyzed.push({ line, reason: "`execute`: heredoc with interpolation" });
        return;
      }
      if (args2.heredoc.namedChildren.some((c) => c && c.type === "interpolation")) {
        out2.notAnalyzed.push({ line, reason: "`execute`: heredoc with interpolation" });
        return;
      }
      const leadingNewline = body2.text.startsWith("\n") ? 1 : 0;
      out2.segments.push({ sql: body2.text.slice(leadingNewline), line: body2.startPosition.row + 1 + leadingNewline });
      return;
    }
    const first = args2.positional[0];
    if (first?.t === "string") {
      const strNode = argList?.namedChildren.find((c) => c?.type === "string");
      const contentNode = strNode?.namedChildren.find((c) => c?.type === "string_content");
      out2.segments.push({ sql: first.v, line: (contentNode ?? strNode ?? n).startPosition.row + 1 });
      return;
    }
    out2.notAnalyzed.push({ line, reason: "`execute`: argument is not a plain string or heredoc" });
    return;
  }
  const mapped = mapCall(name2, args2);
  if (mapped.sql) out2.segments.push({ sql: mapped.sql, line, synthesized: { call: name2 } });
  else out2.notAnalyzed.push({ line, reason: `\`${name2}\`: ${mapped.reason}` });
}

// src/detector/index.ts
var CHANGESET = /^\s*--\s*changeset\b(.*)$/i;
var DBMATE_SECTION = /^\s*--\s*migrate:(up|down)\b(.*)$/i;
function liquibaseSegments(content) {
  const lines = content.split("\n");
  const segments = [];
  let current = [];
  let currentLine = 1;
  let optOut = false;
  const flush = () => {
    if (current.length) segments.push({ sql: current.join("\n"), line: currentLine, transactionOptOut: optOut || void 0 });
  };
  lines.forEach((text, i2) => {
    const m = CHANGESET.exec(text);
    if (m) {
      flush();
      current = [];
      currentLine = i2 + 1;
      optOut = /runInTransaction\s*:\s*false/i.test(m[1]);
    }
    current.push(text);
  });
  flush();
  return segments;
}
function dbmateSegments(content, analyzeDown) {
  const lines = content.split("\n");
  const segments = [];
  let current = [];
  let currentLine = 1;
  let optOut = false;
  let anyOptOut = false;
  let down = false;
  const flush = () => {
    if (current.length && (analyzeDown || !down)) segments.push({ sql: current.join("\n"), line: currentLine, transactionOptOut: optOut || void 0 });
  };
  lines.forEach((text, i2) => {
    const m = DBMATE_SECTION.exec(text);
    if (m) {
      flush();
      current = [];
      currentLine = i2 + 1;
      down = m[1].toLowerCase() === "down";
      optOut = /transaction\s*:\s*false/i.test(m[2]);
      if (optOut) anyOptOut = true;
    }
    current.push(text);
  });
  flush();
  return { segments, anyOptOut };
}
function gooseSegments(content, analyzeDown) {
  const lines = content.split("\n");
  const segments = [];
  const downAt = lines.findIndex((l) => GOOSE_DOWN.test(l));
  const upLines = downAt >= 0 ? lines.slice(0, downAt) : lines;
  segments.push({ sql: upLines.join("\n"), line: 1 });
  if (analyzeDown && downAt >= 0) segments.push({ sql: lines.slice(downAt).join("\n"), line: downAt + 1 });
  return { segments, optOut: GOOSE_NO_TRANSACTION.test(content) };
}
async function detectMigrations(files, opts) {
  const out2 = [];
  for (const f of files) {
    const def = classify(f.path, f.content, opts.config);
    if (!def) continue;
    const m = await toMigration(f, def, opts);
    if (m) out2.push(m);
  }
  return out2;
}
async function toMigration(f, def, opts) {
  const { config } = opts;
  const base = {
    path: f.path,
    status: f.status,
    content: f.content,
    framework: def.name,
    wrapped: def.wrapped,
    wrapReason: def.wrapReason,
    segments: [],
    notAnalyzed: []
  };
  switch (def.name) {
    case "goose": {
      const g = gooseSegments(f.content, config.analyzeDown);
      base.segments = g.segments;
      if (g.optOut) {
        base.wrapped = false;
        base.wrapReason = "-- +goose NO TRANSACTION is set";
      }
      break;
    }
    case "rails": {
      const x = await extractRuby(f.content, config.analyzeDown);
      base.segments = x.segments;
      base.notAnalyzed = x.notAnalyzed;
      base.comments = x.comments;
      if (x.transactionOptOut) {
        base.wrapped = false;
        base.wrapReason = "disable_ddl_transaction! is set";
      }
      break;
    }
    case "django":
    case "alembic": {
      const x = await extractPython(f.content, def.name, config.analyzeDown);
      base.segments = x.segments;
      base.notAnalyzed = x.notAnalyzed;
      base.comments = x.comments;
      if (x.transactionOptOut) {
        base.wrapped = false;
        base.wrapReason = "atomic = False is set";
      }
      break;
    }
    case "liquibase":
      base.segments = liquibaseSegments(f.content);
      break;
    case "dbmate": {
      const d = dbmateSegments(f.content, config.analyzeDown);
      base.segments = d.segments;
      if (d.anyOptOut && d.segments.every((s) => s.transactionOptOut)) {
        base.wrapped = false;
        base.wrapReason = "transaction:false is set on every section";
      }
      break;
    }
    case "flyway": {
      base.segments = [{ sql: f.content, line: 1 }];
      const conf = opts.readSibling?.(`${f.path}.conf`);
      if (conf && /^\s*executeInTransaction\s*=\s*false\s*$/im.test(conf)) {
        base.wrapped = false;
        base.wrapReason = `${f.path}.conf sets executeInTransaction=false`;
      }
      break;
    }
    default:
      base.segments = [{ sql: f.content, line: 1 }];
      if (def.name === "sql" && DBMATE_UP.test(f.content)) base.framework = "dbmate";
  }
  if (config.transaction === "always") {
    base.wrapped = true;
    base.wrapReason = "config: transaction: always";
    for (const s of base.segments) delete s.transactionOptOut;
  } else if (config.transaction === "never") {
    base.wrapped = false;
    base.wrapReason = "config: transaction: never";
  }
  return base;
}

// src/engine/builtin.ts
var BUILTIN_RULES = [
  {
    id: "PGS01",
    name: "suppression-without-reason",
    severity: "warning",
    title: "Suppression without a reason",
    help: 'A `lurie-guard: ignore` comment needs `reason="..."`. Without it the suppression is reported and does not suppress anything, so a reviewer always sees why a finding was accepted.'
  },
  {
    id: "PGS02",
    name: "unused-suppression",
    severity: "info",
    title: "Suppression that matches no finding",
    help: "A `lurie-guard: ignore` comment that matches no finding on its line or the line below. Remove it, so stale suppressions do not hide a future finding."
  },
  {
    id: "PGS03",
    name: "ignore-all",
    severity: "warning",
    title: "Suppression of every rule on a statement",
    help: "`lurie-guard: ignore all` suppresses every finding on the statement. It is accepted and reported so it stays visible in review; prefer naming the rule ids."
  },
  {
    id: "PGS04",
    name: "could-not-parse",
    severity: "info",
    title: "File could not be parsed",
    help: "PostgreSQL's parser rejected the file at the given position, so no rule ran on it. The run continues and the exit code is not affected. Check the statement at that position; a file the parser rejects would also fail in production."
  }
];
function builtinCatalog() {
  return BUILTIN_RULES.map((b) => ({
    id: b.id,
    name: b.name,
    severity: b.severity,
    pack: "pg",
    folder: "",
    since: "0.1.0",
    status: "active",
    skill: "",
    evidence: [],
    verified: "",
    title: b.title,
    help: b.help,
    messageTemplate: ""
  }));
}

// src/engine/index.ts
var import_picomatch2 = __toESM(require_picomatch2(), 1);

// src/evidence.ts
var DB_SKILLS_REF = "c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57";
var DB_SKILLS_REPO = "https://github.com/rafapeixer/db-skills";
function evidenceUrl(entry) {
  if (/^https?:\/\//.test(entry)) return entry;
  const m = /^db-skills\/(.+?)(#L\d+(?:-L\d+)?)?$/.exec(entry);
  if (!m) return entry;
  return `${DB_SKILLS_REPO}/blob/${DB_SKILLS_REF}/${m[1]}${m[2] ?? ""}`;
}

// src/parser/ast.ts
function relName(rangeVar) {
  if (!rangeVar || typeof rangeVar.relname !== "string") return void 0;
  const name2 = rangeVar.relname;
  const schema = rangeVar.schemaname;
  return {
    name: name2,
    schema,
    key: (schema ? `${schema}.${name2}` : name2).toLowerCase(),
    display: schema ? `${schema}.${name2}` : name2
  };
}
function qualifiedName(items) {
  const parts2 = (items ?? []).map(strVal).filter((s) => typeof s === "string");
  if (parts2.length === 0) return void 0;
  const name2 = parts2[parts2.length - 1];
  const schema = parts2.length > 1 ? parts2[parts2.length - 2] : void 0;
  return {
    name: name2,
    schema,
    key: (schema ? `${schema}.${name2}` : name2).toLowerCase(),
    display: schema ? `${schema}.${name2}` : name2
  };
}
function strVal(node) {
  if (!node) return void 0;
  if (node.String && typeof node.String.sval === "string") return node.String.sval;
  if (typeof node.sval === "string") return node.sval;
  return void 0;
}
function typeInfo(typeName) {
  if (!typeName || !Array.isArray(typeName.names)) return void 0;
  const names = typeName.names.map(strVal).filter((s) => typeof s === "string");
  if (names.length === 0) return void 0;
  const name2 = names[names.length - 1].toLowerCase();
  const builtin = names.length > 1 && names[0] === "pg_catalog";
  const typmods = [];
  for (const m of typeName.typmods ?? []) {
    const v = m?.A_Const?.ival?.ival;
    if (typeof v === "number") typmods.push(v);
    else if (m?.A_Const?.ival && Object.keys(m.A_Const.ival).length === 0) typmods.push(0);
  }
  const isArray = Array.isArray(typeName.arrayBounds) && typeName.arrayBounds.length > 0;
  const display = `${names.filter((n) => n !== "pg_catalog").join(".")}${typmods.length ? `(${typmods.join(", ")})` : ""}${isArray ? "[]" : ""}`;
  return { name: name2, builtin, typmods, isArray, display };
}
function funcName(funcCall) {
  const names = (funcCall?.funcname ?? []).map(strVal).filter((s) => typeof s === "string");
  return names.length ? names[names.length - 1].toLowerCase() : void 0;
}
function columnDefs(createStmt) {
  return (createStmt?.tableElts ?? []).map((e) => e?.ColumnDef).filter(Boolean);
}
function tableConstraints(createStmt) {
  return (createStmt?.tableElts ?? []).map((e) => e?.Constraint).filter(Boolean);
}
function columnConstraints(columnDef) {
  return (columnDef?.constraints ?? []).map((c) => c?.Constraint).filter(Boolean);
}
function constraintKeys(constraint) {
  return (constraint?.keys ?? []).map(strVal).filter((s) => typeof s === "string");
}
function alterCmds(alterTableStmt) {
  return (alterTableStmt?.cmds ?? []).map((c) => c?.AlterTableCmd).filter(Boolean);
}
function notNullCheckColumn(expr) {
  const nt = expr?.NullTest;
  if (!nt || nt.nulltesttype !== "IS_NOT_NULL") return void 0;
  const fields = nt.arg?.ColumnRef?.fields;
  if (!Array.isArray(fields) || fields.length === 0) return void 0;
  return strVal(fields[fields.length - 1]);
}
function hasOption(defElems, name2) {
  return (defElems ?? []).some((d) => d?.DefElem?.defname === name2);
}
function insertAfterKeywords(stmt, after, insert) {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  for (let i2 = 0; i2 + after.length <= toks.length; i2++) {
    let ok = true;
    for (let j = 0; j < after.length; j++) {
      if (toks[i2 + j].keyword !== after[j]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const last = toks[i2 + after.length - 1];
    const cut = byteToCharOffset(stmt.text, last.end - stmtStart);
    return `${stmt.text.slice(0, cut)} ${insert}${stmt.text.slice(cut)}`;
  }
  return void 0;
}
function removeKeywords(stmt, remove) {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  for (let i2 = 0; i2 + remove.length <= toks.length; i2++) {
    let ok = true;
    for (let j = 0; j < remove.length; j++) {
      if (toks[i2 + j].keyword !== remove[j]) {
        ok = false;
        break;
      }
    }
    if (!ok) continue;
    const from = byteToCharOffset(stmt.text, toks[i2].start - stmtStart);
    const to = byteToCharOffset(stmt.text, toks[i2 + remove.length - 1].end - stmtStart);
    const before = stmt.text.slice(0, from).replace(/\s+$/, " ");
    const afterText = stmt.text.slice(to).replace(/^\s+/, "");
    return `${before}${afterText}`;
  }
  return void 0;
}
function byteToCharOffset(text, byteOffset) {
  const buf = Buffer.from(text, "utf8");
  return buf.subarray(0, Math.min(byteOffset, buf.length)).toString("utf8").length;
}
function replaceTypeTokens(stmt, typeLocation, newType) {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  let i2 = toks.findIndex((t) => t.start === typeLocation);
  if (i2 < 0) return void 0;
  const first = toks[i2];
  let last = first;
  i2++;
  if (toks[i2]?.text === "(") {
    while (i2 < toks.length && toks[i2].text !== ")") i2++;
    if (i2 >= toks.length) return void 0;
    last = toks[i2];
    i2++;
  }
  if (toks[i2]?.keyword === "WITH" || toks[i2]?.keyword === "WITHOUT") {
    if (toks[i2 + 1]?.keyword === "TIME" && toks[i2 + 2]?.keyword === "ZONE") {
      last = toks[i2 + 2];
    }
  }
  const from = byteToCharOffset(stmt.text, first.start - stmtStart);
  const to = byteToCharOffset(stmt.text, last.end - stmtStart);
  return `${stmt.text.slice(0, from)}${newType}${stmt.text.slice(to)}`;
}
function replaceCallTokens(stmt, location, newCall) {
  const toks = stmt.tokens();
  const stmtStart = toks[0]?.start ?? 0;
  let i2 = toks.findIndex((t) => t.start === location);
  if (i2 < 0) return void 0;
  const first = toks[i2];
  i2++;
  if (toks[i2]?.text !== "(") return void 0;
  let depth = 0;
  for (; i2 < toks.length; i2++) {
    if (toks[i2].text === "(") depth++;
    if (toks[i2].text === ")") {
      depth--;
      if (depth === 0) break;
    }
  }
  if (i2 >= toks.length) return void 0;
  const from = byteToCharOffset(stmt.text, first.start - stmtStart);
  const to = byteToCharOffset(stmt.text, toks[i2].end - stmtStart);
  return `${stmt.text.slice(0, from)}${newCall}${stmt.text.slice(to)}`;
}

// src/parser/pg.ts
var import_libpg_query = __toESM(require_wasm(), 1);
var loaded;
function loadParser() {
  if (!loaded) loaded = (0, import_libpg_query.loadModule)();
  return loaded;
}
function lineStartsOf(buf) {
  const starts = [0];
  for (let i2 = 0; i2 < buf.length; i2++) if (buf[i2] === 10) starts.push(i2 + 1);
  return starts;
}
function lineIndexOf(starts, byteOffset) {
  let lo = 0;
  let hi = starts.length - 1;
  while (lo < hi) {
    const mid = lo + hi + 1 >> 1;
    if (starts[mid] <= byteOffset) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}
async function parseSegment(segment, path, firstIndex) {
  await loadParser();
  const sql = segment.sql;
  if (sql.trim() === "") return { statements: [], tokens: [] };
  const buf = Buffer.from(sql, "utf8");
  const starts = lineStartsOf(buf);
  const lineAt = (byteOffset) => segment.line + lineIndexOf(starts, Math.max(0, Math.min(byteOffset, buf.length)));
  let tokens = [];
  let tree;
  try {
    const scanned = await (0, import_libpg_query.scan)(sql);
    tokens = scanned.tokens.map((t) => ({
      start: t.start,
      end: t.end,
      kind: t.tokenName,
      keyword: t.keywordName === "NO_KEYWORD" ? "" : t.text.toUpperCase(),
      text: t.text
    }));
    tree = await (0, import_libpg_query.parse)(sql);
  } catch (err2) {
    if (err2 instanceof import_libpg_query.SqlError) {
      const pos = err2.sqlDetails?.cursorPosition ?? 0;
      const before = sql.slice(0, pos);
      const lineIdx = before.split("\n").length - 1;
      const column = pos - (before.lastIndexOf("\n") + 1) + 1;
      return {
        statements: [],
        tokens,
        failure: { path, line: segment.line + lineIdx, column, message: err2.message }
      };
    }
    throw err2;
  }
  const statements = [];
  let index = firstIndex;
  for (const raw of tree.stmts ?? []) {
    if (!raw.stmt) continue;
    const location = raw.stmt_location ?? 0;
    const length = raw.stmt_len ?? buf.length - location;
    const end = location + length;
    const first = tokens.find((t) => t.start >= location && t.kind !== "SQL_COMMENT" && t.kind !== "C_COMMENT");
    if (!first || first.start >= end) continue;
    const start2 = first.start;
    let lastEnd = end;
    for (const t of tokens) {
      if (t.start < start2 || t.end > end) continue;
      if (t.kind === "SQL_COMMENT" || t.kind === "C_COMMENT") continue;
      lastEnd = t.end;
    }
    const text = buf.subarray(start2, Math.min(end, lastEnd)).toString("utf8").trimEnd();
    const endByte = start2 + Buffer.byteLength(text, "utf8");
    const node = raw.stmt;
    const kind = Object.keys(node)[0];
    const stmtTokens = tokens.filter((t) => t.start >= start2 && t.end <= endByte);
    const line = lineAt(start2);
    const endLine = lineAt(Math.max(start2, endByte - 1));
    const lineStart = starts[lineIndexOf(starts, start2)];
    const leading = buf.subarray(lineStart, start2).toString("utf8");
    const lineEnd = endByte < buf.length ? Math.min(buf.length, starts[lineIndexOf(starts, endByte - 1) + 1] ?? buf.length) : buf.length;
    const trailing = buf.subarray(endByte, lineEnd).toString("utf8").replace(/^\s*;?\s*$/, "");
    statements.push({
      node,
      kind,
      inner: node[kind],
      text,
      line,
      endLine,
      wholeLines: leading.trim() === "" && (trailing === "" || /^\s*--/.test(trailing)),
      segment,
      index: index++,
      lineAt,
      tokens: () => stmtTokens
    });
  }
  return { statements, tokens };
}
function commentTokens(tokens, segment, sql) {
  const buf = Buffer.from(sql, "utf8");
  const starts = lineStartsOf(buf);
  const out2 = [];
  for (const t of tokens) {
    if (t.kind !== "SQL_COMMENT" && t.kind !== "C_COMMENT") continue;
    const body2 = t.kind === "SQL_COMMENT" ? t.text.replace(/^--/, "") : t.text.replace(/^\/\*/, "").replace(/\*\/$/, "");
    out2.push({ line: segment.line + lineIndexOf(starts, t.start), text: body2 });
  }
  return out2;
}

// src/engine/fingerprint.ts
import { createHash } from "node:crypto";
function normalizeStatement(text) {
  return text.replace(/\s+/g, " ").trim().toLowerCase();
}
function fingerprint(ruleId, statementText, table, key) {
  const h = createHash("sha256");
  h.update(ruleId);
  h.update("\0");
  h.update(normalizeStatement(statementText));
  h.update("\0");
  h.update((table ?? "").toLowerCase());
  h.update("\0");
  h.update((key ?? "").toLowerCase());
  return h.digest("hex").slice(0, 32);
}
function lineHash(lineText) {
  return createHash("sha256").update(lineText.replace(/\s+/g, " ").trim()).digest("hex").slice(0, 16) + ":1";
}

// src/engine/state.ts
function newPrState() {
  return {
    newTables: /* @__PURE__ */ new Set(),
    newIndexes: /* @__PURE__ */ new Set(),
    validatedNotNullChecks: /* @__PURE__ */ new Set(),
    validatedNotNullConstraints: /* @__PURE__ */ new Set()
  };
}
function newFileState() {
  return { explicitTransaction: false, txn: "s0", lockTimeoutSet: false, notValid: /* @__PURE__ */ new Map() };
}
function collectCreated(file, statements, pr) {
  if (file.status !== "added") return;
  for (const s of statements) {
    if (s.kind === "CreateStmt" || s.kind === "CreateTableAsStmt") {
      const rv = s.kind === "CreateStmt" ? relName(s.inner.relation) : relName(s.inner.into?.rel);
      if (rv) pr.newTables.add(rv.key);
    }
    if (s.kind === "IndexStmt" && typeof s.inner.idxname === "string") {
      const rv = relName(s.inner.relation);
      pr.newIndexes.add(indexKey(s.inner.idxname, rv?.schema));
    }
    if (s.kind === "AlterTableStmt") {
      const rv = relName(s.inner.relation);
      for (const cmd of alterCmds(s.inner)) {
        const c = cmd.def?.Constraint;
        if (cmd.subtype === "AT_AddConstraint" && c?.conname && (c.contype === "CONSTR_UNIQUE" || c.contype === "CONSTR_PRIMARY"))
          pr.newIndexes.add(indexKey(c.conname, rv?.schema));
      }
    }
  }
}
function indexKey(name2, schema) {
  return (schema ? `${schema}.${name2}` : name2).toLowerCase();
}
function currentTxn(file, state, stmt) {
  if (state.explicitTransaction) return state.txn;
  if (file.wrapped && !stmt.segment.transactionOptOut) return "file";
  return `s${stmt.index}`;
}
function transition(file, state, pr, stmt, txn) {
  const inner = stmt.inner;
  switch (stmt.kind) {
    case "TransactionStmt": {
      const kind = inner.kind;
      if (kind === "TRANS_STMT_BEGIN" || kind === "TRANS_STMT_START") {
        state.explicitTransaction = true;
        state.txn = `x${stmt.index}`;
      } else if (kind === "TRANS_STMT_COMMIT" || kind === "TRANS_STMT_ROLLBACK") {
        state.explicitTransaction = false;
      }
      return;
    }
    case "VariableSetStmt": {
      if (typeof inner.name !== "string" || inner.name.toLowerCase() !== "lock_timeout") return;
      if (inner.kind === "VAR_RESET" || inner.kind === "VAR_SET_DEFAULT") {
        state.lockTimeoutSet = false;
        return;
      }
      const arg = inner.args?.[0]?.A_Const;
      const raw = arg?.sval?.sval ?? (arg?.ival ? String(arg.ival.ival ?? 0) : void 0);
      const value = typeof raw === "string" ? raw.trim() : "";
      state.lockTimeoutSet = value !== "" && !/^0+\s*(ms|s|min|h|d)?$/i.test(value);
      return;
    }
    case "AlterTableStmt": {
      const rv = relName(inner.relation);
      if (!rv) return;
      for (const cmd of alterCmds(inner)) {
        if (cmd.subtype === "AT_AddConstraint") {
          const c = cmd.def?.Constraint;
          if (!c) continue;
          if (c.contype === "CONSTR_CHECK") {
            const column = notNullCheckColumn(c.raw_expr);
            if (c.skip_validation) {
              if (c.conname)
                state.notValid.set(c.conname.toLowerCase(), {
                  name: c.conname,
                  table: rv.key,
                  txn,
                  kind: "check",
                  column,
                  validated: false
                });
            } else if (column) {
              pr.validatedNotNullChecks.add(`${rv.key}.${column.toLowerCase()}`);
            }
          } else if (c.contype === "CONSTR_FOREIGN" && c.skip_validation && c.conname) {
            state.notValid.set(c.conname.toLowerCase(), { name: c.conname, table: rv.key, txn, kind: "foreign", validated: false });
          } else if (c.contype === "CONSTR_NOTNULL") {
            const column = constraintKeys(c)[0];
            if (c.skip_validation) {
              if (c.conname)
                state.notValid.set(c.conname.toLowerCase(), {
                  name: c.conname,
                  table: rv.key,
                  txn,
                  kind: "notnull",
                  column,
                  validated: false
                });
            } else if (column) {
              pr.validatedNotNullConstraints.add(`${rv.key}.${column.toLowerCase()}`);
            }
          }
        } else if (cmd.subtype === "AT_ValidateConstraint" && typeof cmd.name === "string") {
          const nv = state.notValid.get(cmd.name.toLowerCase());
          if (!nv) continue;
          nv.validated = true;
          if (nv.column) {
            const key = `${nv.table}.${nv.column.toLowerCase()}`;
            if (nv.kind === "check") pr.validatedNotNullChecks.add(key);
            if (nv.kind === "notnull") pr.validatedNotNullConstraints.add(key);
          }
        } else if (cmd.subtype === "AT_DropConstraint" && typeof cmd.name === "string") {
          state.notValid.delete(cmd.name.toLowerCase());
        }
      }
      return;
    }
    case "DropStmt": {
      if (inner.removeType === "OBJECT_TABLE") {
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

// src/engine/suppressions.ts
var PATTERN = /lurie-guard:\s*ignore\s+([A-Za-z]+\d{3}(?:\s*,\s*[A-Za-z]+\d{3})*|all)(?:\s+reason\s*=\s*(?:"([^"]*)"|'([^']*)'))?/;
function parseSuppression(path, line, commentText) {
  const m = PATTERN.exec(commentText);
  if (!m) return void 0;
  const ids = m[1].trim();
  const reason = m[2] ?? m[3];
  return {
    path,
    line,
    ruleIds: ids.toLowerCase() === "all" ? "all" : ids.split(/\s*,\s*/).map((s) => s.toUpperCase()),
    reason: reason !== void 0 && reason.trim() !== "" ? reason.trim() : void 0,
    text: commentText.trim()
  };
}
function applySuppressions(findings, suppressions) {
  const matched = /* @__PURE__ */ new Map();
  for (const s of suppressions) matched.set(s, 0);
  for (const f of findings) {
    if (f.ruleId.startsWith("PGS")) continue;
    for (const s of suppressions) {
      if (s.path !== f.path) continue;
      if (s.line !== f.line && s.line !== f.line - 1) continue;
      if (s.ruleIds !== "all" && !s.ruleIds.includes(f.ruleId)) continue;
      if (s.reason === void 0) continue;
      f.suppressed = { reason: s.reason, line: s.line };
      matched.set(s, (matched.get(s) ?? 0) + 1);
      break;
    }
  }
  const extra = [];
  const records = [];
  for (const s of suppressions) {
    const count = matched.get(s) ?? 0;
    records.push({ path: s.path, line: s.line, ruleIds: s.ruleIds, reason: s.reason, matched: count });
    if (s.reason === void 0) {
      extra.push({
        ruleId: "PGS01",
        severity: "warning",
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `This suppression has no reason, so it suppresses nothing. Write \`lurie-guard: ignore ${s.ruleIds === "all" ? "all" : s.ruleIds.join(",")} reason="why this statement is safe here"\`. (PGS01)`,
        fingerprint: fingerprint("PGS01", s.text)
      });
      continue;
    }
    if (count === 0) {
      extra.push({
        ruleId: "PGS02",
        severity: "info",
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `This suppression matches no finding on its line or the line below; remove it so it cannot hide a future finding. (PGS02)`,
        fingerprint: fingerprint("PGS02", s.text)
      });
    }
    if (s.ruleIds === "all") {
      extra.push({
        ruleId: "PGS03",
        severity: "warning",
        path: s.path,
        line: s.line,
        endLine: s.line,
        message: `\`ignore all\` suppresses every rule on this statement (reason: ${s.reason}). Prefer naming the rule ids so a new rule still reports here. (PGS03)`,
        fingerprint: fingerprint("PGS03", s.text)
      });
    }
  }
  return { findings: [...findings, ...extra], records };
}

// src/engine/index.ts
function sortedFiles(files) {
  return [...files].sort((a, b) => a.path < b.path ? -1 : a.path > b.path ? 1 : 0);
}
async function analyze(input) {
  const started = performance.now();
  const { config } = input;
  const catalogById = new Map(input.catalog.map((c) => [c.id, c]));
  const enabled = input.rules.filter((r) => config.rules[r.id] !== void 0);
  const excludeMatchers = /* @__PURE__ */ new Map();
  for (const [id, globs] of Object.entries(config.ruleExcludes)) excludeMatchers.set(id, (0, import_picomatch2.default)(globs, { dot: true }));
  const parsed = [];
  for (const file of sortedFiles(input.files)) {
    const statements = [];
    const comments = [...file.comments ?? []];
    let failure;
    for (const segment of file.segments) {
      const out2 = await parseSegment(segment, file.path, statements.length);
      if (out2.failure) {
        failure = out2.failure;
        break;
      }
      statements.push(...out2.statements);
      comments.push(...commentTokens(out2.tokens, segment, segment.sql));
    }
    parsed.push({ file, statements: failure ? [] : statements, comments, failure });
  }
  const pr = newPrState();
  for (const p of parsed) collectCreated(p.file, p.statements, pr);
  const findings = [];
  const suppressions = [];
  const reports = [];
  const parseFailures = [];
  for (const p of parsed) {
    const { file } = p;
    for (const c of p.comments) {
      const s = parseSuppression(file.path, c.line, c.text);
      if (s) suppressions.push(s);
    }
    if (p.failure) {
      parseFailures.push(p.failure);
      findings.push({
        ruleId: "PGS04",
        severity: "info",
        path: file.path,
        line: p.failure.line,
        endLine: p.failure.line,
        message: `Could not parse this file: ${p.failure.message} at line ${p.failure.line}, column ${p.failure.column}. No rule ran on it. (PGS04)`,
        fingerprint: fingerprint("PGS04", p.failure.message, file.path)
      });
      reports.push({
        path: file.path,
        framework: file.framework,
        wrapped: file.wrapped,
        wrapReason: file.wrapReason,
        status: "parse-error",
        statements: 0,
        notAnalyzed: file.notAnalyzed
      });
      continue;
    }
    const state = newFileState();
    const ctx = {
      file,
      state,
      pr,
      config,
      isNewTable: (rangeVar) => {
        const rv = relName(rangeVar);
        return rv !== void 0 && pr.newTables.has(rv.key);
      },
      isNewIndex: (name2) => pr.newIndexes.has(indexKey(name2)) || [...pr.newIndexes].some((k) => k.endsWith(`.${name2.toLowerCase()}`)),
      tableName: (rangeVar) => relName(rangeVar)?.display ?? "?",
      inTransaction: () => false,
      currentTxn: () => "s0"
    };
    for (const stmt of p.statements) {
      const txn = currentTxn(file, state, stmt);
      ctx.inTransaction = () => txn !== `s${stmt.index}`;
      ctx.currentTxn = () => txn;
      for (const rule22 of enabled) {
        const excluded = excludeMatchers.get(rule22.id);
        if (excluded && excluded(file.path)) continue;
        const raw = rule22.check(stmt, ctx);
        if (!raw) continue;
        const results = Array.isArray(raw) ? raw : [raw];
        for (const r of results) findings.push(toFinding(rule22, r, stmt, file, config, catalogById.get(rule22.id)));
      }
      transition(file, state, pr, stmt, txn);
    }
    reports.push({
      path: file.path,
      framework: file.framework,
      wrapped: file.wrapped,
      wrapReason: file.wrapReason,
      status: "analyzed",
      statements: p.statements.length,
      notAnalyzed: file.notAnalyzed
    });
  }
  const outcome = applySuppressions(findings, suppressions);
  const all = outcome.findings.sort(
    (a, b) => a.path.localeCompare(b.path) || a.line - b.line || a.ruleId.localeCompare(b.ruleId) || a.fingerprint.localeCompare(b.fingerprint)
  );
  return {
    findings: all,
    suppressions: outcome.records,
    files: reports,
    parseFailures,
    engineMs: Math.round(performance.now() - started)
  };
}
function toFinding(rule22, r, stmt, file, config, entry) {
  const synthesized = stmt.segment.synthesized !== void 0;
  const line = synthesized ? stmt.segment.line : r.line ?? stmt.line;
  const endLine = synthesized ? stmt.segment.line : r.endLine ?? (r.line !== void 0 ? r.line : stmt.endLine);
  const evidence = entry?.evidence.find((e) => !/^https?:\/\//.test(e)) ?? entry?.evidence[0];
  const suffix = evidence ? `(${rule22.id}, [evidence](${evidenceUrl(evidence)}))` : `(${rule22.id})`;
  let fix = r.fix;
  if (fix && fix.kind === "suggestion" && (synthesized || !stmt.wholeLines)) fix = { kind: "block", text: fix.text };
  if (fix && fix.kind === "suggestion") {
    const lines = file.content.split("\n");
    const first = lines[stmt.line - 1] ?? "";
    const last = lines[stmt.endLine - 1] ?? "";
    const indent = /^\s*/.exec(first)?.[0] ?? "";
    const lastStmtLine = stmt.text.split("\n").pop() ?? "";
    const at = last.indexOf(lastStmtLine.trimEnd());
    const suffix2 = at >= 0 ? last.slice(at + lastStmtLine.trimEnd().length).replace(/\r$/, "") : ";";
    fix = { kind: "suggestion", text: `${indent}${fix.text}${suffix2}`, startLine: stmt.line, endLine: stmt.endLine };
  }
  return {
    ruleId: rule22.id,
    severity: config.rules[rule22.id] ?? rule22.severity,
    path: file.path,
    line,
    endLine,
    message: `${r.message.trim()} ${suffix}`,
    table: r.table,
    fix,
    fingerprint: fingerprint(rule22.id, stmt.text, r.table, r.key),
    statement: stmt.text
  };
}

// rules/pg/PG001-create-index-not-concurrently/rule.ts
var rule = {
  id: "PG001",
  name: "create-index-not-concurrently",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "IndexStmt") return;
    const s = stmt.inner;
    if (s.concurrent) return;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const unique = s.unique === true;
    const form = unique ? "CREATE UNIQUE INDEX" : "CREATE INDEX";
    const fixed = insertAfterKeywords(stmt, unique ? ["CREATE", "UNIQUE", "INDEX"] : ["CREATE", "INDEX"], "CONCURRENTLY");
    const example = fixed && fixed.length <= 120 && !fixed.includes("\n") ? `\`${fixed}\`` : `\`${form} CONCURRENTLY\``;
    return {
      message: `\`${form}\` holds a \`SHARE\` lock on \`${table}\` for the whole build; every insert, update and delete on \`${table}\` waits. Build it with ${example}, outside a transaction (PG003 checks that). Not needed if \`${table}\` is new in this release or empty.`,
      table,
      fix: fixed ? { kind: "suggestion", text: fixed } : void 0
    };
  }
};

// rules/pg/PG002-drop-index-not-concurrently/rule.ts
var rule2 = {
  id: "PG002",
  name: "drop-index-not-concurrently",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "DropStmt") return;
    const s = stmt.inner;
    if (s.removeType !== "OBJECT_INDEX" || s.concurrent) return;
    const names = (s.objects ?? []).map((o) => qualifiedName(o?.List?.items ?? [])).filter(Boolean);
    const existing = names.filter((n) => !ctx.isNewIndex(n.name));
    if (existing.length === 0) return;
    const list = existing.map((n) => `\`${n.display}\``).join(", ");
    const single = existing.length === 1 && names.length === 1;
    const fixed = single ? insertAfterKeywords(stmt, ["DROP", "INDEX"], "CONCURRENTLY") : void 0;
    const fixText = fixed ?? existing.map((n) => `DROP INDEX CONCURRENTLY ${n.display};`).join("\n");
    return {
      message: `\`DROP INDEX\` takes an \`ACCESS EXCLUSIVE\` lock on the table of ${list} until the transaction commits: it waits for every running query on the table, and every query that arrives after it waits for the drop. Drop it with \`DROP INDEX CONCURRENTLY\` (one index per statement), outside a transaction (PG003 checks that). Not needed if the index was created in this release.`,
      table: existing[0].display,
      fix: fixed ? { kind: "suggestion", text: fixed } : { kind: "block", text: fixText }
    };
  }
};

// src/rules-support.ts
var STABLE_OR_IMMUTABLE = /* @__PURE__ */ new Set([
  "now",
  "transaction_timestamp",
  "statement_timestamp",
  "current_timestamp",
  "localtimestamp",
  "current_date",
  "current_time",
  "localtime",
  "current_user",
  "session_user",
  "current_role",
  "user",
  "current_schema",
  "current_setting",
  "current_database",
  "inet_client_addr",
  "inet_server_addr",
  "pg_backend_pid",
  "version",
  "lower",
  "upper",
  "initcap",
  "length",
  "char_length",
  "character_length",
  "octet_length",
  "trim",
  "btrim",
  "ltrim",
  "rtrim",
  "md5",
  "sha256",
  "concat",
  "concat_ws",
  "substr",
  "substring",
  "left",
  "right",
  "repeat",
  "replace",
  "split_part",
  "format",
  "to_char",
  "to_date",
  "to_timestamp",
  "to_number",
  "date_trunc",
  "date_part",
  "extract",
  "make_date",
  "make_time",
  "make_timestamp",
  "make_timestamptz",
  "make_interval",
  "age",
  "abs",
  "ceil",
  "ceiling",
  "floor",
  "round",
  "trunc",
  "sign",
  "mod",
  "power",
  "sqrt",
  "greatest",
  "least",
  "coalesce",
  "nullif",
  "num_nulls",
  "num_nonnulls",
  "array_length",
  "array_to_string",
  "string_to_array",
  "array_fill",
  "to_json",
  "to_jsonb",
  "json_build_object",
  "jsonb_build_object",
  "json_build_array",
  "jsonb_build_array",
  "row_to_json",
  "encode",
  "decode",
  "quote_ident",
  "quote_literal",
  "quote_nullable",
  "timezone",
  "pg_typeof",
  "text",
  "int4",
  "int8",
  "numeric",
  "bool",
  "date",
  "interval",
  "uuid"
]);
function volatileFunction(expr) {
  if (!expr || typeof expr !== "object") return void 0;
  const node = expr;
  if ("FuncCall" in node) {
    const name2 = funcName(node.FuncCall);
    if (name2 && !STABLE_OR_IMMUTABLE.has(name2)) return name2;
  }
  if ("SubLink" in node) return "subquery";
  for (const value of Object.values(node)) {
    if (Array.isArray(value)) {
      for (const v of value) {
        const found = volatileFunction(v);
        if (found) return found;
      }
    } else if (value && typeof value === "object") {
      const found = volatileFunction(value);
      if (found) return found;
    }
  }
  return void 0;
}
function transactionOptOutHint(framework) {
  switch (framework) {
    case "flyway":
      return "Flyway: create `<file>.sql.conf` next to the migration with `executeInTransaction=false`";
    case "liquibase":
      return "Liquibase: add `runInTransaction:false` to the `--changeset` line";
    case "rails":
      return "Rails: call `disable_ddl_transaction!` in the migration class";
    case "django":
      return "Django: set `atomic = False` on the `Migration` class";
    case "alembic":
      return "Alembic: run it inside `with op.get_context().autocommit_block():`";
    case "prisma":
      return "Prisma Migrate has no opt-out: run the statement outside Prisma, or build the index before the table has traffic";
    case "dbmate":
      return "dbmate: use `-- migrate:up transaction:false`";
    case "sqitch":
      return "Sqitch runs deploy scripts in a transaction: move the statement to a script your deploy runs outside Sqitch";
    case "golang-migrate":
      return "golang-migrate runs statements one by one: remove the explicit BEGIN/COMMIT";
    case "goose":
      return "goose: add  at the top of the file";
    case "sql":
      return "run the file outside a transaction (your runner wraps files: `transaction: always` in `.lurie-guard.yml`)";
  }
}
function transactionReason(stmt, ctx) {
  if (ctx.state.explicitTransaction) return { explicit: true, hint: "move it outside the `BEGIN` ... `COMMIT` block" };
  return { explicit: false, hint: transactionOptOutHint(ctx.file.framework) };
}
function ident2(name2) {
  return (name2 ?? "?").replace(/`/g, "");
}
function columnSites(stmt, ctx) {
  const s = stmt.inner;
  const out2 = [];
  if (stmt.kind === "CreateStmt") {
    const table = ctx.tableName(s.relation);
    const pkCols = /* @__PURE__ */ new Set();
    for (const c of tableConstraints(s)) if (c.contype === "CONSTR_PRIMARY") for (const k of constraintKeys(c)) pkCols.add(k.toLowerCase());
    for (const col of columnDefs(s)) {
      const constraints = columnConstraints(col);
      out2.push({
        table,
        relation: s.relation,
        name: col.colname ?? "?",
        typeName: col.typeName,
        constraints,
        isPrimaryKey: constraints.some((c) => c.contype === "CONSTR_PRIMARY") || pkCols.has(String(col.colname).toLowerCase()),
        location: col.location ?? 0,
        typeLocation: col.typeName?.location ?? col.location ?? 0,
        origin: "create"
      });
    }
  } else if (stmt.kind === "AlterTableStmt") {
    const table = ctx.tableName(s.relation);
    for (const cmd of alterCmds(s)) {
      const col = cmd.def?.ColumnDef;
      if (!col) continue;
      if (cmd.subtype === "AT_AddColumn") {
        const constraints = columnConstraints(col);
        out2.push({
          table,
          relation: s.relation,
          name: col.colname ?? "?",
          typeName: col.typeName,
          constraints,
          isPrimaryKey: constraints.some((c) => c.contype === "CONSTR_PRIMARY"),
          location: col.location ?? 0,
          typeLocation: col.typeName?.location ?? col.location ?? 0,
          origin: "add"
        });
      } else if (cmd.subtype === "AT_AlterColumnType" && typeof cmd.name === "string") {
        out2.push({
          table,
          relation: s.relation,
          name: cmd.name,
          typeName: col.typeName,
          constraints: [],
          isPrimaryKey: false,
          location: col.typeName?.location ?? 0,
          typeLocation: col.typeName?.location ?? 0,
          origin: "alter-type"
        });
      }
    }
  }
  return out2;
}
function defaultExpr(site) {
  return site.constraints.find((c) => c.contype === "CONSTR_DEFAULT")?.raw_expr;
}

// rules/pg/PG003-concurrently-inside-transaction/rule.ts
function concurrentForm(stmt) {
  const s = stmt.inner;
  if (stmt.kind === "IndexStmt" && s.concurrent) return s.unique ? "CREATE UNIQUE INDEX CONCURRENTLY" : "CREATE INDEX CONCURRENTLY";
  if (stmt.kind === "DropStmt" && s.removeType === "OBJECT_INDEX" && s.concurrent) return "DROP INDEX CONCURRENTLY";
  if (stmt.kind === "ReindexStmt" && hasOption(s.params, "concurrently")) return "REINDEX ... CONCURRENTLY";
  if (stmt.kind === "RefreshMatViewStmt" && s.concurrent) return "REFRESH MATERIALIZED VIEW CONCURRENTLY";
  return void 0;
}
var rule3 = {
  id: "PG003",
  name: "concurrently-inside-transaction",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    const form = concurrentForm(stmt);
    if (!form) return;
    if (!ctx.inTransaction()) return;
    const { explicit, hint } = transactionReason(stmt, ctx);
    const where = explicit ? "inside an explicit `BEGIN` block" : `in a file ${ctx.file.framework === "sql" ? "the runner" : ctx.file.framework} wraps in a transaction`;
    return {
      message: `\`${form}\` cannot run inside a transaction block: PostgreSQL rejects it with SQLSTATE \`25001\` and the migration fails. This statement runs ${where}. Fix: ${hint}. No exception: the statement never works inside a transaction.`
    };
  }
};

// rules/pg/PG004-ddl-without-lock-timeout/rule.ts
function heavyLock(stmt, ctx) {
  const s = stmt.inner;
  switch (stmt.kind) {
    case "AlterTableStmt": {
      if (s.objtype && s.objtype !== "OBJECT_TABLE") return void 0;
      const cmds = alterCmds(s);
      if (cmds.length === 0 || cmds.every((c) => c.subtype === "AT_ValidateConstraint")) return void 0;
      if (ctx.isNewTable(s.relation)) return void 0;
      return { form: "ALTER TABLE", table: ctx.tableName(s.relation) };
    }
    case "DropStmt": {
      if (s.removeType === "OBJECT_TABLE") {
        const names = (s.objects ?? []).map((o) => qualifiedName(o?.List?.items ?? []));
        const existing = names.filter((n) => n && !ctx.pr.newTables.has(n.key));
        if (existing.length === 0) return void 0;
        return { form: "DROP TABLE", table: existing[0].display };
      }
      if (s.removeType === "OBJECT_INDEX" && !s.concurrent) {
        const names = (s.objects ?? []).map((o) => qualifiedName(o?.List?.items ?? []));
        const existing = names.filter((n) => n && !ctx.isNewIndex(n.name));
        if (existing.length === 0) return void 0;
        return { form: "DROP INDEX", table: `the table of ${existing[0].display}` };
      }
      return void 0;
    }
    case "TruncateStmt": {
      const rels = (s.relations ?? []).map((r) => r?.RangeVar).filter(Boolean);
      const existing = rels.filter((r) => !ctx.isNewTable(r));
      if (existing.length === 0) return void 0;
      return { form: "TRUNCATE", table: ctx.tableName(existing[0]) };
    }
    case "ClusterStmt": {
      if (!s.relation || ctx.isNewTable(s.relation)) return void 0;
      return { form: "CLUSTER", table: ctx.tableName(s.relation) };
    }
    case "RenameStmt": {
      const table = s.renameType === "OBJECT_TABLE" || s.renameType === "OBJECT_COLUMN" && (!s.relationType || s.relationType === "OBJECT_TABLE");
      if (!table || !s.relation || ctx.isNewTable(s.relation)) return void 0;
      return { form: s.renameType === "OBJECT_TABLE" ? "ALTER TABLE ... RENAME TO" : "ALTER TABLE ... RENAME COLUMN", table: ctx.tableName(s.relation) };
    }
    case "VacuumStmt": {
      if (!s.is_vacuumcmd || !hasOption(s.options, "full")) return void 0;
      const rels = (s.rels ?? []).map((r) => r?.VacuumRelation?.relation).filter(Boolean);
      const existing = rels.filter((r) => !ctx.isNewTable(r));
      if (rels.length > 0 && existing.length === 0) return void 0;
      return { form: "VACUUM FULL", table: rels.length ? ctx.tableName(existing[0]) : "every table" };
    }
    case "ReindexStmt": {
      if (hasOption(s.params, "concurrently")) return void 0;
      const rv = relName(s.relation);
      if (!rv) return void 0;
      if (s.kind === "REINDEX_OBJECT_INDEX" && ctx.isNewIndex(rv.name)) return void 0;
      if (s.kind === "REINDEX_OBJECT_TABLE" && ctx.isNewTable(s.relation)) return void 0;
      return { form: "REINDEX", table: s.kind === "REINDEX_OBJECT_INDEX" ? `the table of ${rv.display}` : rv.display };
    }
    case "RefreshMatViewStmt": {
      if (s.concurrent || !s.relation || ctx.isNewTable(s.relation)) return void 0;
      return { form: "REFRESH MATERIALIZED VIEW", table: ctx.tableName(s.relation) };
    }
    case "LockStmt": {
      if (typeof s.mode === "number" && s.mode < 6) return void 0;
      const rels = (s.relations ?? []).map((r) => r?.RangeVar).filter(Boolean);
      const existing = rels.filter((r) => !ctx.isNewTable(r));
      if (existing.length === 0) return void 0;
      return { form: "LOCK TABLE", table: ctx.tableName(existing[0]) };
    }
    default:
      return void 0;
  }
}
var rule4 = {
  id: "PG004",
  name: "ddl-without-lock-timeout",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (ctx.config.lockTimeoutSetByRunner || ctx.state.lockTimeoutSet) return;
    const hit = heavyLock(stmt, ctx);
    if (!hit) return;
    const table = hit.table.startsWith("the table of") ? hit.table : `\`${hit.table}\``;
    return {
      message: `\`${hit.form}\` waits for a heavy lock (\`ACCESS EXCLUSIVE\` or \`SHARE ROW EXCLUSIVE\`) on ${table} with \`lock_timeout\` at its default of 0 (wait forever): it queues behind any long transaction, and every query that arrives after it queues behind the DDL. Run \`SET lock_timeout = '2s'\` (or \`SET LOCAL\` inside the transaction) before the first DDL and retry on SQLSTATE \`55P03\`. Not needed when your migration runner sets \`lock_timeout\` for every session: say so with \`lock_timeout_set_by_runner: true\` in \`.lurie-guard.yml\`.`,
      table: hit.table,
      fix: { kind: "block", text: `SET lock_timeout = '2s';  -- a few seconds; retry the step on 55P03
${stmt.text};` }
    };
  }
};

// rules/pg/PG005-add-column-rewrites-table/rule.ts
var rule5 = {
  id: "PG005",
  name: "add-column-rewrites-table",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_AddColumn") continue;
      const col = cmd.def?.ColumnDef;
      if (!col) continue;
      const name2 = ident2(col.colname);
      const type = typeInfo(col.typeName)?.display ?? "type";
      let cause;
      let fixSteps;
      for (const c of columnConstraints(col)) {
        if (c.contype === "CONSTR_DEFAULT") {
          const fn = volatileFunction(c.raw_expr);
          if (fn) {
            cause = `\`DEFAULT ${fn === "subquery" ? "(subquery)" : `${fn}()`}\` is volatile, so every existing row gets its own value and the table is rewritten`;
            fixSteps = `ALTER TABLE ${table} ADD COLUMN ${name2} ${type};
ALTER TABLE ${table} ALTER COLUMN ${name2} SET DEFAULT ${fn === "subquery" ? "..." : `${fn}()`};  -- new rows only, no rewrite
-- backfill the existing rows in batches, each in its own transaction;
-- then, if the column must be NOT NULL, the validated-CHECK path (PG007)`;
          }
        } else if (c.contype === "CONSTR_GENERATED" && c.generated_kind === "s") {
          cause = "a `GENERATED ... STORED` column is computed for every existing row, which rewrites the table";
          fixSteps = `ALTER TABLE ${table} ADD COLUMN ${name2} ${type};
-- backfill the computed value in batches with UPDATE; keep it current with a trigger or compute it in the application`;
        } else if (c.contype === "CONSTR_IDENTITY") {
          cause = "an identity column assigns a sequence value to every existing row, which rewrites the table";
          fixSteps = `ALTER TABLE ${table} ADD COLUMN ${name2} ${type};
-- backfill from a sequence in batches, then ALTER COLUMN ... ADD GENERATED BY DEFAULT AS IDENTITY in a later release`;
        }
      }
      if (!cause) continue;
      results.push({
        message: `\`ADD COLUMN ${name2}\` rewrites every row of \`${table}\` and rebuilds all its indexes under \`ACCESS EXCLUSIVE\` (\`pg_relation_filenode\` changes): ${cause}. Add the column nullable, set the default separately so only new rows get it, and backfill the existing rows in batches. Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        line: stmt.lineAt(col.location ?? 0),
        fix: fixSteps ? { kind: "block", text: fixSteps } : void 0
      });
    }
    return results;
  }
};

// rules/pg/PG006-add-column-not-null-without-default/rule.ts
var SERIAL_TYPES = /* @__PURE__ */ new Set(["serial", "serial2", "serial4", "serial8", "smallserial", "bigserial"]);
var rule6 = {
  id: "PG006",
  name: "add-column-not-null-without-default",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_AddColumn") continue;
      const col = cmd.def?.ColumnDef;
      if (!col) continue;
      const constraints = columnConstraints(col);
      const notNull = constraints.some((c) => c.contype === "CONSTR_NOTNULL") || col.is_not_null === true;
      if (!notNull) continue;
      const hasValue = constraints.some(
        (c) => c.contype === "CONSTR_DEFAULT" || c.contype === "CONSTR_IDENTITY" || c.contype === "CONSTR_GENERATED" || c.contype === "CONSTR_PRIMARY"
      );
      if (hasValue) continue;
      const type = typeInfo(col.typeName);
      if (type && SERIAL_TYPES.has(type.name)) continue;
      const name2 = ident2(col.colname);
      results.push({
        message: `\`ADD COLUMN ${name2} ... NOT NULL\` without a default fails on any table that has rows: nothing fills the existing rows of \`${table}\`, so PostgreSQL rejects the statement with SQLSTATE \`23502\` and the migration aborts. Add it with a constant default (\`NOT NULL DEFAULT <constant>\`: metadata-only, no rewrite), or add it nullable, backfill in batches, then \`SET NOT NULL\` through a validated \`CHECK\` (PG007). Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        line: stmt.lineAt(col.location ?? 0),
        fix: {
          kind: "block",
          text: `ALTER TABLE ${table} ADD COLUMN ${name2} ${type?.display ?? "type"} NOT NULL DEFAULT <constant>;
-- or: add it nullable, backfill in batches, then the validated-CHECK path (PG007)`
        }
      });
    }
    return results;
  }
};

// rules/pg/PG007-set-not-null-without-check/rule.ts
var rule7 = {
  id: "PG007",
  name: "set-not-null-without-check",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const pg18 = ctx.config.postgresVersion >= 18;
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_SetNotNull" || typeof cmd.name !== "string") continue;
      const col = cmd.name;
      const key = `${rv.key}.${col.toLowerCase()}`;
      if (ctx.pr.validatedNotNullChecks.has(key)) continue;
      if (pg18 && ctx.pr.validatedNotNullConstraints.has(key)) continue;
      const name2 = ident2(col);
      const constraint = `${rv.name}_${col}_not_null`;
      const fix = pg18 ? `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} NOT NULL ${name2} NOT VALID;  -- catalog only
ALTER TABLE ${table} VALIDATE CONSTRAINT ${constraint};  -- separate transaction, SHARE UPDATE EXCLUSIVE: writes continue` : `ALTER TABLE ${table} ADD CONSTRAINT ${constraint} CHECK (${name2} IS NOT NULL) NOT VALID;  -- catalog only, commit at once
ALTER TABLE ${table} VALIDATE CONSTRAINT ${constraint};  -- separate transaction, SHARE UPDATE EXCLUSIVE: writes continue
ALTER TABLE ${table} ALTER COLUMN ${name2} SET NOT NULL;  -- skips the scan: the valid CHECK proves no NULL
ALTER TABLE ${table} DROP CONSTRAINT ${constraint};`;
      results.push({
        message: `\`SET NOT NULL\` scans every row of \`${table}\` to check \`${name2}\` while it holds \`ACCESS EXCLUSIVE\`: reads and writes wait for the whole scan. ` + (pg18 ? `On PostgreSQL 18 add the constraint \`NOT VALID\` (\`ADD CONSTRAINT ${constraint} NOT NULL ${name2} NOT VALID\`) and \`VALIDATE CONSTRAINT\` it in a separate transaction, which lets writes continue. ` : `Add \`CHECK (${name2} IS NOT NULL) NOT VALID\` first, \`VALIDATE CONSTRAINT\` it in a separate transaction (writes continue), then \`SET NOT NULL\` skips the scan. `) + `Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        fix: { kind: "block", text: fix }
      });
    }
    return results;
  }
};

// rules/pg/PG008-foreign-key-without-not-valid/rule.ts
var rule8 = {
  id: "PG008",
  name: "foreign-key-without-not-valid",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const cmds = alterCmds(s);
    const results = [];
    for (const cmd of cmds) {
      if (cmd.subtype !== "AT_AddConstraint") continue;
      const c = cmd.def?.Constraint;
      if (!c || c.contype !== "CONSTR_FOREIGN" || c.skip_validation) continue;
      const cols = (c.fk_attrs ?? []).map(strVal).filter(Boolean);
      const referenced = relName(c.pktable)?.display ?? "the referenced table";
      const name2 = c.conname ?? `${rv.name}_${cols.join("_") || "fk"}_fkey`;
      let suggestion;
      if (cmds.length === 1) {
        const withNotValid = `${stmt.text} NOT VALID`;
        suggestion = c.conname ? withNotValid : insertAfterKeywords({ ...stmt, text: withNotValid }, ["ADD"], `CONSTRAINT ${name2}`) ?? withNotValid;
      }
      results.push({
        message: `\`ADD FOREIGN KEY\` validates every row of \`${table}\` while it holds \`SHARE ROW EXCLUSIVE\` on \`${table}\` and on \`${referenced}\`: writes on both tables wait for the whole scan. Add it with \`NOT VALID\` (catalog only), then \`ALTER TABLE ${table} VALIDATE CONSTRAINT ${name2}\` in a separate transaction, which takes only \`SHARE UPDATE EXCLUSIVE\` and lets writes continue. Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        fix: suggestion ? { kind: "suggestion", text: suggestion } : { kind: "block", text: `ALTER TABLE ${table} ADD CONSTRAINT ${name2} FOREIGN KEY (${cols.join(", ")}) REFERENCES ${referenced} (...) NOT VALID;
-- separate transaction:
ALTER TABLE ${table} VALIDATE CONSTRAINT ${name2};` }
      });
    }
    return results;
  }
};

// rules/pg/PG009-check-without-not-valid/rule.ts
var rule9 = {
  id: "PG009",
  name: "check-without-not-valid",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const cmds = alterCmds(s);
    const results = [];
    for (const cmd of cmds) {
      if (cmd.subtype !== "AT_AddConstraint") continue;
      const c = cmd.def?.Constraint;
      if (!c || c.contype !== "CONSTR_CHECK" || c.skip_validation) continue;
      const col = notNullCheckColumn(c.raw_expr);
      const name2 = c.conname ?? `${rv.name}_${col ?? "check"}${col ? "_check" : ""}`;
      let suggestion;
      if (cmds.length === 1) {
        const withNotValid = `${stmt.text} NOT VALID`;
        suggestion = c.conname ? withNotValid : insertAfterKeywords({ ...stmt, text: withNotValid }, ["ADD"], `CONSTRAINT ${name2}`) ?? withNotValid;
      }
      results.push({
        message: `\`ADD CHECK\` scans every row of \`${table}\` to validate the constraint while it holds \`ACCESS EXCLUSIVE\`: reads and writes wait for the whole scan. Add it with \`NOT VALID\` (catalog only, milliseconds under the same lock), then \`ALTER TABLE ${table} VALIDATE CONSTRAINT ${name2}\` in a separate transaction, which takes only \`SHARE UPDATE EXCLUSIVE\`. Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        fix: suggestion ? { kind: "suggestion", text: suggestion } : { kind: "block", text: `ALTER TABLE ${table} ADD CONSTRAINT ${name2} CHECK (...) NOT VALID;
-- separate transaction:
ALTER TABLE ${table} VALIDATE CONSTRAINT ${name2};` }
      });
    }
    return results;
  }
};

// rules/pg/PG010-validate-in-same-transaction/rule.ts
var rule10 = {
  id: "PG010",
  name: "validate-in-same-transaction",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    const rv = relName(s.relation);
    if (!rv || ctx.pr.newTables.has(rv.key)) return;
    const table = rv.display;
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_ValidateConstraint" || typeof cmd.name !== "string") continue;
      const nv = ctx.state.notValid.get(cmd.name.toLowerCase());
      if (!nv || nv.validated || nv.txn !== ctx.currentTxn()) continue;
      const lock = nv.kind === "foreign" ? "`SHARE ROW EXCLUSIVE` on both tables" : "`ACCESS EXCLUSIVE`";
      const { explicit, hint } = transactionReason(stmt, ctx);
      const where = explicit ? "the same `BEGIN` block" : `the same file, which ${ctx.file.framework === "sql" ? "the runner" : ctx.file.framework} runs as one transaction`;
      results.push({
        message: `\`VALIDATE CONSTRAINT ${nv.name}\` runs in the same transaction as the \`ADD ... NOT VALID\` that created it (${where}), so the full scan of \`${table}\` runs while the ${lock} lock from the \`ADD\` is still held: \`NOT VALID\` bought nothing. Commit after the \`ADD\` and validate in its own transaction: ${explicit ? hint : `move the VALIDATE to the next migration, or ${hint}`}. Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: nv.name
      });
    }
    return results;
  }
};

// rules/pg/PG011-alter-column-type-rewrites/rule.ts
var rule11 = {
  id: "PG011",
  name: "alter-column-type-rewrites",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_AlterColumnType" || typeof cmd.name !== "string") continue;
      const col = ident2(cmd.name);
      const def = cmd.def?.ColumnDef;
      const type = typeInfo(def?.typeName)?.display ?? "the new type";
      const usingClause = def?.raw_default !== void 0;
      results.push({
        message: `\`ALTER COLUMN ${col} TYPE ${type}\` rewrites every row of \`${table}\` and rebuilds all its indexes under \`ACCESS EXCLUSIVE\` (\`pg_relation_filenode\` changes)${usingClause ? ", always, because it has a `USING` clause" : ", unless the current type is binary-coercible to the new one"}. Change the type with expand/contract: add a new column of type ${type}, dual-write, backfill in batches, switch reads, drop the old column in a later release. Not needed if \`${table}\` is new in this release or empty${usingClause ? "" : `, or if the current type is binary-coercible (varchar(n) to a larger or unbounded varchar or to text, numeric(p,s) to a larger p, timestamp(p) to a larger p): then suppress with a reason that names the current type`}.`,
        table,
        key: col,
        fix: {
          kind: "block",
          text: `ALTER TABLE ${table} ADD COLUMN ${col}_new ${type};
-- dual-write ${col} and ${col}_new from the application; backfill in batches
-- switch reads to ${col}_new; then, in a later release:
ALTER TABLE ${table} DROP COLUMN ${col};
ALTER TABLE ${table} RENAME COLUMN ${col}_new TO ${col};`
        }
      });
    }
    return results;
  }
};

// rules/pg/PG012-unique-or-pk-without-using-index/rule.ts
var rule12 = {
  id: "PG012",
  name: "unique-or-pk-without-using-index",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const rv = relName(s.relation);
    if (!rv) return;
    const table = rv.display;
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_AddConstraint") continue;
      const c = cmd.def?.Constraint;
      if (!c || c.contype !== "CONSTR_UNIQUE" && c.contype !== "CONSTR_PRIMARY" || c.indexname) continue;
      const pk = c.contype === "CONSTR_PRIMARY";
      const cols = constraintKeys(c);
      const form = pk ? "ADD PRIMARY KEY" : "ADD UNIQUE";
      const name2 = c.conname ?? `${rv.name}_${cols.join("_")}_${pk ? "pkey" : "key"}`;
      const idx = pk ? `${rv.name}_${cols.join("_")}_pkey_idx` : `${name2}_idx`;
      results.push({
        message: `\`${form}\` builds the unique index itself while it holds \`ACCESS EXCLUSIVE\` on \`${table}\` (plus the build's \`SHARE\`): it scans the table and every read and write waits for the whole build. Build the index first with \`CREATE UNIQUE INDEX CONCURRENTLY ${idx} ON ${table} (${cols.join(", ")})\`, then \`ALTER TABLE ${table} ADD CONSTRAINT ${name2} ${pk ? "PRIMARY KEY" : "UNIQUE"} USING INDEX ${idx}\`, a catalog change${pk ? " (the key columns must already be NOT NULL: PG007)" : ""}. Not needed if \`${table}\` is new in this release or empty.`,
        table,
        key: name2,
        fix: {
          kind: "block",
          text: `CREATE UNIQUE INDEX CONCURRENTLY ${idx} ON ${table} (${cols.join(", ")});  -- outside a transaction
ALTER TABLE ${table} ADD CONSTRAINT ${name2} ${pk ? "PRIMARY KEY" : "UNIQUE"} USING INDEX ${idx};`
        }
      });
    }
    return results;
  }
};

// rules/pg/PG013-rename-in-one-step/rule.ts
var rule13 = {
  id: "PG013",
  name: "rename-in-one-step",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "RenameStmt") return;
    const s = stmt.inner;
    if (s.renameType !== "OBJECT_COLUMN" && s.renameType !== "OBJECT_TABLE") return;
    if (s.renameType === "OBJECT_COLUMN" && s.relationType && s.relationType !== "OBJECT_TABLE") return;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const to = ident2(s.newname);
    if (s.renameType === "OBJECT_COLUMN") {
      const from = ident2(s.subname);
      return {
        message: `\`RENAME COLUMN ${from} TO ${to}\` breaks every query of the running release that reads or writes \`${table}.${from}\` the moment it commits, and the old release keeps serving until the deploy finishes. Use expand/contract: add \`${to}\`, dual-write both columns, backfill, switch reads to \`${to}\`, then drop \`${from}\` in a later release. Not needed if \`${table}\` is new in this release, or if no running code reads \`${from}\`: suppress with the reason naming that release.`,
        table,
        key: from
      };
    }
    return {
      message: `\`RENAME TO ${to}\` breaks every query of the running release that uses \`${table}\` the moment it commits. Use expand/contract: create \`${to}\` (or a view named \`${to}\` over \`${table}\`), switch the application, then drop the old name in a later release. Not needed if \`${table}\` is new in this release, or if no running code uses it: suppress with the reason naming that release.`,
      table
    };
  }
};

// rules/pg/PG014-drop-column-or-table/rule.ts
var rule14 = {
  id: "PG014",
  name: "drop-column-or-table",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind === "DropStmt") {
      const s2 = stmt.inner;
      if (s2.removeType !== "OBJECT_TABLE") return;
      const existing = (s2.objects ?? []).map((obj) => qualifiedName(obj?.List?.items ?? [])).filter((q) => q && !ctx.pr.newTables.has(q.key));
      if (existing.length === 0) return;
      const names = existing.map((q) => `\`${q.display}\``).join(", ");
      const first = existing[0];
      return {
        message: `\`DROP TABLE\` of ${names} is irreversible and fails every query of the running release that still uses the table the moment it commits. Drop it in the release after the last one that reads it, and keep a backup or a rename (\`ALTER TABLE ${first.display} RENAME TO ${first.name}_dropped\`) until that release is out. Not needed if the table is new in this release; otherwise suppress with the reason naming the release that stopped using it.`,
        table: first.display
      };
    }
    if (stmt.kind !== "AlterTableStmt") return;
    const s = stmt.inner;
    if (ctx.isNewTable(s.relation)) return;
    const table = ctx.tableName(s.relation);
    const results = [];
    for (const cmd of alterCmds(s)) {
      if (cmd.subtype !== "AT_DropColumn" || typeof cmd.name !== "string") continue;
      const col = ident2(cmd.name);
      results.push({
        message: `\`DROP COLUMN ${col}\` fails every query of the running release that still reads or writes \`${table}.${col}\` the moment it commits, and the data is gone. Drop it in the release after the last one that reads it (expand/contract): stop reading, deploy, then drop. Not needed if \`${table}\` is new in this release; otherwise suppress with the reason naming the release that stopped reading \`${col}\`.`,
        table,
        key: col
      });
    }
    return results;
  }
};

// rules/pg/PG015-vacuum-full-or-cluster/rule.ts
var rule15 = {
  id: "PG015",
  name: "vacuum-full-or-cluster",
  severity: "error",
  defaultOn: true,
  check(stmt, ctx) {
    const s = stmt.inner;
    switch (stmt.kind) {
      case "VacuumStmt": {
        if (!s.is_vacuumcmd || !hasOption(s.options, "full")) return;
        const rels = (s.rels ?? []).map((r) => r?.VacuumRelation?.relation).filter(Boolean);
        const existing = rels.filter((r) => !ctx.isNewTable(r));
        if (rels.length > 0 && existing.length === 0) return;
        const table = rels.length === 0 ? "every table in the database" : `\`${ctx.tableName(existing[0])}\``;
        return {
          message: `\`VACUUM FULL\` rewrites ${table} into a new file under \`ACCESS EXCLUSIVE\`: it queues behind every running query, every query that arrives after it waits for the whole rewrite, and the copy needs the table's size again in free disk. Plain \`VACUUM\` reclaims space online; for bloated indexes use \`REINDEX INDEX CONCURRENTLY\`; to shrink a table online use pg_repack or a copy-and-swap in a maintenance window. Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it.`,
          table: rels.length ? ctx.tableName(existing[0]) : void 0,
          fix: { kind: "block", text: rels.length ? `VACUUM (ANALYZE) ${ctx.tableName(existing[0])};` : "VACUUM (ANALYZE);" }
        };
      }
      case "ClusterStmt": {
        if (!s.relation || ctx.isNewTable(s.relation)) return;
        const table = ctx.tableName(s.relation);
        return {
          message: `\`CLUSTER\` rewrites \`${table}\` and rebuilds its indexes under \`ACCESS EXCLUSIVE\` (plus \`SHARE\` for the rebuild) until the transaction commits: reads and writes wait for the whole rewrite, and it needs the table's size again in free disk. Reclaim space with plain \`VACUUM\` and rebuild indexes with \`REINDEX INDEX CONCURRENTLY\`; if physical order matters, use pg_repack or a maintenance window. Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it.`,
          table
        };
      }
      case "ReindexStmt": {
        if (hasOption(s.params, "concurrently")) return;
        const rv = relName(s.relation);
        if (!rv) return;
        const kind = s.kind;
        if (kind === "REINDEX_OBJECT_INDEX" && ctx.isNewIndex(rv.name)) return;
        if (kind === "REINDEX_OBJECT_TABLE" && ctx.isNewTable(s.relation)) return;
        const what = kind === "REINDEX_OBJECT_INDEX" ? `index \`${rv.display}\`` : kind === "REINDEX_OBJECT_TABLE" ? `every index of \`${rv.display}\`` : `\`${rv.display}\``;
        const lockText = kind === "REINDEX_OBJECT_INDEX" ? `holds \`SHARE\` on the table (every write waits) and \`ACCESS EXCLUSIVE\` on the index (every read that uses it waits)` : `holds \`SHARE\` on the table (every write waits) and \`ACCESS EXCLUSIVE\` on each index while it is rebuilt`;
        const fixed = stmt.text.replace(/^(REINDEX\s+(?:\(.*?\)\s+)?(?:INDEX|TABLE|SCHEMA|DATABASE|SYSTEM)\s+)/i, "$1CONCURRENTLY ");
        return {
          message: `\`REINDEX\` without \`CONCURRENTLY\` rebuilds ${what} while it ${lockText}, for the whole rebuild. Use \`REINDEX ${kind === "REINDEX_OBJECT_TABLE" ? "TABLE" : "INDEX"} CONCURRENTLY ${rv.display}\`, outside a transaction (PG003 checks that). Not needed if the index was created in this release.`,
          table: rv.display,
          fix: { kind: fixed !== stmt.text ? "suggestion" : "block", text: fixed }
        };
      }
      case "RefreshMatViewStmt": {
        if (s.concurrent || ctx.isNewTable(s.relation)) return;
        const view = ctx.tableName(s.relation);
        return {
          message: `\`REFRESH MATERIALIZED VIEW\` without \`CONCURRENTLY\` takes \`ACCESS EXCLUSIVE\` on \`${view}\` for the whole refresh: every read of the view waits. Use \`REFRESH MATERIALIZED VIEW CONCURRENTLY ${view}\`, which needs a unique index on the view and lets reads continue. Not needed if \`${view}\` is new in this release or nothing reads it yet.`,
          table: view,
          fix: { kind: "suggestion", text: stmt.text.replace(/^(REFRESH\s+MATERIALIZED\s+VIEW\s+)/i, "$1CONCURRENTLY ") }
        };
      }
      default:
        return;
    }
  }
};

// rules/pg/PG016-create-index-concurrently-if-not-exists/rule.ts
var rule16 = {
  id: "PG016",
  name: "create-index-concurrently-if-not-exists",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "IndexStmt") return;
    const s = stmt.inner;
    if (!s.concurrent || !s.if_not_exists) return;
    const table = ctx.tableName(s.relation);
    const name2 = s.idxname ?? "the index";
    const without = removeKeywords(stmt, ["IF", "NOT", "EXISTS"]);
    const fixed = without ? `DROP INDEX CONCURRENTLY IF EXISTS ${name2};
${without}` : void 0;
    return {
      message: `\`CREATE INDEX CONCURRENTLY IF NOT EXISTS\` skips the build when a previous concurrent build of \`${name2}\` failed and left it \`INVALID\`: the index exists by name, so nothing is rebuilt, writes keep maintaining it and queries on \`${table}\` never use it. Recover a failed build with \`DROP INDEX CONCURRENTLY IF EXISTS ${name2}\` and then \`CREATE INDEX CONCURRENTLY\` again (or \`REINDEX INDEX CONCURRENTLY\`), without \`IF NOT EXISTS\`. Not needed if the migration runner never retries a failed step; then \`IF NOT EXISTS\` only hides the invalid index.`,
      table,
      key: name2,
      fix: fixed ? { kind: "suggestion", text: fixed } : void 0
    };
  }
};

// rules/pg/PG017-serial-or-integer-primary-key/rule.ts
var SERIAL = /* @__PURE__ */ new Set(["serial", "serial4", "serial2", "smallserial"]);
var SMALL_INT = /* @__PURE__ */ new Set(["int4", "int2"]);
var rule17 = {
  id: "PG017",
  name: "serial-or-integer-primary-key",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "CreateStmt" && stmt.kind !== "AlterTableStmt") return;
    const results = [];
    for (const site of columnSites(stmt, ctx)) {
      if (!site.isPrimaryKey || site.origin === "alter-type") continue;
      const type = typeInfo(site.typeName);
      if (!type || type.isArray) continue;
      const serial = SERIAL.has(type.name);
      if (!serial && !SMALL_INT.has(type.name)) continue;
      const col = ident2(site.name);
      const replacement = serial ? "bigint GENERATED ALWAYS AS IDENTITY" : "bigint";
      const fixed = replaceTypeTokens(stmt, site.typeLocation, replacement);
      results.push({
        message: `\`${col} ${type.display} PRIMARY KEY\` on \`${site.table}\` is a 4-byte key${serial ? " with a separate sequence" : ""}: it stops at 2147483647 (inserts then fail with SQLSTATE \`2200H\`), and moving to \`bigint\` later rewrites the whole table. Declare it \`${col} ${replacement}\`: 4 more bytes per row, never runs out${serial ? ", and the SQL-standard identity refuses hand-written ids" : ""}. Not needed for a small lookup table that cannot reach 2 billion rows; suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: "suggestion", text: fixed } : void 0
      });
    }
    return results;
  }
};

// rules/pg/PG018-random-uuid-primary-key/rule.ts
var RANDOM_UUID = /* @__PURE__ */ new Set(["gen_random_uuid", "uuid_generate_v4", "uuidv4"]);
var rule18 = {
  id: "PG018",
  name: "random-uuid-primary-key",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "CreateStmt" && stmt.kind !== "AlterTableStmt") return;
    const results = [];
    for (const site of columnSites(stmt, ctx)) {
      if (!site.isPrimaryKey) continue;
      const type = typeInfo(site.typeName);
      if (!type || type.name !== "uuid") continue;
      const def = defaultExpr(site);
      const fn = funcName(def?.FuncCall);
      if (!fn || !RANDOM_UUID.has(fn)) continue;
      const col = ident2(site.name);
      const pg18 = ctx.config.postgresVersion >= 18;
      const fixed = pg18 && def?.FuncCall?.location !== void 0 ? replaceCallTokens(stmt, def.FuncCall.location, "uuidv7()") : void 0;
      results.push({
        message: `\`${col} uuid PRIMARY KEY DEFAULT ${fn}()\` on \`${site.table}\` inserts random keys all over the index: leaf pages split half full (about 65% density in the db-skills test) and the primary key index is over 30% larger than the same keys inserted in order, with every insert touching a random page. ` + (pg18 ? `Default it to \`uuidv7()\` (PostgreSQL 18+), which is time-ordered and fills pages like a \`bigint\` identity. ` : `Generate UUIDv7 in the application (PostgreSQL below 18 has no \`uuidv7()\`), or use \`bigint GENERATED ALWAYS AS IDENTITY\` when the id never leaves your system. `) + `Not needed if the id must not reveal creation order; then keep the random key and accept the index cost, or expose a random token in a separate column.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: "suggestion", text: fixed } : { kind: "block", text: `${col} uuid PRIMARY KEY DEFAULT uuidv7()  -- PostgreSQL 18+; below 18, generate UUIDv7 in the application` }
      });
    }
    return results;
  }
};

// rules/pg/PG019-timestamp-without-time-zone/rule.ts
var rule19 = {
  id: "PG019",
  name: "timestamp-without-time-zone",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "CreateStmt" && stmt.kind !== "AlterTableStmt") return;
    const results = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type || type.name !== "timestamp" || !type.builtin) continue;
      const col = ident2(site.name);
      const precision = type.typmods.length ? `(${type.typmods[0]})` : "";
      const fixed = replaceTypeTokens(stmt, site.typeLocation, `timestamptz${precision}`);
      results.push({
        message: `\`${col} ${type.display}\` on \`${site.table}\` is a timestamp without time zone: PostgreSQL "silently ignore[s] any time zone indication" on input, so the same instant written from two sessions with different \`TimeZone\` settings is stored as two values (12 hours apart in the db-skills test). Declare it \`timestamptz${precision}\`: stored as UTC, same 8 bytes, converted on output to the session's zone. Not needed for a wall-clock value that is deliberately zone-free (a store's opening time, a recurring local alarm); suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: "suggestion", text: fixed } : void 0
      });
    }
    return results;
  }
};

// rules/pg/PG020-json-column/rule.ts
var rule20 = {
  id: "PG020",
  name: "json-column",
  severity: "warning",
  defaultOn: true,
  check(stmt, ctx) {
    if (stmt.kind !== "CreateStmt" && stmt.kind !== "AlterTableStmt") return;
    const results = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type || type.name !== "json") continue;
      const col = ident2(site.name);
      const fixed = replaceTypeTokens(stmt, site.typeLocation, `jsonb${type.isArray ? "" : ""}`);
      results.push({
        message: `\`${col} json\` on \`${site.table}\` stores the input text as is: it keeps duplicate keys, is reparsed on every read, cannot be indexed with GIN and has no \`=\` operator (SQLSTATE \`42883\` in the db-skills test). Declare it \`jsonb\`, which keeps the last duplicate key, supports indexing and comparison, and is what "most applications should prefer". Not needed for a payload kept byte for byte for audit (key order and duplicates preserved); suppress with that reason.`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: fixed ? { kind: "suggestion", text: fixed } : void 0
      });
    }
    return results;
  }
};

// rules/pg/PG021-varchar-or-char-length/rule.ts
var rule21 = {
  id: "PG021",
  name: "varchar-or-char-length",
  severity: "info",
  defaultOn: false,
  check(stmt, ctx) {
    if (stmt.kind !== "CreateStmt" && stmt.kind !== "AlterTableStmt") return;
    const results = [];
    for (const site of columnSites(stmt, ctx)) {
      const type = typeInfo(site.typeName);
      if (!type) continue;
      const isVarcharN = type.name === "varchar" && type.typmods.length > 0;
      const isChar = type.name === "bpchar";
      if (!isVarcharN && !isChar) continue;
      const col = ident2(site.name);
      const n = type.typmods[0];
      const constraint = `${site.table.replace(/^.*\./, "")}_${col}_len`;
      results.push({
        message: `\`${col} ${type.display}\` on \`${site.table}\` enforces only a maximum: it still accepts \`''\`, an explicit cast silently truncates to ${n ?? "n"} characters, and shrinking the limit later rewrites the table${isChar ? "; `char(n)` also pads with spaces and is the slowest of the three string types" : ""}. Declare it \`text\` with a named check, \`CONSTRAINT ${constraint} CHECK (char_length(${col}) BETWEEN 1 AND ${n ?? "n"})\`, which states the real rule and can be changed with \`NOT VALID\` then \`VALIDATE\` and no rewrite. Not needed when the limit is a real business rule the team keeps deliberately, or for fixed-length codes from a standard (then prefer \`text\` with a regular-expression check).`,
        table: site.table,
        key: col,
        line: stmt.lineAt(site.location),
        fix: { kind: "block", text: `${col} text,
CONSTRAINT ${constraint} CHECK (char_length(${col}) BETWEEN 1 AND ${n ?? "n"})` }
      });
    }
    return results;
  }
};

// src/generated/rules-index.ts
var rules = [
  rule,
  rule2,
  rule3,
  rule4,
  rule5,
  rule6,
  rule7,
  rule8,
  rule9,
  rule10,
  rule11,
  rule12,
  rule13,
  rule14,
  rule15,
  rule16,
  rule17,
  rule18,
  rule19,
  rule20,
  rule21
];
var catalog = [
  {
    "id": "PG001",
    "name": "create-index-not-concurrently",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG001-create-index-not-concurrently",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L99-L104",
      "https://www.postgresql.org/docs/18/sql-createindex.html"
    ],
    "verified": "2026-10-19",
    "title": "PG001: `CREATE INDEX` without `CONCURRENTLY` on an existing table",
    "help": '## What it detects\n\n`CREATE INDEX` or `CREATE UNIQUE INDEX` without `CONCURRENTLY`, on a table that is not created in the same migration set (this file plus every other added migration file of the PR).\n\n## Why it matters\n\nA plain `CREATE INDEX` "locks out writes (but not reads) on the table until it\'s done" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). The db-skills bad example shows `pg_locks` for the session running `CREATE INDEX orders_created_at_idx ON orders (created_at)`: it holds `ShareLock` on `orders` for the whole build, and `SHARE` conflicts with the `ROW EXCLUSIVE` lock every `INSERT`, `UPDATE` and `DELETE` needs. On a table with traffic, every write waits for as long as the build takes.\n\n## The fix\n\n```sql\nCREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at);\n```\n\nRun it outside a transaction block (PG003 checks that). If the build fails, drop the invalid index with `DROP INDEX CONCURRENTLY IF EXISTS` and build again; never retry with `IF NOT EXISTS` (PG016).\n\n## When it does not apply\n\n- The table is created in the same migration set (`CREATE TABLE` in this file or in another added migration file of the PR): nothing reads it yet, so the lock costs nothing. The detector tracks the created tables across the PR.\n- The statement already says `CONCURRENTLY`.\n- A partitioned parent table: `CREATE INDEX CONCURRENTLY` is not supported on the parent, so the documented way is to build the index concurrently on each partition and then create the parent index without `CONCURRENTLY`. The detector cannot see that a table is partitioned; suppress with a reason that says so.\n- An empty table or an agreed maintenance window: suppress with a reason (`-- lurie-guard: ignore PG001 reason="..."`).',
    "messageTemplate": "`CREATE INDEX` holds a `SHARE` lock on `orders` for the whole build; every insert, update and delete on `orders` waits. Build it with `CREATE INDEX CONCURRENTLY orders_created_at_idx ON orders (created_at)`, outside a transaction (PG003 checks that). Not needed if `orders` is new in this release or empty. (PG001, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L99-L104))"
  },
  {
    "id": "PG002",
    "name": "drop-index-not-concurrently",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG002-drop-index-not-concurrently",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L142-L153",
      "https://www.postgresql.org/docs/18/sql-dropindex.html"
    ],
    "verified": "2026-10-19",
    "title": "PG002: `DROP INDEX` without `CONCURRENTLY`",
    "help": '## What it detects\n\n`DROP INDEX` without `CONCURRENTLY`, where the index is not created in the same migration set (a `CREATE INDEX` or a `UNIQUE`/`PRIMARY KEY` constraint of that name in this file or in another added migration file of the PR).\n\n## Why it matters\n\n"A normal `DROP INDEX` acquires an exclusive lock on the table, blocking other accesses until the index drop can be completed" ([DROP INDEX](https://www.postgresql.org/docs/18/sql-dropindex.html)). The db-skills bad example drops `orders_created_at_idx` inside a transaction and shows `pg_locks` for the session: `AccessExclusiveLock` on `orders`, the table, not only on the index. A plain `SELECT count(*) FROM orders` from another session with `lock_timeout = 200ms` fails with SQLSTATE `55P03` behind it. In production the drop itself first queues behind every running query on the table, and from then on every new query queues behind the drop.\n\n## The fix\n\n```sql\nDROP INDEX CONCURRENTLY orders_created_at_idx;\n```\n\n`DROP INDEX CONCURRENTLY` "waits until conflicting transactions have completed" instead of blocking them. It takes one index name per statement, cannot run inside a transaction block (PG003 checks that), and does not support `CASCADE`.\n\n## When it does not apply\n\n- The index is created in the same migration set (a failed build being retried, or an index the PR itself adds and removes): nothing uses it yet. The detector tracks index names created by `CREATE INDEX` and by `UNIQUE`/`PRIMARY KEY` constraints across the added files.\n- The statement already says `CONCURRENTLY`.\n- An index on a partitioned table: "indexes on partitioned tables cannot be dropped using this option". Suppress with a reason that says so.',
    "messageTemplate": "`DROP INDEX` takes an `ACCESS EXCLUSIVE` lock on the table of `orders_created_at_idx` until the transaction commits: it waits for every running query on the table, and every query that arrives after it waits for the drop. Drop it with `DROP INDEX CONCURRENTLY` (one index per statement), outside a transaction (PG003 checks that). Not needed if the index was created in this release. (PG002, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L142-L153))"
  },
  {
    "id": "PG003",
    "name": "concurrently-inside-transaction",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG003-concurrently-inside-transaction",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/good/test.sql#L129-L131",
      "https://www.postgresql.org/docs/18/sql-createindex.html"
    ],
    "verified": "2026-10-19",
    "title": "PG003: `CONCURRENTLY` inside a transaction",
    "help": '## What it detects\n\n`CREATE INDEX CONCURRENTLY`, `DROP INDEX CONCURRENTLY`, `REINDEX ... CONCURRENTLY` or `REFRESH MATERIALIZED VIEW CONCURRENTLY` inside an explicit `BEGIN` block, or in a file that the migration framework wraps in a transaction without the framework\'s opt-out (Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate, Sqitch, goose; see the table in [SPEC-MVP.md](../../../docs/SPEC-MVP.md)).\n\n## Why it matters\n\n`CREATE INDEX CONCURRENTLY` "cannot" run "within a transaction block" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). The db-skills good example runs it from inside a function, which is a transaction block, and asserts SQLSTATE `25001` (`active_sql_transaction`). The migration fails at deploy time, and in most frameworks the failed migration leaves the deploy half done.\n\n## The fix\n\nRun the statement outside a transaction. How depends on the framework:\n\n```text\ngoose      -- +goose NO TRANSACTION at the top of the file\nFlyway     <file>.sql.conf with executeInTransaction=false\nLiquibase  --changeset author:id runInTransaction:false\nRails      disable_ddl_transaction! in the migration class\nDjango     atomic = False on the Migration class\nAlembic    with op.get_context().autocommit_block():\ndbmate     -- migrate:up transaction:false\nPrisma     no opt-out: run it outside Prisma Migrate\nPlain SQL  move it outside the BEGIN ... COMMIT block\n```\n\n## When it does not apply\n\n- The file is not wrapped: a plain SQL folder run statement by statement (golang-migrate, or `transaction: never` in `.lurie-guard.yml`), a Flyway migration with `executeInTransaction=false`, a Rails migration with `disable_ddl_transaction!`, a Django migration with `atomic = False`, an Alembic step in `autocommit_block()`, a dbmate section with `transaction:false`, a Liquibase changeset with `runInTransaction:false`, a goose file with `-- +goose NO TRANSACTION`.\n- The statement is outside the explicit `BEGIN` ... `COMMIT` block of the file.',
    "messageTemplate": "`CREATE INDEX CONCURRENTLY` cannot run inside a transaction block: PostgreSQL rejects it with SQLSTATE `25001` and the migration fails. This statement runs in a file flyway wraps in a transaction. Fix: Flyway: create `<file>.sql.conf` next to the migration with `executeInTransaction=false`. No exception: the statement never works inside a transaction. (PG003, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/good/test.sql#L129-L131))"
  },
  {
    "id": "PG004",
    "name": "ddl-without-lock-timeout",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG004-ddl-without-lock-timeout",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L24-L49",
      "https://www.postgresql.org/docs/18/runtime-config-client.html#GUC-LOCK-TIMEOUT"
    ],
    "verified": "2026-10-19",
    "title": "PG004: DDL that takes a heavy lock without `SET lock_timeout`",
    "help": "## What it detects\n\nA statement that takes an `ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE` lock on an existing table (`ALTER TABLE` other than `VALIDATE CONSTRAINT` alone, including `RENAME COLUMN` and `RENAME TO`; `DROP TABLE`; `DROP INDEX` without `CONCURRENTLY`; `TRUNCATE`; `CLUSTER`; `VACUUM FULL`; `REINDEX` without `CONCURRENTLY`; `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`; `LOCK TABLE` in `SHARE ROW EXCLUSIVE` mode or above) when no `SET lock_timeout` or `SET LOCAL lock_timeout` with a non-zero value appears earlier in the file, and the config does not say the runner sets it (`lock_timeout_set_by_runner: true`).\n\n## Why it matters\n\n`lock_timeout` defaults to `0`, which disables it, and \"a transaction seeking either a table-level or row-level lock will wait indefinitely for conflicting locks to be released\" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html), [lock_timeout](https://www.postgresql.org/docs/18/runtime-config-client.html#GUC-LOCK-TIMEOUT)). The db-skills bad example holds a report's `ACCESS SHARE` lock on `orders` in one session and runs `ALTER TABLE orders ADD COLUMN note text` in another: the `ALTER` queues for its `ACCESS EXCLUSIVE` lock, and a plain `SELECT count(*) FROM orders WHERE id = 1` that arrives next is blocked behind the waiting `ALTER` (it fails with `55P03` after the 500 ms the test allows it). In production that read hangs for as long as the report runs. The statement list follows the manual: \"an ACCESS EXCLUSIVE lock is acquired unless explicitly noted\" for every `ALTER TABLE` form, renames included ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and `ACCESS EXCLUSIVE` is \"acquired by the DROP TABLE, TRUNCATE, REINDEX, CLUSTER, VACUUM FULL, and REFRESH MATERIALIZED VIEW (without CONCURRENTLY) commands\" and by `LOCK TABLE` by default ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)). The good example sets `lock_timeout = '1s'`: the `ALTER` fails fast with `55P03`, traffic keeps flowing, and the retry after the report commits succeeds at once.\n\n## The fix\n\n```sql\nSET lock_timeout = '2s';   -- a few seconds; the docs give no figure\nALTER TABLE orders ADD COLUMN note text;\n-- retry the step on SQLSTATE 55P03 with backoff\n```\n\nInside a transaction, `SET LOCAL lock_timeout` scopes it to that transaction. Commit each heavy-lock step on its own; locks are held until the end of the transaction.\n\n## When it does not apply\n\n- `SET lock_timeout` or `SET LOCAL lock_timeout` with a non-zero value appears earlier in the file; `SET lock_timeout = 0` and `RESET lock_timeout` turn the timeout off again.\n- The migration runner sets `lock_timeout` for every session (a connection option, `ALTER ROLE ... SET lock_timeout`, Rails' `config.active_record.postgresql_adapter...`, a Flyway `initSql`): set `lock_timeout_set_by_runner: true` in `.lurie-guard.yml` and the rule is silent.\n- The table is created in the same migration set.\n- An `ALTER TABLE` whose only subcommand is `VALIDATE CONSTRAINT` takes `SHARE UPDATE EXCLUSIVE`, which does not block reads or writes.",
    "messageTemplate": "`ALTER TABLE` waits for a heavy lock (`ACCESS EXCLUSIVE` or `SHARE ROW EXCLUSIVE`) on `orders` with `lock_timeout` at its default of 0 (wait forever): it queues behind any long transaction, and every query that arrives after it queues behind the DDL. Run `SET lock_timeout = '2s'` (or `SET LOCAL` inside the transaction) before the first DDL and retry on SQLSTATE `55P03`. Not needed when your migration runner sets `lock_timeout` for every session: say so with `lock_timeout_set_by_runner: true` in `.lurie-guard.yml`. (PG004, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L24-L49))"
  },
  {
    "id": "PG005",
    "name": "add-column-rewrites-table",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG005-add-column-rewrites-table",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L51-L60",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG005: `ADD COLUMN` that rewrites the table",
    "help": "## What it detects\n\n`ALTER TABLE ... ADD COLUMN` on an existing table with a volatile `DEFAULT` (`clock_timestamp()`, `random()`, `gen_random_uuid()`, `uuidv7()`, `nextval()`, a subquery, or any function not in the detector's list of built-in stable and immutable functions), a `GENERATED ... STORED` column, or a `GENERATED ... AS IDENTITY` column.\n\n## Why it matters\n\n\"Adding a column with a volatile `DEFAULT` (e.g., `clock_timestamp()`), a stored generated column, an identity column, or a column with a domain data type that has constraints will cause the entire table and its indexes to be rewritten\" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)). The db-skills bad example adds `created_at timestamptz NOT NULL DEFAULT clock_timestamp()` to `orders` (100,000 rows) and asserts that `pg_relation_filenode('orders')` and `pg_relation_filenode('orders_pkey')` both change: a full copy of the table and its indexes, under `ACCESS EXCLUSIVE`, which blocks reads and writes for the whole copy and \"temporarily require[s] as much as double the disk space\". A constant default is metadata-only: the good example adds `status text NOT NULL DEFAULT 'new'` and the filenode stays.\n\n## The fix\n\n```sql\nALTER TABLE orders ADD COLUMN created_at timestamptz;\nALTER TABLE orders ALTER COLUMN created_at SET DEFAULT clock_timestamp();  -- new rows only\n-- backfill the existing rows in batches, each batch its own transaction\n-- then, if the column must be NOT NULL: the validated-CHECK path (PG007)\n```\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- The default is a constant or a call to a stable or immutable built-in (`now()`, `current_timestamp`, `lower(...)`, `coalesce(...)`): PostgreSQL evaluates it once and stores it in the metadata, no rewrite.\n- A user-defined function marked `IMMUTABLE` or `STABLE`: the detector cannot see function volatility from the diff, so it treats unknown functions as volatile; suppress with a reason that names the function's volatility.\n- A domain type with constraints also rewrites the table, but the detector cannot see domain definitions; not detected.",
    "messageTemplate": "`ADD COLUMN created_at` rewrites every row of `orders` and rebuilds all its indexes under `ACCESS EXCLUSIVE` (`pg_relation_filenode` changes): `DEFAULT clock_timestamp()` is volatile, so every existing row gets its own value and the table is rewritten. Add the column nullable, set the default separately so only new rows get it, and backfill the existing rows in batches. Not needed if `orders` is new in this release or empty. (PG005, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L51-L60))"
  },
  {
    "id": "PG006",
    "name": "add-column-not-null-without-default",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG006-add-column-not-null-without-default",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L117-L123",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG006: `ADD COLUMN ... NOT NULL` without a default on an existing table",
    "help": "## What it detects\n\n`ALTER TABLE ... ADD COLUMN ... NOT NULL` with no `DEFAULT`, no identity, no generated expression and not a `serial` type, on a table that is not created in the same migration set.\n\n## Why it matters\n\nNothing gives the existing rows a value, so the statement cannot succeed on a table with rows. The db-skills bad example runs `ALTER TABLE orders ADD COLUMN sku text NOT NULL` on the 100,000-row `orders` and asserts SQLSTATE `23502` (`not_null_violation`, \"column contains null values\"): the migration aborts at deploy time, after taking `ACCESS EXCLUSIVE` on the table to find that out. It passes on the empty database of the test suite, which is why it reaches review. With a constant default the column is metadata-only: \"the default value is evaluated at the time of the statement and the result stored in the table's metadata\" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); the good example adds `status text NOT NULL DEFAULT 'new'` and the filenode stays.\n\n## The fix\n\n```sql\nALTER TABLE orders ADD COLUMN sku text NOT NULL DEFAULT 'unknown';\n```\n\nOr, when no constant makes sense: add it nullable, backfill in batches, then make it `NOT NULL` through a validated `CHECK` (PG007).\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- The column has a `DEFAULT` (a volatile one is PG005), is an identity column, a generated column or a `serial`: each gives every row a value (identity and generated rewrite the table, PG005).\n- The column is a `PRIMARY KEY` in the same clause: the key fails for other reasons on a non-empty table (PG012 and PG017 apply).",
    "messageTemplate": "`ADD COLUMN sku ... NOT NULL` without a default fails on any table that has rows: nothing fills the existing rows of `orders`, so PostgreSQL rejects the statement with SQLSTATE `23502` and the migration aborts. Add it with a constant default (`NOT NULL DEFAULT <constant>`: metadata-only, no rewrite), or add it nullable, backfill in batches, then `SET NOT NULL` through a validated `CHECK` (PG007). Not needed if `orders` is new in this release or empty. (PG006, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L117-L123))"
  },
  {
    "id": "PG007",
    "name": "set-not-null-without-check",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG007-set-not-null-without-check",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L87-L97",
      "db-skills/skills/pg-online-migrations/examples/good/test.sql#L104-L118",
      "https://www.postgresql.org/docs/15/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG007: `SET NOT NULL` without a validated `CHECK (col IS NOT NULL)`",
    "help": '## What it detects\n\n`ALTER TABLE ... ALTER COLUMN ... SET NOT NULL` on an existing table, when no `CHECK (col IS NOT NULL)` constraint on that column was added and validated earlier in the migration set. With `postgres_version: 18` or above in `.lurie-guard.yml`, a `NOT NULL ... NOT VALID` constraint on the column that was then validated also satisfies the rule.\n\n## Why it matters\n\n`SET NOT NULL` scans the whole table under `ACCESS EXCLUSIVE`; "however, if a valid `CHECK` constraint exists (and is not dropped in the same command) which proves no `NULL` can exist, then the table scan is skipped" ([ALTER TABLE 15](https://www.postgresql.org/docs/15/sql-altertable.html)). The db-skills examples count sequential scans of `orders` inside the transaction: the bare `SET NOT NULL` adds one scan of the 100,000 rows while `pg_locks` shows `AccessExclusiveLock` on `orders` (bad example); after a validated check, zero scans (good example). The `VALIDATE CONSTRAINT` step takes only `SHARE UPDATE EXCLUSIVE`, so writes continue while it scans. On PostgreSQL 18 the not-null constraint itself can be added `NOT VALID` and validated under the same weak lock, after which `pg_attribute.attnotnull` is true.\n\n## The fix\n\nPostgreSQL 15 to 17:\n\n```sql\nALTER TABLE orders ADD CONSTRAINT orders_amount_not_null CHECK (amount IS NOT NULL) NOT VALID;  -- catalog only, commit at once\nALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;  -- separate transaction, writes continue\nALTER TABLE orders ALTER COLUMN amount SET NOT NULL;  -- skips the scan\nALTER TABLE orders DROP CONSTRAINT orders_amount_not_null;\n```\n\nPostgreSQL 18:\n\n```sql\nALTER TABLE orders ADD CONSTRAINT orders_amount_not_null NOT NULL amount NOT VALID;\nALTER TABLE orders VALIDATE CONSTRAINT orders_amount_not_null;\n```\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- A `CHECK (col IS NOT NULL)` on the column was added (with or without `NOT VALID`) and validated earlier in this file or in an earlier added file of the PR. The detector tracks constraints by name across `ADD CONSTRAINT` and `VALIDATE CONSTRAINT`.\n- `postgres_version: 18` or above, and a `NOT NULL ... NOT VALID` constraint on the column was validated earlier. On the default `postgres_version: 15` that path is reported, because the syntax does not exist there.\n- A `NOT NULL` added together with the column (`ADD COLUMN ... NOT NULL DEFAULT ...`) is not this statement shape (PG006 covers it).',
    "messageTemplate": "`SET NOT NULL` scans every row of `orders` to check `amount` while it holds `ACCESS EXCLUSIVE`: reads and writes wait for the whole scan. Add `CHECK (amount IS NOT NULL) NOT VALID` first, `VALIDATE CONSTRAINT` it in a separate transaction (writes continue), then `SET NOT NULL` skips the scan. Not needed if `orders` is new in this release or empty. (PG007, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L87-L97))"
  },
  {
    "id": "PG008",
    "name": "foreign-key-without-not-valid",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG008-foreign-key-without-not-valid",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L69-L85",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG008: `ADD FOREIGN KEY` without `NOT VALID`",
    "help": '## What it detects\n\n`ALTER TABLE ... ADD [CONSTRAINT name] FOREIGN KEY (...) REFERENCES ...` without `NOT VALID`, on a table that is not created in the same migration set.\n\n## Why it matters\n\n`ADD FOREIGN KEY` takes `SHARE ROW EXCLUSIVE` on the table and on the referenced table ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and in one step it also validates every existing row under that lock. The db-skills bad example adds `orders_account_id_fkey` on the 100,000-row `orders` inside a transaction and asserts that the statement scanned `orders` (`xact_seq_scans` grows), that `pg_locks` shows `ShareRowExclusiveLock` on `accounts` as well, and that an `INSERT INTO accounts` from another session fails with `55P03`: a signup is blocked by a migration on `orders`. With `NOT VALID` the same lock is held only for the catalog change; `VALIDATE CONSTRAINT` then "acquires a `SHARE UPDATE EXCLUSIVE` lock" and a `ROW SHARE` lock on the referenced table, so it "does not need to lock out concurrent updates" (good example, `pg_locks` asserted).\n\n## The fix\n\n```sql\nALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey\n  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;\n-- separate transaction (a separate migration where the tool wraps files):\nALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;\n```\n\n## When it does not apply\n\n- The table is created in the same migration set: no rows to validate.\n- The constraint already says `NOT VALID` (PG010 then checks that the `VALIDATE` is not in the same transaction).\n- A column-level `REFERENCES` inside `ADD COLUMN`: the new column is all `NULL`, so there is nothing to validate; not this statement shape.\n- Partitioned tables need PostgreSQL 18 or above for `NOT VALID` foreign keys; on older majors, suppress with a reason.',
    "messageTemplate": "`ADD FOREIGN KEY` validates every row of `orders` while it holds `SHARE ROW EXCLUSIVE` on `orders` and on `accounts`: writes on both tables wait for the whole scan. Add it with `NOT VALID` (catalog only), then `ALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey` in a separate transaction, which takes only `SHARE UPDATE EXCLUSIVE` and lets writes continue. Not needed if `orders` is new in this release or empty. (PG008, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L69-L85))"
  },
  {
    "id": "PG009",
    "name": "check-without-not-valid",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG009-check-without-not-valid",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/good/test.sql#L96-L102",
      "db-skills/skills/pg-keys-and-types/examples/good/test.sql#L61-L67",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG009: `ADD CHECK` without `NOT VALID`",
    "help": '## What it detects\n\n`ALTER TABLE ... ADD [CONSTRAINT name] CHECK (...)` without `NOT VALID`, on a table that is not created in the same migration set.\n\n## Why it matters\n\n`ALTER TABLE ... ADD CONSTRAINT` takes `ACCESS EXCLUSIVE` ("an `ACCESS EXCLUSIVE` lock is acquired unless explicitly noted", [ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), and without `NOT VALID` it scans every row under that lock: reads and writes wait for the whole scan. The db-skills good example shows the alternative measured: `ADD CONSTRAINT ... CHECK (...) NOT VALID` holds `AccessExclusiveLock` only for the catalog change (`pg_locks` asserted, commit at once), and `VALIDATE CONSTRAINT` then runs under `SHARE UPDATE EXCLUSIVE`, which does not block reads or writes. The pg-keys-and-types good example swaps a `CHECK` with `NOT VALID` then `VALIDATE` on a live table and asserts that the table\'s filenode does not change.\n\n## The fix\n\n```sql\nALTER TABLE orders ADD CONSTRAINT orders_amount_check CHECK (amount >= 0) NOT VALID;\n-- separate transaction (a separate migration where the tool wraps files):\nALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check;\n```\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- The constraint already says `NOT VALID` (PG010 then checks that the `VALIDATE` is not in the same transaction).\n- A `CHECK` inside `ADD COLUMN` (a column constraint on a new column) is not this statement shape.',
    "messageTemplate": "`ADD CHECK` scans every row of `orders` to validate the constraint while it holds `ACCESS EXCLUSIVE`: reads and writes wait for the whole scan. Add it with `NOT VALID` (catalog only, milliseconds under the same lock), then `ALTER TABLE orders VALIDATE CONSTRAINT orders_amount_check` in a separate transaction, which takes only `SHARE UPDATE EXCLUSIVE`. Not needed if `orders` is new in this release or empty. (PG009, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/good/test.sql#L96-L102))"
  },
  {
    "id": "PG010",
    "name": "validate-in-same-transaction",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG010-validate-in-same-transaction",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L69-L85",
      "db-skills/skills/pg-online-migrations/examples/good/test.sql#L74-L91",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG010: `VALIDATE CONSTRAINT` in the same transaction as the `NOT VALID` add",
    "help": '## What it detects\n\n`ALTER TABLE ... VALIDATE CONSTRAINT name` in the same transaction as the `ALTER TABLE ... ADD CONSTRAINT name ... NOT VALID` that created it: inside the same explicit `BEGIN` block, or in the same file when the framework wraps the file in one transaction (Flyway, Liquibase, Rails, Django, Alembic, Prisma, dbmate, Sqitch, or `transaction: always`).\n\n## Why it matters\n\nLocks are "held until the end of the transaction" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)). `ADD FOREIGN KEY ... NOT VALID` takes `SHARE ROW EXCLUSIVE` on both tables and `ADD CHECK ... NOT VALID` takes `ACCESS EXCLUSIVE`; when `VALIDATE` runs in the same transaction, its full scan happens while that lock is still held, which is exactly the one-step foreign key the db-skills bad example measures: a scan of `orders` under the lock and an `INSERT INTO accounts` from another session failing with `55P03`. The good example commits between the two steps and asserts that `VALIDATE` holds only `ShareUpdateExclusiveLock` on `orders` and `RowShareLock` on `accounts`, so writes continue.\n\n## The fix\n\n```sql\nALTER TABLE orders ADD CONSTRAINT orders_account_id_fkey\n  FOREIGN KEY (account_id) REFERENCES accounts (id) NOT VALID;\nCOMMIT;\nBEGIN;\nALTER TABLE orders VALIDATE CONSTRAINT orders_account_id_fkey;\n```\n\nWhere the framework wraps each file in a transaction, put the `VALIDATE` in the next migration file, or use the framework\'s opt-out so the file runs statement by statement.\n\n## When it does not apply\n\n- The `ADD ... NOT VALID` and the `VALIDATE` are in different transactions: different files, or a `COMMIT` between them in a file that is not wrapped.\n- The table is created in the same migration set.\n- The constraint being validated was not added `NOT VALID` in this file (the detector only knows constraints it saw).',
    "messageTemplate": "`VALIDATE CONSTRAINT orders_account_id_fkey` runs in the same transaction as the `ADD ... NOT VALID` that created it (the same `BEGIN` block), so the full scan of `orders` runs while the `SHARE ROW EXCLUSIVE` on both tables lock from the `ADD` is still held: `NOT VALID` bought nothing. Commit after the `ADD` and validate in its own transaction: move it outside the `BEGIN` ... `COMMIT` block. Not needed if `orders` is new in this release or empty. (PG010, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L69-L85))"
  },
  {
    "id": "PG011",
    "name": "alter-column-type-rewrites",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG011-alter-column-type-rewrites",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L62-L67",
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L47-L52",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG011: `ALTER COLUMN ... TYPE` that rewrites the table",
    "help": '## What it detects\n\n`ALTER TABLE ... ALTER COLUMN ... TYPE` on a table that is not created in the same migration set. The detector sees only the new type, not the column\'s current type, so it reports every retype of an existing table and names the binary-coercible cases in the message.\n\n## Why it matters\n\nA type change "will normally cause the entire table and its indexes to be rewritten", unless the old type is binary coercible to the new one and there is no `USING` clause ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); rebuilds "temporarily require as much as double the disk space". The db-skills bad examples assert it twice with `pg_relation_filenode`: `int` to `bigint` on the 100,000-row `orders`, and `varchar(20)` to `varchar(10)` on `customers`, both write a new copy of the table under `ACCESS EXCLUSIVE`, which blocks reads and writes for the whole copy.\n\nThe severity is `warning` in the MVP, not `error`, although the cost is measured: the detector sees only the new type, and a binary-coercible retype (`varchar(50)` to `text`) is a safe change that the rule cannot tell apart from a rewrite without a schema snapshot. An `error` must never fire on a safe change ([RULES.md](../../../docs/RULES.md), "False positives"). The rule goes back to `error` once a schema snapshot input exists ([ROADMAP.md](../../../docs/ROADMAP.md)). The cost fixture (`fixtures/cost/test.sql`) stays and keeps running.\n\n## The fix\n\nExpand/contract across releases:\n\n```sql\nALTER TABLE orders ADD COLUMN account_id_new bigint;\n-- dual-write account_id and account_id_new from the application; backfill in batches\n-- switch reads to account_id_new; then, in a later release:\nALTER TABLE orders DROP COLUMN account_id;\nALTER TABLE orders RENAME COLUMN account_id_new TO account_id;\n```\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- The current type is binary-coercible to the new one: `varchar(n)` to a larger or unbounded `varchar` or to `text`, `numeric(p,s)` to a larger `p` with the same `s`, `timestamp(p)` to a larger precision. The detector cannot see the current type from the diff, so these are reported; suppress with a reason that names the current type (`-- lurie-guard: ignore PG011 reason="varchar(50) to varchar(200), binary-coercible"`).\n- A small lookup table that fits in a few pages: the rewrite takes milliseconds; suppress with a reason, and keep `lock_timeout` set (PG004).',
    "messageTemplate": "`ALTER COLUMN account_id TYPE bigint` rewrites every row of `orders` and rebuilds all its indexes under `ACCESS EXCLUSIVE` (`pg_relation_filenode` changes), unless the current type is binary-coercible to the new one. Change the type with expand/contract: add a new column of type bigint, dual-write, backfill in batches, switch reads, drop the old column in a later release. Not needed if `orders` is new in this release or empty, or if the current type is binary-coercible (varchar(n) to a larger or unbounded varchar or to text, numeric(p,s) to a larger p, timestamp(p) to a larger p): then suppress with a reason that names the current type. (PG011, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L62-L67))"
  },
  {
    "id": "PG012",
    "name": "unique-or-pk-without-using-index",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG012-unique-or-pk-without-using-index",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L125-L140",
      "db-skills/skills/pg-online-migrations/examples/good/test.sql#L146-L151",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG012: `ADD UNIQUE` / `ADD PRIMARY KEY` without `USING INDEX`",
    "help": '## What it detects\n\n`ALTER TABLE ... ADD [CONSTRAINT name] UNIQUE (...)` or `PRIMARY KEY (...)` without `USING INDEX`, on a table that is not created in the same migration set.\n\n## Why it matters\n\nWithout a prebuilt index, `ADD CONSTRAINT` builds the unique index itself inside the `ALTER TABLE`, which holds `ACCESS EXCLUSIVE`. The db-skills bad example adds `UNIQUE (email)` on `accounts` inside a transaction and asserts that the statement scanned the table (`xact_seq_scans` grows), that `pg_locks` shows `AccessExclusiveLock,ShareLock` on `accounts` until commit, and that an `INSERT INTO accounts` from another session fails with `55P03`. `ADD CONSTRAINT ... USING INDEX` over an index built with `CREATE UNIQUE INDEX CONCURRENTLY` "is a fast operation" ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)); the good example does it and asserts that the constraint enforces uniqueness (`23505`).\n\n## The fix\n\n```sql\nCREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);  -- outside a transaction\nALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE USING INDEX accounts_email_idx;\n```\n\nFor a `PRIMARY KEY`, the key columns must already be `NOT NULL` (PG007), or `USING INDEX` runs `SET NOT NULL` with its full scan. The index must be a plain b-tree with default sort order, not partial and without expressions, and the form is not available on partitioned tables.\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- The constraint already says `USING INDEX`.\n- A partitioned table: `USING INDEX` is not available; suppress with a reason.',
    "messageTemplate": "`ADD UNIQUE` builds the unique index itself while it holds `ACCESS EXCLUSIVE` on `accounts` (plus the build's `SHARE`): it scans the table and every read and write waits for the whole build. Build the index first with `CREATE UNIQUE INDEX CONCURRENTLY accounts_email_key_idx ON accounts (email)`, then `ALTER TABLE accounts ADD CONSTRAINT accounts_email_key UNIQUE USING INDEX accounts_email_key_idx`, a catalog change. Not needed if `accounts` is new in this release or empty. (PG012, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L125-L140))"
  },
  {
    "id": "PG013",
    "name": "rename-in-one-step",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG013-rename-in-one-step",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/SKILL.md#L51",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG013: `RENAME COLUMN` / `RENAME TO` in one step",
    "help": '## What it detects\n\n`ALTER TABLE ... RENAME COLUMN old TO new` and `ALTER TABLE ... RENAME TO new` on a table that is not created in the same migration set.\n\n## Why it matters\n\nThe rename itself is a catalog change, but "the previous release keeps serving while and after the migration runs", and "a one-step `RENAME COLUMN` or `DROP COLUMN` breaks every query of that code when it commits" (pg-online-migrations, rule 8). Every `SELECT`, `INSERT` or `UPDATE` of the running release that names the old column fails with `42703` (undefined column) from the commit until the new release is fully deployed; with a rolling deploy that window is minutes. There is no measured fixture for the application-side failure, so the severity is `warning`.\n\n## The fix\n\nExpand/contract across releases:\n\n```sql\nALTER TABLE orders ADD COLUMN customer_id bigint;\n-- release N: dual-write account_id and customer_id, backfill in batches\n-- release N+1: read customer_id\nALTER TABLE orders DROP COLUMN account_id;  -- release N+2\n```\n\nFor a table rename, create a view with the old name over the new table during the transition, or the reverse.\n\n## When it does not apply\n\n- The table is created in the same migration set.\n- No running code uses the old name (a column nobody reads, a table only the migration touches): suppress with a reason that names the release that stopped using it.',
    "messageTemplate": "`RENAME COLUMN account_id TO customer_id` breaks every query of the running release that reads or writes `orders.account_id` the moment it commits, and the old release keeps serving until the deploy finishes. Use expand/contract: add `customer_id`, dual-write both columns, backfill, switch reads to `customer_id`, then drop `account_id` in a later release. Not needed if `orders` is new in this release, or if no running code reads `account_id`: suppress with the reason naming that release. (PG013, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/SKILL.md#L51))"
  },
  {
    "id": "PG014",
    "name": "drop-column-or-table",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG014-drop-column-or-table",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/SKILL.md#L51",
      "https://www.postgresql.org/docs/18/sql-altertable.html"
    ],
    "verified": "2026-10-19",
    "title": "PG014: `DROP COLUMN` / `DROP TABLE`",
    "help": '## What it detects\n\n`ALTER TABLE ... DROP COLUMN` on a table not created in the same migration set, and `DROP TABLE` of a table not created in the same migration set.\n\n## Why it matters\n\n"A one-step `RENAME COLUMN` or `DROP COLUMN` breaks every query of that code when it commits" (pg-online-migrations, rule 8): the running release keeps serving until the deploy finishes, and each of its queries that names the column fails with `42703` from the commit on. A dropped column\'s data is gone (`DROP COLUMN` marks it dead in the catalog; the space is reclaimed later), and `DROP TABLE` is irreversible without a backup. Both take `ACCESS EXCLUSIVE` ([ALTER TABLE](https://www.postgresql.org/docs/18/sql-altertable.html)), so PG004 applies too. There is no measured fixture for the application-side failure, so the severity is `warning`; the finding asks for the release that stopped reading the column as the suppression reason.\n\n## The fix\n\n```sql\n-- release N: stop reading and writing the column, deploy everywhere\n-- release N+1:\nALTER TABLE orders DROP COLUMN legacy_note;\n```\n\nFor a table, rename it first (`ALTER TABLE legacy RENAME TO legacy_dropped`) and drop it a release later, or take a backup.\n\n## When it does not apply\n\n- The table is created in the same migration set (a PR that creates and drops a scratch table, or a `down` migration of the `up` in the same PR).\n- No running code uses the column or table: suppress with a reason that names the release that stopped using it.',
    "messageTemplate": "`DROP COLUMN legacy_note` fails every query of the running release that still reads or writes `orders.legacy_note` the moment it commits, and the data is gone. Drop it in the release after the last one that reads it (expand/contract): stop reading, deploy, then drop. Not needed if `orders` is new in this release; otherwise suppress with the reason naming the release that stopped reading `legacy_note`. (PG014, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/SKILL.md#L51))"
  },
  {
    "id": "PG015",
    "name": "vacuum-full-or-cluster",
    "severity": "error",
    "pack": "pg",
    "folder": "pg/PG015-vacuum-full-or-cluster",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-vacuum-and-bloat",
    "evidence": [
      "db-skills/skills/pg-vacuum-and-bloat/examples/bad/test.sql#L76-L123",
      "https://www.postgresql.org/docs/18/sql-vacuum.html",
      "https://www.postgresql.org/docs/18/explicit-locking.html"
    ],
    "verified": "2026-10-19",
    "title": "PG015: `VACUUM FULL`, `CLUSTER`, `REINDEX` or `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`",
    "help": '## What it detects\n\nIn a migration: `VACUUM FULL`, `CLUSTER`, `REINDEX` without `CONCURRENTLY`, and `REFRESH MATERIALIZED VIEW` without `CONCURRENTLY`, on a table, index or view that is not created in the same migration set.\n\n## Why it matters\n\n`VACUUM FULL` "rewrites the entire contents of the table into a new disk file", "requires an `ACCESS EXCLUSIVE` lock" and "requires extra disk space" ([VACUUM](https://www.postgresql.org/docs/18/sql-vacuum.html)). `ACCESS EXCLUSIVE` is "acquired by the `DROP TABLE`, `TRUNCATE`, `REINDEX`, `CLUSTER`, `VACUUM FULL`, and `REFRESH MATERIALIZED VIEW` (without `CONCURRENTLY`) commands" and "conflicts with locks of all modes" ([explicit locking](https://www.postgresql.org/docs/18/explicit-locking.html)), so even a `SELECT` waits. The db-skills bad example measures three of them on PG 15 and 18: with a report holding `ACCESS SHARE` on `page_counters`, a `VACUUM FULL` from another session queues for `ACCESS EXCLUSIVE`, a plain `SELECT ... WHERE id = 1` that arrives after it fails with `55P03`, and the table has a new filenode when it finishes; `CLUSTER` holds `AccessExclusiveLock,ShareLock` until commit and changes the filenode; a plain `REINDEX INDEX` holds `ShareLock` on the table (writes wait) and `AccessExclusiveLock` on the index (reads that use it wait).\n\n## The fix\n\n```sql\nVACUUM (ANALYZE) page_counters;                      -- online: no exclusive lock\nREINDEX INDEX CONCURRENTLY page_counters_hits_idx;   -- online rebuild, outside a transaction\nREFRESH MATERIALIZED VIEW CONCURRENTLY daily_sales;  -- needs a unique index on the view\n```\n\nTo shrink a table on disk without the lock, use pg_repack or a copy-and-swap; otherwise plan `VACUUM FULL` or `CLUSTER` for a maintenance window with traffic stopped.\n\n## When it does not apply\n\n- The table, index or view is created in the same migration set.\n- An agreed maintenance window with traffic stopped: suppress with the reason naming it; still set `lock_timeout` (PG004).\n- `REINDEX INDEX CONCURRENTLY`, `REINDEX TABLE CONCURRENTLY` and `REFRESH MATERIALIZED VIEW CONCURRENTLY` are the online forms and are not reported (PG003 checks they are outside a transaction).',
    "messageTemplate": "`VACUUM FULL` rewrites `page_counters` into a new file under `ACCESS EXCLUSIVE`: it queues behind every running query, every query that arrives after it waits for the whole rewrite, and the copy needs the table's size again in free disk. Plain `VACUUM` reclaims space online; for bloated indexes use `REINDEX INDEX CONCURRENTLY`; to shrink a table online use pg_repack or a copy-and-swap in a maintenance window. Not needed in an agreed maintenance window with traffic stopped: suppress with the reason naming it. (PG015, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-vacuum-and-bloat/examples/bad/test.sql#L76-L123))"
  },
  {
    "id": "PG016",
    "name": "create-index-concurrently-if-not-exists",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG016-create-index-concurrently-if-not-exists",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-online-migrations",
    "evidence": [
      "db-skills/skills/pg-online-migrations/examples/bad/test.sql#L107-L115",
      "https://www.postgresql.org/docs/18/sql-createindex.html"
    ],
    "verified": "2026-10-19",
    "title": "PG016: `CREATE INDEX CONCURRENTLY IF NOT EXISTS`",
    "help": '## What it detects\n\n`CREATE [UNIQUE] INDEX CONCURRENTLY IF NOT EXISTS`, on any table.\n\n## Why it matters\n\nA concurrent build that fails (a deadlock, a duplicate in a unique index, a timeout, a cancelled migration) leaves an index marked `INVALID`: "the index will be marked invalid... it will still consume update overhead" and queries ignore it ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html), "Building Indexes Concurrently"). The db-skills bad example makes a unique concurrent build fail on a duplicate, then retries it with `IF NOT EXISTS`: the retry sees the invalid index by name, skips the build, and `pg_index.indisvalid` stays false. The migration reports success and the table has no usable index. The documented recovery is to drop the index and build it again, or `REINDEX INDEX CONCURRENTLY`.\n\n## The fix\n\n```sql\nDROP INDEX CONCURRENTLY IF EXISTS accounts_email_idx;\nCREATE UNIQUE INDEX CONCURRENTLY accounts_email_idx ON accounts (email);\n```\n\n## When it does not apply\n\n- A runner that never retries a failed step and never re-runs a migration: `IF NOT EXISTS` is then harmless but useless; the rule is a `warning` for that reason.\n- `CREATE INDEX IF NOT EXISTS` without `CONCURRENTLY` cannot leave an invalid index (PG001 applies to it instead).',
    "messageTemplate": "`CREATE INDEX CONCURRENTLY IF NOT EXISTS` skips the build when a previous concurrent build of `accounts_email_idx` failed and left it `INVALID`: the index exists by name, so nothing is rebuilt, writes keep maintaining it and queries on `accounts` never use it. Recover a failed build with `DROP INDEX CONCURRENTLY IF EXISTS accounts_email_idx` and then `CREATE INDEX CONCURRENTLY` again (or `REINDEX INDEX CONCURRENTLY`), without `IF NOT EXISTS`. Not needed if the migration runner never retries a failed step; then `IF NOT EXISTS` only hides the invalid index. (PG016, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-online-migrations/examples/bad/test.sql#L107-L115))"
  },
  {
    "id": "PG017",
    "name": "serial-or-integer-primary-key",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG017-serial-or-integer-primary-key",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-keys-and-types",
    "evidence": [
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L29-L37",
      "https://www.postgresql.org/docs/18/datatype-numeric.html"
    ],
    "verified": "2026-10-19",
    "title": "PG017: `serial` / `integer` primary key",
    "help": '## What it detects\n\nA primary key column of type `serial`, `smallserial`, `integer` or `smallint` in `CREATE TABLE` (column-level or table-level `PRIMARY KEY`), or added with `ALTER TABLE ... ADD COLUMN ... PRIMARY KEY`. `bigserial` and `bigint` are not reported.\n\n## Why it matters\n\n`serial` is "not a true type", only shorthand for an `integer` column with a separate sequence as its default, and its range is "1 to 2147483647" ([numeric types](https://www.postgresql.org/docs/18/datatype-numeric.html)). The db-skills bad example sets the sequence to that maximum and the next insert fails with SQLSTATE `2200H`; it also shows a hand-written import (`id` 1 and 2) going in quietly and the next normal insert failing with `23505`, because the sequence never saw them. Moving to `bigint` afterwards is a type change that rewrites the table (PG011). `bigint GENERATED ALWAYS AS IDENTITY` costs 4 more bytes per row, never runs out, and refuses an explicit id unless the insert says `OVERRIDING SYSTEM VALUE` (`428C9` in the good example).\n\n## The fix\n\n```sql\nCREATE TABLE customers (\n  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,\n  ...\n);\n```\n\n## When it does not apply\n\n- A small lookup table that cannot reach two billion rows (countries, statuses): suppress with that reason.\n- Tables whose ids an import or a replication tool must preserve: `GENERATED BY DEFAULT AS IDENTITY` on `bigint`; the rule only reports the 4-byte types.',
    "messageTemplate": "`id serial PRIMARY KEY` on `customers` is a 4-byte key with a separate sequence: it stops at 2147483647 (inserts then fail with SQLSTATE `2200H`), and moving to `bigint` later rewrites the whole table. Declare it `id bigint GENERATED ALWAYS AS IDENTITY`: 4 more bytes per row, never runs out, and the SQL-standard identity refuses hand-written ids. Not needed for a small lookup table that cannot reach 2 billion rows; suppress with that reason. (PG017, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L29-L37))"
  },
  {
    "id": "PG018",
    "name": "random-uuid-primary-key",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG018-random-uuid-primary-key",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-keys-and-types",
    "evidence": [
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L84-L92",
      "https://www.postgresql.org/docs/18/functions-uuid.html"
    ],
    "verified": "2026-10-19",
    "title": "PG018: random UUID primary key",
    "help": '## What it detects\n\nA `uuid` primary key column whose `DEFAULT` is `gen_random_uuid()`, `uuid_generate_v4()` or `uuidv4()`, in `CREATE TABLE` or `ALTER TABLE ... ADD COLUMN`.\n\n## Why it matters\n\nA B-tree fills leaf pages to its fillfactor "when extending the index at the right (adding new largest key values)"; pages that become completely full "will be split, leading to fragmentation" ([CREATE INDEX](https://www.postgresql.org/docs/18/sql-createindex.html)). `gen_random_uuid()` and its PostgreSQL 18 alias `uuidv4()` are random; `uuidv7()` is time-ordered ([UUID functions](https://www.postgresql.org/docs/18/functions-uuid.html)). The db-skills bad example inserts the same 200,000 UUIDs in random order and in key order and asserts, with `pgstatindex`, that the random-order primary key has leaf density under 75% and is over 30% larger than the ordered one (8.7 MB against 6.3 MB in the skill\'s run). Random keys also spread every insert over the whole index, so the working set is the whole index rather than its right edge.\n\n## The fix\n\n```sql\nid uuid PRIMARY KEY DEFAULT uuidv7()   -- PostgreSQL 18+\n```\n\nBelow 18, generate UUIDv7 in the application, or use `bigint GENERATED ALWAYS AS IDENTITY` when the id never leaves your system (8 bytes against 16).\n\n## When it does not apply\n\n- The id must not reveal when or in what order rows were created: a UUIDv7 contains its creation time (`uuid_extract_timestamp()`). Keep the random key or expose a random token in a separate unique column.\n- The key is not the primary key (a random token column) is not reported.',
    "messageTemplate": "`id uuid PRIMARY KEY DEFAULT gen_random_uuid()` on `orders` inserts random keys all over the index: leaf pages split half full (about 65% density in the db-skills test) and the primary key index is over 30% larger than the same keys inserted in order, with every insert touching a random page. Generate UUIDv7 in the application (PostgreSQL below 18 has no `uuidv7()`), or use `bigint GENERATED ALWAYS AS IDENTITY` when the id never leaves your system. Not needed if the id must not reveal creation order; then keep the random key and accept the index cost, or expose a random token in a separate column. (PG018, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L84-L92))"
  },
  {
    "id": "PG019",
    "name": "timestamp-without-time-zone",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG019-timestamp-without-time-zone",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-keys-and-types",
    "evidence": [
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L54-L61",
      "https://www.postgresql.org/docs/18/datatype-datetime.html"
    ],
    "verified": "2026-10-19",
    "title": "PG019: `timestamp` without time zone",
    "help": '## What it detects\n\nA column of type `timestamp` (without time zone, with or without precision) in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`. Rails `datetime` maps to `timestamp(6)` by default and is reported through the detector.\n\n## Why it matters\n\nFor `timestamp` without time zone, "PostgreSQL will silently ignore any time zone indication" in the input; for `timestamptz`, "the value is stored internally as UTC" and converted to the session\'s `TimeZone` on output ([date/time types](https://www.postgresql.org/docs/18/datatype-datetime.html)). The db-skills bad example writes the same instant from a session in `America/Sao_Paulo` (09:00-03) and one in `Asia/Tokyo` (21:00+09) into a `timestamp` column and asserts that the two stored values are 12 hours apart; the good example stores one value, `12:00+00`, into `timestamptz`. Both types are 8 bytes.\n\n## The fix\n\n```sql\nplaced_at timestamptz NOT NULL\n```\n\nChanging an existing column\'s type rewrites the table (PG011): fix it at creation, or expand/contract.\n\n## When it does not apply\n\n- A wall-clock value that is not an instant: a store\'s opening time, a recurring "09:00 local" alarm. Keep `time` or `timestamp` plus a time zone column, and suppress with that reason.\n- Rails applications that set `ActiveRecord::ConnectionAdapters::PostgreSQLAdapter.datetime_type = :timestamptz`: the detector cannot see the application config and maps `datetime` to `timestamp(6)`, the framework default; set `rules: {PG019: off}` or suppress on those migrations.',
    "messageTemplate": "`created_at timestamp` on `customers` is a timestamp without time zone: PostgreSQL \"silently ignore[s] any time zone indication\" on input, so the same instant written from two sessions with different `TimeZone` settings is stored as two values (12 hours apart in the db-skills test). Declare it `timestamptz`: stored as UTC, same 8 bytes, converted on output to the session's zone. Not needed for a wall-clock value that is deliberately zone-free (a store's opening time, a recurring local alarm); suppress with that reason. (PG019, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L54-L61))"
  },
  {
    "id": "PG020",
    "name": "json-column",
    "severity": "warning",
    "pack": "pg",
    "folder": "pg/PG020-json-column",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-keys-and-types",
    "evidence": [
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L77-L82",
      "https://www.postgresql.org/docs/18/datatype-json.html"
    ],
    "verified": "2026-10-19",
    "title": "PG020: `json` column instead of `jsonb`",
    "help": '## What it detects\n\nA column of type `json` (not `jsonb`) in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`.\n\n## Why it matters\n\n`json` "stores an exact copy of the input text, which processing functions must reparse on each execution", while `jsonb` is decomposed binary, supports indexing, and "most applications should prefer" it ([JSON types](https://www.postgresql.org/docs/18/datatype-json.html)). The db-skills bad example stores `{"gift": true, "gift": false, "total": "abc"}` in a `json` column and asserts that both copies of the duplicate key are kept and that `details = \'{}\'::json` fails with SQLSTATE `42883` (no equality operator); the good example\'s `jsonb` keeps the last duplicate and compares documents with `=`.\n\n## The fix\n\n```sql\ndetails jsonb NOT NULL DEFAULT \'{}\'\n```\n\nChanging an existing column\'s type rewrites the table (PG011): fix it at creation, or expand/contract.\n\n## When it does not apply\n\n- A webhook body or document kept byte for byte for audit, where key order and duplicate keys must survive: keep `json` and suppress with that reason.',
    "messageTemplate": '`details json` on `orders` stores the input text as is: it keeps duplicate keys, is reparsed on every read, cannot be indexed with GIN and has no `=` operator (SQLSTATE `42883` in the db-skills test). Declare it `jsonb`, which keeps the last duplicate key, supports indexing and comparison, and is what "most applications should prefer". Not needed for a payload kept byte for byte for audit (key order and duplicates preserved); suppress with that reason. (PG020, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L77-L82))'
  },
  {
    "id": "PG021",
    "name": "varchar-or-char-length",
    "severity": "info",
    "pack": "pg",
    "folder": "pg/PG021-varchar-or-char-length",
    "since": "0.1.0",
    "status": "active",
    "skill": "db-skills/skills/pg-keys-and-types",
    "evidence": [
      "db-skills/skills/pg-keys-and-types/examples/bad/test.sql#L39-L52",
      "https://www.postgresql.org/docs/18/datatype-character.html"
    ],
    "verified": "2026-10-19",
    "title": "PG021: `varchar(n)` / `char(n)`",
    "help": '## What it detects\n\nA column of type `varchar(n)` or `char(n)` in `CREATE TABLE`, `ALTER TABLE ... ADD COLUMN` or `ALTER TABLE ... ALTER COLUMN ... TYPE`. Unbounded `varchar` and `text` are not reported. The rule is `info` and off by default: many teams keep `varchar(n)` deliberately. Enable it with `rules: {PG021: info}` (or `warning`).\n\n## Why it matters\n\n"There is no performance difference" among `text`, `varchar(n)` and `varchar`, and `char(n)` "is usually the slowest of the three because of its additional storage costs" ([character types](https://www.postgresql.org/docs/18/datatype-character.html)). `varchar(n)` enforces only a maximum: it still stores `\'\'`, and an explicit cast "will be truncated to n characters without raising an error". The db-skills bad example stores an empty email in `varchar(20)`, casts a long address and asserts it was silently cut to 20 characters, then shrinks the limit to `varchar(10)` and asserts, with `pg_relation_filenode`, that the table was rewritten. The good example states the rule as `CHECK (char_length(email) BETWEEN 3 AND 254)` on `text`, which fails loudly on an empty or a 300-character email and is changed with `NOT VALID` then `VALIDATE` with the same filenode.\n\n## The fix\n\n```sql\nemail text NOT NULL,\nCONSTRAINT customers_email_len CHECK (char_length(email) BETWEEN 3 AND 254)\n```\n\n## When it does not apply\n\n- The limit is a real business rule the team keeps deliberately in the type: this is why the rule is `info` and off by default.\n- Fixed-length codes defined by a standard (ISO 4217, country codes): `text` with `CHECK (col ~ \'^[A-Z]{3}$\')` states the rule more precisely than `char(3)`; suppress or keep `char(n)` with a reason.',
    "messageTemplate": "`email varchar(20)` on `customers` enforces only a maximum: it still accepts `''`, an explicit cast silently truncates to 20 characters, and shrinking the limit later rewrites the table. Declare it `text` with a named check, `CONSTRAINT customers_email_len CHECK (char_length(email) BETWEEN 1 AND 20)`, which states the real rule and can be changed with `NOT VALID` then `VALIDATE` and no rewrite. Not needed when the limit is a real business rule the team keeps deliberately, or for fixed-length codes from a standard (then prefer `text` with a regular-expression check). (PG021, [evidence](https://github.com/rafapeixer/db-skills/blob/c6eb44e9ab3b9458099b0a808ca4a2cde9f2db57/skills/pg-keys-and-types/examples/bad/test.sql#L39-L52))"
  }
];

// src/harness-core.ts
var EXPECT = /(?:--|#)\s*expect:\s*([A-Za-z]+\d{3}(?:\s*,\s*[A-Za-z]+\d{3})*)/;
function walk(dir) {
  const out2 = [];
  for (const entry of readdirSync(dir).sort()) {
    const p = join2(dir, entry);
    if (statSync(p).isDirectory()) out2.push(...walk(p));
    else out2.push(p);
  }
  return out2;
}
function loadCase(entryPath, kind) {
  const name2 = basename(entryPath);
  const files = [];
  let configText;
  if (statSync(entryPath).isDirectory()) {
    for (const p of walk(entryPath)) {
      const rel = relative(entryPath, p).replace(/\\/g, "/");
      const content = readFileSync(p, "utf8");
      if (rel === ".lurie-guard.yml") {
        configText = content;
        continue;
      }
      const path = !rel.includes("/") && rel.endsWith(".sql") ? `migrations/${rel}` : rel.replace(/^modified\//, "");
      files.push({ path, status: rel.startsWith("modified/") ? "modified" : "added", content });
    }
  } else {
    const content = readFileSync(entryPath, "utf8");
    const path = name2.endsWith(".sql") ? `migrations/${name2}` : name2;
    files.push({ path, status: "added", content });
  }
  const expected = /* @__PURE__ */ new Map();
  let expectNone = false;
  for (const f of files) {
    f.content.split("\n").forEach((text, i2) => {
      if (/(?:--|#)\s*expect-none\b/.test(text)) expectNone = true;
      const m = EXPECT.exec(text);
      if (!m) return;
      for (const id of m[1].split(/\s*,\s*/)) {
        const key = `${f.path}:${id.toUpperCase()}`;
        const list = expected.get(key) ?? [];
        list.push(i2 + 1);
        expected.set(key, list);
      }
    });
  }
  return { name: name2, kind, files, configText, expectNone, expected };
}
function loadCases(ruleDir, kind) {
  const dir = join2(ruleDir, "fixtures", kind);
  if (!existsSync2(dir)) return [];
  return readdirSync(dir).sort().map((e) => loadCase(join2(dir, e), kind));
}
function configFor(ruleId, configText) {
  const config = parseConfig(configText, [...catalog, ...builtinCatalog()]);
  if (ruleId) {
    const entry = catalog.find((c) => c.id === ruleId);
    if (entry && config.rules[ruleId] === void 0 && !new RegExp(`\\b${ruleId}\\s*:\\s*off`).test(configText ?? ""))
      config.rules[ruleId] = entry.severity;
  }
  return config;
}
async function runCase(c, ruleId) {
  const config = configFor(ruleId, c.configText);
  const byPath = new Map(c.files.map((f) => [f.path, f.content]));
  const migrations = await detectMigrations(c.files, { config, readSibling: (p) => byPath.get(p) });
  const result = await analyze({ files: migrations, config, rules, catalog: [...catalog, ...builtinCatalog()] });
  return { ...result, config };
}

// src/reporters/sarif.ts
var SARIF_CATEGORY = "lurie-guard/pg";
var MAX_RESULTS = 25e3;
var RULES_BASE = "https://github.com/lurielabs/lurie-guard/blob/main/rules/";
function level(s) {
  return s === "info" ? "note" : s;
}
function firstParagraph(help) {
  const m = /## What it detects\n\n([\s\S]*?)(?:\n\n|$)/.exec(help);
  return (m?.[1] ?? help.split("\n\n")[0] ?? "").replace(/\s+/g, " ").trim();
}
function buildSarif(result, catalog2, opts) {
  const sorted = [...catalog2].sort((a, b) => a.id.localeCompare(b.id));
  const ruleIndex = new Map(sorted.map((r, i2) => [r.id, i2]));
  const rules2 = sorted.map((r) => ({
    id: r.id,
    name: r.name,
    shortDescription: { text: r.title },
    fullDescription: { text: firstParagraph(r.help) || r.title },
    help: { text: r.help.replace(/[`*#>]/g, ""), markdown: r.help },
    helpUri: r.folder ? `${RULES_BASE}${r.folder}/RULE.md` : "https://github.com/lurielabs/lurie-guard/blob/main/docs/SPEC-MVP.md",
    defaultConfiguration: { level: level(r.severity) },
    properties: { tags: ["postgresql", "migration"], skill: r.skill || void 0 }
  }));
  const truncated = result.findings.length > MAX_RESULTS;
  const findings = truncated ? result.findings.slice(0, MAX_RESULTS) : result.findings;
  const results = findings.map((f) => toResult(f, ruleIndex, opts.contents));
  const run3 = {
    tool: {
      driver: {
        name: "lurie-guard",
        semanticVersion: opts.version,
        informationUri: "https://github.com/lurielabs/lurie-guard",
        rules: rules2
      }
    },
    automationDetails: { id: `${SARIF_CATEGORY}/` },
    columnKind: "utf16CodeUnits",
    results
  };
  if (truncated) {
    run3.invocations = [
      {
        executionSuccessful: true,
        toolExecutionNotifications: [
          { level: "warning", message: { text: `${result.findings.length} findings; only the first ${MAX_RESULTS} are in this file (code scanning limit).` } }
        ]
      }
    ];
  }
  return {
    $schema: "https://json.schemastore.org/sarif-2.1.0.json",
    version: "2.1.0",
    runs: [run3]
  };
}
function toResult(f, ruleIndex, contents) {
  const lineText = contents.get(f.path)?.split("\n")[f.line - 1] ?? "";
  const location = {
    physicalLocation: {
      artifactLocation: { uri: f.path, uriBaseId: "%SRCROOT%" },
      region: { startLine: f.line, endLine: Math.max(f.line, f.endLine) }
    }
  };
  const out2 = {
    ruleId: f.ruleId,
    ruleIndex: ruleIndex.get(f.ruleId) ?? -1,
    level: level(f.severity),
    message: { text: f.message.replace(/\[evidence\]\((.*?)\)/, "evidence: $1"), markdown: f.message },
    locations: [location],
    partialFingerprints: {
      primaryLocationLineHash: lineHash(lineText),
      "lurie-guard/v1": f.fingerprint
    }
  };
  if (f.suppressed) out2.suppressions = [{ kind: "inSource", justification: f.suppressed.reason }];
  if (f.fix?.kind === "suggestion" && f.fix.startLine && f.fix.endLine) {
    out2.fixes = [
      {
        description: { text: `Replace with the online form (${f.ruleId}).` },
        artifactChanges: [
          {
            artifactLocation: { uri: f.path, uriBaseId: "%SRCROOT%" },
            replacements: [
              {
                deletedRegion: { startLine: f.fix.startLine, startColumn: 1, endLine: f.fix.endLine + 1, endColumn: 1 },
                insertedContent: { text: `${f.fix.text}
` }
              }
            ]
          }
        ]
      }
    ];
  }
  return out2;
}

// src/reporters/review.ts
var FINGERPRINTS_MARKER = "lurie-guard:fingerprints";
var COMMENT_MARKER = "lurie-guard:fp:";
function commentBody(f, explanation, model) {
  const parts2 = [`**${f.ruleId}** (${f.severity}): ${f.message}`];
  if (f.fix) {
    if (f.fix.kind === "suggestion") parts2.push("```suggestion\n" + f.fix.text + "\n```");
    else parts2.push("```sql\n" + f.fix.text + "\n```");
  }
  if (explanation) parts2.push(`**Explanation** (from your Anthropic key${model ? `, \`${model}\`` : ""}; the finding above does not depend on it):

${explanation}`);
  parts2.push(`<!-- ${COMMENT_MARKER}${f.fingerprint} -->`);
  return parts2.join("\n\n");
}
function counts(findings) {
  const c = { errors: 0, warnings: 0, infos: 0 };
  for (const f of findings) {
    if (f.severity === "error") c.errors++;
    else if (f.severity === "warning") c.warnings++;
    else c.infos++;
  }
  return c;
}
function planReview(result, opts) {
  const active = result.findings.filter((f) => !f.suppressed);
  const activeFps = new Set(active.map((f) => f.fingerprint));
  const resolved = [...opts.previous].filter((fp) => !activeFps.has(fp)).sort();
  const fresh = active.filter((f) => !opts.previous.has(f.fingerprint));
  const inDiff = [];
  const outsideDiff = [];
  for (const f of fresh) {
    const lines2 = opts.diff.get(f.path);
    if (lines2 && lines2.has(f.line)) inDiff.push(f);
    else outsideDiff.push(f);
  }
  const max = opts.config.outputs.maxComments;
  const toComment = inDiff.slice(0, max);
  const overflow = inDiff.slice(max);
  const comments = toComment.map((f) => {
    const c2 = { path: f.path, line: f.line, side: "RIGHT", body: commentBody(f, opts.explanations?.get(f.fingerprint), opts.explainerModel) };
    if (f.fix?.kind === "suggestion" && f.fix.startLine && f.fix.endLine && f.fix.endLine > f.fix.startLine) {
      c2.start_line = f.fix.startLine;
      c2.start_side = "RIGHT";
      c2.line = f.fix.endLine;
    } else if (f.endLine > f.line && opts.diff.get(f.path)?.has(f.endLine)) {
      c2.start_line = f.line;
      c2.start_side = "RIGHT";
      c2.line = f.endLine;
    }
    return c2;
  });
  const allClear = active.length === 0 && opts.previous.size > 0;
  if (fresh.length === 0 && resolved.length === 0) return { resolved, outsideDiff, overflow, allClear: false };
  const c = counts(active);
  const lines = [];
  if (allClear) lines.push("All lurie-guard findings resolved.");
  else {
    lines.push(`**lurie-guard**: ${active.length} finding${active.length === 1 ? "" : "s"} (${c.errors} error${c.errors === 1 ? "" : "s"}, ${c.warnings} warning${c.warnings === 1 ? "" : "s"}, ${c.infos} info)${fresh.length < active.length ? `, ${fresh.length} new` : ""}.`);
    if (opts.reportOnly) lines.push("Report-only: this check passes whatever it finds. To block merges on errors, add `fail_on: error` to `.lurie-guard.yml` on the base branch.");
    if (overflow.length) lines.push(`${overflow.length} more finding${overflow.length === 1 ? "" : "s"} beyond \`outputs.max_comments\` (${max}) are in the job summary.`);
    if (outsideDiff.length) lines.push(`${outsideDiff.length} finding${outsideDiff.length === 1 ? " is" : "s are"} on lines outside this diff; see the job summary.`);
    if (resolved.length) lines.push(`${resolved.length} earlier finding${resolved.length === 1 ? "" : "s"} resolved.`);
    const suppressed = result.findings.filter((f) => f.suppressed);
    if (suppressed.length) {
      lines.push("", "Suppressed with a reason:");
      for (const f of suppressed) lines.push(`- \`${f.path}:${f.line}\` ${f.ruleId}: ${f.suppressed?.reason}`);
    }
  }
  lines.push("", `<!-- ${FINGERPRINTS_MARKER} ${[...activeFps].sort().join(",")} -->`);
  return { review: { body: lines.join("\n"), comments }, resolved, outsideDiff, overflow, allClear };
}

// src/reporters/summary.ts
var LIMIT = 1024 * 1024;
function cell(s) {
  return s.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}
function shortMessage(message) {
  const withoutLink = message.replace(/\s*\((PG[SX]?\d+)(?:, \[evidence\]\([^)]*\))?\)\s*$/, "");
  const first = withoutLink.split(/(?<=[.!?])\s+(?=[A-Z`])/)[0] ?? withoutLink;
  return first.length > 220 ? `${first.slice(0, 217)}...` : first;
}
function buildSummary(result, opts) {
  const active = result.findings.filter((f) => !f.suppressed);
  const suppressed = result.findings.filter((f) => f.suppressed);
  const errors = active.filter((f) => f.severity === "error").length;
  const warnings = active.filter((f) => f.severity === "warning").length;
  const infos = active.length - errors - warnings;
  const lines = [];
  lines.push("## lurie-guard");
  lines.push("");
  lines.push(`**${active.length} finding${active.length === 1 ? "" : "s"}**: ${errors} error${errors === 1 ? "" : "s"}, ${warnings} warning${warnings === 1 ? "" : "s"}, ${infos} info. ${suppressed.length} suppressed.`);
  if (opts.reportOnly) {
    lines.push("");
    lines.push("Report-only: the check passes whatever it finds (`fail_on: none`, the default through v0.x). To block merges on errors, add `fail_on: error` to `.lurie-guard.yml` on the base branch.");
  } else {
    lines.push("");
    lines.push(`\`fail_on: ${opts.config.failOn}\`: the check fails when a finding at or above that severity remains.`);
  }
  for (const n of opts.notices) {
    lines.push("");
    lines.push(`> ${n}`);
  }
  if (active.length) {
    lines.push("", "### Findings", "", "| File | Line | Rule | Severity | What happens |", "|---|---|---|---|---|");
    for (const f of active) {
      lines.push(`| \`${cell(f.path)}\` | ${f.line} | ${f.ruleId} | ${f.severity} | ${cell(shortMessage(f.message))} |`);
    }
    if (opts.explanations && opts.explanations.size) {
      lines.push("", "### Explanations", "");
      for (const f of active) {
        const e = opts.explanations.get(f.fingerprint);
        if (!e) continue;
        lines.push(`- \`${cell(f.path)}:${f.line}\` ${f.ruleId}: ${cell(e)}`);
      }
    }
  }
  if (suppressed.length) {
    lines.push("", "### Suppressed", "", "| File | Line | Rule | Reason |", "|---|---|---|---|");
    for (const f of suppressed) lines.push(`| \`${cell(f.path)}\` | ${f.line} | ${f.ruleId} | ${cell(f.suppressed?.reason ?? "")} |`);
  }
  lines.push("", "### Files", "", "| File | Framework | Transaction | Statements | Status |", "|---|---|---|---|---|");
  for (const r of result.files) {
    const txn = r.wrapped ? "wrapped" : "not wrapped";
    const status = r.status === "parse-error" ? "could not parse" : "analyzed";
    lines.push(`| \`${cell(r.path)}\` | ${r.framework} | ${txn} | ${r.statements} | ${status} |`);
  }
  for (const s of opts.skipped) lines.push(`| \`${cell(s)}\` | - | - | - | not a migration |`);
  const notAnalyzed = result.files.flatMap((r) => r.notAnalyzed.map((n) => ({ path: r.path, ...n })));
  if (notAnalyzed.length) {
    lines.push("", "### Not analyzed", "", "Host-language calls the detector does not map in this release; nothing is guessed about them.", "");
    for (const n of notAnalyzed) lines.push(`- \`${cell(n.path)}:${n.line}\` ${cell(n.reason)}`);
  }
  if (opts.llm) {
    const l = opts.llm;
    lines.push("", "### Explainer", "", `${l.explained} finding${l.explained === 1 ? "" : "s"} explained with \`${l.model}\`: ${l.inputTokens} input tokens (${l.cacheReadTokens} read from cache), ${l.outputTokens} output tokens, about $${l.costUsd.toFixed(4)}.`);
  }
  lines.push("", `Run time: ${(opts.runMs / 1e3).toFixed(1)} s (engine ${(result.engineMs / 1e3).toFixed(1)} s).`);
  let text = lines.join("\n");
  if (Buffer.byteLength(text, "utf8") > LIMIT) text = `${text.slice(0, LIMIT - 200)}

(summary truncated at 1 MiB)`;
  return text;
}

// src/run.ts
var VERSION = "0.1.0";
function fullCatalog() {
  return [...catalog, ...builtinCatalog()];
}
function loadConfig(text) {
  return parseConfig(text, fullCatalog());
}
function exitCodeFor(config, active) {
  if (config.failOn === "none") return 0;
  const threshold = config.failOn === "error" ? ["error"] : ["error", "warning"];
  return active.some((f) => threshold.includes(f.severity)) ? 1 : 0;
}
async function run2(input, extra = {}) {
  const started = performance.now();
  const config = loadConfig(input.configText);
  input.configOverride?.(config);
  const all = fullCatalog();
  const byPath = new Map(input.files.map((f) => [f.path, f.content]));
  const migrations = await detectMigrations(input.files, {
    config,
    readSibling: input.readSibling ?? ((p) => byPath.get(p))
  });
  const detected = new Set(migrations.map((m) => m.path));
  const skipped = input.files.map((f) => f.path).filter((p) => !detected.has(p) && !p.endsWith(".conf"));
  const result = await analyze({ files: migrations, config, rules, catalog: all });
  const active = result.findings.filter((f) => !f.suppressed);
  const counts2 = {
    findings: active.length,
    errors: active.filter((f) => f.severity === "error").length,
    warnings: active.filter((f) => f.severity === "warning").length,
    infos: active.filter((f) => f.severity === "info").length
  };
  const reportOnly = config.failOn === "none";
  const sarif = buildSarif(result, all, { version: VERSION, contents: byPath });
  const runMs = Math.round(performance.now() - started);
  const summary = buildSummary(result, {
    config,
    reportOnly,
    skipped,
    runMs,
    notices: input.notices ?? [],
    llm: extra.llm,
    explanations: extra.explanations
  });
  return { config, result, sarif, summary, skipped, active, counts: counts2, reportOnly, exitCode: exitCodeFor(config, active), runMs };
}

// src/cli.ts
var USAGE = `Usage: lurie-guard [options] [files...]

  --root DIR          repository root (default: cwd); files are relative to it
  --config FILE       .lurie-guard.yml to use (default: <root>/.lurie-guard.yml)
  --modified FILE     treat FILE as modified rather than added (repeatable)
  --format FORMAT     text | json | sarif | summary (default: text)
  --out FILE          write the output there instead of stdout
  --fail-on LEVEL     none | warning | error (overrides the config)
  --all-rules         enable every rule, including the info ones
  --fixtures DIR      run every rule fixture under DIR (the determinism check)
  --version, --help

With no files, every file under --root that the detector classifies as a
migration is reviewed as "added". Build, dependency and VCS output (target/,
build/, dist/, node_modules/, vendor/, ...) is skipped unless the config says
default_excludes: false. Exit code: 0, or 1 when a finding reaches --fail-on
(or the config's fail_on); 2 on a usage or configuration error.
`;
function parseArgs2(argv) {
  const a = { root: process.cwd(), modified: /* @__PURE__ */ new Set(), format: "text", allRules: false, files: [] };
  for (let i2 = 0; i2 < argv.length; i2++) {
    const x = argv[i2];
    const next = () => {
      const v = argv[++i2];
      if (v === void 0) throw new Error(`${x} needs a value`);
      return v;
    };
    switch (x) {
      case "--root":
        a.root = resolve(next());
        break;
      case "--config":
        a.config = resolve(next());
        break;
      case "--modified":
        a.modified.add(next().replace(/\\/g, "/"));
        break;
      case "--format":
        a.format = next();
        break;
      case "--out":
        a.out = resolve(next());
        break;
      case "--fail-on":
        a.failOn = next();
        break;
      case "--all-rules":
        a.allRules = true;
        break;
      case "--fixtures":
        a.fixtures = resolve(next());
        break;
      case "--version":
        console.log(VERSION);
        process.exit(0);
        break;
      case "--help":
      case "-h":
        process.stdout.write(USAGE);
        process.exit(0);
        break;
      default:
        if (x.startsWith("-")) {
          process.stderr.write(`unknown option ${x}

${USAGE}`);
          process.exit(2);
        }
        a.files.push(x);
    }
  }
  return a;
}
var ALWAYS_SKIPPED = /* @__PURE__ */ new Set(["node_modules", ".git"]);
function walk2(dir, skipDefaults, out2 = []) {
  for (const e of readdirSync2(dir).sort()) {
    if (ALWAYS_SKIPPED.has(e) || skipDefaults && DEFAULT_EXCLUDED_DIRS.has(e)) continue;
    const p = join3(dir, e);
    if (statSync2(p).isDirectory()) walk2(p, skipDefaults, out2);
    else out2.push(p);
  }
  return out2;
}
async function runFixtures(dir) {
  const out2 = {};
  const packs = readdirSync2(dir).filter((p) => statSync2(join3(dir, p)).isDirectory());
  for (const pack of packs.sort()) {
    for (const folder of readdirSync2(join3(dir, pack)).sort()) {
      const ruleDir = join3(dir, pack, folder);
      if (!existsSync3(join3(ruleDir, "fixtures"))) continue;
      const ruleId = /^([A-Z]+\d{3})-/.exec(folder)?.[1];
      for (const kind of ["bad", "good"]) {
        for (const c of loadCases(ruleDir, kind)) {
          const result = await runCase(c, ruleId);
          const contents = new Map(c.files.map((f) => [f.path, f.content]));
          const sarif = buildSarif(result, fullCatalog(), { version: VERSION, contents });
          const diff = new Map(c.files.map((f) => [f.path, new Set(f.content.split("\n").map((_, i2) => i2 + 1))]));
          const review = planReview(result, { diff, previous: /* @__PURE__ */ new Set(), config: result.config, reportOnly: true });
          out2[`${folder}/${kind}/${c.name}`] = { findings: result.findings, suppressions: result.suppressions, files: result.files, sarif, review: review.review };
        }
      }
    }
  }
  return out2;
}
async function main() {
  const args2 = parseArgs2(process.argv.slice(2));
  if (args2.fixtures) {
    const data = await runFixtures(args2.fixtures);
    const text2 = JSON.stringify(data, null, 1);
    if (args2.out) writeFileSync(args2.out, text2);
    else process.stdout.write(text2);
    return;
  }
  const configPath = args2.config ?? join3(args2.root, ".lurie-guard.yml");
  const configText = existsSync3(configPath) ? readFileSync2(configPath, "utf8") : void 0;
  let skipDefaults;
  try {
    skipDefaults = loadConfig(configText).defaultExcludes;
  } catch (err2) {
    if (err2 instanceof ConfigError) {
      console.error(err2.message);
      process.exit(2);
    }
    throw err2;
  }
  const paths = args2.files.length ? args2.files.map((f) => f.replace(/\\/g, "/")) : walk2(args2.root, skipDefaults).map((p) => relative2(args2.root, p).replace(/\\/g, "/"));
  const files = [];
  for (const p of paths) {
    const abs = resolve(args2.root, p);
    if (!existsSync3(abs) || statSync2(abs).isDirectory()) continue;
    files.push({ path: p, status: args2.modified.has(p) ? "modified" : "added", content: readFileSync2(abs, "utf8") });
  }
  let out2;
  try {
    out2 = await run2({
      files,
      configText,
      configOverride: (config) => {
        if (args2.failOn) config.failOn = args2.failOn;
        if (args2.allRules) {
          for (const r of fullCatalog()) if (r.folder) config.rules[r.id] = config.rules[r.id] ?? r.severity;
        }
      },
      readSibling: (p) => {
        const abs = resolve(args2.root, p);
        return existsSync3(abs) ? readFileSync2(abs, "utf8") : void 0;
      }
    });
  } catch (err2) {
    if (err2 instanceof ConfigError) {
      console.error(err2.message);
      process.exit(2);
    }
    throw err2;
  }
  let text;
  switch (args2.format) {
    case "json":
      text = JSON.stringify({ findings: out2.result.findings, suppressions: out2.result.suppressions, files: out2.result.files, counts: out2.counts, exitCode: out2.exitCode }, null, 2);
      break;
    case "sarif":
      text = JSON.stringify(out2.sarif, null, 2);
      break;
    case "summary":
      text = out2.summary;
      break;
    default: {
      const lines = [];
      for (const f of out2.result.findings) {
        const tag = f.suppressed ? " (suppressed)" : "";
        lines.push(`${f.path}:${f.line}: ${f.severity} ${f.ruleId}${tag}: ${f.message.replace(/\s*\[evidence\]\((.*?)\)/, " evidence: $1")}`);
      }
      lines.push(`${out2.counts.findings} finding(s): ${out2.counts.errors} error(s), ${out2.counts.warnings} warning(s), ${out2.counts.infos} info. ${out2.result.files.length} file(s) analyzed, ${out2.skipped.length} skipped. fail_on: ${out2.config.failOn}.`);
      text = lines.join("\n") + "\n";
    }
  }
  if (args2.out) writeFileSync(args2.out, text);
  else process.stdout.write(text);
  process.exitCode = out2.exitCode;
}
main().catch((err2) => {
  console.error(err2.stack ?? err2.message);
  process.exitCode = 2;
});
