import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';

import { Editable } from '@/mixins/editable.mixin.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-number.component.scss';

/**
 * A numeric input element using the wcp style. Fully form aware.
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-number-hint-size - The font size of the hint.
 * @cssprop --wcp-input-number-label-size - The font size of the label.
 * @cssprop --wcp-input-number-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-number-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-number-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-number-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-number-light-color - The font color of the input element in light mode.
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
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-number label="Fully form enabled component"></wcp-input-number>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-number')
export class InputNumber extends Editable()(LitElement) implements FormAssociated<number> {
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #initialValue?: number;

  @query('input')
  private readonly input?: HTMLInputElement;

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  readonly = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  name = 'text';

  @property({ type: Number, reflect: true })
  value?: number;

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.#initialValue = this.value;
  }

  formResetCallback() {
    this.value = this.#initialValue;
  }

  checkValidity(): boolean {
    if (!this.input?.checkValidity()) {
      this.internals.setValidity({ customError: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  override attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
    super.attributeChangedCallback(name, oldValue, newValue);

    if (name !== 'value') return;
    this.checkValidity();
    this.internals.setFormValue(this.value ? `${this.value}` : null);
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value ? parseFloat(input.value) : undefined;
  }

  override renderInput(id: string) {
    return html`
      <input
        type="number"
        id="${id}"
        name="${this.name}"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.value ? `${this.value}` : ''}"
        @input="${this.handleInput}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-number': InputNumber;
  }
}
