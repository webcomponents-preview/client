import { LitElement, type TemplateResult } from 'lit';
import type * as Parsed from '../../../utils/parser.types.js';
/**
 * Manages the main root-navigation in the application root.
 *
 * @cssprop --wcp-root-navigation-empty-message-spacing - The spacing of the empty message.
 * @cssprop --wcp-root-navigation-empty-message-font-size - The font size of the empty message.
 */
export declare class RootNavigation extends LitElement {
    #private;
    static readonly styles: import("lit").CSSResult;
    private readonly togglableNavigationRefs;
    private filteredItems;
    currentPath?: string;
    emptyMessage: string;
    minSearchLength: number;
    set searchTerms(terms: string[]);
    set items(items: Parsed.GroupedElements);
    constructor();
    disconnectedCallback(): void;
    private handleKeyDown;
    private handleKeyUp;
    private handleNavigationToggle;
    protected renderItem({ name, link }: Parsed.GroupedElement): TemplateResult;
    protected renderItems(items: Parsed.GroupedElements, nested?: boolean): TemplateResult | undefined;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-root-navigation': RootNavigation;
    }
}
