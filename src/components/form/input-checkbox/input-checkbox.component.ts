import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

// instruct esbuild to load the CSS file as a string
import styles from './input-checkbox.component.scss';

/**
 * A checkbox input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-checkbox
 * 
 * @slot - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-checkbox-label-size - The font size of the label.
 * @cssprop --wcp-input-checkbox-label-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-checkbox-size - The size of the checkbox input.
 *
 * @cssprop --wcp-input-checkbox-dark-background - The background color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-border - The border color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-passive-color - The fill color of the checkbox input when not checked in dark mode.
 * @cssprop --wcp-input-checkbox-dark-active-color - The fill color of the checkbox input when checked in dark mode.
 *
 * @cssprop --wcp-input-checkbox-light-background - The background color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-border - The border color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-passive-color - The fill color of the checkbox input when not checked in light mode.
 * @cssprop --wcp-input-checkbox-light-active-color - The fill color of the checkbox input when checked in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-checkbox label="With optional label"></wcp-input-checkbox>
 * ```
 *
 * @example
 * ## With initial value
 * ```html
 * <wcp-input-checkbox checked label="With optional initial value"></wcp-input-checkbox>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-checkbox label="Fully form enabled component"></wcp-input-checkbox>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-checkbox')
export class InputCheckbox extends ColorSchemable(LitElement) implements FormAssociated<string> {
  static override readonly styles = unsafeCSS(styles);
  static readonly formAssociated = true;

  readonly #internals = this.attachInternals();

  private initialChecked!: boolean;

  @property({ type: String, reflect: true })
  label?: string;

  @property({ type: String, reflect: true })
  name = 'checkbox';

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
    this.#internals.setFormValue(this.checked ? this.value ?? null : null);
  }

  override attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'checked') {
      this.checked = value !== null;
      this.#internals.setFormValue(this.checked ? this.value ?? null : null);
    }
  }

  formResetCallback() {
    this.checked = this.initialChecked;

    this.checkValidity();
    this.#internals.setFormValue(this.checked ? this.value ?? null : null);
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
    this.#internals.setFormValue(this.checked ? this.value ?? null : null);
  }

  protected override render() {
    return html`
      <div>
        <input
          type="checkbox"
          id="checkbox"
          name="${this.name}"
          autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .checked="${this.checked}"
          .value="${this.value}"
          @input="${this.handleInput}"
        />
        ${when(this.label !== undefined, () => html`<label for="checkbox">${this.label}</label>`)}
      </div>
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-checkbox': InputCheckbox;
  }
}
