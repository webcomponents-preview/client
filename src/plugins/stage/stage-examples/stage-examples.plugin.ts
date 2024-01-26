import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { until } from 'lit/directives/until.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getManifest } from '@/utils/manifest.utils.js';
import { renderMarkdown } from '@/utils/markdown.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { StagePlugin } from '@/utils/plugin.utils.js';

import styles from './stage-examples.plugin.scss';

/**
 * Shows the examples of a custom element manifest.
 *
 * @cssprop --wcp-stage-examples-spacing - Spacing between examples.
 */
@customElement('wcp-stage-examples')
export class StageExamples extends ColorSchemable(LitElement) implements StagePlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

  readonly name = 'examples';
  readonly label = 'Examples';

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true })
  available = false;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = this.#manifest.elements.get(previewTagName);
    const available = this._element?.hasExamples ?? false;

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

  protected override render(): TemplateResult {
    return html`
      ${map(
        this._element?.examples ?? [],
        (example: string) =>
          html`<section .innerHTML="${until(renderMarkdown(example, true, this._element?.tagName))}"></section>`,
      )}
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-stage-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-stage-examples': StageExamples;
  }
}
