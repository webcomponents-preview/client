import type * as Parsed from '@/utils/parser.types.js';
import { litKey } from '@/utils/parser.utils.js';

/**
 * State of the custom element.
 */
export type ElementData = {
  /**
   * Field state mapped by property name to property value.
   */
  fields: Record<string, string | number | boolean | undefined>;

  /**
   * Slot state mapped by slot name to slot (html) content.
   */
  slots: Record<string, string>;
};

export const EMPTY_ELEMENT_DATA: ElementData = {
  fields: {},
  slots: {},
};

export function prepareInitialData(element: Parsed.Element): ElementData {
  return {
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
  value: unknown
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
 * Maps the given form data by the given element definition to a stateful data object
 */
export function mapFormData(form: HTMLFormElement, element: Parsed.Element): ElementData {
  const data = new FormData(form);
  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    // the name consists of the group and the actual name, separated by a dot
    const [group, name] = key.split('.');

    // map slots
    if (group === 'slots') {
      return { ...acc, slots: { ...acc.slots, [name]: `${value}` } };
    }

    if (group === 'fields') {
      // map the field data
      const field = element.fields.get(name);
      if (field === undefined) return acc;

      // pass the key-value pair into the data set
      return { ...acc, fields: { ...acc.fields, [litKey(field)]: parseFieldValue(field, value) } };
    }

    return acc;
  }, EMPTY_ELEMENT_DATA);
}
