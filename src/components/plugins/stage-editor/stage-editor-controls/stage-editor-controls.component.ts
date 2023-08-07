import { html, LitElement, type TemplateResult, unsafeCSS, nothing } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, eventOptions, property, state } from 'lit/decorators.js';

import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import type * as Parsed from '@/utils/parser.types.js';
import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { getManifest } from '@/utils/manifest.utils.js';
import { renderMarkdown } from '@/utils/markdown.utils.js';
import { litKey } from '@/utils/parser.utils.js';

import { alignFormDataWebkit, type ElementData } from '../stage-editor.utils.js';

import styles from './stage-editor-controls.component.scss';

/**
 * @element wcp-stage-editor-controls
 *
 * @cssprop --wcp-stage-editor-controls-headline-size - The font size of the headline.
 * @cssprop --wcp-stage-editor-controls-headline-weight - The font weight of the headline.
 * @cssprop --wcp-stage-editor-controls-headline-spacing - The inner spacing of the headline.
 *
 * @cssprop --wcp-stage-editor-controls-dark-border-color - The border color of the element in dark mode.
 * @cssprop --wcp-stage-editor-controls-light-border-color - The border color of the element in light mode.
 *
 * @emits {CustomEvent<FormData>} wcp-stage-editor-controls:input - Fires when the user changes a control value.
 */
@customElement('wcp-stage-editor-controls')
export class StageEditorControls extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  readonly #manifest = getManifest();

  @state()
  private _element?: Parsed.Element;

  @property({ type: String, reflect: true, attribute: 'preview-tag-name' })
  set previewTagName(previewTagName: string) {
    this._element = this.#manifest.elements.get(previewTagName);
  }

  @property({ type: Object })
  readonly data?: ElementData;

  @eventOptions({ passive: true })
  protected handleFormInput(event: InputEvent): void {
    if (this._element === undefined) return;

    // prepare form data
    const form = event.currentTarget as HTMLFormElement;
    const formData = alignFormDataWebkit(new FormData(form), form.elements, this._element);

    // broadcast form data
    this.dispatchEvent(
      new CustomEvent('wcp-stage-editor-controls:input', {
        bubbles: true,
        composed: true,
        detail: formData,
      })
    );
  }

  // content is derived from documentation which can be written in markdown
  protected renderHint(content?: string): TemplateResult {
    return when(
      content,
      () => withStatic(html)`<div slot="hint">${unsafeStatic(renderMarkdown(content as string, false))}</div>`
    );
  }

  protected renderFieldControl(field: Parsed.Field): TemplateResult {
    if (!field.isControllable) return html`${nothing}`;
    const key = litKey(field);

    return html`
      ${when(
        field.isBoolean,
        () =>
          html`
            <wcp-input-checkbox
              name="fields.${field.name}"
              label="${field.name}"
              ?checked="${Boolean(this.data?.fields[key])}"
            >
              ${this.renderHint(field.description)}
            </wcp-input-checkbox>
          `
      )}
      ${when(
        !field.isEnum && field.isString,
        () => html`
          <wcp-input-text
            name="fields.${field.name}"
            label="${field.attribute ?? field.name}"
            .value="${this.data?.fields[key] as string | undefined}"
          >
            ${this.renderHint(field.description)}
          </wcp-input-text>
        `
      )}
      ${when(
        !field.isEnum && field.isNumber,
        () => html`
          <wcp-input-number
            name="fields.${field.name}"
            label="${field.attribute ?? field.name}"
            .value="${this.data?.fields[key] as number | undefined}"
          >
            ${this.renderHint(field.description)}
          </wcp-input-number>
        `
      )}
      ${when(
        field.isEnum,
        () => html`
          <wcp-input-select
            name="fields.${field.name}"
            label="${field.attribute ?? field.name}"
            .value="${this.data?.fields[key] as string | undefined}"
          >
            ${map(
              field.enumValues,
              (option) => html`
                <wcp-input-select-option label="${option}" .value="${option}"></wcp-input-select-option>
              `
            )}
            ${this.renderHint(field.description)}
          </wcp-input-select>
        `
      )}
    `;
  }

  protected renderSlotControl(slot: Parsed.Slot): TemplateResult {
    return html`
      <wcp-input-code
        autosize
        name="slots.${slot.name}"
        label="${slot.name.trim() ? slot.name : 'Default'}"
        .value="${this.data?.slots[slot.name]}"
      >
        ${when(slot.hasDescription, () => html`${this.renderHint(slot.description)}`)}
      </wcp-input-code>
    `;
  }

  protected override render(): TemplateResult {
    return html`
      <form @input="${this.handleFormInput}">
        ${when(
          this._element?.hasFields,
          () => html`
            <fieldset>
              <legend>Fields</legend>
              ${map(this._element?.fields.values(), (field) => this.renderFieldControl(field))}
            </fieldset>
          `
        )}
        ${when(
          this._element?.hasSlots,
          () => html`
            <fieldset>
              <legend>Slots</legend>
              ${map(this._element?.slots.values(), (slot) => this.renderSlotControl(slot))}
            </fieldset>
          `
        )}
      </form>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-stage-editor-controls:input': CustomEvent<FormData>;
  }

  interface HTMLElementTagNameMap {
    'wcp-stage-editor-controls': StageEditorControls;
  }
}