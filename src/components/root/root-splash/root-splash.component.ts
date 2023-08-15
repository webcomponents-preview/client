import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';

import styles from './root-splash.component.scss';

/**
 * Shows a splash screen whilst initializing the application.
 * 
 * @property {boolean} [hidden] - Use the global hidden attribute to fade out the splash screen.
 *
 * @cssprop --wcp-root-splash-dark-background-color - The background color of the splash screen in dark mode.
 * @cssprop --wcp-root-splash-dark-color - The text color of the splash screen in dark mode.
 * @cssprop --wcp-root-splash-light-background-color - The background color of the splash screen in light mode.
 * @cssprop --wcp-root-splash-light-color - The text color of the splash screen in light mode.
 * 
 * @slot {Loading...} - The text content to be displayed in the splash screen.
 * 
 * @example
 * # Basic usage
 * 
 * ```html
 * <wcp-root-splash>Loading...</wcp-root-splash>
 * ```
 */
@customElement('wcp-root-splash')
export class RootSplash extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  protected override render(): TemplateResult {
    return html`<slot></slot>`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-root-splash': RootSplash;
  }
}
