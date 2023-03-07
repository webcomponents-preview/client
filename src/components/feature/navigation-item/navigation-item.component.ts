import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import styles from './navigation-item.component.scss';

/**
 * @example
 * ### Non-interactive
 *
 * This will probably only be used for the active item.
 *
 * ```html
 * <wcp-navigation-item>
 *   Non-interactive
 * </wcp-navigation-item>
 * ```
 *
 * @example
 * ### With link
 *
 * ```html
 * <wcp-navigation-item href="/home">
 *   Home
 * </wcp-navigation-item>
 * ```
 * 
 * @slot - Default slot for contents
 */
@customElement('wcp-navigation-item')
export class NavigationItem extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true })
  active = false;

  @property({ type: String, reflect: true })
  href?: string;

  protected render(): TemplateResult {
    return html`
      ${when(
        this.href !== undefined,
        () => html`<a href="${this.href}"><slot></slot></a>`,
        () => html`<span><slot></slot></span>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-navigation-item': NavigationItem;
  }
}
