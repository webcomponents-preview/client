import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

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
 * ## Button with icon
 *
 * ```html
 * <wcp-button kind="icon">
 *  <wcp-icon name="menu"></wcp-icon>
 * </wcp-button>
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
 * @cssprop --wcp-button-passive-background - Background color of the button if non interactive
 * @cssprop --wcp-button-passive-border-color - Border color of the button if non interactive
 * @cssprop --wcp-button-passive-color - Text color of the button if non interactive
 * @cssprop --wcp-button-hover-background - Background color of the button if hovered
 * @cssprop --wcp-button-hover-border-color - Border color of the button if hovered
 * @cssprop --wcp-button-hover-color - Text color of the button if hovered
 * @cssprop --wcp-button-active-background - Background color of the button if active
 * @cssprop --wcp-button-active-border-color - Border color of the button if active
 * @cssprop --wcp-button-active-color - Text color of the button if active
 */
@customElement('wcp-button')
export class Button extends LitElement {
  static readonly formAssociated = true;
  static readonly styles = unsafeCSS(styles);

  readonly #internals = this.attachInternals();

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  nowrap = false;

  @property({ type: Boolean, reflect: true })
  stretched = false;

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
        this.href !== undefined,
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
