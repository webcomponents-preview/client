import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import styles from './layout.component.scss';

/**
 * @example
 * ```html
 * <wcp-layout>
 *   <nav slot="aside">To the left!</nav>
 *   <article>Me the important content!</article>
 * </wcp-layout>
 * ```
 * 
 * @example
 * ### Hidden contents
 * 
 * ```html
 * <wcp-layout hidden>
 *   <nav slot="aside">To the left!</nav>
 * </wcp-layout>
 * ```
 * 
 * @slot aside - Projects elements aside the main content
 * @slot - Receives the content of the main section
 */
@customElement('wcp-layout')
export class Layout extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true, attribute: 'hide-aside' })
  hideAside = false;

  @eventOptions({ passive: true })
  handleAsideToggle() {
    this.hideAside = !this.hideAside;
  }

  protected render(): TemplateResult {
    return html`
      <aside>
        <header>
          <button class="toggle-aside" @click="${this.handleAsideToggle}">
            <wcp-icon name="${this.hideAside ? 'menu' : 'close'}"></wcp-icon>
          </button>
        </header>
        <slot name="aside"></slot>
      </aside>

      <main>
        <slot></slot>
      </main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-layout': Layout;
  }
}
