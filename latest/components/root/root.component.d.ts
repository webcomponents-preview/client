import type { CustomElementDeclaration } from 'custom-elements-manifest/schema.d.js';
import { LitElement, type TemplateResult } from 'lit';
import type { RootNavigation } from './root-navigation/root-navigation.component.js';
/**
 * @slot logo - Allows setting a custom logo to be displayed in the title.
 * @slot preview-controls - Can be used to inject additional preview controls.
 * @slot preview-frame - Used to be override the existing preview pane.
 * @slot preview-details - Can be used to inject additional preview detail panes.
 *
 * @cssprop --wcp-root-dark-background - The background color of the root element in dark mode.
 * @cssprop --wcp-root-dark-color - The text color of the text in the root element in dark mode.
 *
 * @cssprop --wcp-root-light-background - The background color of the root element in light mode.
 * @cssprop --wcp-root-light-color - The text color of the text in the root element in light mode.
 *
 * @emits wcp-root:active-element-changed - Fired when the active element changes. Carries the declaration of the new active element with it.
 */
export declare class Root extends LitElement {
    #private;
    static readonly styles: import("lit").CSSResult;
    private ready;
    private topbarPlugins;
    private navigationItems;
    readonly navigationRef: RootNavigation;
    /**
     * Flags the component to be displayed inline and not standalone. Requires the surrounding
     * layout to provide the necessary styles like for any other block element.
     */
    inline: boolean;
    /**
     * Allows hiding the splash screen.
     */
    hideSplash: boolean;
    /**
     * Allows to set a url to load a config file from.
     */
    configUrl?: string;
    /**
     * Defines the location of the custom element manifest file.
     */
    manifestUrl: string;
    handleSearchInput({ detail }: CustomEvent<string>): void;
    handleSplashTransitionEnd(event: Event): void;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    protected render(): TemplateResult;
}
declare global {
    interface HTMLElementEventMap {
        'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
    }
    interface HTMLElementTagNameMap {
        'wcp-root': Root;
    }
}
