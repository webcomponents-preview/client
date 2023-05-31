import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './icon.component.scss';

/**
 * Shows an icon from the css.gg icon set.
 *
 * @example
 * ## Use icon
 * By setting the name attribute.
 * 
 * ```html
 * <wcp-icon name="smartphone"></wcp-icon>
 * ```
 *
 * @example
 * ### Set a custom size
 * 
 * ```html
 * <wcp-icon name="laptop" style="--wcp-icon-size: 44"></wcp-icon>
 * ```
 *
 * @cssprop --wcp-icon-size - Sets the size of the icon as unitless number in pixels
 */
@customElement('wcp-icon')
export class Icon extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  name!: string;

  protected override render(): TemplateResult {
    return html`<i class="gg-${this.name}"></i>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-icon': Icon;
  }
}
