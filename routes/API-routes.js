const data = require("../db/db.json");
const fs=require("fs");
const path=require("path");
module.exports = function (app) {
  // this is the route for getting the notes
  app.get("/api/notes/", function (req, res) {
    res.json(data);
  });
  // this is thr route for posting a new note
  app.post("/api/notes/", function (req, res) {
    let newNote = req.body;
    let id = 0;
    for (let i = 0; i < data.length; i++) {
      let note = data[i];
      if (note.id>id){
        id=note.id;
      }
    }
    newNote.id=id+1;
    data.push(newNote);
    let jsonPath=path.join(__dirname,"../db/db.json");
    fs.writeFile(jsonPath,JSON.stringify(data),function(err){
      if(err){
        return console.log(err);
    
      }
      console.log("note was saved successfully");
    });
    res.json(newNote);
  });
  // this is the route for deleting the note
  app.delete("/api/notes/:id", function (req, res) {
    for (let i=0; i<data.length; i++){
      let note=data[i];
      if (note.id==req.params.id){
        data.splice(i,1);
        break;
      }
    }
    fs.writeFileSync(jsonPath,JSON.stringify(data),function(err){
      if(err){
        return console.log(err);
    
      }
      console.log("note was deleted successfully");
    });
    res.json(data);
  });
};
