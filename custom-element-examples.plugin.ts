#!/usr/bin/env ts-node

// TODO: move out of this file and share in @webcomponents-preview/cem-plugin-custom-element-examples
import type { AnalyzePhaseParams, Plugin } from '@custom-elements-manifest/analyzer';
import type { JSDoc } from 'typescript';

// CEM uses a specific version of typescript which will most likely not match ours.
type CEMNode = AnalyzePhaseParams['node'];
type CemNodeWithJsDoc = CEMNode & { jsDoc: JSDoc[] };

// as the plugin is create by factory function, we can provide some options
type PluginOptions = never;

function hasJsDocComments(node: CEMNode): node is CemNodeWithJsDoc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'jsDoc' in node && (node as any).jsDoc.length > 0;
}

function isExampleTag(tag: Required<Required<JSDoc>['tags']>[number]): boolean {
  return tag.tagName.escapedText === 'example';
}

export function customElementExamplesPlugin(_options?: Partial<PluginOptions>): Plugin {
  return {
    name: 'custom-element-examples',
    analyzePhase({ ts, node, moduleDoc }) {
      // if no docs are given, exit (through the gift shop)
      if (!hasJsDocComments(node)) return;

      // we just look up docs for classes
      if (ts.isClassDeclaration(node)) {
        const className = node.name?.getText();
        const doc = moduleDoc!.declarations!.find((declaration) => declaration.name === className) as any;
        doc.examples = node.jsDoc.reduce((all, doc) => {
          const tags = doc.tags?.filter(isExampleTag);
          return [...all, ...((tags?.map((tag) => tag.comment || '') || []) as string[])];
        }, [] as string[]);
      }
    },
  };
}
