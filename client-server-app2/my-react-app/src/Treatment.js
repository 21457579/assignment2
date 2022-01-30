import React from 'react';

// A component is created to display treatment records
// The attributes are listed using the <li> element, which is the element used in React/JSX to create lists.
// Key is used in react to identify which items the list regards.
// Props are used to send data from one component to another. In this case from MedicalTreatment component to the Treatments component.
function Treatment (props) { 
    return (
        <tr key={props.item.treatmentName} onClick={() => props.setTreatmentState(props.item.id, props.item.treatmentName, props.item.isAllergy, props.item.treatmentCategory)}>
            <td>{props.item.treatmentName}</td> 
            <td>{props.item.isAllergy}</td>
            <td>{props.item.treatmentCategory}</td>
        </tr>
    );
}

// Export the file so it can be accessed and used in the App.js file.
export default Treatment; 