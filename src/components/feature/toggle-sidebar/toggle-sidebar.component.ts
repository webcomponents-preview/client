import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

import styles from './toggle-sidebar.component.scss';

/**
 * Shows a button to toggle sidebar.
 *
 * @example
 * ```html
 * <wcp-wcp-toggle-sidebar></wcp-wcp-toggle-sidebar>
 * ```
 */
@customElement('wcp-toggle-sidebar')
export class ToggleSidebar extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @eventOptions({ passive: true })
  handleButtonClick() {
    window.dispatchEvent(new CustomEvent('wcp-aside:toggle'));
  }

  protected render(): TemplateResult {
    return html`
      <wcp-button kind="icon" @click="${this.handleButtonClick}"><wcp-icon name="menu"></wcp-icon></wcp-button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-toggle-sidebar': ToggleSidebar;
  }
}
