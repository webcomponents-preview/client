import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getRelativeBoundary } from '@/utils/dom.utils.js';

import styles from './preview-hint.component.scss';

/**
 * Shows a hint to a given preview element.
 *
 * @element wcp-preview-hint
 * 
 * @cssprop --wcp-preview-hint-button-passive-background - The background color of the hint button in passive state.
 * @cssprop --wcp-preview-hint-button-active-background - The background color of the hint button in active state.
 * @cssprop --wcp-preview-hint-button-passive-size - Size of the hint button in passive state.
 * @cssprop --wcp-preview-hint-button-active-size - Size of the hint button in active state.
 *
 * @cssprop --wcp-preview-hint-debug-border-width - Border width of the debugging fields.
 * @cssprop --wcp-preview-hint-debug-background-opacity - Opacity of the debugging fields background.
 *
 * @cssprop --wcp-preview-hint-debug-stripe-distance - Distance of the stripes of the debugging field background.
 * @cssprop --wcp-preview-hint-debug-stripe-tilt - Tilt of the stripes of the debugging field background in degrees.
 * @cssprop --wcp-preview-hint-debug-stripe-width - Width of the stripes of the debugging field background.
 * @cssprop --wcp-preview-hint-debug-stripe-dash-size - Length of the dashes of the debugging field background.
 * @cssprop --wcp-preview-hint-debug-stripe-dash-gap - Gap between the dashes of the debugging field background.
 *
 * @cssprop --wcp-preview-hint-debug-dark-background - Debugging field background color in dark mode.
 * @cssprop --wcp-preview-hint-debug-dark-stroke - Debugging field dash and border color in dark mode.
 *
 * @cssprop --wcp-preview-hint-debug-light-background - Debugging field background color in light mode.
 * @cssprop --wcp-preview-hint-debug-light-stroke - Debugging field dash and border color in light mode.
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
