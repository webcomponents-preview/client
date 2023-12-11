import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './title.component.scss';

/**
 * Shows the application title and a logo.
 *
 * @slot logo - Receives the logo image to be shown
 *
 * @cssprop --wcp-title-gap - The gap between the logo and the title
 * @cssprop --wcp-title-height - The height of the title. Content may exceed and scales the tile
 * @cssprop --wcp-title-spacing - Inner padding of the title
 * @cssprop --wcp-title-headline-size - The font size of the title
 * @cssprop --wcp-title-headline-weight - The font weight of the title
 * @cssprop --wcp-title-headline-spacing - The letter spacing of the title
 * @cssprop --wcp-title-headline-line-height - The line height of the title
 * @cssprop --wcp-title-headline-transform - The text transform of the title
 */
@customElement('wcp-title')
export class Title extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  override title!: string;

  protected override render(): TemplateResult {
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
