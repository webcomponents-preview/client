import { html, LitElement, PropertyValues, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, queryAssignedElements } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import type { FormAssociated } from '@/utils/form.utils.js';

// Safari still hasn't ElementInternals shipped
import 'element-internals-polyfill';

// instruct esbuild to load the CSS file as a string
import styles from './radio-menu.component.scss';

/**
 * A radio menu element using the WCP style. Fully form aware.
 *
 * @element wcp-radio-menu
 *
 * @slot - The default slot. Pass the radio buttons here.
 *
 * @cssprop --wcp-radio-menu-label-size - The font size of the label.
 * @cssprop --wcp-radio-menu-label-spacing - The spacing between label and radio buttons.
 * @cssprop --wcp-radio-menu-option-spacing - The spacing between the radio buttons.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-radio-menu label="With optional label">
 *   <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
 *   <wcp-input-radio label="bar" value="bar"></wcp-input-radio>
 *   <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
 * </wcp-radio-menu>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-radio-menu label="With optional initial value">
 *   <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
 *   <wcp-input-radio checked label="bar" value="bar"></wcp-input-radio>
 *   <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
 * </wcp-radio-menu>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form>
 *   <wcp-radio-menu label="Fully form enabled component">
 *     <wcp-input-radio label="foo" value="foo"></wcp-input-radio>
 *     <wcp-input-radio label="bar" value="bar"></wcp-input-radio>
 *     <wcp-input-radio label="baz" value="baz"></wcp-input-radio>
 *   </wcp-radio-menu>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
@customElement('wcp-radio-menu')
export class RadioMenu extends LitElement implements FormAssociated<string> {
  static readonly formAssociated = true;
  static override readonly styles = unsafeCSS(styles);

  readonly #internals = this.attachInternals();

  private initialValue?: string;

  @queryAssignedElements({ selector: 'wcp-input-radio', flatten: true })
  private radios?: HTMLInputElement[];

  @property({ type: String, reflect: true })
  label?: string;

  @property({ type: String, reflect: true })
  name = 'radio-menu';

  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: Boolean, reflect: true })
  required = false;

  @property({ type: String, reflect: true })
  value?: string;

  override attributeChangedCallback(name: string, old: string | null, value: string | null): void {
    super.attributeChangedCallback(name, old, value);
    if (name === 'value') {
      this.checkValidity();
      this.#internals.setFormValue(this.value ?? null);
    }
  }

  protected override firstUpdated(props: PropertyValues<this>): void {
    super.firstUpdated(props);
    this.initialValue = this.value;

    this.checkValidity();
    this.#internals.setFormValue(this.value ?? null);
  }

  formResetCallback() {
    this.value = this.initialValue;

    this.checkValidity();
    this.#internals.setFormValue(this.value ?? null);
  }

  checkValidity(): boolean {
    if (this.required && this.value === undefined) {
      this.#internals.setValidity({ valueMissing: true }, 'Required');
    } else {
      this.#internals.setValidity({});
    }

    return this.#internals.validity.valid;
  }

  @eventOptions({ passive: true })
  handleSlotChange() {
    this.radios?.forEach((radio) => {
      radio.name = this.name;
      radio.disabled = this.disabled;
      radio.required = false;
    });
  }

  @eventOptions({ passive: true })
  handleInput(event: Event) {
    const input = event.target as HTMLInputElement;
    this.radios?.filter((radio) => radio !== input).map((radio) => (radio.checked = false));
    this.value = input.value;

    this.checkValidity();
    this.#internals.setFormValue(this.value ?? null);
  }

  protected override render() {
    return html`
      ${when(this.label !== undefined, () => html`<label>${this.label}</label>`)}
      <slot @slotchange="${this.handleSlotChange}" @input="${this.handleInput}"></slot>
    `;
  }
}
