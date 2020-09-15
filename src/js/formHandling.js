const form = document.getElementById('task-input-form');
const button = document.getElementById('task-input-submit');

function getFormValues() {
    return {
        'title': form.elements['title'].value,
        'description': form.elements['description'].value
    }
}

export function registerFormHandler(handler) {
    form.addEventListener('submit', event => event.preventDefault());
    button.addEventListener('click', () => {
        handler(getFormValues());
        form.reset();
    })
}

