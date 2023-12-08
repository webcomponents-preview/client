import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputRadio_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A radio input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-radio
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-radio-size - The size of the radio input.
 * @cssprop --wcp-input-radio-label-size - The font size of the label.
 * @cssprop --wcp-input-radio-hint-size - The font size of the hint.
 * @cssprop --wcp-input-radio-spacing - The leading distance of the label to the input.
 * @cssprop --wcp-input-radio-border-radius - The border radius of the radio input.
 * @cssprop --wcp-input-radio-border-size - The border size of the radio input.
 *
 * @cssprop --wcp-input-radio-dark-background - The background color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-border - The border color of the radio input in dark mode.
 * @cssprop --wcp-input-radio-dark-color - The fill color of the radio input when checked in dark mode.
 *
 * @cssprop --wcp-input-radio-light-background - The background color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-border - The border color of the radio input in light mode.
 * @cssprop --wcp-input-radio-light-color - The fill color of the radio input when checked in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-radio label="With optional label"></wcp-input-radio>
 * ```
 *
 * @example
 * ## With initial value
 * ```html
 * <wcp-input-radio checked label="With optional initial value"></wcp-input-radio>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
export declare class InputRadio extends InputRadio_base implements FormAssociated<string> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    name: string;
    autocomplete: boolean;
    disabled: boolean;
    set checked(checked: boolean);
    get checked(): boolean;
    required: boolean;
    value: string;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    handleInput(event: Event): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-radio': InputRadio;
    }
}
export {};
