import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
import { ColorSchemable } from '@/utils/color-scheme.utils';
import { type CustomElementDeclarationWithReadme, hasReadme } from '@/utils/custom-elements-manifest.utils';
import { renderMarkdown } from '@/utils/markdown.utils';

import styles from './preview-frame-readme.plugin.scss';

@customElement('wcp-preview-frame-readme')
export class PreviewFrameReadme
  extends ColorSchemable(LitElement)
  implements PreviewFramePlugin<CustomElementDeclarationWithReadme>
{
  static readonly styles = unsafeCSS(styles);

  @property({ type: Object })
  element?: CustomElementDeclarationWithReadme;

  @property({ type: String, reflect: true })
  readonly name = 'readme';

  @property({ type: String, reflect: true })
  readonly label = 'Readme';

  @property({ type: Boolean, reflect: true })
  get available(): boolean {
    return hasReadme(this.element);
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
      ${hasReadme(this.element) ? unsafeHTML(renderMarkdown(this.element.readme)) : nothing}
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
