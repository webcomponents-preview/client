import { LitElement, type TemplateResult } from 'lit';
/**
 * @example
 * ```html
 * <wcp-readme-frame></wcp-readme-frame>
 * ```
 *
 * @slot - The readme frame is usually filled with a readme element.
 *
 * @cssprop --wcp-readme-frame-spacing - Inner padding of the preview frame
 */
export declare class ReadmeFrame extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-readme-frame': ReadmeFrame;
    }
}
