import type * as CEM from 'custom-elements-manifest';

import type { Element, Parser } from '@/utils/parser.types.js';

import { isCustomElementDeclarationWithTagName } from '../utils.js';
import { CemElement } from './cem-element.js';

export const CemParser = class {
  #elements: Map<string, Element>;

  get elements() {
    return this.#elements;
  }

  getGroupedElements(fallbackGroupName: string): Map<string, Element[]> {
    return Array.from(this.elements.values()).reduce((map, element) => {
      const { groups } = element.hasGroups ? element : { groups: [fallbackGroupName] };
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return groups!.reduce((all, group) => all.set(group, (all.get(group) ?? []).concat(element)), map);
    }, new Map<string, Element[]>());
  }

  constructor(
    private _data: CEM.Package,
    exclude: string[] = [],
  ) {
    // parse the elements
    this.#elements = this._data.modules
      .flatMap((module) => module.declarations)
      .filter(isCustomElementDeclarationWithTagName)
      .filter((element) => !exclude.includes(element.tagName))
      .reduce((map, element) => map.set(element.tagName, new CemElement(element)), new Map());

    // allow access to the original data by proxying
    return new Proxy(this, {
      get(t, p: keyof Parser) {
        return p in t ? t[p] : _data[p];
      },
    });
  }
} as unknown as Parser;
