import { LitElement, type TemplateResult } from 'lit';
declare const Layout_base: import("../../..").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-layout>
 *   <nav slot="aside">To the left!</nav>
 *   <article>Me the important content!</article>
 * </wcp-layout>
 * ```
 *
 * @cssprop --wcp-layout-dark-background - The background color of the whole layout
 * @cssprop --wcp-layout-dark-color - The text color of the whole layout
 *
 * @cssprop --wcp-layout-light-background - The background color of the whole layout
 * @cssprop --wcp-layout-light-color - The text color of the whole layout
 *
 * @slot header - Shows contents fixed above the aside
 * @slot aside - Projects elements aside the main content
 * @slot - Receives the content of the main section
 */
export declare class Layout extends Layout_base {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-layout': Layout;
    }
}
export {};
