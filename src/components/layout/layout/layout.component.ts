import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './layout.component.scss';

/**
 * @cssprop --wcp-layout-dark-background - The background color of the whole layout
 * @cssprop --wcp-layout-dark-color - The text color of the whole layout
 *
 * @cssprop --wcp-layout-light-background - The background color of the whole layout
 * @cssprop --wcp-layout-light-color - The text color of the whole layout
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
