import type { Config } from '@/utils/config.utils.js';
import type { Element, Manifest } from '@/utils/parser.types.js';

const ROUTE_ELEMENTS = '/element';
const ROUTE_READMES = '/readme';
const FALLBACK_COMPONENTS_GROUP_NAME = 'Components';
const FALLBACK_READMES_GROUP_NAME = 'Readmes';

/**
 * Defines the structure of the navigation items.
 */
export type GroupedNavigationItems = Map<string, Set<GroupedNavigationItem>>;
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
    const readmesGroupName = config.additionalReadmeGroupName ?? FALLBACK_READMES_GROUP_NAME;
    const readmes = config.additionalReadmes.reduce(
      (readmes, { name, url }) => readmes.add(prepareReadmeNavigationItem(name, url)),
      new Set<GroupedNavigationItem>()
    );
    items.set(readmesGroupName, readmes);
  }

  // prepare element navigation
  const elementsGroupName = config.fallbackGroupName ?? FALLBACK_COMPONENTS_GROUP_NAME;
  const elements = Array.from(manifest.getGroupedElements(elementsGroupName));

  return elements.reduce(
    (items, [group, elements]) =>
      items.set(
        group,
        elements.reduce(
          (items, element) => items.add(prepareElementNavigationItem(element)),
          new Set<GroupedNavigationItem>()
        )
      ),
    items
  );
}
