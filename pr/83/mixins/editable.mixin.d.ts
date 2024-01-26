import 'element-internals-polyfill';
import { type CSSResultGroup, type LitElement, type TemplateResult } from 'lit';
import { type ColorSchemableInterface } from '../mixins/color-schemable.mixin.js';
import type { Constructor } from '../utils/mixin.types.js';
export declare class EditableInterface {
    readonly internals: ElementInternals;
    label?: string;
    renderInput(id: string): TemplateResult;
    renderSlot(name: string): TemplateResult;
}
export interface EditablePrototype {
    formStyles: CSSResultGroup;
    formAssociated: true;
}
export type EditableOptions = {
    hasHintSlot?: boolean;
    hasBeforeSlot?: boolean;
    hasAfterSlot?: boolean;
    hasBorder?: boolean;
};
export declare const Editable: ({ hasHintSlot, hasBeforeSlot, hasAfterSlot, hasBorder, }?: Partial<EditableOptions>) => <T extends Constructor<LitElement>>(superClass: T) => Constructor<EditableInterface & ColorSchemableInterface> & EditablePrototype & T;
