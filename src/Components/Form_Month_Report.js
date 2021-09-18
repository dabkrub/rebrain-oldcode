import React, { useState } from "react";
import Button from "@material-ui/core/Button";
// import "../css/MonthCase.css";
import "../css/MonthCase.css";

function Form_Month_Report(props) {
  console.log(props);
  const [ButtonPage, setButtonPage] = useState(true);
  const [ButtonPageBack, setButtonPageBack] = useState(false);

  const Print = async () => {
    await setButtonPage(false);
    window.print();
    setButtonPageBack(true);
  };

  const Back = () => {
    window.history.back();
  };
  return (
    <div>
      <div className="group-monthcase">
        <p style={{ float: "left" }}>
          <b>รายงานรายเดือน</b>
        </p>
        <p style={{ float: "right" }}>
          <b>วันที่ประเมิน</b> : {props.location.data.Assessment_Date}
        </p>
        <h2 style={{ marginLeft: "35%" }}>ReBRAIN Connect</h2>
        <p>
          <b>ชื่อเคส</b> : {props.location.data.CaseName}
        </p>
        <p>
          <b>ชื่อผู้ป่วย</b> : {props.location.data.Name}
        </p>
        <p>
          <b>การบำบัดเพิ่มเติม</b> : {props.location.data.Additional_Therapy}
        </p>
        <p>
          <b>การวิเคราะห์ปัญหา</b> : {props.location.data.Analyze_the_Problem}
        </p>
        {/* <p>วันที่ประเมิน: {props.location.data.Assessment_Date}</p> */}
        <p>
          <b>ความสามารถปัจจุปัน</b> : {props.location.data.Current_Abilities}
        </p>
        <p>
          <b>เป้าหมายการฟื้นฟู</b> : {props.location.data.Maximum_Recovery_Goal}
        </p>
        <p>
          <b>จำนวนครั้งต่อสัปดาห์</b> :{" "}
          {props.location.data.Number_of_Times_Week}
        </p>
        <hr style={{ width: "100%" }}></hr>
        <p>
          <b>เป้าหมายระยะสั้น (1)</b> : {props.location.data.Short_Target1}
        </p>
        <p>
          <b>เป้าหมายระยะสั้น (1) เพิ่มเติม</b>:{" "}
          {props.location.data.Short_Target1_Text}
        </p>
        <p>
          <b>เป้าหมายระยะสั้น (2)</b> : {props.location.data.Short_Target2}
        </p>
        <p>
          <b>เป้าหมายระยะสั้น (2) เพิ่มเติม</b> :{" "}
          {props.location.data.Short_Target2_Text}
        </p>
        <p>
          <b>เป้าหมายระยะสั้น (3)</b> : {props.location.data.Short_Target3}
        </p>
        <p>
          <b>บำบัด(3)</b> : {props.location.data.Therapy_Text3}
        </p>
        <p>
          <b>บำบัด(4)</b> : {props.location.data.Therapy_Text4}
        </p>
        <p>
          <b>การรักษาทางกายภาพบำบัด (4)</b> : {props.location.data.Therapy4}
        </p>
        <hr style={{ width: "100%" }}></hr>
        <p>
          <b>ชื่อนักายภาพ </b>: {props.location.data.DoctorName}
        </p>
      </div>
      {ButtonPage &&( props.location.status != 1)? (
        <Button
          onClick={Print}
          variant="contained"
          color="primary"
          style={{ width: "100%", marginLeft: "10px" }}
        >
          Print
        </Button>
      ) : null}
      {ButtonPageBack  ? (
        <Button
          onClick={Back}
          variant="contained"
          color="primary"
          style={{ width: "100%", marginLeft: "10px" }}
        >
          กลับหน้าแรก
        </Button>
      ) : null}
      {props.location.status === 1?(<Button
          variant="contained"
          color="primary"
          style={{ width: "100%", marginLeft: "10px" }}
        >
          ยืนยีนเคส
      </Button>):null}
    </div>
  );
}

export default Form_Month_Report;
