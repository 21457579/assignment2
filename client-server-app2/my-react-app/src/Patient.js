import React from 'react';

// A component is created to display patient records
// Props are used to send data from PatientList to Patient. 
function Patient (props) {
    let style = {}

    if (props.item.id && props.patientHasAllergies(props.item.id)) {
        style = {
            color: 'red'    
        };
    }
    
    return (
        <tr key={props.item.name} onClick={() => props.setPatientState(props.item.id, props.item.name, props.item.surname, props.item.gender)}>
            <td style={style}>{props.item.name}</td> 
            <td style={style}>{props.item.surname}</td> 
            <td style={style}>{props.item.gender}</td>
        </tr>
    );
}
export default Patient; 