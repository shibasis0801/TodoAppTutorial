function text(content) {
    return document.createTextNode(content);
}

// Show eloquent JS diagram
export function listItem() {
    const listItem = document.createElement('li');
    listItem.appendChild(text("Hello Todo"));
    return listItem;
}
