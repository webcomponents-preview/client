import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, query } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { Editable } from '@/mixins/editable.mixin.js';
import type { FormAssociated } from '@/utils/form.utils.js';

// instruct esbuild to load the CSS file as a string
import styles from './input-key-value-pairs.component.scss';

/**
 * A key-value pairs editor. Integrates into forms and allows editing string based form data.
 *
 * @property {string} label - The label of the input element.
 * @cssprop --wcp-input-key-value-pairs-gutter - The gutter between the key-value pair inputs.
 * @slot hint - Receives optional descriptions below the input.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-key-value-pairs label="With optional label"></wcp-input-key-value-pairs>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form oninput="console.log(Array.from(new FormData(this).entries()))" onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-key-value-pairs name="embedded." label="Fully form enabled component"></wcp-input-key-value-pairs>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-input-key-value-pairs')
export class InputKeyValuePairs
  extends Editable({ hasBeforeSlot: false, hasAfterSlot: false, hasBorder: false })(LitElement)
  implements FormAssociated<FormData>
{
  static override readonly styles = [super.formStyles, unsafeCSS(styles)];

  #rawValue = new FormData();
  #prefixedValue = new FormData();
  #valuePairs: [string, string | undefined][] = [['', '']];
  #initialValue = new FormData();

  get #hasEmptyPair(): boolean {
    return this.#valuePairs.some(([key]) => key === '');
  }

  @query('form')
  readonly form!: HTMLFormElement;

  /**
   * The name acts as a prefix to the form data keys.
   */
  @property({ type: String, reflect: true })
  name = 'key-value.';

  @property({ type: Boolean, reflect: true })
  autocomplete = false;

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ attribute: false, noAccessor: true })
  set value(value: FormData | undefined) {
    // update internal value with prefixed name
    const oldValue = this.#prefixedValue;
    const formData = value ?? new FormData();

    // first, reset internal values
    this.#rawValue = new FormData();
    this.#prefixedValue = new FormData();
    this.#valuePairs = [];

    // then, map the new values
    formData.forEach((value, key) => {
      const rawKey = key.startsWith(this.name) ? key.substring(this.name.length) : key;
      const preKey = key.startsWith(this.name) ? key : `${this.name}${key}`;

      this.#rawValue.set(rawKey, value);
      this.#prefixedValue.set(preKey, value);
      this.#valuePairs.push([rawKey, typeof value === 'string' ? value : '']);
    });

    // add at least on single empty pair
    if (!this.#hasEmptyPair) this.#valuePairs.push(['', '']);

    // set internal form value
    this.internals.setFormValue(this.#prefixedValue);
    this.checkValidity();
    this.requestUpdate('value', oldValue);
  }
  get value(): FormData | undefined {
    return this.#prefixedValue;
  }

  @property({ attribute: false, noAccessor: true })
  set pairs(pairs: [string, string | undefined][]) {
    this.value = pairs.reduce((formData, [key, value]) => {
      formData.set(key, value ?? '');
      return formData;
    }, new FormData());
  }
  get pairs(): [string, string | undefined][] {
    return this.#valuePairs.map(([key, value]) => [key, value !== '' ? value : undefined]);
  }

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.#initialValue = this.#rawValue;
  }

  formResetCallback() {
    this.value = this.#initialValue;
  }

  checkValidity(): boolean {
    if (this.required && Array.from(this.#prefixedValue.values()).length < 1) {
      this.internals.setValidity({ valueMissing: true }, 'Invalid input');
    } else {
      this.internals.setValidity({});
    }

    return this.internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleInput() {
    // prepare new form data and make sure to keep the empty entry
    const formData = new FormData(this.form);
    if (this.#hasEmptyPair) formData.append('', this.#rawValue.get('') ?? '');
    this.value = formData;
  }

  @eventOptions({ passive: true })
  handleRemoveClick(event: MouseEvent) {
    const button = event.currentTarget as HTMLButtonElement;

    // remove the pair from the internal value
    const before = this.#valuePairs.slice(0, Number(button.dataset.index));
    const after = this.#valuePairs.slice(Number(button.dataset.index) + 1);
    this.#valuePairs = [...before, ...after];

    // remove the pair from the form data
    this.#rawValue.delete(button.dataset.key!);
    this.#prefixedValue.delete(`${this.name}${button.dataset.key!}`);

    // update the internal form value
    this.internals.setFormValue(this.#prefixedValue);
    this.checkValidity();
    this.requestUpdate();

    // dispatch input event
    this.dispatchEvent(new InputEvent('input', { bubbles: true, composed: true }));
  }

  override renderInput() {
    return html`
      <form @input="${this.handleInput}">
        ${map(
          this.#valuePairs,
          ([key, value], index) => html`
            <wcp-input-key-value ?disabled="${this.disabled}" name="${key}" value="${value ?? ''}">
              ${when(
                key !== '',
                () => html`
                  <wcp-button
                    data-key="${key}"
                    data-index="${index}"
                    slot="after"
                    kind="icon"
                    @click="${this.handleRemoveClick}"
                  >
                    <wcp-icon name="remove" style="--wcp-icon-size: 20"></wcp-icon>
                  </wcp-button>
                `,
                () => html`
                  <wcp-button disabled slot="after" kind="icon">
                    <wcp-icon name="add" style="--wcp-icon-size: 20"></wcp-icon>
                  </wcp-button>
                `,
              )}
            </wcp-input-key-value>
          `,
        )}
      </form>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-key-value-pairs': InputKeyValuePairs;
  }
}
