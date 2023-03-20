import { LitElement, type TemplateResult } from 'lit';
import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
import { type CustomElementDeclarationWithExamples } from '@/utils/custom-elements-manifest.utils';
declare const PreviewFrameExamples_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
export declare class PreviewFrameExamples extends PreviewFrameExamples_base implements PreviewFramePlugin<CustomElementDeclarationWithExamples> {
    static readonly styles: import("lit").CSSResult;
    element?: CustomElementDeclarationWithExamples;
    readonly name = "examples";
    readonly label = "Examples";
    get available(): boolean;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame-examples': PreviewFrameExamples;
    }
}
export {};
