import type { CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';
export type CustomElementData = {
    members: Record<string, unknown>;
    slots: Record<string, string>;
};
export declare const EMPTY_ELEMENT_DATA: {
    members: {};
    slots: {};
};
export declare function parseKey(input: Element | RadioNodeList, name: string, field: CustomElementField): string;
export declare function parseValue(input: Element | RadioNodeList, value: FormDataEntryValue): string | number | boolean | undefined;
export declare function mapMemberData(name: string, value: FormDataEntryValue, input: Element | RadioNodeList, field: CustomElementField): [string, unknown];
export declare function mapSlotData(name: string, value: string): [string, string];
export declare function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData;
