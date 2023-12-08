import { LitElement, type TemplateResult } from 'lit';
import type * as Parsed from '@/utils/parser.types.js';
import { type ElementData } from '../stage-editor.utils.js';
declare const StageEditorControls_base: import("../../../../index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @element wcp-stage-editor-controls
 *
 * @cssprop --wcp-stage-editor-controls-headline-size - The font size of the headline.
 * @cssprop --wcp-stage-editor-controls-headline-weight - The font weight of the headline.
 * @cssprop --wcp-stage-editor-controls-headline-spacing - The inner spacing of the headline.
 *
 * @cssprop --wcp-stage-editor-controls-dark-border-color - The border color of the element in dark mode.
 * @cssprop --wcp-stage-editor-controls-light-border-color - The border color of the element in light mode.
 *
 * @emits {CustomEvent<FormData>} wcp-stage-editor-controls:input - Fires when the user changes a control value.
 */
export declare class StageEditorControls extends StageEditorControls_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    private _element?;
    set previewTagName(previewTagName: string);
    readonly data?: ElementData;
    protected handleFormInput(event: InputEvent): void;
    protected renderHint(content?: string): TemplateResult;
    protected renderFieldControl(field: Parsed.Field): TemplateResult;
    protected renderSlotControl(slot: Parsed.Slot): TemplateResult;
    protected renderAttributeControls(): TemplateResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-stage-editor-controls:input': CustomEvent<FormData>;
    }
    interface HTMLElementTagNameMap {
        'wcp-stage-editor-controls': StageEditorControls;
    }
}
export {};
