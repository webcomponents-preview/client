import type * as CEM from 'custom-elements-manifest';

import type * as Parsed from '@/utils/parser.types.js';

import { isCustomElementDeclarationWithTagName } from '../utils.js';
import { CemElement } from './cem-element.js';

export const CemParser = class {
  #elements: Map<string, Parsed.Element>;

  get elements() {
    return this.#elements;
  }

  groupedElements(fallbackGroupName: string): Parsed.GroupedElements<Parsed.Element> {
    // helper function to recursively add a grouped element
    function addGroupedElement(
      map: Parsed.GroupedElements<Parsed.Element>,
      group: [string, ...string[]],
      element: Parsed.Element,
    ) {
      // read current and nested groups
      const [currentGroup, ...nestedGroups] = group;

      // create the current group if not exists
      if (!map.has(currentGroup)) {
        map.set(currentGroup, {
          items: new Set(),
          groups: new Map(),
        });
      }

      // add nested groups recursively
      if (nestedGroups.length > 0) {
        addGroupedElement(map.get(currentGroup)!.groups, nestedGroups as [string], element);
      }
      // or add element to current group in the end
      else {
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        map.get(currentGroup)!.items.add(element);
      }
    }

    const elements = new Map() as Parsed.GroupedElements<Parsed.Element>;
    Array.from(this.elements.values()).forEach((element) => {
      // Read groups and fallback if not available
      const groups = element.hasGroups ? element.groups : [fallbackGroupName];
      // Cycle potentially nested groups and add the element
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      groups!.forEach((group) => addGroupedElement(elements, group.split('/') as [string], element));
    });

    // deliver result
    return elements;
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
      get(t, p: keyof Parsed.Parser) {
        return p in t ? t[p] : _data[p];
      },
    });
  }
} as unknown as Parsed.Parser;
