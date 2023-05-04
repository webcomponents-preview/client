import { LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { html, unsafeStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import { renderMarkdown } from '@/utils/markdown.utils';

import styles from './readme.component.scss';

/**
 * Displays a Readme file by its URL.
 *
 * @element wcp-readme
 *
 * @cssprop --wcp-readme-dark-border-color - Border color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
 *
 * @cssprop --wcp-readme-light-border-color - Border color of the readme in light mode.
 * @cssprop --wcp-readme-light-highlight-background - Background color of highlighted table rows in light mode.
 *
 * @example
 * ```html
 * <wcp-readme markdown="# Hello _World_!"></wcp-readme>
 * ```
 */
@customElement('wcp-readme')
export class Readme extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true, attribute: 'add-code-preview' })
  readonly showCodePreview = false;

  @property({ type: String, reflect: true })
  readonly markdown = '';

  override async connectedCallback() {
    super.connectedCallback();

    // apply global class for github stylesheet to be applied
    this.classList.add('markdown-body');
  }

  // disable ShadowDOM
  // https://stackoverflow.com/a/55213037/1146207
  override createRenderRoot() {
    return this;
  }

  protected render(): TemplateResult {
    return html`
      ${unsafeStatic(renderMarkdown(this.markdown, this.showCodePreview))}
      <style>
        ${Readme.styles}
      </style>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-readme': Readme;
  }
}
