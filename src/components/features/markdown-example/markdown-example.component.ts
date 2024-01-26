import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { map } from 'lit/directives/map.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getConfig } from '@/utils/config.utils.js';

import styles from './markdown-example.component.scss';

const MARKDOWN_EXAMPLE_TABS = { preview: { label: 'Preview' }, code: { label: 'Code' } };

/**
 * Shows an inline code example and a preview of the element in the readme.
 * This is used in the markdown formatter to render `html` examples.
 *
 * In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
 * or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
 * `renderMarkdown` function provided by the `@/utils/markdown.utils`.
 *
 * @slot code - Code example
 * @slot preview - Rendered example preview
 *
 * @cssprop --wcp-markdown-example-spacing - Inner padding of the example
 * @cssprop --wcp-markdown-example-border-radius - Border radius of the example
 * @cssprop --wcp-markdown-example-border-width - Border width of the example
 *
 * @cssprop --wcp-markdown-example-dark-border-color - Border color of the example in dark mode
 * @cssprop --wcp-markdown-example-light-border-color - Border color of the example in light mode
 */
@customElement('wcp-markdown-example')
export class MarkdownExample extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  readonly #config = getConfig();

  protected override render(): TemplateResult {
    return html`
      <wcp-tabs .tabs="${MARKDOWN_EXAMPLE_TABS}" active-tab="${ifDefined(this.#config?.initialCodePreviewTab)}">
        ${map(Object.keys(MARKDOWN_EXAMPLE_TABS), (tab) => html`<slot name="${tab}" slot="${tab}"></slot>`)}
      </wcp-tabs>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-markdown-example': MarkdownExample;
  }
}
