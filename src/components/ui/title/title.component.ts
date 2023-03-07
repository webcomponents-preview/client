import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './title.component.scss';

/**
 * Shows the application title and a logo.
 *
 * @example
 * ```html
 * <wcp-title title="Web Components Preview">
 *   <img slot="logo" src="assets/icons/logo.svg" height="30px" />
 * </wcp-title>
 * ```
 *
 * @slot logo - Receives the logo image to be shown
 */
@customElement('wcp-title')
export class Title extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  title!: string;

  protected render(): TemplateResult {
    return html`
      <slot name="logo"></slot>
      <h1>${this.title}</h1>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-title': Title;
  }
}
