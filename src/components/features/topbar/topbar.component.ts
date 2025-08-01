import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './topbar.component.scss';

/**
 * A wrapper above the preview frame content to contain various controls.
 *
 * @slot - Default slot for navigation items
 *
 * @cssprop --wcp-topbar-dark-background - Background color of the controls in dark mode
 * @cssprop --wcp-topbar-dark-color - Text color of the controls in dark mode
 * @cssprop --wcp-topbar-light-background - Background color of the controls in light mode
 * @cssprop --wcp-topbar-light-color - Text color of the controls in light mode
 *
 * @cssprop --wcp-topbar-height - Overall height of the preview controls nav bar
 * @cssprop --wcp-topbar-spacing - Inner spacing, used as padding of the controls
 *
 */
@customElement('wcp-topbar')
export class Topbar extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-topbar': Topbar;
  }
}
