import React from 'react'
import ChildComponent from './ChildComponent';

class ParentComponent extends React.Component {
render(){
    return(
    <div>
        <ChildComponent message={7} name={8}/>
    </div>
      );
   }
}

export default ParentComponent;
