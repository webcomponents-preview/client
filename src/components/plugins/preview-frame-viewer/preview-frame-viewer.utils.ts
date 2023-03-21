import type { ClassMember, CustomElementDeclaration, CustomElementField } from 'custom-elements-manifest';

export type CustomElementData = {
  members: Record<string, unknown>;
  slots: Record<string, string>;
};

export const EMPTY_ELEMENT_DATA = {
  members: {},
  slots: {},
} satisfies CustomElementData;

/**
 * Derives a given fields meta data by parsing the CustomElementField
 */
export class Field {
  private _field!: CustomElementField;
  private _types!: string[];

  get data(): CustomElementField {
    return this._field;
  }

  get isBoolean(): boolean {
    return this._types[0] === 'boolean';
  }
  get isNumber(): boolean {
    return this._types[0] === 'number';
  }
  get isString(): boolean {
    return this._types[0] === 'string' || this._types[0]?.startsWith(`'`);
  }
  get isEnum(): boolean {
    return this._types.length > 0 && this._types[1] !== 'undefined';
  }
  get isArray(): boolean {
    return this._types[0]?.endsWith('[]');
  }
  get isObject(): boolean {
    return !!this._field.type && !this.isBoolean && !this.isNumber && !this.isString && !this.isArray;
  }

  get isOptional(): boolean {
    return !!this._field.type?.text.endsWith(' | undefined');
  }
  get hasAttribute(): boolean {
    return 'attribute' in this._field && !!this._field.reflects;
  }
  get hasDefault(): boolean {
    return this._field.default !== undefined;
  }
  get hasDescription(): boolean {
    return this._field.default !== undefined;
  }

  get isStatic(): boolean {
    return !!this._field.static;
  }
  get isPublic(): boolean {
    return !this._field.privacy || this._field.privacy === 'public';
  }
  get isPrivate(): boolean {
    return this._field.privacy === 'private';
  }
  get isProtected(): boolean {
    return this._field.privacy === 'protected';
  }

  constructor(field: CustomElementField) {
    this._field = field;
    this._types = field.type?.text.split(' | ') ?? [];
  }
}

export function isCustomElementField(field?: ClassMember): field is CustomElementField {
  return field?.kind === 'field';
}

/**
 * Prepares a lit compatible template key for a given field
 */
export function litKey(field: Field): string {
  // set as property, if not reflected as attribute
  if (!field.hasAttribute) {
    return `.${field.data.name}`;
  }
  // set boolean attributes properly
  else if (field.isBoolean) {
    return `?${field.data.attribute}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return field.data.attribute!;
}

export function prepareInitialElementData(element: CustomElementDeclaration): CustomElementData {
  return {
    members:
      element.members?.reduce((acc, member) => {
        if (isCustomElementField(member) && member.privacy !== 'private' && !member.static) {
          const field = new Field(member as CustomElementField);
          const key = litKey(field);

          // prepare initial boolean values
          if (field.isBoolean) {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            return { ...acc, [key]: field.hasDefault && field.data.default!.startsWith('true') };
          }
          // set string based values if default is set
          if (field.hasDefault) {
            return { ...acc, [key]: field.data.default ?? null };
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
  value: FormDataEntryValue,
  field: Field
): FormDataEntryValue | string | number | boolean | undefined {
  if (field.isBoolean) {
    return value === 'on';
  }
  if (field.isNumber) {
    return Number(value);
  }
  if (field.isString) {
    return (value as string).trim() ? value : undefined;
  }
}

export function mapFormData(form: HTMLFormElement, element: CustomElementDeclaration): CustomElementData {
  const data = new FormData(form);
  return Array.from(data.entries()).reduce((acc, [key, value]) => {
    // the name consists of the group and the actual name, separated by a dot
    const [group, name] = key.split('.');

    // map slots
    if (group === 'slots') {
      return { ...acc, [group]: { ...acc[group as keyof typeof acc], [name]: value } };
    }

    // map the field data
    const member = element.members?.find((member) => member.name === name);
    if (!isCustomElementField(member)) return acc;

    // pass the key-value pair into the data set
    const field = new Field(member);
    return { ...acc, [group]: { ...acc[group as keyof typeof acc], [litKey(field)]: parseMemberValue(value, field) } };
  }, EMPTY_ELEMENT_DATA);
}
