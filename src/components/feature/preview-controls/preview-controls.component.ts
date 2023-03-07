import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './preview-controls.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-controls></wcp-preview-controls>
 * ```
 * @example
 * ### Usage with controls
 * 
 * ```html
 * <wcp-preview-controls>
 *   <wcp-preview-controls-viewport></wcp-preview-controls-viewport>
 * </wcp-preview-controls>
 * ```
 * 
 * @slot - Default slot for navigation items
 */
@customElement('wcp-preview-controls')
export class PreviewControls extends LitElement {
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
