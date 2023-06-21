import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './navigation-search.component.scss';

/**
 * @element wcp-navigation-search
 *
 * @emits wcp-navigation-search:search - Fired when the search term changes. Carries the new search term with it.
 *
 * @cssprop --wcp-navigation-search-spacing - The spacing around the search input.
 * @cssprop --wcp-navigation-search-dark-border - The border color of the search input in dark mode.
 * @cssprop --wcp-navigation-search-light-border - The border color of the search input in light mode.
 */
@customElement('wcp-navigation-search')
export class NavigationSearch extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  term = '';

  @eventOptions({ capture: false, passive: true })
  protected handleSearchInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement;
    this.updateSearchTerm(value);
  }

  @eventOptions({ capture: false, passive: true })
  protected handleResetClick() {
    this.updateSearchTerm('');
  }

  protected updateSearchTerm(term: string) {
    this.dispatchEvent(new CustomEvent('wcp-navigation-search:search', { detail: term }));
  }

  protected override render(): TemplateResult {
    return html`
      <wcp-input-text type="search" .value="${this.term}" @input="${this.handleSearchInput}">
        <wcp-icon slot="before" name="search"></wcp-icon>
        <wcp-button slot="after" kind="icon" @click="${this.handleResetClick}">
          <wcp-icon name="close"></wcp-icon>
        </wcp-button>
      </wcp-input-text>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-navigation-search:search': CustomEvent<string>;
  }

  interface HTMLElementTagNameMap {
    'wcp-navigation-search': NavigationSearch;
  }
}
