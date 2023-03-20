import { LitElement, type TemplateResult } from 'lit';
/**
 * @example
 * ```html
 * <wcp-viewer-stage>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-viewer-stage>
 * ```
 */
export declare class ViewerStage extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-viewer-stage': ViewerStage;
    }
}
