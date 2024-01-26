import { LitElement, type TemplateResult } from 'lit';
declare const Navigation_base: import("../../../../index.js").Constructor<import("../../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @slot - Default slot for navigation items or nested navigation
 * @slot action - Slot for an action to be shown next to the headline
 *
 * @csspart headline - The headline of the navigation
 * @csspart nav - The nested navigation
 *
 * @cssprop --wcp-navigation-spacing - Spacing between navigation and headline
 * @cssprop --wcp-navigation-spacing-items - Spacing between navigation items
 * @cssprop --wcp-navigation-spacing-headline - Inner padding of the navigation headline
 * @cssprop --wcp-navigation-spacing-headline-togglable - Inner padding of the navigation headline if togglable
 * @cssprop --wcp-navigation-inset - Inset of the navigation if nested (is applied on each level)
 * @cssprop --wcp-navigation-dark-border-color - Border color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-light-border-color - Border color of the navigation headline in light mode
 * @cssprop --wcp-navigation-headline-size - Font size of the navigation headline
 * @cssprop --wcp-navigation-headline-weight - Font weight of the navigation headline
 * @cssprop --wcp-navigation-headline-spacing - Letter spacing of the navigation headline
 * @cssprop --wcp-navigation-headline-dark-background - Background color of the navigation headline in dark mode
 * @cssprop --wcp-navigation-headline-light-background - Background color of the navigation headline in light mode
 *
 * @emits wcp-navigation-toggle - Emitted when the togglable open state changes
 */
export declare class Navigation extends Navigation_base {
    static readonly styles: import("lit").CSSResult;
    /**
     * An optional headline to be shown for categorization
     */
    headline?: string;
    /**
     * Allows the nested items to be toggled
     */
    togglable: boolean;
    /**
     * If togglable, this flag indicates if the nested items are currently visible
     */
    open: boolean;
    toggleClick(): void;
    toggleKeyboard(event: KeyboardEvent): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-navigation-toggle': CustomEvent<boolean>;
    }
    interface HTMLElementTagNameMap {
        'wcp-navigation': Navigation;
    }
}
export {};
