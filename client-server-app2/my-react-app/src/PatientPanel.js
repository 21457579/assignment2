// import these components to be able to use them.
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientList from './PatientList.js';
import TreatmentList from './TreatmentList.js';
import PrescriptionList from './PrescriptionList.js';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

// Create a function containing Hooks State.
function PatientPanel() {

    const [id, setId] = React.useState('');
    const [patientName, setPatientName] = React.useState('');
    const [patientSurname, setPatientSurname] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [patients, setPatients] = React.useState([]);

    const [treatmentCategory, setTreatmentCategory] = React.useState('');
    const [isAllergy, setIsAllergy] = React.useState('');
    const [treatmentName, setTreatmentName] = React.useState('');
    const [treatmentId, setTreatmentId] = React.useState('');
    const [treatments, setTreatments] = React.useState([]);

    const [filteredTreatmentCategory, setFilteredTreatmentCategory] = React.useState('1');
    const [filteredTreatments, setFilteredTreatments] = React.useState([]);

    const [prescriptions, setPrescriptions] = React.useState([]);
    const [prescriptionName, setPrescriptionName] = React.useState([]);

    const [filteredPrescriptions, setFilteredPrescriptions] = React.useState([]);

    // To tell the function what to do after render.
    useEffect(()=>{
        fetchPatientRecords();
        fetchTreatmentRecords();
        fetchPrescriptionRecords();
      },[])

    // Use set to re-render the components when the state changes.
    function setPatientState(id, patientName, patientSurname, gender){
        setId(id);
        setPatientName(patientName);
        setPatientSurname(patientSurname);
        setGender(gender);

        filterTreatments(filteredTreatmentCategory, treatments, id)
    }

    // Get the patient records data
    function fetchPatientRecords(){
        axios.get('http://localhost:8080/patients')
        .then( (response) => {
            var resData = response.data;
            setPatients(resData.data);
        });
    }

    // Save the patient information
    function savePatient(){
        const value = {
            id: id,
            name: patientName,
            surname: patientSurname,
            gender: gender
        };

        axios.post('http://localhost:8080/patient', value)
        .then( (response) => {
            fetchPatientRecords();
            setId(response.data.data.id)
        });
    }

    // Delete patient information
    function deletePatient(){
        axios.delete(`http://localhost:8080/deletePatient/${id}`)
        .then( (response) => {
            fetchPatientRecords()
            clearPatients();
        });
    }
    
    // Update patient information
    function updatePatient(){
        const value = {
            id: id,
            name: patientName,
            surname: patientSurname,
            gender: gender
        };
        axios.put(`http://localhost:8080/updatePatient/${id}`, value)
        .then( (response) => {
            fetchPatientRecords()
        });
    }

    // Clear the input bars
    function clearPatients() {
        setId(id);
        setPatientName('');
        setPatientSurname('');
        setGender('');
    }

    // Display patient information
    function displayPatientHandler(){
        fetchPatientRecords();
    }

    // save patient information
    function savePatientHandler(){
        savePatient();
    }

    // delete patient information
    function deletePatientHandler(){
        deletePatient();
    }

    // update patient information
    function updatePatientHandler(){
        updatePatient();
    }

    // 
    function setTreatmentState(id, treatmentName, idAllergy, treatmentCategory){
        setTreatmentId(id);
        setIsAllergy(idAllergy);
        setTreatmentName(treatmentName);
        setTreatmentCategory(treatmentCategory);

        filterPrescriptions(prescriptions, id);
    }

    // Get the treatment records from the database
    function fetchTreatmentRecords(){
        axios.get('http://localhost:8080/treatments')
        .then( (response) => {
            var resData = response.data;
            setTreatments(resData.data);
            filterTreatments(filteredTreatmentCategory, resData.data, id)
        });
    }

    // Save the treatment information
    function saveTreatment(){
        const value = {
            id: treatmentId,
            patientId: id,
            treatmentName: treatmentName,
            isAllergy: isAllergy,
            treatmentCategory: treatmentCategory
        };

        axios.post('http://localhost:8080/treatment', value)
        .then( (response) => {
            fetchTreatmentRecords();
            setTreatmentId(response.data.data.treatmentId)
        });
    }

    // delete treatment information.
    function deleteTreatment(){
        axios.delete(`http://localhost:8080/deleteTreatment/${treatmentId}`)
        .then( (response) => {
            fetchTreatmentRecords()
        });
    }
    
    // Update treatment information
    function updateTreatment(){
        const value = {
            id: treatmentId,
            patientId: id,
            treatmentName: treatmentName,
            isAllergy: isAllergy,
            treatmentCategory: treatmentCategory
        };
        axios.put(`http://localhost:8080/updateTreatment/${treatmentId}`, value)
        .then( (response) => {
            fetchTreatmentRecords()
        });
    }

    // Display treatment records
    function displayTreatmentHandler(){
        fetchTreatmentRecords();
    }

    // Save treatment information
    function saveTreatmentHandler(){
        saveTreatment();
    }

    // Delete treatment information
    function deleteTreatmentHandler(){
        deleteTreatment();
    }

    // Update treatment information
    function updateTreatmentHandler(){
        updateTreatment();
    }
    
    // Clear input bars
    function clearTreatments() {
        setId('')
        setTreatmentId('');
        setIsAllergy('');
        setTreatmentName('');
        setTreatmentCategory('');
    }

    // Filter treatments after treatment category
    function filterTreatments(isChecked, allTreatments, id) {
        setFilteredTreatmentCategory(isChecked)
        setFilteredTreatments(allTreatments.filter(f => 
            f.treatmentCategory === isChecked
            && f.patientId === id))
    }

    // 
    function setPrescriptionState(id,  prescriptionName, treatmentName){
        setId(id);
        setPatientName(prescriptionName);
        setTreatmentName(treatmentName);
    }

    // Get prescription records from database
    function fetchPrescriptionRecords(){
        axios.get('http://localhost:8080/prescriptions')
        .then( (response) => {
            var resData = response.data;
            setPrescriptions(resData.data);
            filterPrescriptions(resData.data, treatmentId)
        });
    }

    // Save prescriptions
    function savePrescription(){
        const value = {
            id: id,
            prescriptionName: prescriptionName,
            treatmentId: treatmentId
        };

        axios.post('http://localhost:8080/prescription', value)
        .then( (response) => {
            fetchPrescriptionRecords();
            setId(response.data.data.id)
        });
    }

    // Delete prescription
    function deletePrescription(){
        axios.delete(`http://localhost:8080/deletePrescription/${id}`)
        .then( (response) => {
            fetchPrescriptionRecords()
            clearPrescriptions();
        });
    }
    
    // Update prescription
    function updatePrescription(){
        const value = {
            id: id,
            prescriptionName: prescriptionName,
            treatmentName: treatmentName
        };
        axios.put(`http://localhost:8080/updatePrescription/${id}`, value)
        .then( (response) => {
            fetchPrescriptionRecords()
        });
    }

    // Clear input bars
    function clearPrescriptions() {
        setId(id);
        setPrescriptionName('');
        setTreatmentName('');
    }

    // Display prescriptions
    function displayPrescriptionHandler(){
        fetchPrescriptionRecords();
    }

    // Save prescriptions
    function savePrescriptionHandler(){
        savePrescription();
    }

    // Delete prescriptions
    function deletePrescriptionHandler(){
        deletePrescription();
    }

    // Update prescriptions
    function updatePrescriptionHandler(){
        updatePrescription();
    }

    function filterPrescriptions(allPrescriptions, id) {
        setFilteredPrescriptions(allPrescriptions.filter(f => 
            f.treatmentId === id))
    }

    // What is shown in the app
    return (
        <Container>
            <h3>Patient Panel</h3>
            <Row className="d-grid gap-2">
                <Col >
                    <input type="text" placeholder='Patient Name' value ={patientName} onChange ={e => setPatientName(e.target.value) }/>
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <input type="text" placeholder='Patient Surname' value ={patientSurname} onChange ={e => setPatientSurname(e.target.value) }/>
                </Col>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <input type="text" placeholder='Gender' value ={gender} onChange ={e => setGender(e.target.value) }/>
                </Col>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <br />
                    <Button type="button" variant="secondary" onClick={savePatientHandler}>Save patient</Button>       
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={updatePatientHandler}>Update patient</Button>   
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={deletePatientHandler}>Delete patient</Button>   
                </Col>
                <Col/>
            </Row>
            <Row>
                <Col>
                    <Button type="button" variant="danger" onClick={clearPatients}>Clear</Button>  
                </Col>
            </Row>
           
            <Row className="d-grid gap-2">
                <br />
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        <PatientList patients = {patients} 
                        setPatientState={setPatientState} />
                    </tbody>
                </Table>
            </Row>

            <Row>
                <Col>
                    <hr></hr>
                </Col>
            </Row>

            <h3>Treatment Panel</h3>
            <Row className="d-grid gap-2">
                <Col >
                    <input type="text" placeholder='Treatment Name' value ={treatmentName} onChange ={e => setTreatmentName(e.target.value) }/>
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                <span style={{marginRight: 5}}>Allergy </span>
                <BootstrapSwitchButton
                    checked={isAllergy === 'true' ? true : false}
                    onlabel='Yes'
                    offlabel='No'
                    onChange={(checked) => {
                        setIsAllergy(checked ? 'true': 'false')
                    }}
                />
                </Col>
            </Row>
            <Row className="d-grid gap-2" style={{marginTop: 5}}>
                <Col>
                    <span style={{marginRight: 5}}>Treatment category </span>
                    <BootstrapSwitchButton
                        checked={treatmentCategory === '1' ? true : false}
                        onlabel='1'
                        offlabel='2'
                        onChange={(checked) => {
                            setTreatmentCategory(checked ? '1': '2')
                        }}
                    />
                </Col>
            </Row>
            <Row className="d-grid gap-2" style={{marginTop: 10}}>
                <Col>
                    <Button type="button" variant="secondary" onClick={saveTreatmentHandler}>Save treatment</Button>       
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={updateTreatmentHandler}>Update treatment</Button>   
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={deleteTreatmentHandler}>Delete treatment</Button>   
                </Col>
                <Col/>
            </Row>
            <Row>
                <Col>
                    <Button type="button" variant="danger" onClick={clearTreatments}>Clear</Button>  
                </Col>
            </Row>
           
            <Row className="d-grid gap-2" style={{marginBottom: 10}}>
                <Col style={{marginLeft: '80%'}}>
                    <span style={{marginRight: 5}}>Filter on category </span>
                    <BootstrapSwitchButton
                        checked={filteredTreatmentCategory === '1' ? true : false}
                        onlabel='1'
                        offlabel='2'
                        onChange={(checked) => {
                            filterTreatments(checked ? '1': '2', treatments, id)
                        }}
                    />
                </Col>
            </Row>
            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Treatment Name</th>
                        <th>Allergy</th>
                        <th>Treatment Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        <TreatmentList treatments = {filteredTreatments} 
                        setTreatmentState={setTreatmentState} />
                    </tbody>
                </Table>
            </Row>
            <Row className="d-grid gap-2">
            </Row>

            <Row>
                <Col>
                    <hr></hr>
                </Col>
            </Row>

            <h3>Prescription Panel</h3>
            <Row className="d-grid gap-2">
                <Col >
                    <input type="text" placeholder='Prescription Name' value ={prescriptionName} onChange ={e => setPrescriptionName(e.target.value) }/>
                </Col>
                <Col/>
            </Row>

            <Row className="d-grid gap-2" style={{marginTop: 10}}>
                <Col>
                    <Button type="button" variant="secondary" onClick={savePrescriptionHandler}>Save prescription</Button>       
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={updatePrescriptionHandler}>Update prescription</Button>   
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                    <Button type="button" variant="secondary" onClick={deletePrescriptionHandler}>Delete prescription</Button>   
                </Col>
                <Col/>
            </Row>

            <Row>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                        <th>Prescription Name</th>
                        </tr>
                    </thead>
                    <tbody>
                    <PrescriptionList prescriptions = {filteredPrescriptions} 
                        setPrescriptionState={setPrescriptionState} />
                    </tbody>
                </Table>
            </Row>

        </Container>
    );

}

export default PatientPanel;
