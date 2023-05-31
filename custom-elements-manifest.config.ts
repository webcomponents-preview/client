#!/usr/bin/env ts-node

import { dirname, resolve } from 'node:path';

import { customElementExamplesPlugin } from '@webcomponents-preview/cem-plugin-examples';
import { customElementGenerateReadmesPlugin } from '@webcomponents-preview/cem-plugin-generate-readmes';
import { customElementGroupingPlugin } from '@webcomponents-preview/cem-plugin-grouping';

export default {
  packagejson: true,
  litelement: true,
  globs: ['src/components/**/*.{component,plugin}.ts'],
  exclude: ['**/legacy.component.ts'],
  outdir: 'dist',
  plugins: [
    customElementExamplesPlugin(),
    customElementGenerateReadmesPlugin({
      addInlineReadme: true,
      transformer: 'wca',
      outputPath(path) {
        if (path === undefined) return '';
        return resolve(dirname(path), 'README.md');
      },
    }),
    customElementGroupingPlugin({
      addGroups(componentPath) {
        const [, , group] = componentPath?.split('/') || [];
        return [group];
      },
    }),
  ],
};
