import React from 'react';

// A component is created to display treatment records

// Props are used to send data from one component to another. 
function Treatment (props) { 
    let style = {}

    if (props.item.id && props.treatmentHasPrescriptions(props.item.id)) {
        style = {
            color: 'blue'    
        };
    }
    return (
        <tr key={props.item.treatmentName} onClick={() => props.setTreatmentState(props.item.id, props.item.treatmentName, props.item.isAllergy, props.item.treatmentCategory)}>
            <td style={style}>{props.item.treatmentName}</td> 
            <td style={style}>{props.item.isAllergy}</td>
            <td style={style}>{props.item.treatmentCategory}</td>
        </tr>
    );
}
export default Treatment; 