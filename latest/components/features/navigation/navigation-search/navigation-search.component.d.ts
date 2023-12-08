import { LitElement, type TemplateResult } from 'lit';
declare const NavigationSearch_base: import("../../../../index.js").Constructor<import("../../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @element wcp-navigation-search
 *
 * @emits wcp-navigation-search:search - Fired when the search term changes. Carries the new search term with it.
 *
 * @cssprop --wcp-navigation-search-spacing - The spacing around the search input.
 *
 * @cssprop --wcp-navigation-search-dark-border-color - The border color of the search input in dark mode.
 * @cssprop --wcp-navigation-search-light-border-color - The border color of the search input in light mode.
 *
 * @cssprop --wcp-navigation-search-passive-dark-stroke - The stroke color of the search input in dark mode when not focused.
 * @cssprop --wcp-navigation-search-passive-light-stroke - The stroke color of the search input in light mode when not focused.
 *
 * @cssprop --wcp-navigation-search-active-dark-stroke - The stroke color of the search input in dark mode when focused.
 * @cssprop --wcp-navigation-search-active-light-stroke - The stroke color of the search input in light mode when focused.
 */
export declare class NavigationSearch extends NavigationSearch_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    term: string;
    protected handleSearchInput(event: InputEvent): void;
    protected handleResetClick(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-navigation-search:search': CustomEvent<string>;
    }
    interface HTMLElementTagNameMap {
        'wcp-navigation-search': NavigationSearch;
    }
}
export {};
