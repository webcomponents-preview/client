import { LitElement, type TemplateResult } from 'lit';
/**
 * Shows the application title and a logo.
 *
 * @example
 * ```html
 * <wcp-title title="Web Components Preview">
 *   <img slot="logo" src="assets/icons/logo.svg" height="30px" />
 * </wcp-title>
 * ```
 *
 * @slot logo - Receives the logo image to be shown
 *
 * @cssprop --wcp-title-gap - The gap between the logo and the title
 * @cssprop --wcp-title-height - The height of the title. Content may exceed and scales the tile
 * @cssprop --wcp-title-spacing - Inner padding of the title
 * @cssprop --wcp-title-headline-size - The font size of the title
 * @cssprop --wcp-title-headline-weight - The font weight of the title
 * @cssprop --wcp-title-headline-spacing - The letter spacing of the title
 * @cssprop --wcp-title-headline-line-height - The line height of the title
 * @cssprop --wcp-title-headline-transform - The text transform of the title
 */
export declare class Title extends LitElement {
    static readonly styles: import("lit").CSSResult;
    title: string;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-title': Title;
    }
}
