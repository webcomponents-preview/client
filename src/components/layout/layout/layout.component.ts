import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

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
 * @slot aside - Projects elements aside the main content
 * @slot - Receives the content of the main section
 */
@customElement('wcp-layout')
export class Layout extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  protected override render(): TemplateResult {
    return html`
      <wcp-aside>
        <slot name="title" slot="header"></slot>
        <slot name="aside"></slot>
      </wcp-aside>

      <wcp-main>
        <slot></slot>
      </wcp-main>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-layout': Layout;
  }
}
