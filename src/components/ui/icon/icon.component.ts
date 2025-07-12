import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './icon.component.scss';

/**
 * Shows an icon from the css.gg icon set.
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
