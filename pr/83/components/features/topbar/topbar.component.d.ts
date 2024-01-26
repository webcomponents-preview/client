import { LitElement, type TemplateResult } from 'lit';
declare const Topbar_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * A wrapper above the preview frame content to contain various controls.
 *
 * @slot - Default slot for navigation items
 *
 * @cssprop --wcp-topbar-dark-background - Background color of the controls in dark mode
 * @cssprop --wcp-topbar-dark-color - Text color of the controls in dark mode
 * @cssprop --wcp-topbar-light-background - Background color of the controls in light mode
 * @cssprop --wcp-topbar-light-color - Text color of the controls in light mode
 *
 * @cssprop --wcp-topbar-height - Overall height of the preview controls nav bar
 * @cssprop --wcp-topbar-spacing - Inner spacing, used as padding of the controls
 *
 */
export declare class Topbar extends Topbar_base {
    static readonly styles: import("lit").CSSResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-topbar': Topbar;
    }
}
export {};
