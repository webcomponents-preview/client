import { LitElement, PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputText_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
 *
 * @element wcp-input-text
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-text-hint-size - The font size of the hint.
 * @cssprop --wcp-input-text-label-size - The font size of the label.
 * @cssprop --wcp-input-text-spacing - The inner spacing of the input element.
 *
 * @cssprop --wcp-input-text-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-text-dark-color - The font color of the input element in dark mode.
 *
 * @cssprop --wcp-input-text-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-text-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-text-light-color - The font color of the input element in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-text label="With optional label"></wcp-input-text>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-text label="With optional initial value" value="Foo"></wcp-input-text>
 * ```
 *
 * @example
 * ## Multiline
 * ```html
 * <wcp-input-text multiline label="With multiline value"></wcp-input-text>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-text label="Fully form enabled component"></wcp-input-text>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
export declare class InputText extends InputText_base implements FormAssociated<string> {
    #private;
    static readonly styles: import("lit").CSSResultGroup[];
    private readonly input?;
    multiline: boolean;
    autocomplete: boolean;
    disabled: boolean;
    readonly: boolean;
    required: boolean;
    name: string;
    /**
     * Can be set to to `text`, `email`, `password`, `search`, `tel`, or `url`. \
     * Beware that this will be ignored if combined with the `multiline` attribute.
     */
    type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
    value?: string;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    handleInput(event: Event): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-text': InputText;
    }
}
export {};
