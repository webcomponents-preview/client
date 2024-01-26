import { LitElement, type TemplateResult } from 'lit';
import type { StagePlugin } from '../../../utils/plugin.utils.js';
declare const StageReadme_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows the readme of a custom element.
 *
 */
export declare class StageReadme extends StageReadme_base implements StagePlugin {
    #private;
    static readonly styles: import("lit").CSSResult;
    readonly name = "readme";
    readonly label = "Readme";
    private _element?;
    available: boolean;
    set previewTagName(previewTagName: string);
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-stage-plugin:availability-change': CustomEvent<boolean>;
    }
    interface HTMLElementTagNameMap {
        'wcp-stage-readme': StageReadme;
    }
}
export {};
