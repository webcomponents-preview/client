#!/usr/bin/env ts-node

import { dirname, resolve } from 'node:path';

import { customElementExamplesPlugin } from '@webcomponents-preview/cem-plugin-examples';
import { customElementGenerateReadmesPlugin } from '@webcomponents-preview/cem-plugin-generate-readmes';
import { customElementGroupingPlugin } from '@webcomponents-preview/cem-plugin-grouping';

export default {
  packagejson: true,
  litelement: true,
  globs: ['src/**/*.{component,plugin}.ts', 'src/**/EXAMPLES.md'],
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
        const path = componentPath?.split('/') || [];
        const [, type, category, sub] = path;
        const group = `${type}/${category}`;

        return path.length > 5 ? [`${group}/${sub}`] : [group];
      },
    }),
  ],
};
