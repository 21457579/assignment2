var sqlite3 = require('sqlite3').verbose()

// open the database
let db = new sqlite3.Database('mypatients.db', (err) => {
    if (err) {
      console.error(err.message);
      throw err
    }
    console.log('Connected to the mypatients database.');
  });

  // db.run("DROP TABLE patient");
  // db.run("DROP TABLE treatment");
  // db.run("DROP TABLE prescription");
  // console.log("Tables dropped")


  // create table 'book'
  const sql='CREATE TABLE patient(id text, name text, surname text, gender text)';
  db.run(sql, (err) => {
    if (err) {
        // Table already created 
        console.log('Patient table already created.');
    }else{
      console.log('Patient table created.');
    }
  });

  const sqlTreatment='CREATE TABLE treatment(id text, patientId text, treatmentName text, treatmentCategory text, isAllergy text)';
  db.run(sqlTreatment, (err) => {
    if (err) {
        // Table already created 
        console.log('Treatment table already created.');
    }else{
      console.log('Treatment table created.');
    }
  });

  const sqlPrescription='CREATE TABLE prescription(id text, prescriptionName text, treatmentId text)';
  db.run(sqlPrescription, (err) => {
    if (err) {
        // Table already created 
        console.log('Prescription table already created.');
    }else{
      console.log('Prescription table created.');
    }
  });

// export as module, called db
module.exports = db
