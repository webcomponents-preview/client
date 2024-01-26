import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';

import { Editable } from '@/mixins/editable.mixin.js';
import type { FormAssociated } from '@/utils/form.utils.js';

import { InputSelectOption } from './input-select-option.component.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-select.component.scss';

/**
 * A numeric input element using the wcp style. Fully form aware.
 *
 * 
 * @property {string} label - The label of the input element.
 * 
 * @slot {<wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>} - Projects options into the select elements dropdown menu.
 * @slot hint - Receives optional descriptions below the input.
 * 
 * @cssprop --wcp-input-select-arrow-size - The size of the arrow icon.
 * @cssprop --wcp-input-select-hint-size - The font size of the hint.
 * @cssprop --wcp-input-select-label-size - The font size of the label.
 * @cssprop --wcp-input-select-spacing - The inner spacing of the input element.

 * @cssprop --wcp-input-select-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-select-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-select-dark-color - The font color of the input element in dark mode.
 * 
 * @cssprop --wcp-input-select-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-select-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-select-light-color - The font color of the input element in light mode.
 * 
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-select label="With optional label">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 * 
 * @example
 * ## With disabled options
 * ```html
 * <wcp-input-select label="With disabled options">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar" disabled></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 * 
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-select label="With optional initial value" value="bar">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 * 
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-select label="Fully form enabled component">
 *     <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *     <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *     <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 *   </wcp-input-select>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-select')
export class InputSelect extends Editable({ hasAfterSlot: false })(LitElement) implements FormAssociated<string> {
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #initialValue?: string;

  @query('select')
  private readonly input?: HTMLSelectElement;

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

  @property({ type: String, reflect: true })
  value?: string;

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
    this.internals.setFormValue(this.value ?? null);
  }

  @eventOptions({ passive: true })
  handleSlotChange(event: Event) {
    // collect all slotted options
    const slot = event.target as HTMLSlotElement;
    const options = slot
      .assignedElements({ flatten: true })
      .filter((element) => element instanceof InputSelectOption) as InputSelectOption[];

    // clear the input and append the options as copies
    this.input!.innerHTML = '';
    this.input!.append(
      ...options.map((option) => {
        const copy = document.createElement('option');
        copy.value = option.value ?? '';
        copy.textContent = option.label ?? '';
        copy.disabled = option.disabled;
        copy.selected = copy.value === this.value;
        return copy;
      }),
    );
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value ?? undefined;
  }

  override renderInput(id: string) {
    return html`
      <select
        id="${id}"
        name="${this.name}"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.value ?? ''}"
        @input="${this.handleInput}"
      ></select>
      <slot @slotchange="${this.handleSlotChange}"></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-select': InputSelect;
  }
}
