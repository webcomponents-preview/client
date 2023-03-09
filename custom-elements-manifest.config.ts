#!/usr/bin/env ts-node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { customElementExamplesPlugin } from '@webcomponents-preview/cem-plugin-examples';
import { customElementInlineReadmePlugin } from '@webcomponents-preview/cem-plugin-inline-readme';

export default {
  packagejson: true,
  litelement: true,
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/legacy.component.ts'],
  outdir: 'dist',
  plugins: [
    customElementExamplesPlugin(),
    customElementInlineReadmePlugin({
      loadReadme(path?: string) {
        if (path === undefined) return '';
        return readFileSync(resolve(dirname(path), 'README.md')).toString();
      },
    }),
  ],
};
