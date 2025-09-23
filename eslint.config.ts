import config from '@enke.dev/lint';
import { defineConfig } from 'eslint/config';

export default defineConfig([
  ...config,
  {
    ignores: ['src/index.ts'],
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      '@typescript-eslint/no-unused-expressions': ['off'],
      'import/no-unresolved': ['off'],
    },
  },
]);
