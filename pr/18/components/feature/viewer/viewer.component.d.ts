import type { CustomElementField, CustomElementDeclaration, Slot } from 'custom-elements-manifest';
import { LitElement, type TemplateResult } from 'lit';
declare const Viewer_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * @example
 * ```html
 * <wcp-viewer></wcp-viewer>
 * ```
 */
export declare class Viewer extends Viewer_base {
    static readonly styles: import("lit").CSSResult;
    private elementData;
    element: CustomElementDeclaration;
    protected getElementReference(): HTMLElement;
    protected getFields(): CustomElementField[];
    protected getSlots(): Slot[];
    protected getSlotsWithData(): {
        slot: Slot;
        data: string;
    }[];
    protected handleControlsInput(event: InputEvent): void;
    protected renderSlots(): TemplateResult;
    protected renderElement(): TemplateResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-viewer': Viewer;
    }
}
export {};
