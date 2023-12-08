import { LitElement, type TemplateResult } from 'lit';
declare global {
    interface WCP {
        def: {
            breakpoints: Record<string, number>;
        };
    }
    interface Window {
        wcp: WCP;
    }
}
declare const Aside_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * To toggle the side bar remotely, you can dispatch a custom event on the global window object:
 * ```js
 * window.dispatchEvent(new CustomEvent('wcp-aside:toggle'));
 * ```
 * You may pass an optional boolean value to the event to toggle the side bar to a specific state:
 * ```js
 * window.dispatchEvent(new CustomEvent('wcp-aside:toggle', { detail: true }));
 * ```
 *
 * @slot - Projects elements aside the main content
 * @slot header - Elements in the fixed header of the side bar
 *
 * @emits wcp-aside:toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
 *
 * @cssprop --wcp-aside-max-width - The maximum width of the aside bar when visible
 * @cssprop --wcp-aside-spacing - Inner padding of the aside bar
 * @cssprop --wcp-aside-toggle-size - The size of the toggle button
 *
 * @cssprop --wcp-aside-dark-background - The background color of the side bar in dark mode
 * @cssprop --wcp-aside-dark-color - The color of the side bar in dark mode
 *
 * @cssprop --wcp-aside-light-background - The background color of the side bar in light mode
 * @cssprop --wcp-aside-light-color - The color of the side bar in light mode
 */
export declare class Aside extends Aside_base {
    static readonly styles: import("lit").CSSResult;
    /**
     * Used to toggle the width of the aside bar
     */
    hidden: boolean;
    /**
     * Presets the aria role to `complementary` as we do not use te aside element directly
     * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role
     */
    role: string;
    handleButtonClick(): void;
    protected listenAsideToggle({ detail }: CustomEvent<boolean>): void;
    protected handleRouteChange(): void;
    connectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface State {
        ['aside-visible']: boolean;
    }
    interface HTMLElementTagNameMap {
        'wcp-aside': Aside;
    }
}
export {};
