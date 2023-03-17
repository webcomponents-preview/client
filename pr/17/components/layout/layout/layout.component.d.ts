import { LitElement, type TemplateResult } from 'lit';
/**
 * @example
 * ```html
 * <wcp-layout>
 *   <nav slot="aside">To the left!</nav>
 *   <article>Me the important content!</article>
 * </wcp-layout>
 * ```
 *
 * @slot aside - Projects elements aside the main content
 * @slot - Receives the content of the main section
 */
export declare class Layout extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-layout': Layout;
    }
}
