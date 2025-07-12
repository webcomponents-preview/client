import { compress, decompress } from '@/utils/compression.utils.js';
import type * as Parsed from '@/utils/parser.types.js';
import { litKey } from '@/utils/parser.utils.js';

const URI_DATA_PARAM_COMPRESSION: CompressionFormat = 'deflate-raw';

/**
 * State of the custom element.
 */
export interface ElementData {
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
}

/**
 * Empty state object of the element data.
 */
export const EMPTY_ELEMENT_DATA: ElementData = {
  attributes: {},
  fields: {},
  slots: {},
};

/**
 * Prepares an initial state object for the given element definition.
 */
export function prepareInitialData(element: Parsed.Element): ElementData {
  return {
    attributes: {},
    fields:
      Array.from(element.fields.values()).reduce((acc, field) => {
        if (field.isControllable) {
          const value = field.default;
          if (value !== undefined) {
            return { ...acc, [litKey(field)]: value };
          }
        }
        return acc;
      }, {}) ?? {},
    slots:
      Array.from(element.slots.values()).reduce((acc, slot) => {
        return { ...acc, [slot.name]: slot.default };
      }, {}) ?? {},
  };
}

/**
 * Retrieve the current value of a given field parsed to the correct type
 */
export function parseFieldValue(
  field: Parsed.Field,
  value: unknown,
): ElementData['fields'][keyof ElementData['fields']] {
  if (field.isBoolean) {
    return value === 'on';
  }
  if (field.isNumber) {
    return Number(value);
  }
  if (field.isString) {
    return (value as string).trim() ? (value as string) : undefined;
  }
  return undefined;
}

/**
 * There seems to be a bug in Safari with the native FormAssociated implementation regarding
 * checkboxes: https://bugs.webkit.org/show_bug.cgi?id=259781
 */
export function alignFormDataWebkit(
  formData: FormData,
  elements: HTMLFormControlsCollection,
  element: Parsed.Element,
): FormData {
  // filter out unchecked checkboxes for Safari
  Array.from(element.fields.entries())
    .filter(([, field]) => field.isControllable && field.isBoolean)
    .forEach(([, field]) => {
      const name = `field.${field.name}`;
      const checkbox = elements.namedItem(name) as HTMLInputElement;
      if (!checkbox.checked) formData.delete(name);
    });

  // give away aligned form data
  return formData;
}

/**
 * Maps the given form data by the given element definition to a stateful data object
 */
export function mapFormData(data: FormData, element: Parsed.Element): ElementData {
  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    // the name consists of the group and the actual name, separated by a dot
    const [group, name] = key.split('.');

    // map slots
    if (group === 'slot') {
      return { ...acc, slots: { ...acc.slots, [name]: `${value}` } };
    }

    // map the field data
    if (group === 'field') {
      const field = element.fields.get(name);
      if (field === undefined) return acc;

      // pass the key-value pair into the data set
      return { ...acc, fields: { ...acc.fields, [litKey(field)]: parseFieldValue(field, value) } };
    }

    // map the attribute data
    if (group === 'attribute') {
      // pass the key-value pair into the data set
      return { ...acc, attributes: { ...acc.attributes, [name]: `${value}` } };
    }

    return acc;
  }, EMPTY_ELEMENT_DATA);
}

/**
 * Prepares the data to be set as compressed url param
 */
export async function compressFormData(formData: FormData, element: Parsed.Element): Promise<string> {
  const data = mapFormData(formData, element);
  return encodeURIComponent(await compress(JSON.stringify(data), URI_DATA_PARAM_COMPRESSION));
}

/**
 * Decompresses and parses the given element data
 */
export async function decompressElementData(compressed: string): Promise<ElementData> {
  const raw = await decompress(decodeURIComponent(compressed), URI_DATA_PARAM_COMPRESSION);
  return JSON.parse(raw);
}
