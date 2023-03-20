import type { CustomElementDeclaration } from 'custom-elements-manifest/schema';
import { LitElement, type TemplateResult } from 'lit';
import { type Config } from '@/utils/config.utils';
declare const Root_base: (new (...args: any[]) => {
    colorScheme?: "light" | "dark" | undefined;
}) & typeof LitElement;
/**
 * @slot logo - Allows setting a custom logo to be displayed in the title.
 * @slot preview-controls - Can be used to inject additional preview controls.
 * @slot preview-frame - Used to be override the existing preview pane.
 * @slot preview-details - Can be used to inject additional preview detail panes.
 *
 * @cssprop --wcp-root-dark-background - The background color of the root element in dark mode
 * @cssprop --wcp-root-dark-color - The text color of the text in the root element in dark mode
 *
 * @cssprop --wcp-root-light-background - The background color of the root element in light mode
 * @cssprop --wcp-root-light-color - The text color of the text in the root element in light mode
 *
 * @emits wcp-root:active-element-changed - Fired when the active element changes. Carries the declaration of the new active element with it.
 * @emits wcp-root:manifest-loaded - Fired when the manifest is (re)loaded. This happens after the json is fetched and the containing elements are resolved.
 */
export declare class Root extends Root_base {
    #private;
    static readonly styles: import("lit").CSSResult;
    config?: Config;
    elements: CustomElementDeclaration[];
    navigation: Record<string, CustomElementDeclaration[]>;
    set title(title: string);
    get title(): string;
    /**
     * Flags the component to be displayed inline and not standalone. Requires the surrounding
     * layout to provide the necessary styles like for any other block element.
     */
    inline: boolean;
    /**
     * Allows to set a fallback group name for elements that do not have a `groups` property.
     * So this is the name of the group that will contain all elements unless the manifest is
     * generated with the optional `@webcomponents-preview/cem-plugin-grouping` plugin.
     */
    fallbackGroupName: string;
    /**
     * Sets the currently active element by its tag name. Will be updated at runtime and can
     * be preset with an initial value to define the active element at startup.
     */
    activeElement?: string;
    /**
     * Configure the initial preview tab to be displayed. Can be either `examples`, `readme` or `viewer`.
     */
    initialPreviewTab?: Config['initialPreviewTab'];
    /**
     * Allows to set a url to load a config file from.
     */
    set configUrl(configUrl: string);
    /**
     * Defines the location of the custom element manifest file.
     */
    set manifestUrl(manifestUrl: string);
    loadConfig(configUrl: string): Promise<void>;
    loadCustomElementsManifest(manifestUrl: string): Promise<void>;
    selectFallbackElement(): Promise<void>;
    getActiveElementDeclaration(elements: CustomElementDeclaration[]): CustomElementDeclaration | undefined;
    emitManifestLoaded(): void;
    emitActiveElementChanged(): void;
    handleHashChange: () => void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
        'wcp-root:manifest-loaded': CustomEvent<CustomElementDeclaration[]>;
    }
    interface HTMLElementTagNameMap {
        'wcp-root': Root;
    }
}
export {};
