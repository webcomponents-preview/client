import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows a splash screen whilst initializing the application.
 *
 * @property {boolean} [hidden] - Use the global hidden attribute to fade out the splash screen.
 *
 * @cssprop --wcp-root-splash-dark-background-color - The background color of the splash screen in dark mode.
 * @cssprop --wcp-root-splash-dark-color - The text color of the splash screen in dark mode.
 * @cssprop --wcp-root-splash-light-background-color - The background color of the splash screen in light mode.
 * @cssprop --wcp-root-splash-light-color - The text color of the splash screen in light mode.
 *
 * @slot {Loading...} - The text content to be displayed in the splash screen.
 *
 * @example
 * # Basic usage
 *
 * ```html
 * <wcp-root-splash>Loading...</wcp-root-splash>
 * ```
 */
export declare class RootSplash extends LitElement {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-root-splash': RootSplash;
    }
}
