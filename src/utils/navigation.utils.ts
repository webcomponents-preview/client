// import type { Config } from '@/utils/config.utils.js';
import type * as Parsed from '@/utils/parser.types.js';

export const ROUTE_ELEMENTS = '/element';
export const ROUTE_READMES = '/readme';

type GroupedNavigationItem = { name: string; link: string };

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
export function prepareElementNavigationItem(element: Parsed.Element): GroupedNavigationItem {
  const name = element.getNiceName();
  const link = `${ROUTE_ELEMENTS}/${element.getNiceUrl()}`;
  return { name, link };
}

/**
 * Predicate function to match a given content against a list of search terms.
 */
export function matchesSearch(content: string, terms: string[], minSearchLength = 1): boolean {
  const contents = content.toLowerCase();
  return terms.every((term) => term.length < minSearchLength || contents.includes(term));
}

/**
 * Filters the given navigation items by the given search terms recursively.
 */
export function filterItems(
  items: Parsed.GroupedElements,
  terms: string[],
  minSearchLength = 1,
): Parsed.GroupedElements {
  // check if we even want to filter
  if (terms.length < 1) return items;

  // filter the items, skip empty groups
  return Array.from(items.entries()).reduce((filtered, [group, item]) => {
    // filter nested groups
    if (item instanceof Map && item.size > 0) {
      const filteredItems = filterItems(item, terms, minSearchLength);
      if (filteredItems.size > 0) filtered.set(group, filteredItems);
      return filtered;
    }

    // filter elements and take group names into account as well
    const element = item as Parsed.Element;
    const searchable = `${element.groups.join(' ')} ${element.getNiceName()}`;
    if (matchesSearch(searchable, terms, minSearchLength)) {
      filtered.set(group, item);
    }

    // hand out result
    return filtered;
  }, new Map() as Parsed.GroupedElements);
}
