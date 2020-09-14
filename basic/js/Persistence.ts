import {Task} from "./State";

export interface State {
    pendingTasks: Array<Task>,
    completedTasks: Array<Task>
}
export interface Persistence {
    store(data: State): Promise<void>
    retrieve(): Promise<State>
}

