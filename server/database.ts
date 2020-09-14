import {open, Database} from "sqlite";
import sqlite3 from 'sqlite3';

export interface Task {
    id: number
    title: string
    description: string
    status?: string
}

export interface State {
    pendingTasks: Array<Task>,
    completedTasks: Array<Task>
}

const serialiser = {
    toTable(state: State): Array<Task> {
        return [
            ...state.pendingTasks.map(task => ({ ...task, status: "pending" })),
            ...state.completedTasks.map(task => ({ ...task, status: "completed" }))
        ];
    },

    fromTable(tasks: Task[]): State {
        const state: State = {
            pendingTasks: [],
            completedTasks: []
        };
        tasks.forEach(task => {
            if (task.status === "pending") {
                state.pendingTasks.push(task);
            }
            else {
                state.completedTasks.push(task);
            }
        })

        return state;
    }
}

function insertRow(db: Database, task: Task) {
    const statement = "INSERT INTO tasks(id, title, description, status) VALUES (?, ?, ?, ?)";
    return db.run(statement, [task.id, task.title, task.description, task.status]);
}

export function createTable() {
    const createTable = "CREATE TABLE IF NOT EXISTS tasks (id integer, title varchar(80), description varchar(200), status varchar(20))";
    return open({
        filename: "./tasks.db",
        driver: sqlite3.Database
    }).then(db => {
        db.exec(createTable)
        return db;
    });
}

export class SQLite {
    db: Promise<Database>
    constructor() {
        this.db = createTable()
    }

    retrieve(): Promise<State> {
        const SQL = "SELECT * FROM tasks";

        return this.db
            .then(db => db.all<Task[]>(SQL))
            .then(serialiser.fromTable);
    }

    store(state: State): Promise<void> {
        const deleteSQL = "DELETE FROM tasks";
        return this.db
            .then(db => {
                db.exec(deleteSQL)
                return db;
            })
            .then(db => {
                const tasks = serialiser.toTable(state);
                return Promise.all(tasks.map(task => insertRow(db, task)))
                    .then(() => {})
            })

    }
}
