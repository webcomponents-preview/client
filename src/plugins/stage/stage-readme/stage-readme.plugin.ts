import { html, LitElement, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getManifest } from '@/utils/manifest.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { StagePlugin } from '@/utils/plugin.utils.js';

import styles from './stage-readme.plugin.scss';

/**
 * Shows the readme of a custom element.
 *
 * @element wcp-stage-readme
 */
@customElement('wcp-stage-readme')
export class StageReadme extends ColorSchemable(LitElement) implements StagePlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

  readonly name = 'readme';
  readonly label = 'Readme';

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true })
  available = false;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = this.#manifest.elements.get(previewTagName);
    const available = this._element?.hasReadme ?? false;

    // update the property if changed
    if (this.available !== available) {
      this.available = available;

      // notify about availability change
      const event = new CustomEvent('wcp-stage-plugin:availability-change', {
        detail: this.available,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }

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
    'wcp-stage-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-stage-readme': StageReadme;
  }
}
