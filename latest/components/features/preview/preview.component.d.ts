import { LitElement, type TemplateResult } from 'lit';
declare const Preview_base: import("../../..").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Previews given content.
 *
 * @element wcp-preview
 *
 * @cssprop --wcp-preview-menu-dark-border-color - Border color of the plugin menu in dark mode.
 * @cssprop --wcp-preview-menu-light-border-color - Border color of the plugin menu in light mode.
 *
 * @slot - The content to preview.
 *
 * @example
 * ```html
 * <wcp-preview>
 *   <wcp-button>Example button</wcp-button>
 * </wcp-preview>
 * ```
 */
export declare class Preview extends Preview_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    private container?;
    previewTagName?: string;
    protected handleRouteChange(): void;
    private handleContainerRef;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview': Preview;
    }
}
export {};
