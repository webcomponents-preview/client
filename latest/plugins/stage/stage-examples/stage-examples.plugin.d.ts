import { LitElement, type TemplateResult } from 'lit';
import type { StagePlugin } from '../../../utils/plugin.utils.js';
declare const StageExamples_base: import("../../../index.js").Constructor<import("../../../mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
/**
 * Shows the examples of a custom element manifest.
 *
 * @cssprop --wcp-stage-examples-spacing - Spacing between examples.
 */
export declare class StageExamples extends StageExamples_base implements StagePlugin {
    #private;
    static readonly styles: import("lit").CSSResult;
    readonly name = "examples";
    readonly label = "Examples";
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
        'wcp-stage-examples': StageExamples;
    }
}
export {};
