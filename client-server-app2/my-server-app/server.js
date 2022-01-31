var express = require("express")
var cors = require('cors');
var crypto = require("crypto")
var bodyParser = require("body-parser");
var db = require("./database.js")

var app = express()

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Server port
var HTTP_PORT = 8080 

// Start server
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});


// Root endpoint
app.get("/", (req, res, next) => {
   res.json({"message":"Ok"})
});

///////////////
// Patients
//////////////
// list all patients
app.get("/patients", (req, res, next) => {
    console.log("SELECT Patients.");
    let sql = `SELECT id, name, surname, gender FROM patient ORDER BY name`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          console.log(err.message)
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single patient by name
app.get("/patients/:name", (req, res, next) => {
    var sql = "select * from patient where name = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new patient
app.post("/patient/", (req, res, next) => {
    var errors=[]
    if (!req.body.name){
        errors.push("Name for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    console.log("Name:" + req.body.name);

    var data = {
        id: crypto.randomUUID(),
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender
    }
    var sql ='INSERT INTO patient (id, name, surname, gender) VALUES (?,?,?,?)'
    var params =[data.id, data.name, data.surname, data.gender]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            console.log(err.message)
            return;
        }
        console.log(res)

        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// update patient
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updatePatient/:id", (req, res, next) => {
    console.log("UPDATE Patient:" + req.params.id);
    var data = {
        name: req.body.name,
        surname: req.body.surname,
        gender: req.body.gender
    }
    console.log("Name:" + req.body.name);

    console.log("UPDATE Patient: data.name = " + data.name);
    db.run(
        `UPDATE patient set 
            id = COALESCE(?,id), 
            name = COALESCE(?,name), 
           surname = COALESCE(?,surname),
           gender = COALESCE(?,gender)  
             WHERE id = ?`,
        [req.params.id, data.name, data.surname, data.gender, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// delete patient
app.delete("/deletePatient/:id", (req, res, next) => {

    console.log("DELETE Patient:" + req.params.id);

    db.run(
        'DELETE FROM patient WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

///////////////
////Treatments
//////////////
// List treatments
app.get("/treatments", (req, res, next) => {
    console.log("SELECT Treatments.");
    let sql = `SELECT * FROM treatment ORDER BY treatmentName`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single treatment by name
app.get("/treatments/:id", (req, res, next) => {
    var sql = "select * from treatment where id = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new treatment
app.post("/treatment/", (req, res, next) => {
    var errors=[]
    if (!req.body.treatmentName){
        errors.push("Name for patient not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    console.log("Name:" + req.body.treatmentName);

    var data = {
        id: crypto.randomUUID(),
        patientId: req.body.patientId,
        treatmentName: req.body.treatmentName,
        treatmentCategory: req.body.treatmentCategory,
        isAllergy: req.body.isAllergy
    }
    var sql ='INSERT INTO treatment (id, patientId, treatmentName, treatmentCategory, isAllergy) VALUES (?,?,?,?,?)'
    var params =[data.id, data.patientId, data.treatmentName, data.treatmentCategory, data.isAllergy]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// update treatments
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updateTreatment/:id", (req, res, next) => {
    console.log("UPDATE Treatment:" + req.params.id);
    var data = {
        patientId: req.body.patientId,
        treatmentName: req.body.treatmentName,
        treatmentCategory: req.body.treatmentCategory,
        isAllergy: req.body.isAllergy
    }
    console.log("id:" + req.body.id);
    console.log("patientId:" + req.body.patientId);
    console.log("treatmentName:" + req.body.treatmentName);
    console.log("treatmentCategory:" + req.body.treatmentCategory);
    console.log("isAllergy:" + req.body.isAllergy);

    console.log("UPDATE Treatment: data.id = " + data.id);
    db.run(
        `UPDATE treatment set 
           id = COALESCE(?,id), 
           patientId = COALESCE(?,patientId), 
           treatmentName = COALESCE(?,treatmentName),
           treatmentCategory = COALESCE(?,treatmentCategory), 
           isAllergy = COALESCE(?,isAllergy) 
            WHERE id = ?`,
        [req.params.id, data.patientId, data.treatmentName, data.treatmentCategory, data.isAllergy, req.params.id],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                console.log("Error: " + err)
                return;
            }
            console.log("success")

            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// delete treatments
app.delete("/deleteTreatment/:id", (req, res, next) => {

    console.log("DELETE Treatment:" + req.params.treatmentName);

    db.run(
        'DELETE FROM treatment WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})

//////////////////
////Prescriptions
/////////////////
//List all prescriptions
app.get("/prescriptions", (req, res, next) => {
    console.log("SELECT Prescriptions.");
    let sql = `SELECT * FROM prescription ORDER BY prescriptionName`;
    var params = []
    db.all(sql, params, (err, rows) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
      });
});

// Get a single prescription by name
app.get("/prescriptions/:id", (req, res, next) => {
    var sql = "select * from prescription where id = ?"
    var params = [req.params.name]
    db.get(sql, params, (err, row) => {
        if (err) {
          res.status(400).json({"error":err.message});
          return;
        }
        res.json({
            "message":"success",
            "data":row
        })
      });
});

// Create a new prescription
app.post("/prescription/", (req, res, next) => {
    var errors=[]
    if (!req.body.prescriptionName){
        errors.push("Name for prescription not specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    console.log("Name:" + req.body.prescriptionName);

    var data = {
        id: crypto.randomUUID(),
        prescriptionName: req.body.prescriptionName,
        treatmentName: req.body.treatmentName
        
    }
    var sql ='INSERT INTO prescription (id, prescriptionName, treatmentId) VALUES (?,?,?)'
    var params =[data.id, data.prescriptionName, data.treatmentId]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
});


// update prescription
// we use COALESCE function to keep the current value if there is no new value (null)
app.put("/updatePrescription/:id", (req, res, next) => {
    console.log("UPDATE Prescription:" + req.params.id);
    var data = {
        prescriptionName: req.body.prescriptionName,
        treatmentName: req.body.treatmentName,
    }
    console.log("id:" + req.body.id);
    console.log("patientId:" + req.body.prescriptionName);
    console.log("treatmentName:" + req.body.treatmentName);

    console.log("UPDATE Prescription: data.id = " + data.id);
    db.run(
        `UPDATE prescription set 
           id = COALESCE(?,id), 
           prescriptionName = COALESCE(?,patientId), 
           treatmentName = COALESCE(?,treatmentName)
            WHERE id = ?`,
        [req.params.id, data.prescriptionName, data.treatmentName],
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                console.log("Error: " + err)
                return;
            }
            console.log("success")

            res.json({
                message: "success",
                data: data,
                changes: this.changes
            })
    });
})

// delete prescription
app.delete("/deletePrescription/:id", (req, res, next) => {

    console.log("DELETE Prescription:" + req.params.prescriptionName);

    db.run(
        'DELETE FROM prescription WHERE id = ?',
        req.params.id,
        function (err, result) {
            if (err){
                res.status(400).json({"error": res.message})
                return;
            }
            res.json({"message":"deleted", changes: this.changes})
    });
})


// Default response for any other request
app.use(function(req, res){
    res.status(404);
});
  