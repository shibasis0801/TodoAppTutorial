"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = require("./database");
var app = express_1.default();
var database = new database_1.SQLite();
var corsOptions = {
    origin: "http://localhost:3000"
};
app.use(morgan_1.default('dev'));
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.get('/tasks/retrieve', function (req, res) {
    database.retrieve()
        .then(function (value) {
        console.log(value);
        res.status(200).json(value);
    });
});
app.post('/tasks/store', function (req, res) {
    database.store(req.body)
        .then(function () {
        database.retrieve()
            .then(console.log);
        res.status(200).json({});
    });
});
app.listen(8000, function () { return console.log("Started express server at 8000"); });
