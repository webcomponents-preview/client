import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

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
 * @slot header - Shows contents fixed above the aside
 * @slot aside - Projects elements aside the main content
 * @slot - Receives the content of the main section
 */
@customElement('wcp-layout')
export class Layout extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  protected override render(): TemplateResult {
    return html`
      <wcp-aside>
        <slot name="header" slot="header"></slot>
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
