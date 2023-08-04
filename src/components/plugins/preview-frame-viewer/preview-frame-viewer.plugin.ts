import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { compress, decompress } from '@/utils/compression.utils.js';
import { getManifest } from '@/utils/manifest.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { PreviewFramePlugin } from '@/utils/plugin.utils.js';

import { type ElementData, mapFormData, prepareInitialData } from './preview-frame-viewer.utils.js';

import styles from './preview-frame-viewer.plugin.scss';

const URI_DATA_PARAM_COMPRESSION: CompressionFormat = 'deflate-raw';

/**
 * @element wcp-preview-frame-viewer
 */
@customElement('wcp-preview-frame-viewer')
export class PreviewFrameViewer extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

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

  @property({ type: String, reflect: true })
  readonly name = 'viewer';

  @property({ type: String, reflect: true })
  readonly label = 'Viewer';

  async #prepareElementData(data?: string) {
    // read element data from compressed data param
    if (data !== undefined) {
      const elementData = await decompress(decodeURIComponent(data), URI_DATA_PARAM_COMPRESSION);
      this._elementData = JSON.parse(elementData);
    }
    // otherwise we reset the data
    else {
      this._elementData = undefined;
    }
  }

  protected getElementReference(): Element | undefined {
    if (this._element === undefined) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this._element.tagName!) ?? undefined;
  }

  @eventOptions({ passive: true })
  protected async handleControlsInput({ detail }: CustomEvent<FormData>) {
    if (this._element === undefined) return;

    // prepare the data to be set as compressed url param
    const data = mapFormData(detail, this._element);
    const param = encodeURIComponent(await compress(JSON.stringify(data), URI_DATA_PARAM_COMPRESSION));

    // dispatch the event to update the url param
    const event = new CustomEvent('wcp-preview-frame-plugin:data-change', { detail: param });
    this.dispatchEvent(event);
  }

  protected override firstUpdated() {
    // set initial state from element if no data is given
    if (this._element && this._elementData === undefined) {
      this._elementData = prepareInitialData(this._element);
    }
  }

  protected override render(): TemplateResult {
    return html`${keyed(
      this._element?.tagName ?? '',
      html`
        <wcp-preview-frame-viewer-stage
          preview-tag-name="${ifDefined(this._element?.tagName)}"
          .data="${this._elementData}"
        ></wcp-preview-frame-viewer-stage>

        <wcp-preview-frame-viewer-controls
          preview-tag-name="${ifDefined(this._element?.tagName)}"
          .data="${this._elementData}"
          @wcp-preview-frame-viewer-controls:input="${this.handleControlsInput}"
        ></wcp-preview-frame-viewer-controls>
      `
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-viewer': PreviewFrameViewer;
  }
}
