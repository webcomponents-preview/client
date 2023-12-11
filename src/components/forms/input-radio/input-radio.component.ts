import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { Editable } from '@/mixins/editable.mixin.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-radio.component.scss';

/**
 * A radio input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-radio
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-radio-size - The size of the radio input.
 * @cssprop --wcp-input-radio-label-size - The font size of the label.
 * @cssprop --wcp-input-radio-hint-size - The font size of the hint.
 * @cssprop --wcp-input-radio-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-radio-border-radius - The border radius of the radio input.
 * @cssprop --wcp-input-radio-border-size - The border size of the radio input.
 *
 * @cssprop --wcp-input-radio-dark-background - The background color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-border - The border color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-color - The fill color of the radio input when checked in dark mode.
 *
 * @cssprop --wcp-input-radio-light-background - The background color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-border - The border color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-color - The fill color of the radio input when checked in light mode.
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
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-radio')
export class InputRadio
  extends Editable({ hasBeforeSlot: false, hasBorder: false })(LitElement)
  implements FormAssociated<string>
{
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #checked = false;
  #initialChecked!: boolean;

  @property({ type: String, reflect: true })
  name = 'radio';

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true, noAccessor: true })
  set checked(checked: boolean) {
    this.#checked = checked;
    this.checkValidity();

    this.internals.ariaChecked = String(this.checked);
    this.internals.setFormValue(this.#checked ? this.value ?? null : null);
  }
  get checked(): boolean {
    return this.#checked;
  }

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  value = 'on';

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.internals.role = 'radio';
    this.#initialChecked = this.#checked;
  }

  formResetCallback() {
    this.checked = this.#initialChecked;
  }

  checkValidity(): boolean {
    if (this.required && !this.#checked) {
      this.internals.setValidity({ valueMissing: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
  }

  override renderInput(id: string) {
    return html`
      <input
        type="radio"
        id="${id}"
        name="${this.name}"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        ?checked="${this.#checked}"
        .value="${this.value}"
        @input="${this.handleInput}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-radio': InputRadio;
  }
}
