import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import styles from './main.component.scss';

/**
 * @slot - Projects elements to the main content
 */
@customElement('wcp-main')
export class Main extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  /**
   * Presets the aria role to `main` as we do not use te main element directly
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role
   */
  @property({ type: String, reflect: true })
  override role = 'main';

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-main': Main;
  }
}
