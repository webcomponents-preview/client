import type * as CEM from 'custom-elements-manifest';

export type CustomElementDeclarationWithExamples = CEM.CustomElementDeclaration & { examples: string[] };
export type CustomElementDeclarationWithGroups = CEM.CustomElementDeclaration & { groups: string[] };
export type CustomElementDeclarationWithReadme = CEM.CustomElementDeclaration & { readme: string };
export type CustomElementDeclarationWithTagName = CEM.CustomElementDeclaration & { tagName: string[] };

export function isCustomElementDeclarationWithTagName(
  declaration?: CEM.Declaration
): declaration is CustomElementDeclarationWithTagName {
  return declaration !== undefined && 'customElement' in declaration && 'tagName' in declaration;
}

export function isCustomElementField(field?: CEM.ClassMember): field is CEM.CustomElementField {
  return field?.kind === 'field';
}

export const WRAPPED_STRING_REGEX = /^['"`](.*)['"`]$/;
export function unwrapString(value: string): string {
  return value.replace(WRAPPED_STRING_REGEX, '$1');
}

export function getEnumValues(field: CEM.CustomElementField): string[] {
  const parsed = field.type?.text?.split('|') ?? [];
  const trimmed = parsed.map((value) => value.trim());
  const unique = new Set(trimmed);
  return [...unique].filter((value) => value !== '');
}
