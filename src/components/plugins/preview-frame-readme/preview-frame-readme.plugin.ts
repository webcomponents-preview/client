import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import type * as Parsed from '@/utils/parser.types.js';
import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type { Plugin } from '@/utils/plugin.utils.js';

import styles from './preview-frame-readme.plugin.scss';

@customElement('wcp-preview-frame-readme')
export class PreviewFrameReadme extends ColorSchemable(LitElement) implements Plugin {
  static readonly styles = unsafeCSS(styles);

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true, state: true })
  available = false;

  @property({ type: Object })
  set element(element: Parsed.Element | undefined) {
    this._element = element;
    const available = this._element?.hasReadme ?? false;

    // update the property if changed
    if (this.available !== available) {
      this.available = available;

      // notify about availability change
      const event = new CustomEvent('wcp-preview-frame-plugin:availability-change', {
        detail: this.available,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

  @property({ type: String, reflect: true })
  readonly name = 'readme';

  @property({ type: String, reflect: true })
  readonly label = 'Readme';

  // without ShadowDOM, we need to manually inject the styles
  protected render(): TemplateResult {
    return html`
      ${this.available
        ? html`<wcp-readme add-code-preview markdown="${this._element?.readme ?? ''}"></wcp-readme>`
        : nothing}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-frame-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-readme': PreviewFrameReadme;
  }
}
