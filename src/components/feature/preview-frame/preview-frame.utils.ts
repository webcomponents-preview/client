import type { CustomElementDeclaration } from 'custom-elements-manifest';

export type PreviewFramePlugin<T extends CustomElementDeclaration = CustomElementDeclaration> = Element & {
  readonly name: string;
  readonly label: string;
  readonly available: boolean;
  element?: T;
};

export function isPreviewFramePlugin(element: Element): element is PreviewFramePlugin {
  return 'name' in element && 'label' in element && 'available' in element;
}

export function findAllPlugins(slot: HTMLSlotElement): PreviewFramePlugin[] {
  return slot.assignedElements().filter(isPreviewFramePlugin);
}
