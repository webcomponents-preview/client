// Preview Frame Plugins may emit a plugin data change event.
declare global {
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
export type Plugin = HTMLElement & {
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
  readonly container?: HTMLElement;
};

/**
 * Type to be used with topbar plugins.
 */
export type TopbarPlugin = Plugin;

/**
 * Type guard for generic plugins.
 */
export function isPlugin(element: HTMLElement): element is Plugin {
  return 'name' in element && 'label' in element && 'available' in element;
}

/**
 * Type guard for stage plugins.
 */
export function isStagePlugin(element: HTMLElement): element is StagePlugin {
  return isPlugin(element) && 'previewTagName' in element;
}

/**
 * Type guard for preview plugins.
 * TODO: add container type guard
 */
export function isPreviewPlugin(element: HTMLElement): element is PreviewPlugin {
  return isPlugin(element) && 'previewTagName' in element && 'container' in element;
}
