import { LitElement, type TemplateResult } from 'lit';
declare const MarkdownExample_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows an inline code example and a preview of the element in the readme.
 * This is used in the markdown formatter to render `html` examples.
 *
 * In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
 * or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
 * `renderMarkdown` function provided by the `@/utils/markdown.utils`.
 *
 * @slot code - Code example
 * @slot preview - Rendered example preview
 *
 * @cssprop --wcp-markdown-example-spacing - Inner padding of the example
 * @cssprop --wcp-markdown-example-border-radius - Border radius of the example
 * @cssprop --wcp-markdown-example-border-width - Border width of the example
 *
 * @cssprop --wcp-markdown-example-dark-border-color - Border color of the example in dark mode
 * @cssprop --wcp-markdown-example-light-border-color - Border color of the example in light mode
 */
export declare class MarkdownExample extends MarkdownExample_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-markdown-example': MarkdownExample;
    }
}
export {};
