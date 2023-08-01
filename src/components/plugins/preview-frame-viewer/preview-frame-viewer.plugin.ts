import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';

import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { compress, decompress } from '@/utils/compression.utils.js';
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

  #element?: Parsed.Element;

  @state()
  private _elementData?: ElementData;

  @property({ type: Object })
  set element(element: Parsed.Element | undefined) {
    this.#element = element;
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
    if (this.#element === undefined) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this.#element.tagName!) ?? undefined;
  }

  @eventOptions({ passive: true })
  protected async handleControlsInput({ detail }: CustomEvent<FormData>) {
    if (this.#element === undefined) return;
    // prepare the data to be set as compressed url param
    const data = mapFormData(detail, this.#element);
    const param = encodeURIComponent(await compress(JSON.stringify(data), URI_DATA_PARAM_COMPRESSION));

    // dispatch the event to update the url param
    const event = new CustomEvent('wcp-preview-frame-plugin:data-change', { detail: param });
    this.dispatchEvent(event);
  }

  protected override firstUpdated() {
    // set initial state from element if no data is given
    if (this.#element && this._elementData === undefined) {
      this._elementData = prepareInitialData(this.#element);
    }
  }

  protected override render(): TemplateResult {
    return html`${keyed(
      this.#element?.tagName ?? '',
      html`
        <wcp-preview-frame-viewer-stage
          preview-tag-name="${ifDefined(this.#element?.tagName)}"
          .data="${this._elementData}"
        ></wcp-preview-frame-viewer-stage>

        <wcp-preview-frame-viewer-controls
          .element="${this.#element}"
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
