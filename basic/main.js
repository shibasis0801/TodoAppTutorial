const pendingTasks = document.getElementById("pending-tasks-list");
const completedTasks = document.getElementById("completed-tasks-list");

const task = document.getElementById("task");
const checkbox = document.getElementById("task-checkbox");

checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        completedTasks.appendChild(task);
    }
    else {
        pendingTasks.appendChild(task);
    }
})
