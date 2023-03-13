#!/usr/bin/env ts-node

import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

import { customElementExamplesPlugin } from '@webcomponents-preview/cem-plugin-examples';
import { customElementGroupingPlugin } from '@webcomponents-preview/cem-plugin-grouping';
import { customElementInlineReadmePlugin } from '@webcomponents-preview/cem-plugin-inline-readme';

export default {
  packagejson: true,
  litelement: true,
  globs: ['src/components/**/*.component.ts'],
  exclude: ['**/legacy.component.ts'],
  outdir: 'dist',
  plugins: [
    customElementExamplesPlugin(),
    customElementGroupingPlugin({
      addGroups(componentPath) {
        const [, , group] = componentPath?.split('/') || [];
        return [group];
      },
    }),
    customElementInlineReadmePlugin({
      loadReadme(path?: string) {
        if (path === undefined) return '';
        return readFileSync(resolve(dirname(path), 'README.md')).toString();
      },
    }),
  ],
};
