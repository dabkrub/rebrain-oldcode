import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import firebase from "../Firebase/firebase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import "../css/Patient_report_Primary_Case.css";
function Patient_report_Primary_Case({ CalendarId }) {
  console.log("CalendarId", CalendarId);
  {
    console.log("DoctorId", localStorage.getItem("Username_Doctor"));
  }
  console.log("userid", CalendarId.userid);
  const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));

  var currentdate = new Date();
  var DateAssessment =
    currentdate.getFullYear() +
    "-" +
    (currentdate.getMonth() + 1 < 10
      ? "0" + (currentdate.getMonth() + 1)
      : null) +
    "-" +
    currentdate.getDate();
  console.log("DateAssessment", DateAssessment);

  const classes = useStyles();
  const [UserList, setUserList] = useState([]);
  const [DoctorList, setDoctorList] = useState([]);
  const [NameCase, setNameCase] = useState("");
  const [Name, setName] = useState("");
  const [Age, setAge] = useState("");
  const [Assessment_Date, setAssessment_Date] = useState(DateAssessment);
  const [First_Symptom_Date, setFirst_Symptom_Date] = useState("");
  const [Diagnose, setDiagnose] = useState("");
  const [Congenital_Disease, setCongenital_Disease] = useState("");
  const [Current_maximum_skill_level, setCurrent_maximum_skill_level] =
    useState("");
  const [Maximum_Recovery_Goal, setMaximum_Recovery_Goal] = useState("");
  const [Recovery_Time_Months, setRecovery_Time_Months] = useState("");
  const [Number_of_Times_Week, setNumber_of_Times_Week] = useState("");
  const [Short_Target1, setShort_Target1] = useState("");
  const [Short_Target1_Text, setShort_Target1_Text] = useState("");
  const [Short_Target2, setShort_Target2] = useState("");
  const [Short_Target2_Text, setShort_Target2_Text] = useState("");
  const [Short_Target3, setShort_Target3] = useState("");
  const [Short_Target3_Text, setShort_Target3_Text] = useState("");
  const [Therapy, setTherapy] = useState("");
  const [Therapy_Text, setTherapy_Text] = useState("");
  const [Therapy2, setTherapy2] = useState("");
  const [Therapy_Text2, setTherapy_Text2] = useState("");
  const [Therapy3, setTherapy3] = useState("");
  const [Therapy_Text3, setTherapy_Text3] = useState("");
  const [Therapy4, setTherapy4] = useState("");
  const [Therapy_Text4, setTherapy_Text4] = useState("");
  const [Additional_Therapy, setAdditional_Therapy] = useState("");
  const [DoctorName, setDoctorName] = useState("");
  const [DataList, setDataList] = useState([]);
  const [User_ID, setUser_ID] = useState("");
  const [ID, setID] = useState("");

  const [ID_PK_CheckOut, setID_PK_CheckOut] = useState("");

  // Update CountEnd/CountPackage จำนวนรักษา/จำนวนคงเหลือ
  const [CountEnd, setCountEnd] = useState(null);
  const [CountPackage, setCountPackage] = useState(null);

  const onSaveData = () => {
    console.log("ID: ", ID);
    var currentdate = new Date();
    var datetime = (currentdate.getDate() < 10 ? ("0" + (currentdate.getDate())) : (currentdate.getDate())) + "/"
    + (currentdate.getMonth() + 1 < 10 ? ("0" + (currentdate.getMonth() + 1)) : (currentdate.getMonth() + 1)) + "/"
    + currentdate.getFullYear() +
    "-" +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" + currentdate.getSeconds();
    const DataUpdate2 = firebase.database().ref("CheckIn_Out_History");
    DataUpdate2.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase
        .database()
        .ref("CheckIn_Out_History")
        .child(snapshort.key);
      Check.on("value", (snap) => {
        console.log("snap.id", snap.val().id);
        if (snap.val().id == ID) {
          Check.update({
            checkout: datetime,
          });
        }
      });
    });
    if (window.confirm("ตรวจสอบข้อมูลให้ถูกต้องก่อนกดยืนยัน") == true) {
      const DataPush = firebase.database().ref("FirstCase_Report");
      const data = {
        CaseName: NameCase,
        Name: Name,
        Age: Age,
        Assessment_Date: Assessment_Date,
        First_Symptom_Date: First_Symptom_Date,
        Diagnose: Diagnose,
        Congenital_Disease: Congenital_Disease,
        Current_maximum_skill_level: Current_maximum_skill_level,
        Maximum_Recovery_Goal: Maximum_Recovery_Goal,
        Recovery_Time_Months: Recovery_Time_Months,
        Number_of_Times_Week: Number_of_Times_Week,
        Short_Target1: Short_Target1,
        Short_Target1_Text: Short_Target1_Text,
        Short_Target2: Short_Target2,
        Short_Target2_Text: Short_Target2_Text,
        Short_Target3: Short_Target3,
        Short_Target3_Text: Short_Target3_Text,
        Therapy: Therapy,
        Therapy_Text: Therapy_Text,
        Therapy2: Therapy2,
        Therapy_Text2: Therapy_Text2,
        Therapy3: Therapy3,
        Therapy_Text3: Therapy_Text3,
        Therapy4: Therapy4,
        Therapy_Text4: Therapy_Text4,
        Additional_Therapy: Additional_Therapy,
        DoctorName: DoctorName,
        status: 1,
        User_ID: User_ID,
        ID: ID,
        Doctor_ID: localStorage.getItem("Username_Doctor"),
      };
      DataPush.push(data);

      console.log("User_ID", User_ID);
      console.log("ID", ID);
      console.log("ID_PK_CheckOut", ID_PK_CheckOut);

      const datapull = firebase.database().ref("Calendar");

      datapull.child(ID_PK_CheckOut).update({
        status: 2,
        barColor: "#0033F1",
      });

      var copyData = 0;

      datapull.child(ID_PK_CheckOut).on("value", (snap) => {
        if (snap.val().Status_Pay == "ชำระแล้ว") {
          copyData = snap.val();
          const calendar_History = firebase.database().ref("Calendar_History");
          const PasteData = {
            start: copyData.start.value,
            end: copyData.start.value,
            text: copyData.text,
            user: copyData.user,
            userid: copyData.userid,
            barColor: copyData.barColor,
            resource: copyData.resource,
            resource_query: copyData.resource + copyData.start.value,
            status: copyData.status,
            id: copyData.id,
            checkout:datetime
          };
          calendar_History.push(PasteData);

          datapull.child(ID_PK_CheckOut).remove();
        }
      });
      console.log(copyData.resource);
      window.location.reload();
    } else {
    }
  };
  // console.log("ID_PK_CheckOut",ID_PK_CheckOut)
  const fetchData = () => {
    const DataPull = firebase.database().ref("Calendar_History");
    DataPull.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        if (data[i].resource == localStorage.getItem("Username_Doctor")) {
          dataList.push({ i, ...data[i] });
        }
      }
      setDataList(dataList);
    });
  };
  const setValue = (value) => {
    const DataPull = firebase.database().ref("User_History");
    const DataPull_User = DataPull.orderByChild("Person_ID").equalTo(value);
    DataPull_User.on("value", (snapshort) => {
      const data = snapshort.val();
      console.log("TestData: " + data);
      for (let i in data) {
        setAge(data[i].Age);
        setName(data[i].Name);
        setUser_ID(data[i].Person_ID);
      }
    });
  };

  useEffect(() => {
    setID(CalendarId.id);
    setUser_ID(CalendarId.userid);
    setNameCase(CalendarId.text);

    //CheckOut
    const datapull = firebase.database().ref("Calendar");
    datapull.on("value", (snapshort) => {
      const data = snapshort.val();
      for (let i in data) {
        if (data[i].id == CalendarId.id) {
          setID_PK_CheckOut(i);
        }
      }
    });

    const UserRef = firebase.database().ref("User_History");
    UserRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        console.log("P_ID", data[i].Person_ID);
        console.log("userid", CalendarId.userid);
        if (data[i].Person_ID == CalendarId.userid) {
          dataList.push({ i, ...data[i] });
          setName(data[i].Name);
          setAge(data[i].Age);
          setFirst_Symptom_Date(data[i].Symptom);
          setDiagnose(data[i].Diagnosis);
          /*           setCountEnd(data[i].CountEnd+1)
          setCountPackage(data[i].CountPackage-1) */
        }
      }
      setUserList(...dataList);
    });

    const DoctorRef = firebase.database().ref("Doctor_History");
    DoctorRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        if (data[i].IDCard == localStorage.getItem("Username_Doctor")) {
          dataList.push({ i, ...data[i] });
          setDoctorName(data[i].Name);
        }
      }
      setDoctorList(...dataList);
    });
    // localStorage.getItem("Username_Doctor")

    fetchData();
  }, []);

  return (
    <div className="main-InputHistory">
      <div className="form-InputHistory">
        <h1>แบบสรุปรายงานผู้ป่วย : แรกรับ</h1>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="ชื่อเคส"
            variant="filled"
            value={NameCase}
            // onChange={(e) => setNameCase(e.target.value)}
          />
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="date"
            style={{ width: "250px", margin: "5px" }}
            label="วันที่ประเมิน"
            type="date"
            defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={Assessment_Date}
            onChange={(e) => {
              setAssessment_Date(e.target.value);
            }}
          />

          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "270px", margin: "5px" }}
            type="text"
            label="ชื่อ-นามสกุล(ผู้ป่วย)"
            variant="filled"
            value={Name}
            // onChange={(e) => setName(e.target.value)}
          />

          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "270px", margin: "5px" }}
            type="number"
            label="อายุ"
            variant="filled"
            value={Age}
            // onPlay={() => setAge(UserList.Age)}
          />

          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "250px", margin: "5px" }}
            label="วันแรกที่เริ่มมีอาการ"
            type="date"
            variant="filled"
            // defaultValue="2017-05-24"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            value={First_Symptom_Date}
            // onChange={(e) => setFirst_Symptom_Date(e.target.value)}
          />
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="วินิจฉัยทางกายภาพบำบัด"
            variant="filled"
            value={Diagnose}
            // onChange={(e) => setDiagnose(e.target.value)}
          />
        </div>
        {/* <hr></hr> */}
        <div className="input-PrimaryCase">
          <FormControl component="fieldset">
            <FormLabel component="legend">โรคประจำตัวอื่นๆ</FormLabel>
            <FormGroup aria-label="position" row className="check-box">
              <FormControlLabel
                value="ความดันสูง(HT)"
                control={<Checkbox color="primary" />}
                label="ความดันสูง(HT)"
                labelPlacement="end"
                onChange={(e) => setCongenital_Disease(e.target.value)}
              />
              <FormControlLabel
                value="ไขมันในเลือดสูง(DLP)"
                control={<Checkbox color="primary" />}
                label="ไขมันในเลือดสูง(DLP)"
                labelPlacement="end"
                onChange={(e) => setCongenital_Disease(e.target.value)}
              />
              <FormControlLabel
                value="หัวใจเต้นผิดจังหวะ(AF)"
                control={<Checkbox color="primary" />}
                label="หัวใจเต้นผิดจังหวะ(AF)"
                labelPlacement="end"
                onChange={(e) => setCongenital_Disease(e.target.value)}
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "260px", margin: "5px" }}
            type="text"
            label="ระดับความสามารถสูงสุดปัจจุบัน"
            variant="outlined"
            value={Current_maximum_skill_level}
            onChange={(e) => setCurrent_maximum_skill_level(e.target.value)}
          />

          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "260px", margin: "5px" }}
            type="text"
            label="เป้าหมายการฟื้นฟูสูงสุด"
            variant="outlined"
            value={Maximum_Recovery_Goal}
            onChange={(e) => setMaximum_Recovery_Goal(e.target.value)}
          />

          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "260px", margin: "5px" }}
            type="text"
            label="ระยะเวลาในการฟื้นฟู(เดือน)"
            variant="outlined"
            value={Recovery_Time_Months}
            onChange={(e) => setRecovery_Time_Months(e.target.value)}
          />

          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "260px", margin: "5px" }}
            type="text"
            label="จำนวนครั้ง/สัปดาห์"
            variant="outlined"
            value={Number_of_Times_Week}
            onChange={(e) => setNumber_of_Times_Week(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            className="input-text"
            component="fieldset"
          >
            <FormLabel component="legend">เป้าหมายระยะสั้น(1)</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="ป้องกันภาวะแทรกซ้อน"
                control={<Radio color="primary" />}
                label="ป้องกันภาวะแทรกซ้อน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                control={<Radio color="primary" />}
                label="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="ลดอาการเจ็บปวด"
                control={<Radio color="primary" />}
                label="ลดอาการเจ็บปวด"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มกำลังกล้ามเนื้อ"
                control={<Radio color="primary" />}
                label="เพิ่มกำลังกล้ามเนื้อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่านั่ง"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่านั่ง"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่ายืน"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่ายืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการเหยียบยืน"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการเหยียบยืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการยกก้าว"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการยกก้าว"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target1(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="เป้าหมายระยะสั้น(1)"
            variant="outlined"
            value={Short_Target1_Text}
            onChange={(e) => setShort_Target1_Text(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            className="input-text"
            component="fieldset"
          >
            <FormLabel component="legend">เป้าหมายระยะสั้น(2)</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="ป้องกันภาวะแทรกซ้อน"
                control={<Radio color="primary" />}
                label="ป้องกันภาวะแทรกซ้อน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                control={<Radio color="primary" />}
                label="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="ลดอาการเจ็บปวด"
                control={<Radio color="primary" />}
                label="ลดอาการเจ็บปวด"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มกำลังกล้ามเนื้อ"
                control={<Radio color="primary" />}
                label="เพิ่มกำลังกล้ามเนื้อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่านั่ง"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่านั่ง"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่ายืน"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่ายืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการเหยียบยืน"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการเหยียบยืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการยกก้าว"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการยกก้าว"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target2(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>

        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="เป้าหมายระยะสั้น(2)"
            variant="outlined"
            value={Short_Target2_Text}
            onChange={(e) => setShort_Target2_Text(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            className="input-text"
            component="fieldset"
          >
            <FormLabel component="legend">เป้าหมายระยะสั้น(3)</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="ป้องกันภาวะแทรกซ้อน"
                control={<Radio color="primary" />}
                label="ป้องกันภาวะแทรกซ้อน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                control={<Radio color="primary" />}
                label="รักษาและเพิ่มช่วงการเคลื่อนไหวของข้อต่อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="ลดอาการเจ็บปวด"
                control={<Radio color="primary" />}
                label="ลดอาการเจ็บปวด"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มกำลังกล้ามเนื้อ"
                control={<Radio color="primary" />}
                label="เพิ่มกำลังกล้ามเนื้อ"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่านั่ง"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่านั่ง"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="เพิ่มการทรงตัวในท่ายืน"
                control={<Radio color="primary" />}
                label="เพิ่มการทรงตัวในท่ายืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการเหยียบยืน"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการเหยียบยืน"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
              <FormControlLabel
                value="ปรับท่าเดินในช่วงการยกก้าว"
                control={<Radio color="primary" />}
                label="ปรับท่าเดินในช่วงการยกก้าว"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setShort_Target3(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="เป้าหมายระยะสั้น(3)"
            variant="outlined"
            value={Short_Target3_Text}
            onChange={(e) => setShort_Target3_Text(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            component="fieldset"
          >
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด</FormLabel>
            {/* row */}
            <FormGroup aria-label="position" className="check-box">
              <FormControlLabel
                value="ให้ความรู้ (Education)"
                control={<Checkbox color="primary" />}
                label="ให้ความรู้ (Education)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
              <FormControlLabel
                value="สอนการทำกายภาพบำบัดแก่คนดูแล (Teaching physical therapy program)"
                control={<Checkbox color="primary" />}
                label="สอนการทำกายภาพบำบัดแก่คนดูแล (Teaching physical therapy program)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
              <FormControlLabel
                value="ฝึกการหายใจ (Breathing exercise)"
                control={<Checkbox color="primary" />}
                label="ฝึกการหายใจ (Breathing exercise)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
              <FormControlLabel
                value="กระตุ้นการขับเสมหะ (Poustural drainage, Percussion, Coughing training)"
                control={<Checkbox color="primary" />}
                label="กระตุ้นการขับเสมหะ (Poustural drainage, Percussion, Coughing training)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
              <FormControlLabel
                value="ลดปวด ลดเกร็ง ด้วยเครื่องอัลตราซาวด์ (Ultrasound therapy)"
                control={<Checkbox color="primary" />}
                label="ลดปวด ลดเกร็ง ด้วยเครื่องอัลตราซาวด์ (Ultrasound therapy)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
              <FormControlLabel
                value="ลดปวด ลดเกร็ง ด้วยเครื่องd(Ultrasound therapy)"
                control={<Checkbox color="primary" />}
                label="ลดปวด ลดเกร็ง ด้วยเครื่องd(Ultrasound therapy)"
                labelPlacement="end"
                onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="การรักษาทางกายภาพบำบัด(1)"
            variant="outlined"
            value={Therapy_Text}
            onChange={(e) => setTherapy_Text(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            component="fieldset"
          >
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด(2)</FormLabel>
            {/* row */}
            <FormGroup aria-label="position" className="check-box">
              <FormControlLabel
                value="ออกกำลังกายยืดเหยียดกล้ามเนื้อ (Stretching exercise)"
                control={<Checkbox color="primary" />}
                label="ออกกำลังกายยืดเหยียดกล้ามเนื้อ (Stretching exercise)"
                labelPlacement="end"
                onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
              />
              <FormControlLabel
                value="ออกกำลังกายเพิ่มกำลังกล้ามเนื้อ (Strengthening exercise)"
                control={<Checkbox color="primary" />}
                label="ออกกำลังกายเพิ่มกำลังกล้ามเนื้อ (Strengthening exercise)"
                labelPlacement="end"
                onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
              />
              <FormControlLabel
                value="ฝึกการควบคุมกล้ามเนื้อ (Motor control training)"
                control={<Checkbox color="primary" />}
                label="ฝึกการควบคุมกล้ามเนื้อ (Motor control training)"
                labelPlacement="end"
                onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
              />
              <FormControlLabel
                value="ออกกำลังกายเพิ่มความทนทาน (Endurance exercise)"
                control={<Checkbox color="primary" />}
                label="ออกกำลังกายเพิ่มความทนทาน (Endurance exercise)"
                labelPlacement="end"
                onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
              />
              <FormControlLabel
                value="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า(TENs)"
                control={<Checkbox color="primary" />}
                label="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า (TENs)"
                labelPlacement="end"
                onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="การรักษาทางกายภาพบำบัด(2)"
            variant="outlined"
            value={Therapy_Text2}
            onChange={(e) => setTherapy_Text2(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            className="input-text"
            component="fieldset"
          >
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด(3)</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="ฝึกเคลื่อนย้ายตัวบนเตียง(Bed mobility training)"
                control={<Radio color="primary" />}
                label="ฝึกเคลื่อนย้ายตัวบนเตียง(Bed mobility training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกย้ายตัวจากเตียงไปรถเข็น(Transfer training)"
                control={<Radio color="primary" />}
                label="ฝึกย้ายตัวจากเตียงไปรถเข็น(Transfer training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกทรงตัวในท่านั่ง(Sitting balance training)"
                control={<Radio color="primary" />}
                label="ฝึกทรงตัวในท่านั่ง(Sitting balance training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกทรงตัวในท่ายืน(Standing balace training)"
                control={<Radio color="primary" />}
                label="ฝึกทรงตัวในท่ายืน(Standing balace training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกเดินกับไม้เท้า(Gait training)"
                control={<Radio color="primary" />}
                label="ฝึกเดินกับไม้เท้า(Gait training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
              <FormControlLabel
                value="รับท่าเดิน(Correct gait pattern)"
                control={<Radio color="primary" />}
                label="รับท่าเดิน(Correct gait pattern)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy3(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="การรักษาทางกายภาพบำบัด (3)"
            variant="outlined"
            value={Therapy_Text3}
            onChange={(e) => setTherapy_Text3(e.target.value)}
          />
        </div>
        <hr></hr>
        <div className="input-PrimaryCase">
          <FormControl
            style={{ width: "1070px", margin: "5px" }}
            className="input-text"
            component="fieldset"
          >
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด(4)</FormLabel>
            <RadioGroup
              row
              aria-label="position"
              name="position"
              defaultValue="top"
            >
              <FormControlLabel
                value="ฝึกเคลื่อนย้ายตัวบนเตียง(Bed mobility training)"
                control={<Radio color="primary" />}
                label="ฝึกเคลื่อนย้ายตัวบนเตียง(Bed mobility training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกย้ายตัวจากเตียงไปรถเข็น(Transfer training)"
                control={<Radio color="primary" />}
                label="ฝึกย้ายตัวจากเตียงไปรถเข็น(Transfer training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกทรงตัวในท่านั่ง(Sitting balance training)"
                control={<Radio color="primary" />}
                label="ฝึกทรงตัวในท่านั่ง(Sitting balance training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกทรงตัวในท่ายืน(Standing balace training)"
                control={<Radio color="primary" />}
                label="ฝึกทรงตัวในท่ายืน(Standing balace training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
              <FormControlLabel
                value="ฝึกเดินกับไม้เท้า(Gait training)"
                control={<Radio color="primary" />}
                label="ฝึกเดินกับไม้เท้า(Gait training)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
              <FormControlLabel
                value="รับท่าเดิน(Correct gait pattern)"
                control={<Radio color="primary" />}
                label="รับท่าเดิน(Correct gait pattern)"
                style={{ textAlign: "start", margin: "auto" }}
                labelPlacement="End"
                onChange={(e) => setTherapy4(e.target.value)}
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="การรักษาทางกายภาพบำบัด(4)"
            variant="outlined"
            value={Therapy_Text4}
            onChange={(e) => setTherapy_Text4(e.target.value)}
          />
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="การรักษาทางกายภาพบำบัดเพิ่มเติม"
            variant="outlined"
            value={Additional_Therapy}
            onChange={(e) => setAdditional_Therapy(e.target.value)}
          />
        </div>
        <div className="input-PrimaryCase">
          <TextField
            className="input-text"
            id="filled-disabled"
            disabled
            style={{ width: "1070px", margin: "5px" }}
            type="text"
            label="ลงชื่อ นักกายภาพบำบัด"
            variant="filled" //filled
            value={DoctorName}
            // onChange={(e) => setDoctorName(e.target.value)}
          />
        </div>

        <div className="input-InputHistory">
          <div className="button-InputHistory">
            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px" }}
              onClick={onSaveData}
            >
              บันทึกข้อมูล
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px", marginLeft: "10px" }}
              // onClick={onClearData}
            >
              ล้างข้อมูล
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Patient_report_Primary_Case;
