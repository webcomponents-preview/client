import { spread } from '@open-wc/lit-helpers';
import { html, LitElement, nothing, type TemplateResult, unsafeCSS } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';
import { unsafeStatic, withStatic } from 'lit/static-html.js';

import type { ElementData } from '../stage-editor.utils.js';

import styles from './stage-editor-preview.component.scss';

/**
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

  /**
   * Takes the given attributes record, eliminates the empty keys and aligns boolean attributes.
   * @private
   */
  #alignAttributes(attributes: ElementData['attributes']): ElementData['attributes'] {
    return Object.entries(attributes ?? {}).reduce((acc, [key, value]) => {
      // align the ky by removing forbidden characters
      key = key.replace(/[^a-zA-Z0-9-]/g, '');
      // skip empty keys
      if (key === '') return acc;
      // missing value means boolean attribute
      if (['', null, undefined].includes(value)) {
        return { ...acc, [`?${key}`]: true };
      }
      // otherwise, just return the pair
      return { ...acc, [key]: value };
    }, {});
  }

  /**
   * Prepares a record of lit aware attributes and properties.
   * @private
   */
  #prepareProps(): Record<string, unknown> {
    return {
      // set the attributes first, as they may be overwritten by the fields...
      ...this.#alignAttributes(this.data?.attributes ?? {}),
      // ... if the same key is used in both
      ...(this.data?.fields ?? {}),
    };
  }

  protected renderSlots(): TemplateResult {
    return html`
      ${map(
        Object.entries(this.data?.slots ?? {})
          // do not render empty slots
          .filter(([, content]) => content.trim() !== ''),
        ([name, content]) => withStatic(html)`
          ${when(
            name === '',
            () => unsafeHTML(content),
            () => withStatic(html)`<div slot="${name}">${unsafeHTML(content)}</div>`,
          )}
        `,
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
        ${keyed(
          this.data,
          withStatic(html)`
            <${tag} ${spread(this.#prepareProps())}>
              ${this.renderSlots()}
            </${tag}>
          `,
        )}
      </wcp-preview>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-stage-editor-preview': StageEditorPreview;
  }
}
