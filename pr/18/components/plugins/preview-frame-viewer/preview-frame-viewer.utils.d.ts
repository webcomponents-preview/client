import type { ClassMember, CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';
export type CustomElementData = {
    members: Record<string, unknown>;
    slots: Record<string, string>;
};
export declare const EMPTY_ELEMENT_DATA: {
    members: {};
    slots: {};
};
/**
 * Derives a given fields meta data by parsing the CustomElementField
 */
export declare class Field {
    private _field;
    private _types;
    get data(): CustomElementField;
    get isBoolean(): boolean;
    get isNumber(): boolean;
    get isString(): boolean;
    get isEnum(): boolean;
    get isArray(): boolean;
    get isObject(): boolean;
    get isOptional(): boolean;
    get hasAttribute(): boolean;
    get hasDefault(): boolean;
    get hasDescription(): boolean;
    get isStatic(): boolean;
    get isPublic(): boolean;
    get isPrivate(): boolean;
    get isProtected(): boolean;
    constructor(field: CustomElementField);
}
export declare function isCustomElementField(field?: ClassMember): field is CustomElementField;
/**
 * Prepares a lit compatible template key for a given field
 */
export declare function litKey(field: Field): string;
export declare function prepareInitialElementData(element: CustomElementDeclaration): CustomElementData;
export declare function parseMemberValue(field: Field, value: unknown): string | number | boolean | undefined;
export declare function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData;
