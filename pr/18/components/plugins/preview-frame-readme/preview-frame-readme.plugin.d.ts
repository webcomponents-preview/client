import { LitElement, type TemplateResult } from 'lit';
import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
import { type CustomElementDeclarationWithReadme } from '@/utils/custom-elements-manifest.utils';
declare const PreviewFrameReadme_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
export declare class PreviewFrameReadme extends PreviewFrameReadme_base implements PreviewFramePlugin<CustomElementDeclarationWithReadme> {
    static readonly styles: import("lit").CSSResult;
    element?: CustomElementDeclarationWithReadme;
    readonly name = "readme";
    readonly label = "Readme";
    get available(): boolean;
    createRenderRoot(): this;
    connectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame-readme': PreviewFrameReadme;
    }
}
export {};
