import { type LitElement, type TemplateResult, type CSSResultGroup } from 'lit';
import type { Constructor } from '@/utils/mixin.types.js';
import { type ColorSchemableInterface } from '@/mixins/color-schemable.mixin.js';
import 'element-internals-polyfill';
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
