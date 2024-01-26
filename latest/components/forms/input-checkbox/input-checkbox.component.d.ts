import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputCheckbox_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A checkbox input element using the wcp style. Fully form aware.
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-checkbox-size - The size of the checkbox input.
 * @cssprop --wcp-input-checkbox-hint-size - The font size of the hint.
 * @cssprop --wcp-input-checkbox-label-size - The font size of the label.
 * @cssprop --wcp-input-checkbox-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-checkbox-border-radius - The border radius of the checkbox input.
 * @cssprop --wcp-input-checkbox-border-size - The border size of the checkbox input.
 *
 * @cssprop --wcp-input-checkbox-dark-background - The background color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-border - The border color of the checkbox input in dark mode.
 * @cssprop --wcp-input-checkbox-dark-color - The fill color of the checkbox input when checked in dark mode.
 *
 * @cssprop --wcp-input-checkbox-light-background - The background color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-border - The border color of the checkbox input in light mode.
 * @cssprop --wcp-input-checkbox-light-color - The fill color of the checkbox input when checked in light mode.
 *
 */
export declare class InputCheckbox extends InputCheckbox_base implements FormAssociated<string> {
    static readonly styles: import("lit").CSSResultGroup[];
    private initialChecked;
    name: string;
    autocomplete: boolean;
    disabled: boolean;
    checked: boolean;
    required: boolean;
    value: string;
    protected firstUpdated(props: PropertyValues<this>): void;
    attributeChangedCallback(name: string, old: string | null, value: string | null): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    handleInput(event: Event): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-checkbox': InputCheckbox;
    }
}
export {};
