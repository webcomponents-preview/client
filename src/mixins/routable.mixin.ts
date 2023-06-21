import type { LitElement } from 'lit';

import type { Constructor } from '@/utils/mixin.types.js';
import { type RegisterRoutes, Router } from '@/utils/router.utils.js';

declare class RoutableInterface {
  router: Router;
}

// provide a mixin to make a component routable
export const Routable =
  (registerRoutes?: RegisterRoutes) =>
  <T extends Constructor<LitElement>>(superClass: T) => {
    class RoutableElement extends superClass {
      /**
       * @internal - allows access to routing features
       */
      router = new Router(this);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      constructor(...args: any[]) {
        super(...args);

        // allow setting routes from decorator
        if (registerRoutes !== undefined) {
          const routes = registerRoutes(this.router);
          this.router.registerRoutes(routes);
        }
      }

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
