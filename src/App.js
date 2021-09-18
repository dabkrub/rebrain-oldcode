import Home from "./Page/Home";
import InputHistory from "./Components/InputHistory";
import React from "react";
import Admin from "./Page/Admin"
import User from "./Page/User"
import Doctor from "./Page/Doctor"
import Form_FirstCase_Report from "./Components/Form_FirstCase_Report";
import Form_Day_Report from "./Components/Form_Day_Report";
import Form_Month_Report from "./Components/Form_Month_Report";
import HeaderDoctor from "./Page/HeaderDoctor";
import viewBill from "./Components/ViewBill";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
function App() {

  return (
    
    <div>
      {/* <NavbarScreen /> */}
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admin" exact component={Admin}/>
          <Route path="/input" exact component={InputHistory}/>
          <Route path="/user" exact component={User}/>
          <Route path="/doctor" exact component={Doctor}/>
          <Route
            path="/firstreport"
            exact
            component={Form_FirstCase_Report}
          />
          <Route path="/dayreport" exact component={Form_Day_Report}/>
          <Route path="/monthreport" exact component={Form_Month_Report}/>
          <Route path="/headerdoctor" exact component={HeaderDoctor}/>
          <Route path="/viewBill" exact component={viewBill}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
