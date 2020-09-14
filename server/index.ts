import express, {Request, Response} from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from "body-parser";
import {SQLite} from "./database";

const app = express();
const database = new SQLite();

const corsOptions = {
    origin: "http://localhost:3000"
}

app.use(morgan('dev'));
app.use(cors(corsOptions));
app.use(bodyParser.json())

app.get('/tasks/retrieve', (req: Request, res: Response) => {
    database.retrieve()
        .then(value => {
            console.log(value);
            res.status(200).json(value);
        })
})

app.post('/tasks/store', (req: Request, res: Response) => {
    database.store(req.body)
        .then(() => {
            database.retrieve()
                .then(console.log);
            res.status(200).json({});
        })
})


app.listen(8000, () => console.log("Started express server at 8000"));
