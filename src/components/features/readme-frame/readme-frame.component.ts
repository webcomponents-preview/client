import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './readme-frame.component.scss';

/**
 * @slot - The readme frame is usually filled with a readme element.
 *
 * @cssprop --wcp-readme-frame-spacing - Inner padding of the preview frame
 */
@customElement('wcp-readme-frame')
export class ReadmeFrame extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-readme-frame': ReadmeFrame;
  }
}
