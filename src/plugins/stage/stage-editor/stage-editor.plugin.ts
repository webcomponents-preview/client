import type { TemplateResult } from 'lit';
import { html, LitElement, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';
import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { debounce } from '@/utils/debounce.utils.js';
import { getManifest } from '@/utils/manifest.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { StagePlugin } from '@/utils/plugin.utils.js';

import styles from './stage-editor.plugin.scss';
import type { ElementData } from './stage-editor.utils.js';
import { compressFormData, decompressElementData, prepareInitialData } from './stage-editor.utils.js';

const UPDATE_DEBOUNCE = 300;

/**
 * Allows editing a custom element.
 *
 */
@customElement('wcp-stage-editor')
export class StageEditor extends ColorSchemable(LitElement) implements StagePlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

  readonly #updateFormData = debounce(async (formData: FormData, element: Parsed.Element) => {
    // dispatch the event to update the url param
    const data = await compressFormData(formData, element);
    const event = new CustomEvent('wcp-stage-plugin:data-change', { detail: data });
    this.dispatchEvent(event);
  }, UPDATE_DEBOUNCE);

  readonly name = 'editor';
  readonly label = 'Editor';

  @state()
  private _element?: Parsed.Element;

  @state()
  private _elementData?: ElementData;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = this.#manifest.elements.get(previewTagName);
  }

  @property({ type: String })
  set data(data: string | undefined) {
    this.#prepareElementData(data);
  }

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  async #prepareElementData(compressed?: string) {
    if (this._element === undefined) {
      return;
    }

    // given data is always without default values, thus we have to retrieve them first
    const initialData = prepareInitialData(this._element);

    // read element data from compressed data param
    if (compressed !== undefined) {
      // merge given data on top of the initial data
      const elementData = await decompressElementData(compressed);
      this._elementData = {
        attributes: { ...initialData.attributes, ...elementData.attributes },
        fields: { ...initialData.fields, ...elementData.fields },
        slots: { ...initialData.slots, ...elementData.slots },
      };
    }
    // otherwise we reset the data
    else {
      this._elementData = initialData;
    }
  }

  protected getElementReference(): Element | undefined {
    if (this._element === undefined) {
      return undefined;
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this._element.tagName!) ?? undefined;
  }

  @eventOptions({ passive: true })
  protected async handleControlsInput({ detail }: CustomEvent<FormData>) {
    if (this._element === undefined) {
      return;
    }
    this.#updateFormData(detail, this._element);
  }

  protected override firstUpdated() {
    this.#prepareElementData();
  }

  protected override render(): TemplateResult {
    return html`${keyed(
      this._element?.tagName ?? '',
      html`
        <wcp-stage-editor-preview
          preview-tag-name="${ifDefined(this._element?.tagName)}"
          .data="${this._elementData}"
        ></wcp-stage-editor-preview>

        <wcp-stage-editor-controls
          preview-tag-name="${ifDefined(this._element?.tagName)}"
          .data="${this._elementData}"
          @wcp-stage-editor-controls:input="${this.handleControlsInput}"
        ></wcp-stage-editor-controls>
      `
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-stage-editor': StageEditor;
  }
}
