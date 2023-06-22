import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './preview-hint.component.scss';

/**
 * Shows a hint to a given preview element.
 *
 * @element wcp-preview-hint
 */
@customElement('wcp-preview-hint')
export class PreviewHint extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true })
  debug = false;

  @property({ attribute: false, noAccessor: true })
  set element(element: Element) {
    const { height, width } = element.getBoundingClientRect();
    this.style.setProperty('top', `${0}px`);
    this.style.setProperty('left', `${0}px`);
    this.style.setProperty('height', `${height}px`);
    this.style.setProperty('width', `${width}px`);
  }

  protected override render(): TemplateResult {
    return html`<button></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-hint': PreviewHint;
  }
}
