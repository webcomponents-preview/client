import { LitElement, type TemplateResult } from 'lit';
declare const NavigationItem_base: (new (...args: any[]) => import("@/utils/color-scheme.utils").ColorSchemableInterface) & typeof LitElement;
/**
 * @example
 * ### Non-interactive
 *
 * This will probably only be used for the active item.
 *
 * ```html
 * <wcp-navigation-item>
 *   Non-interactive
 * </wcp-navigation-item>
 * ```
 *
 * @example
 * ### With link
 *
 * ```html
 * <wcp-navigation-item href="/home">
 *   Home
 * </wcp-navigation-item>
 * ```
 *
 * @slot - Default slot for contents
 *
 * @cssprop --wcp-navigation-item-spacing - Inner padding of the item
 *
 * @cssprop --wcp-navigation-item-dark-passive-background - Background color of the item when non interactive in dark mode
 * @cssprop --wcp-navigation-item-dark-hover-background - Background color of the item when hovered in dark mode
 * @cssprop --wcp-navigation-item-dark-active-background - Background color of the item when active in dark mode
 *
 * @cssprop --wcp-navigation-item-dark-passive-color - Text color of the item when non interactive in dark mode
 * @cssprop --wcp-navigation-item-dark-hover-color - Text color of the item when hovered in dark mode
 * @cssprop --wcp-navigation-item-dark-active-color - Text color of the item when active in dark mode
 *
 * @cssprop --wcp-navigation-item-light-passive-background - Background color of the item when non interactive in light mode
 * @cssprop --wcp-navigation-item-light-hover-background - Background color of the item when hovered in light mode
 * @cssprop --wcp-navigation-item-light-active-background - Background color of the item when active in light mode
 *
 * @cssprop --wcp-navigation-item-light-passive-color - Text color of the item when non interactive in light mode
 * @cssprop --wcp-navigation-item-light-hover-color - Text color of the item when hovered in light mode
 * @cssprop --wcp-navigation-item-light-active-color - Text color of the item when active in light mode
 */
export declare class NavigationItem extends NavigationItem_base {
    static readonly styles: import("lit").CSSResult;
    active: boolean;
    href?: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-navigation-item': NavigationItem;
    }
}
export {};
