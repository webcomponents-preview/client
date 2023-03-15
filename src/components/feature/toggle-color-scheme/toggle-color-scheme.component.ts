import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

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
export class ToggleColorScheme extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @eventOptions({ passive: true })
  handleButtonClick() {}

  protected render(): TemplateResult {
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
