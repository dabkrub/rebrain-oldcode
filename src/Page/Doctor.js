import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { useHistory } from "react-router-dom";
import Patient_report_Primary_Case from "../Components/Patient_report_Primary_Case";
import Day_Report from "../Components/Day_Report";
import Month_Report from "../Components/Month_Report";
import Submit_Case from "../Components/Submit_Case";
import Calendar_Doctor from "../Components/Calendar_Doctor"
import Show_Report_Doctor from "../Components/Show_Report_Doctor";
import "../css/Doctor.css";
function Doctor() {
  const [SubmitCase, setSubmitCase] = useState(false);
  const [Calendar, setCalendar] = useState(true);
  const [ShowReport, setShowReport] = useState(false)
  const history = useHistory();
  if (localStorage.getItem("isLoginDoctor") == 0) {
    history.push("/");
  }
  const onLogout = () => {
    history.push("/");
  };
  const onSubit_Case = () => {
    onClear()
    setSubmitCase(true);
  };
  const onCalendar=()=>{
    onClear()
    setCalendar(true)
  }
  const onShowReport=()=>{
    onClear()
    setShowReport(true)
  }
  function onClear(){
    setSubmitCase(false);
    setCalendar(false)
    setShowReport(false)
  }
  console.log(localStorage.getItem("Username_Doctor"));
  return (
    <div className="page-doctor">
      <div className="column-left-doctor">
        <h1>Doctor Page</h1>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onCalendar}
        >
          ดูตาราง
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onSubit_Case}
        >
          แบบยืนยันเคส
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowReport}
        >
          แสดงรายงาน
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onLogout}
        >
          Log Out
        </Button>
      </div>
      <div className="column-rigth-doctor">
        {SubmitCase?<Submit_Case/>:null}
        {Calendar?<Calendar_Doctor/>:null}
        {ShowReport?<Show_Report_Doctor/>:null}
      </div>
    </div>
  );
}

export default Doctor;
