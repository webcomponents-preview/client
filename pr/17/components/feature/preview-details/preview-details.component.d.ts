import { LitElement, type TemplateResult } from 'lit';
export declare class PreviewDetails extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-details': PreviewDetails;
    }
}
