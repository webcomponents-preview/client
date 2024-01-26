import type * as CEM from 'custom-elements-manifest';
export type CustomElementDeclarationWithExamples = CEM.CustomElementDeclaration & {
    examples: string[];
};
export type CustomElementDeclarationWithGroups = CEM.CustomElementDeclaration & {
    groups: string[];
};
export type CustomElementDeclarationWithReadme = CEM.CustomElementDeclaration & {
    readme: string;
};
export type CustomElementDeclarationWithTagName = CEM.CustomElementDeclaration & {
    tagName: string[];
};
export declare function isCustomElementDeclarationWithTagName(declaration?: CEM.Declaration): declaration is CustomElementDeclarationWithTagName;
export declare function isCustomElementField(field?: CEM.ClassMember): field is CEM.CustomElementField;
export declare const WRAPPED_STRING_REGEX: RegExp;
export declare function unwrapString(value: string): string;
export declare function getEnumValues(field: CEM.CustomElementField): string[];
