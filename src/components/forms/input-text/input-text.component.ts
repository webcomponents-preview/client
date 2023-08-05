import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';

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
 * @cssprop --wcp-input-text-hint-size - The font size of the hint.
 * @cssprop --wcp-input-text-label-size - The font size of the label.
 * @cssprop --wcp-input-text-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-text-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-text-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-text-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-text-light-color - The font color of the input element in light mode.
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
  private readonly input?: HTMLInputElement | HTMLTextAreaElement;

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

  /**
   * Can be set to to `text`, `email`, `password`, `search`, `tel`, or `url`. \
   * Beware that this will be ignored if combined with the `multiline` attribute.
   */
  @property({ type: String, reflect: true })
  type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url' = 'text';

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
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement | HTMLTextAreaElement;
    this.value = input.value ?? undefined;
  }

  override renderInput(id: string) {
    if (this.multiline) {
      return html`
        <textarea
          id="${id}"
          name="${this.name}"
          autocomplete="${this.autocomplete ? 'on' : 'off'}"
          ?disabled="${this.disabled}"
          ?required="${this.required}"
          .value="${this.value ?? ''}"
          @input="${this.handleInput}"
        ></textarea>
      `;
    }

    return html`
      <input
        type="${this.type}"
        id="${id}"
        name="${this.name}"
        autocomplete="${this.autocomplete ? 'on' : 'off'}"
        ?disabled="${this.disabled}"
        ?required="${this.required}"
        .value="${this.value ?? ''}"
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
