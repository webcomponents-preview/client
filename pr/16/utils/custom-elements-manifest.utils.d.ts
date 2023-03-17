import type { CustomElementDeclaration, Declaration, Package as Manifest } from 'custom-elements-manifest/schema';
export type CustomElementDeclarationWithExamples = CustomElementDeclaration & {
    examples: string[];
};
export type CustomElementDeclarationWithGroups = CustomElementDeclaration & {
    groups: string[];
};
export type CustomElementDeclarationWithReadme = CustomElementDeclaration & {
    readme: string;
};
export type CustomElementDeclarationWithTagName = CustomElementDeclaration & {
    tagName: string[];
};
export declare function isCustomElementDeclaration(declaration?: Declaration): declaration is CustomElementDeclaration;
export declare function getCustomElements(manifest: Manifest): CustomElementDeclaration[];
export declare function groupCustomElements(elements: CustomElementDeclaration[], fallbackGroupName: string): Record<string, CustomElementDeclaration[]>;
export declare function hasExamples(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithExamples;
export declare function hasGroups(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithGroups;
export declare function hasReadme(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithReadme;
export declare function hasTagName(declaration?: CustomElementDeclaration): declaration is CustomElementDeclarationWithTagName;
export declare function getNiceName(declaration: CustomElementDeclaration): string;
export declare function getNiceUrl(declaration: CustomElementDeclaration): string;
