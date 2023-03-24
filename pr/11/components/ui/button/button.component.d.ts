import { LitElement, type TemplateResult } from 'lit';
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
 * ## Button with icon
 *
 * ```html
 * <wcp-button kind="icon">
 *  <wcp-icon name="menu"></wcp-icon>
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
export declare class Button extends LitElement {
    #private;
    static readonly formAssociated = true;
    static readonly styles: import("lit").CSSResult;
    disabled: boolean;
    nowrap: boolean;
    stretched: boolean;
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