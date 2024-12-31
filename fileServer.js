/**
  You need to create an express HTTP server in Node.js which will handle the logic of a file server.
  - Use built in Node.js `fs` module
  The expected API endpoints are defined below,
  1. GET /files - Returns a list of files present in `./files/` directory
    Response: 200 OK with an array of file names in JSON format.
    Example: GET http://localhost:3000/files
  2. GET /file/:filename - Returns content of given file by name
     Description: Use the filename from the request path parameter to read the file from `./files/` directory
     Response: 200 OK with the file content as the response body if found, or 404 Not Found if not found. Should return `File not found` as text if file is not found
     Example: GET http://localhost:3000/file/example.txt
    - For any other route not defined in the server return 404
    Testing the server - run `npm run test-fileServer` command in terminal
 */
// /files:filename then req.params.fileName
// req.params.fileName
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const directPath = path.join(__dirname,"files");

app.get('/files',function(req, res){
  fs.readdir(directPath,function(err, file){
    if(err){
      res.status(500).json({
        error: "Error occured can't read the file"
      })
    }
    res.status(200).json(
      file
    )
  })
})

app.get('/files/:fileName',function(req, res){
  const fileToBeRead = path.join(directPath,req.params.fileName);
  fs.readFile(fileToBeRead,"utf-8",function(err,data){
    if(err){
      return res.status(404).send("File not found")
    }
    res.status(200).send(data);
  })
})
app.use('*',function(req, res){
  res.status(404).send("Route not found");
})
app.listen(1200);
module.exports = app;