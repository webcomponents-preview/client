import { LitElement, type TemplateResult } from 'lit';
import { type GroupedNavigationItems } from '@/utils/navigation.utils.js';
/**
 * Manages the main root-navigation in the application root.
 *
 * @element wcp-root-navigation
 *
 * @cssprop --wcp-root-navigation-empty-message-spacing - The spacing of the empty message.
 * @cssprop --wcp-root-navigation-empty-message-font-size - The font size of the empty message.
 */
export declare class RootNavigation extends LitElement {
    #private;
    static readonly styles: import("lit").CSSResult;
    private filteredItems;
    currentPath?: string;
    emptyMessage: string;
    minSearchLength: number;
    set searchTerms(terms: string[]);
    set items(items: GroupedNavigationItems);
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-root-navigation': RootNavigation;
    }
}
