import { LitElement, type TemplateResult, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { filterItems, type GroupedNavigationItems } from '@/utils/navigation.utils.js';
import { Router } from '@/utils/router.utils.js';

/**
 * Manages the main root-navigation in the application root.
 *
 * @element wcp-root-navigation
 */
@customElement('wcp-root-navigation')
export class RootNavigation extends LitElement {
  #items: GroupedNavigationItems = new Map();
  #searchTerms: string[] = [];

  @state()
  private filteredItems: GroupedNavigationItems = new Map();

  @property({ type: String, reflect: true, attribute: 'current-path' })
  currentPath?: string;

  @property({ type: Number, reflect: true, attribute: 'min-search-length' })
  minSearchLength = 1;

  @property({ attribute: false, noAccessor: true })
  set searchTerms(terms: string[]) {
    this.#searchTerms = terms;
    this.filteredItems = filterItems(this.#items, this.#searchTerms, this.minSearchLength);
  }

  @property({ attribute: false, noAccessor: true })
  set items(items: GroupedNavigationItems) {
    this.#items = items;
    this.filteredItems = filterItems(this.#items, this.#searchTerms, this.minSearchLength);
  }

  protected override render(): TemplateResult {
    return html`
      ${map(
        this.filteredItems.entries(),
        ([group, items]) => html`
          ${when(
            items.size > 0,
            () => html`
              <wcp-navigation headline="${group}">
                ${map(
                  items,
                  ({ name, link }) => html`
                    <wcp-navigation-item ?active="${Router.isActive(link, this.currentPath)}" href="#${link}">
                      ${name}
                    </wcp-navigation-item>
                  `
                )}
              </wcp-navigation>
            `
          )}
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
