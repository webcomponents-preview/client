import type { Config } from '@/utils/config.utils.js';
import type * as Parsed from '@/utils/parser.types.js';

export const ROUTE_ELEMENTS = '/element';
export const ROUTE_READMES = '/readme';

/**
 * Creates a navigation item for a given readme.
 */
export function prepareReadmeLink(url: string): string {
  return `${ROUTE_READMES}/${encodeURIComponent(url)}`;
}

/**
 * Creates a navigation item for a given element.
 */
export function prepareElementLink(element: Parsed.Element): string {
  return `${ROUTE_ELEMENTS}/${element.getNiceUrl()}`;
}

/**
 * Prepares a grouped navigation structure of readmes and elements.
 */
export function prepareNavigation(manifest: Parsed.Manifest, config: Config): Parsed.GroupedElements {
  const items = new Map() as Parsed.GroupedElements;
  const group = config.labels.additionalReadmeGroupName;

  // prepare readme navigation
  if (config.additionalReadmes?.length) {
    const readmes = config.additionalReadmes.reduce((readmes, { name, url }) => {
      const element = {
        hasGroups: true,
        groups: [group],
        name,
        getNiceName: () => name,
      } as unknown as Parsed.Element;
      return readmes.set(name, { name, link: prepareReadmeLink(url), element });
    }, new Map() as Parsed.GroupedElements);
    items.set(group, readmes);
  }

  const elements = manifest.groupedElements(config.labels.fallbackGroupName);
  return new Map([...items, ...elements]);
}

/**
 * Predicate function to match a given content against a list of search terms.
 */
export function matchesSearch(content: string, terms: string[], minSearchLength = 1): boolean {
  const contents = content.toLowerCase();
  return terms.every(term => term.length < minSearchLength || contents.includes(term));
}

/**
 * Filters the given navigation items by the given search terms recursively.
 */
export function filterItems(
  items: Parsed.GroupedElements,
  terms: string[],
  minSearchLength = 1
): Parsed.GroupedElements {
  // check if we even want to filter
  if (terms.length < 1) {
    return items;
  }

  // filter the items, skip empty groups
  return Array.from(items.entries()).reduce((filtered, [group, item]) => {
    // filter nested groups
    if (item instanceof Map && item.size > 0) {
      const filteredItems = filterItems(item, terms, minSearchLength);
      if (filteredItems.size > 0) {
        filtered.set(group, filteredItems);
      }
      return filtered;
    }

    // filter elements and take group names into account as well
    const { element } = item as Parsed.GroupedElement;
    const searchable = `${element.groups.join(' ')} ${element.getNiceName()}`;
    if (matchesSearch(searchable, terms, minSearchLength)) {
      filtered.set(group, item);
    }

    // hand out result
    return filtered;
  }, new Map() as Parsed.GroupedElements);
}
