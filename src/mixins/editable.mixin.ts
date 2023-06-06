import { html, nothing, type LitElement, type TemplateResult, unsafeCSS, type CSSResultGroup } from 'lit';
import { property } from 'lit/decorators.js';
import { when } from 'lit/directives/when.js';

import { ColorSchemable } from '@/utils/color-scheme.utils.js';
import { Constructor } from '@/utils/mixin.types.js';

import styles from './editable.mixin.scss';

export declare class EditableInterface {
  readonly internals: ElementInternals;
  label?: string;
  renderInput(id: string): TemplateResult;
  renderSlot(name: string): TemplateResult;
}

export interface EditablePrototype {
  formStyles: CSSResultGroup;
  formAssociated: true;
}

export type EditableOptions = {
  hasHintSlot?: boolean;
  hasBeforeSlot?: boolean;
  hasAfterSlot?: boolean;
  hasBorder?: boolean;
};

export const Editable =
  ({
    hasHintSlot = true,
    hasBeforeSlot = true,
    hasAfterSlot = true,
    hasBorder = true,
  }: Partial<EditableOptions> = {}) =>
  <T extends Constructor<LitElement>>(superClass: T) => {
    class EditableElement extends ColorSchemable(superClass) {
      static readonly formAssociated = true;
      static readonly formStyles = unsafeCSS(styles);

      readonly internals = this.attachInternals();

      @property({ type: String, reflect: true })
      label?: string;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      renderInput(_: string): TemplateResult {
        return html`${nothing}`;
      }

      renderSlot(name: string): TemplateResult {
        return html`<slot name="${name}"></slot>`;
      }

      protected override render(): TemplateResult {
        return html`
          ${this.renderInput('input')} ${when(this.label, () => html`<label for="input">${this.label}</label>`)}
          ${when(hasHintSlot, () => this.renderSlot('hint'))} ${when(hasBeforeSlot, () => this.renderSlot('before'))}
          ${when(hasAfterSlot, () => this.renderSlot('after'))}
          ${when(hasBorder, () => html`<span id="border"></span>`)}
        `;
      }
    }
    return EditableElement as Constructor<EditableInterface> & EditablePrototype & T;
  };
