import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows a button to toggle sidebar.
 *
 */
export declare class ToggleSidebar extends LitElement {
    static readonly styles: import("lit").CSSResult;
    handleButtonClick(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-toggle-sidebar': ToggleSidebar;
    }
}
