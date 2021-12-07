const express = require('express');
const mysql = require('mysql');
var cors = require('cors')
var bodyParser = require('body-parser')


const app = express();
const port = 8080;
const table ='users';
app.use(cors())
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
app.use(express.json());       // to support JSON-encoded bodies

const pool = mysql.createPool({
  host:'127.0.0.1',
  port:3306,
  user: 'root',
  password:'password',
  database: 'gs',
});

app.listen(port, () => {
  console.log(`App server now listening to port ${port}`);
});

app.post('/api/users', (req, res) => {
  let query ="select * from gs.masterData  "
  let body=req.body.params
  delete body["pageSize"]
  delete body["current"]
  console.log("ssss",body)
  let ind=0;
  for (var key in body) {
    if(ind===0){
      query=query+` WHERE ${key} LIKE '%${body[key]}%' &&`;

    }
    else{
      query=query+` ${key} LIKE '%${body[key]}%' &&`;

    }
ind++
  }
query=query.slice(0, -2); 

  pool.query(query, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.sqlMessage })    } 
      else {
      res.send(
        {"data":rows
        ,
        "success":true});
    }
  });
});


app.post('/api/addusers', (req, res) => {
  
  var labels = Object.keys(req.body);
  var data = Object.values(req.body);
  let body=JSON.stringify(req.body)
let query =`INSERT INTO gs.masterData SET?`

  pool.query(query,req.body, (err, rows) => {
    if (err) {
      // res.send({
      //   "status":500,
      //   "error":err.sqlMessage});
      res.status(500).send({ error: err.sqlMessage })

  }
     else {
      res.send(
        {"data":rows
        ,
        "success":true});
    }
  });
});

app.put('/api/updateusers', (req, res) => {
  let id=req.body.id
  delete req.body["id"]
let query =`UPDATE gs.masterData SET ? WHERE id= ?`
console.log(query)

  pool.query(query,[req.body,id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.sqlMessage })   
     } else {
      res.send(
        {"data":rows
        ,
        "success":true});
    }
  });
});

app.put('/api/updateusers', (req, res) => {
  let id=req.body.id
  delete req.body["id"]
let query =`UPDATE gs.masterData SET ? WHERE id= ?`
console.log(query)

  pool.query(query,[req.body,id], (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.sqlMessage })   
     } else {
      res.send(
        {"data":rows
        ,
        "success":true});
    }
  });
});

app.delete('/api/deleteusers/:id', (req, res) => {

let query =`DELETE FROM gs.masterData WHERE id= ?`

  pool.query(query,req.params.id, (err, rows) => {
    if (err) {
      res.status(500).send({ error: err.sqlMessage })   
     } else {
      res.send(
        {"data":rows
        ,
        "success":true});
    }
  });
});