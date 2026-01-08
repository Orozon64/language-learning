const express = require('express')
const app = express()
const mysql = require('mysql')
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'langauage-learning',
  database: 'my_db'
})
connection.connect()
