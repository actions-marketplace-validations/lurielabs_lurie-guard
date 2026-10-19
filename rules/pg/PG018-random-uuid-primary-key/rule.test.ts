import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { testRule } from '../../../src/harness.js';

testRule(dirname(fileURLToPath(import.meta.url)));
