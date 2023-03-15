import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows a code example and a preview of the component.
 *
 * @slot code - Code example
 * @slot preview - Rendered example preview
 *
 * @cssprop --wcp-example-spacing - Inner padding of the example
 * @cssprop --wcp-example-border-radius - Border radius of the example
 * @cssprop --wcp-example-border-width - Border width of the example
 *
 * @cssprop --wcp-example-dark-border-color - Border color of the example in dark mode
 * @cssprop --wcp-example-light-border-color - Border color of the example in light mode
 */
export declare class Example extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-example': Example;
    }
}
