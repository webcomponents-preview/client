import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { until } from 'lit/directives/until.js';

import { renderMarkdown } from '@/utils/markdown.utils';

import styles from './readme.component.scss';

/**
 * Displays a Readme file by its URL.
 *
 * @example
 * ```html
 * <wcp-readme url="/README.md"></wcp-readme>
 * ```
 */
@customElement('wcp-readme')
export class Readme extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true })
  url!: string;

  @property({ type: String, reflect: true })
  loading = 'Loading readme...';

  protected render(): TemplateResult {
    // const readme = fetch(this.url)
    //   .then((response) => response.text())
    //   .then((text) => unsafeHTML(renderMarkdown(text)) as string);
    const readme = Promise.resolve('')
    return html`${until(readme, html`${this.loading}`)}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-readme': Readme;
  }
}
