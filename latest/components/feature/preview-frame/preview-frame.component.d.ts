import { LitElement, type TemplateResult } from 'lit';
import type { Config } from '@/utils/config.utils';
declare const PreviewFrame_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-preview-frame></wcp-preview-frame>
 * ```
 *
 * @cssprop --wcp-preview-frame-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-preview-frame-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-preview-frame-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-preview-frame-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-preview-frame-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-preview-frame-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-preview-frame-distance - Outer margin of the preview frame
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the preview frame
 * @cssprop --wcp-preview-frame-border-width - Border width of the example section
 * @cssprop --wcp-preview-frame-spacing - Inner padding of the example section
 */
export declare class PreviewFrame extends PreviewFrame_base {
    static readonly styles: import("lit").CSSResult;
    private _tabs;
    initialPreviewTab?: Config['initialPreviewTab'];
    protected handleSlotChange(event: Event): void;
    protected getAvailableTabs(): HTMLElementTagNameMap['wcp-tabs']['tabs'];
    protected getActiveTab(): HTMLElementTagNameMap['wcp-tabs']['activeTab'];
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame': PreviewFrame;
    }
}
export {};
