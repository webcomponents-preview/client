import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { FormAssociated } from '@/utils/form.utils.js';
import { Editable } from '@/mixins/editable.mixin.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-text.component.scss';

/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
 *
 * @element wcp-input-text
 * 
 * @property {string} label - The label of the input element.
 * 
 * @slot hint - Receives optional descriptions below the input.
 * 
 * @cssprop --wcp-input-text-label-size - The font size of the label.
 * @cssprop --wcp-input-text-label-spacing - The spacing between the label and the input.
 * @cssprop --wcp-input-text-spacing - The inner spacing of the input element.

 * @cssprop --wcp-input-text-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-color - The font color of the input element in dark mode.
 * 
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-text label="With optional label"></wcp-input-text>
 * ```
 * 
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-text label="With optional initial value" value="Foo"></wcp-input-text>
 * ```
 * 
 * @example
 * ## Multiline
 * ```html
 * <wcp-input-text multiline label="With multiline value"></wcp-input-text>
 * ```
 * 
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-text label="Fully form enabled component"></wcp-input-text>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-text')
export class InputText extends Editable()(LitElement) implements FormAssociated<string> {
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #initialValue?: string;

  @query('input, textarea')
  input!: HTMLInputElement | HTMLTextAreaElement;

  @property({ type: Boolean, reflect: true })
  multiline = false;

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

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);
  }

  formResetCallback() {
    this.value = this.#initialValue;

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);
  }

  checkValidity(): boolean {
    if (!this.input.checkValidity()) {
      this.internals.setValidity({ customError: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value ?? undefined;

    this.checkValidity();
    this.internals.setFormValue(this.value ?? null);
  }

  override renderInput(id: string) {
    if (this.multiline) {
      return html`
        <textarea
          type="text"
          id="${id}"
          name="${this.name}"
          autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .value="${this.value ?? null}"
          @input="${this.handleInput}"
        ></textarea>
      `;
    }

    return html`
      <input
        type="text"
        id="${id}"
        name="${this.name}"
        autocomplete="${ifDefined(this.autocomplete) ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.value ?? null}"
        @input="${this.handleInput}"
      />
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-text': InputText;
  }
}
