import { html, LitElement, type TemplateResult, unsafeCSS, nothing } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, property } from 'lit/decorators.js';

import { map } from 'lit/directives/map.js';
import { when } from 'lit/directives/when.js';

import type * as Parsed from '@/utils/parser.types.js';
import { ColorSchemable } from '@/mixins/color-schemable.mixin.js';
import { renderMarkdown } from '@/utils/markdown.utils.js';

import type { ElementData } from '../preview-frame-viewer.utils.js';

import styles from './preview-frame-viewer-controls.component.scss';

/**
 * @element wcp-preview-frame-viewer-controls
 *
 * @cssprop --wcp-preview-frame-viewer-controls-headline-size - The font size of the headline.
 * @cssprop --wcp-preview-frame-viewer-controls-headline-weight - The font weight of the headline.
 * @cssprop --wcp-preview-frame-viewer-controls-headline-spacing - The inner spacing of the headline.
 *
 * @cssprop --wcp-preview-frame-viewer-controls-dark-border-color - The border color of the element in dark mode.
 * @cssprop --wcp-preview-frame-viewer-controls-light-border-color - The border color of the element in light mode.
 *
 * @emits {CustomEvent<FormData>} wcp-preview-frame-viewer-controls:input - Fires when the user changes a control value.
 */
@customElement('wcp-preview-frame-viewer-controls')
export class PreviewFrameViewerControls extends ColorSchemable(LitElement) {
  static override readonly styles = unsafeCSS(styles);

  @property({ type: Object })
  readonly element?: Parsed.Element;

  @property({ type: Object })
  readonly data?: ElementData;

  // content is derived from documentation which can be written in markdown
  protected renderHint(content?: string): TemplateResult {
    return when(
      content,
      () => withStatic(html)`<div slot="hint">${unsafeStatic(renderMarkdown(content as string, false))}</div>`
    );
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
              ?checked="${Boolean(this.data?.fields[field.name])}"
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
            .value="${this.data?.fields[field.name] as string | undefined}"
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
            .value="${this.data?.fields[field.name] as number | undefined}"
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
            .value="${this.data?.fields[field.name] as string | undefined}"
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

  protected handleFormInput(event: InputEvent): void {
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);

    this.dispatchEvent(
      new CustomEvent('wcp-preview-frame-viewer-controls:input', {
        bubbles: true,
        composed: true,
        detail: formData,
      })
    );
  }

  protected override render(): TemplateResult {
    return html`
      <form @input="${this.handleFormInput}">
        ${when(
          this.element?.hasFields,
          () => html`
            <fieldset>
              <legend>Fields</legend>
              ${map(this.element?.fields.values(), (field) => this.renderFieldControl(field))}
            </fieldset>
          `
        )}
        ${when(
          this.element?.hasSlots,
          () => html`
            <fieldset>
              <legend>Slots</legend>
              ${map(this.element?.slots.values(), (slot) => this.renderSlotControl(slot))}
            </fieldset>
          `
        )}
      </form>
    `;
  }
}

declare global {
  interface HTMLElementEventMap {
    'wcp-preview-frame-viewer-controls:input': CustomEvent<FormData>;
  }

  interface HTMLElementTagNameMap {
    'wcp-preview-frame-viewer-controls': PreviewFrameViewerControls;
  }
}
