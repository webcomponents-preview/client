import { LitElement, type TemplateResult } from 'lit';
declare const Tabs_base: import("../../..").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}'>
 *  <div slot="first">First tab content</div>
 *  <div slot="second">Second tab content</div>
 * </wcp-tabs>
 * ```
 *
 * @example
 * ### Active tab preselected
 *
 * ```html
 * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}' active-tab="second">
 *  <div slot="first">First tab content</div>
 *  <div slot="second">Second tab content</div>
 * </wcp-tabs>
 * ```
 *
 * @example
 * ### Disabled tabs
 *
 * ```html
 * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab", "disabled": true}}' active-tab="second">
 *  <div slot="first">First tab content</div>
 *  <div slot="second">Second tab content</div>
 * </wcp-tabs>
 * ```
 *
 * @slot tab name - The content of the named tab.
 * @emits wcp-tabs:active-tab-change - Notifies when the active tab changes
 *
 * @cssprop --wcp-tabs-tablist-gap - The gap between the tablist and the tabpanels
 * @cssprop --wcp-tabs-tablist-spacing - The inner padding of the tablist
 * @cssprop --wcp-tabs-tab-spacing - The inner padding of the tabs
 * @cssprop --wcp-tabs-tab-active-border-width - The border width of the active tab
 * @cssprop --wcp-tabs-panel-spacing - The inner padding of the tabpanels
 *
 * @cssprop --wcp-tabs-tablist-dark-border-color - The border color of the tablist in dark mode
 * @cssprop --wcp-tabs-tab-active-dark-border-color - The border color of the active tab in dark mode
 *
 * @cssprop --wcp-tabs-tablist-light-border-color - The border color of the tablist in light mode
 * @cssprop --wcp-tabs-tab-active-light-border-color - The border color of the active tab in light mode
 */
export declare class Tabs extends Tabs_base {
    static readonly styles: import("lit").CSSResult;
    tabFocus: number;
    private readonly tabRoles;
    tabs: Record<string, {
        label: string;
        disabled?: boolean;
    }>;
    activeTab?: string;
    emitActiveTabChange(): void;
    handleTabClick(event: Event): void;
    handleKeydown(event: KeyboardEvent): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-tabs:active-tab-change': CustomEvent<string>;
    }
    interface HTMLElementTagNameMap {
        'wcp-tabs': Tabs;
    }
}
export {};
