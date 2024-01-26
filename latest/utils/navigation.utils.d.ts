import type * as Parsed from '../utils/parser.types.js';
export declare const ROUTE_ELEMENTS = "/element";
export declare const ROUTE_READMES = "/readme";
type GroupedNavigationItem = {
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
export declare function prepareElementNavigationItem(element: Parsed.Element): GroupedNavigationItem;
/**
 * Predicate function to match a given content against a list of search terms.
 */
export declare function matchesSearch(content: string, terms: string[], minSearchLength?: number): boolean;
/**
 * Filters the given navigation items by the given search terms recursively.
 */
export declare function filterItems(items: Parsed.GroupedElements, terms: string[], minSearchLength?: number): Parsed.GroupedElements;
export {};
