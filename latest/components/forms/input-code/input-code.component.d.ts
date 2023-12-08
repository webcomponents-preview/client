import 'prismjs';
import 'lit-code';
import { LitElement, type PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputCode_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
 *
 * @element wcp-input-code
 *
 * @property {string} label - The label of the input element.
 *
 * @slot hint - Receives optional descriptions below the input.
 *
 * @cssprop --wcp-input-code-hint-size - The font size of the hint.
 * @cssprop --wcp-input-code-label-size - The font size of the label.
 * @cssprop --wcp-input-code-spacing - The inner spacing of the input element.
 * @cssprop --wcp-input-code-border-radius - The border radius of the input element.
 * @cssprop --wcp-input-code-border-size - The border size of the input element.
 *
 * @cssprop --wcp-input-code-dark-background - The background color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-border - The border color of the element in dark mode.
 * @cssprop --wcp-input-code-dark-color - The font color of the input element in dark mode.
 * @cssprop --wcp-input-code-dark-background-lines - The background color of the line numbers in dark mode.
 *
 * @cssprop --wcp-input-code-light-background - The background color of the element in light mode.
 * @cssprop --wcp-input-code-light-border - The border color of the element in light mode.
 * @cssprop --wcp-input-code-light-color - The font color of the input element in light mode.
 * @cssprop --wcp-input-code-light-background-lines - The background color of the line numbers in light mode.
 *
 * @example
 * ## With optional label
 * ```html
 * <wcp-input-code label="With optional label"></wcp-input-code>
 * ```
 *
 * @example
 * ## With optional initial value
 * ```html
 * <wcp-input-code
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## With autosize
 * ```html
 * <wcp-input-code
 *   autosize
 *   label="With optional initial value"
 *   value="<strong>Test</strong>"
 *   language="html"
 * ></wcp-input-code>
 * ```
 *
 * @example
 * ## Used within a form
 * ```html
 * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
 *   <wcp-input-code
 *     label="Fully form enabled component"
 *     value="<strong>Test</strong>"
 *     language="html"
 *   ></wcp-input-code>
 *   <button type="submit">Submit</button>
 *   <button type="reset">Reset</button>
 * </form>
 * ```
 */
export declare class InputCode extends InputCode_base implements FormAssociated<string> {
    #private;
    static readonly shadowRootOptions: {
        delegatesFocus: boolean;
        mode: ShadowRootMode;
        slotAssignment?: SlotAssignmentMode | undefined;
    };
    static readonly styles: import("lit").CSSResultGroup[];
    private readonly editor?;
    autosize: boolean;
    disabled: boolean;
    required: boolean;
    name: string;
    language: "html";
    set value(value: string | undefined);
    get value(): string | undefined;
    protected firstUpdated(props: PropertyValues<this>): void;
    formResetCallback(): void;
    checkValidity(): boolean;
    handleInput(event: InputEvent): void;
    renderInput(id: string): import("lit-html").TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-input-code': InputCode;
    }
}
export {};
