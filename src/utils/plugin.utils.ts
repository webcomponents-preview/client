// Preview Frame Plugins may emit a plugin data change event.
declare global {
  interface HTMLElementEventMap {
    'wcp-preview-plugin:data-change': CustomEvent<string>;
    'wcp-preview-frame-plugin:data-change': CustomEvent<string>;
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
  readonly previewTagName: string;
};

/**
 * Type to be used with preview frame plugins.
 */
export type PreviewFramePlugin = Plugin & {
  readonly data?: string;
};

/**
 * Type to be used with preview plugins.
 */
export type PreviewPlugin = Plugin & {
  readonly container: HTMLElement;
};

export function isPlugin(element: Element): element is Plugin {
  return 'name' in element && 'label' in element && 'available' in element;
}

export function findAllPlugins(slot: HTMLSlotElement): Plugin[] {
  return slot.assignedElements().filter(isPlugin);
}
