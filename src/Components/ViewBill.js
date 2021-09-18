// import { Button } from "@material-ui/core";
import React,{ useState } from "react";
import "../css/ViewBill.css";

import Button from "@material-ui/core/Button";

function ViewBill(props) {
  console.log("AAAL: ", props);

  const [ButtonPage, setButtonPage] = useState(true);
  const [ButtonPageBack, setButtonPageBack] = useState(false);
  
  const Print = async() => {
    await setButtonPage(false)
    window.print()
    setButtonPageBack(true)
  }
  
  const Back = () => {
    window.history.back();
  }
  return (
    <div className="detail-viewbill">
        <div className="group-viewbill">
            <p style={{float : "left"}}><b>ใบเสร็จการชำระเงิน</b></p>
            <p style={{float : "right"}}><b>บิลใบเสร็จที่ </b> : {props.location.data.bill}</p>
            <h2 style={{marginLeft: "35%"}} >ReBRAIN Connect</h2>
            {/* <p><b>ชื่อเคสผู้ซื้อ</b> : {props.location.data.text}</p> */}
            <p><b>ชื่่อ-สกุลผู้ซื้อ</b> : {props.location.data.UserName}</p>
            <p><b>เลขบัตรผระชาชน</b> : {props.location.data.User_Person_ID}</p>
            <p><b>แพ็คเกจที่ซื้อ</b> : {props.location.data.PackageName}</p>
            <p><b>จำนวนครั้ง/แพ็คเกจ</b> : {props.location.data.PackageAmount} ครั้ง</p>
            <p><b>รูปแบบการชำระ</b> : {props.location.data.Type}</p>
            {props.location.data.BankName == ""?null:<p><b>ชำระผ่านธนาคาร</b> : {props.location.data.BankName}</p>}
            <p><b>วัน/เวลาที่ชำระ</b> : {props.location.data.TimeDate} / {props.location.data.Time} น.</p>
            <p><b>ราคา</b> : {props.location.data.PackagePrice} บาท</p>
            <p>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</p>
        </div>
      {ButtonPage?
      <Button 
        onClick={Print}
        variant="contained"
        color="primary"
        style={{ width: "100%", marginLeft: "10px" }}
      >
        Print
      </Button>
      :null}
      {ButtonPageBack? <Button 
        onClick={Back}
        variant="contained"
        color="primary"
        style={{ width: "100%", marginLeft: "10px" }}
      >
        กลับหน้าแรก
      </Button>:null}
    </div>
  );
}

export default ViewBill;
