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
 * Derives a given fields meta data by parsing it
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
    get default(): string | number | boolean | undefined;
    constructor(field: CustomElementField);
}
export declare function isCustomElementField(field?: ClassMember): field is CustomElementField;
export declare function isControlable(field: CustomElementField): boolean;
/**
 * Prepares a lit compatible template key for a given field
 */
export declare function litKey(field: Field): string;
/**
 * Prepare the initial data for a given element by its defaults
 */
export declare function prepareInitialElementData(element: CustomElementDeclaration): CustomElementData;
/**
 * Retrieve the current value of a given field parsed to the correct type
 */
export declare function parseMemberValue(field: Field, value: unknown): string | number | boolean | undefined;
/**
 * Maps the given form data by the given element definition to a stateful data object
 */
export declare function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData;
