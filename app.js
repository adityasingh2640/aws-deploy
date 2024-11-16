require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const { DB_CONN } = process.env;

const api = express();
api.use(cors({
    origin: '*'
})); // enable CORS on all our requests
api.use(express.json()); // parses incoming requests with JSON payloads
api.use(express.urlencoded({ extended: false })); // parses incoming requests with urlencoded payloads

const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const databaseName = process.env.DB_NAME;
const host = process.env.DB_HOSTNAME;

// let connectionURI = `mongodb+srv://${username}:${password}@${host}/${databaseName}?retryWrites=true&w=majority`;
// console.log(connectionURI)
// mongoose.connect(connectionURI)
//     .then(() => console.log("DB connection successful"))
//     .catch(e => {
//         console.log(e)
//     });

// const ToDoModel = mongoose.model("todo", new mongoose.Schema({
//     isDone: Boolean,
//     text: String,
// })
// );

api.post("/api/todo", (req, res) => {
    console.log(req.body)
    let todo = req.body;
    todo.text = todo.text + " Singh " + Math.random();
    todo.date = Date.now();
    res.status(200).send(todo);

    // todo._id = new mongoose.Types.ObjectId(); // mongoose does not resolve automatically ids for new objects
    // const newTodo = new ToDoModel(todo);

    // newTodo.save().then((newTodo) => {
    //     res.json(newTodo);
    // })
    //     .catch((err) => {
    //         res.status(400).send(err);
    //     });
});

api.use(express.static(path.join(__dirname, "client", "build")));
api.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

const port = process.env.PORT || 8080;
api.listen(port, () => {
    console.log('Server up !', port)
});