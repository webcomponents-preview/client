import { LitElement, type TemplateResult } from 'lit';
declare const Stage_base: import("../../..").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-stage></wcp-stage>
 * ```
 *
 * @slot - The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs.
 *
 * @cssprop --wcp-stage-dark-background - Background color of the preview frame in dark mode
 * @cssprop --wcp-stage-dark-border-color - Border color of the example section in dark mode
 * @cssprop --wcp-stage-dark-color - Text color of the preview frame in dark mode
 *
 * @cssprop --wcp-stage-light-background - Background color of the preview frame in light mode
 * @cssprop --wcp-stage-light-border-color - Border color of the example section in light mode
 * @cssprop --wcp-stage-light-color - Text color of the preview frame in light mode
 *
 * @cssprop --wcp-stage-border-radius - Border radius of the preview frame
 * @cssprop --wcp-stage-border-width - Border width of the preview frame
 * @cssprop --wcp-stage-distance - Outer margin of the preview frame
 * @cssprop --wcp-stage-spacing - Inner padding of the preview frame
 */
export declare class Stage extends Stage_base {
    static readonly styles: import("lit").CSSResult;
    private readonly assignedPlugins;
    private _plugins;
    private _tabs;
    private readonly activePlugin?;
    emitActivePluginChange(activePlugin?: string): void;
    protected handleSlotChange(): void;
    protected handleAvailabilityChange(): void;
    protected handleActiveTabChange(event: CustomEvent<string>): void;
    protected preparePluginTabs(): void;
    protected alignActivePlugin(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-stage:active-plugin-change': CustomEvent<string>;
    }
    interface HTMLElementTagNameMap {
        'wcp-stage': Stage;
    }
}
export {};
