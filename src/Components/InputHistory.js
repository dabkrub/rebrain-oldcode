import React, { useEffect, useState } from "react";
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
import "../css/InputHistory.css";
import firebase from "../Firebase/firebase";

import MapUser from './Map_MUser';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

export var UserID
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

export default function InputHistory() {
  const classes = useStyles();
  const [NameSurname, setNameSurname] = useState("");
  const [TimeBirthday, setTimeBirthday] = useState("");
  const [Gender, setGender] = useState("");
  const [Age, setAge] = useState("");
  const [Symptom, setSymptom] = useState("");
  const [Hospitalized, setHospitalized] = useState("");
  const [Diagnosis, setDiagnosis] = useState("");
  const [Disease, setDisease] = useState("");
  const [Current_symptoms, setCurrent_symptoms] = useState("");
  const [Address, setAddress] = useState("");
  const [Curren_Address_Radio, setCurren_Address_Radio] = useState("");
  const [Curren_Address, setCurren_Address] = useState("");
  const [Landmark, setLandmark] = useState("");
  const [Count_Want, setCount_Want] = useState("");
  const [NameSurname_parent, setNameSurname_parent] = useState("");
  const [RelationShip, setRelationShip] = useState("");
  const [Tel, setTel] = useState("");
  const [PositionCar, setPositionCar] = useState("");
  const [Recommend, setRecommend] = useState("");
  const [Keyword, setKeyword] = useState("");
  const [Recommender, setRecommender] = useState("");
  const [Person_ID, setPerson_ID] = useState("")
  const [CaseName, setCaseName] = useState("")
  const [Check, setCheck] = useState(false)
  const [ShowMap, setShowMap] = useState(false)

  const [UserList, setUserList] = useState([]);

  const [StatusUser, setStatusUser] = useState("Action")
  const [ZoneUser, setZoneUser] = useState("เมือง")

  const [imageUrl, setImageUrl] = useState([]);
  const [Url, setUrl] = useState("");

  const onShowMap = () => {
    setShowMap(true)
  }
  const onSaveData = () => {
    const Add_firebase = firebase.database().ref("User_History");
    const History = {
      AutoNumber: UserList + 1,
      Name: NameSurname,
      Person_ID: Person_ID,
      Birthday: TimeBirthday,
      Gender: Gender,
      Age: Age,
      Symptom: Symptom,
      Hospitalized: Hospitalized,
      Diagnosis: Diagnosis,
      Disease: Disease,
      Current_symptoms: Current_symptoms,
      Address: Address,
      Curren_Address_Radio: Curren_Address_Radio,
      Curren_Address: Curren_Address,
      Landmark: Landmark,
      Count_Want: Count_Want,
      NameSurname_parent: NameSurname_parent,
      RelationShip: RelationShip,
      Tel: Tel,
      PositionCar: PositionCar,
      Recommend: Recommend,
      Keyword: Keyword,
      Recommender: Recommender,
      CountPackage: 0,
      CountEnd: 0,
      text: CaseName,
      status: "Action", //เพิ่มอยู่ที่หลัง
      zone: "เมือง", //เพิ่มอยู่ที่หลัง
      etc: "",
    };
    Add_firebase.push(History);
    const AddLoginUser_firebase = firebase.database().ref("User_Login");
    const LoginUser = {
      Username: Person_ID,
      Password: Tel
    }
    AddLoginUser_firebase.push(LoginUser)
    setNameSurname("");
    setTimeBirthday("");
    setGender("");
    setAge("");
    setSymptom("");
    setHospitalized("");
    setDiagnosis("");
    setDisease("")
    setCurrent_symptoms("");
    setAddress("");
    setCurren_Address_Radio("");
    setCurren_Address("");
    setLandmark("");
    setCount_Want("");
    setNameSurname_parent("");
    setRelationShip("");
    setTel("");
    setPositionCar("");
    setRecommend("");
    setKeyword("");
    setRecommender("");
    setPerson_ID("")
    setCaseName("")
    setCheck(true);
  };
  const onClearData = () => {
    setNameSurname("");
    setTimeBirthday("");
    setGender("");
    setAge("");
    setSymptom("");
    setHospitalized("");
    setDiagnosis("");
    setDisease("")
    setCurrent_symptoms("");
    setAddress("");
    setCurren_Address_Radio("");
    setCurren_Address("");
    setLandmark("");
    setCount_Want("");
    setNameSurname_parent("");
    setRelationShip("");
    setTel("");
    setPositionCar("");
    setRecommend("");
    setKeyword("");
    setRecommender("");
    setPerson_ID("")
    setCaseName("")
    setCheck(true);
  };

  useEffect(() => {
    const UserRef = firebase.database().ref("User_History");
    UserRef.on("value", (snapshot) => {
      const Users = snapshot.val();
      const UserList = [];
      for (let id in Users) {
        UserList.push({ id, ...Users[id] });
      }
      console.log("TradeList", UserList);
      setUserList(UserList.length);
    });
  }, []);
   
  const readImages = async (e) => {
    // setImageUrl(newState.length = 0);

    const file = e.target.files[0];
    console.log("file",file)
    // const id = uuid();
    const storageRef = firebase.storage().ref('images').child(Person_ID);
    // const imageRef = firebase.database().ref('images').child('daily').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
    // imageRef.set(url);
    
      const newState = [...imageUrl, { Person_ID, url }];
      // setUrl(url);
      setUrl(url);
      setImageUrl(newState);
    });
  };

  const deleteImage = (id) => {
    setImageUrl([]);
    document.getElementById('file').value= null;
  };

  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">

          <h1>บันทึก: ประวัติผู้ป่วย </h1>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "190px", margin: "5px" }}
              type="text"
              label="ลำดับ"
              variant="outlined"
              value={"ลำดับ : G-" + (UserList + 1)}
              disabled
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "480px", margin: "5px" }}
              type="text"
              label="ชื่อเคส"
              variant="outlined"
              onChange={(e) => setCaseName(e.target.value)}
              value={CaseName}
            />
            <FormControl
              style={{ width: "185px", margin: "5px" }}
              variant="outlined" >
              <Select value={StatusUser}>
                {/* <MenuItem value={params.value}>{params.value}</MenuItem> */}
                <MenuItem onClick={() => setStatusUser("Action")} value="Action">Action</MenuItem>
                <MenuItem onClick={() => setStatusUser("Rest")} value="Rest">Rest</MenuItem>
                <MenuItem onClick={() => setStatusUser("Stop")} value="Stop">Stop</MenuItem>
              </Select>
            </FormControl>

            <FormControl style={{ width: "185px", margin: "5px" }} variant="outlined">
              <Select value={ZoneUser}>
                <MenuItem onClick={() => setZoneUser("นน")} value="นน">นน</MenuItem>
                <MenuItem onClick={() => setZoneUser("ปทุม")} value="ปทุม">ปทุม</MenuItem>
                <MenuItem onClick={() => setZoneUser("เมือง")} value="เมือง">เมือง</MenuItem>
                <MenuItem onClick={() => setZoneUser("บางนา")} value="บางนา">บางนา</MenuItem>
                <MenuItem onClick={() => setZoneUser("มีน")} value="มีน">มีน</MenuItem>
                <MenuItem onClick={() => setZoneUser("ฝั่งธน")} value="ฝั่งธน">ฝั่งธน</MenuItem>
                <MenuItem onClick={() => setZoneUser("พระราม2")} value="พระราม2">พระราม2</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "495px", margin: "5px" }}
              type="text"
              label="ชื่อ-สกุล"
              variant="outlined"
              onChange={(e) => setNameSurname(e.target.value)}
              value={NameSurname}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "350px", margin: "5px" }}
              type="text"
              label="เลขบัตรประชาชน"
              variant="outlined"
              onChange={(e) => (setPerson_ID(e.target.value), UserID = e.target.value)}
              value={Person_ID}
            />

            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "200px", margin: "5px" }}
              type="text"
              label="อายุ"
              variant="outlined"
              onChange={(e) => setAge(e.target.value)}
              value={Age}
            />

          </div>
          <div className="input-InputHistory">


            <FormControl className="input-text" component="fieldset">
              <FormLabel component="legend">เพศ</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="ชาย"
                  control={<Radio color="primary" />}
                  label="ชาย"
                  labelPlacement="End"
                  onChange={(e) => setGender(e.target.value)}
                />
                <FormControlLabel
                  value="หญิง"
                  control={<Radio color="primary" />}
                  label="หญิง"
                  labelPlacement="End"
                  onChange={(e) => setGender(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
            <TextField
              className="input-text"
              id="date"
              style={{ width: "200px", margin: "5px" }}
              label="Birthday"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTimeBirthday(e.target.value)}
              value={TimeBirthday}
            />
            <TextField
              className="input-text"
              id="date"
              style={{ width: "200px", margin: "5px" }}
              label="วันแรกที่มีอาการ"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSymptom(e.target.value)}
              value={Symptom}
            />

            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "490px", margin: "5px" }}
              type="text"
              label="รักษาที่โรงพยาบาล"
              variant="outlined"
              onChange={(e) => setHospitalized(e.target.value)}
              value={Hospitalized}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="คำวินิจฉัยแพทย์"
              variant="outlined"
              onChange={(e) => setDiagnosis(e.target.value)}
              value={Diagnosis}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="โรคประจำตัว"
              variant="outlined"
              onChange={(e) => setDisease(e.target.value)}
              value={Disease}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="อาการปัจุบัน"
              variant="outlined"
              onChange={(e) => setCurrent_symptoms(e.target.value)}
              value={Current_symptoms}
            />
          </div>
          <hr></hr>
          <div className="input-InputHistory">
            <FormControl style={{ width: "1070px", margin: "10px" }} className="input-text" component="fieldset">
              <FormLabel style={{ marginBottom: "10px" }} component="legend">
                ปัจจุบันผู้ป่วยอยู่ที่
              </FormLabel>
              <RadioGroup
                // row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="อยู่โรงพยาบาล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)"
                  control={<Radio color="primary" />}
                  label="อยู่โรงพยาบาล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setCurren_Address_Radio(e.target.value)}
                />
                <FormControlLabel
                  value="เพิ่งกลับบ้าน (1 สัปดาห์)"
                  control={<Radio color="primary" />}
                  label="เพิ่งกลับบ้าน (1 สัปดาห์)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setCurren_Address_Radio(e.target.value)}
                />
                <FormControlLabel
                  value="อยู่ที่บ้านนานแล้ว"
                  control={<Radio color="primary" />}
                  label="อยู่ที่บ้านนานแล้ว"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setCurren_Address_Radio(e.target.value)}
                />
                <FormControlLabel
                  value="อยู่ศูนย์ฟื้นฟู/ศูนย์ดูแล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)"
                  control={<Radio color="primary" />}
                  label="อยู่ศูนย์ฟื้นฟู/ศูนย์ดูแล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setCurren_Address_Radio(e.target.value)}
                />
                <FormControlLabel
                  value="อื่นๆ"
                  control={<Radio color="primary" />}
                  label="อื่นๆ"
                  style={{ textAlign: "start" }}
                  labelPlacement="End"
                  onChange={(e) => setCurren_Address_Radio(e.target.value)}
                />
              </RadioGroup>
            </FormControl>
          </div>
          <hr></hr>
          <div className="input-InputHistory">
            <FormLabel style={{ marginBottom: "10px" }} component="legend">
              ที่พักปัจจุบัน
            </FormLabel>
            {Person_ID != "" ? <div style={{ width: "1100px", height: "500px", marginLeft: "20px" }}><MapUser UserID={Person_ID} /></div> : null}
          </div>
          <div className="input-InputHistory">

            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="เลขที่บ้าน/ห้อง"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="ซอย/ถนน"
              variant="outlined"
              onChange={(e) => setCurren_Address(e.target.value)}
              value={Curren_Address}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="จุดสังเกต"
              variant="outlined"
              onChange={(e) => setLandmark(e.target.value)}
              value={Landmark}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="พื้นที่จอดรถ"
              variant="outlined"
              onChange={(e) => setPositionCar(e.target.value)}
              value={PositionCar}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="ชื่อ-สกุล(ผู้ติดต่อ)"
              variant="outlined"
              onChange={(e) => setNameSurname_parent(e.target.value)}
              value={NameSurname_parent}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="ความสัมพันธ์กับผู้ป่วย"
              variant="outlined"
              onChange={(e) => setRelationShip(e.target.value)}
              value={RelationShip}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="เบอร์ติดต่อ"
              variant="outlined"
              onChange={(e) => setTel(e.target.value)}
              value={Tel}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="จำนวนครั้ง/สัปดาห์"
              variant="outlined"
              onChange={(e) => setCount_Want(e.target.value)}
              value={Count_Want}
            />
          </div>
          <hr></hr>
          <div className="input-InputHistory">
            <FormControl style={{ margin: "10px" }} component="fieldset">
              <FormLabel style={{ margin: "10px" }} component="legend">รู้จัก ReBRAIN จาก</FormLabel>
              <FormGroup aria-label="position" row className="check-box">
                <FormControlLabel
                  value="มีผู้แนะนำให้รู้จัก ReBRAIN"
                  control={<Checkbox color="primary" />}
                  label="มีผู้แนะนำให้รู้จัก ReBRAIN"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
                <FormControlLabel
                  value="ค้นหาจาก Facebook"
                  control={<Checkbox color="primary" />}
                  label="ค้นหาจาก Facebook"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
                <FormControlLabel
                  value="ค้นหาจาก Google"
                  control={<Checkbox color="primary" />}
                  label="ค้นหาจาก Google"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
                <FormControlLabel
                  value="ค้นหาจาก Youtube"
                  control={<Checkbox color="primary" />}
                  label="ค้นหาจาก Youtube"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
                <FormControlLabel
                  value="คนไข้เก่า ReBRAIN"
                  control={<Checkbox color="primary" />}
                  label="คนไข้เก่า ReBRAIN"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
                <FormControlLabel
                  value="กลุ่มโรคหลอดเลือดสมอง"
                  control={<Checkbox color="primary" />}
                  label="กลุ่มโรคหลอดเลือดสมอง"
                  labelPlacement="end"
                  onChange={(e) =>
                    setRecommend(Recommend + " " + e.target.value)
                  }
                />
              </FormGroup>
            </FormControl>
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "500px", margin: "5px" }}
              type="text"
              label="ใช้คำค้นหาว่าอย่างไร"
              variant="outlined"
              onChange={(e) => setKeyword(e.target.value)}
              value={Keyword}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "500px", margin: "5px" }}
              type="text"
              label="ผู้แนะนำ..."
              variant="outlined"
              onChange={(e) => setRecommender(e.target.value)}
              value={Recommender}
            />
          </div>
          {Person_ID != "" ? 
          <div style={{ width: "1100px", marginLeft: "20px" }}>
            <hr></hr>
            <h3>อัพโหลด รูปภาพคนไข้</h3>
            <input type="file" id="file" accept="image/*" onChange={readImages}/>
            {imageUrl
            ? imageUrl.map(({ id, url }) => {
                return (
                  <div key={id}>
                    <img style={{ width:"250px" ,height:"250px" }} src={url} alt="" /><br></br>
                    <button onClick={() => deleteImage(id)}>ลบรูป</button>
                  </div>
                );
              })
            : ''}
            <hr style={{ marginTop: "40px"}}></hr>
          </div> 
          : null}
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
                onClick={onClearData}
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
