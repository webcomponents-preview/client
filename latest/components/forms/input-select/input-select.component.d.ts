import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputSelect_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A numeric input element using the wcp style. Fully form aware.
 *
 * @element wcp-input-select
 *
 * @property {string} label - The label of the input element.
 *
 * @slot {<wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>} - Projects options into the select elements dropdown menu.
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-select-arrow-size - The size of the arrow icon.
 * @cssprop --wcp-input-select-hint-size - The font size of the hint.
 * @cssprop --wcp-input-select-label-size - The font size of the label.
 * @cssprop --wcp-input-select-spacing - The inner spacing of the input element.

 * @cssprop --wcp-input-select-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-select-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-select-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-select-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-select-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-select-light-color - The font color of the input element in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-select label="With optional label">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 *
 * @example
 * ## With disabled options
 * ```html
 * <wcp-input-select label="With disabled options">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar" disabled></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-select label="With optional initial value" value="bar">
 *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 * </wcp-input-select>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-select label="Fully form enabled component">
 *     <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
 *     <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
 *     <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
 *   </wcp-input-select>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
export declare class InputSelect extends InputSelect_base implements FormAssociated<string> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    private readonly input?;
    autocomplete: boolean;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    name: string;
    value?: string;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    handleSlotChange(event: Event): void;
    handleInput(event: Event): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-select': InputSelect;
    }
}
export {};
