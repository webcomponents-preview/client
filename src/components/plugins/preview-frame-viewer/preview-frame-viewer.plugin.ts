import { LitElement, type TemplateResult, html, unsafeCSS } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { ifDefined } from 'lit/directives/if-defined.js';
import { keyed } from 'lit/directives/keyed.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { PreviewFramePlugin } from '@/utils/plugin.utils.js';

import { type ElementData, mapFormData, prepareInitialData } from './preview-frame-viewer.utils.js';

import styles from './preview-frame-viewer.plugin.scss';

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
    this._elementData = element ? prepareInitialData(element) : undefined;
  }

  @property({ type: Boolean, reflect: true, state: true })
  readonly available = true;

  @property({ type: String, reflect: true })
  readonly name = 'viewer';

  @property({ type: String, reflect: true })
  readonly label = 'Viewer';

  protected getElementReference(): Element | undefined {
    if (this.#element === undefined) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this.#element.tagName!) ?? undefined;
  }

  protected handleControlsInput(event: CustomEvent<FormData>) {
    if (this.#element === undefined) return;
    this._elementData = mapFormData(event.detail, this.#element);
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
