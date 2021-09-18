import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import "../css/admin.css";
import Calendar from "../Components/Calendar";
import InputHistory from "../Components/InputHistory";
import ManageDoctor from "../Components/ManageDoctor";
import ManagePackage from "../Components/ManagePackage";
import BuyPackage from "../Components/BuyPackage";
import SetCaseName from "../Components/SetCaseName";
import ShowReport_Admin from "../Components/ShowReport_Admin"
import CancelCase from "../Components/CancelCase"
import Payables from "../Components/Payables"
import Report from "../Components/Report"
import SetHeader_Doctor from "../Components/SetHeader_Doctor";
import ManageUser from "../Components/ManageUser";
import TableHistory_Case from "../Components/TableHistory_Case";
import Summary from "../Components/Summary";

import HomeIcon from '@material-ui/icons/Home';

function Admin() {
  const history = useHistory();
  const [Status, setStatus] = useState("True");
  const [ShowMainPage, setShowMainPage] = useState(true);
  const [ShowCalendar, setShowCalendar] = useState(false);
  const [ShowInputHistory, setShowInputHistory] = useState(false);
  const [ShowManageDoctor, setShowManageDoctor] = useState(false);
  const [ShowManagePackage, setShowManagePackage] = useState(false);
  const [ShowBuyPackage, setShowBuyPackage] = useState(false);
  const [ShowSetCaseName, setShowSetCaseName] = useState(false);
  const [ShowReport, setShowReport] = useState(false)
  const [ShowCancelCase, setShowCancelCase] = useState(false)
  const [ShowPayables, setShowPayables] = useState(false)
  const [ShowSetHeader_Doctor, setShowSetHeader_Doctor] = useState(false)
  const [ShowManageUser, setShowManageUser] = useState(false)
  const [ShowTableHistory_Case, setShowTableHistory_Case] = useState(false)
  const [ShowSummary, setShowSummary] = useState(false)
  if (localStorage.getItem("isLogin") == 1) {
    console.log("Login Sucess");
  } else {
    history.push("/");
  }
  const onLogout = () => {
    history.push("/");
  };
  const Clear = () => {
    setShowMainPage(false);
    setShowCalendar(false);
    setShowInputHistory(false);
    setShowManageDoctor(false);
    setShowManagePackage(false);
    setShowBuyPackage(false);
    setShowSetCaseName(false);
    setShowReport(false);
    setShowCancelCase(false);
    setShowPayables(false);
    setShowSetHeader_Doctor(false)
    setShowManageUser(false)
    setShowTableHistory_Case(false)
    setShowSummary(false)
  };
  const onShowCalendar = () => {
    Clear();
    setShowCalendar(true);
  };
  const onShowMainPage = () => {
    Clear()
    setShowMainPage(true);
  };
  const onShowInputHistory = () => {
    Clear();
    setShowInputHistory(true);
  };
  const onShowManageDoctor = () => {
    Clear();
    setShowManageDoctor(true);
  };
  const onShowManagePackage = () => {
    Clear();
    setShowManagePackage(true);
  };
  const onShowBuyPackage = () => {
    Clear();
    setShowBuyPackage(true);
  };
  const onShowSetCaseName = () => {
    Clear();
    setShowSetCaseName(true);
  };
  const onShowReport=()=>{
    Clear()
    setShowReport(true)
  }
  const onShowCancelCase=()=>{
    Clear()
    setShowCancelCase(true)
  }
  const onShowPayables=()=>{
    Clear()
    setShowPayables(true)
  }
  const onShowSetHeader_Doctor=()=>{
    Clear()
    setShowSetHeader_Doctor(true)
  }
  const onShowManageUser=()=>{
    Clear()
    setShowManageUser(true)
  }
  const onShowTableHistory_Case=()=>{
    Clear()
    setShowTableHistory_Case(true)
  }
  const onShowSummary=()=>{
    Clear()
    setShowSummary(true)
  }
  return (
    <div className="page-admin">
      <div className="column-left">
        <h1>Admin Page</h1>
        <Button
          style={{ width: "90%", margin: "5px" ,textAlign:"left"}}
          className="buttonmenu"
          variant="contained"
          color="primary"
          onClick={onShowMainPage}
        >
          <HomeIcon style={{ width: "20px", float: "left" ,marginRight: "2px"}} ></HomeIcon><span> : หน้าหลัก </span>
        </Button>
        <Button
          style={{ width: "90%", margin: "5px", textAlign:"left"}}
          variant="contained"
          color="primary"
          onClick={onShowCalendar}
        >
          <span style={{textAlign:"left"}}>01 : ตารางเคส </span>
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" ,textAlign:"left"}}
          variant="contained"
          color="primary"
          onClick={onShowBuyPackage}
        >
          <span style={{textAlign:"left"}}>02 : ขายแพ็คเกจ</span>
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowInputHistory}
        >
         03 : ฐานข้อมูลผู้ป่วย
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowSetCaseName}
        >
         04 : ตั้งชื่อเคส-โซน-สถานะ
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowReport}
        >
          05 : แฟ้มประวัติ
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowPayables}
        >
         ชื่อค้างชำระ (รวม 06)
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowCancelCase}
        >
          06 : ประวัติการทำเคส
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowManageDoctor}
        >
          07 : ประวัติหมอ
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowManagePackage}
        >
          08 : จัดการแพ็คเกจ
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowManageUser}
        >
          09 : จัดการข้อมูลผู้ป่วย
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowSetHeader_Doctor}
        >
         10 : ตั้งทีมหมอ
        </Button>
        <Button
          style={{ width: "90%", margin: "5px", textAlign:"left"}}
          variant="contained"
          color="primary"
          onClick={onShowSummary}
        >
          <span style={{textAlign:"left"}}>00 : Summary </span>
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
      <div className="column-rigth">
        <h1>Status: {Status}</h1>
        {ShowMainPage ? <Report /> : null}
        {ShowCalendar ? <Calendar /> : null}
        {ShowInputHistory ? <InputHistory /> : null}
        {ShowManageDoctor ? <ManageDoctor /> : null}
        {ShowBuyPackage ? <BuyPackage /> : null}
        {ShowManagePackage ? <ManagePackage /> : null}
        {ShowSetCaseName ? <SetCaseName /> : null}
        {ShowReport?<ShowReport_Admin/>:null}
        {ShowCancelCase?<TableHistory_Case/>:null}
        {ShowPayables?<Payables/>:null}
        {ShowSetHeader_Doctor?<SetHeader_Doctor/>:null}
        {ShowManageUser?<ManageUser/>:null}
        {ShowSummary?<Summary/>:null}
      </div>
    </div>
  );
}
export default Admin;
