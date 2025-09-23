import type * as CEM from 'custom-elements-manifest';

import type * as Parsed from '@/utils/parser.types.js';

import { prepareElementLink } from '../../../utils/navigation.utils.js';
import { isCustomElementDeclarationWithTagName } from '../utils.js';
import { CemElement } from './cem-element.js';

export const CemParser = class {
  #elements: Map<string, Parsed.Element>;

  get elements() {
    return this.#elements;
  }

  groupedElements(fallbackGroupName: string): Parsed.GroupedElements {
    // sort a given map
    function sortGroupedElements(map: Parsed.GroupedElements): Parsed.GroupedElements {
      return new Map([...map.entries()].sort(([a], [b]) => a.localeCompare(b)));
    }

    // helper function to recursively add a grouped element
    function addGroupedElement(map: Parsed.GroupedElements, group: [string, ...string[]], element: Parsed.Element) {
      // read current and nested groups
      const [currentGroup, ...nestedGroups] = group;

      // create the current group if not exists
      const currentMap = (map.get(currentGroup) ?? new Map()) as Parsed.GroupedElements;

      // add nested groups recursively
      if (nestedGroups.length > 0) {
        addGroupedElement(currentMap, nestedGroups as [string], element);
      }
      // or add element to current group
      else {
        const name = element.getNiceName();
        currentMap.set(name, { element, name, link: prepareElementLink(element) });
      }

      // finally, sort the map
      const sortedMap = sortGroupedElements(currentMap);
      map.set(currentGroup, sortedMap);
    }

    const elements = new Map() as Parsed.GroupedElements;
    Array.from(this.elements.values()).forEach(element => {
      // Read groups and fallback if not available
      const groups = element.hasGroups ? element.groups : [fallbackGroupName];
      // Cycle potentially nested groups and add the element
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      groups!.forEach(group => addGroupedElement(elements, group.split('/') as [string], element));
    });

    // deliver result
    return sortGroupedElements(elements);
  }

  constructor(
    private _data: CEM.Package,
    exclude: string[] = []
  ) {
    // parse the elements
    this.#elements = this._data.modules
      .flatMap(module => module.declarations)
      .filter(isCustomElementDeclarationWithTagName)
      .filter(element => !exclude.includes(element.tagName))
      .reduce((map, element) => map.set(element.tagName, new CemElement(element)), new Map());

    // allow access to the original data by proxying
    return new Proxy(this, {
      get(t, p: keyof Parsed.Parser) {
        return p in t ? t[p] : _data[p];
      },
    });
  }
} as unknown as Parsed.Parser;
