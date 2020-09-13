import {text, checkbox, header, listItem, body} from "./js/components.js";
import {registerSearchListener} from "./js/search.js";
import {registerFormHandler} from "./js/formHandling.js";

const pendingTasks = document.getElementById("pending-tasks-list");
const completedTasks = document.getElementById("completed-tasks-list");

const arr = [1, 2, 3, 4, 5]

function renderTask(id) {
    return listItem({ id: `list-${id}`, className: 'task-item' }, [
        header({id: `header-${id}`, className: 'task-header'}, [text("Title for task " + id)]),
        body({id: `body-${id}`, className: "task-body"}, [text("Description for the task " + id)]),
        checkbox({ id: `checkbox-${id}`, className: "task-checkbox"})
    ])
}

arr.forEach(n => {
    pendingTasks.appendChild(
        renderTask(n)
    );
    const cb = document.getElementById(`checkbox-${n}`);
    const task = document.getElementById(`list-${n}`);
    cb.addEventListener('change', () => {
        if (cb.checked) {
            completedTasks.appendChild(task);
        }
        else {
            pendingTasks.appendChild(task);
        }
    });
});

registerSearchListener(term => {
    const defaultReply = "Please enter a query";
    const reply = term ? `You asked for ${term}` : defaultReply;
    alert(reply);
});


registerFormHandler(formData => {
    console.log(formData);
})
