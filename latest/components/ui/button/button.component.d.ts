import { LitElement, type TemplateResult } from 'lit';
import 'element-internals-polyfill';
declare const Button_base: import("../../..").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows a button element.
 *
 * @example
 * ## Default button
 *
 * ```html
 * <wcp-button>Click me!</wcp-button>
 * ```
 *
 * @example
 * ## Disabled button
 *
 * ```html
 * <wcp-button disabled>Try to click me!</wcp-button>
 * ```
 *
 * @example
 * ## Button with icon
 *
 * ```html
 * <wcp-button kind="icon">
 *  <wcp-icon name="menu"></wcp-icon>
 * </wcp-button>
 * ```
 *
 * @example
 * ## Force active state
 *
 * ```html
 * <wcp-button class="active">Link</wcp-button>
 * ```
 *
 * @example
 * ## Use as link
 *
 * ```html
 * <wcp-button href=".">Link</wcp-button>
 * ```
 *
 * @example
 * ## Displaced to the right
 *
 * ```html
 * <wcp-button style="position:relative;left:calc(100% - 40px);transform:translateX(-100%)">
 *   Try to find me!
 * </wcp-button>
 * ```
 *
 * @example
 * ## Use as native submit button in form
 *
 * ```html
 * <form onsubmit="alert('Submit!'); return false">
 *  <wcp-button type="submit">Submit</wcp-button>
 * </form>
 * ```
 *
 * @example
 * ## Use as native reset button in form
 *
 * ```html
 * <form onreset="alert('Reset!'); return false">
 *   <wcp-button type="reset">Reset</wcp-button>
 * </form>
 * ```
 *
 * @slot {Some <i>Button</i>} - Default slot for the button content
 *
 * @cssprop --wcp-button-dark-passive-background - Background color of the button if non interactive in dark mode
 * @cssprop --wcp-button-dark-passive-border-color - Border color of the button if non interactive in dark mode
 * @cssprop --wcp-button-dark-passive-color - Text color of the button if non interactive in dark mode
 *
 * @cssprop --wcp-button-dark-hover-background - Background color of the button if hovered in dark mode
 * @cssprop --wcp-button-dark-hover-border-color - Border color of the button if hovered in dark mode
 * @cssprop --wcp-button-dark-hover-color - Text color of the button if hovered in dark mode
 *
 * @cssprop --wcp-button-dark-active-background - Background color of the button if active in dark mode
 * @cssprop --wcp-button-dark-active-border-color - Border color of the button if active in dark mode
 * @cssprop --wcp-button-dark-active-color - Text color of the button if active in dark mode
 *
 * @cssprop --wcp-button-light-passive-background - Background color of the button if non interactive in light mode
 * @cssprop --wcp-button-light-passive-border-color - Border color of the button if non interactive in light mode
 * @cssprop --wcp-button-light-passive-color - Text color of the button if non interactive in light mode
 *
 * @cssprop --wcp-button-light-hover-background - Background color of the button if hovered in light mode
 * @cssprop --wcp-button-light-hover-border-color - Border color of the button if hovered in light mode
 * @cssprop --wcp-button-light-hover-color - Text color of the button if hovered in light mode
 *
 * @cssprop --wcp-button-light-active-background - Background color of the button if active in light mode
 * @cssprop --wcp-button-light-active-border-color - Border color of the button if active in light mode
 * @cssprop --wcp-button-light-active-color - Text color of the button if active in light mode
 */
export declare class Button extends Button_base {
    #private;
    static readonly formAssociated = true;
    static readonly styles: import("lit").CSSResult;
    disabled: boolean;
    nowrap: boolean;
    /**
     * Allows stretching the button across the full width of its container.
     * This is useful for buttons that are used in a narrow form, or in general
     * on small viewports, like handheld devices.
     */
    stretched: boolean;
    /**
     * The kind of button to render. Either like a conventional button, or for
     * icons. Icon buttons are quadratic and will show a radial background on interaction.
     */
    kind: 'button' | 'icon';
    type: 'button' | 'reset' | 'submit';
    href?: string;
    target?: '_self' | '_blank' | '_parent' | '_top';
    handleButtonClick(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-button': Button;
    }
}
export {};
