import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { filterItems, prepareElementNavigationItem } from '@/utils/navigation.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import { Router } from '@/utils/router.utils.js';

import styles from './root-navigation.component.scss';

/**
 * Manages the main root-navigation in the application root.
 *
 * @cssprop --wcp-root-navigation-empty-message-spacing - The spacing of the empty message.
 * @cssprop --wcp-root-navigation-empty-message-font-size - The font size of the empty message.
 */
@customElement('wcp-root-navigation')
export class RootNavigation extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  #items: Parsed.GroupedElements = new Map();
  #searchTerms: string[] = [];

  @state()
  private filteredItems: Parsed.GroupedElements = new Map();

  @property({ type: String, reflect: true, attribute: 'current-path' })
  currentPath?: string;

  @property({ type: String, reflect: true, attribute: 'empty-message' })
  emptyMessage = 'No readmes nor elements found.';

  @property({ type: Number, reflect: true, attribute: 'min-search-length' })
  minSearchLength = 1;

  @property({ attribute: false, noAccessor: true })
  set searchTerms(terms: string[]) {
    this.#searchTerms = terms;
    this.filteredItems = filterItems(this.#items, this.#searchTerms, this.minSearchLength);
  }

  @property({ attribute: false, noAccessor: true })
  set items(items: Parsed.GroupedElements) {
    this.#items = items;
    this.filteredItems = filterItems(this.#items, this.#searchTerms, this.minSearchLength);
  }

  protected renderItem(element: Parsed.Element): TemplateResult {
    const { link, name } = prepareElementNavigationItem(element);
    return html`
      <wcp-navigation-item ?active="${Router.isActive(link, this.currentPath)}" href="#${link}">
        ${name}
      </wcp-navigation-item>
    `;
  }

  protected renderItems(items: Parsed.GroupedElements, nested = false): TemplateResult | undefined {
    if (!items.size) return undefined;

    return html`${map(
      items.entries(),
      ([group, element]) => html`
        ${when(
          element instanceof Map && element.size > 0,
          () => html`
            <wcp-navigation headline="${group}" ?nested="${nested}">
              ${this.renderItems(element as Parsed.GroupedElements, true)}
            </wcp-navigation>
          `,
          () => this.renderItem(element as Parsed.Element),
        )}
      `,
    )}`;
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.filteredItems.size > 0,
        () => this.renderItems(this.filteredItems),
        () => html`<p>${this.emptyMessage}</p>`,
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-root-navigation': RootNavigation;
  }
}
