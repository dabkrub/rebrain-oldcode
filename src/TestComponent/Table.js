import { checkPropTypes } from 'prop-types';
import React from 'react'
import ListItem from './ListItem';

class Table extends React.Component {
    constructor(props){
         super(props);
         this.state={
              message: "asdasd",
              taskID: 20
         }
    }
      render(){
          function check(props){
              alert(props.message)
          }
          return(
              <div>
                   <h1>Class Component</h1>
                 <h1>{check}</h1>
              </div>
          );
      }
}
export default Table