import {Persistence, State} from "./Persistence";

export type RenderFunction = (state: State) => any;

export default class TaskState {
    state: State
    renderFunction: RenderFunction
    persistence: Persistence

    constructor(renderFunction: RenderFunction, persistence: Persistence) {
        this.state = {
            completedTasks: [],
            pendingTasks: []
        }
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

    setState(newState: State) {
        console.log("NewState", newState);
        this.state = newState;
        this.renderFunction(this.state);
        this.persistence.store(this.state);
    }

    add(task: Task) {
        const pendingTasks = [ ...this.state.pendingTasks, task ];
        this.setState({
            pendingTasks,
            completedTasks: this.state.completedTasks
        });
    }

    markPending(task: Task) {
        const idx = this.state.completedTasks.indexOf(task);
        const completedTasks = [ ...this.state.completedTasks ];
        completedTasks.splice(idx, 1);
        this.setState({
            pendingTasks: [ ...this.state.pendingTasks, this.state.completedTasks[idx] ],
            completedTasks
        })
    }

    markComplete(task: Task) {
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
    id: number
    title: string
    description: string

    constructor(title: string, description: string) {
        this.id = Task.idx;
        this.title = title;
        this.description = description;

        Task.idx += 1;
    }
}
