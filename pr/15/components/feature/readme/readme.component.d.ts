import { LitElement, type TemplateResult } from 'lit';
/**
 * @example
 * ```html
 * <wcp-readme>
 *  <h1>Readme</h1>
 *  <p>Some readme content</p>
 * </wcp-readme>
 * ```
 */
export declare class Readme extends LitElement {
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
