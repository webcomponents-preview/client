// taken over from https://terodox.tech/how-to-tell-if-an-element-is-in-the-dom-including-the-shadow-dom/
// not the best implementation, but it works for now
export function isElementWithin(element: Element, container: Element = document.documentElement): boolean {
  let currentElement: Node = element;
  while (currentElement && currentElement.parentNode) {
    // derive next parent node
    if (currentElement.parentNode instanceof ShadowRoot) {
      currentElement = currentElement.parentNode.host;
    } else {
      currentElement = currentElement.parentNode;
    }
    // check for a match
    if (container.isSameNode(currentElement)) {
      return true;
    }
  }
  return false;
}

/**
 * Delivers the relative boundary of an element to an optional parent.
 * If the parent element is omitted, the offset parent of the element is used.
 */
export function getRelativeBoundary(
  element: HTMLElement,
  parent: Element | null = element.offsetParent,
): Pick<DOMRect, 'x' | 'y' | 'height' | 'width'> {
  const { height, width, x, y } = element.getBoundingClientRect();
  const { x: relX = 0, y: relY = 0 } = parent?.getBoundingClientRect() ?? {};
  return { height, width, x: x - relX, y: y - relY };
}
