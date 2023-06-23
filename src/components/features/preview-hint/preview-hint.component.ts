import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getRelativeBoundary } from '@/utils/dom.utils.js';

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
  set element(element: HTMLElement | undefined) {
    if (element === undefined) {
      this.removeAttribute('style');
    } else {
      const { height, width, x, y } = getRelativeBoundary(element);
      this.style.setProperty('top', `${y}px`);
      this.style.setProperty('left', `${x}px`);
      this.style.setProperty('height', `${height}px`);
      this.style.setProperty('width', `${width}px`);
    }
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
