import { spread } from '@open-wc/lit-helpers';

import { html, LitElement, type TemplateResult, unsafeCSS, nothing } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';

import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import type { ElementData } from '../stage-editor.utils.js';

import styles from './stage-editor-preview.component.scss';

/**
 * @element wcp-stage-editor-preview
 *
 * @example
 * ```html
 * <wcp-stage-editor-preview>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-stage-editor-preview>
 * ```
 */
@customElement('wcp-stage-editor-preview')
export class StageEditorPreview extends LitElement {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  previewTagName?: string;

  @property({ type: Object })
  data?: ElementData;

  protected renderSlots(): TemplateResult {
    return html`
      ${map(
        Object.entries(this.data?.slots ?? {}),
        ([name, content]) => withStatic(html)`
          ${when(
            name === '',
            () => unsafeHTML(content),
            () => withStatic(html)`<div slot="${name}">${unsafeHTML(content)}</div>`
          )}
        `
      )}
    `;
  }

  protected override render(): TemplateResult {
    // we need the tag name to be defined and the iframe ready
    if (this.previewTagName === undefined || !this.previewTagName.length) return html`${nothing}`;

    // prepare the tag name and render it along with the slots and properties
    const tag = unsafeStatic(this.previewTagName);
    return html`
      <wcp-preview preview-tag-name="${this.previewTagName}">
        ${withStatic(html)`<${tag} ${spread(this.data?.fields ?? {})}>${this.renderSlots()}</${tag}>`}
      </wcp-preview>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-stage-editor-preview': StageEditorPreview;
  }
}
