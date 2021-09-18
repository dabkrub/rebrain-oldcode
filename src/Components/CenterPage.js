import React from "react";
import '../css/CenterPage.css'
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
const CenterPage = () => {
    const history = useHistory();
    function AdminClick(){
        history.push("/loginadmin");
    }
    function UserClick(){
        history.push("/loginuser")
    }
  return (
    <div>
      <div className={"button-login"}>
        <Button variant="contained" color="primary" onClick={AdminClick}>
          Admin
        </Button>
        <a className="margin"></a>
        <Button variant="contained" color="primary" onClick={UserClick}>
          User
        </Button>
      </div>
    </div>
  );
};

export default CenterPage;
