import type { Config } from '@/utils/config.utils.js';
import type { Element, Manifest } from '@/utils/parser.types.js';

const ROUTE_ELEMENTS = '/element';
const ROUTE_READMES = '/readme';

/**
 * Defines the structure of the navigation items.
 */
export type GroupedNavigationItems = Map<string, GroupedNavigationItem[]>;
export type GroupedNavigationItem = { name: string; link: string };

/**
 * Creates a navigation item for a given readme.
 */
export function prepareReadmeNavigationItem(name: string, url: string): GroupedNavigationItem {
  const link = `${ROUTE_READMES}/${encodeURIComponent(url)}`;
  return { name, link };
}

/**
 * Creates a navigation item for a given element.
 */
export function prepareElementNavigationItem(element: Element): GroupedNavigationItem {
  const name = element.getNiceName();
  const link = `${ROUTE_ELEMENTS}/${element.getNiceUrl()}`;
  return { name, link };
}

/**
 * Prepares a grouped navigation structure of readmes and elements.
 */
export function prepareNavigation(manifest: Manifest, config: Config): GroupedNavigationItems {
  const items: GroupedNavigationItems = new Map();

  // prepare readme navigation
  if (config.additionalReadmes?.length) {
    const readmes = config.additionalReadmes.reduce(
      (readmes, { name, url }) => [...readmes, prepareReadmeNavigationItem(name, url)],
      [] as GroupedNavigationItem[],
    );
    items.set(config.labels.additionalReadmeGroupName, readmes);
  }

  // prepare element navigation
  return (
    Array
      // prepare an array
      .from(manifest.getGroupedElements(config.labels.fallbackGroupName))
      // sort groups
      .sort(([a], [b]) => a.localeCompare(b))
      // fill into structure
      .reduce(
        (items, [group, elements]) =>
          items.set(
            group,
            elements
              // collect the items
              .reduce(
                (items, element) => [...items, prepareElementNavigationItem(element)],
                [] as GroupedNavigationItem[],
              )
              // and sort them
              .sort((a, b) => a.name.localeCompare(b.name)),
          ),
        items,
      )
  );
}

export function matchesSearch(content: string, terms: string[], minSearchLength = 1): boolean {
  const contents = content.toLowerCase();
  return terms.every((term) => term.length < minSearchLength || contents.includes(term));
}

export function filterItems(
  items: GroupedNavigationItems,
  terms: string[],
  minSearchLength = 1,
): GroupedNavigationItems {
  // check if we even want to filter
  if (terms.length < 1) return items;

  // filter the items, skip empty groups
  return Array.from(items.entries()).reduce((all, [group, items]) => {
    const filteredItems = [...items].filter(({ name }) => matchesSearch(`${group} ${name}`, terms, minSearchLength));
    if (filteredItems.length < 1) return all;
    return all.set(group, filteredItems);
  }, new Map() as GroupedNavigationItems);
}
