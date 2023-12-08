import type { Config } from '@/utils/config.utils.js';
import type { Element, Manifest } from '@/utils/parser.types.js';
/**
 * Defines the structure of the navigation items.
 */
export type GroupedNavigationItems = Map<string, GroupedNavigationItem[]>;
export type GroupedNavigationItem = {
    name: string;
    link: string;
};
/**
 * Creates a navigation item for a given readme.
 */
export declare function prepareReadmeNavigationItem(name: string, url: string): GroupedNavigationItem;
/**
 * Creates a navigation item for a given element.
 */
export declare function prepareElementNavigationItem(element: Element): GroupedNavigationItem;
/**
 * Prepares a grouped navigation structure of readmes and elements.
 */
export declare function prepareNavigation(manifest: Manifest, config: Config): GroupedNavigationItems;
export declare function matchesSearch(content: string, terms: string[], minSearchLength?: number): boolean;
export declare function filterItems(items: GroupedNavigationItems, terms: string[], minSearchLength?: number): GroupedNavigationItems;
