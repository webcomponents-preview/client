import config from '@enke.dev/lint';
import type { Linter } from 'eslint';

export default [
  ...config,
  {
    ignores: ['dist', 'node_modules', 'src/index.ts', 'src/config.schema.json'],
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': ['off'],
      'import/no-unresolved': ['off'],
    },
  },
] satisfies Linter.Config[];
