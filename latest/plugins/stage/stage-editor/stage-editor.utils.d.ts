import type * as Parsed from '@/utils/parser.types.js';
/**
 * State of the custom element.
 */
export type ElementData = {
    /**
     * Additional attributes mapped by attribute name to attribute value.
     * Should not overlap with reflected attributes from fields.
     */
    attributes: Record<string, string | undefined>;
    /**
     * Field state mapped by property name to property value.
     */
    fields: Record<string, string | number | boolean | undefined>;
    /**
     * Slot state mapped by slot name to slot (html) content.
     */
    slots: Record<string, string>;
};
/**
 * Empty state object of the element data.
 */
export declare const EMPTY_ELEMENT_DATA: ElementData;
/**
 * Prepares an initial state object for the given element definition.
 */
export declare function prepareInitialData(element: Parsed.Element): ElementData;
/**
 * Retrieve the current value of a given field parsed to the correct type
 */
export declare function parseFieldValue(field: Parsed.Field, value: unknown): ElementData['fields'][keyof ElementData['fields']];
/**
 * There seems to be a bug in Safari with the native FormAssociated implementation regarding
 * checkboxes: https://bugs.webkit.org/show_bug.cgi?id=259781
 */
export declare function alignFormDataWebkit(formData: FormData, elements: HTMLFormControlsCollection, element: Parsed.Element): FormData;
/**
 * Maps the given form data by the given element definition to a stateful data object
 */
export declare function mapFormData(data: FormData, element: Parsed.Element): ElementData;
/**
 * Prepares the data to be set as compressed url param
 */
export declare function compressFormData(formData: FormData, element: Parsed.Element): Promise<string>;
/**
 * Decompresses and parses the given element data
 */
export declare function decompressElementData(compressed: string): Promise<ElementData>;
