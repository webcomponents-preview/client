import { LitElement, type TemplateResult } from 'lit';
/**
 * @example
 * ```html
 * <wcp-preview-frame-viewer-stage>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-preview-frame-viewer-stage>
 * ```
 */
export declare class PreviewFrameViewerStage extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame-viewer-stage': PreviewFrameViewerStage;
    }
}
