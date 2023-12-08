export declare function isElementWithin(element: Element, container?: Element): boolean;
/**
 * Delivers the relative boundary of an element to an optional parent.
 * If the parent element is omitted, the offset parent of the element is used.
 */
export declare function getRelativeBoundary(element: HTMLElement, parent?: Element | null): Pick<DOMRect, 'x' | 'y' | 'height' | 'width'>;
/**
 * Returns the list of ancestor elements by reference to a given element.
 */
export declare function getAncestorPath(element: Element, check?: (element: Element) => boolean): (Element | Document)[];
/**
 * Determine if an element is a descendant of another element by tag name.
 */
export declare function isDescendantOf(element: Element, ancestor: string): boolean;
