const express = require('express')
const mysql = require('mysql')
const cors = require("cors")
const app = express()

app.use(express.json())
const corsOptions ={
  origin:["http://localhost:5173/"]
}
app.use(cors(corsOptions))
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'langauage-learning'
})
connection.connect()
app.get("/wordsets", (req, res) => { //get all wordsets
  connection.query("SELECT * FROM wordsets;", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});
app.get("/wordsbyset", (req, res) => { //get all the words in a wordset by wordset id
  const Wordset_ID = req.body;
  connection.query("SELECT * FROM words WHERE Wordset_ID = " + Wordset_ID +";", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});
app.get("/words", (req, res) => { //get all the words
  connection.query("SELECT * FROM words;", (err, result) => {
    if (err) return res.json({ error: err });
    res.json(result);
  });
});
app.post("/words", (req, res) => { //create a new word
  const {Wordset_ID, Term, Definition, Example} = req.body;
  connection.query("INSERT INTO words (Wordset_ID, Term, Definition, Example) VALUES (?,?,?,?)", [Wordset_ID, Term, Definition, Example], (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Added word"});
  });

});
app.post("/wordsets", (req, res) => { //create a new wordset
  const name = req.body;
  connection.query("INSERT INTO wordsets (Name) VALUES (?)", name, (err, result) => {
    if (err) return res.json({ error: err });
    res.json({ message: "Added wordset"});
  });
});

app.get("/test", (req, res) => { //sanity test endpoint
  res.json({greeting: "Hello world!"})
});
app.listen(8080, () =>{
  console.log("Backend running on port 8080")
})