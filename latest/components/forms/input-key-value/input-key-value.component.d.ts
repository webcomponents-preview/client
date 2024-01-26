import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputKeyValue_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A key-value input element using the wcp style. Fully form aware.
 *
 * @property {string} label - The label of the input element.
 * @cssprop --wcp-input-key-value-gutter - The gutter between the key-value pair inputs.
 * @slot hint - Receives optional descriptions below the input.
 *
 */
export declare class InputKeyValue extends InputKeyValue_base implements FormAssociated<string> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    autocomplete: boolean;
    disabled: boolean;
    required: boolean;
    name?: string;
    set value(value: string | undefined);
    get value(): string | undefined;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    handleKeyInput(event: InputEvent): void;
    handleValueInput(event: InputEvent): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-key-value': InputKeyValue;
    }
}
export {};
