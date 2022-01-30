import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PatientList from './PatientList.js';
import TreatmentList from './TreatmentList.js';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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

    useEffect(()=>{
        fetchPatientRecords();
        fetchTreatmentRecords();
      },[])

    function setPatientState(id, patientName, patientSurname, gender){
        setId(id);
        setPatientName(patientName);
        setPatientSurname(patientSurname);
        setGender(gender);
    }

    function fetchPatientRecords(){
        axios.get('http://localhost:8080/patients')
        .then( (response) => {
            var resData = response.data;
            setPatients(resData.data);
        });
    }

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

    function deletePatient(){
        axios.delete(`http://localhost:8080/deletePatient/${id}`)
        .then( (response) => {
            fetchPatientRecords()
            clearPatients();
        });
    }
    
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

    function clearPatients() {
        setId(id);
        setPatientName('');
        setPatientSurname('');
        setGender('');
    }

    function displayPatientHandler(){
        fetchPatientRecords();
    }

    function savePatientHandler(){
        savePatient();
    }

    function deletePatientHandler(){
        deletePatient();
    }

    function updatePatientHandler(){
        updatePatient();
    }

    function setTreatmentState(id, treatmentName, idAllergy, treatmentCategory){
        setTreatmentId(id);
        setIsAllergy(idAllergy);
        setTreatmentName(treatmentName);
        setTreatmentCategory(treatmentCategory);
    }

    function fetchTreatmentRecords(){
        axios.get('http://localhost:8080/treatments')
        .then( (response) => {
            var resData = response.data;
            setTreatments(resData.data);
            filterTreatments(filteredTreatmentCategory, resData.data)
        });
    }

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

    function deleteTreatment(){
        axios.delete(`http://localhost:8080/deleteTreatment/${treatmentId}`)
        .then( (response) => {
            fetchTreatmentRecords()
        });
    }
    
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

    function displayTreatmentHandler(){
        fetchTreatmentRecords();
    }

    function saveTreatmentHandler(){
        saveTreatment();
    }

    function deleteTreatmentHandler(){
        deleteTreatment();
    }

    function updateTreatmentHandler(){
        updateTreatment();
    }
    
    function clearTreatments() {
        setTreatmentId('');
        setIsAllergy('');
        setTreatmentName('');
        setTreatmentCategory('');
    }

    function filterTreatments(isChecked, allTreatments) {
        setFilteredTreatmentCategory(isChecked)
        setFilteredTreatments(allTreatments.filter(f => f.treatmentCategory === isChecked))
    }


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
                <h3>List of Patients</h3>

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

            <h3>Show treatments</h3>
            <h3>Treatment Panel</h3>
            <Row className="d-grid gap-2">
                <Col >
                    <input type="text" placeholder='Treatment Name' value ={treatmentName} onChange ={e => setTreatmentName(e.target.value) }/>
                </Col>
                <Col/>
            </Row>
            <Row className="d-grid gap-2">
                <Col>
                Allergy 
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
            <Row className="d-grid gap-2">
                <Col>
                    Treatment category  
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
            <Row className="d-grid gap-2">
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
           
            <Row className="d-grid gap-2">
                <Col>
                    <h3>List of treatments</h3>
                </Col>
                <Col>
                    Treatment category  
                    <BootstrapSwitchButton
                        checked={filteredTreatmentCategory === '1' ? true : false}
                        onlabel='1'
                        offlabel='2'
                        onChange={(checked) => {
                            filterTreatments(checked ? '1': '2', treatments)
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
        </Container>
    );

}

export default PatientPanel;
