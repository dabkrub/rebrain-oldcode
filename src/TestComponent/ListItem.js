import React, { useState } from 'react';
import Table from './Table'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";
const ListItem = (props) => {
   const {id} =useParams()
    return(
        <div>
           <Table taskID={10} message="hello"/>
        </div>
    );
}
export default ListItem;