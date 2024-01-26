import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows an icon from the css.gg icon set.
 *
 * @cssprop --wcp-icon-size - Sets the size of the icon as unitless number in pixels
 */
export declare class Icon extends LitElement {
    static readonly styles: import("lit").CSSResult;
    name: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-icon': Icon;
    }
}
