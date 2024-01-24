import type { Config } from '@/utils/config.utils.js';
import type * as Parsed from '@/utils/parser.types.js';

const ROUTE_ELEMENTS = '/element';
const ROUTE_READMES = '/readme';

/**
 * Defines the structure of the navigation items.
 */
export type GroupedNavigationItems = Parsed.GroupedElements<GroupedNavigationItem>;
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
export function prepareElementNavigationItem(element: Parsed.Element): GroupedNavigationItem {
  const name = element.getNiceName();
  const link = `${ROUTE_ELEMENTS}/${element.getNiceUrl()}`;
  return { name, link };
}

/**
 * Recursively builds the grouped navigation structure from grouped elements.
 */
export function buildGroupedNavigation(
  groupedElements: Parsed.GroupedElements<Parsed.Element>,
): GroupedNavigationItems {
  return Array.from(groupedElements)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((grouped, [group, item]) => {
      // create the current group if not exists
      if (!grouped.has(group)) {
        grouped.set(group, {
          items: new Set(),
          groups: new Map(),
        });
      }

      // read existing groups and items
      let { groups, items } = grouped.get(group)!;

      // add groups
      if (item.groups.size > 0) {
        groups = new Map([...groups, ...buildGroupedNavigation(item.groups)]);
      }

      // add elements (and sort again)
      if (item.items.size > 0) {
        item.items.forEach((element) => items.add(prepareElementNavigationItem(element)));
        items = new Set([...items].sort((a, b) => a.name.localeCompare(b.name)));
      }

      return grouped.set(group, { items, groups });
    }, new Map() as GroupedNavigationItems);
}

/**
 * Prepares a grouped navigation structure of readmes and elements.
 */
export function prepareNavigation(manifest: Parsed.Manifest, config: Config): GroupedNavigationItems {
  const items: GroupedNavigationItems = new Map();

  // prepare readme navigation
  if (config.additionalReadmes?.length) {
    const readmes = config.additionalReadmes.reduce(
      (readmes, { name, url }) => readmes.add(prepareReadmeNavigationItem(name, url)),
      new Set<GroupedNavigationItem>(),
    );
    items.set(config.labels.additionalReadmeGroupName, { items: readmes, groups: new Map() });
  }

  const elements = manifest.groupedElements(config.labels.fallbackGroupName);
  return buildGroupedNavigation(elements);
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
  items: GroupedNavigationItems,
  terms: string[],
  minSearchLength = 1,
): GroupedNavigationItems {
  // check if we even want to filter
  if (terms.length < 1) return items;

  // filter the items, skip empty groups
  return Array.from(items.entries()).reduce((all, [group, { groups, items }]) => {
    // fast exit on empty groups and items
    if (items.size < 1 && groups.size < 1) return all;

    // filter items and groups recursively
    items = new Set([...items].filter(({ name }) => matchesSearch(`${group} ${name}`, terms, minSearchLength)));
    groups = filterItems(groups, terms, minSearchLength);

    // hand out filtered items
    return all.set(group, { items, groups });
  }, new Map() as GroupedNavigationItems);
}
