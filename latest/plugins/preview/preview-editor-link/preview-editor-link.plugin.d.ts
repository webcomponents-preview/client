import { LitElement, type TemplateResult } from 'lit';
import type { PreviewPlugin } from '../../../utils/plugin.utils.js';
/**
 * Links all found custom elements in a preview with their current state to the editor to be further played around with.
 *
 */
export declare class PreviewEditorLink extends LitElement implements PreviewPlugin {
    #private;
    static readonly styles: import("lit").CSSResult;
    readonly name = "editor-link";
    readonly label = "Show in editor";
    readonly container: HTMLElement;
    readonly previewTagName: string;
    available: boolean;
    enabled: boolean;
    connectedCallback(): void;
    adoptedCallback(): void;
    disconnectedCallback(): void;
    protected handleGlobalToggle({ detail: enabled }: CustomEvent<boolean>): void;
    private handleToggleClick;
    protected render(): TemplateResult;
}
declare global {
    interface State {
        'editor-link-hint-visible': boolean;
    }
    interface HTMLElementTagNameMap {
        'wcp-preview-editor-link': PreviewEditorLink;
    }
}
