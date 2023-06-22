import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import type { GroupedNavigationItems } from '@/utils/navigation.utils.js';
import type { Router } from '@/utils/router.utils.js';

/**
 * Manages the main root-navigation in the application root.
 *
 * @element wcp-root-navigation
 */
@customElement('wcp-root-navigation')
export class RootNavigation extends LitElement {
  #router?: Router;

  @state()
  currentPath?: string;

  @property({ type: Number, reflect: true, attribute: 'min-search-length' })
  minSearchLength = 1;

  @property({ attribute: false })
  searchTerms: string[] = [];

  @property({ attribute: false })
  items: GroupedNavigationItems = new Map();

  @property({ attribute: false, noAccessor: true })
  set router(router: Router) {
    this.#router = router;
    window.addEventListener('hashchange', this.#updateCurrentRoute, false);
  }

  #updateCurrentRoute = () => {
    this.currentPath = this.#router?.currentPath;
  };

  #matchesSearch(content: string): boolean {
    if (this.searchTerms.length < 1) return true;
    const contents = content.toLowerCase();
    return this.searchTerms.every((term) => term.length < this.minSearchLength || contents.includes(term));
  }

  override disconnectedCallback() {
    window.removeEventListener('hashchange', this.#updateCurrentRoute, false);
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    return html`
      ${map(
        this.items.entries(),
        ([group, items]) => html`
          <wcp-navigation headline="${group}">
            ${map(
              items,
              ({ name, link }) => html`
                ${when(
                  this.#matchesSearch(`${group} ${name}`),
                  () => html`
                    <wcp-navigation-item ?active="${this.#router?.isActive(link)}" href="#${link}">
                      ${name}
                    </wcp-navigation-item>
                  `
                )}
              `
            )}
          </wcp-navigation>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-root-navigation': RootNavigation;
  }
}
