import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './viewer-stage.component.scss';

/**
 * @example
 * ```html
 * <wcp-viewer-stage>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-viewer-stage>
 * ```
 */
@customElement('wcp-viewer-stage')
export class ViewerStage extends LitElement {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-viewer-stage': ViewerStage;
  }
}
