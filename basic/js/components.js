const text = content => document.createTextNode(content);

// Show eloquent JS diagram
/**
 *
 * @param {HTMLElement} node
 * @returns {HTMLLIElement}
 */
export function listItem(node) {
    const listItem = document.createElement('li');
    listItem.appendChild(node);
    return listItem;
}
