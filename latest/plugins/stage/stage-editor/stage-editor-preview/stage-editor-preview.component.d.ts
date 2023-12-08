import { LitElement, type TemplateResult } from 'lit';
import type { ElementData } from '../stage-editor.utils.js';
/**
 * @element wcp-stage-editor-preview
 *
 * @example
 * ```html
 * <wcp-stage-editor-preview>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-stage-editor-preview>
 * ```
 */
export declare class StageEditorPreview extends LitElement {
    #private;
    static readonly styles: import("lit").CSSResult;
    previewTagName?: string;
    data?: ElementData;
    protected renderSlots(): TemplateResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-stage-editor-preview': StageEditorPreview;
    }
}
