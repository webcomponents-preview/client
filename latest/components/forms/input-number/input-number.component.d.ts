import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputNumber_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A numeric input element using the wcp style. Fully form aware.
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-number-hint-size - The font size of the hint.
 * @cssprop --wcp-input-number-label-size - The font size of the label.
 * @cssprop --wcp-input-number-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-number-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-number-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-number-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-number-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-number-light-color - The font color of the input element in light mode.
 *
 */
export declare class InputNumber extends InputNumber_base implements FormAssociated<number> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    private readonly input?;
    autocomplete: boolean;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    name: string;
    value?: number;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    handleInput(event: Event): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-number': InputNumber;
    }
}
export {};