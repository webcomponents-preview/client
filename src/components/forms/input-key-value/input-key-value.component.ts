import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';

import { Editable } from '@/mixins/editable.mixin.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-key-value.component.scss';

/**
 * A key-value input element using the wcp style. Fully form aware.
 *
 * @property {string} label - The label of the input element.
 * @cssprop --wcp-input-key-value-gutter - The gutter between the key-value pair inputs.
 * @slot hint - Receives optional descriptions below the input.
 *
 */
@customElement('wcp-input-key-value')
export class InputKeyValue
  extends Editable({ hasBeforeSlot: false, hasBorder: false })(LitElement)
  implements FormAssociated<string>
{
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #value?: string;

  #initialName?: string;
  #initialValue?: string;

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  name?: string;

  @property({ type: String, reflect: true, noAccessor: true })
  set value(value: string | undefined) {
    const oldValue = this.#value;
    this.#value = value;
    this.internals.setFormValue(value ?? null);
    this.checkValidity();
    this.requestUpdate('value', oldValue);
  }
  get value(): string | undefined {
    return this.#value;
  }

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.#initialName = this.name;
    this.#initialValue = this.#value;
  }

  formResetCallback() {
    this.name = this.#initialName;
    this.value = this.#initialValue;
  }

  checkValidity(): boolean {
    if (this.required && (!this.name || !this.#value)) {
      this.internals.setValidity({ valueMissing: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleKeyInput(event: InputEvent) {
    // update internal value
    const { value } = event.target as HTMLInputElement;
    this.name = value ?? undefined;
  }

  @eventOptions({ passive: true })
  handleValueInput(event: InputEvent) {
    // update internal value
    const { value } = event.target as HTMLInputElement;
    this.value = value ?? undefined;
  }

  override renderInput(id: string) {
    return html`
      <input
        type="text"
        id="${id}"
        name="${this.name}-key"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.name ?? ''}"
        @input="${this.handleKeyInput}"
      >
      <span id="border"></span>

      <input
        type="text"
        class="${id}"
        name="${this.name}-value"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled || ['', undefined].includes(this.name)}"
        ?required="${this.required}"
        .value="${this.value ?? ''}"
        @input="${this.handleValueInput}"
      >
      <span class="border"></span>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-key-value': InputKeyValue;
  }
}
