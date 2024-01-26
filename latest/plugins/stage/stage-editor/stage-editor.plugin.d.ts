import { LitElement, type TemplateResult } from 'lit';
import type { StagePlugin } from '../../../utils/plugin.utils.js';
declare const StageEditor_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Allows editing a custom element.
 *
 */
export declare class StageEditor extends StageEditor_base implements StagePlugin {
    #private;
    static readonly styles: import("lit").CSSResult;
    readonly name = "editor";
    readonly label = "Editor";
    private _element?;
    private _elementData?;
    set previewTagName(previewTagName: string);
    set data(data: string | undefined);
    readonly available = true;
    protected getElementReference(): Element | undefined;
    protected handleControlsInput({ detail }: CustomEvent<FormData>): Promise<void>;
    protected firstUpdated(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-stage-editor': StageEditor;
    }
}
export {};
