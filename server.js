const express = require('express');
const path = require('path');
const fs = require('fs');

var app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
var PORT = process.env.PORT||3001;


// WEBSITE SERVER
// GET request fetching input. Users request the app from a web browser, we will serve the HTML file.

const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );

  const readAndAppend = (content, file) => {
    fs.readFile(file, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
      } else {
        const parsedData = JSON.parse(data);
        parsedData.push(content);
        writeToFile(file, parsedData);
      }
    });
  };

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req,res) => 
  res.sendFile(path.join(__dirname, './db/db.json'))
  );

  
//INFO SERVER
//When the user clicks on the save button on the HTML page i will POST the request to Server and get the response.
app.post('/api/notes', (req, res) => {
console.log(req.body);
readAndAppend(req.body, "db/db.json")
res.json(`${req.method} request received to save the input`);


})

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:3001`)
);
