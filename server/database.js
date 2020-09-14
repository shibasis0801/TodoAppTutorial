"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SQLite = exports.createTable = void 0;
var sqlite_1 = require("sqlite");
var sqlite3_1 = __importDefault(require("sqlite3"));
var serialiser = {
    toTable: function (state) {
        return __spreadArrays(state.pendingTasks.map(function (task) { return (__assign(__assign({}, task), { status: "pending" })); }), state.completedTasks.map(function (task) { return (__assign(__assign({}, task), { status: "completed" })); }));
    },
    fromTable: function (tasks) {
        var state = {
            pendingTasks: [],
            completedTasks: []
        };
        tasks.forEach(function (task) {
            if (task.status === "pending") {
                state.pendingTasks.push(task);
            }
            else {
                state.completedTasks.push(task);
            }
        });
        return state;
    }
};
function insertRow(db, task) {
    var statement = "INSERT INTO tasks(id, title, description, status) VALUES (?, ?, ?, ?)";
    return db.run(statement, [task.id, task.title, task.description, task.status]);
}
function createTable() {
    var createTable = "CREATE TABLE IF NOT EXISTS tasks (id integer, title varchar(80), description varchar(200), status varchar(20))";
    return sqlite_1.open({
        filename: "./tasks.db",
        driver: sqlite3_1.default.Database
    }).then(function (db) {
        db.exec(createTable);
        return db;
    });
}
exports.createTable = createTable;
var SQLite = /** @class */ (function () {
    function SQLite() {
        this.db = createTable();
    }
    SQLite.prototype.retrieve = function () {
        var SQL = "SELECT * FROM tasks";
        return this.db
            .then(function (db) { return db.all(SQL); })
            .then(serialiser.fromTable);
    };
    SQLite.prototype.store = function (state) {
        var deleteSQL = "DELETE FROM tasks";
        return this.db
            .then(function (db) {
            db.exec(deleteSQL);
            return db;
        })
            .then(function (db) {
            var tasks = serialiser.toTable(state);
            return Promise.all(tasks.map(function (task) { return insertRow(db, task); }))
                .then(function () { });
        });
    };
    return SQLite;
}());
exports.SQLite = SQLite;
