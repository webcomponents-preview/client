import type { CustomElementDeclaration } from 'custom-elements-manifest';

import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { renderMarkdown } from '@/utils/code.utils';
import {
  type CustomElementDeclarationWithExamples,
  hasExamples,
  hasReadme,
  CustomElementDeclarationWithReadme,
} from '@/utils/custom-elements-manifest.utils';

import styles from './preview-frame.component.scss';

/**
 * @example
 * ```html
 * <wcp-preview-frame></wcp-preview-frame>
 * ```
 */
@customElement('wcp-preview-frame')
export class PreviewFrame extends LitElement {
  static readonly styles = unsafeCSS(styles);

  @state()
  preview = '';

  @state()
  examples: string[] = [];

  @property({ type: Object })
  activeElement?: CustomElementDeclaration;

  protected renderExamples(element: CustomElementDeclarationWithExamples): TemplateResult {
    return html`
      <div slot="examples">
        ${map(element.examples, (example: string) => html`<section .innerHTML="${renderMarkdown(example)}"></section>`)}
      </div>
    `;
  }

  protected renderReadme(element: CustomElementDeclarationWithReadme): TemplateResult {
    return html` <div slot="readme" .innerHTML="${renderMarkdown(element.readme)}"></div> `;
  }

  protected render(): TemplateResult {
    const tabs = {
      ...(hasExamples(this.activeElement) ? { examples: 'Examples' } : {}),
      ...(hasReadme(this.activeElement) ? { readme: 'Readme' } : {}),
    };
    console.log(this.activeElement);

    return html`
      ${when(
        this.activeElement !== undefined && Object.keys(tabs).length > 0,
        () => html`
          <wcp-tabs .tabs="${tabs}" active-tab="${Object.keys(tabs)[0]}">
            ${when('examples' in tabs, () =>
              this.renderExamples(this.activeElement as CustomElementDeclarationWithExamples)
            )}
            ${when('readme' in tabs, () => this.renderReadme(this.activeElement as CustomElementDeclarationWithReadme))}
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
