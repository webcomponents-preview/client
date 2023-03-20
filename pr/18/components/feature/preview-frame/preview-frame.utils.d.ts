import type { CustomElementDeclaration } from 'custom-elements-manifest';
export type PreviewFramePlugin<T extends CustomElementDeclaration = CustomElementDeclaration> = Element & {
    readonly name: string;
    readonly label: string;
    readonly available: boolean;
    element?: T;
};
export declare function isPreviewFramePlugin(element: Element): element is PreviewFramePlugin;
export declare function findAllPlugins(slot: HTMLSlotElement): PreviewFramePlugin[];
