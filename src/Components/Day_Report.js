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
import "../css/Patient_report_Primary_Case.css";
function Day_Report({ CalendarId }) {
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
  const [CaseName, setCaseName] = useState("");
  const [Name, setName] = useState("");
  const [Assessment_Date, setAssessment_Date] = useState(DateAssessment);
  const [Initial_Symptoms, setInitial_Symptoms] = useState("");
  const [BP, setBP] = useState("");
  const [PR, setPR] = useState("");
  const [Therapy2, setTherapy2] = useState("");
  const [Therapy2_Text, setTherapy2_Text] = useState("");
  const [Therapy3, setTherapy3] = useState("");
  const [Therapy4, setTherapy4] = useState("");
  const [Therapy3_Text, setTherapy3_Text] = useState("");
  const [Therapy4_Text, setTherapy4_Text] = useState("");
  const [After_Treat, setAfter_Treat] = useState("");
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
      const Check = firebase.database().ref("CheckIn_Out_History").child(snapshort.key);
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
      const DataPush = firebase.database().ref("Day_Report");
      const data = {
        CaseName: CaseName,
        Name: Name,
        Assessment_Date: Assessment_Date,
        Initial_Symptoms: Initial_Symptoms,
        BP: BP,
        PR: PR,
        Therapy2: Therapy2,
        Therapy2_Text: Therapy2_Text,
        Therapy3: Therapy3,
        Therapy4: Therapy4,
        Therapy3_Text: Therapy3_Text,
        Therapy4_Text: Therapy4_Text,
        After_Treat: After_Treat,
        DoctorName: DoctorName,
        status: 1,
        User_ID: User_ID,
        ID: ID,
        Doctor_ID: localStorage.getItem("Username_Doctor"),
      };
      DataPush.push(data);

  
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
            id: copyData.ids,
            checkout:datetime,
            Status_Pay:copyData.Status_Pay,
            zone:copyData.zone,

          };
          calendar_History.push(PasteData);

          datapull.child(ID_PK_CheckOut).remove();
        }
      });
      console.log(copyData.resource);

      window.location.reload();

      // Update CountEnd/CountPackage จำนวนรักษา/จำนวนคงเหลือ
      /*   const DataUpdate2 = firebase.database().ref("User_History");
    DataUpdate2.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase
        .database()
        .ref("User_History")
        .child(snapshort.key);
      Check.on("value", (snap) => {
        if (snap.val().Person_ID == User_ID) {
          Check.update({
            CountEnd: CountEnd,
            CountPackage: CountPackage,
          });
        }
      });
    });
 */
    } else {
    }
  };
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
    console.log(value);
    const DataPull = firebase.database().ref("User_History");
    const DataPull_User = DataPull.orderByChild("Person_ID").equalTo(value);
    DataPull_User.on("value", (snapshort) => {
      const data = snapshort.val();
      console.log("TestData: " + data);
      for (let i in data) {
        setName(data[i].Name);
        setUser_ID(data[i].Person_ID);
      }
    });
  };
  useEffect(() => {
    setID(CalendarId.ids);
    setUser_ID(CalendarId.userid);
    setCaseName(CalendarId.text);

    //CheckOut
    const datapull = firebase.database().ref("Calendar");
    datapull.on("value", (snapshort) => {
      const data = snapshort.val();
      for (let i in data) {
         console.log("CalendarId[i].id", CalendarId.id)
        if (data[i].ids == CalendarId.ids) {
          setID_PK_CheckOut(i);
          // console.log("IfID",ID)
          // console.log("Ifdata[i].id",data[i].id)
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
          console.log("dataListxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx", dataList);
          setName(data[i].Name);
          setInitial_Symptoms(data[i].Diagnosis);
          // setDiagnose(data[i].Diagnosis)Symptom
          /*         setCountEnd(data[i].CountEnd+1)
          setCountPackage(data[i].CountPackage-1) */
        }
      }
      console.log("dataListyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy", dataList);
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

    fetchData();
  }, []);
  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">
          <h1>แบบสรุปรายงานผู้ป่วย : รายวัน</h1>
          <div className="input-PrimaryCase">
            {/* <FormControl className={classes.formControl}>
          <InputLabel id="demo-simple-select-helper-label">ชื่อเคส</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={CaseName}
            onChange={(e) => setCaseName(e.target.value)}
            style={{width:"450px"}}
          >
            {DataList.map((value) => (
              <MenuItem
                key={value.id}
                value={value.text}
                onClick={() => (setValue(value.userid),setID(value.id))}
              >
                {value.text}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
            <TextField
              className="input-text"
              id="date"
              style={{ width: "250px", margin: "5px" }}
              label="วันที่ประเมิน"
              type="date"
              defaultValue={new Date()}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              value={Assessment_Date}
              onChange={(e) => setAssessment_Date(e.target.value)}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              disabled
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="ชื่อเคส"
              variant="filled"
              value={CaseName}
              // onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              disabled
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="ชื่อนามสกุล(ผู้ป่วย)"
              variant="filled"
              value={Name}
              // onChange={(e)=>setName(e.target.value)}
            />
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              disabled
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="อาการเริ่มต้น"
              variant="filled"
              value={Initial_Symptoms}
              // onChange={(e)=>setInitial_Symptoms(e.target.value)}
            />
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "535px", margin: "5px" }}
              type="text"
              label="ความดันเริ่มต้น(BP)"
              variant="outlined"
              value={BP}
              onChange={(e) => setBP(e.target.value)}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "535px", margin: "5px" }}
              type="text"
              label="อัตราการเต้นหัวใจ(PR)"
              variant="outlined"
              value={PR}
              onChange={(e) => setPR(e.target.value)}
            />
          </div>
          {/* <hr></hr> */}
          <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด (2)
              </FormLabel>
              <FormGroup aria-label="position" className="check-box">
                <FormControlLabel
                  value="ให้ความรู้ (Education)"
                  control={<Checkbox color="primary" />}
                  label="ให้ความรู้ (Education)"
                  labelPlacement="end"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ออกกำลังกายยืดเหยียดกล้ามเนื้อ(Stretching exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายยืดเหยียดกล้ามเนื้อ (Stretching exercise)"
                  labelPlacement="end"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ออกกำลังกายเพิ่มกำลังกล้ามเนื้อ(Strengthening exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายเพิ่มกำลังกล้ามเนื้อ(Strengthening exercise)"
                  labelPlacement="end"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกการควบคุมกล้ามเนื้อ(Motor control training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกการควบคุมกล้ามเนื้อ(Motor control training)"
                  labelPlacement="end"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ออกกำลังกายเพิ่มความทนทาน(Endurance exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายเพิ่มความทนทาน (Endurance exercise)"
                  labelPlacement="end"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า(TENs)"
                  control={<Checkbox color="primary" />}
                  label="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า(TENs)"
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
              value={Therapy2_Text}
              onChange={(e) => setTherapy2_Text(e.target.value)}
            />
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด (3)
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="ฝึกเคลื่อนย้ายตัวบนเตียง (Bed mobility training)"
                  control={<Radio color="primary" />}
                  label="ฝึกเคลื่อนย้ายตัวบนเตียง(Bed mobility training)"
                  style={{ textAlign: "start", margin: "auto" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกย้ายตัวจากเตียงไปรถเข็น (Transfer training)"
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
                  value="ปรับท่าเดิน(Correct gait pattern)"
                  control={<Radio color="primary" />}
                  label="ปรับท่าเดิน(Correct gait pattern)"
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
              label="การรักษาทางกายภาพบำบัด(3)"
              variant="outlined"
              value={Therapy3_Text}
              onChange={(e) => setTherapy3_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              (บรรยาย) ตัวอย่าง (สมมติเลือก ฝึกทรงตัวในท่านั่ง)
              เน้นการถ่ายน้ำหนักไปข้างซ้าย
              ให้เอื้อมหยิบของเล่นแล้วบิดตัวมาใ่ตะกร้าข้างขวา
              คุณมั่งมีพยายามทำได้ดี ยังเอื้อมตัวไปได้ไม่ไกลมาก
              ยิดตัวเอื้อมใส่ตะกร้าเอง ทรงตัวเองได้มีเซเล็กน้อย, (สมมติเลือก
              ฝึกการทรงตัวในท่ายืน) จับไม้เท้า มีคนช่วย 1 คนระดับปานกลาง
              ขาขวาเหยีดเองได้ไม่ทรุด ขาซ้ายยังต้องกันเข่าอยู่บ้างบางที
              คุณมั่งมีติดก้มตัว
              กระตุ้นให้ยืดได้เป็นครั้งคราวต้องกระตุ้นตลอดเวลา ยืนได้นาน 10 นาที
              ไม่เวียนศีรษะ ความดันไม่ตก ปลายมือเท้าไม่เย็น รอบ 2 ยินได้ 5 นาที
              คุณมั่งมีบอกว่าเหนื่อย และขาซ้ายเริ่มสั่น จึงหยุดพัก
            </p>
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด (4)
              </FormLabel>
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
                  value="ปรับท่าเดิน(Correct gait pattern)"
                  control={<Radio color="primary" />}
                  label="ปรับท่าเดิน(Correct gait pattern)"
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
              label="การรักษาทางกายภาพบำบัดเพิ่มเติม"
              variant="outlined"
              value={Therapy4_Text}
              onChange={(e) => setTherapy4_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              (การรักษา+คำบรรยาย) ตัวอย่าง ฝึกเดินด้วยไม้เท้า 3 ขาโดยมีชวนช่วย 1
              คน - ยังต้องช่วยก้าวขาซ้ายอยู่ แต่จังหวะเหยียบยืนทำได้เองได้ดี
              มีเข่าล๊อคบางครั้ง ตัวก้มอยู่บ้างเล็กน้อย ช่วยกระตุ้นเหยียดยืดตัว
              คุณมั่งมีตัวตรงและเดินได้ดี ต้องกระตุ้นตลอดเวลา ฝึกเดิน 5 ก้าว
              แล้วนั่งพัก 2 รอบ
            </p>
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="อาการหลังการรักษา"
              variant="outlined"
              value={After_Treat}
              onChange={(e) => setAfter_Treat(e.target.value)}
            />
            <p>
              หลักรักษาคุณมั่งมีเหนื่อยเล็กน้อย นั่งพักรอทานข้าว BP 135/90 mmHg
              HR 88 bpm
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              disabled
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ผู้ให้การรักษา"
              variant="filled"
              value={DoctorName}
              // onChange={(e)=>setDoctorName(e.target.value)}
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
    </div>
  );
}

export default Day_Report;
