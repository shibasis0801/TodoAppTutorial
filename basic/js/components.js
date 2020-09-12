/**
 *
 * @param {string} tag
 * @param {object} options
 * @param {HTMLElement[] | Text[]} children
 */
function createElement(tag, options= {}, children= []) {
    const element = document.createElement(tag);
    Object.entries(options)
        .forEach(([key, value]) => {
            element[key] = value
        });
    children.forEach(child => element.appendChild(child));
    return element;
}


export const text = content => document.createTextNode(content);

export function listItem(options, children) {
    return createElement('li', options, children);
}

export function header(options, children) {
    return createElement('h3', options, children);
}

export function body(options, children) {
    return createElement('p', options, children);
}

export function checkbox(options) {
    return createElement(
        'input',
        {
            type: 'checkbox',
            ...options
        }
    )
}

