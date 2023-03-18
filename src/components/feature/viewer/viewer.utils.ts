import type { CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';

export type CustomElementData = {
  members: Record<string, unknown>;
  slots: Record<string, string>;
};

export const EMPTY_ELEMENT_DATA = {
  members: {},
  slots: {},
} satisfies CustomElementData;

/**
 * Prepares a lit compatible template key for a given field
 */
export function litKey(field: CustomElementField): string {
  // set as property, if not reflected as attribute
  if (!('attribute' in field)) {
    return `.${field.name}`;
  }
  // set boolean attributes properly
  else if (field.type?.text.startsWith('boolean')) {
    return `?${field.attribute}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return field.attribute!;
}

export function prepareInitialElementData(element: CustomElementDeclaration): CustomElementData {
  return {
    members:
      element.members?.reduce((acc, member) => {
        if (member.kind === 'field' && member.privacy !== 'private' && !member.static) {
          const field = member as CustomElementField;
          const key = litKey(field);

          // prepare initial boolean values
          if (field.type?.text.startsWith('boolean')) {
            return { ...acc, [key]: field.default && field.default.startsWith('true') };
          }
          // set string based values if default is set
          if (field.default !== undefined) {
            return { ...acc, [key]: field.default ?? null };
          }
          // skip the element if no defaults given
          else {
            return acc;
          }
        }
        return acc;
      }, {}) ?? {},
    slots: element.slots?.reduce((acc, slot) => ({ ...acc, [slot.name]: '' }), {}) ?? {},
  };
}

export function parseMemberValue(
  input: Element | RadioNodeList,
  value: FormDataEntryValue
): string | number | boolean | undefined {
  // radio menus and selects have string based values (or null)
  if (input instanceof RadioNodeList || input instanceof HTMLSelectElement) {
    return value as string;
  } else if ('value' in input) {
    switch (input?.getAttribute('type')) {
      case 'checkbox':
        return (input as HTMLInputElement).checked;
      case 'number':
        return Number(value);
    }
  }
  return value as string;
}

export function mapMemberData(
  value: FormDataEntryValue,
  input: Element | RadioNodeList,
  field: CustomElementField
): [string, unknown] {
  return [litKey(field), parseMemberValue(input, value)];
}

export function mapSlotData(name: string, value: string): [string, string] {
  return [name, value];
}

export function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData {
  const data = new FormData(form);
  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    // the name consists of the group and the actual name, separated by a dot
    const [group, name] = key.split('.');
    // as we're mapping the form data, the name always has an element equivalent
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const input = form.elements.namedItem(key)!;
    const field = element.members?.find((member) => member.name === name) as CustomElementField;
    const [k, v] = group === 'slots' ? mapSlotData(name, value as string) : mapMemberData(value, input, field);
    // pass the key-value pair into the data set
    return { ...acc, [group]: { ...acc[group as keyof typeof acc], [k]: v } };
  }, EMPTY_ELEMENT_DATA);
}
