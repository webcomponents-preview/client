import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

import { persist, read } from '@/utils/state.utils.js';

import styles from './toggle-sidebar.component.scss';

/**
 * Shows a button to toggle sidebar.
 *
 */
@customElement('wcp-toggle-sidebar')
export class ToggleSidebar extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @eventOptions({ passive: true })
  handleButtonClick() {
    persist('aside-visible', !read('aside-visible'));
  }

  protected override render(): TemplateResult {
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
