import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import type * as Parsed from '@/utils/parser.types.js';
import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import type { PreviewFramePlugin } from '@/utils/plugin.utils.js';

import styles from './preview-frame-readme.plugin.scss';

@customElement('wcp-preview-frame-readme')
export class PreviewFrameReadme extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static override readonly styles = unsafeCSS(styles);

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true })
  available = false;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = window.wcp.manifest.elements.get(previewTagName);
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
  protected override render(): TemplateResult {
    return html`
      ${this.available
        ? html`
            <wcp-readme
              add-code-preview
              preview-tag-name="${ifDefined(this._element?.tagName)}"
              markdown="${this._element?.readme ?? ''}"
            ></wcp-readme>
          `
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
