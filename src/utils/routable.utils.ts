import type { LitElement, TemplateResult } from 'lit';
import type { Constructor } from '@/utils/mixin.types.js';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import('urlpattern-polyfill');
}

declare class RoutableInterface {
  router: Router;
}

export type Params = Record<string, string | undefined>;

export type Route = {
  path: string;
  enter?: (params: Params, router: Router) => boolean;
  render?: (params: Params, router: Router) => TemplateResult;
};

// a primitive hash router implementation
class Router {
  readonly #host!: LitElement;
  #currentPath?: string;
  #currentParams: Params = {};
  #currentRoute?: Route;
  #routes: Route[] = [];

  get currentPath(): string | undefined {
    return this.#currentPath;
  }

  registerRoutes(routes: Route[]) {
    this.#routes = routes;
  }

  isActive(path: string): boolean {
    return this.#currentPath === path;
  }

  redirect(path: string) {
    location.hash = path;
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

  #findCurrentRoute = (async (event: HashChangeEvent) => {
    // find next path and route
    const { hash } = new URL(event.newURL);
    const nextPath = hash.replace(/^#/, '');
    const nextUrl = this.#withBaseUrl(nextPath);
    const nextRoute = this.#routes.find(({ path }) => this.#createPattern(path).test(nextUrl));

    // no route found
    if (nextRoute === undefined) {
      throw new Error(`No route found for ${nextPath}`);
    }

    // derive new params
    const pattern = this.#createPattern(nextRoute.path);
    const nextParams = pattern.exec(nextUrl)?.pathname.groups ?? {};

    // match on enter
    if (typeof nextRoute.enter === 'function') {
      const success = nextRoute.enter(nextParams, this);
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
  }

  disconnect() {
    // unregister hash change listener
    window.removeEventListener('hashchange', this.#findCurrentRoute, false);
  }

  outlet(): TemplateResult {
    // return this.#routes.find((route) => route.pattern.test(location.hash))?.render();
    return this.#currentRoute?.render?.(this.#currentParams, this) as TemplateResult;
  }
}

// provide a mixin to make a component routable
export const Routable = <T extends Constructor<LitElement>>(superClass: T) => {
  class RoutableElement extends superClass {
    /**
     * @internal - allows access to routing features
     */
    router = new Router(this);

    override connectedCallback() {
      super.connectedCallback();
      this.router.connect();
    }

    override disconnectedCallback() {
      super.disconnectedCallback();
      this.router.disconnect();
    }
  }
  return RoutableElement as Constructor<RoutableInterface> & T;
};
