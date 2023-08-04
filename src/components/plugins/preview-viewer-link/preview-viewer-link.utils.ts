import { getManifest } from '@/utils/manifest.utils.js';
import { litKey } from '@/utils/parser.utils.js';
import type { ElementData } from '../preview-frame-viewer/preview-frame-viewer.utils.js';

/**
 * Prepares an initial state object for the given element definition.
 */
export function readCurrentElementData(ref: HTMLElement): ElementData {
  const element = getManifest().elements.get(ref.tagName.toLowerCase());
  return {
    fields:
      Array.from(element?.fields.values() ?? []).reduce((acc, field) => {
        if (field.isControllable) {
          const value = ref[field.name as keyof HTMLElement];
          if (value !== undefined) {
            return { ...acc, [litKey(field)]: value };
          }
        }
        return acc;
      }, {}) ?? {},
    slots:
      Array.from(element?.slots.values() ?? []).reduce((acc, slot) => {
        // find the slot and gather all assigned nodes
        const selector = slot.name === '' ? ':not([name])' : `[name="${slot.name}"]`;
        const root = ref.shadowRoot ?? ref;
        const nodes = root.querySelector<HTMLSlotElement>(`slot${selector}`)?.assignedNodes() ?? [];

        // read node contents into string
        const value =
          nodes.reduce((content, node) => {
            if (node instanceof HTMLElement) return `${content}${node.outerHTML}`;
            else if (node instanceof Text) return `${content}${node.textContent}`;
            else return content;
          }, '') ?? slot.default;

        // deliver combined result
        return { ...acc, [slot.name]: value };
      }, {}) ?? {},
  };
}
