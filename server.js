const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
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


app.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", (err, data) => {
        if (err) throw err;
        const noteList = JSON.parse(data);
        const noteId = req.params.id;
        const newList = noteList.filter(note => {
            return note.id != noteId;
        });
        console.log(newList);
            fs.writeFile("./db/db.json", JSON.stringify(newList), (err) => {
            if (err) throw err;
            console.log("The file has been deleted!");
            });
        res.end();
      });
});


app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () => {
    console.log('App is running on http://localhost:' + PORT);
});