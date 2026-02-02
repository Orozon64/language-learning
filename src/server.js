const express = require('express')
const mysql = require('mysql')
const app = express()
app.use(cors())
app.use(express.json())
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'langauage-learning',
  database: 'my_db'
})
connection.connect()
app.get("/words", (req, res) => { //get all the words in a wordset by wordset id
  const Wordset_ID = req.body;
  connection.query("SELECT * FROM words WHERE Wordset_ID = ?", Wordset_ID, (err, result) => {
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

function createWord(wordsetID, term, definition, example) {
  connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO words (Wordset_ID, Term, Definition, Example) VALUES (" + wordsetID +"," + term+","+ definition+","+ example+ ");";
    let query_result;
    connection.query(sql, function (err, result) {
      if (err) throw err;
    });
  });
  connection.end()

}
app.listen(5000, () =>{
  console.log("Backend running on port 5000")
})