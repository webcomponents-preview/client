import { LitElement, type TemplateResult } from 'lit';
declare const ToggleColorScheme_base: (new (...args: any[]) => import("@/utils/color-scheme.utils").ColorSchemableInterface) & typeof LitElement;
/**
 * Shows a button to toggle the desired color-scheme.
 *
 * @example
 * ```html
 * <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
 * ```
 */
export declare class ToggleColorScheme extends ToggleColorScheme_base {
    static readonly styles: import("lit").CSSResult;
    colorScheme: "dark" | "light";
    handleButtonClick(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-toggle-color-scheme': ToggleColorScheme;
    }
}
export {};
