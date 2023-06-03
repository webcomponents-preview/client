import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

// instruct esbuild to load the CSS file as a string
import styles from './input-number.component.scss';

/**
 * A numeric input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-number
 * 
 * @slot - Receives optional descriptions below the input.
 * 
 * @cssprop --wcp-input-number-label-size - The font size of the label.
 * @cssprop --wcp-input-number-label-spacing - The spacing between the label and the input.
 * @cssprop --wcp-input-number-spacing - The inner spacing of the input element.

 * @cssprop --wcp-input-number-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-color - The font color of the input element in dark mode.
 * 
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-number label="With optional label"></wcp-input-number>
 * ```
 * 
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-number label="With optional initial value" value="23"></wcp-input-number>
 * ```
 * 
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-number label="Fully form enabled component"></wcp-input-number>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-number')
export class InputNumber extends ColorSchemable(LitElement) implements FormAssociated<number> {
  static readonly formAssociated = true;
  static override readonly styles = unsafeCSS(styles);

  readonly #internals = this.attachInternals();

  private initialValue?: number;

  @query('input')
  input!: HTMLInputElement;

  @property({ type: String, reflect: true })
  label?: string;

  @property({ type: String, reflect: true })
  name = 'text';

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: Number, reflect: true })
  value?: number;

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.initialValue = this.value;

    this.checkValidity();
    this.#internals.setFormValue(this.value ? `${this.value}` : null);
  }

  formResetCallback() {
    this.value = this.initialValue;

    this.checkValidity();
    this.#internals.setFormValue(this.value ? `${this.value}` : null);
  }

  checkValidity(): boolean {
    if (!this.input.checkValidity()) {
      this.#internals.setValidity({ customError: true }, 'Invalid input');
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.value = input.value ? parseFloat(input.value) : undefined;

    this.checkValidity();
    this.#internals.setFormValue(this.value ? `${this.value}` : null);
  }

  protected override render() {
    return html`
      ${when(this.label !== undefined, () => html`<label for="number">${this.label}</label>`)}
      <input
        type="number"
        id="number"
        name="${this.name}"
        autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.value ? `${this.value}` : null}"
        @input="${this.handleInput}"
      />
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-number': InputNumber;
  }
}
