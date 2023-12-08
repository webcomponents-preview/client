import { LitElement, type TemplateResult } from 'lit';
declare const Readme_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Displays a Readme file by its URL.
 *
 * @element wcp-readme
 *
 * @cssprop --wcp-readme-dark-color - Text color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-color-accent - Accent text color (e.g. links) of the readme in dark mode.
 * @cssprop --wcp-readme-dark-color-muted - Muted text color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-border-color - Border color of the readme in dark mode.
 * @cssprop --wcp-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
 *
 * @cssprop --wcp-readme-light-color - Text color of the readme in light mode.
 * @cssprop --wcp-readme-light-color-accent - Accent text color (e.g. links) of the readme in light mode.
 * @cssprop --wcp-readme-light-color-muted - Muted text color of the readme in light mode.
 * @cssprop --wcp-readme-light-border-color - Border color of the readme in light mode.
 * @cssprop --wcp-readme-light-highlight-background - Background color of highlighted table rows in light mode.
 *
 * @example
 * ```html
 * <wcp-readme markdown="# Hello _World_!"></wcp-readme>
 * ```
 */
export declare class Readme extends Readme_base {
    static readonly styles: import("lit").CSSResult;
    readonly showCodePreview = false;
    readonly previewTagName?: string;
    readonly markdown = "";
    readonly hash?: string;
    protected updated(): void;
    scrollToId(section: string): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-readme': Readme;
    }
}
export {};
