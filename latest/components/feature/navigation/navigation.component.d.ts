import { LitElement, type TemplateResult } from 'lit';
declare const Navigation_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * @example
 * ### Usage with headline
 *
 * ```html
 * <wcp-navigation headline="Navigation">
 *   <wcp-navigation-item href="/home">Home</wcp-navigation-item>
 *   <wcp-navigation-item href="/about">About</wcp-navigation-item>
 * </wcp-navigation>
 * ```
 *
 * @slot - Default slot for navigation items
 *
 * @cssprop --wcp-navigation-spacing - Spacing between navigation and headline
 * @cssprop --wcp-navigation-spacing-items - Spacing between navigation items
 * @cssprop --wcp-navigation-spacing-headline - Inner padding of the navigation headline
 * @cssprop --wcp-navigation-dark-border-color - Border color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-light-border-color - Border color of the navigation headline in light mode
 * @cssprop --wcp-navigation-headline-size - Font size of the navigation headline
 * @cssprop --wcp-navigation-headline-weight - Font weight of the navigation headline
 * @cssprop --wcp-navigation-headline-spacing - Letter spacing of the navigation headline
 * @cssprop --wcp-navigation-headline-dark-background - Background color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-headline-light-background - Background color of the navigation headline in light mode
 */
export declare class Navigation extends Navigation_base {
    static readonly styles: import("lit").CSSResult;
    headline?: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-navigation': Navigation;
    }
}
export {};
