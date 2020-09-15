import {registerSearchListener} from "./js/search.js";
import {registerFormHandler} from "./js/formHandling.js";
import {checkbox, listItem, body, header, text} from "./js/components.js";
import {helloWorld} from "./js/Persistence.js";

const pendingTasks = document.getElementById("pending-tasks-list");
const completedTasks = document.getElementById("completed-tasks-list");

function renderTask(title, description) {
    const cb = checkbox({className: "task-checkbox"});
    const ui = listItem({className: 'task-item'}, [
        header({className: 'task-header'}, [text(title)]),
        body({className: "task-body"}, [text(description)]),
        cb
    ])
    cb.addEventListener('change', () => {
        if (cb.checked) {
            completedTasks.appendChild(ui);
        } else {
            pendingTasks.appendChild(ui);
        }
    })
    return ui;
}

function addTask(title, description) {
    pendingTasks.appendChild(
        renderTask(title, description)
    );
}


registerSearchListener(term => {
    const defaultReply = "Please enter a query";
    const reply = term ? `You asked for ${term}` : defaultReply;
    alert(reply);
    helloWorld();
});

registerFormHandler(formData => {
    if (formData.title && formData.description) {
        addTask(formData.title, formData.description)
    }
})
