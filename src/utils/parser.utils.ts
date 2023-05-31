import type * as Parsed from '@/utils/parser.types.js';

/**
 * Prepares a lit compatible template key for a given field
 */
export function litKey(field: Parsed.Field): string {
  // set as property, if not reflected as attribute
  if (!field.hasAttribute) {
    return `.${field.name}`;
  }
  // set boolean attributes properly
  else if (field.isBoolean) {
    return `?${field.attribute}`;
  }
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return field.attribute!;
}
