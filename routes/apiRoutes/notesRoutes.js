const router = require("express").Router();
const uniqid = require("uniqid");

const fs = require("fs");
const util = require("util");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

router.get("/notes", (req, res) => {
  console.log("getNotes rout hit");

  readFileAsync("./db/db.json", "utf8").then((notes) => {
    notes = JSON.parse(notes);
    return res.json(notes);
  });
});

router.post("/notes", (req, res) => {
  console.log("post notes route hit");
  console.log(req.body);

  readFileAsync("./db/db.json", "utf8").then((notes) => {
    notes = JSON.parse(notes);

    var newNote = req.body;
    newNote.id = uniqid();
    console.log(newNote);

    notes.push(newNote);

    writeFileAsync("./db/db.json", JSON.stringify(notes));

    return res.json(newNote);
  });
});

router.delete("/notes/:id", (req, res) => {
  console.log("delete route hit");

  readFileAsync("./db/db.json", "utf8").then((notes) => {
    notes = JSON.parse(notes);

    for (let i = 0; i < notes.length; i++) {
      if (notes[i].id === req.params.id) {
        console.log("notes[i].id", notes[i].id);
        console.log("req.params.id", req.params.id);

        notes.splice(i, 1);
        writeFileAsync("./db/db.json", JSON.stringify(notes));
        return res.json(notes);
      }
    }
  });
});

module.exports = router;
