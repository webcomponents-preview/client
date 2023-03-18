import { spread } from '@open-wc/lit-helpers';
import type { CustomElementField, CustomElementDeclaration, Slot } from 'custom-elements-manifest';

import { html, LitElement, type TemplateResult, unsafeCSS } from 'lit';
import { unsafeStatic, withStatic } from 'lit/static-html.js';
import { customElement, property, state } from 'lit/decorators.js';

import { map } from 'lit/directives/map.js';
import { unsafeHTML } from 'lit/directives/unsafe-html.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils';
import { CustomElementData, EMPTY_ELEMENT_DATA, mapFormData } from './viewer.utils';

import styles from './viewer.component.scss';

/**
 * @example
 * ```html
 * <wcp-viewer></wcp-viewer>
 * ```
 */
@customElement('wcp-viewer')
export class Viewer extends ColorSchemable(LitElement) {
  static readonly styles = unsafeCSS(styles);

  @state()
  private elementData: CustomElementData = EMPTY_ELEMENT_DATA;

  @property({ type: Object })
  element!: CustomElementDeclaration;

  protected getElementReference(): HTMLElement {
    return this.renderRoot.querySelector(this.element.tagName!) as HTMLElement;
  }

  protected getFields(): CustomElementField[] {
    return (this.element.members ?? []).filter(
      (member) => member.kind === 'field' && member.privacy !== 'private' && !member.static
    ) as CustomElementField[];
  }

  protected getSlots(): Slot[] {
    return this.element.slots ?? [];
  }

  protected getSlotsWithData(): { slot: Slot; data: string }[] {
    return (this.element.slots ?? [])
      .filter((slot) => slot.name in this.elementData.slots)
      .map((slot) => ({ slot, data: this.elementData.slots[slot.name] }));
  }

  protected handleControlsInput(event: InputEvent) {
    const form = event.currentTarget as HTMLFormElement;
    this.elementData = mapFormData(form, this.element);
  }

  protected renderSlots(): TemplateResult {
    return withStatic(html)`
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

  protected renderElement(): TemplateResult {
    const tag = unsafeStatic(this.element.tagName!);
    return withStatic(html)`
      <${tag} ${spread(this.elementData.members)}>${this.renderSlots()}</${tag}>
    `;
  }

  protected render(): TemplateResult {
    const fields = this.getFields();
    const slots = this.getSlots();
    return html`
      <!-- TODO: Prepare stage element -->
      <wcp-viewer-stage>${this.renderElement()}</wcp-viewer-stage>

      <!-- <pre>${JSON.stringify(this.element, null, 2)}</pre> -->
      <!-- TODO: Move controls into separate element -->
      <wcp-viewer-controls>
        <form @input="${this.handleControlsInput}">
          ${when(
            fields.length > 0,
            () => html`
              <fieldset>
                <legend>Fields</legend>
                ${map(
                  fields,
                  (member) => html`
                    <label>
                      ${when(
                        member.type?.text === 'boolean',
                        () =>
                          html`
                            <input
                              type="checkbox"
                              name="members.${member.name}"
                              ?checked="${this.elementData.members[member.name]}"
                            />
                            <span>${member.name}</span>
                          `
                      )}
                      ${when(
                        member.type?.text.startsWith('string'),
                        () => html`
                          <input
                            type="text"
                            name="members.${member.name}"
                            placeholder="${member.name}"
                            value="${this.elementData.members[member.name]}"
                          />
                        `
                      )}
                    </label>
                  `
                )}
              </fieldset>
            `
          )}
          ${when(
            slots.length > 0,
            () => html`
              <fieldset>
                <legend>Slots</legend>
                ${map(
                  slots,
                  (slot) => html`
                    <label>
                      <span>${slot.name.trim() ? slot.name : 'Default'}</span>
                      <input type="text" name="slots.${slot.name}" value="${this.elementData.slots[slot.name]}" />
                    </label>
                  `
                )}
              </fieldset>
            `
          )}
        </form>
      </wcp-viewer-controls>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-viewer': Viewer;
  }
}
