import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './preview-frame-viewer-stage.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-frame-viewer-stage>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-preview-frame-viewer-stage>
 * ```
 */
@customElement('wcp-preview-frame-viewer-stage')
export class PreviewFrameViewerStage extends LitElement {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html` <slot></slot> `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-viewer-stage': PreviewFrameViewerStage;
  }
}
