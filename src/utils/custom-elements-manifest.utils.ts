import type { CustomElementDeclaration, Declaration, Package as Manifest } from 'custom-elements-manifest/schema';

export type CustomElementDeclarationWithExamples = CustomElementDeclaration & { examples: string[] };
export type CustomElementDeclarationWithGroups = CustomElementDeclaration & { groups: string[] };
export type CustomElementDeclarationWithReadme = CustomElementDeclaration & { readme: string };
export type CustomElementDeclarationWithTagName = CustomElementDeclaration & { tagName: string[] };

export function isCustomElementDeclarationWithTagName(
  declaration?: Declaration
): declaration is CustomElementDeclarationWithTagName {
  return declaration !== undefined && 'customElement' in declaration && 'tagName' in declaration;
}

export function getCustomElements(manifest: Manifest, exclude: string[] = []): CustomElementDeclaration[] {
  return manifest.modules
    .flatMap((module) => module.declarations)
    .filter(isCustomElementDeclarationWithTagName)
    .filter((element) => !exclude.includes(element.tagName));
}

export function groupCustomElements(
  elements: CustomElementDeclaration[],
  fallbackGroupName: string
): Record<string, CustomElementDeclaration[]> {
  return elements.reduce((acc, element) => {
    let groups = [fallbackGroupName];
    if (hasGroups(element)) groups = element.groups;
    return groups.reduce((all, group) => ({ ...all, [group]: [...(all[group] ?? []), element] }), acc);
  }, {} as Record<string, CustomElementDeclaration[]>);
}

export function hasExamples(
  declaration?: CustomElementDeclaration
): declaration is CustomElementDeclarationWithExamples {
  return (
    declaration !== undefined &&
    'examples' in declaration &&
    (declaration as CustomElementDeclarationWithExamples).examples.length > 0
  );
}

export function hasGroups(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithGroups {
  return declaration !== undefined && 'groups' in declaration;
}

export function hasReadme(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithReadme {
  return declaration !== undefined && 'readme' in declaration;
}

export function hasTagName(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithTagName {
  return declaration !== undefined && 'tagName' in declaration;
}

export function getNiceName(declaration: CustomElementDeclaration): string {
  return declaration.name.replace(/([a-z])([A-Z])/g, '$1 $2');
}

export function getNiceUrl(declaration: CustomElementDeclaration): string {
  return declaration.tagName ?? declaration.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
}
