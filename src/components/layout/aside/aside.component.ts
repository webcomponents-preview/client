import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { persist, read } from '@/utils/state.utils.js';

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
 * @emits wcp-aside:toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
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
  override hidden = !read('aside-visible');

  /**
   * Presets the aria role to `complementary` as we do not use te aside element directly
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role
   */
  @property({ type: String, reflect: true })
  override role = 'complementary';

  @eventOptions({ passive: true })
  handleButtonClick() {
    persist('aside-visible', false);
  }

  listenAsideToggle = (({ detail }: CustomEvent<boolean>) => {
    this.hidden = !detail;
  }).bind(this);

  override connectedCallback() {
    super.connectedCallback();
    window.addEventListener('wcp-state-changed:aside-visible', this.listenAsideToggle, false);
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    window.removeEventListener('wcp-state-changed:aside-visible', this.listenAsideToggle, false);
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
  interface State {
    ['aside-visible']: boolean;
  }
  interface HTMLElementTagNameMap {
    'wcp-aside': Aside;
  }
}
