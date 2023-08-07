import 'prismjs';
import 'lit-code';
import type { LitCode } from 'lit-code';

import { html, LitElement, type PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type { FormAssociated } from '@/utils/form.utils.js';
import { Editable } from '@/mixins/editable.mixin.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-code.component.scss';

/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
 *
 * @element wcp-input-code
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-code-hint-size - The font size of the hint.
 * @cssprop --wcp-input-code-label-size - The font size of the label.
 * @cssprop --wcp-input-code-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-code-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-code-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-code-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-code-light-color - The font color of the input element in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-code label="With optional label"></wcp-input-code>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-code
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## With autosize
 * ```html
 * <wcp-input-code
 *   autosize
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-input-code
 *     label="Fully form enabled component"
 *     value="<strong>Test</strong>"
 *     language="html"
 *   ></wcp-input-code>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-code')
export class InputCode extends Editable()(LitElement) implements FormAssociated<string> {
  static override readonly shadowRootOptions = { ...super.shadowRootOptions, delegatesFocus: true };
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #initialValue?: string;

  @query('lit-code')
  private readonly _code?: LitCode;

  @property({ type: Boolean, reflect: true })
  autosize = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  name = 'text';

  @property({ type: String, reflect: true })
  language = 'html' as const;

  @property({ type: String, reflect: true, noAccessor: true })
  set value(value: string | undefined) {
    // pass to inner editor
    this._code?.setCode(value ?? '');

    // update the form state
    this.internals.setFormValue(value ?? '');
    this.checkValidity();
  }
  get value(): string | undefined {
    return this._code?.getCode();
  }

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.#initialValue = this.value;
  }

  formResetCallback() {
    this.value = this.#initialValue;
  }

  checkValidity(): boolean {
    if (this.required && !this.value) {
      this.internals.setValidity({ valueMissing: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleUpdate({ detail }: CustomEvent<string>) {
    // update the form state
    this.internals.setFormValue(detail);
    this.checkValidity();

    // notify the form that the value has changed
    this.dispatchEvent(
      new InputEvent('input', { bubbles: true, composed: true, inputType: 'insertText', data: detail })
    );
  }

  override renderInput(id: string) {
    return html`
      <lit-code
        id="${id}"
        linenumbers
        language="${this.language}"
        code="${ifDefined(this.value)}"
        @update="${this.handleUpdate}"
      ></lit-code>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-code': InputCode;
  }
}
