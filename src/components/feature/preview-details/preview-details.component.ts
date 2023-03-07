import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './preview-details.component.scss';

@customElement('wcp-preview-details')
export class PreviewDetails extends LitElement {
  static readonly styles = unsafeCSS(styles);

  protected render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-details': PreviewDetails;
  }
}
