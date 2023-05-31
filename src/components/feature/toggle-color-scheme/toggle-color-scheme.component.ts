import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';

import styles from './toggle-color-scheme.component.scss';

/**
 * Shows a button to toggle the desired color-scheme.
 *
 * @example
 * ```html
 * <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
 * ```
 */
@customElement('wcp-toggle-color-scheme')
export class ToggleColorScheme extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  override colorScheme = matchMedia('(prefers-color-scheme: dark)').matches ? ('dark' as const) : ('light' as const);

  @eventOptions({ passive: true })
  handleButtonClick() {
    const detail = this.colorScheme === 'dark' ? 'light' : 'dark';
    const event = new CustomEvent('wcp-color-scheme:toggle', { detail });
    window.dispatchEvent(event);
  }

  protected override render(): TemplateResult {
    return html`
      <wcp-button kind="icon" @click="${this.handleButtonClick}">
        <wcp-icon name="${this.colorScheme === 'dark' ? 'moon' : 'sun'}"></wcp-icon>
      </wcp-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-toggle-color-scheme': ToggleColorScheme;
  }
}
