import { LitElement, type TemplateResult } from 'lit';
declare const Readme_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-readme>
 *  <h1>Readme</h1>
 *  <p>Some readme content</p>
 * </wcp-readme>
 * ```
 */
export declare class Readme extends Readme_base {
    static readonly styles: import("lit").CSSResult;
    markdown: string;
    createRenderRoot(): this;
    connectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-readme': Readme;
    }
}
export {};
