import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { listen } from '@/utils/decorator.utils.js';
import { persist, read } from '@/utils/state.utils.js';

import styles from './aside.component.scss';

declare global {
  interface WCP {
    def: {
      breakpoints: Record<string, number>;
    };
  }

  interface Window {
    wcp: WCP;
  }
}

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
  override hidden = false;

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

  @eventOptions({ passive: true })
  @listen('wcp-state-changed:aside-visible', 'window')
  protected listenAsideToggle({ detail }: CustomEvent<boolean>) {
    this.hidden = !detail;
  }

  @eventOptions({ passive: true })
  @listen('hashchange', 'window')
  protected handleRouteChange() {
    // close sidebar on mobile
    const small = window.wcp?.def?.breakpoints?.sm ?? 0;
    if (!window.matchMedia(`(min-width: ${small}px)`).matches) {
      persist('aside-visible', false);
    }
  }

  override connectedCallback() {
    super.connectedCallback();

    // check if the state is recoverable
    const visible = read('aside-visible');
    if (visible !== undefined) {
      this.hidden = !visible;
    } else {
      // on desktop, the sidebar is visible by default,
      // on mobile, the sidebar is hidden by default
      const small = window.wcp?.def?.breakpoints?.sm ?? 0;
      this.hidden = !window.matchMedia(`(min-width: ${small}px)`).matches;
    }
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
