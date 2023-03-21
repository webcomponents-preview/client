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

import { CustomElementData, mapFormData, prepareInitialElementData } from './preview-frame-viewer.utils';

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
      (member) => member.kind === 'field' && member.privacy !== 'private' && !member.static
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

  protected renderElement(): TemplateResult {
    if (this.#element === undefined) return html`${nothing}`;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const tag = unsafeStatic(this.#element.tagName!);
    return withStatic(html)`
      <${tag} ${spread(this.elementData?.members ?? {})}>${this.renderSlots()}</${tag}>
    `;
  }

  protected render(): TemplateResult {
    const fields = this.getFields();
    const slots = this.getSlots();
    return html`
      ${keyed(
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
                    ${map(
                      fields,
                      (member) => html`
                        <wcp-input>
                          <label>
                            ${when(
                              member.type?.text.startsWith('boolean'),
                              () =>
                                html`
                                  <input
                                    autocomplete="off"
                                    type="checkbox"
                                    name="members.${member.name}"
                                    ?checked="${this.elementData?.members[member.name]}"
                                  />
                                  <span class="label">${member.name}</span>
                                `,
                              () => html`
                                ${when(
                                  member.type?.text.startsWith('string'),
                                  () => html`
                                    <span class="label">${member.attribute ?? member.name}</span>
                                    <input
                                      autocomplete="off"
                                      type="text"
                                      name="members.${member.name}"
                                      .value="${this.elementData?.members[member.name] ?? null}"
                                    />
                                  `,
                                  () =>
                                    html`
                                      ${when(
                                        member.type?.text.includes(' | '),
                                        () => html`
                                          <select autocomplete="off" name="members.${member.name}">
                                            ${map(
                                              member.type?.text.split(' | '),
                                              (option) => html`
                                                <option
                                                  value="${option.slice(1, -1)}"
                                                  ?selected="${this.elementData?.members[member.name] ===
                                                  option.slice(1, -1)}"
                                                >
                                                  ${option.slice(1, -1)}
                                                </option>
                                              `
                                            )}
                                          </select>
                                        `
                                      )}
                                    `
                                )}
                              `
                            )}
                            ${when(
                              member.description,
                              () => html`<span class="description">${member.description}</span>`
                            )}
                          </label>
                        </wcp-input>
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
                        <wcp-input>
                          <label>
                            <input
                              autocomplete="off"
                              type="text"
                              name="slots.${slot.name}"
                              placeholder="${slot.name ?? 'Default'}"
                              value="${this.elementData?.slots[slot.name]}"
                            />
                            ${when(slot.description, () => html`<span class="description">${slot.description}</span>`)}
                          </label>
                        </wcp-input>
                      `
                    )}
                  </fieldset>
                `
              )}
            </form>
          </wcp-preview-frame-viewer-controls>
        `
      )}
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'wcp-preview-frame-viewer': PreviewFrameViewer;
  }
}
