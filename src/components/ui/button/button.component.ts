// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';

import styles from './button.component.scss';

/**
 * Shows a button element.
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
  static override readonly styles = unsafeCSS(styles);

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
   * icons. Icon buttons are quadratic and will show a radial background on interaction.
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

  protected override render(): TemplateResult {
    return html`
      ${when(
        this.href !== undefined && !this.disabled,
        () => html`
          <a
            part="button"
            class="button"
            type="${this.type}"
            href="${ifDefined(this.href)}"
            target="${ifDefined(this.target)}"
          >
            <slot></slot>
          </a>
        `,
        () => html`
          <button
            part="button"
            class="button"
            ?disabled="${this.disabled}"
            type="${this.type}"
            @click="${this.handleButtonClick}"
          >
            <slot></slot>
          </button>
        `,
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-button': Button;
  }
}
