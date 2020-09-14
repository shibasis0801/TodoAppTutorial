import { Persistence, State } from "./Persistence";
// @ts-ignore
import { get, set } from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';


export default class IDBPersistence implements Persistence {
    retrieve(): Promise<State> {
        return get('app').then((val: any) => (val || {pendingTasks: [], completedTasks: []}));
    }

    store(data: State) {
        return set("app", data);
    }
}
