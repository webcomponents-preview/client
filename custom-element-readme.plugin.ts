#!/usr/bin/env ts-node

// TODO: move out of this file and share in @webcomponents-preview/cem-plugin-custom-element-readme
import type { Plugin } from '@custom-elements-manifest/analyzer';

// as the plugin is create by factory function, we can provide some options
type PluginOptions = {
  loadReadme(componentPath?: string): string;
};

export function customElementReadmePlugin({ loadReadme }: PluginOptions): Plugin {
  return {
    name: 'custom-element-readme',
    analyzePhase({ ts, node, moduleDoc }) {
      // we just look up docs for classes
      if (ts.isClassDeclaration(node)) {
        const className = node.name?.getText();
        const doc = moduleDoc?.declarations?.find((declaration) => declaration.name === className) as any;
        if (doc !== undefined) doc.readme = loadReadme(moduleDoc.path);
      }
    },
  };
}
