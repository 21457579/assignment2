const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('mypatients.db');

let sql = `SELECT name, surname, gender FROM patient
           ORDER BY name`;

db.all(sql, [], (err, rows) => {
  if (err) {
    throw err;
  }
  rows.forEach((row) => {
    console.log("name=" + row.name +" surname="+row.surname+ " gender="+row.gender);
  });
});

// close the database connection
db.close();