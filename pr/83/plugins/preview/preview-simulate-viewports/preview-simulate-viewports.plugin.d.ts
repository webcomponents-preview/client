import { LitElement, type TemplateResult } from 'lit';
import type { PreviewPlugin } from '../../../utils/plugin.utils.js';
type Viewport = 'mobile' | 'tablet' | 'desktop' | 'wide';
declare const PreviewSimulateViewports_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Simulates various viewports for a custom element preview.
 *
 */
export declare class PreviewSimulateViewports extends PreviewSimulateViewports_base implements PreviewPlugin {
    static readonly styles: import("lit").CSSResult;
    readonly name = "viewport";
    readonly label = "Viewport";
    readonly container: HTMLElement;
    readonly previewTagName: string;
    readonly available = true;
    private simulateViewport?;
    private invertSimulatedViewport;
    protected get defaultStyle(): string;
    protected removeStyle(): void;
    protected resetStyle(): void;
    protected prepareStyle(): HTMLStyleElement;
    /**
     * Sets the size of the viewport to simulate its dimensions.
     */
    protected applyPreviewSize(): void;
    /**
     * Scales the sized viewport to fit into the preview container.
     */
    protected applyPreviewScale(): void;
    protected applyPreviewDimensions(): void;
    private emitChange;
    private handleSimulateViewport;
    handleInvertSimulatedViewport(): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-preview-simulate-viewports:changed': CustomEvent<{
            viewport: Viewport;
            inverted: boolean;
        }>;
    }
    interface HTMLElementTagNameMap {
        'wcp-preview-simulate-viewports': PreviewSimulateViewports;
    }
}
export {};
