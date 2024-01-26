import type { LitElement, TemplateResult } from 'lit';
export type Params = Record<string, string | undefined>;
export type Route = {
    path: string;
    enter?: (params: Params, router: Router, outgoingParams?: Params) => boolean | Promise<boolean>;
    render?: (params: Params, router: Router) => TemplateResult;
};
export type RegisterRoutes = (router: Router) => Route[];
export type ParsedUrl = {
    /**
     * Cleaned up path, derived from hash
     */
    path: string;
    /**
     * Prefixed url with base
     */
    url: string;
};
/**
 * Helps comparing param objects for equality
 */
export declare function areParamsEqual(a: Params, b: Params, exclude?: string[]): boolean;
/**
 * Merges two given sets of params.
 */
export declare function mergeParams(oldParams: Params, newParams: Params, exclude?: string[]): Params;
export declare class Router {
    #private;
    static isActive(path: string, currentPath?: string, exact?: boolean): boolean;
    /**
     * Redirect to a given path. This will trigger a hash change event.
     */
    static navigate(...slugs: (string | undefined)[]): void;
    get currentPath(): string | undefined;
    /**
     * Defines the routes for this router.
     */
    registerRoutes(routes: Route[]): void;
    /**
     * Checks if the given path is the currently active.
     */
    isActive(path: string, exact?: boolean): boolean;
    /**
     * Redirect to a given path. This will trigger a hash change event.
     * @alias Router.navigate
     * @todo check whether this should be removed in favor of the static method
     */
    redirect(...slugs: (string | undefined)[]): void;
    /**
     * Update the current path without triggering a redirect.
     */
    updateCurrent(path: string): void;
    constructor(host: LitElement);
    connect(): void;
    disconnect(): void;
    outlet(): TemplateResult;
}
