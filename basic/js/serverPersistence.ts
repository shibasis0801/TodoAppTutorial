import { Persistence, State } from "./Persistence";

const path = (task: string) => `http://localhost:8000/tasks/${task}`

const toJSON = (response: Response) => response.json()

export default class ServerPersistence implements Persistence {
    retrieve(): Promise<State> {
        return fetch(path("retrieve"))
            .then(toJSON);
    }

    store(data: State): Promise<void> {
        return fetch(path("store"), {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(toJSON);
    }
}
