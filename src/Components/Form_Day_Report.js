import React,{ useState } from "react";
import Button from "@material-ui/core/Button";
import "../css/DayCase.css";

function Form_Day_Report(props) {
  console.log(props);
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
    <div>
       <div className="group-daycase"><p style={{float : "left"}}><b>รายงานรายวัน</b></p><p style={{float : "right"}}><b>วันที่ประเมิน</b> : {props.location.data.Assessment_Date}</p>
      <h2 style={{marginLeft: "35%"}} >ReBRAIN Connect</h2>
      <p><b>ชื่อเคส</b> :{props.location.data.CaseName}</p>
      <p><b>ชื่อผู้ป่วย</b> : {props.location.data.Name}</p>
      <p><b>อาการหลังการรักษา</b> : {props.location.data.After_Treat}</p>
      <p><b>ค่าความดันเริ่มต้น</b> : {props.location.data.BP}</p>
      <p><b>อาการเริ่มต้น</b> : {props.location.data.Initial_Symptoms}</p>
      <p><b>อัตราการเต้นของหัวใจ</b> : {props.location.data.PR}</p>
      <hr style={{width : "100%"}}></hr>
      <p><b>การรักษาทางกายภาพบำบัด (2)</b> : {props.location.data.Therapy2}</p>
      <p><b>การรักษาทางกายภาพบำบัด (2) เพิ่มเติม</b> : {props.location.data.Therapy2_Text}</p>
      <p><b>การรักษาทางกายภาพบำบัด (3)</b> : {props.location.data.Therapy3}</p>
      <p><b>การรักษาทางกายภาพบำบัด (3) เพิ่มเติม</b> : {props.location.data.Therapy3_Text}</p>
      <p><b>การรักษาทางกายภาพบำบัด (4)</b> : {props.location.data.Therapy4}</p>
      <p><b>การรักษาทางกายภาพบำบัด (4) เพิ่มเติม</b> : {props.location.data.Therapy4_Text}</p>
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

export default Form_Day_Report;
