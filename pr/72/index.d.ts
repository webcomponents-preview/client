declare module "utils/mixin.types" {
    export type Constructor<T> = new (...args: any[]) => T;
}
declare module "utils/config.utils" {
    export type Config = {
        excludeElements: string[];
        /**
         * Allows setting an initial element to be displayed if no other element is selected.
         * If omitted, the first element will be used.
         */
        initialActiveElement?: string;
        /**
         * The code previews always consist of two tabs, one for the code and one for the preview.
         * This property defines the initial tab to be selected.
         */
        initialCodePreviewTab: 'code' | 'preview';
        /**
         * The initial tab to be selected in the preview. Will match the name of the plugin.
         */
        initialStageTab: string;
        /**
         * The plugins to be used for the preview.
         * Set to the viewport plugin by default.
         */
        previewPlugins: string[];
        /**
         * The plugins to be used for the preview frame.
         * Defaults to examples, readme and viewer.
         */
        stagePlugins: string[];
        /**
         * The plugins to be used for the topbar.
         * Defaults to the preview editor link hint toggle.
         */
        topbarPlugins: string[];
        /**
         * Defines readmes to be loaded from external sources to be displayed in the navigation.
         */
        additionalReadmes: {
            name: string;
            url: string;
        }[];
        /**
         * Sets the persistence of the global state. Defaults to 'session'.
         * If set to 'none', the state will not be persisted at all and only kept in memory.
         * If set to 'session', the state will be persisted in the session storage and restored.
         * If set to 'local', the state will be persisted in the local storage and restored.
         */
        statePersistence: 'none' | 'session' | 'local';
        /**
         * Labels to be translated or customized
         */
        labels: {
            /**
             * The name of the group to be used for eventually configured additional readmes.
             */
            additionalReadmeGroupName: string;
            /**
             * If the navigation is empty, either because no readmes nor elements are found or
             * because the search query does not match any elements, use this label as fallback.
             */
            emptyNavigation: string;
            /**
             * If no groups for elements are defined, use this label as fallback for all elements
             */
            fallbackGroupName: string;
            /**
             * The title of the application, displayed in sidebar header and browser tab
             */
            title: string;
        };
        /**
         * All settings concerning logging
         */
        logging: {
            /**
             * The severity of the log message; info will include all messages, warn will
             * include warnings and errors, error will include errors only and none will
             * disable logging completely.
             */
            severity: 'info' | 'warn' | 'error' | 'none';
        };
    };
    global {
        interface WCP {
            config: Config;
        }
        interface Window {
            wcp: WCP;
        }
    }
    export const defaultConfig: {
        excludeElements: never[];
        initialActiveElement: undefined;
        initialCodePreviewTab: "preview";
        initialStageTab: string;
        previewPlugins: string[];
        stagePlugins: string[];
        topbarPlugins: string[];
        additionalReadmes: never[];
        statePersistence: "session";
        labels: {
            title: string;
            additionalReadmeGroupName: string;
            fallbackGroupName: string;
            emptyNavigation: string;
        };
        logging: {
            severity: "info";
        };
    };
    export function mergeConfigWithDefaults(config: Partial<Config>): Config;
    export function loadConfig(url?: string): Promise<Config>;
    /**
     * Convenience function to retrieve the config
     */
    export function getConfig(): Config | undefined;
}
declare module "utils/state.utils" {
    const STATE_EVENT_NAME: "wcp-state-changed";
    global {
        /**
         * Add fields to the state type by declaring them at the feature.
         * The declared type will be merged with this global state type.
         */
        interface State {
            _: unknown;
        }
        interface WCP {
            __state: Record<string, string>;
        }
        interface Window {
            wcp: WCP;
        }
        type StateEventMap = {
            [N in `${typeof STATE_EVENT_NAME}:${keyof State}`]: CustomEvent<State[N extends `${typeof STATE_EVENT_NAME}:${infer K}` ? K : never]>;
        };
        interface WindowEventMap extends StateEventMap {
        }
    }
    /**
     * Helper function to persist a given key with the given stateful value.
     */
    export function persist<K extends keyof State>(key: K, value: State[K]): undefined;
    /**
     * Read stateful values from the persistence layer.
     */
    export function read<K extends keyof State>(key: K): State[K] | undefined;
}
declare module "utils/color-scheme.utils" {
    import type { ColorSchemableInterface } from "mixins/color-schemable.mixin";
    global {
        interface State {
            ['color-scheme']: ColorScheme;
        }
    }
    export type ColorScheme = 'light' | 'dark';
    export const getColorSchemeState: () => ColorScheme;
    export const addColorSchemable: (element: ColorSchemableInterface) => Set<ColorSchemableInterface>;
    export const removeColorSchemable: (element: ColorSchemableInterface) => boolean;
}
declare module "mixins/color-schemable.mixin" {
    import { LitElement } from 'lit';
    import type { Constructor } from "utils/mixin.types";
    import { type ColorScheme } from "utils/color-scheme.utils";
    export class ColorSchemableInterface {
        colorScheme?: ColorScheme;
    }
    export const ColorSchemable: <T extends Constructor<LitElement>>(superClass: T) => Constructor<ColorSchemableInterface> & T;
}
declare module "components/features/markdown-example/markdown-example.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const MarkdownExample_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
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
        #private;
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-markdown-example': MarkdownExample;
        }
    }
}
declare module "components/features/navigation/navigation.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Navigation_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @element wcp-navigation
     *
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
declare module "components/features/navigation/navigation-item/navigation-item.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const NavigationItem_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @element wcp-navigation-item
     *
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
declare module "components/features/navigation/navigation-search/navigation-search.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const NavigationSearch_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @element wcp-navigation-search
     *
     * @emits wcp-navigation-search:search - Fired when the search term changes. Carries the new search term with it.
     *
     * @cssprop --wcp-navigation-search-spacing - The spacing around the search input.
     *
     * @cssprop --wcp-navigation-search-dark-border-color - The border color of the search input in dark mode.
     * @cssprop --wcp-navigation-search-light-border-color - The border color of the search input in light mode.
     *
     * @cssprop --wcp-navigation-search-passive-dark-stroke - The stroke color of the search input in dark mode when not focused.
     * @cssprop --wcp-navigation-search-passive-light-stroke - The stroke color of the search input in light mode when not focused.
     *
     * @cssprop --wcp-navigation-search-active-dark-stroke - The stroke color of the search input in dark mode when focused.
     * @cssprop --wcp-navigation-search-active-light-stroke - The stroke color of the search input in light mode when focused.
     */
    export class NavigationSearch extends NavigationSearch_base {
        #private;
        static readonly styles: import("lit").CSSResult;
        term: string;
        protected handleSearchInput(event: InputEvent): void;
        protected handleResetClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-navigation-search:search': CustomEvent<string>;
        }
        interface HTMLElementTagNameMap {
            'wcp-navigation-search': NavigationSearch;
        }
    }
}
declare module "components/features/preview/preview.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Preview_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Previews given content.
     *
     * @element wcp-preview
     *
     * @cssprop --wcp-preview-menu-dark-border-color - Border color of the plugin menu in dark mode.
     * @cssprop --wcp-preview-menu-light-border-color - Border color of the plugin menu in light mode.
     *
     * @slot - The content to preview.
     *
     * @example
     * ```html
     * <wcp-preview>
     *   <wcp-button>Example button</wcp-button>
     * </wcp-preview>
     * ```
     */
    export class Preview extends Preview_base {
        #private;
        static readonly styles: import("lit").CSSResult;
        private container?;
        previewTagName?: string;
        connectedCallback(): Promise<void>;
        disconnectedCallback(): void;
        private handleContainerRef;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview': Preview;
        }
    }
}
declare module "utils/markdown.utils" {
    import { Renderer } from 'marked';
    export function getCodeExample(slot: HTMLSlotElement): string;
    /**
     * Custom marked renderer to wrap code in a custom element.
     */
    export class CustomRenderer extends Renderer {
        #private;
        private readonly addCodePreview;
        private readonly previewTagName?;
        constructor(addCodePreview?: boolean, previewTagName?: string | undefined);
        storeRawCode(raw: string, highlighted: string): void;
        code(code: string, language?: string, escaped?: boolean): string;
    }
    export function resolveRelativePath(path: string): string;
    /**
     * Only relative links will be handled. If a markdown file (*.md, *.mdx) is linked, it will be prefixed with the route additionally.
     */
    export function prefixRelativeUrls(markdown: string, currentPath: string, basePath?: string): string;
    /**
     * Maps a given markdown code block language to a prism grammar.
     */
    export function mapLangToGrammar(lang: string): string;
    /**
     * Convenience function to render a given markdown string to html.
     */
    export function renderMarkdown(markdown: string, addCodePreview?: boolean, previewTagName?: string): Promise<string>;
}
declare module "components/features/readme/readme.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Readme_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Displays a Readme file by its URL.
     *
     * @element wcp-readme
     *
     * @cssprop --wcp-readme-dark-color - Text color of the readme in dark mode.
     * @cssprop --wcp-readme-dark-color-accent - Accent text color (e.g. links) of the readme in dark mode.
     * @cssprop --wcp-readme-dark-color-muted - Muted text color of the readme in dark mode.
     * @cssprop --wcp-readme-dark-border-color - Border color of the readme in dark mode.
     * @cssprop --wcp-readme-dark-highlight-background - Background color of highlighted table rows in dark mode.
     *
     * @cssprop --wcp-readme-light-color - Text color of the readme in light mode.
     * @cssprop --wcp-readme-light-color-accent - Accent text color (e.g. links) of the readme in light mode.
     * @cssprop --wcp-readme-light-color-muted - Muted text color of the readme in light mode.
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
        readonly previewTagName?: string;
        readonly markdown = "";
        readonly hash?: string;
        protected updated(): void;
        scrollToId(section: string): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-readme': Readme;
        }
    }
}
declare module "components/features/readme-frame/readme-frame.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * @example
     * ```html
     * <wcp-readme-frame></wcp-readme-frame>
     * ```
     *
     * @slot - The readme frame is usually filled with a readme element.
     *
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
declare module "utils/plugin.utils" {
    global {
        interface HTMLElementEventMap {
            'wcp-stage-plugin:data-change': CustomEvent<string>;
            'wcp-preview-plugin:data-change': CustomEvent<string>;
        }
    }
    /**
     * Each plugin must implement this interface.
     * Additionally, the plugin may emits an event, notifying about
     * availability changes. This custom event should be named
     * `wcp-plugin:availability-change` and should carry a
     * boolean flag about its availability in the `detail` property.
     */
    export type Plugin = Element & {
        readonly name: string;
        readonly label: string;
        readonly available: boolean;
    };
    /**
     * Type to be used with stage plugins.
     */
    export type StagePlugin = Plugin & {
        readonly data?: string;
        readonly previewTagName: string;
    };
    /**
     * Type to be used with preview plugins.
     */
    export type PreviewPlugin = Plugin & {
        readonly container: HTMLElement;
        readonly previewTagName: string;
    };
    /**
     * Type to be used with topbar plugins.
     */
    export type TopbarPlugin = Plugin;
    /**
     * Type guard for generic plugins.
     */
    export function isPlugin(element: Element): element is Plugin;
    /**
     * Type guard for stage plugins.
     */
    export function isStagePlugin(element: Element): element is StagePlugin;
    /**
     * Type guard for preview plugins.
     * TODO: add container type guard
     */
    export function isPreviewPlugin(element: Element): element is PreviewPlugin;
}
declare module "components/features/stage/stage.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Stage_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-stage></wcp-stage>
     * ```
     *
     * @slot - The preview frame can be filled with any number of plugins. The plugins will be rendered as tabs.
     *
     * @cssprop --wcp-stage-dark-background - Background color of the preview frame in dark mode
     * @cssprop --wcp-stage-dark-border-color - Border color of the example section in dark mode
     * @cssprop --wcp-stage-dark-color - Text color of the preview frame in dark mode
     *
     * @cssprop --wcp-stage-light-background - Background color of the preview frame in light mode
     * @cssprop --wcp-stage-light-border-color - Border color of the example section in light mode
     * @cssprop --wcp-stage-light-color - Text color of the preview frame in light mode
     *
     * @cssprop --wcp-stage-border-radius - Border radius of the preview frame
     * @cssprop --wcp-stage-border-width - Border width of the preview frame
     * @cssprop --wcp-stage-distance - Outer margin of the preview frame
     * @cssprop --wcp-stage-spacing - Inner padding of the preview frame
     */
    export class Stage extends Stage_base {
        static readonly styles: import("lit").CSSResult;
        private _plugins;
        private _tabs;
        private readonly activePlugin?;
        emitActivePluginChange(activePlugin?: string): void;
        protected handleSlotChange(event: Event): void;
        protected handleAvailabilityChange(): void;
        protected handleActiveTabChange(event: CustomEvent<string>): void;
        protected preparePluginTabs(): void;
        protected alignActivePlugin(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-stage:active-plugin-change': CustomEvent<string>;
        }
        interface HTMLElementTagNameMap {
            'wcp-stage': Stage;
        }
    }
}
declare module "components/features/toggle-color-scheme/toggle-color-scheme.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const ToggleColorScheme_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
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
        handleButtonClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-toggle-color-scheme': ToggleColorScheme;
        }
    }
}
declare module "components/features/toggle-sidebar/toggle-sidebar.component" {
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
declare module "components/features/topbar/topbar.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Topbar_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * A wrapper above the preview frame content to contain various controls.
     *
     * @element wcp-topbar
     *
     * @slot - Default slot for navigation items
     *
     * @cssprop --wcp-topbar-dark-color - Text color of the controls in dark mode
     * @cssprop --wcp-topbar-light-color - Text color of the controls in light mode
     *
     * @cssprop --wcp-topbar-height - Overall height of the preview controls nav bar
     * @cssprop --wcp-topbar-spacing - Inner spacing, used as padding of the controls
     *
     * @example
     * ### Usage with controls
     *
     * ```html
     * <wcp-topbar>
     *   <wcp-toggle-sidebar></wcp-toggle-sidebar>
     *   <wcp-toggle-color-scheme></wcp-toggle-color-scheme>
     * </wcp-topbar>
     * ```
     */
    export class Topbar extends Topbar_base {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-topbar': Topbar;
        }
    }
}
declare module "utils/form.utils" {
    /**
     * Convenient interface to implement form-associated custom elements.
     */
    export type FormAssociated<T> = {
        disabled?: boolean;
        readonly?: boolean;
        required?: boolean;
        label?: string;
        name?: string;
        value?: T;
        formAssociatedCallback?: (form: HTMLFormElement) => void;
        formDisabledCallback?: (disabled: boolean) => void;
        formResetCallback?: () => void;
        formStateRestoreCallback?: (state: string | File | FormData | null, mode: 'autocomplete' | 'restore') => void;
    };
}
declare module "mixins/editable.mixin" {
    import { type LitElement, type TemplateResult, type CSSResultGroup } from 'lit';
    import type { Constructor } from "utils/mixin.types";
    import { type ColorSchemableInterface } from "mixins/color-schemable.mixin";
    import 'element-internals-polyfill';
    export class EditableInterface {
        readonly internals: ElementInternals;
        label?: string;
        renderInput(id: string): TemplateResult;
        renderSlot(name: string): TemplateResult;
    }
    export interface EditablePrototype {
        formStyles: CSSResultGroup;
        formAssociated: true;
    }
    export type EditableOptions = {
        hasHintSlot?: boolean;
        hasBeforeSlot?: boolean;
        hasAfterSlot?: boolean;
        hasBorder?: boolean;
    };
    export const Editable: ({ hasHintSlot, hasBeforeSlot, hasAfterSlot, hasBorder, }?: Partial<EditableOptions>) => <T extends Constructor<LitElement>>(superClass: T) => Constructor<EditableInterface & ColorSchemableInterface> & EditablePrototype & T;
}
declare module "components/forms/input-checkbox/input-checkbox.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputCheckbox_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A checkbox input element using the wcp style. Fully form aware.
     *
     * @element wcp-input-checkbox
     *
     * @property {string} label - The label of the input element.
     *
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-checkbox-size - The size of the checkbox input.
     * @cssprop --wcp-input-checkbox-hint-size - The font size of the hint.
     * @cssprop --wcp-input-checkbox-label-size - The font size of the label.
     * @cssprop --wcp-input-checkbox-spacing - The leading distance of the label to the input.
     * @cssprop --wcp-input-checkbox-border-radius - The border radius of the checkbox input.
     * @cssprop --wcp-input-checkbox-border-size - The border size of the checkbox input.
     *
     * @cssprop --wcp-input-checkbox-dark-background - The background color of the checkbox input in dark mode.
     * @cssprop --wcp-input-checkbox-dark-border - The border color of the checkbox input in dark mode.
     * @cssprop --wcp-input-checkbox-dark-color - The fill color of the checkbox input when checked in dark mode.
     *
     * @cssprop --wcp-input-checkbox-light-background - The background color of the checkbox input in light mode.
     * @cssprop --wcp-input-checkbox-light-border - The border color of the checkbox input in light mode.
     * @cssprop --wcp-input-checkbox-light-color - The fill color of the checkbox input when checked in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-checkbox label="With optional label"></wcp-input-checkbox>
     * ```
     *
     * @example
     * ## With initial value
     * ```html
     * <wcp-input-checkbox checked label="With optional initial value"></wcp-input-checkbox>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-checkbox label="Fully form enabled component"></wcp-input-checkbox>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputCheckbox extends InputCheckbox_base implements FormAssociated<string> {
        static readonly styles: import("lit").CSSResultGroup[];
        private initialChecked;
        name: string;
        autocomplete: boolean;
        disabled: boolean;
        checked: boolean;
        required: boolean;
        value: string;
        protected firstUpdated(props: PropertyValues<this>): void;
        attributeChangedCallback(name: string, old: string | null, value: string | null): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        handleInput(event: Event): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-checkbox': InputCheckbox;
        }
    }
}
declare module "components/forms/input-code/input-code.component" {
    import 'prismjs';
    import 'lit-code';
    import { LitElement, type PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputCode_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A text input element using the wcp style. Fully form aware.
     * Can display multiline text (textarea) if configured to do so.
     *
     * @element wcp-input-code
     *
     * @property {string} label - The label of the input element.
     *
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-code-hint-size - The font size of the hint.
     * @cssprop --wcp-input-code-label-size - The font size of the label.
     * @cssprop --wcp-input-code-spacing - The inner spacing of the input element.
     * @cssprop --wcp-input-code-border-radius - The border radius of the input element.
     * @cssprop --wcp-input-code-border-size - The border size of the input element.
     *
     * @cssprop --wcp-input-code-dark-background - The background color of the element in dark mode.
     * @cssprop --wcp-input-code-dark-border - The border color of the element in dark mode.
     * @cssprop --wcp-input-code-dark-color - The font color of the input element in dark mode.
     * @cssprop --wcp-input-code-dark-background-lines - The background color of the line numbers in dark mode.
     *
     * @cssprop --wcp-input-code-light-background - The background color of the element in light mode.
     * @cssprop --wcp-input-code-light-border - The border color of the element in light mode.
     * @cssprop --wcp-input-code-light-color - The font color of the input element in light mode.
     * @cssprop --wcp-input-code-light-background-lines - The background color of the line numbers in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-code label="With optional label"></wcp-input-code>
     * ```
     *
     * @example
     * ## With optional initial value
     * ```html
     * <wcp-input-code
     *   label="With optional initial value"
     *   value="<strong>Test</strong>"
     *   language="html"
     * ></wcp-input-code>
     * ```
     *
     * @example
     * ## With autosize
     * ```html
     * <wcp-input-code
     *   autosize
     *   label="With optional initial value"
     *   value="<strong>Test</strong>"
     *   language="html"
     * ></wcp-input-code>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-code
     *     label="Fully form enabled component"
     *     value="<strong>Test</strong>"
     *     language="html"
     *   ></wcp-input-code>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputCode extends InputCode_base implements FormAssociated<string> {
        #private;
        static readonly shadowRootOptions: {
            delegatesFocus: boolean;
            mode: ShadowRootMode;
            slotAssignment?: SlotAssignmentMode | undefined;
        };
        static readonly styles: import("lit").CSSResultGroup[];
        private readonly editor?;
        autosize: boolean;
        disabled: boolean;
        required: boolean;
        name: string;
        language: "html";
        set value(value: string | undefined);
        get value(): string | undefined;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        handleInput(event: InputEvent): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-code': InputCode;
        }
    }
}
declare module "components/forms/input-key-value/input-key-value.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputKeyValue_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A key-value input element using the wcp style. Fully form aware.
     *
     * @element wcp-input-key-value
     *
     * @property {string} label - The label of the input element.
     * @cssprop --wcp-input-key-value-gutter - The gutter between the key-value pair inputs.
     * @slot hint - Receives optional descriptions below the input.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-key-value label="With optional label"></wcp-input-key-value>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <input type="hidden" name="hidden" value="hidden" />
     *   <wcp-input-key-value name="embedded" label="Fully form enabled component"></wcp-input-key-value>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputKeyValue extends InputKeyValue_base implements FormAssociated<string> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        autocomplete: boolean;
        disabled: boolean;
        required: boolean;
        name?: string;
        set value(value: string | undefined);
        get value(): string | undefined;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        handleKeyInput(event: InputEvent): void;
        handleValueInput(event: InputEvent): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-key-value': InputKeyValue;
        }
    }
}
declare module "components/forms/input-key-value-pairs/input-key-value-pairs.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputKeyValuePairs_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A key-value pairs editor. Integrates into forms and allows editing string based form data.
     *
     * @element wcp-input-key-value-pairs
     *
     * @property {string} label - The label of the input element.
     * @cssprop --wcp-input-key-value-pairs-gutter - The gutter between the key-value pair inputs.
     * @slot hint - Receives optional descriptions below the input.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-key-value-pairs label="With optional label"></wcp-input-key-value-pairs>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form oninput="console.log(Array.from(new FormData(this).entries()))" onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-key-value-pairs name="embedded." label="Fully form enabled component"></wcp-input-key-value-pairs>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputKeyValuePairs extends InputKeyValuePairs_base implements FormAssociated<FormData> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        readonly form: HTMLFormElement;
        /**
         * The name acts as a prefix to the form data keys.
         */
        name: string;
        autocomplete: boolean;
        disabled: boolean;
        required: boolean;
        set value(value: FormData | undefined);
        get value(): FormData | undefined;
        set pairs(pairs: [string, string | undefined][]);
        get pairs(): [string, string | undefined][];
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        handleInput(): void;
        handleRemoveClick(event: MouseEvent): void;
        renderInput(): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-key-value-pairs': InputKeyValuePairs;
        }
    }
}
declare module "components/forms/input-number/input-number.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputNumber_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A numeric input element using the wcp style. Fully form aware.
     *
     * @element wcp-input-number
     *
     * @property {string} label - The label of the input element.
     *
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-number-hint-size - The font size of the hint.
     * @cssprop --wcp-input-number-label-size - The font size of the label.
     * @cssprop --wcp-input-number-spacing - The inner spacing of the input element.
     *
     * @cssprop --wcp-input-number-dark-background - The background color of the element in dark mode.
     * @cssprop --wcp-input-number-dark-border - The border color of the element in dark mode.
     * @cssprop --wcp-input-number-dark-color - The font color of the input element in dark mode.
     *
     * @cssprop --wcp-input-number-light-background - The background color of the element in light mode.
     * @cssprop --wcp-input-number-light-border - The border color of the element in light mode.
     * @cssprop --wcp-input-number-light-color - The font color of the input element in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-number label="With optional label"></wcp-input-number>
     * ```
     *
     * @example
     * ## With optional initial value
     * ```html
     * <wcp-input-number label="With optional initial value" value="23"></wcp-input-number>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-number label="Fully form enabled component"></wcp-input-number>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputNumber extends InputNumber_base implements FormAssociated<number> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        private readonly input?;
        autocomplete: boolean;
        disabled: boolean;
        readonly: boolean;
        required: boolean;
        name: string;
        value?: number;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
        handleInput(event: Event): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-number': InputNumber;
        }
    }
}
declare module "components/forms/input-radio/input-radio.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputRadio_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A radio input element using the wcp style. Fully form aware.
     *
     * @element wcp-input-radio
     *
     * @property {string} label - The label of the input element.
     *
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-radio-size - The size of the radio input.
     * @cssprop --wcp-input-radio-label-size - The font size of the label.
     * @cssprop --wcp-input-radio-hint-size - The font size of the hint.
     * @cssprop --wcp-input-radio-spacing - The leading distance of the label to the input.
     * @cssprop --wcp-input-radio-border-radius - The border radius of the radio input.
     * @cssprop --wcp-input-radio-border-size - The border size of the radio input.
     *
     * @cssprop --wcp-input-radio-dark-background - The background color of the radio input in dark mode.
     * @cssprop --wcp-input-radio-dark-border - The border color of the radio input in dark mode.
     * @cssprop --wcp-input-radio-dark-color - The fill color of the radio input when checked in dark mode.
     *
     * @cssprop --wcp-input-radio-light-background - The background color of the radio input in light mode.
     * @cssprop --wcp-input-radio-light-border - The border color of the radio input in light mode.
     * @cssprop --wcp-input-radio-light-color - The fill color of the radio input when checked in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-radio label="With optional label"></wcp-input-radio>
     * ```
     *
     * @example
     * ## With initial value
     * ```html
     * <wcp-input-radio checked label="With optional initial value"></wcp-input-radio>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-radio label="Fully form enabled component"></wcp-input-radio>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputRadio extends InputRadio_base implements FormAssociated<string> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        name: string;
        autocomplete: boolean;
        disabled: boolean;
        set checked(checked: boolean);
        get checked(): boolean;
        required: boolean;
        value: string;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        handleInput(event: Event): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-radio': InputRadio;
        }
    }
}
declare module "components/forms/input-select/input-select-option.component" {
    import { LitElement } from 'lit';
    /**
     * A helper element to declare options for a `wcp-input-select` element.
     *
     * @element wcp-input-select-option
     */
    export class InputSelectOption extends LitElement {
        disabled: boolean;
        value?: string;
        label?: string;
        protected createRenderRoot(): Element | ShadowRoot;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-select-option': InputSelectOption;
        }
    }
}
declare module "components/forms/input-select/input-select.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputSelect_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A numeric input element using the wcp style. Fully form aware.
     *
     * @element wcp-input-select
     *
     * @property {string} label - The label of the input element.
     *
     * @slot {<wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>} - Projects options into the select elements dropdown menu.
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-select-arrow-size - The size of the arrow icon.
     * @cssprop --wcp-input-select-hint-size - The font size of the hint.
     * @cssprop --wcp-input-select-label-size - The font size of the label.
     * @cssprop --wcp-input-select-spacing - The inner spacing of the input element.
    
     * @cssprop --wcp-input-select-dark-background - The background color of the element in dark mode.
     * @cssprop --wcp-input-select-dark-border - The border color of the element in dark mode.
     * @cssprop --wcp-input-select-dark-color - The font color of the input element in dark mode.
     *
     * @cssprop --wcp-input-select-light-background - The background color of the element in light mode.
     * @cssprop --wcp-input-select-light-border - The border color of the element in light mode.
     * @cssprop --wcp-input-select-light-color - The font color of the input element in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-select label="With optional label">
     *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
     *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
     *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
     * </wcp-input-select>
     * ```
     *
     * @example
     * ## With disabled options
     * ```html
     * <wcp-input-select label="With disabled options">
     *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
     *   <wcp-input-select-option value="bar" label="Bar" disabled></wcp-input-select-option>
     *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
     * </wcp-input-select>
     * ```
     *
     * @example
     * ## With optional initial value
     * ```html
     * <wcp-input-select label="With optional initial value" value="bar">
     *   <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
     *   <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
     *   <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
     * </wcp-input-select>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-select label="Fully form enabled component">
     *     <wcp-input-select-option value="foo" label="Foo"></wcp-input-select-option>
     *     <wcp-input-select-option value="bar" label="Bar"></wcp-input-select-option>
     *     <wcp-input-select-option value="baz" label="Baz"></wcp-input-select-option>
     *   </wcp-input-select>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputSelect extends InputSelect_base implements FormAssociated<string> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        private readonly input?;
        autocomplete: boolean;
        disabled: boolean;
        readonly: boolean;
        required: boolean;
        name: string;
        value?: string;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
        handleSlotChange(event: Event): void;
        handleInput(event: Event): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-select': InputSelect;
        }
    }
}
declare module "components/forms/input-text/input-text.component" {
    import { LitElement, PropertyValues } from 'lit';
    import type { FormAssociated } from "utils/form.utils";
    const InputText_base: import("index.js").Constructor<import("@/mixins/editable.mixin.js").EditableInterface & import("mixins/color-schemable.mixin.js").ColorSchemableInterface> & import("@/mixins/editable.mixin.js").EditablePrototype & typeof LitElement;
    /**
     * A text input element using the wcp style. Fully form aware.
     * Can display multiline text (textarea) if configured to do so.
     *
     * @element wcp-input-text
     *
     * @property {string} label - The label of the input element.
     *
     * @slot hint - Receives optional descriptions below the input.
     *
     * @cssprop --wcp-input-text-hint-size - The font size of the hint.
     * @cssprop --wcp-input-text-label-size - The font size of the label.
     * @cssprop --wcp-input-text-spacing - The inner spacing of the input element.
     *
     * @cssprop --wcp-input-text-dark-background - The background color of the element in dark mode.
     * @cssprop --wcp-input-text-dark-border - The border color of the element in dark mode.
     * @cssprop --wcp-input-text-dark-color - The font color of the input element in dark mode.
     *
     * @cssprop --wcp-input-text-light-background - The background color of the element in light mode.
     * @cssprop --wcp-input-text-light-border - The border color of the element in light mode.
     * @cssprop --wcp-input-text-light-color - The font color of the input element in light mode.
     *
     * @example
     * ## With optional label
     * ```html
     * <wcp-input-text label="With optional label"></wcp-input-text>
     * ```
     *
     * @example
     * ## With optional initial value
     * ```html
     * <wcp-input-text label="With optional initial value" value="Foo"></wcp-input-text>
     * ```
     *
     * @example
     * ## Multiline
     * ```html
     * <wcp-input-text multiline label="With multiline value"></wcp-input-text>
     * ```
     *
     * @example
     * ## Used within a form
     * ```html
     * <form onsubmit="console.log(Array.from(new FormData(this).entries()));return false" onreset="console.log('Reset!')">
     *   <wcp-input-text label="Fully form enabled component"></wcp-input-text>
     *   <button type="submit">Submit</button>
     *   <button type="reset">Reset</button>
     * </form>
     * ```
     */
    export class InputText extends InputText_base implements FormAssociated<string> {
        #private;
        static readonly styles: import("lit").CSSResultGroup[];
        private readonly input?;
        multiline: boolean;
        autocomplete: boolean;
        disabled: boolean;
        readonly: boolean;
        required: boolean;
        name: string;
        /**
         * Can be set to to `text`, `email`, `password`, `search`, `tel`, or `url`. \
         * Beware that this will be ignored if combined with the `multiline` attribute.
         */
        type: 'text' | 'email' | 'password' | 'search' | 'tel' | 'url';
        value?: string;
        protected firstUpdated(props: PropertyValues<this>): void;
        formResetCallback(): void;
        checkValidity(): boolean;
        attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
        handleInput(event: Event): void;
        renderInput(id: string): import("lit-html").TemplateResult<1>;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-input-text': InputText;
        }
    }
}
declare module "components/layout/aside/aside.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Aside_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
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
     * @slot header - Elements in the fixed header of the side bar
     *
     * @emits wcp-aside:toggled - Dispatches this event when the side bar has been toggled. Do not get confused with the `wcp-aside:toggle` event.
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
        handleButtonClick(): void;
        listenAsideToggle: ({ detail }: CustomEvent<boolean>) => void;
        connectedCallback(): void;
        disconnectedCallback(): void;
        protected render(): TemplateResult;
    }
    global {
        interface State {
            ['aside-visible']: boolean;
        }
        interface HTMLElementTagNameMap {
            'wcp-aside': Aside;
        }
    }
}
declare module "components/layout/layout/layout.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const Layout_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-layout>
     *   <nav slot="aside">To the left!</nav>
     *   <article>Me the important content!</article>
     * </wcp-layout>
     * ```
     *
     * @slot header - Shows contents fixed above the aside
     * @slot aside - Projects elements aside the main content
     * @slot - Receives the content of the main section
     */
    export class Layout extends Layout_base {
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
         * Indicates if the field can be controlled by the viewer.
         */
        isControllable: boolean;
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
declare module "parsers/cem/utils" {
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
    export function isCustomElementDeclarationWithTagName(declaration?: CEM.Declaration): declaration is CustomElementDeclarationWithTagName;
    export function isCustomElementField(field?: CEM.ClassMember): field is CEM.CustomElementField;
    export const WRAPPED_STRING_REGEX: RegExp;
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
declare module "utils/manifest.utils" {
    import type { Manifest } from "utils/parser.types";
    global {
        interface WCP {
            manifest: Manifest;
        }
        interface Window {
            wcp: WCP;
        }
    }
    export function loadManifest(manifestUrl: string, excludeElements: string[]): Promise<Manifest>;
    /**
     * Convenience function to retrieve the config
     */
    export function getManifest(): Manifest;
}
declare module "utils/navigation.utils" {
    import type { Config } from "utils/config.utils";
    import type { Element, Manifest } from "utils/parser.types";
    /**
     * Defines the structure of the navigation items.
     */
    export type GroupedNavigationItems = Map<string, Set<GroupedNavigationItem>>;
    export type GroupedNavigationItem = {
        name: string;
        link: string;
    };
    /**
     * Creates a navigation item for a given readme.
     */
    export function prepareReadmeNavigationItem(name: string, url: string): GroupedNavigationItem;
    /**
     * Creates a navigation item for a given element.
     */
    export function prepareElementNavigationItem(element: Element): GroupedNavigationItem;
    /**
     * Prepares a grouped navigation structure of readmes and elements.
     */
    export function prepareNavigation(manifest: Manifest, config: Config): GroupedNavigationItems;
    export function matchesSearch(content: string, terms: string[], minSearchLength?: number): boolean;
    export function filterItems(items: GroupedNavigationItems, terms: string[], minSearchLength?: number): GroupedNavigationItems;
}
declare module "utils/log.utils" {
    export const log: {
        info(...args: unknown[]): void;
        warn(...args: unknown[]): void;
        error(...args: unknown[]): void;
    };
}
declare module "utils/router.utils" {
    import type { LitElement, TemplateResult } from 'lit';
    export type Params = Record<string, string | undefined>;
    export type Route = {
        path: string;
        enter?: (params: Params, router: Router, outgoingParams?: Params) => boolean | Promise<boolean>;
        render?: (params: Params, router: Router) => TemplateResult;
    };
    export type RegisterRoutes = (router: Router) => Route[];
    export type ParsedUrl = {
        /**
         * Cleaned up path, derived from hash
         */
        path: string;
        /**
         * Prefixed url with base
         */
        url: string;
    };
    /**
     * Helps comparing param objects for equality
     */
    export function areParamsEqual(a: Params, b: Params, exclude?: string[]): boolean;
    /**
     * Merges two given sets of params.
     */
    export function mergeParams(oldParams: Params, newParams: Params, exclude?: string[]): Params;
    export class Router {
        #private;
        static isActive(path: string, currentPath?: string, exact?: boolean): boolean;
        /**
         * Redirect to a given path. This will trigger a hash change event.
         */
        static navigate(...slugs: (string | undefined)[]): void;
        get currentPath(): string | undefined;
        /**
         * Defines the routes for this router.
         */
        registerRoutes(routes: Route[]): void;
        /**
         * Checks if the given path is the currently active.
         */
        isActive(path: string, exact?: boolean): boolean;
        /**
         * Redirect to a given path. This will trigger a hash change event.
         * @alias Router.navigate
         * @todo check whether this should be removed in favor of the static method
         */
        redirect(...slugs: (string | undefined)[]): void;
        /**
         * Update the current path without triggering a redirect.
         */
        updateCurrent(path: string): void;
        constructor(host: LitElement);
        connect(): void;
        disconnect(): void;
        outlet(): TemplateResult;
    }
}
declare module "components/root/root-navigation/root-navigation.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import { type GroupedNavigationItems } from "utils/navigation.utils";
    /**
     * Manages the main root-navigation in the application root.
     *
     * @element wcp-root-navigation
     *
     * @cssprop --wcp-root-navigation-empty-message-spacing - The spacing of the empty message.
     * @cssprop --wcp-root-navigation-empty-message-font-size - The font size of the empty message.
     */
    export class RootNavigation extends LitElement {
        #private;
        static readonly styles: import("lit").CSSResult;
        private filteredItems;
        currentPath?: string;
        emptyMessage: string;
        minSearchLength: number;
        set searchTerms(terms: string[]);
        set items(items: GroupedNavigationItems);
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-root-navigation': RootNavigation;
        }
    }
}
declare module "components/root/root.routes" {
    import { type Route } from "utils/router.utils";
    export const prepareRoutes: () => Route[];
}
declare module "components/root/root.component" {
    import type { CustomElementDeclaration } from 'custom-elements-manifest/schema.d.js';
    import { LitElement, type TemplateResult } from 'lit';
    import type { RootNavigation } from "components/root/root-navigation/root-navigation.component";
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
    export class Root extends LitElement {
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
    global {
        interface HTMLElementEventMap {
            'wcp-root:active-element-changed': CustomEvent<CustomElementDeclaration | undefined>;
        }
        interface HTMLElementTagNameMap {
            'wcp-root': Root;
        }
    }
}
declare module "components/root/root-splash/root-splash.component" {
    import { LitElement, type TemplateResult } from 'lit';
    /**
     * Shows a splash screen whilst initializing the application.
     *
     * @property {boolean} [hidden] - Use the global hidden attribute to fade out the splash screen.
     *
     * @cssprop --wcp-root-splash-dark-background-color - The background color of the splash screen in dark mode.
     * @cssprop --wcp-root-splash-dark-color - The text color of the splash screen in dark mode.
     * @cssprop --wcp-root-splash-light-background-color - The background color of the splash screen in light mode.
     * @cssprop --wcp-root-splash-light-color - The text color of the splash screen in light mode.
     *
     * @slot {Loading...} - The text content to be displayed in the splash screen.
     *
     * @example
     * # Basic usage
     *
     * ```html
     * <wcp-root-splash>Loading...</wcp-root-splash>
     * ```
     */
    export class RootSplash extends LitElement {
        static readonly styles: import("lit").CSSResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-root-splash': RootSplash;
        }
    }
}
declare module "components/ui/button/button.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import 'element-internals-polyfill';
    const Button_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
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
     * ## Displaced to the right
     *
     * ```html
     * <wcp-button style="position:relative;left:calc(100% - 40px);transform:translateX(-100%)">
     *   Try to find me!
     * </wcp-button>
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
         * icons. Icon buttons are quadratic and will show a radial background on interaction.
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
    const Code_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
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
    const Tabs_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @example
     * ```html
     * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}'>
     *  <div slot="first">First tab content</div>
     *  <div slot="second">Second tab content</div>
     * </wcp-tabs>
     * ```
     *
     * @example
     * ### Active tab preselected
     *
     * ```html
     * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab"}}' active-tab="second">
     *  <div slot="first">First tab content</div>
     *  <div slot="second">Second tab content</div>
     * </wcp-tabs>
     * ```
     *
     * @example
     * ### Disabled tabs
     *
     * ```html
     * <wcp-tabs tabs='{"first": {"label": "First tab"}, "second": {"label": "Second tab", "disabled": true}}' active-tab="second">
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
        private readonly tabRoles;
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
declare module "utils/parser.utils" {
    import type * as Parsed from "utils/parser.types";
    /**
     * Prepares a lit compatible template key for a given field
     */
    export function litKey(field: Parsed.Field): string;
}
declare module "utils/compression.utils" {
    /**
     *	Compress a string with browser native APIs into a string representation
     *
     * @param data - Input string that should be compressed
     * @param encoding - Compression algorithm to use
     * @returns The compressed string
     */
    export function compress(data: string, encoding: CompressionFormat): Promise<string>;
    /**
     * Decompress a string representation with browser native APIs in to a normal js string
     *
     * @param data - String that should be decompressed
     * @param encoding - Decompression algorithm to use
     * @returns The decompressed string
     */
    export function decompress(data: string, encoding: CompressionFormat): Promise<string>;
}
declare module "plugins/stage/stage-editor/stage-editor.utils" {
    import type * as Parsed from "utils/parser.types";
    /**
     * State of the custom element.
     */
    export type ElementData = {
        /**
         * Additional attributes mapped by attribute name to attribute value.
         * Should not overlap with reflected attributes from fields.
         */
        attributes: Record<string, string | undefined>;
        /**
         * Field state mapped by property name to property value.
         */
        fields: Record<string, string | number | boolean | undefined>;
        /**
         * Slot state mapped by slot name to slot (html) content.
         */
        slots: Record<string, string>;
    };
    /**
     * Empty state object of the element data.
     */
    export const EMPTY_ELEMENT_DATA: ElementData;
    /**
     * Prepares an initial state object for the given element definition.
     */
    export function prepareInitialData(element: Parsed.Element): ElementData;
    /**
     * Retrieve the current value of a given field parsed to the correct type
     */
    export function parseFieldValue(field: Parsed.Field, value: unknown): ElementData['fields'][keyof ElementData['fields']];
    /**
     * There seems to be a bug in Safari with the native FormAssociated implementation regarding
     * checkboxes: https://bugs.webkit.org/show_bug.cgi?id=259781
     */
    export function alignFormDataWebkit(formData: FormData, elements: HTMLFormControlsCollection, element: Parsed.Element): FormData;
    /**
     * Maps the given form data by the given element definition to a stateful data object
     */
    export function mapFormData(data: FormData, element: Parsed.Element): ElementData;
    /**
     * Prepares the data to be set as compressed url param
     */
    export function compressFormData(formData: FormData, element: Parsed.Element): Promise<string>;
    /**
     * Decompresses and parses the given element data
     */
    export function decompressElementData(compressed: string): Promise<ElementData>;
}
declare module "plugins/preview/preview-editor-link/preview-editor-link.utils" {
    import type { ElementData } from "plugins/stage/stage-editor/stage-editor.utils";
    /**
     * Prepares an initial state object for the given element definition by:
     * 1. Read all controllable fields from the element definition (from properties)
     * 2. Read all (remaining) attributes from the element reference (not reflected from already collected properties)
     * 3. Read all slots from the element definition with their stringified contents
     *
     * @todo: separate steps into functions
     * @todo: test this sh!t
     */
    export function readCurrentElementData(ref: HTMLElement): ElementData;
}
declare module "utils/debounce.utils" {
    export function debounce<T extends (...args: Parameters<T>) => void>(this: ThisParameterType<T>, fn: T, wait?: number): (...args: Parameters<T>) => void;
}
declare module "utils/dom.utils" {
    export function isElementWithin(element: Element, container?: Element): boolean;
    /**
     * Delivers the relative boundary of an element to an optional parent.
     * If the parent element is omitted, the offset parent of the element is used.
     */
    export function getRelativeBoundary(element: HTMLElement, parent?: Element | null): Pick<DOMRect, 'x' | 'y' | 'height' | 'width'>;
    /**
     * Returns the list of ancestor elements by reference to a given element.
     */
    export function getAncestorPath(element: Element, check?: (element: Element) => boolean): (Element | Document)[];
    /**
     * Determine if an element is a descendant of another element by tag name.
     */
    export function isDescendantOf(element: Element, ancestor: string): boolean;
}
declare module "index" {
    /**
     * @file Automatically generated by barrelsby.
     */
    export * from "components/features/markdown-example/markdown-example.component";
    export * from "components/features/navigation/navigation.component";
    export * from "components/features/navigation/navigation-item/navigation-item.component";
    export * from "components/features/navigation/navigation-search/navigation-search.component";
    export * from "components/features/preview/preview.component";
    export * from "components/features/readme/readme.component";
    export * from "components/features/readme-frame/readme-frame.component";
    export * from "components/features/stage/stage.component";
    export * from "components/features/toggle-color-scheme/toggle-color-scheme.component";
    export * from "components/features/toggle-sidebar/toggle-sidebar.component";
    export * from "components/features/topbar/topbar.component";
    export * from "components/forms/input-checkbox/input-checkbox.component";
    export * from "components/forms/input-code/input-code.component";
    export * from "components/forms/input-key-value/input-key-value.component";
    export * from "components/forms/input-key-value-pairs/input-key-value-pairs.component";
    export * from "components/forms/input-number/input-number.component";
    export * from "components/forms/input-radio/input-radio.component";
    export * from "components/forms/input-select/input-select-option.component";
    export * from "components/forms/input-select/input-select.component";
    export * from "components/forms/input-text/input-text.component";
    export * from "components/layout/aside/aside.component";
    export * from "components/layout/layout/layout.component";
    export * from "components/layout/main/main.component";
    export * from "components/root/root.component";
    export * from "components/root/root.routes";
    export * from "components/root/root-navigation/root-navigation.component";
    export * from "components/root/root-splash/root-splash.component";
    export * from "components/ui/button/button.component";
    export * from "components/ui/code/code.component";
    export * from "components/ui/icon/icon.component";
    export * from "components/ui/tabs/tabs.component";
    export * from "components/ui/title/title.component";
    export * from "parsers/cem/utils";
    export * from "plugins/preview/preview-editor-link/preview-editor-link.utils";
    export * from "plugins/stage/stage-editor/stage-editor.utils";
    export * from "utils/color-scheme.utils";
    export * from "utils/compression.utils";
    export * from "utils/config.utils";
    export * from "utils/debounce.utils";
    export * from "utils/dom.utils";
    export * from "utils/form.utils";
    export * from "utils/log.utils";
    export * from "utils/manifest.utils";
    export * from "utils/markdown.utils";
    export * from "utils/mixin.types";
    export * from "utils/navigation.utils";
    export * from "utils/parser.types";
    export * from "utils/parser.utils";
    export * from "utils/plugin.utils";
    export * from "utils/router.utils";
    export * from "utils/state.utils";
}
declare module "plugins/preview/preview-editor-link/preview-editor-link.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { PreviewPlugin } from "utils/plugin.utils";
    /**
     * Links all found custom elements in a preview with their current state to the editor to be further played around with.
     *
     * @element wcp-preview-editor-link
     */
    export class PreviewEditorLink extends LitElement implements PreviewPlugin {
        #private;
        static readonly styles: import("lit").CSSResult;
        readonly name = "editor-link";
        readonly label = "Show in editor";
        readonly container: HTMLElement;
        readonly previewTagName: string;
        available: boolean;
        enabled: boolean;
        connectedCallback(): void;
        adoptedCallback(): void;
        disconnectedCallback(): void;
        private handleToggleClick;
        protected render(): TemplateResult;
    }
    global {
        interface State {
            'editor-link-hint-visible': boolean;
        }
        interface HTMLElementTagNameMap {
            'wcp-preview-editor-link': PreviewEditorLink;
        }
    }
}
declare module "plugins/preview/preview-editor-link/preview-editor-link-hint/preview-editor-link-hint.component" {
    import { LitElement, type TemplateResult } from 'lit';
    const PreviewEditorLinkHint_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Shows a hint to a given preview element.
     *
     * @element wcp-preview-editor-link-hint
     *
     * @cssprop --wcp-preview-editor-link-hint-button-passive-background - The background color of the hint button in passive state.
     * @cssprop --wcp-preview-editor-link-hint-button-active-background - The background color of the hint button in active state.
     * @cssprop --wcp-preview-editor-link-hint-button-passive-size - Size of the hint button in passive state.
     * @cssprop --wcp-preview-editor-link-hint-button-active-size - Size of the hint button in active state.
     *
     * @cssprop --wcp-preview-editor-link-hint-debug-border-width - Border width of the debugging fields.
     * @cssprop --wcp-preview-editor-link-hint-debug-background-opacity - Opacity of the debugging fields background.
     *
     * @cssprop --wcp-preview-editor-link-hint-debug-stripe-distance - Distance of the stripes of the debugging field background.
     * @cssprop --wcp-preview-editor-link-hint-debug-stripe-tilt - Tilt of the stripes of the debugging field background in degrees.
     * @cssprop --wcp-preview-editor-link-hint-debug-stripe-width - Width of the stripes of the debugging field background.
     * @cssprop --wcp-preview-editor-link-hint-debug-stripe-dash-size - Length of the dashes of the debugging field background.
     * @cssprop --wcp-preview-editor-link-hint-debug-stripe-dash-gap - Gap between the dashes of the debugging field background.
     *
     * @cssprop --wcp-preview-editor-link-hint-debug-dark-background - Debugging field background color in dark mode.
     * @cssprop --wcp-preview-editor-link-hint-debug-dark-stroke - Debugging field dash and border color in dark mode.
     *
     * @cssprop --wcp-preview-editor-link-hint-debug-light-background - Debugging field background color in light mode.
     * @cssprop --wcp-preview-editor-link-hint-debug-light-stroke - Debugging field dash and border color in light mode.
     */
    export class PreviewEditorLinkHint extends PreviewEditorLinkHint_base {
        #private;
        static readonly styles: import("lit").CSSResult;
        debug: boolean;
        set element(element: HTMLElement | undefined);
        set scrollParent(element: HTMLElement | undefined);
        /**
         * Allows to update the position of the hint.
         */
        updatePosition(): void;
        connectedCallback(): void;
        disconnectedCallback(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-preview-editor-link-hint': PreviewEditorLinkHint;
        }
    }
}
declare module "plugins/preview/preview-simulate-viewports/preview-simulate-viewports.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { PreviewPlugin } from "utils/plugin.utils";
    type Viewport = 'mobile' | 'tablet' | 'desktop' | 'wide';
    const PreviewSimulateViewports_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Simulates various viewports for a custom element preview.
     *
     * @element wcp-preview-simulate-viewports
     */
    export class PreviewSimulateViewports extends PreviewSimulateViewports_base implements PreviewPlugin {
        static readonly styles: import("lit").CSSResult;
        readonly name = "viewport";
        readonly label = "Viewport";
        readonly container: HTMLElement;
        readonly previewTagName: string;
        readonly available = true;
        private simulateViewport?;
        private invertSimulatedViewport;
        protected get defaultStyle(): string;
        protected removeStyle(): void;
        protected resetStyle(): void;
        protected prepareStyle(): HTMLStyleElement;
        /**
         * Sets the size of the viewport to simulate its dimensions.
         */
        protected applyPreviewSize(): void;
        /**
         * Scales the sized viewport to fit into the preview container.
         */
        protected applyPreviewScale(): void;
        protected applyPreviewDimensions(): void;
        private emitChange;
        private handleSimulateViewport;
        handleInvertSimulatedViewport(): void;
        disconnectedCallback(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-preview-simulate-viewports:changed': CustomEvent<{
                viewport: Viewport;
                inverted: boolean;
            }>;
        }
        interface HTMLElementTagNameMap {
            'wcp-preview-simulate-viewports': PreviewSimulateViewports;
        }
    }
}
declare module "plugins/stage/stage-editor/stage-editor.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { StagePlugin } from "utils/plugin.utils";
    const StageEditor_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Allows editing a custom element.
     *
     * @element wcp-stage-editor
     */
    export class StageEditor extends StageEditor_base implements StagePlugin {
        #private;
        static readonly styles: import("lit").CSSResult;
        readonly name = "editor";
        readonly label = "Editor";
        private _element?;
        private _elementData?;
        set previewTagName(previewTagName: string);
        set data(data: string | undefined);
        readonly available = true;
        protected getElementReference(): Element | undefined;
        protected handleControlsInput({ detail }: CustomEvent<FormData>): Promise<void>;
        protected firstUpdated(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-stage-editor': StageEditor;
        }
    }
}
declare module "plugins/stage/stage-editor/stage-editor-controls/stage-editor-controls.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import type * as Parsed from "utils/parser.types";
    import { type ElementData } from "plugins/stage/stage-editor/stage-editor.utils";
    const StageEditorControls_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * @element wcp-stage-editor-controls
     *
     * @cssprop --wcp-stage-editor-controls-headline-size - The font size of the headline.
     * @cssprop --wcp-stage-editor-controls-headline-weight - The font weight of the headline.
     * @cssprop --wcp-stage-editor-controls-headline-spacing - The inner spacing of the headline.
     *
     * @cssprop --wcp-stage-editor-controls-dark-border-color - The border color of the element in dark mode.
     * @cssprop --wcp-stage-editor-controls-light-border-color - The border color of the element in light mode.
     *
     * @emits {CustomEvent<FormData>} wcp-stage-editor-controls:input - Fires when the user changes a control value.
     */
    export class StageEditorControls extends StageEditorControls_base {
        #private;
        static readonly styles: import("lit").CSSResult;
        private _element?;
        set previewTagName(previewTagName: string);
        readonly data?: ElementData;
        protected handleFormInput(event: InputEvent): void;
        protected renderHint(content?: string): TemplateResult;
        protected renderFieldControl(field: Parsed.Field): TemplateResult;
        protected renderSlotControl(slot: Parsed.Slot): TemplateResult;
        protected renderAttributeControls(): TemplateResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-stage-editor-controls:input': CustomEvent<FormData>;
        }
        interface HTMLElementTagNameMap {
            'wcp-stage-editor-controls': StageEditorControls;
        }
    }
}
declare module "plugins/stage/stage-editor/stage-editor-preview/stage-editor-preview.component" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { ElementData } from "plugins/stage/stage-editor/stage-editor.utils";
    /**
     * @element wcp-stage-editor-preview
     *
     * @example
     * ```html
     * <wcp-stage-editor-preview>
     *   <wcp-button>Example button</wcp-button>
     * </wcp-stage-editor-preview>
     * ```
     */
    export class StageEditorPreview extends LitElement {
        #private;
        static readonly styles: import("lit").CSSResult;
        previewTagName?: string;
        data?: ElementData;
        protected renderSlots(): TemplateResult;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-stage-editor-preview': StageEditorPreview;
        }
    }
}
declare module "plugins/stage/stage-examples/stage-examples.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { StagePlugin } from "utils/plugin.utils";
    const StageExamples_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Shows the examples of a custom element manifest.
     *
     * @element wcp-stage-examples
     *
     * @cssprop --wcp-stage-examples-spacing - Spacing between examples.
     */
    export class StageExamples extends StageExamples_base implements StagePlugin {
        #private;
        static readonly styles: import("lit").CSSResult;
        readonly name = "examples";
        readonly label = "Examples";
        private _element?;
        available: boolean;
        set previewTagName(previewTagName: string);
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-stage-plugin:availability-change': CustomEvent<boolean>;
        }
        interface HTMLElementTagNameMap {
            'wcp-stage-examples': StageExamples;
        }
    }
}
declare module "plugins/stage/stage-readme/stage-readme.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { StagePlugin } from "utils/plugin.utils";
    const StageReadme_base: import("index.js").Constructor<import("@/mixins/color-schemable.mixin.js").ColorSchemableInterface> & typeof LitElement;
    /**
     * Shows the readme of a custom element.
     *
     * @element wcp-stage-readme
     */
    export class StageReadme extends StageReadme_base implements StagePlugin {
        #private;
        static readonly styles: import("lit").CSSResult;
        readonly name = "readme";
        readonly label = "Readme";
        private _element?;
        available: boolean;
        set previewTagName(previewTagName: string);
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementEventMap {
            'wcp-stage-plugin:availability-change': CustomEvent<boolean>;
        }
        interface HTMLElementTagNameMap {
            'wcp-stage-readme': StageReadme;
        }
    }
}
declare module "plugins/topbar/topbar-preview-editor-link-toggle/topbar-preview-editor-link-toggle.plugin" {
    import { LitElement, type TemplateResult } from 'lit';
    import type { TopbarPlugin } from "utils/plugin.utils";
    /**
     * Toggles all preview editor link plugins to show or hide the debug hints.
     *
     * @element wcp-topbar-preview-editor-link-toggle
     */
    export class TopbarPreviewEditorLinkToggle extends LitElement implements TopbarPlugin {
        static readonly styles: import("lit").CSSResult;
        readonly name = "editor-link-toggle";
        readonly label = "Toggle all editor link hints globally";
        private enabled;
        available: boolean;
        protected handleToggleClick(): void;
        protected render(): TemplateResult;
    }
    global {
        interface HTMLElementTagNameMap {
            'wcp-topbar-preview-editor-link-toggle': TopbarPreviewEditorLinkToggle;
        }
    }
}
//# sourceMappingURL=index.d.ts.map