const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

app.get("/api/config", (req, res) => {
    res.json("Route created");
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "/public/notes.html"));
});

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        return res.json(JSON.parse(data));
    });
});

app.post("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
            if (err) throw err;
            req.body.id = Date.now();
            const noteList = JSON.parse(data);
            noteList.push(req.body);
            console.log(noteList);
                fs.writeFile("./db/db.json", JSON.stringify(noteList), (err) => {
                    if (err) throw err;
                    console.log("File saved!");
                });
        res.json(req.body);
    });
});