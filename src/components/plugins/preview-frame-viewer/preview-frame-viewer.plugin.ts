import { spread } from '@open-wc/lit-helpers';

import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';

import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import type * as Parsed from '@/utils/parser.types';

import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
import { type ElementData, mapFormData, prepareInitialData } from './preview-frame-viewer.utils';

import styles from './preview-frame-viewer.plugin.scss';

@customElement('wcp-preview-frame-viewer')
export class PreviewFrameViewer extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static readonly styles = unsafeCSS(styles);

  #element?: Parsed.Element;

  @property({ type: Object })
  set element(element: Parsed.Element | undefined) {
    this.#element = element;
    this.elementData = element ? prepareInitialData(element) : undefined;
  }

  @property({ type: String, reflect: true })
  readonly name = 'viewer';

  @property({ type: String, reflect: true })
  readonly label = 'Viewer';

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  @state()
  private elementData?: ElementData;

  protected getElementReference(): Element | undefined {
    if (this.#element === undefined) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this.#element.tagName!) ?? undefined;
  }

  protected handleControlsInput(event: InputEvent) {
    if (this.#element === undefined) return;
    const form = event.currentTarget as HTMLFormElement;
    this.elementData = mapFormData(form, this.#element);
  }

  protected renderSlots(): TemplateResult {
    return html`
      ${map(
        Object.entries(this.elementData?.slots ?? {}),
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

  protected renderFieldControl(field: Parsed.Field): TemplateResult {
    if (!field.isControlable) return html`${nothing}`;

    return html`
      ${when(
        field.isBoolean,
        () =>
          html`
            <wcp-input>
              <label>
                <input
                  autocomplete="off"
                  type="checkbox"
                  name="fields.${field.name}"
                  ?checked="${this.elementData?.fields[field.name]}"
                />
                <span class="label">${field.name}</span>
                ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
              </label>
            </wcp-input>
          `
      )}
      ${when(
        !field.isEnum && field.isString,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.attribute ?? field.name}</span>
              <input
                autocomplete="off"
                type="text"
                name="fields.${field.name}"
                .value="${this.elementData?.fields[field.name] ?? null}"
              />
              ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
            </label>
          </wcp-input>
        `
      )}
      ${when(
        !field.isEnum && field.isNumber,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.attribute ?? field.name}</span>
              <input
                autocomplete="off"
                type="number"
                name="fields.${field.name}"
                .value="${this.elementData?.fields[field.name] ?? null}"
              />
              ${when(field.description, () => html`<span class="description">${field.description}</span>`)}
            </label>
          </wcp-input>
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
                    <option .value="${option}" ?selected="${this.elementData?.fields[field.name] === option}">
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
      <wcp-input>
        <label>
          <span class="label">${slot.name.trim() ? slot.name : 'Default'}</span>
          <input
            autocomplete="off"
            type="text"
            name="slots.${slot.name}"
            .value="${this.elementData?.slots[slot.name]}"
          />
          ${when(slot.hasDescription, () => html`<span class="description">${slot.description}</span>`)}
        </label>
      </wcp-input>
    `;
  }

  protected renderElement(): TemplateResult {
    if (this.#element === undefined) return html`${nothing}`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tag = unsafeStatic(this.#element.tagName!);
    return withStatic(html)`<${tag} ${spread(this.elementData?.fields ?? {})}>${this.renderSlots()}</${tag}>`;
  }

  protected render(): TemplateResult {
    return html`${keyed(
      this.#element?.tagName ?? '',
      html`
        <wcp-preview-frame-viewer-stage>${this.renderElement()}</wcp-preview-frame-viewer-stage>

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
