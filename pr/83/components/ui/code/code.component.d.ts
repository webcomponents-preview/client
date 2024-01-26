import { LitElement, type TemplateResult } from 'lit';
declare const Code_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows a formatted code snippet.
 *
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
