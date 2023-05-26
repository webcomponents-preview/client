import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';

// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

import styles from './button.component.scss';

/**
 * Shows a button element.
 *
 * @example
 * ## Default button
 *
 * ```html
 * <wcp-button>Click me!</wcp-button>
 * ```
 *
 * @example
 * ## Disabled button
 *
 * ```html
 * <wcp-button disabled>Try to click me!</wcp-button>
 * ```
 *
 * @example
 * ## Button with icon
 *
 * ```html
 * <wcp-button kind="icon">
 *  <wcp-icon name="menu"></wcp-icon>
 * </wcp-button>
 * ```
 *
 * @example
 * ## Force active state
 *
 * ```html
 * <wcp-button class="active">Link</wcp-button>
 * ```
 *
 * @example
 * ## Use as link
 *
 * ```html
 * <wcp-button href=".">Link</wcp-button>
 * ```
 *
 * @example
 * ## Use as native submit button in form
 *
 * ```html
 * <form onsubmit="alert('Submit!'); return false">
 *  <wcp-button type="submit">Submit</wcp-button>
 * </form>
 * ```
 *
 * @example
 * ## Use as native reset button in form
 *
 * ```html
 * <form onreset="alert('Reset!'); return false">
 *   <wcp-button type="reset">Reset</wcp-button>
 * </form>
 * ```
 *
 * @slot {Some <i>Button</i>} - Default slot for the button content
 *
 * @cssprop --wcp-button-dark-passive-background - Background color of the button if non interactive in dark mode
 * @cssprop --wcp-button-dark-passive-border-color - Border color of the button if non interactive in dark mode
 * @cssprop --wcp-button-dark-passive-color - Text color of the button if non interactive in dark mode
 *
 * @cssprop --wcp-button-dark-hover-background - Background color of the button if hovered in dark mode
 * @cssprop --wcp-button-dark-hover-border-color - Border color of the button if hovered in dark mode
 * @cssprop --wcp-button-dark-hover-color - Text color of the button if hovered in dark mode
 *
 * @cssprop --wcp-button-dark-active-background - Background color of the button if active in dark mode
 * @cssprop --wcp-button-dark-active-border-color - Border color of the button if active in dark mode
 * @cssprop --wcp-button-dark-active-color - Text color of the button if active in dark mode
 *
 * @cssprop --wcp-button-light-passive-background - Background color of the button if non interactive in light mode
 * @cssprop --wcp-button-light-passive-border-color - Border color of the button if non interactive in light mode
 * @cssprop --wcp-button-light-passive-color - Text color of the button if non interactive in light mode
 *
 * @cssprop --wcp-button-light-hover-background - Background color of the button if hovered in light mode
 * @cssprop --wcp-button-light-hover-border-color - Border color of the button if hovered in light mode
 * @cssprop --wcp-button-light-hover-color - Text color of the button if hovered in light mode
 *
 * @cssprop --wcp-button-light-active-background - Background color of the button if active in light mode
 * @cssprop --wcp-button-light-active-border-color - Border color of the button if active in light mode
 * @cssprop --wcp-button-light-active-color - Text color of the button if active in light mode
 */
@customElement('wcp-button')
export class Button extends ColorSchemable(LitElement) {
  static readonly formAssociated = true;
  static readonly styles = unsafeCSS(styles);

  readonly #internals = this.attachInternals();

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  nowrap = false;

  /**
   * Allows stretching the button across the full width of its container.
   * This is useful for buttons that are used in a narrow form, or in general
   * on small viewports, like handheld devices.
   */
  @property({ type: Boolean, reflect: true })
  stretched = false;

  /**
   * The kind of button to render. Either like a conventional button, or for
   * icons. Icon buttons are quadrtic and will show a radial background on interaction.
   */
  @property({ type: String, reflect: true })
  kind: 'button' | 'icon' = 'button';

  @property({ type: String, reflect: true })
  type: 'button' | 'reset' | 'submit' = 'button';

  @property({ type: String, reflect: true })
  href?: string;

  @property({ type: String, reflect: true })
  target?: '_self' | '_blank' | '_parent' | '_top';

  @eventOptions({ passive: true })
  handleButtonClick() {
    // invoke submit on associated form
    if (this.type === 'submit') {
      this.#internals.form?.requestSubmit();
    }
    // reset the associated form
    if (this.type === 'reset') {
      this.#internals.form?.reset();
    }
  }

  protected render(): TemplateResult {
    return html`
      ${when(
        this.href !== undefined && !this.disabled,
        () => html`
          <a class="button" type="${this.type}" href="${this.href}" target="${ifDefined(this.target)}">
            <slot></slot>
          </a>
        `,
        () => html`
          <button class="button" ?disabled="${this.disabled}" type="${this.type}" @click="${this.handleButtonClick}">
            <slot></slot>
          </button>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-button': Button;
  }
}
