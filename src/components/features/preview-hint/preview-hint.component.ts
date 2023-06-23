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

  #element?: HTMLElement;
  #scrollParent?: HTMLElement;

  @property({ type: Boolean, reflect: true })
  debug = false;

  @property({ attribute: false, noAccessor: true })
  set element(element: HTMLElement | undefined) {
    this.#element = element;
    this.updatePosition();
  }

  @property({ attribute: false, noAccessor: true })
  set scrollParent(element: HTMLElement | undefined) {
    this.#scrollParent = element;
    this.updatePosition();
  }

  updatePosition() {
    if (this.#element === undefined) {
      this.removeAttribute('style');
    } else {
      const { height, width, x, y } = getRelativeBoundary(this.#element, this.#scrollParent);
      const { scrollTop = 0, scrollLeft = 0 } = this.#scrollParent ?? {};
      
      this.style.setProperty('top', `${y + scrollTop}px`);
      this.style.setProperty('left', `${x + scrollLeft}px`);
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
