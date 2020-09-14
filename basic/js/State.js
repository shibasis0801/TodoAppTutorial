export default class TaskState {
    constructor(renderFunction) {
        this.state = {
            completedTasks: [],
            pendingTasks: []
        }
        this.renderFunction = renderFunction;
    }

    setState(newState) {
        console.log("NewState", newState);
        this.state = newState;
        this.renderFunction(this.state);
    }

    add(task) {
        const pendingTasks = [ ...this.state.pendingTasks, task ];
        this.setState({
            pendingTasks,
            completedTasks: this.state.completedTasks
        });
    }

    markPending(task) {
        const idx = this.state.completedTasks.indexOf(task);
        const completedTasks = [ ...this.state.completedTasks ];
        completedTasks.splice(idx, 1);
        this.setState({
            pendingTasks: [ ...this.state.pendingTasks, this.state.completedTasks[idx] ],
            completedTasks
        })
    }

    markComplete(task) {
        const idx = this.state.pendingTasks.indexOf(task);
        const pendingTasks = [ ...this.state.pendingTasks ];
        pendingTasks.splice(idx, 1);
        this.setState({
            pendingTasks,
            completedTasks: [ ...this.state.completedTasks, this.state.pendingTasks[idx] ]
        })
    }
}


export class Task {
    static idx = 0;
    constructor(title, description) {
        this.id = Task.idx;
        this.title = title;
        this.description = description;

        Task.idx += 1;
    }
}
