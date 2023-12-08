import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '@/utils/form.utils.js';
declare const InputCheckbox_base: import("../../..").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A checkbox input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-checkbox
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
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-checkbox label="With optional label"></wcp-input-checkbox>
 * ```
 *
 * @example
 * ## With initial value
 * ```html
 * <wcp-input-checkbox checked label="With optional initial value"></wcp-input-checkbox>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-checkbox label="Fully form enabled component"></wcp-input-checkbox>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
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
