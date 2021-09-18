import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import FormLabel from "@material-ui/core/FormLabel";
import Button from "@material-ui/core/Button";
import firebase from "../Firebase/firebase";
import "../css/Patient_report_Primary_Case.css";
function Month_Report({ CalendarId }) {
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
  const [Current_Abilities, setCurrent_Abilities] = useState("");
  const [Maximum_Recovery_Goal, setMaximum_Recovery_Goal] = useState("");
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
  const [Analyze_the_Problem, setAnalyze_the_Problem] = useState("");
  const [DoctorName, setDoctorName] = useState("");
  const [DataList, setDataList] = useState([]);
  const [User_ID, setUser_ID] = useState("");
  const [ID, setID] = useState("");
  const [HeaderIDDoctor, setHeaderIDDoctor] = useState("");

  const [ID_PK_CheckOut, setID_PK_CheckOut] = useState("");

  // Update CountEnd/CountPackage จำนวนรักษา/จำนวนคงเหลือ
  const [CountEnd, setCountEnd] = useState(null);
  const [CountPackage, setCountPackage] = useState(null);

  const onSaveData = () => {
    console.log("ID: ", ID);
    var currentdate = new Date();
    var datetime =
      (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate()) +
      "/" +
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      "-" +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
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
      const DataPush = firebase.database().ref("Month_Report");
      const data = {
        CaseName: CaseName,
        Name: Name,
        Assessment_Date: Assessment_Date,
        Current_Abilities: Current_Abilities,
        Maximum_Recovery_Goal: Maximum_Recovery_Goal,
        Number_of_Times_Week: Number_of_Times_Week,
        Short_Target1: Short_Target1,
        Short_Target1_Text: Short_Target1_Text,
        Short_Target2: Short_Target2,
        Short_Target2_Text: Short_Target2_Text,
        Short_Target3: Short_Target3,
        Therapy_Text3: Therapy_Text3,
        Therapy4: Therapy4,
        Therapy_Text4: Therapy_Text4,
        Additional_Therapy: Additional_Therapy,
        Analyze_the_Problem: Analyze_the_Problem,
        DoctorName: DoctorName,
        status: 0,
        User_ID: User_ID,
        ID: ID,
        Doctor_ID: localStorage.getItem("Username_Doctor"),
        IDHeaderDoctor: HeaderIDDoctor,
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
            id: copyData.id,
            checkout: datetime,
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
      });*/
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
    setID(CalendarId.id);
    setUser_ID(CalendarId.userid);
    setCaseName(CalendarId.text);

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
          /*           setCountEnd(data[i].CountEnd+1)
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
          setHeaderIDDoctor(data[i].HeaderTeamID);
        }
      }
      setDoctorList(...dataList);
    });

    console.log("CalendarId.text", CalendarId.text); //เอา case มาif
    const FirstCaseRef = firebase.database().ref("FirstCase_Report");
    FirstCaseRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        // console.log("data[i]CaseName",data[i].CaseName)
        if (data[i].CaseName == CalendarId.text) {
          dataList.push({ i, ...data[i] });
          // console.log("Assessment_Date",data[i].Assessment_Date)
          setMaximum_Recovery_Goal(data[i].Maximum_Recovery_Goal);
          setCurrent_Abilities(data[i].Current_maximum_skill_level);
          // setNumber_of_Times_Week(data[i].)
          setShort_Target1(data[i].Short_Target1);
          setShort_Target1_Text(data[i].Short_Target1_Text);
          setShort_Target2(data[i].Short_Target2);
          setShort_Target2_Text(data[i].Short_Target2_Text);
          setShort_Target3(data[i].Short_Target3);
          setShort_Target3_Text(data[i].Short_Target3_Text);
          setTherapy(data[i].Therapy);
          setTherapy_Text(data[i].Therapy_Text);

          setTherapy2(data[i].Therapy2);
          setTherapy_Text2(data[i].Therapy_Text2);

          setTherapy3(data[i].Therapy3);
          setTherapy_Text3(data[i].Therapy_Text3);

          setTherapy4(data[i].Therapy4);
          setTherapy_Text4(data[i].Therapy_Text4);
        }
      }
      // setDoctorList(...dataList);
    });

    //CheckOut
    const datapull = firebase.database().ref("Calendar");
    datapull.on("value", (snapshort) => {
      const data = snapshort.val();
      for (let i in data) {
        // console.log("data[i].id",data[i].id)
        if (data[i].id == CalendarId.id) {
          setID_PK_CheckOut(i);
          // console.log("IfID",ID)
          // console.log("Ifdata[i].id",data[i].id)
        }
      }
    });

    fetchData();
  }, []);
  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">
          <h1>แบบสรุปรายงานผู้ป่วย : รายเดือน</h1>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="date"
              style={{ width: "210px", margin: "5px" }}
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
              id="filled-disabled"
              disabled
              style={{ width: "450px", margin: "5px" }}
              type="text"
              label="ชื่อเคส"
              variant="filled"
              value={CaseName}
              // onChange={(e) => setCaseName(e.target.value)}
            />

            <TextField
              className="input-text"
              id="filled-disabled"
              disabled
              style={{ width: "395px", margin: "5px" }}
              type="text"
              label="ชื่อนามสกุล(ผู้ป่วย)"
              variant="filled"
              value={Name}
              // onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="เป้าหมายการฟื้นฟูสูงสุด(ระดับความสามารถ+อุปกรณ์+แรงช่วย)"
              variant="outlined"
              value={Maximum_Recovery_Goal}
              onChange={(e) => setMaximum_Recovery_Goal(e.target.value)}
            />
            <p>
              ตัวอย่าง
              คุณมั่งมีสามารถเดินได้ด้วยตนเองอย่างปลอดภัยโดยไม่ต้องใช้อุปกรณ์และไม่ต้องมีคนช่วย
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ความสามารถปัจจุบัน(ระดับความสามารถ+อุปกรณ์+แรงช่วย)"
              variant="outlined"
              value={Current_Abilities}
              onChange={(e) => setCurrent_Abilities(e.target.value)}
            />
            <p>
              ตัวอย่าง คุณมั่งมีสามารถเดินกับไม้เท้า 3 ขา
              โดยมีคนช่วยระดับปานกลางในการพาเดิน ระยะทาง 5 เมตร
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="จำนวนครั้ง/สัปดาห์(ที่เหมาะสมในเดือนหน้า)"
              variant="outlined"
              value={Number_of_Times_Week}
              onChange={(e) => setNumber_of_Times_Week(e.target.value)}
            />
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormLabel component="legend">
              เป้าหมายระยะสั้น(1)(เป้าหมาย)
            </FormLabel>
            <p style={{ float: "left" }}>o {Short_Target1} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="เป้าหมายระยะสั้น(1)(ขยายความเป้าหมาย)"
              variant="outlined"
              value={Short_Target1_Text}
              onChange={(e) => setShort_Target1_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง เน้นเพิ่มช่วงการเคลื่อนไหวข้อไหล่ให้ได้ 165 องศา
              เพื่อเตรียมความพร้อมสำหรับการฝึกกิจกรรมด้วยมือ,
              เน้นเพิ่งกำลังกล้ามเนื้อต้นขา และสะโพกเพื่อเตรียมพร้อมในการยืน,
              ป้องกันภาวะแทรกซ้อน แผลกดทับ กล้อมเนื้อฝ่อลีบ ภาวะปอดแฟบ
              ข้อไหล่เลื่อนหลุด,
              ตั้งเป้าหมายให้นั่งทรงตัวได้เองโดยไม่ใช้มือช่วยเท้าและไม่มีคนช่วยได้อย่างมั่นคง
            </p>
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormLabel component="legend">
              เป้าหมายระยะสั้น(2)(เป้าหมาย)
            </FormLabel>
            <p style={{ float: "left" }}>o {Short_Target2} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="เป้าหมายระยะสั้น(2)(ขยายความเป้าหมาย)"
              variant="outlined"
              value={Short_Target2_Text}
              onChange={(e) => setShort_Target2_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง เน้นเพิ่มช่วงการเคลื่อนไหวข้อไหล่ให้ได้ 165 องศา
              เพื่อเตรียมความพร้อมสำหรับการฝึกกิจกรรมด้วยมือ,
              เน้นเพิ่งกำลังกล้ามเนื้อต้นขา และสะโพกเพื่อเตรียมพร้อมในการยืน,
              ป้องกันภาวะแทรกซ้อน แผลกดทับ กล้อมเนื้อฝ่อลีบ ภาวะปอดแฟบ
              ข้อไหล่เลื่อนหลุด,
              ตั้งเป้าหมายให้นั่งทรงตัวได้เองโดยไม่ใช้มือช่วยเท้าและไม่มีคนช่วยได้อย่างมั่นคง
            </p>
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormLabel component="legend">
              เป้าหมายระยะสั้น(3)(เป้าหมาย)
            </FormLabel>
            <p style={{ float: "left" }}>o {Short_Target3} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="เป้าหมายระยะสั้น(3)(ขยายความเป้าหมาย)"
              variant="outlined"
              value={Short_Target3_Text}
              onChange={(e) => setShort_Target3_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง เน้นเพิ่มช่วงการเคลื่อนไหวข้อไหล่ให้ได้ 165 องศา
              เพื่อเตรียมความพร้อมสำหรับการฝึกกิจกรรมด้วยมือ,
              เน้นเพิ่งกำลังกล้ามเนื้อต้นขา และสะโพกเพื่อเตรียมพร้อมในการยืน,
              ป้องกันภาวะแทรกซ้อน แผลกดทับ กล้อมเนื้อฝ่อลีบ ภาวะปอดแฟบ
              ข้อไหล่เลื่อนหลุด,
              ตั้งเป้าหมายให้นั่งทรงตัวได้เองโดยไม่ใช้มือช่วยเท้าและไม่มีคนช่วยได้อย่างมั่นคง
            </p>
          </div>
          <hr></hr>
          <div className="input-PrimaryCase">
            <FormLabel component="legend">
              การรักษาทางกายภาพบำบัด(1)(การรักษาขั้นพื้นฐาน)
            </FormLabel>
            <p style={{ float: "left" }}>o {Therapy} </p>
          </div>
          {/* <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด(1)(การรักษาขั้นพื้นฐาน)
              </FormLabel>
              <RadioGroup
                // row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="ให้ความรู้ (Education)"
                  control={<Checkbox color="primary" />}
                  label="ให้ความรู้ (Education)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
                <FormControlLabel
                  value="สอนการทำกายภาพบำบัดแก่คนดูแล(Teaching physical therapy program)"
                  control={<Checkbox color="primary" />}
                  label="สอนการทำกายภาพบำบัดแก่คนดูแล(Teaching physical therapy program)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกการหายใจ(Breathing exercise)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกการหายใจ(Breathing exercise)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
                <FormControlLabel
                  value="กระตุ้นการขับเสมหะ(Poustural drainage, Percussion, Coughing training)"
                  control={<Checkbox color="primary" />}
                  label="กระตุ้นการขับเสมหะ(Poustural drainage, Percussion, Coughing training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ลดปวด ลดเกร็ง ด้วยเครื่องอัลตราซาวด์ (Ultrasound therapy)"
                  control={<Checkbox color="primary" />}
                  label="ลดปวด ลดเกร็ง ด้วยเครื่องอัลตราซาวด์ (Ultrasound therapy)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ลดปวด ลดเกร็ง ด้วยเครื่องกระตุ้นไฟฟ้า (TENs)"
                  control={<Checkbox color="primary" />}
                  label="ลดปวด ลดเกร็ง ด้วยเครื่องกระตุ้นไฟฟ้า (TENs)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy(Therapy + " " + e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div> */}
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="การรักษาทางกายภาพบำบัด(1)(บรรยาย)"
              variant="outlined"
              value={Therapy_Text}
              onChange={(e) => setTherapy_Text(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง สอนคนดูแลสังเกตอาการผิดปกติที่อาจจะเกิดขึ้น (observe
              neuro sign), สอนการออกกำลังกายเบื่้องต้น, เคาะปอดเน้นช่วง LLL
              และกระตุ้นการหายใจเพื่อขับเสมหะ คนไข้พยายามไอช่วยได้ดี
              แต่แรงไอยังไม่มาก เสมหะพออกเองได้ 2 คำ สีขาวขุ่น
            </p>
          </div>
          <hr></hr>
          {/* <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด(2)(ออกกำลังกาย,ฝึกกล้ามเนื้อ)
              </FormLabel>
              <RadioGroup
                // row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="ออกกำลังกายยืดเหยียดกล้ามเนื้อ (Stretching exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายยืดเหยียดกล้ามเนื้อ (Stretching exercise)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ออกกำลังกายเพิ่งกำลังกล้ามเนื้อ (Strengthening exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายเพิ่งกำลังกล้ามเนื้อ (Strengthening exercise)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกการควบคุมกล้ามเนื้อ (Motor control training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกการควบคุมกล้ามเนื้อ (Motor control training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ออกกำลังกายเพิ่มความทนทาน (Endurance exercise)"
                  control={<Checkbox color="primary" />}
                  label="ออกกำลังกายเพิ่มความทนทาน (Endurance exercise)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า(TENs)"
                  control={<Checkbox color="primary" />}
                  label="กระตุ้นการสั่งการด้วยการกระตุ้นไฟฟ้า(TENs)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy2(Therapy2 + " " + e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div> */}
          <div className="input-PrimaryCase">
            <FormLabel component="legend">
              การรักษาทางกายภาพบำบัด(2)(ออกกำลังกายฝึกกล้ามเนื้อ)
            </FormLabel>
            <p style={{ float: "left" }}>o {Therapy2} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="การรักษาทางกายภาพบำบัด(2)(บรรยาย)"
              variant="outlined"
              value={Therapy_Text2}
              onChange={(e) => setTherapy_Text2(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง เน้นเพิ่มกำลังกล้ามเนื้อหน้าขา ก้น และกล้ามเนื้อลำตัว
              โดยให้ยืนย่อ-เหยียด ชันเข่ายกก้น บิดตัวซ้ายขวาในท่านั่ง
              คุรมั่งมีช่วยทำได้ดี ยกก้นสูงขึ้นเล็กน้อย ย่อ-เหยียดได้ 10 จำนวน 3
              เซ็ต ครั้งเริ่มมีอาการล้า, เน้นยืดกล้ามเนื้อหน้าแขน
              กล้ามเนื้อต้นขาด้านหลัง และกล้ามเนื้อน่อง
              มีอาการเจ็บเล็กน้อยแต่ยอมให้ทำ,
              ฝึกการควบคุมกล้ามเนื้อหน้าขาในท่านั่ง-ยืน ยังทำได้ไม่ดี
              แตะแรงทุกครั้ง ขายังล๊อคเข่าอยู่เสมอ
            </p>
          </div>
          <hr></hr>
          {/* <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด(3)
              </FormLabel>
              <RadioGroup
                // row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="ฝึกเคลื่อนย้ายตัวบนเตียง (Bed mobility training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกเคลื่อนย้ายตัวบนเตียง (Bed mobility training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกย้ายตัวจากเตียงไปรถเข็น (Transfer training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกย้ายตัวจากเตียงไปรถเข็น (Transfer training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกทรงตัวในท่านั่ง (Sitting balance training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกทรงตัวในท่านั่ง (Sitting balance training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกทรงตัวในท่ายืน (Standing balace training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกทรงตัวในท่ายืน (Standing balace training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกเดินกับไม้เท้า (Gait training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกเดินกับไม้เท้า (Gait training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ปรับท่าเดิน (Correct gait pattern)"
                  control={<Checkbox color="primary" />}
                  label="ปรับท่าเดิน (Correct gait pattern)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy3(Therapy3 + " " + e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div> */}
          <div className="input-PrimaryCase">
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด(3)</FormLabel>
            <p style={{ float: "left" }}>o {Therapy3} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="การรักษาทางกายภาพบำบัด(3)(บรรยาย)"
              variant="outlined"
              value={Therapy_Text3}
              onChange={(e) => setTherapy_Text3(e.target.value)}
            />
            <p style={{ width: "1070px", margin: "auto", marginTop: "10px" }}>
              ตัวอย่าง (สมมติเลือก ฝึกทรงตัวในท่านั่ง)
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
          {/* <div className="input-PrimaryCase">
            <FormControl
              style={{ width: "1070px", margin: "5px" }}
              className="input-text"
              component="fieldset"
            >
              <FormLabel component="legend">
                การรักษาทางกายภาพบำบัด(4)
              </FormLabel>
              <FormGroup aria-label="position" className="check-box">
                <FormControlLabel
                  value="ฝึกเคลื่อนย้ายตัวบนเตียง (Bed mobility training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกเคลื่อนย้ายตัวบนเตียง (Bed mobility training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกย้ายตัวจากเตียงไปรถเข็น (Transfer training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกย้ายตัวจากเตียงไปรถเข็น (Transfer training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกทรงตัวในท่านั่ง (Sitting balance training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกทรงตัวในท่านั่ง (Sitting balance training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกทรงตัวในท่ายืน (Standing balace training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกทรงตัวในท่ายืน (Standing balace training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ฝึกเดินกับไม้เท้า (Gait training)"
                  control={<Checkbox color="primary" />}
                  label="ฝึกเดินกับไม้เท้า (Gait training)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
                <FormControlLabel
                  value="ปรับท่าเดิน (Correct gait pattern)"
                  control={<Checkbox color="primary" />}
                  label="ปรับท่าเดิน (Correct gait pattern)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setTherapy4(Therapy4 + " " + e.target.value)}
                />
              </FormGroup>
            </FormControl>
          </div> */}
          <div className="input-PrimaryCase">
            <FormLabel component="legend">การรักษาทางกายภาพบำบัด(4)</FormLabel>
            <p style={{ float: "left" }}>o {Therapy4} </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="การรักษาทางกายภาพบำบัด(4)(บรรยาย)"
              variant="outlined"
              value={Therapy_Text4}
              onChange={(e) => setTherapy_Text4(e.target.value)}
            />
            <p
              style={{
                width: "1070px",
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              ตัวอย่าง (สมมติเลือก ฝึกเคลื่อนย้ายตัว) ต้องมีคนช่วย 2 คน
              ข่วงจังหวะย้ายตัวคุณมั่งมีข่วยถีบขาได้
              แต่ถีบได้ไม่แรงและไม่สามารถถีบค้างได้
              และยังขาดการโน้มต้วมาด้านหน้าอีกเล็กน้อย ฝึกย้านตัว 2 รอบ, (สมมติ
              เลือกปรับท่าเดิน) เน้นฝึก Rt.mid stance
              กระตุ้นการลงน้ำหนักของขขาข้างซ้าย
              โดยให้คุณมั่งมีก้าวขาขวาแตะบนขั้นบันได 10 ครั้ง
              คุณมั่งมีช่วยทำได้ดี แต่ตัวก้มเยอะพอสมควร
              เริ่มมีอาการเหนื่อยครั้งที่ 8 แต่พอไหวทำได้ครบ 10 ครั้งนั่งพัก ทำ
              2 เซ็ต
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="การรักษาทางกายภาพบำบัดเพิ่มเติม(การรักษา+คำบรรยาย)"
              variant="outlined"
              value={Additional_Therapy}
              onChange={(e) => setAdditional_Therapy(e.target.value)}
            />
            <p
              style={{
                width: "1070px",
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              ตัวอย่าง ฝึกเดินด้วยไม้เท้า 3 ขาโดยมีชวนช่วย 1 คน -
              ยังต้องช่วยก้าวขาซ้ายอยู่ แต่จังหวะเหยียบยืนทำได้เองได้ดี
              มีเข่าล๊อคบางครั้ง ตัวก้มอยู่บ้างเล็กน้อย ช่วยกระตุ้นเหยียดยืดตัว
              คุณมั่งมีตัวตรงและเดินได้ดี ต้องกระตุ้นตลอดเวลา ฝึกเดิน 5 ก้าว
              แล้วนั่งพัก 2 รอบ
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="วิเคราะห์ปัญหา"
              variant="outlined"
              value={Analyze_the_Problem}
              onChange={(e) => setAnalyze_the_Problem(e.target.value)}
            />
            <p
              style={{
                width: "1070px",
                margin: "auto",
                marginTop: "10px",
                marginBottom: "10px",
              }}
            >
              ตัวอย่าง
              แรงแขายังไม่มากขึ้นเท่าที่ควรเนื่องจากคุณมั่งมีมีอาการเจ็ลมากชึ้นหลังจากไปโรงพยาบาลและเกิดการย้ายตัวที่ไม่ถูกต้อง
              ทำให้คุณมั่งมีไม่ให้ความร่วมมือในหลายครั้งของการทำกายภาพ
              นักกายภาพและทีมต้องการความร่วมมือจากทางญาตืที่จะช่วยพูดคุยให้ช่วยทำกายภาพให้มากขึ้น
              ซึ่งแผนในเดือนถัดไปหากกำลังกล้ามเนื้อขาของคุณมั่งมีมากขึ้นจะสามารถพาฝึกยืนแและถ่ายน้ำหนักได้ในเดือนถัดๆไป
              และคนดูแลช่วยพาคุณมั่งมีทำกายภาพบำบัดยังไม่สม่ำเสมอเท่าที่ควร
              ฝากทางบ้านช่วยกันเตือนและเรียกคุณมั่งมีมาทำกายภาพให้มากขึ้น
              พร้อมทั้งอยู่ในท่านั่งให้มากกว่านอนเพื่อกระตุ้นการทำงานของกล้ามเนื้อลำตัว
            </p>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="filled-disabled"
              disabled
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              type="text"
              label="ลงชื่อ นักกายภาพบำบัด"
              variant="filled"
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
    </div>
  );
}

export default Month_Report;
