import React, { useState } from 'react';
const ChildComponent = (props) => {
    const [name, setname] = useState('5555')
    
    return(
        <div>
            <h1>Function</h1>
            <h2> {props.message} </h2>
            <h1>{props.name}</h1>
        </div>
          
    );
}
export default ChildComponent;