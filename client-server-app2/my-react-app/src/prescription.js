import React from 'react';

// A component is created to display prescriptions
// Props are used to send data from one component to another.
function Prescription (props) { 
    return (
        <tr key={props.item.prescriptionName} onClick={() => 
        props.setPrescriptionState(props.item.id, props.item.prescriptionName)}>
            <td>{props.item.prescriptionName}</td> 
        </tr>
    );
}

export default Prescription; 
