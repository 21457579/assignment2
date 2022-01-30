import React from 'react';

// A component is created to display treatment records
// The attributes are listed using the <li> element, which is the element used in React/JSX to create lists.
// Key is used in react to identify which items the list regards.
// Props are used to send data from one component to another. In this case from MedicalTreatment component to the Treatments component.
function Patient (props) { 
    return (
        <tr key={props.item.name} onClick={() => props.setPatientState(props.item.id, props.item.name, props.item.surname, props.item.gender)}>
            <td>{props.item.name}</td> 
            <td>{props.item.surname}</td> 
            <td>{props.item.gender}</td>
        </tr>
    );
}

// Export the file so it can be accessed and used in the App.js file.
export default Patient; 