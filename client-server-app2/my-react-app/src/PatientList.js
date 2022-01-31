import React from 'react';
import Patient from './Patient.js';

function PatientList(props) {

  // Return the list with the patients, generated by the Patient component. 
  return props.patients.map((patient) => 
        <Patient item = {patient} setPatientState={props.setPatientState} patientHasAllergies={props.patientHasAllergies}  />
    );
}

export default PatientList;