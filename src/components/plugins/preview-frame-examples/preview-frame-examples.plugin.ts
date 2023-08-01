import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type * as Parsed from '@/utils/parser.types.js';
import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { renderMarkdown } from '@/utils/markdown.utils.js';
import type { PreviewFramePlugin } from '@/utils/plugin.utils.js';

import styles from './preview-frame-examples.plugin.scss';

/**
 * Shows the examples of a custom element manifest.
 *
 * @cssprop --wcp-preview-frame-examples-spacing - Spacing between examples.
 */
@customElement('wcp-preview-frame-examples')
export class PreviewFrameExamples extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static override readonly styles = unsafeCSS(styles);

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true })
  available = false;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = window.wcp.manifest.elements.get(previewTagName);
    const available = this._element?.hasExamples ?? false;

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
  readonly name = 'examples';

  @property({ type: String, reflect: true })
  readonly label = 'Examples';

  protected override render(): TemplateResult {
    return html`
      ${map(
        this._element?.examples ?? [],
        (example: string) => html`
          <section>${unsafeHTML(renderMarkdown(example, true, this._element?.tagName))}</section>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-frame-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-examples': PreviewFrameExamples;
  }
}
