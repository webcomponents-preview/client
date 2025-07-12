import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './navigation.component.scss';

/**
 * @slot - Default slot for navigation items or nested navigation
 * @slot action - Slot for an action to be shown next to the headline
 *
 * @csspart headline - The headline of the navigation
 * @csspart nav - The nested navigation
 *
 * @cssprop --wcp-navigation-spacing - Spacing between navigation and headline
 * @cssprop --wcp-navigation-spacing-items - Spacing between navigation items
 * @cssprop --wcp-navigation-spacing-headline - Inner padding of the navigation headline
 * @cssprop --wcp-navigation-spacing-headline-togglable - Inner padding of the navigation headline if togglable
 * @cssprop --wcp-navigation-inset - Inset of the navigation if nested (is applied on each level)
 * @cssprop --wcp-navigation-dark-border-color - Border color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-light-border-color - Border color of the navigation headline in light mode
 * @cssprop --wcp-navigation-headline-size - Font size of the navigation headline
 * @cssprop --wcp-navigation-headline-weight - Font weight of the navigation headline
 * @cssprop --wcp-navigation-headline-spacing - Letter spacing of the navigation headline
 * @cssprop --wcp-navigation-headline-dark-background - Background color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-headline-light-background - Background color of the navigation headline in light mode
 *
 * @emits wcp-navigation-toggle - Emitted when the togglable open state changes
 */
@customElement('wcp-navigation')
export class Navigation extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  /**
   * An optional headline to be shown for categorization
   */
  @property({ type: String, reflect: true })
  headline?: string;

  /**
   * Allows the nested items to be toggled
   */
  @property({ type: Boolean, reflect: true })
  togglable = false;

  /**
   * If togglable, this flag indicates if the nested items are currently visible
   */
  @property({ type: Boolean, reflect: true })
  open = false;

  @eventOptions({ passive: true })
  toggleClick(): void {
    if (!this.togglable) return;
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('wcp-navigation-toggle', { detail: this.open }));
  }

  @eventOptions({ capture: true })
  toggleKeyboard(event: KeyboardEvent): void {
    if (!this.togglable) return;
    if (![' ', 'Enter'].includes(event.key)) return;

    event.preventDefault();
    this.open = !this.open;
    this.dispatchEvent(new CustomEvent('wcp-navigation-toggle', { detail: this.open }));
  }

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.headline !== undefined,
        () => html`
          <h3
            part="headline"
            tabindex="${ifDefined(this.togglable ? '0' : undefined)}"
            @click="${this.toggleClick}"
            @keydown="${this.toggleKeyboard}"
          >
            <span>${this.headline}</span>
            <slot name="action">
              ${when(this.togglable, () => html`<wcp-icon name="chevron-${this.open ? 'up' : 'down'}"></wcp-icon>`)}
            </slot>
          </h3>
        `,
      )}
      <nav part="nav"><slot></slot></nav>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-navigation-toggle': CustomEvent<boolean>;
  }

  interface HTMLElementTagNameMap {
    'wcp-navigation': Navigation;
  }
}
