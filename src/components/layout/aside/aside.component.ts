import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';

import styles from './aside.component.scss';

/**
 * To toggle the side bar remotely, you can dispatch a custom event on the global window object:
 * ```js
 * window.dispatchEvent(new CustomEvent('wcp-aside:toggle'));
 * ```
 * You may pass an optional boolean value to the event to toggle the side bar to a specific state:
 * ```js
 * window.dispatchEvent(new CustomEvent('wcp-aside:toggle', { detail: true }));
 * ```
 *
 * @slot - Projects elements aside the main content
 * @slot header - Elements in the fixed header of the side bar
 *
 * @event wcp-aside-toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
 *
 * @cssprop --wcp-aside-max-width - The maximum width of the aside bar when visible
 * @cssprop --wcp-aside-spacing - Inner padding of the aside bar
 * @cssprop --wcp-aside-toggle-size - The size of the toggle button
 *
 * @cssprop --wcp-aside-dark-background - The background color of the side bar in dark mode
 * @cssprop --wcp-aside-dark-color - The color of the side bar in dark mode
 *
 * @cssprop --wcp-aside-light-background - The background color of the side bar in light mode
 * @cssprop --wcp-aside-light-color - The color of the side bar in light mode
 */
@customElement('wcp-aside')
export class Aside extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  /**
   * Used to toggle the width of the aside bar
   */
  @property({ type: Boolean, reflect: true })
  override hidden = false;

  /**
   * Presets the aria role to `complementary` as we do not use te aside element directly
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role
   */
  @property({ type: String, reflect: true })
  override role = 'complementary';

  emitToggled() {
    const event = new CustomEvent('wcp-aside:toggled', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: this.hidden,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  handleButtonClick() {
    this.hidden = true;
    this.emitToggled();
  }

  listenAsideToggle = (({ detail }: CustomEvent<boolean | null>) => {
    this.hidden = detail ?? !this.hidden;
    this.emitToggled();
  }).bind(this);

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('wcp-aside:toggle', this.listenAsideToggle, false);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('wcp-aside:toggle', this.listenAsideToggle, false);
  }

  protected override render(): TemplateResult {
    return html`
      <header>
        <slot name="header"></slot>
        <wcp-button kind="icon" @click="${this.handleButtonClick}">
          <wcp-icon name="close"></wcp-icon>
        </wcp-button>
      </header>
      <section>
        <slot></slot>
      </section>
    `;
  }
}

declare global {
  interface WindowEventMap {
    'wcp-aside:toggle': CustomEvent<boolean | null>;
  }
  interface HTMLElementEventMap {
    'wcp-aside:toggled': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-aside': Aside;
  }
}
