import type { CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';
export type CustomElementData = {
    members: Record<string, unknown>;
    slots: Record<string, string>;
};
export declare const EMPTY_ELEMENT_DATA: {
    members: {};
    slots: {};
};
/**
 * Prepares a lit compatible template key for a given field
 */
export declare function litKey(field: CustomElementField): string;
export declare function prepareInitialElementData(element: CustomElementDeclaration): CustomElementData;
export declare function parseMemberValue(value: FormDataEntryValue, input: Element | RadioNodeList): FormDataEntryValue | string | number | boolean | undefined;
export declare function mapMemberData(value: FormDataEntryValue, input: Element | RadioNodeList, field: CustomElementField): [string, unknown];
export declare function mapSlotData(name: string, value: string): [string, string];
export declare function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData;
