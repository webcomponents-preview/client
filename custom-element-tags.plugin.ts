#!/usr/bin/env ts-node

// TODO: move out of this file and share in @webcomponents-preview/cem-plugin-custom-element-tags
import type { AnalyzePhaseParams, Plugin } from '@custom-elements-manifest/analyzer';
import type { JSDoc } from 'typescript';

// CEM uses a specific version of typescript which will most likely not match ours.
type CEMNode = AnalyzePhaseParams['node'];
type CemNodeWithJsDoc = CEMNode & { jsDoc: JSDoc[] };

// as the plugin is create by factory function, we can provide some options
type PluginOptions = {
  tags: string[];
};

// the tags we're looking at, are the built-in tags and some custom tags
// which are not yet part of the spec
const BUILTIN_TAGS = ['event', 'example'];
const CUSTOM_TAGS = ['cssProp', 'element', 'emits', 'fires', 'slot'];
const CUSTOM_ELEMENT_TAGS = [...BUILTIN_TAGS, ...CUSTOM_TAGS];

function hasJsDocComments(node: CEMNode): node is CemNodeWithJsDoc {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return 'jsDoc' in node && (node as any).jsDoc.length > 0;
}

function isCustomElementTag(tag: Required<Required<JSDoc>['tags']>[number], allowedTags: string[]): boolean {
  return allowedTags.includes(tag.tagName.escapedText as string);
}

export function customElementTagsPlugin(options?: Partial<PluginOptions>): Plugin {
  const { tags: allowedTags = CUSTOM_ELEMENT_TAGS } = options || {};

  return {
    name: 'custom-element-tags',
    analyzePhase({ ts, node, moduleDoc }) {
      // if no docs are given, exit (through the gift shop)
      if (!hasJsDocComments(node)) return;

      // we just look up docs for classes
      if (ts.isClassDeclaration(node)) {
        const className = node.name?.getText();
        const doc = moduleDoc!.declarations!.find((declaration) => declaration.name === className) as any;
        doc.tags = node.jsDoc.reduce((all, doc) => {
          const tags = doc.tags
            ?.filter((tag) => isCustomElementTag(tag, allowedTags))
            .reduce((all, tag) => {
              const name = tag.tagName.getText();
              const value = tag.comment || '';
              return { ...all, [name]: [...(all[name] || []), value] } as Record<string, string[]>;
            }, {} as Record<string, string[]>);
          return { ...all, ...tags };
        }, {} as Record<string, string[]>);
      }
    },
  };
}
