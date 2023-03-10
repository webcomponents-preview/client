import type { CustomElementDeclaration, Declaration, Package as Manifest } from 'custom-elements-manifest/schema';

export type CustomElementDeclarationWithExamples = CustomElementDeclaration & { examples: string[] };
export type CustomElementDeclarationWithReadme = CustomElementDeclaration & { readme: string };
export type CustomElementDeclarationWithTagName = CustomElementDeclaration & { tagName: string[] };

export function isCustomElementDeclaration(declaration?: Declaration): declaration is CustomElementDeclaration {
  return declaration !== undefined && 'customElement' in declaration;
}

export function getCustomElements(manifest: Manifest): CustomElementDeclaration[] {
  return manifest.modules.flatMap((module) => module.declarations).filter(isCustomElementDeclaration);
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
