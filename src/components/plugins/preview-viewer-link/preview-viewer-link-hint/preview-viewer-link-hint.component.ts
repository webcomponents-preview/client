import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getRelativeBoundary } from '@/utils/dom.utils.js';

import styles from './preview-viewer-link-hint.component.scss';

/**
 * Shows a hint to a given preview element.
 *
 * @element wcp-preview-viewer-link-hint
 *
 * @cssprop --wcp-preview-viewer-link-hint-button-passive-background - The background color of the hint button in passive state.
 * @cssprop --wcp-preview-viewer-link-hint-button-active-background - The background color of the hint button in active state.
 * @cssprop --wcp-preview-viewer-link-hint-button-passive-size - Size of the hint button in passive state.
 * @cssprop --wcp-preview-viewer-link-hint-button-active-size - Size of the hint button in active state.
 *
 * @cssprop --wcp-preview-viewer-link-hint-debug-border-width - Border width of the debugging fields.
 * @cssprop --wcp-preview-viewer-link-hint-debug-background-opacity - Opacity of the debugging fields background.
 *
 * @cssprop --wcp-preview-viewer-link-hint-debug-stripe-distance - Distance of the stripes of the debugging field background.
 * @cssprop --wcp-preview-viewer-link-hint-debug-stripe-tilt - Tilt of the stripes of the debugging field background in degrees.
 * @cssprop --wcp-preview-viewer-link-hint-debug-stripe-width - Width of the stripes of the debugging field background.
 * @cssprop --wcp-preview-viewer-link-hint-debug-stripe-dash-size - Length of the dashes of the debugging field background.
 * @cssprop --wcp-preview-viewer-link-hint-debug-stripe-dash-gap - Gap between the dashes of the debugging field background.
 *
 * @cssprop --wcp-preview-viewer-link-hint-debug-dark-background - Debugging field background color in dark mode.
 * @cssprop --wcp-preview-viewer-link-hint-debug-dark-stroke - Debugging field dash and border color in dark mode.
 *
 * @cssprop --wcp-preview-viewer-link-hint-debug-light-background - Debugging field background color in light mode.
 * @cssprop --wcp-preview-viewer-link-hint-debug-light-stroke - Debugging field dash and border color in light mode.
 */
@customElement('wcp-preview-viewer-link-hint')
export class PreviewViewerLinkHint extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  #observer = new ResizeObserver(() => this.updatePosition());
  #element?: HTMLElement;
  #scrollParent?: HTMLElement;

  @property({ type: Boolean, reflect: true })
  debug = false;

  @property({ attribute: false, noAccessor: true })
  set element(element: HTMLElement | undefined) {
    this.#element = element;
    this.#observeElement();
    this.updatePosition();
  }

  @property({ attribute: false, noAccessor: true })
  set scrollParent(element: HTMLElement | undefined) {
    this.#scrollParent = element;
    this.updatePosition();
  }

  /**
   * Allows to update the position of the hint.
   */
  updatePosition() {
    if (this.#element === undefined) {
      this.removeAttribute('style');
    } else {
      const { height, width, x, y } = getRelativeBoundary(this.#element, this.#scrollParent);
      const { scrollTop = 0, scrollLeft = 0 } = this.#scrollParent ?? (this.#element.offsetParent as HTMLElement) ?? {};

      this.style.setProperty('top', `${y + scrollTop}px`);
      this.style.setProperty('left', `${x + scrollLeft}px`);
      this.style.setProperty('height', `${height}px`);
      this.style.setProperty('width', `${width}px`);
    }
  }

  #observeElement() {
    if (this.#element === undefined) return;
    this.#observer.disconnect();
    this.#observer.observe(this.#element);
  }

  #observeStage() {
    window.addEventListener('wcp-preview-viewport:changed', this.#handleStageChange, false);
  }

  #unobserveStage() {
    window.removeEventListener('wcp-preview-viewport:changed', this.#handleStageChange, false);
  }

  #handleStageChange = () => {
    this.updatePosition();
  };

  override connectedCallback() {
    super.connectedCallback();
    this.#observeStage();
  }

  override disconnectedCallback() {
    this.#unobserveStage();
    this.#observer.disconnect();
    super.disconnectedCallback();
  }

  protected override render(): TemplateResult {
    return html`<button></button>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-viewer-link-hint': PreviewViewerLinkHint;
  }
}
