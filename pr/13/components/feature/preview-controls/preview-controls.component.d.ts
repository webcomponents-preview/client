import { LitElement, type TemplateResult } from 'lit';
declare const PreviewControls_base: (new (...args: any[]) => import("@/utils/color-scheme.utils").ColorSchemableInterface) & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-preview-controls></wcp-preview-controls>
 * ```
 * @example
 * ### Usage with controls
 *
 * ```html
 * <wcp-preview-controls>
 *   <wcp-preview-controls-viewport></wcp-preview-controls-viewport>
 * </wcp-preview-controls>
 * ```
 *
 * @slot - Default slot for navigation items
 *
 * @cssprop --wcp-preview-controls-dark-background - Background color of the preview controls in dark mode
 * @cssprop --wcp-preview-controls-dark-color - Text color of the preview controls in dark mode
 *
 * @cssprop --wcp-preview-controls-light-background - Background color of the preview controls in light mode
 * @cssprop --wcp-preview-controls-light-color - Text color of the preview controls in light mode
 *
 * @cssprop --wcp-preview-controls-height - Overall height of the preview controls nav bar
 * @cssprop --wcp-preview-controls-spacing - Inner spacing, used as padding of the controls
 */
export declare class PreviewControls extends PreviewControls_base {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-controls': PreviewControls;
    }
}
export {};
