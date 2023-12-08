import { LitElement, type TemplateResult } from 'lit';
import type { TopbarPlugin } from '@/utils/plugin.utils.js';
/**
 * Toggles all preview editor link plugins to show or hide the debug hints.
 *
 * @element wcp-topbar-preview-editor-link-toggle
 */
export declare class TopbarPreviewEditorLinkToggle extends LitElement implements TopbarPlugin {
    static readonly styles: import("lit").CSSResult;
    readonly name = "editor-link-toggle";
    readonly label = "Toggle all editor link hints globally";
    private enabled;
    available: boolean;
    protected handleToggleClick(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'wcp-topbar-preview-editor-link-toggle': TopbarPreviewEditorLinkToggle;
    }
}
