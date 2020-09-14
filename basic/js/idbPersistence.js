// @ts-ignore
import { get, set } from 'https://cdn.jsdelivr.net/npm/idb-keyval@3/dist/idb-keyval.mjs';
export default class IDBPersistence {
    retrieve() {
        return get('app');
    }
    store(data) {
        return set("app", data);
    }
}
