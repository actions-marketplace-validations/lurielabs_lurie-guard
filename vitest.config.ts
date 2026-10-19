import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts', 'rules/**/*.test.ts', 'test/**/*.test.ts'],
    testTimeout: 120_000,
    hookTimeout: 120_000,
    // Snapshot files sit next to the tests; the reporters' output is the contract.
    snapshotFormat: { printBasicPrototype: false },
  },
});
