import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputKeyValuePairs_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A key-value pairs editor. Integrates into forms and allows editing string based form data.
 *
 * @element wcp-input-key-value-pairs
 *
 * @property {string} label - The label of the input element.
 * @cssprop --wcp-input-key-value-pairs-gutter - The gutter between the key-value pair inputs.
 * @slot hint - Receives optional descriptions below the input.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-key-value-pairs label="With optional label"></wcp-input-key-value-pairs>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form oninput="console.log(Array.from(new FormData(this).entries()))" onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-key-value-pairs name="embedded." label="Fully form enabled component"></wcp-input-key-value-pairs>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
export declare class InputKeyValuePairs extends InputKeyValuePairs_base implements FormAssociated<FormData> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    readonly form: HTMLFormElement;
    /**
     * The name acts as a prefix to the form data keys.
     */
    name: string;
    autocomplete: boolean;
    disabled: boolean;
    required: boolean;
    set value(value: FormData | undefined);
    get value(): FormData | undefined;
    set pairs(pairs: [string, string | undefined][]);
    get pairs(): [string, string | undefined][];
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    handleInput(): void;
    handleRemoveClick(event: MouseEvent): void;
    renderInput(): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-key-value-pairs': InputKeyValuePairs;
    }
}
export {};
