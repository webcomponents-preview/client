import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './navigation.component.scss';

/**
 * @example
 * ### Usage with headline
 *
 * ```html
 * <wcp-navigation headline="Navigation">
 *   <wcp-navigation-item href="/home">Home</wcp-navigation-item>
 *   <wcp-navigation-item href="/about">About</wcp-navigation-item>
 * </wcp-navigation>
 * ```
 *
 * @slot - Default slot for navigation items
 *
 * @cssprop --wcp-navigation-spacing - Spacing between navigation and headline
 * @cssprop --wcp-navigation-spacing-items - Spacing between navigation items
 * @cssprop --wcp-navigation-spacing-headline - Inner padding of the navigation headline
 * @cssprop --wcp-navigation-dark-border-color - Border color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-light-border-color - Border color of the navigation headline in light mode
 * @cssprop --wcp-navigation-headline-size - Font size of the navigation headline
 * @cssprop --wcp-navigation-headline-weight - Font weight of the navigation headline
 * @cssprop --wcp-navigation-headline-spacing - Letter spacing of the navigation headline
 * @cssprop --wcp-navigation-headline-dark-background - Background color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-headline-light-background - Background color of the navigation headline in light mode
 */
@customElement('wcp-navigation')
export class Navigation extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  headline?: string;

  protected override render(): TemplateResult {
    return html`
      ${when(this.headline !== undefined, () => html`<h3>${this.headline}</h3>`)}
      <nav>
        <slot></slot>
      </nav>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-navigation': Navigation;
  }
}
