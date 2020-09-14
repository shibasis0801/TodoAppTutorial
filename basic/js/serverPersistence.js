const path = (task) => `http://localhost:8000/tasks/${task}`;
const toJSON = (response) => response.json();
export default class ServerPersistence {
    retrieve() {
        return fetch(path("retrieve"))
            .then(toJSON);
    }
    store(data) {
        return fetch(path("store"), {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(toJSON);
    }
}
