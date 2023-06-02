import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

// instruct esbuild to load the CSS file as a string
import styles from './input-radio.component.scss';

/**
 * A radio input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-radio
 * 
 * @slot - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-radio-label-size - The font size of the label.
 * @cssprop --wcp-input-radio-label-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-radio-size - The size of the radio input.
 *
 * @cssprop --wcp-input-radio-dark-background - The background color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-border - The border color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-passive-color - The fill color of the radio input when not checked in dark mode.
 * @cssprop --wcp-input-radio-dark-active-color - The fill color of the radio input when checked in dark mode.
 *
 * @cssprop --wcp-input-radio-light-background - The background color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-border - The border color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-passive-color - The fill color of the radio input when not checked in light mode.
 * @cssprop --wcp-input-radio-light-active-color - The fill color of the radio input when checked in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-radio label="With optional label"></wcp-input-radio>
 * ```
 *
 * @example
 * ## With initial value
 * ```html
 * <wcp-input-radio checked label="With optional initial value"></wcp-input-radio>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-radio')
export class InputRadio extends ColorSchemable(LitElement) implements FormAssociated<string> {
  static override readonly styles = unsafeCSS(styles);
  static readonly formAssociated = true;

  readonly #internals = this.attachInternals();

  private initialChecked!: boolean;

  @property({ type: String, reflect: true })
  label?: string;

  @property({ type: String, reflect: true })
  name = 'radio';

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  checked = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  value = 'on';

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.initialChecked = this.checked;

    this.checkValidity();
    this.#internals.setFormValue(this.checked ? this.value : null);
  }

  override attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'checked') {
      this.checked = value !== null;
      this.#internals.setFormValue(this.checked ? this.value : null);
    }
  }

  formResetCallback() {
    this.checked = this.initialChecked;

    this.checkValidity();
    this.#internals.setFormValue(this.checked ? this.value : null);
  }

  checkValidity(): boolean {
    if (this.required && !this.checked) {
      this.#internals.setValidity({ valueMissing: true }, 'Invalid input');
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;

    this.checkValidity();
    this.#internals.setFormValue(this.checked ? this.value : null);
  }

  protected override render() {
    return html`
      <div>
        <input
          type="radio"
          id="radio"
          name="${this.name}"
          autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .checked="${this.checked}"
          .value="${this.value}"
          @input="${this.handleInput}"
        />
        ${when(this.label !== undefined, () => html`<label for="radio">${this.label}</label>`)}
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-radio': InputRadio;
  }
}
