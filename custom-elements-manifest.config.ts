#!/usr/bin/env ts-node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { customElementExamplesPlugin } from './scripts/custom-element-examples.plugin';
import { customElementReadmePlugin } from './scripts/custom-element-readme.plugin';
import { customElementTagsPlugin } from './scripts/custom-element-tags.plugin';

export default {
  packagejson: true,
  litelement: true,
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/legacy.component.ts'],
  outdir: 'dist',
  plugins: [
    customElementExamplesPlugin(),
    customElementReadmePlugin({
      loadReadme(path?: string) {
        if (path === undefined) return '';
        return readFileSync(resolve(dirname(path), 'README.md')).toString();
      },
    }),
    customElementTagsPlugin(),
  ],
};
