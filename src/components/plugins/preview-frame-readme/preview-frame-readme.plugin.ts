import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
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

  @state()
  private _element?: Parsed.Element;

  @property({ type: Boolean, reflect: true, state: true })
  available = false;

  @property({ type: Object })
  set element(element: Parsed.Element | undefined) {
    this._element = element;
    const available = this._element?.hasReadme ?? false;

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
  readonly name = 'readme';

  @property({ type: String, reflect: true })
  readonly label = 'Readme';

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
      ${this.available ? unsafeHTML(renderMarkdown(this._element?.readme ?? '')) : nothing}
      <style>
        ${PreviewFrameReadme.styles}
      </style>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-plugin:availability-change': CustomEvent<boolean>;
  }
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-readme': PreviewFrameReadme;
  }
}
