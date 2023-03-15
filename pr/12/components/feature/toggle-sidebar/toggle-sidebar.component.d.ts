import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows a button to toggle sidebar.
 *
 * @example
 * ```html
 * <wcp-wcp-toggle-sidebar></wcp-wcp-toggle-sidebar>
 * ```
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
