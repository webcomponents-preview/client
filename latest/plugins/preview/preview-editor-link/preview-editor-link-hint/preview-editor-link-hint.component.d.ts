import { LitElement, type TemplateResult } from 'lit';
declare const PreviewEditorLinkHint_base: import("../../../../index.js").Constructor<import("../../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows a hint to a given preview element.
 *
 * @element wcp-preview-editor-link-hint
 *
 * @cssprop --wcp-preview-editor-link-hint-button-passive-background - The background color of the hint button in passive state.
 * @cssprop --wcp-preview-editor-link-hint-button-active-background - The background color of the hint button in active state.
 * @cssprop --wcp-preview-editor-link-hint-button-passive-size - Size of the hint button in passive state.
 * @cssprop --wcp-preview-editor-link-hint-button-active-size - Size of the hint button in active state.
 *
 * @cssprop --wcp-preview-editor-link-hint-debug-border-width - Border width of the debugging fields.
 * @cssprop --wcp-preview-editor-link-hint-debug-background-opacity - Opacity of the debugging fields background.
 *
 * @cssprop --wcp-preview-editor-link-hint-debug-stripe-distance - Distance of the stripes of the debugging field background.
 * @cssprop --wcp-preview-editor-link-hint-debug-stripe-tilt - Tilt of the stripes of the debugging field background in degrees.
 * @cssprop --wcp-preview-editor-link-hint-debug-stripe-width - Width of the stripes of the debugging field background.
 * @cssprop --wcp-preview-editor-link-hint-debug-stripe-dash-size - Length of the dashes of the debugging field background.
 * @cssprop --wcp-preview-editor-link-hint-debug-stripe-dash-gap - Gap between the dashes of the debugging field background.
 *
 * @cssprop --wcp-preview-editor-link-hint-debug-dark-background - Debugging field background color in dark mode.
 * @cssprop --wcp-preview-editor-link-hint-debug-dark-stroke - Debugging field dash and border color in dark mode.
 *
 * @cssprop --wcp-preview-editor-link-hint-debug-light-background - Debugging field background color in light mode.
 * @cssprop --wcp-preview-editor-link-hint-debug-light-stroke - Debugging field dash and border color in light mode.
 */
export declare class PreviewEditorLinkHint extends PreviewEditorLinkHint_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    debug: boolean;
    label: string;
    set element(element: HTMLElement | undefined);
    set scrollParent(element: HTMLElement | undefined);
    /**
     * Allows to update the position of the hint.
     */
    updatePosition(): void;
    protected handleStageChange(): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-editor-link-hint': PreviewEditorLinkHint;
    }
}
export {};
