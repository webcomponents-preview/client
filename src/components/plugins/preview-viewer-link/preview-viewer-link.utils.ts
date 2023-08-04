import { litKey } from '@/utils/parser.utils.js';
import { ElementData } from '../preview-frame-viewer/preview-frame-viewer.utils.js';

/**
 * Prepares an initial state object for the given element definition.
 */
export function readCurrentElementData(ref: HTMLElement): ElementData {
  const element = window.wcp.manifest.elements.get(ref.tagName.toLowerCase());
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
    // TODO: add support for slots as well
    // Array.from(element.slots.values()).reduce((acc, slot) => {
    //   return { ...acc, [slot.name]: slot.default };
    // }, {}) ?? {},
    slots: {},
  };
}
