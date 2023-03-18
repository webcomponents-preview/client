import type { CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';

export type CustomElementData = {
  members: Record<string, unknown>;
  slots: Record<string, string>;
};

export const EMPTY_ELEMENT_DATA = {
  members: {},
  slots: {},
} satisfies CustomElementData;

export function parseKey(input: Element | RadioNodeList, name: string, field: CustomElementField): string {
  if (!('attribute' in field)) {
    return `.${name}`;
  } else if (input instanceof RadioNodeList) {
    return field.attribute!;
  } else if (input?.getAttribute('type') === 'checkbox') {
    return `?${field.attribute}`;
  }
  return field.attribute!;
}

export function parseValue(
  input: Element | RadioNodeList,
  value: FormDataEntryValue
): string | number | boolean | undefined {
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
  name: string,
  value: FormDataEntryValue,
  input: Element | RadioNodeList,
  field: CustomElementField
): [string, unknown] {
  const parsedKey = parseKey(input, name, field);
  const parsedValue = parseValue(input, value);
  return [parsedKey, parsedValue];
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
    const [k, v] = group === 'slots' ? mapSlotData(name, value as string) : mapMemberData(name, value, input, field);
    // pass the key-value pair into the data set
    return { ...acc, [group]: { ...acc[group as keyof typeof acc], [k]: v } };
  }, EMPTY_ELEMENT_DATA);
}
