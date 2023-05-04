import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './readme-frame.component.scss';

/**
 * @example
 * ```html
 * <wcp-readme-frame></wcp-readme-frame>
 * ```
 *
 * @slot - The readme frame is usually filled with a readme element.
 *
 * @cssprop --wcp-readme-frame-distance - Outer margin of the preview frame
 * @cssprop --wcp-readme-frame-spacing - Inner padding of the preview frame
 */
@customElement('wcp-readme-frame')
export class ReadmeFrame extends LitElement {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-readme-frame': ReadmeFrame;
  }
}
