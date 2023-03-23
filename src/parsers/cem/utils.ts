import type CEM from 'custom-elements-manifest';

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

export function unwrapString(value: string): string {
  return value.startsWith(`'`) ? value.slice(1, -1) : value;
}

export function getEnumValues(field: CEM.CustomElementField): string[] {
  return field.type?.text.split(' | ') ?? [];
}
