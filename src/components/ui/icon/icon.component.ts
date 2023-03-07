import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './icon.component.scss';

/**
 * Shows an icon from the css.gg icon set.
 *
 * @example
 * ```html
 * <wcp-icon name="smartphone"></wcp-icon>
 * ```
 *
 * @example
 * ### Set a custom size
 *
 * ```html
 * <wcp-icon name="laptop" size="24px"></wcp-icon>
 * ```
 */
@customElement('wcp-icon')
export class Icon extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  name!: string;

  @property({ type: String, reflect: true })
  size?: string;

  protected render(): TemplateResult {
    return html`<i class="gg-${this.name}"></i>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-icon': Icon;
  }
}
