import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type * as Parsed from '@/utils/parser.types';
import { ColorSchemable } from '@/utils/color-scheme.utils';
import { renderMarkdown } from '@/utils/markdown.utils';

import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';

import styles from './preview-frame-readme.plugin.scss';

/**
 * @cssprop --wcp-preview-frame-readme-dark-border-color - Border color of the readme in dark mode.
 * @cssprop --wcp-preview-frame-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
 *
 * @cssprop --wcp-preview-frame-readme-light-border-color - Border color of the readme in light mode.
 * @cssprop --wcp-preview-frame-readme-light-highlight-background - Background color of highlighted table rows in light mode.
 */
@customElement('wcp-preview-frame-readme')
export class PreviewFrameReadme extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static readonly styles = unsafeCSS(styles);

  @property({ type: Object })
  element?: Parsed.Element;

  @property({ type: String, reflect: true })
  readonly name = 'readme';

  @property({ type: String, reflect: true })
  readonly label = 'Readme';

  @property({ type: Boolean, reflect: true })
  get available(): boolean {
    return this.element?.hasReadme ?? false;
  }

  // disable ShadowDOM
  // https://stackoverflow.com/a/55213037/1146207
  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    super.connectedCallback();
    this.classList.add('markdown-body');
  }

  // without ShadowDOM, we need to manually inject the styles
  protected render(): TemplateResult {
    return html`
      ${this.element?.hasReadme ? unsafeHTML(renderMarkdown(this.element?.readme ?? '')) : nothing}
      <style>
        ${PreviewFrameReadme.styles}
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-readme': PreviewFrameReadme;
  }
}
