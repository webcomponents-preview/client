import type { Config } from '../utils/config.utils.js';
import type * as Parsed from '../utils/parser.types.js';
export declare const ROUTE_ELEMENTS = "/element";
export declare const ROUTE_READMES = "/readme";
/**
 * Creates a navigation item for a given readme.
 */
export declare function prepareReadmeLink(url: string): string;
/**
 * Creates a navigation item for a given element.
 */
export declare function prepareElementLink(element: Parsed.Element): string;
/**
 * Prepares a grouped navigation structure of readmes and elements.
 */
export declare function prepareNavigation(manifest: Parsed.Manifest, config: Config): Parsed.GroupedElements;
/**
 * Predicate function to match a given content against a list of search terms.
 */
export declare function matchesSearch(content: string, terms: string[], minSearchLength?: number): boolean;
/**
 * Filters the given navigation items by the given search terms recursively.
 */
export declare function filterItems(items: Parsed.GroupedElements, terms: string[], minSearchLength?: number): Parsed.GroupedElements;
