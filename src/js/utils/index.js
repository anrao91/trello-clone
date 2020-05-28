export function findParentNode(element, attribute) {
  while (element.parentNode) {
    element = element.parentNode;
    if (element.getAttribute(attribute)) {
      return element;
    }
  }
  return null;
}
