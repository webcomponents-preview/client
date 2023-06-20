import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { FormAssociated } from '@/utils/form.utils.js';
import { Editable } from '@/mixins/editable.mixin.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-checkbox.component.scss';

/**
 * A checkbox input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-checkbox
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-checkbox-size - The size of the checkbox input.
 * @cssprop --wcp-input-checkbox-label-size - The font size of the label.
 * @cssprop --wcp-input-checkbox-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-checkbox-border-radius - The border radius of the checkbox input.
 * @cssprop --wcp-input-checkbox-border-size - The border size of the checkbox input.
 *
 * @cssprop --wcp-input-checkbox-dark-background - The background color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-border - The border color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-color - The fill color of the checkbox input when checked in dark mode.
 *
 * @cssprop --wcp-input-checkbox-light-background - The background color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-border - The border color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-color - The fill color of the checkbox input when checked in light mode.
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
export class InputCheckbox extends Editable({ hasBorder: false })(LitElement) implements FormAssociated<string> {
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  private initialChecked!: boolean;

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
    this.internals.setFormValue(this.checked ? this.value ?? null : null);
  }

  override attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'checked') {
      this.checked = value !== null;
      this.internals.setFormValue(this.checked ? this.value ?? null : null);
    }
  }

  formResetCallback() {
    this.checked = this.initialChecked;

    this.checkValidity();
    this.internals.setFormValue(this.checked ? this.value ?? null : null);
  }

  checkValidity(): boolean {
    if (this.required && !this.checked) {
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

    this.checkValidity();
    this.internals.setFormValue(this.checked ? this.value ?? null : null);
  }

  override renderInput(id: string) {
    return html`
      <input
        type="checkbox"
        id="${id}"
        name="${this.name}"
        autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .checked="${this.checked}"
        .value="${this.value}"
        @input="${this.handleInput}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-checkbox': InputCheckbox;
  }
}
