// import { Button } from "@material-ui/core";
import React,{ useState } from "react";
import "../css/FirstCase.css";

import Button from "@material-ui/core/Button";

function Form_FirstCase_Report(props) {
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
    <div className="detail-firstcase">
      <div className="group-firstcase"><p style={{float : "left"}}><b>รายงานแรกรับ</b></p><p style={{float : "right"}}><b>วันที่ประเมิน</b> : {props.location.data.Assessment_Date}</p>
      <h2 style={{marginLeft: "35%"}} >ReBRAIN Connect</h2>
        {/* <p>ชื่อเคส: {props.location.data.CaseName}</p> */}
        <p><b>ชื่อผู้ป่วย</b> : {props.location.data.Name} <a style={{marginLeft: "10px"}}><b>อายุ</b> : {props.location.data.Age} ปี </a></p>
        <p><b>วันแรกที่มีอาการ</b> : {props.location.data.First_Symptom_Date}</p>
        <p><b>โรคประจำตัว</b> : {props.location.data.Congenital_Disease}</p>
        <p><b>วินิจฉัยการบำบัด</b> : {props.location.data.Diagnose} </p>
        <p><b>ระดับความสามารถสูงสุดปัจจุบัน</b> : {props.location.data.Current_maximum_skill_level}</p>
        <p><b>เป้าหมายการฟื้นฟูสูงสุด</b> : {props.location.data.Maximum_Recovery_Goal}</p>
        <p><b>ระยะเวลาในการฟื้นฟู(เดือน)</b> : {props.location.data.Recovery_Time_Months}</p>
        <p><b>จำนวนครั้งต่อสัปดาห์</b> : {props.location.data.Number_of_Times_Week} ครั้ง</p>
        <hr style={{width : "100%"}}></hr>
        <p><b>เป้าหมายระยะสั้น(1)</b> : {props.location.data.Short_Target1}</p>
        <p><b>เป้าหมายระยะสั้น(1)เพิ่มเติม</b> : {props.location.data.Short_Target1_Text}</p>
        <p><b>เป้าหมายระยะสั้น(2)</b> : {props.location.data.Short_Target2}</p>
        <p><b>เป้าหมายระยะสั้น(2)เพิ่มเติม</b> : {props.location.data.Short_Target2_Text}</p>
        <p><b>เป้าหมายระยะสั้น(3)</b> : {props.location.data.Short_Target3} </p>
        <p><b>เป้าหมายระยะสั้น(3)เพิ่มเติม</b> : {props.location.data.Short_Target3_Text}</p>
        <hr style={{width : "100%"}}></hr>
        <p><b>การรักษาทางกายภาพบำบัด(1)</b> : {props.location.data.Therapy} </p>
        <p><b>การรักษาทางกายภาพบำบัด(1)</b> : {props.location.data.Therapy_Text}</p>
        <p><b>การรักษาทางกายภาพบำบัด(2)</b> : {props.location.data.Therapy2}</p>
        <p><b>การรักษาทางกายภาพบำบัด(2)</b> : {props.location.data.Therapy_Text2}</p>
        <p><b>การรักษาทางกายภาพบำบัด(3)</b> : {props.location.data.Therapy3}</p>
        <p><b>การรักษาทางกายภาพบำบัด(3)</b> : {props.location.data.Therapy_Text3}</p>
        <p><b>การรักษาทางกายภาพบำบัด(4)</b> : {props.location.data.Therapy4}</p>
        <p><b>การรักษาทางกายภาพบำบัด(4)</b> : {props.location.data.Therapy_Text4}</p>
        <p><b>การรักษาทางกายภาพเพิ่มเติม</b> : {props.location.data.Additional_Therapy}</p>
        <hr style={{width : "100%"}}></hr>
        <p><b>ชื่อนักายภาพ</b> : {props.location.data.DoctorName}</p>
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

export default Form_FirstCase_Report;
