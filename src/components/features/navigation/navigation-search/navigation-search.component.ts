import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './navigation-search.component.scss';

/**
 * @element wcp-navigation-search
 *
 * @emits wcp-navigation-search:search - Fired when the search term changes. Carries the new search term with it.
 *
 * @cssprop --wcp-navigation-search-spacing - The spacing around the search input.
 * 
 * @cssprop --wcp-navigation-search-passive-dark-stroke - The stroke color of the search input in dark mode when not focused.
 * @cssprop --wcp-navigation-search-passive-light-stroke - The stroke color of the search input in light mode when not focused.
 * 
 * @cssprop --wcp-navigation-search-active-dark-stroke - The stroke color of the search input in dark mode when focused.
 * @cssprop --wcp-navigation-search-active-light-stroke - The stroke color of the search input in light mode when focused.
 */
@customElement('wcp-navigation-search')
export class NavigationSearch extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  term = '';

  @eventOptions({ capture: false, passive: true })
  protected handleSearchInput(event: InputEvent) {
    const { value } = event.target as HTMLInputElement;
    this.#updateSearchTerm(value);
  }

  @eventOptions({ capture: false, passive: true })
  protected handleResetClick() {
    this.#updateSearchTerm('');
  }

  #updateSearchTerm(term: string) {
    this.term = term;
    this.dispatchEvent(new CustomEvent('wcp-navigation-search:search', { detail: term }));
  }

  protected override render(): TemplateResult {
    return html`
      <wcp-input-text type="search" .value="${this.term}" @input="${this.handleSearchInput}">
        <wcp-icon slot="before" name="search"></wcp-icon>
        ${when(
          this.term.length > 0,
          () => html`
            <wcp-button slot="after" kind="icon" @click="${this.handleResetClick}">
              <wcp-icon name="close"></wcp-icon>
            </wcp-button>
          `
        )}
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
