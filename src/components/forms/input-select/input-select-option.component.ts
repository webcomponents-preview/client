import { LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

/**
 * A helper element to declare options for a `wcp-input-select` element.
 *
 */
@customElement('wcp-input-select-option')
export class InputSelectOption extends LitElement {
  @property({ type: Boolean, reflect: true })
  disabled = false;

  @property({ type: String, reflect: true })
  value?: string;

  @property({ type: String, reflect: true })
  label?: string;

  // as this is just a declarative structural helper, we do not need any shadow DOM here
  protected override createRenderRoot(): HTMLElement | DocumentFragment {
    return this;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-input-select-option': InputSelectOption;
  }
}
