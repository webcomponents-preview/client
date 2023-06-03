import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import type { PreviewFramePlugin } from '@/utils/plugin.utils.js';

import { type ElementData, mapFormData, prepareInitialData } from './preview-frame-viewer.utils.js';

import styles from './preview-frame-viewer.plugin.scss';

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

  protected handleControlsInput(event: InputEvent) {
    if (this.#element === undefined) return;
    const form = event.currentTarget as HTMLFormElement;
    this._elementData = mapFormData(form, this.#element);
  }

  protected renderFieldControl(field: Parsed.Field): TemplateResult {
    if (!field.isControllable) return html`${nothing}`;

    return html`
      ${when(
        field.isBoolean,
        () =>
          html`
            <wcp-input-checkbox
              name="fields.${field.name}"
              label="${field.name}"
              ?checked="${this._elementData?.fields[field.name]}"
            >
              ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
            </wcp-input-checkbox>
          `
      )}
      ${when(
        !field.isEnum && field.isString,
        () => html`
          <wcp-input-text
            name="fields.${field.name}"
            label="${field.attribute ?? field.name}"
            .value="${this._elementData?.fields[field.name] ?? null}"
          >
            ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
          </wcp-input-text>
        `
      )}
      ${when(
        !field.isEnum && field.isNumber,
        () => html`
          <wcp-input-number
            name="fields.${field.name}"
            label="${field.attribute ?? field.name}"
            .value="${this._elementData?.fields[field.name] ?? null}"
          >
            ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
          </wcp-input-number>
        `
      )}
      ${when(
        field.isEnum,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.attribute ?? field.name}</span>
              <select autocomplete="off" name="fields.${field.name}">
                ${map(
                  field.enumValues,
                  (option) => html`
                    <option .value="${option}" ?selected="${this._elementData?.fields[field.name] === option}">
                      ${option}
                    </option>
                  `
                )}
              </select>
              ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
            </label>
          </wcp-input>
        `
      )}
    `;
  }

  protected renderSlotControl(slot: Parsed.Slot): TemplateResult {
    return html`
      <wcp-input-text
        name="slots.${slot.name}"
        label="${slot.name.trim() ? slot.name : 'Default'}"
        .value="${this._elementData?.slots[slot.name]}"
      >
        ${when(slot.hasDescription, () => html`<span class="description">${slot.description}</span>`)}
      </wcp-input-text>
    `;
  }

  protected override render(): TemplateResult {
    return html`${keyed(
      this.#element?.tagName ?? '',
      html`
        <wcp-preview-frame-viewer-stage
          preview-tag-name="${this.#element?.tagName}"
          .data="${this._elementData}"
        ></wcp-preview-frame-viewer-stage>

        <!-- TODO: Move controls into separate element -->
        <wcp-preview-frame-viewer-controls>
          <form @input="${this.handleControlsInput}">
            ${when(
              this.#element?.hasFields,
              () => html`
                <fieldset>
                  <legend>Fields</legend>
                  ${map(this.#element?.fields.values(), (field) => this.renderFieldControl(field))}
                </fieldset>
              `
            )}
            ${when(
              this.#element?.hasSlots,
              () => html`
                <fieldset>
                  <legend>Slots</legend>
                  ${map(this.#element?.slots.values(), (slot) => this.renderSlotControl(slot))}
                </fieldset>
              `
            )}
          </form>
        </wcp-preview-frame-viewer-controls>
      `
    )}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-viewer': PreviewFrameViewer;
  }
}
