import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
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

  @property({ type: Object })
  element?: Parsed.Element;

  @property({ type: String, reflect: true })
  readonly name = 'examples';

  @property({ type: String, reflect: true })
  readonly label = 'Examples';

  @property({ type: Boolean, reflect: true })
  get available(): boolean {
    return this.element?.hasExamples ?? false;
  }

  protected render(): TemplateResult {
    return html`
      ${map(
        this.element?.examples ?? [],
        (example: string) => html`<section>${unsafeHTML(renderMarkdown(example))}</section>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-examples': PreviewFrameExamples;
  }
}
