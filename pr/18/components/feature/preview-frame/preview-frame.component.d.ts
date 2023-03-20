import type { CustomElementDeclaration } from 'custom-elements-manifest';
import { LitElement, type TemplateResult } from 'lit';
import type { Config } from '@/utils/config.utils';
import { type CustomElementDeclarationWithExamples, type CustomElementDeclarationWithReadme } from '@/utils/custom-elements-manifest.utils';
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
    preview: string;
    examples: string[];
    element?: CustomElementDeclaration;
    initialPreviewTab?: Config['initialPreviewTab'];
    protected renderExamples(element: CustomElementDeclarationWithExamples): TemplateResult;
    protected renderReadme(element: CustomElementDeclarationWithReadme): TemplateResult;
    protected renderViewer(element: CustomElementDeclaration): TemplateResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame': PreviewFrame;
    }
}
export {};
