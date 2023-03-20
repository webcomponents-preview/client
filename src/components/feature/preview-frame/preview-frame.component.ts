import type { CustomElementDeclaration } from 'custom-elements-manifest';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import type { Config } from '@/utils/config.utils';
import {
  type CustomElementDeclarationWithExamples,
  type CustomElementDeclarationWithReadme,
  hasExamples,
  hasReadme,
} from '@/utils/custom-elements-manifest.utils';
import { renderMarkdown } from '@/utils/markdown.utils';

import styles from './preview-frame.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-frame></wcp-preview-frame>
 * ```
 *
 * @cssprop --wcp-preview-frame-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-preview-frame-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-preview-frame-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-preview-frame-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-preview-frame-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-preview-frame-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-preview-frame-distance - Outer margin of the preview frame
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the preview frame
 * @cssprop --wcp-preview-frame-border-width - Border width of the example section
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the example section
 */
@customElement('wcp-preview-frame')
export class PreviewFrame extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @state()
  preview = '';

  @state()
  examples: string[] = [];

  @property({ type: Object })
  element?: CustomElementDeclaration;

  @property({ type: String, reflect: true, attribute: 'initial-preview-tab' })
  initialPreviewTab?: Config['initialPreviewTab'];

  protected renderExamples(element: CustomElementDeclarationWithExamples): TemplateResult {
    return html`
      <div slot="examples">
        ${map(element.examples, (example: string) => html`<section>${unsafeHTML(renderMarkdown(example))}</section>`)}
      </div>
    `;
  }

  protected renderReadme(element: CustomElementDeclarationWithReadme): TemplateResult {
    return html`<wcp-readme slot="readme" markdown="${element.readme}"></wcp-readme>`;
  }

  protected renderViewer(element: CustomElementDeclaration): TemplateResult {
    return html`<wcp-viewer slot="viewer" .element="${element}"></wcp-viewer>`;
  }

  protected render(): TemplateResult {
    const tabs = {
      ...(hasExamples(this.element) ? { examples: 'Examples' } : {}),
      ...(hasReadme(this.element) ? { readme: 'Readme' } : {}),
      viewer: 'Viewer',
    };

    return html`
      ${when(
        this.element !== undefined && Object.keys(tabs).length > 0,
        () => html`
          <wcp-tabs .tabs="${tabs}" active-tab="${this.initialPreviewTab ?? Object.keys(tabs)[0]}">
            ${when('examples' in tabs, () => this.renderExamples(this.element as CustomElementDeclarationWithExamples))}
            ${when('readme' in tabs, () => this.renderReadme(this.element as CustomElementDeclarationWithReadme))}
            ${this.renderViewer(this.element as CustomElementDeclaration)}
          </wcp-tabs>
        `,
        () => html`<h1>No preview available.</h1>`
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame': PreviewFrame;
  }
}
