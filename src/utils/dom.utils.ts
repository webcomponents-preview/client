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
