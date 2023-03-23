import type * as Parsed from '@/utils/parser.types';

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
