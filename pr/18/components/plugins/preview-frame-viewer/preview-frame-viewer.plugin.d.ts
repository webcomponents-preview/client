import type { CustomElementDeclaration, CustomElementField, Slot } from 'custom-elements-manifest';
import { LitElement, type TemplateResult } from 'lit';
import type { PreviewFramePlugin } from '@/components/feature/preview-frame/preview-frame.utils';
declare const PreviewFrameViewer_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
export declare class PreviewFrameViewer extends PreviewFrameViewer_base implements PreviewFramePlugin {
    #private;
    static readonly styles: import("lit").CSSResult;
    set element(element: CustomElementDeclaration | undefined);
    readonly name = "viewer";
    readonly label = "Viewer";
    readonly available = true;
    private elementData?;
    protected getElementReference(): Element | undefined;
    protected getFields(): CustomElementField[];
    protected getSlots(): Slot[];
    protected getSlotsWithData(): {
        slot: Slot;
        data: string;
    }[];
    protected handleControlsInput(event: InputEvent): void;
    protected renderSlots(): TemplateResult;
    protected renderFieldControl(member: CustomElementField): TemplateResult;
    protected renderSlotControl(slot: Slot): TemplateResult;
    protected renderElement(): TemplateResult;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-preview-frame-viewer': PreviewFrameViewer;
    }
}
export {};
