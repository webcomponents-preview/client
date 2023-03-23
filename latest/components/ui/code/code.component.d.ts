import { LitElement, type TemplateResult } from 'lit';
declare const Code_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * Shows a formatted code snippet.
 *
 * @example
 * ```html
 * <wcp-code>
 *   <pre><code>Some code</code></pre>
 * </wcp-code>
 * ```
 */
export declare class Code extends Code_base {
    static readonly styles: import("lit").CSSResult;
    createRenderRoot(): this;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-code': Code;
    }
}
export {};
