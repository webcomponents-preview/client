import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type * as Parsed from '@/utils/parser.types';
import { ColorSchemable } from '@/utils/color-scheme.utils';
import { renderMarkdown } from '@/utils/markdown.utils';

import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';

import styles from './preview-frame-examples.plugin.scss';

/**
 * Shows the examples of a custom element manifest.
 *
 * @cssprop --wcp-preview-frame-examples-spacing - Spacing between examples.
 */
@customElement('wcp-preview-frame-examples')
export class PreviewFrameExamples extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static readonly styles = unsafeCSS(styles);

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true, state: true })
  available = false;

  @property({ type: Object })
  set element(element: Parsed.Element | undefined) {
    this._element = element;
    const available = this._element?.hasExamples ?? false;

    // update the property if changed
    if (this.available !== available) {
      this.available = available;

      // notify about availability change
      const event = new CustomEvent('wcp-preview-plugin:availability-change', {
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

  protected render(): TemplateResult {
    return html`
      ${map(
        this._element?.examples ?? [],
        (example: string) => html`<section>${unsafeHTML(renderMarkdown(example))}</section>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-examples': PreviewFrameExamples;
  }
}