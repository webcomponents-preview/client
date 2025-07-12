import type { LitElement, TemplateResult } from 'lit';

import { log } from '@/utils/log.utils.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

export type Params = Record<string, string | undefined>;

export interface Route {
  path: string;
  enter?: (params: Params, router: Router, outgoingParams?: Params) => boolean | Promise<boolean>;
  render?: (params: Params, router: Router) => TemplateResult;
}

export type RegisterRoutes = (router: Router) => Route[];

export interface ParsedUrl {
  /**
   * Cleaned up path, derived from hash
   */
  path: string;

  /**
   * Prefixed url with base
   */
  url: string;
}

/**
 * Helps comparing param objects for equality
 */
export function areParamsEqual(a: Params, b: Params, exclude: string[] = []): boolean {
  return Object.entries(a)
    .filter(([key]) => !exclude.includes(key))
    .every(([key, value]) => b[key] === value);
}

/**
 * Merges two given sets of params.
 */
export function mergeParams(oldParams: Params, newParams: Params, exclude: string[] = []): Params {
  return Object.entries(newParams).reduce(
    (params, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      if (exclude.includes(key)) delete params[key];
      if (value !== undefined) params[key] = value;
      return params;
    },
    { ...oldParams },
  );
}

// a primitive hash router implementation
export class Router {
  readonly #host!: LitElement;
  #currentPath?: string;
  #currentParams: Params = {};
  #currentRoute?: Route;
  #routes: Route[] = [];

  static isActive(path: string, currentPath?: string, exact = false): boolean {
    const isSamePath = currentPath === path;
    const isNestedPath = currentPath?.startsWith(`${path}/`) ?? false;
    return isSamePath || (!exact && isNestedPath);
  }

  /**
   * Redirect to a given path. This will trigger a hash change event.
   */
  static navigate(...slugs: (string | undefined)[]) {
    const path = slugs.filter(Boolean).join('/');
    log.info(`Navigate to ${path}`);
    location.hash = path;
  }

  get currentPath(): string | undefined {
    return this.#currentPath;
  }

  /**
   * Defines the routes for this router.
   */
  registerRoutes(routes: Route[]) {
    this.#routes = routes;
    log.info(`Registered ${routes.length} routes`);
  }

  /**
   * Checks if the given path is the currently active.
   */
  isActive(path: string, exact = false): boolean {
    return Router.isActive(path, this.#currentPath, exact);
  }

  /**
   * Redirect to a given path. This will trigger a hash change event.
   * @alias Router.navigate
   * @todo check whether this should be removed in favor of the static method
   */
  redirect(...slugs: (string | undefined)[]) {
    Router.navigate(...slugs);
  }

  /**
   * Update the current path without triggering a redirect.
   */
  updateCurrent(path: string) {
    log.info(`Update to ${path}`);
    const url = new URL(location.href);
    url.hash = path;
    history.replaceState({}, '', url);
  }

  constructor(host: LitElement) {
    this.#host = host;
  }

  #withBaseUrl(path = location.pathname): string {
    return `${location.origin}${path}`;
  }

  #createPattern(path: string): URLPattern {
    return new URLPattern(this.#withBaseUrl(path));
  }

  #parseUrl(url: string): ParsedUrl {
    const { hash } = new URL(url);
    const path = hash.replace(/^#/, '');
    return { path, url: this.#withBaseUrl(path) };
  }

  #findRouteForUrl(url: string): Route | undefined {
    return this.#routes.find(({ path }) => this.#createPattern(path).test(url));
  }

  #findCurrentRoute = (async (event: HashChangeEvent) => {
    // find next path and route
    const { path: nextPath, url: nextUrl } = this.#parseUrl(event.newURL);
    const nextRoute = this.#findRouteForUrl(nextUrl);

    // what's going on?
    log.info(`Route changed to ${nextPath}`);

    // no route found
    if (nextRoute === undefined) {
      log.error(`No route found for ${nextPath}`);
      throw new Error(`No route found for ${nextPath}`);
    }

    // derive params
    let outgoingParams: Params | undefined;
    const nextPattern = this.#createPattern(nextRoute.path);
    const nextParams = nextPattern.exec(nextUrl)?.pathname.groups ?? {};

    // derive params from current url - as we do not want to have a generic
    // param handling strategy, we just pass the current params to the onEnter
    // route method as well and let the implementor decide what to do with them
    if (event.oldURL !== '') {
      // we do basically the same as above, but for the old url
      const { url: pastUrl } = this.#parseUrl(event.oldURL);
      // we can cast this to "defined", as we know that the current route must exist
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const pastRoute = this.#findRouteForUrl(pastUrl)!;
      const pastPattern = this.#createPattern(pastRoute.path);
      outgoingParams = pastPattern.exec(pastUrl)?.pathname.groups ?? {};
    }

    // match on enter
    if (typeof nextRoute.enter === 'function') {
      const success = await nextRoute.enter(nextParams, this, outgoingParams);
      if (success === false) return;
    }

    // update state
    this.#currentPath = nextPath;
    this.#currentParams = nextParams;
    this.#currentRoute = nextRoute;
    this.#host.requestUpdate();
  }).bind(this);

  connect() {
    // register hash change listener
    window.addEventListener('hashchange', this.#findCurrentRoute, false);
    // call the detection initially
    const event = new HashChangeEvent('hashchange', { newURL: location.href });
    this.#findCurrentRoute(event);

    log.info('Connected router');
  }

  disconnect() {
    // unregister hash change listener
    window.removeEventListener('hashchange', this.#findCurrentRoute, false);
  }

  outlet(): TemplateResult {
    return this.#currentRoute?.render?.(this.#currentParams, this) as TemplateResult;
  }
}
