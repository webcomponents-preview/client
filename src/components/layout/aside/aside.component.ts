import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

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
 *
 * @event wcp-aside-toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
 *
 * @cssprop --wcp-aside-collapsed-width - The width of the aside bar when collapsed
 * @cssprop --wcp-aside-expanded-width - The width of the aside bar when expanded
 * @cssprop --wcp-aside-spacing - Inner padding of the aside bar
 * @cssprop --wcp-aside-toggle-size - The size of the toggle button
 * @cssprop --wcp-aside-toggle-offset-vertical - The vertical offset of the toggle button
 * @cssprop --wcp-aside-toggle-offset-horizontal - The horizontal offset of the toggle button
 * 
 * @cssprop --wcp-aside-dark-background - The background color of the side bar in dark mode
 * @cssprop --wcp-aside-dark-color - The color of the side bar in dark mode
 * 
 * @cssprop --wcp-aside-light-background - The background color of the side bar in light mode
 * @cssprop --wcp-aside-light-color - The color of the side bar in light mode
 */
@customElement('wcp-aside')
export class Aside extends LitElement {
  static readonly styles = unsafeCSS(styles);

  /**
   * Used to toggle the width of the aside bar
   */
  @property({ type: Boolean, reflect: true })
  collapsed = false;

  /**
   * Presets the aria role to `complementary` as we do not use te aside element directly
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role
   */
  @property({ type: String, reflect: true })
  role = 'complementary';

  emitToggled() {
    const event = new CustomEvent('wcp-aside:toggled', {
      bubbles: true,
      cancelable: true,
      composed: true,
      detail: this.collapsed,
    });
    this.dispatchEvent(event);
  }

  @eventOptions({ passive: true })
  handleAsideToggle() {
    this.collapsed = !this.collapsed;
    this.emitToggled();
  }

  listenAsideToggle = (({ detail = !this.collapsed }: CustomEvent<boolean>) => {
    this.collapsed = detail;
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

  protected render(): TemplateResult {
    return html`
      <header>
        <wcp-button kind="icon" @click="${this.handleAsideToggle}">
          <wcp-icon name="${this.collapsed ? 'menu' : 'close'}"></wcp-icon>
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
    'wcp-aside:toggle': CustomEvent<boolean>;
    'wcp-aside:toggled': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-aside': Aside;
  }
}
