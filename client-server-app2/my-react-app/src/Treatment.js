import React from 'react';

// A component is created to display treatment records

// Props are used to send data from one component to another. 
function Treatment (props) { 
    return (
        <tr key={props.item.treatmentName} onClick={() => props.setTreatmentState(props.item.id, props.item.treatmentName, props.item.isAllergy, props.item.treatmentCategory)}>
            <td>{props.item.treatmentName}</td> 
            <td>{props.item.isAllergy}</td>
            <td>{props.item.treatmentCategory}</td>
        </tr>
    );
}
export default Treatment; 