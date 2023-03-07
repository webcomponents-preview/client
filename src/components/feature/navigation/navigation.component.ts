import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import styles from './navigation.component.scss';

/**
 * @example
 * ### Usage with headline
 * 
 * ```html
 * <wcp-navigation headline="Navigation">
 *   <wcp-navigation-item href="/home">Home</wcp-navigation-item>
 *   <wcp-navigation-item href="/about">About</wcp-navigation-item>
 * </wcp-navigation>
 * ```
 * 
 * @slot - Default slot for navigation items
 */
@customElement('wcp-navigation')
export class Navigation extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  headline?: string;

  protected render(): TemplateResult {
    return html`
      ${when(this.headline !== undefined, () => html`<h3>${this.headline}</h3>`)}
      <nav>
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-navigation': Navigation;
  }
}
