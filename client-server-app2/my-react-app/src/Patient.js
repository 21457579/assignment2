import React from 'react';

// A component is created to display patient records
// Props are used to send data from PatientList to Patient. 
function Patient (props) { 
    return (
        <tr key={props.item.name} onClick={() => props.setPatientState(props.item.id, props.item.name, props.item.surname, props.item.gender)}>
            <td>{props.item.name}</td> 
            <td>{props.item.surname}</td> 
            <td>{props.item.gender}</td>
        </tr>
    );
}
export default Patient; 