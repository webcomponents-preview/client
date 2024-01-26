import 'prismjs';
import 'lit-code';
import { LitElement, type PropertyValues } from 'lit';
import type { FormAssociated } from '../../../utils/form.utils.js';
declare const InputCode_base: import("../../../index.js").Constructor<import("../../../mixins/editable.mixin.js").EditableInterface & import("../../../mixins/color-schemable.mixin").ColorSchemableInterface> & import("../../../mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
/**
 * A text input element using the wcp style. Fully form aware.
 * Can display multiline text (textarea) if configured to do so.
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
