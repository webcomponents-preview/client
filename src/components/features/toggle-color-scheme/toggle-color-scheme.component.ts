import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { persist } from '@/utils/state.utils.js';

import styles from './toggle-color-scheme.component.scss';

/**
 * Shows a button to toggle the desired color-scheme.
 *
 */
@customElement('wcp-toggle-color-scheme')
export class ToggleColorScheme extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @eventOptions({ passive: true })
  handleButtonClick() {
    const colorScheme = this.colorScheme === 'dark' ? 'light' : 'dark';
    persist('color-scheme', colorScheme);
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
