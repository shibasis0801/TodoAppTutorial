export default class TaskState {
    constructor(renderFunction, persistence) {
        this.state = {
            completedTasks: [],
            pendingTasks: []
        };
        this.renderFunction = renderFunction;
        this.persistence = persistence;
        this.initialize = this.initialize.bind(this);
        this.setState = this.setState.bind(this);
        this.add = this.add.bind(this);
        this.markPending = this.markPending.bind(this);
        this.markComplete = this.markComplete.bind(this);
    }
    initialize() {
        this.persistence.retrieve()
            .then(this.setState);
    }
    setState(newState) {
        console.log("NewState", newState);
        this.state = newState;
        this.renderFunction(this.state);
        this.persistence.store(this.state);
    }
    add(task) {
        const pendingTasks = [...this.state.pendingTasks, task];
        this.setState({
            pendingTasks,
            completedTasks: this.state.completedTasks
        });
    }
    markPending(task) {
        const idx = this.state.completedTasks.indexOf(task);
        const completedTasks = [...this.state.completedTasks];
        completedTasks.splice(idx, 1);
        this.setState({
            pendingTasks: [...this.state.pendingTasks, this.state.completedTasks[idx]],
            completedTasks
        });
    }
    markComplete(task) {
        const idx = this.state.pendingTasks.indexOf(task);
        const pendingTasks = [...this.state.pendingTasks];
        pendingTasks.splice(idx, 1);
        this.setState({
            pendingTasks,
            completedTasks: [...this.state.completedTasks, this.state.pendingTasks[idx]]
        });
    }
}
export class Task {
    constructor(title, description) {
        this.id = Task.idx;
        this.title = title;
        this.description = description;
        Task.idx += 1;
    }
}
Task.idx = 0;
