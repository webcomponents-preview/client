import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';

import styles from './preview-controls.component.scss';

/**
 * A wrapper above the preview frame content to contain various controls.
 * 
 * @element wcp-preview-controls
 * 
 * @slot - Default slot for navigation items
 * 
 * @cssprop --wcp-preview-controls-dark-color - Text color of the controls in dark mode
 * @cssprop --wcp-preview-controls-light-color - Text color of the controls in light mode
 * 
 * @cssprop --wcp-preview-controls-height - Overall height of the preview controls nav bar
 * @cssprop --wcp-preview-controls-spacing - Inner spacing, used as padding of the controls
 * 
 * @example
 * ### Usage with controls
 * 
 * ```html
 * <wcp-preview-controls>
 *   <wcp-toggle-sidebar></wcp-toggle-sidebar>
 *   <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
 * </wcp-preview-controls>
 * ```
 */
@customElement('wcp-preview-controls')
export class PreviewControls extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-controls': PreviewControls;
  }
}
