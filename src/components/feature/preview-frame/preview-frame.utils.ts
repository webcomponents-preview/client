import type * as Parsed from '@/utils/parser.types';

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

export function isPreviewFramePlugin(element: Element): element is PreviewFramePlugin {
  return 'name' in element && 'label' in element && 'available' in element;
}

export function findAllPlugins(slot: HTMLSlotElement): PreviewFramePlugin[] {
  return slot.assignedElements().filter(isPreviewFramePlugin);
}
