import { LitElement, type TemplateResult } from 'lit';
/**
 * @slot - Projects elements to the main content
 */
export declare class Main extends LitElement {
    static readonly styles: import("lit").CSSResult;
    /**
     * Presets the aria role to `main` as we do not use te main element directly
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role
     */
    role: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-main': Main;
    }
}
