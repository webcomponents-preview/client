import type { ElementData } from '../../stage/stage-editor/stage-editor.utils.js';
/**
 * Prepares an initial state object for the given element definition by:
 * 1. Read all controllable fields from the element definition (from properties)
 * 2. Read all (remaining) attributes from the element reference (not reflected from already collected properties)
 * 3. Read all slots from the element definition with their stringified contents
 *
 * @todo: separate steps into functions
 * @todo: test this sh!t
 */
export declare function readCurrentElementData(ref: HTMLElement): ElementData;
