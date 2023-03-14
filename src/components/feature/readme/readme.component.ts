import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';

import { renderMarkdown } from '@/utils/code.utils';

import styles from './readme.component.scss';

/**
 * @example
 * ```html
 * <wcp-readme>
 *  <h1>Readme</h1>
 *  <p>Some readme content</p>
 * </wcp-readme>
 * ```
 */
@customElement('wcp-readme')
export class Readme extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String })
  markdown!: string;

  // disable ShadowDOM
  // https://stackoverflow.com/a/55213037/1146207
  override createRenderRoot() {
    return this;
  }

  override connectedCallback() {
    console.log('connected');
    super.connectedCallback();
    this.classList.add('markdown-body');
  }

  // without ShadowDOM, we need to manually inject the styles
  protected render(): TemplateResult {
    console.log('render');
    return html`
      ${unsafeHTML(renderMarkdown(this.markdown))}
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
