declare module "utils/color-scheme.utils" {
    import { LitElement } from 'lit';
    class ColorSchemableInterface {
        colorScheme?: 'light' | 'dark';
    }
    global {
        interface WindowEventMap {
            'wcp-color-scheme:toggle': CustomEvent<'dark' | 'light' | null>;
        }
    }
    type Constructor<T> = new (...args: any[]) => T;
    export const ColorSchemable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ColorSchemableInterface> & T;
}
declare module "components/feature/markdown-example/markdown-example.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const MarkdownExample_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Shows an inline code example and a preview of the element in the readme.
     * This is used in the markdown formatter to render `html` examples.
     *
     * In most cases you don't want to use this component directly, but rather use the `wcp-readme` element instead,
     * or the enhanced markdown renderer which instruments this element under the hood. It can be used with the
     * `renderMarkdown` function provided by the `@/utils/markdown.utils`.
     *
     * @example
     * ### Shows arbitrary HTML code example
     *
     * ```html
     * <wcp-markdown-example>
     *   <pre slot="code">
     * &lt;h1&gt;Readme&lt;/h1&gt;
     * &lt;p&gt;Some readme content&lt;/p&gt;
     *   </pre>
     *   <div slot="preview">
     *     <h1>Readme</h1>
     *     <p>Some readme content</p>
     *   </div>
     * </wcp-markdown-example>
     * ```
     *
     * @slot code - Code example
     * @slot preview - Rendered example preview
     *
     * @cssprop --wcp-markdown-example-spacing - Inner padding of the example
     * @cssprop --wcp-markdown-example-border-radius - Border radius of the example
     * @cssprop --wcp-markdown-example-border-width - Border width of the example
     *
     * @cssprop --wcp-markdown-example-dark-border-color - Border color of the example in dark mode
     * @cssprop --wcp-markdown-example-light-border-color - Border color of the example in light mode
     */
    export class MarkdownExample extends MarkdownExample_base {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-markdown-example': MarkdownExample;
        }
    }
}
declare module "components/feature/navigation/navigation.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Navigation_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * @example
     * ### Usage with headline
     *
     * ```html
     * <wcp-navigation headline="Navigation">
     *   <wcp-navigation-item href="/home">Home</wcp-navigation-item>
     *   <wcp-navigation-item href="/about">About</wcp-navigation-item>
     * </wcp-navigation>
     * ```
     *
     * @slot - Default slot for navigation items
     *
     * @cssprop --wcp-navigation-spacing - Spacing between navigation and headline
     * @cssprop --wcp-navigation-spacing-items - Spacing between navigation items
     * @cssprop --wcp-navigation-spacing-headline - Inner padding of the navigation headline
     * @cssprop --wcp-navigation-dark-border-color - Border color of the navigation headline in dark mode
     * @cssprop --wcp-navigation-light-border-color - Border color of the navigation headline in light mode
     * @cssprop --wcp-navigation-headline-size - Font size of the navigation headline
     * @cssprop --wcp-navigation-headline-weight - Font weight of the navigation headline
     * @cssprop --wcp-navigation-headline-spacing - Letter spacing of the navigation headline
     * @cssprop --wcp-navigation-headline-dark-background - Background color of the navigation headline in dark mode
     * @cssprop --wcp-navigation-headline-light-background - Background color of the navigation headline in light mode
     */
    export class Navigation extends Navigation_base {
        static readonly styles: import("lit").CSSResult;
        headline?: string;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-navigation': Navigation;
        }
    }
}
declare module "components/feature/navigation-item/navigation-item.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const NavigationItem_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * @example
     * ### Non-interactive
     *
     * This will probably only be used for the active item.
     *
     * ```html
     * <wcp-navigation-item>
     *   Non-interactive
     * </wcp-navigation-item>
     * ```
     *
     * @example
     * ### With link
     *
     * ```html
     * <wcp-navigation-item href="/home">
     *   Home
     * </wcp-navigation-item>
     * ```
     *
     * @slot - Default slot for contents
     *
     * @cssprop --wcp-navigation-item-spacing - Inner padding of the item
     *
     * @cssprop --wcp-navigation-item-dark-passive-background - Background color of the item when non interactive in dark mode
     * @cssprop --wcp-navigation-item-dark-hover-background - Background color of the item when hovered in dark mode
     * @cssprop --wcp-navigation-item-dark-active-background - Background color of the item when active in dark mode
     *
     * @cssprop --wcp-navigation-item-dark-passive-color - Text color of the item when non interactive in dark mode
     * @cssprop --wcp-navigation-item-dark-hover-color - Text color of the item when hovered in dark mode
     * @cssprop --wcp-navigation-item-dark-active-color - Text color of the item when active in dark mode
     *
     * @cssprop --wcp-navigation-item-light-passive-background - Background color of the item when non interactive in light mode
     * @cssprop --wcp-navigation-item-light-hover-background - Background color of the item when hovered in light mode
     * @cssprop --wcp-navigation-item-light-active-background - Background color of the item when active in light mode
     *
     * @cssprop --wcp-navigation-item-light-passive-color - Text color of the item when non interactive in light mode
     * @cssprop --wcp-navigation-item-light-hover-color - Text color of the item when hovered in light mode
     * @cssprop --wcp-navigation-item-light-active-color - Text color of the item when active in light mode
     */
    export class NavigationItem extends NavigationItem_base {
        static readonly styles: import("lit").CSSResult;
        active: boolean;
        href?: string;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-navigation-item': NavigationItem;
        }
    }
}
declare module "components/feature/preview-controls/preview-controls.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const PreviewControls_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-preview-controls></wcp-preview-controls>
     * ```
     * @example
     * ### Usage with controls
     *
     * ```html
     * <wcp-preview-controls>
     *   <wcp-preview-controls-viewport></wcp-preview-controls-viewport>
     * </wcp-preview-controls>
     * ```
     *
     * @slot - Default slot for navigation items
     *
     * @cssprop --wcp-preview-controls-dark-background - Background color of the preview controls in dark mode
     * @cssprop --wcp-preview-controls-dark-color - Text color of the preview controls in dark mode
     *
     * @cssprop --wcp-preview-controls-light-background - Background color of the preview controls in light mode
     * @cssprop --wcp-preview-controls-light-color - Text color of the preview controls in light mode
     *
     * @cssprop --wcp-preview-controls-height - Overall height of the preview controls nav bar
     * @cssprop --wcp-preview-controls-spacing - Inner spacing, used as padding of the controls
     */
    export class PreviewControls extends PreviewControls_base {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview-controls': PreviewControls;
        }
    }
}
declare module "utils/config.utils" {
    export type Config = {
        title: string;
        excludeElements: string[];
        fallbackGroupName: string;
        initialActiveElement: string;
        initialPreviewTab: 'examples' | 'readme' | 'viewer';
        additionalReadmeGroupName: string;
        additionalReadmes: {
            name: string;
            url: string;
        }[];
    };
    global {
        interface Window {
            wcp: {
                config: Promise<Config>;
            };
        }
    }
    export const loadConfig: (url?: string) => Promise<Config>;
    export const getConfig: (url?: string) => Promise<Config>;
}
declare module "utils/parser.types" {
    /**
     * Wraps custom element field declarations to provide additional meta data.
     */
    export type GenericField<T> = {
        name: string;
        isBoolean: T extends boolean ? true : false;
        isNumber: T extends number ? true : false;
        isString: T extends string ? true : false;
        isArray: T extends [] ? true : false;
        isEnum: T extends string ? boolean : false;
        isObject: boolean;
        /**
         * Indicates if the field can be controled by the viewer.
         */
        isControlable: boolean;
        isOptional: boolean;
        hasAttribute: boolean;
        attribute?: string;
        hasDefault: boolean;
        default?: T;
        hasDescription: boolean;
        description?: string;
        isStatic: boolean;
        isPublic: boolean;
        isPrivate: boolean;
        isProtected: boolean;
        enumValues: string[];
        new (element: object): Field;
    };
    export type Field = GenericField<boolean> | GenericField<number> | GenericField<string> | GenericField<[]> | GenericField<unknown>;
    export type Slot = {
        /**
         * Contains the default type of the slot.
         */
        default: string;
        /**
         * Default slots should have an empty name ('').
         */
        name: '' | string;
        new (element: object): Slot;
    } & ({
        hasDescription: true;
        description: string;
    } | {
        hasDescription: false;
        description: undefined;
    });
    /**
     * Wraps custom element declarations to provide additional meta data.
     */
    export type Element = {
        /**
         * Contains all fields, keyed by their property name.
         */
        fields: Map<string, Field>;
        hasFields: boolean;
        /**
         * Contains all slots, keyed by their name.
         * The default slot always has an empty name ('').
         */
        slots: Map<string, Slot>;
        hasSlots: boolean;
        name: string;
        tagName: string;
        getNiceName(): string;
        getNiceUrl(): string;
        new (element: object): Element;
    } & ({
        hasGroups: true;
        groups: [string, ...string[]];
    } | {
        hasGroups: false;
        groups: [];
    }) & ({
        hasReadme: true;
        readme: string;
    } | {
        hasReadme: false;
        readme: undefined;
    }) & ({
        hasExamples: true;
        examples: [string, ...string[]];
    } | {
        hasExamples: false;
        examples: [];
    });
    /**
     * Wraps a manifest to provide additional meta data.
     */
    export type Manifest = {
        /**
         * Contains all custom elements, keyed by their tag name.
         */
        elements: Map<string, Element>;
        /**
         * Delivers the elements grouped.
         */
        getGroupedElements(fallbackGroupName: string): Map<string, Element[]>;
    };
    export type Parser = {
        /**
         * Parses the given data to a manifest with some meta data.
         * Allow the exclusion of certain elements by their tag name.
         */
        new (data: object, exclude?: string[]): Manifest;
    };
}
declare module "components/feature/preview-frame/preview-frame.utils" {
    import type * as Parsed from "utils/parser.types";
    /**
     * Each preview frame plugin must implement this interface.
     * Additionally, the plugin may emits an event, notifying about
     * availablitity changes. This custom event should be named
     * `wcp-preview-plugin:availability-change` and hould carry a
     * boolean flag about its availability in the `detail` property.
     */
    export type PreviewFramePlugin = Element & {
        readonly name: string;
        readonly label: string;
        readonly available: boolean;
        element?: Parsed.Element;
    };
    export function isPreviewFramePlugin(element: Element): element is PreviewFramePlugin;
    export function findAllPlugins(slot: HTMLSlotElement): PreviewFramePlugin[];
}
declare module "components/feature/preview-frame/preview-frame.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { Config } from "utils/config.utils";
    const PreviewFrame_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-preview-frame></wcp-preview-frame>
     * ```
     *
     * @slot - The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs.
     *
     * @cssprop --wcp-preview-frame-dark-background - Background color of the preview frame in dark mode
     * @cssprop --wcp-preview-frame-dark-border-color - Border color of the example section in dark mode
     * @cssprop --wcp-preview-frame-dark-color - Text color of the preview frame in dark mode
     *
     * @cssprop --wcp-preview-frame-light-background - Background color of the preview frame in light mode
     * @cssprop --wcp-preview-frame-light-border-color - Border color of the example section in light mode
     * @cssprop --wcp-preview-frame-light-color - Text color of the preview frame in light mode
     *
     * @cssprop --wcp-preview-frame-border-radius - Border radius of the preview frame
     * @cssprop --wcp-preview-frame-border-width - Border width of the preview frame
     * @cssprop --wcp-preview-frame-distance - Outer margin of the preview frame
     * @cssprop --wcp-preview-frame-spacing - Inner padding of the preview frame
     */
    export class PreviewFrame extends PreviewFrame_base {
        static readonly styles: import("lit").CSSResult;
        private _plugins;
        private _tabs;
        private _activeTab?;
        initialPreviewTab?: Config['initialPreviewTab'];
        protected handleSlotChange(event: Event): void;
        protected handleAvailabilityChange(): void;
        protected handleActiveTabChange(event: CustomEvent<string>): void;
        protected preparePluginTabs(): void;
        protected alignActiveTab(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview-frame': PreviewFrame;
        }
    }
}
declare module "utils/markdown.utils" {
    export function getCodeExample(slot: HTMLSlotElement): string;
    export function renderMarkdown(mardown: string, addCodePreview?: boolean): string;
}
declare module "components/feature/readme/readme.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Readme_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Displays a Readme file by its URL.
     *
     * @element wcp-readme
     *
     * @cssprop --wcp-readme-dark-border-color - Border color of the readme in dark mode.
     * @cssprop --wcp-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
     *
     * @cssprop --wcp-readme-light-border-color - Border color of the readme in light mode.
     * @cssprop --wcp-readme-light-highlight-background - Background color of highlighted table rows in light mode.
     *
     * @example
     * ```html
     * <wcp-readme markdown="# Hello _World_!"></wcp-readme>
     * ```
     */
    export class Readme extends Readme_base {
        static readonly styles: import("lit").CSSResult;
        readonly showCodePreview = false;
        readonly markdown = "";
        connectedCallback(): Promise<void>;
        createRenderRoot(): this;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-readme': Readme;
        }
    }
}
declare module "components/feature/readme-frame/readme-frame.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * @example
     * ```html
     * <wcp-readme-frame></wcp-readme-frame>
     * ```
     *
     * @slot - The readme frame is usually filled with a readme element.
     *
     * @cssprop --wcp-readme-frame-distance - Outer margin of the preview frame
     * @cssprop --wcp-readme-frame-spacing - Inner padding of the preview frame
     */
    export class ReadmeFrame extends LitElement {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-readme-frame': ReadmeFrame;
        }
    }
}
declare module "components/feature/toggle-color-scheme/toggle-color-scheme.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const ToggleColorScheme_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Shows a button to toggle the desired color-scheme.
     *
     * @example
     * ```html
     * <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
     * ```
     */
    export class ToggleColorScheme extends ToggleColorScheme_base {
        static readonly styles: import("lit").CSSResult;
        colorScheme: "light" | "dark";
        handleButtonClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-toggle-color-scheme': ToggleColorScheme;
        }
    }
}
declare module "components/feature/toggle-sidebar/toggle-sidebar.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * Shows a button to toggle sidebar.
     *
     * @example
     * ```html
     * <wcp-toggle-sidebar></wcp-toggle-sidebar>
     * ```
     */
    export class ToggleSidebar extends LitElement {
        static readonly styles: import("lit").CSSResult;
        handleButtonClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-toggle-sidebar': ToggleSidebar;
        }
    }
}
declare module "components/layout/aside/aside.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Aside_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * To toggle the side bar remotely, you can dispatch a custom event on the global window object:
     * ```js
     * window.dispatchEvent(new CustomEvent('wcp-aside:toggle'));
     * ```
     * You may pass an optional boolean value to the event to toggle the side bar to a specific state:
     * ```js
     * window.dispatchEvent(new CustomEvent('wcp-aside:toggle', { detail: true }));
     * ```
     *
     * @slot - Projects elements aside the main content
     *
     * @event wcp-aside-toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
     *
     * @cssprop --wcp-aside-max-width - The maximum width of the aside bar when visible
     * @cssprop --wcp-aside-spacing - Inner padding of the aside bar
     * @cssprop --wcp-aside-toggle-size - The size of the toggle button
     *
     * @cssprop --wcp-aside-dark-background - The background color of the side bar in dark mode
     * @cssprop --wcp-aside-dark-color - The color of the side bar in dark mode
     *
     * @cssprop --wcp-aside-light-background - The background color of the side bar in light mode
     * @cssprop --wcp-aside-light-color - The color of the side bar in light mode
     */
    export class Aside extends Aside_base {
        static readonly styles: import("lit").CSSResult;
        /**
         * Used to toggle the width of the aside bar
         */
        hidden: boolean;
        /**
         * Presets the aria role to `complementary` as we do not use te aside element directly
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/complementary_role
         */
        role: string;
        emitToggled(): void;
        handleButtonClick(): void;
        listenAsideToggle: ({ detail }: CustomEvent<boolean | null>) => void;
        connectedCallback(): void;
        disconnectedCallback(): void;
        protected render(): TemplateResult;
    }
    global {
        interface WindowEventMap {
            'wcp-aside:toggle': CustomEvent<boolean | null>;
        }
        interface HTMLElementEventMap {
            'wcp-aside:toggled': CustomEvent<boolean>;
        }
        interface HTMLElementTagNameMap {
            'wcp-aside': Aside;
        }
    }
}
declare module "components/layout/layout/layout.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * @example
     * ```html
     * <wcp-layout>
     *   <nav slot="aside">To the left!</nav>
     *   <article>Me the important content!</article>
     * </wcp-layout>
     * ```
     *
     * @slot aside - Projects elements aside the main content
     * @slot - Receives the content of the main section
     */
    export class Layout extends LitElement {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-layout': Layout;
        }
    }
}
declare module "components/layout/main/main.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * @slot - Projects elements to the main content
     */
    export class Main extends LitElement {
        static readonly styles: import("lit").CSSResult;
        /**
         * Presets the aria role to `main` as we do not use te main element directly
         * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/main_role
         */
        role: string;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-main': Main;
        }
    }
}
declare module "components/plugins/preview-frame-examples/preview-frame-examples.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type * as Parsed from "utils/parser.types";
    import type { PreviewFramePlugin } from "components/feature/preview-frame/preview-frame.utils";
    const PreviewFrameExamples_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Shows the examples of a custom element manifest.
     *
     * @cssprop --wcp-preview-frame-examples-spacing - Spacing between examples.
     */
    export class PreviewFrameExamples extends PreviewFrameExamples_base implements PreviewFramePlugin {
        static readonly styles: import("lit").CSSResult;
        private _element?;
        available: boolean;
        set element(element: Parsed.Element | undefined);
        readonly name = "examples";
        readonly label = "Examples";
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-preview-plugin:availability-change': CustomEvent<boolean>;
        }
        interface HTMLElementTagNameMap {
            'wcp-preview-frame-examples': PreviewFrameExamples;
        }
    }
}
declare module "components/plugins/preview-frame-readme/preview-frame-readme.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type * as Parsed from "utils/parser.types";
    import type { PreviewFramePlugin } from "components/feature/preview-frame/preview-frame.utils";
    const PreviewFrameReadme_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    export class PreviewFrameReadme extends PreviewFrameReadme_base implements PreviewFramePlugin {
        static readonly styles: import("lit").CSSResult;
        private _element?;
        available: boolean;
        set element(element: Parsed.Element | undefined);
        readonly name = "readme";
        readonly label = "Readme";
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-preview-plugin:availability-change': CustomEvent<boolean>;
        }
        interface HTMLElementTagNameMap {
            'wcp-preview-frame-readme': PreviewFrameReadme;
        }
    }
}
declare module "utils/parser.utils" {
    import type * as Parsed from "utils/parser.types";
    /**
     * Prepares a lit compatible template key for a given field
     */
    export function litKey(field: Parsed.Field): string;
}
declare module "components/plugins/preview-frame-viewer/preview-frame-viewer.utils" {
    import type * as Parsed from "utils/parser.types";
    /**
     * State of the custom element.
     */
    export type ElementData = {
        /**
         * Field state mapped by property name to property value.
         */
        fields: Record<string, string | number | boolean | undefined>;
        /**
         * Slot state mapped by slot name to slot (html) content.
         */
        slots: Record<string, string>;
    };
    export const EMPTY_ELEMENT_DATA: ElementData;
    export function prepareInitialData(element: Parsed.Element): ElementData;
    /**
     * Retrieve the current value of a given field parsed to the correct type
     */
    export function parseFieldValue(field: Parsed.Field, value: unknown): ElementData['fields'][keyof ElementData['fields']];
    /**
     * Maps the given form data by the given element definition to a stateful data object
     */
    export function mapFormData(form: HTMLFormElement, element: Parsed.Element): ElementData;
}
declare module "components/plugins/preview-frame-viewer/preview-frame-viewer.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type * as Parsed from "utils/parser.types";
    import type { PreviewFramePlugin } from "components/feature/preview-frame/preview-frame.utils";
    const PreviewFrameViewer_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    export class PreviewFrameViewer extends PreviewFrameViewer_base implements PreviewFramePlugin {
        #private;
        static readonly styles: import("lit").CSSResult;
        private _elementData?;
        set element(element: Parsed.Element | undefined);
        readonly available = true;
        readonly name = "viewer";
        readonly label = "Viewer";
        protected getElementReference(): Element | undefined;
        protected handleControlsInput(event: InputEvent): void;
        protected renderSlots(): TemplateResult;
        protected renderFieldControl(field: Parsed.Field): TemplateResult;
        protected renderSlotControl(slot: Parsed.Slot): TemplateResult;
        protected renderElement(): TemplateResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview-frame-viewer': PreviewFrameViewer;
        }
    }
}
declare module "components/plugins/preview-frame-viewer/preview-frame-viewer-stage/preview-frame-viewer-stage.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * @example
     * ```html
     * <wcp-preview-frame-viewer-stage>
     *   <wcp-button>Example button</wcp-button>
     * </wcp-preview-frame-viewer-stage>
     * ```
     */
    export class PreviewFrameViewerStage extends LitElement {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview-frame-viewer-stage': PreviewFrameViewerStage;
        }
    }
}
declare module "parsers/cem/utils" {
    import type CEM from 'custom-elements-manifest';
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
    export function isCustomElementDeclarationWithTagName(declaration?: CEM.Declaration): declaration is CustomElementDeclarationWithTagName;
    export function isCustomElementField(field?: CEM.ClassMember): field is CEM.CustomElementField;
    export function unwrapString(value: string): string;
    export function getEnumValues(field: CEM.CustomElementField): string[];
}
declare module "parsers/cem/1.0.0/cem-field" {
    import type { Field } from "utils/parser.types";
    export const CemField: Field;
}
declare module "parsers/cem/1.0.0/cem-slot" {
    import type { Slot } from "utils/parser.types";
    export const CemSlot: Slot;
}
declare module "parsers/cem/1.0.0/cem-element" {
    import type { Element } from "utils/parser.types";
    export const CemElement: Element;
}
declare module "parsers/cem/1.0.0/cem-parser" {
    import type { Parser } from "utils/parser.types";
    export const CemParser: Parser;
}
declare module "parsers/cem/parse" {
    import type { Manifest } from "utils/parser.types";
    /**
     * Parses given manifest data with the appropriate CEM parser.
     * Will throw an error if no parser for the given schema version is found, or if the given data is invalid.
     */
    export const parseCEM: (data: object, exclude?: string[]) => Manifest;
}
declare module "components/root/root.component" {
    import type { CustomElementDeclaration } from 'custom-elements-manifest/schema';
    import { LitElement, type TemplateResult } from 'lit';
    import { Config } from "utils/config.utils";
    import type { Element, Manifest } from "utils/parser.types";
    const Root_base: (new (...args: any[]) => {
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
    export class Root extends Root_base {
        #private;
        static readonly styles: import("lit").CSSResult;
        config?: Config;
        manifest?: Manifest;
        initialPreviewTab?: string;
        navigation?: Map<string, Element[]>;
        readmesGroup: string;
        readmes: {
            name: string;
            url: string;
        }[];
        /**
         * Flags the component to be displayed inline and not standalone. Requires the surrounding
         * layout to provide the necessary styles like for any other block element.
         */
        inline: boolean;
        /**
         * Allows to set a url to load a config file from.
         */
        configUrl?: string;
        /**
         * Defines the location of the custom element manifest file.
         */
        manifestUrl: string;
        loadConfig(configUrl?: string): Promise<void>;
        loadCustomElementsManifest(manifestUrl: string): Promise<void>;
        emitManifestLoaded(): void;
        connectedCallback(): Promise<void>;
        protected renderReadme(url: string): TemplateResult;
        protected renderElement(tagName: string): TemplateResult;
        protected isActiveRoute(route: string): boolean;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
            'wcp-root:manifest-loaded': CustomEvent<CustomElementDeclaration[]>;
        }
        interface HTMLElementTagNameMap {
            'wcp-root': Root;
        }
    }
}
declare module "components/ui/button/button.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import 'element-internals-polyfill';
    const Button_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Shows a button element.
     *
     * @example
     * ## Default button
     *
     * ```html
     * <wcp-button>Click me!</wcp-button>
     * ```
     *
     * @example
     * ## Disabled button
     *
     * ```html
     * <wcp-button disabled>Try to click me!</wcp-button>
     * ```
     *
     * @example
     * ## Button with icon
     *
     * ```html
     * <wcp-button kind="icon">
     *  <wcp-icon name="menu"></wcp-icon>
     * </wcp-button>
     * ```
     *
     * @example
     * ## Force active state
     *
     * ```html
     * <wcp-button class="active">Link</wcp-button>
     * ```
     *
     * @example
     * ## Use as link
     *
     * ```html
     * <wcp-button href=".">Link</wcp-button>
     * ```
     *
     * @example
     * ## Use as native submit button in form
     *
     * ```html
     * <form onsubmit="alert('Submit!'); return false">
     *  <wcp-button type="submit">Submit</wcp-button>
     * </form>
     * ```
     *
     * @example
     * ## Use as native reset button in form
     *
     * ```html
     * <form onreset="alert('Reset!'); return false">
     *   <wcp-button type="reset">Reset</wcp-button>
     * </form>
     * ```
     *
     * @slot {Some <i>Button</i>} - Default slot for the button content
     *
     * @cssprop --wcp-button-dark-passive-background - Background color of the button if non interactive in dark mode
     * @cssprop --wcp-button-dark-passive-border-color - Border color of the button if non interactive in dark mode
     * @cssprop --wcp-button-dark-passive-color - Text color of the button if non interactive in dark mode
     *
     * @cssprop --wcp-button-dark-hover-background - Background color of the button if hovered in dark mode
     * @cssprop --wcp-button-dark-hover-border-color - Border color of the button if hovered in dark mode
     * @cssprop --wcp-button-dark-hover-color - Text color of the button if hovered in dark mode
     *
     * @cssprop --wcp-button-dark-active-background - Background color of the button if active in dark mode
     * @cssprop --wcp-button-dark-active-border-color - Border color of the button if active in dark mode
     * @cssprop --wcp-button-dark-active-color - Text color of the button if active in dark mode
     *
     * @cssprop --wcp-button-light-passive-background - Background color of the button if non interactive in light mode
     * @cssprop --wcp-button-light-passive-border-color - Border color of the button if non interactive in light mode
     * @cssprop --wcp-button-light-passive-color - Text color of the button if non interactive in light mode
     *
     * @cssprop --wcp-button-light-hover-background - Background color of the button if hovered in light mode
     * @cssprop --wcp-button-light-hover-border-color - Border color of the button if hovered in light mode
     * @cssprop --wcp-button-light-hover-color - Text color of the button if hovered in light mode
     *
     * @cssprop --wcp-button-light-active-background - Background color of the button if active in light mode
     * @cssprop --wcp-button-light-active-border-color - Border color of the button if active in light mode
     * @cssprop --wcp-button-light-active-color - Text color of the button if active in light mode
     */
    export class Button extends Button_base {
        #private;
        static readonly formAssociated = true;
        static readonly styles: import("lit").CSSResult;
        disabled: boolean;
        nowrap: boolean;
        /**
         * Allows stretching the button across the full width of its container.
         * This is useful for buttons that are used in a narrow form, or in general
         * on small viewports, like handheld devices.
         */
        stretched: boolean;
        /**
         * The kind of button to render. Either like a conventional button, or for
         * icons. Icon buttons are quadrtic and will show a radial background on interaction.
         */
        kind: 'button' | 'icon';
        type: 'button' | 'reset' | 'submit';
        href?: string;
        target?: '_self' | '_blank' | '_parent' | '_top';
        handleButtonClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-button': Button;
        }
    }
}
declare module "components/ui/code/code.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Code_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * Shows a formatted code snippet.
     *
     * @example
     * ```html
     * <wcp-code>
     *   <pre><code>Some code</code></pre>
     * </wcp-code>
     * ```
     */
    export class Code extends Code_base {
        static readonly styles: import("lit").CSSResult;
        createRenderRoot(): this;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-code': Code;
        }
    }
}
declare module "components/ui/icon/icon.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * Shows an icon from the css.gg icon set.
     *
     * @example
     * ## Use icon
     * By setting the name attribute.
     *
     * ```html
     * <wcp-icon name="smartphone"></wcp-icon>
     * ```
     *
     * @example
     * ### Set a custom size
     *
     * ```html
     * <wcp-icon name="laptop" style="--wcp-icon-size: 44"></wcp-icon>
     * ```
     *
     * @cssprop --wcp-icon-size - Sets the size of the icon as unitless number in pixels
     */
    export class Icon extends LitElement {
        static readonly styles: import("lit").CSSResult;
        name: string;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-icon': Icon;
        }
    }
}
declare module "components/ui/tabs/tabs.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Tabs_base: (new (...args: any[]) => {
        colorScheme?: "light" | "dark" | undefined;
    }) & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}'>
     *  <div slot="first">First tab content</div>
     *  <div slot="second">Second tab content</div>
     * </wcp-tabs>
     * ```
     *
     * @example
     * ### Active tab preselected
     *
     * ```html
     * <wcp-tabs tabs='{"first": "First tab", "second": "Second tab"}' active-tab="second">
     *  <div slot="first">First tab content</div>
     *  <div slot="second">Second tab content</div>
     * </wcp-tabs>
     * ```
     *
     * @slot tab name - The content of the named tab.
     * @emits wcp-tabs:active-tab-change - Notifies when the active tab changes
     *
     * @cssprop --wcp-tabs-tablist-gap - The gap between the tablist and the tabpanels
     * @cssprop --wcp-tabs-tablist-spacing - The inner padding of the tablist
     * @cssprop --wcp-tabs-tab-spacing - The inner padding of the tabs
     * @cssprop --wcp-tabs-tab-active-border-width - The border width of the active tab
     * @cssprop --wcp-tabs-panel-spacing - The inner padding of the tabpanels
     *
     * @cssprop --wcp-tabs-tablist-dark-border-color - The border color of the tablist in dark mode
     * @cssprop --wcp-tabs-tab-active-dark-border-color - The border color of the active tab in dark mode
     *
     * @cssprop --wcp-tabs-tablist-light-border-color - The border color of the tablist in light mode
     * @cssprop --wcp-tabs-tab-active-light-border-color - The border color of the active tab in light mode
     */
    export class Tabs extends Tabs_base {
        static readonly styles: import("lit").CSSResult;
        tabFocus: number;
        tabRoles: HTMLElement[];
        tabs: Record<string, {
            label: string;
            disabled?: boolean;
        }>;
        activeTab?: string;
        emitActiveTabChange(): void;
        handleTabClick(event: Event): void;
        handleKeydown(event: KeyboardEvent): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-tabs:active-tab-change': CustomEvent<string>;
        }
        interface HTMLElementTagNameMap {
            'wcp-tabs': Tabs;
        }
    }
}
declare module "components/ui/title/title.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * Shows the application title and a logo.
     *
     * @example
     * ```html
     * <wcp-title title="Web Components Preview">
     *   <img slot="logo" src="assets/icons/logo.svg" height="30px" />
     * </wcp-title>
     * ```
     *
     * @slot logo - Receives the logo image to be shown
     *
     * @cssprop --wcp-title-gap - The gap between the logo and the title
     * @cssprop --wcp-title-height - The height of the title. Content may exceed and scales the tile
     * @cssprop --wcp-title-spacing - Inner padding of the title
     * @cssprop --wcp-title-headline-size - The font size of the title
     * @cssprop --wcp-title-headline-weight - The font weight of the title
     * @cssprop --wcp-title-headline-spacing - The letter spacing of the title
     * @cssprop --wcp-title-headline-line-height - The line height of the title
     * @cssprop --wcp-title-headline-transform - The text transform of the title
     */
    export class Title extends LitElement {
        static readonly styles: import("lit").CSSResult;
        title: string;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-title': Title;
        }
    }
}
declare module "index" {
    /**
     * @file Automatically generated by barrelsby.
     */
    export * from "components/feature/markdown-example/markdown-example.component";
    export * from "components/feature/navigation/navigation.component";
    export * from "components/feature/navigation-item/navigation-item.component";
    export * from "components/feature/preview-controls/preview-controls.component";
    export * from "components/feature/preview-frame/preview-frame.component";
    export * from "components/feature/preview-frame/preview-frame.utils";
    export * from "components/feature/readme/readme.component";
    export * from "components/feature/readme-frame/readme-frame.component";
    export * from "components/feature/toggle-color-scheme/toggle-color-scheme.component";
    export * from "components/feature/toggle-sidebar/toggle-sidebar.component";
    export * from "components/layout/aside/aside.component";
    export * from "components/layout/layout/layout.component";
    export * from "components/layout/main/main.component";
    export * from "components/plugins/preview-frame-examples/preview-frame-examples.plugin";
    export * from "components/plugins/preview-frame-readme/preview-frame-readme.plugin";
    export * from "components/plugins/preview-frame-viewer/preview-frame-viewer.plugin";
    export * from "components/plugins/preview-frame-viewer/preview-frame-viewer.utils";
    export * from "components/plugins/preview-frame-viewer/preview-frame-viewer-stage/preview-frame-viewer-stage.component";
    export * from "components/root/root.component";
    export * from "components/ui/button/button.component";
    export * from "components/ui/code/code.component";
    export * from "components/ui/icon/icon.component";
    export * from "components/ui/tabs/tabs.component";
    export * from "components/ui/title/title.component";
    export * from "parsers/cem/utils";
    export * from "utils/color-scheme.utils";
    export * from "utils/config.utils";
    export * from "utils/markdown.utils";
    export * from "utils/parser.types";
    export * from "utils/parser.utils";
}
declare module "parsers/cem/1.0.0/cem-field.spec" { }
declare module "utils/parser.utils.spec" { }
//# sourceMappingURL=index.d.ts.map