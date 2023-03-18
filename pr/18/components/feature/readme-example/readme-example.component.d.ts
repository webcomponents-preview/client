import { LitElement, type TemplateResult } from 'lit';
declare const ReadmeExample_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * Shows an inline code example and a preview of the element in the readme.
 * This is used in the markdown formatter to render `html` examples.
 *
 * In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
 * or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
 * `renderMarkdown` function provided by the `@/utils/markdown.utils`.
 *
 * @example
 * ### Shows arbitrary HTML code example
 *
 * ```html
 * <wcp-readme-example>
 *   <pre slot="code">
 * &lt;h1&gt;Readme&lt;/h1&gt;
 * &lt;p&gt;Some readme content&lt;/p&gt;
 *   </pre>
 *   <div slot="preview">
 *     <h1>Readme</h1>
 *     <p>Some readme content</p>
 *   </div>
 * </wcp-readme-example>
 * ```
 *
 * @slot code - Code example
 * @slot preview - Rendered example preview
 *
 * @cssprop --wcp-readme-example-spacing - Inner padding of the example
 * @cssprop --wcp-readme-example-border-radius - Border radius of the example
 * @cssprop --wcp-readme-example-border-width - Border width of the example
 *
 * @cssprop --wcp-readme-example-dark-border-color - Border color of the example in dark mode
 * @cssprop --wcp-readme-example-light-border-color - Border color of the example in light mode
 */
export declare class ReadmeExample extends ReadmeExample_base {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-readme-example': ReadmeExample;
    }
}
export {};
