import { spread } from '@open-wc/lit-helpers';
import type { CustomElementDeclaration, CustomElementField, Slot } from 'custom-elements-manifest';

import { LitElement, type TemplateResult, html, unsafeCSS, nothing } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';

import { keyed } from 'lit/directives/keyed.js';
import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
import { ColorSchemable } from '@/utils/color-scheme.utils';

import {
  CustomElementData,
  Field,
  getEnumValues,
  isControlable,
  isCustomElementField,
  mapFormData,
  prepareInitialElementData,
  unwrapString,
} from './preview-frame-viewer.utils';

import styles from './preview-frame-viewer.plugin.scss';

@customElement('wcp-preview-frame-viewer')
export class PreviewFrameViewer extends ColorSchemable(LitElement) implements PreviewFramePlugin {
  static readonly styles = unsafeCSS(styles);

  #element?: CustomElementDeclaration;

  @property({ type: Object })
  set element(element: CustomElementDeclaration | undefined) {
    this.#element = element;
    this.elementData = element !== undefined ? prepareInitialElementData(element) : undefined;
  }

  @property({ type: String, reflect: true })
  readonly name = 'viewer';

  @property({ type: String, reflect: true })
  readonly label = 'Viewer';

  @property({ type: Boolean, reflect: true })
  readonly available = true;

  @state()
  private elementData?: CustomElementData;

  protected getElementReference(): Element | undefined {
    if (this.#element === undefined) return undefined;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return this.renderRoot.querySelector(this.#element.tagName!) ?? undefined;
  }

  protected getFields(): CustomElementField[] {
    return (this.#element?.members ?? []).filter(
      (member) => isCustomElementField(member) && isControlable(member)
    ) as CustomElementField[];
  }

  protected getSlots(): Slot[] {
    return this.#element?.slots ?? [];
  }

  protected getSlotsWithData(): { slot: Slot; data: string }[] {
    return (
      this.getSlots()
        .filter((slot) => this.elementData?.slots && slot.name in this.elementData.slots)
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .map((slot) => ({ slot, data: this.elementData!.slots[slot.name] }))
    );
  }

  protected handleControlsInput(event: InputEvent) {
    if (this.#element === undefined) return;
    const form = event.currentTarget as HTMLFormElement;
    this.elementData = mapFormData(form, this.#element);
  }

  protected renderSlots(): TemplateResult {
    return html`
      ${map(
        this.getSlotsWithData(),
        ({ slot, data }) => withStatic(html)`
          ${when(
            slot.name === '',
            () => unsafeHTML(data),
            () => withStatic(html)`<div slot="${slot.name}">${unsafeHTML(data)}</div>`
          )}
        `
      )}
    `;
  }

  protected renderFieldControl(member: CustomElementField): TemplateResult {
    const field = new Field(member);
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
                  name="members.${field.data.name}"
                  ?checked="${this.elementData?.members[field.data.name]}"
                />
                <span class="label">${field.data.name}</span>
                ${when(field.data.description, () => html`<span class="description">${field.data.description}</span>`)}
              </label>
            </wcp-input>
          `
      )}
      ${when(
        !field.isEnum && field.isString,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.data.attribute ?? field.data.name}</span>
              <input
                autocomplete="off"
                type="text"
                name="members.${field.data.name}"
                .value="${this.elementData?.members[field.data.name] ?? null}"
              />
              ${when(field.data.description, () => html`<span class="description">${field.data.description}</span>`)}
            </label>
          </wcp-input>
        `
      )}
      ${when(
        !field.isEnum && field.isNumber,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.data.attribute ?? field.data.name}</span>
              <input
                autocomplete="off"
                type="number"
                name="members.${field.data.name}"
                .value="${this.elementData?.members[field.data.name] ?? null}"
              />
              ${when(field.data.description, () => html`<span class="description">${field.data.description}</span>`)}
            </label>
          </wcp-input>
        `
      )}
      ${when(
        field.isEnum,
        () => html`
          <wcp-input>
            <label>
              <span class="label">${field.data.attribute ?? field.data.name}</span>
              <select autocomplete="off" name="members.${field.data.name}">
                ${map(
                  getEnumValues(field.data).map(unwrapString),
                  (option) => html`
                    <option value="${option}" ?selected="${this.elementData?.members[field.data.name] === option}">
                      ${option}
                    </option>
                  `
                )}
              </select>
              ${when(field.data.description, () => html`<span class="description">${field.data.description}</span>`)}
            </label>
          </wcp-input>
        `
      )}
    `;
  }

  protected renderSlotControl(slot: Slot): TemplateResult {
    return html`
      <wcp-input>
        <label>
          <span class="label">${slot.name.trim() ? slot.name : 'Default'}</span>
          <input
            autocomplete="off"
            type="text"
            name="slots.${slot.name}"
            value="${this.elementData?.slots[slot.name]}"
          />
          ${when(slot.description, () => html`<span class="description">${slot.description}</span>`)}
        </label>
      </wcp-input>
    `;
  }

  protected renderElement(): TemplateResult {
    if (this.#element === undefined) return html`${nothing}`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tag = unsafeStatic(this.#element.tagName!);
    return withStatic(html)`<${tag} ${spread(this.elementData?.members ?? {})}>${this.renderSlots()}</${tag}>`;
  }

  protected render(): TemplateResult {
    const fields = this.getFields();
    const slots = this.getSlots();

    return html`${keyed(
      this.#element?.tagName ?? '',
      html`
        <wcp-preview-frame-viewer-stage>${this.renderElement()}</wcp-preview-frame-viewer-stage>

        <!-- TODO: Move controls into separate element -->
        <wcp-preview-frame-viewer-controls>
          <form @input="${this.handleControlsInput}">
            ${when(
              fields.length > 0,
              () => html`
                <fieldset>
                  <legend>Fields</legend>
                  ${map(fields, (member) => this.renderFieldControl(member))}
                </fieldset>
              `
            )}
            ${when(
              slots.length > 0,
              () => html`
                <fieldset>
                  <legend>Slots</legend>
                  ${map(slots, (slot) => this.renderSlotControl(slot))}
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
