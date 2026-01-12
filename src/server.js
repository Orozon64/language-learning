const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'langauage-learning',
  database: 'my_db'
})
function getWordsByWordsetId(wordsetId) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "SELECT * FROM words WHERE Wordset_ID = " + wordsetId +";";
    let query_result;
    con.query(sql, function (err, result) {
      if (err) throw err;
      query_result = result;
    });
  });
  return query_result;
}
function createWordset(name) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO wordsets (Name) VALUES (" + name + ");";
    let query_result;
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });

}
function createWord(wordsetID, term, definition, example) {
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    let sql = "INSERT INTO words (Wordset_ID, Term, Definition, Example) VALUES (" + wordsetID +"," + term+","+ definition+","+ example+ ");";
    let query_result;
    con.query(sql, function (err, result) {
      if (err) throw err;
    });
  });

}