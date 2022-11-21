const path=require("path");
module.exports=function(app){

  // this is the home route
  app.get("",function(req, res){
    res.sendFile(path.join(__dirname,"../public/index.html"));
  });

  // this is the notes route
  app.get("/notes",function(req, res){
    res.sendFile(path.join(__dirname,"../public/notes.html"));
  });
};