import {text, checkbox, header, listItem, body} from "./js/components.js";
import {registerSearchListener} from "./js/search.js";
import {registerFormHandler} from "./js/formHandling.js";
import TaskState, {Task} from "./js/State.js";

const pendingTasks = document.getElementById("pending-tasks-list");
const completedTasks = document.getElementById("completed-tasks-list");

function renderTask(task, status) {
    const checked = status === "completed";
    const cb = checkbox({ id: `checkbox-${task.id}`, className: "task-checkbox", checked });
    cb.addEventListener('change', () => {
        if (cb.checked) {
            state.markComplete(task);
        }
        else {
            state.markPending(task);
        }
    })

    return listItem({ id: `list-${task.id}`, className: 'task-item' }, [
        header({id: `header-${task.id}`, className: 'task-header'}, [text(task.title)]),
        body({id: `body-${task.id}`, className: "task-body"}, [text(task.description)]),
        cb
    ])
}

function clearList(list) {
    while(list.firstChild) {
        list.removeChild(list.firstChild);
    }
}

function render(state) {
    clearList(pendingTasks);
    clearList(completedTasks);

    state.pendingTasks.forEach(task => {
        pendingTasks.appendChild(
            renderTask(task, "pending")
        )
    })
    state.completedTasks.forEach(task => {
        completedTasks.appendChild(
            renderTask(task, "completed")
        )
    })
}

const state = new TaskState(render);


// const arr = [1, 2, 3, 4, 5]
// arr.forEach(n => {
//     pendingTasks.appendChild(
//         renderTask(n)
//     );
//     const cb = document.getElementById(`checkbox-${n}`);
//     const task = document.getElementById(`list-${n}`);
//     cb.addEventListener('change', () => {
//         if (cb.checked) {
//             completedTasks.appendChild(task);
//         }
//         else {
//             pendingTasks.appendChild(task);
//         }
//     });
// });

registerSearchListener(term => {
    const defaultReply = "Please enter a query";
    const reply = term ? `You asked for ${term}` : defaultReply;
    alert(reply);
});


registerFormHandler(formData => {
    if (formData.title && formData.description) {
        state.add(new Task(formData.title, formData.description))
    }
})
