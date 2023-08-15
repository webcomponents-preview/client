import { getManifest } from '@/utils/manifest.utils.js';
import { litKey } from '@/utils/parser.utils.js';
import type { ElementData } from '../../stage/stage-editor/stage-editor.utils.js';

const IGNORED_ATTRIBUTES = ['slot'];

/**
 * Prepares an initial state object for the given element definition by:
 * 1. Read all controllable fields from the element definition (from properties)
 * 2. Read all (remaining) attributes from the element reference (not reflected from already collected properties)
 * 3. Read all slots from the element definition with their stringified contents
 * 
 * @todo: separate steps into functions
 * @todo: test this sh!t
 */
export function readCurrentElementData(ref: HTMLElement): ElementData {
  const elementData = getManifest().elements.get(ref.tagName.toLowerCase());

  // store all attributes already collected by the element definition
  const skipAttributes: string[] = [...IGNORED_ATTRIBUTES];

  // 1. get all controllable fields with their current values
  const fields =
    Array.from(elementData?.fields.values() ?? []).reduce((acc, field) => {
      if (field.isControllable) {
        const value = ref[field.name as keyof HTMLElement];
        if (value !== undefined) {
          if (field.hasAttribute) skipAttributes.push(field.attribute!);
          return { ...acc, [litKey(field)]: value };
        }
      }
      return acc;
    }, {}) ?? {};

  // 2. get all remaining attributes
  const attributeNames = ref.getAttributeNames().filter((attribute) => !skipAttributes.includes(attribute));
  const attributes = attributeNames.reduce(
    (acc, attr) => ({ ...acc, [attr]: ref.getAttribute(attr) ?? undefined }),
    {}
  );

  // 3. read all slotted data with their current contents
  const slots =
    Array.from(elementData?.slots.values() ?? []).reduce((acc, slot) => {
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
    }, {}) ?? {};

  return { attributes, fields, slots };
}
