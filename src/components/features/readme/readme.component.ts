import { LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { until } from 'lit/directives/until.js';
import { html } from 'lit/static-html.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { renderMarkdown } from '@/utils/markdown.utils.js';

import styles from './readme.component.scss';

/**
 * Displays a Readme file by its URL.
 *
 * @cssprop --wcp-readme-dark-color - Text color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-color-accent - Accent text color (e.g. links) of the readme in dark mode.
 * @cssprop --wcp-readme-dark-color-muted - Muted text color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-border-color - Border color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
 *
 * @cssprop --wcp-readme-light-color - Text color of the readme in light mode.
 * @cssprop --wcp-readme-light-color-accent - Accent text color (e.g. links) of the readme in light mode.
 * @cssprop --wcp-readme-light-color-muted - Muted text color of the readme in light mode.
 * @cssprop --wcp-readme-light-border-color - Border color of the readme in light mode.
 * @cssprop --wcp-readme-light-highlight-background - Background color of highlighted table rows in light mode.
 *
 */
@customElement('wcp-readme')
export class Readme extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: Boolean, reflect: true, attribute: 'add-code-preview' })
  readonly showCodePreview = false;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  readonly previewTagName?: string;

  @property({ type: String })
  readonly markdown = '';

  @property({ type: String, reflect: true })
  readonly hash?: string;

  protected override updated() {
    if (this.hash) {
      this.scrollToId(this.hash);
    }
  }

  scrollToId(section: string) {
    const element = this.querySelector(`#${section}`);
    if (element !== null) {
      // as hash routing may be used, we can't rely on the `:target` pseudo selector, thus we set a class
      this.querySelectorAll('.target').forEach((el) => el.classList.remove('target'));
      element.classList.add('target');

      // finally, scroll to the element
      element.scrollIntoView({ behavior: 'auto' });
    }
  }

  protected override render(): TemplateResult {
    return html`
      <div
        class="markdown-body"
        .innerHTML="${until(renderMarkdown(this.markdown, this.showCodePreview, this.previewTagName))}"
      ></div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-readme': Readme;
  }
}
