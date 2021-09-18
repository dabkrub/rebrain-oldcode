import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../css/ManageDoctor.css";
import firebase from "../Firebase/firebase";
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

export default function ManageDoctor() {
  const classes = useStyles();
  const [NameSurname, setNameSurname] = useState("");
  const [NameNickName, setNickName] = useState("");
  const [TimeBirthday, setTimeBirthday] = useState("");
  const [Phone, setPhone] = useState("");
  const [Email, setEmail] = useState("");
  const [IDCard, setIDCard] = useState("");
  const [Address, setAddress] = useState("");
  const [Expertise, setExpertise] = useState("");
  const [Education, setEducation] = useState("");
  const [EducationHistory, setEducationHistory] = useState("");
  const [WorkHistory, setWorkHistory] = useState("");
  const [Another, setAnother] = useState("");

  const [imageUrl, setImageUrl] = useState([]);
  const [Url, setUrl] = useState("");

  const onSaveData = () => {
    const Add_firebase = firebase.database().ref("Doctor_History");
    const History = {
      Name: NameSurname,
      NickName: NameNickName,
      Birthday: TimeBirthday,
      Phone: Phone,
      Email: Email,
      IDCard: IDCard,
      Address: Address,
      Expertise: Expertise,
      Education: Education,
      EducationHistory: EducationHistory,
      WorkHistory: WorkHistory,
      Another: Another,
      resource: IDCard,
      image:Url,
      HeaderTeamName: "",
      HeaderTeamID: "",
    };
    Add_firebase.push(History);
    const AddLoginUser_firebase = firebase.database().ref("Doctor_Login");
    const LoginDoctor = {
      Username: IDCard.toString().replaceAll("-", ""),
      Password: Phone,
      Status:0
    };
    console.log("Success")
    AddLoginUser_firebase.push(LoginDoctor);
    window.location.reload()
  };
  const onClearData = () => {
    setNameSurname("");
    setNickName("");
    setTimeBirthday("");
    setPhone("");
    setEmail("");
    setIDCard("");
    setAddress("");
    setExpertise("");
    setEducation("");
    setEducationHistory("");
    setWorkHistory("");
    setAnother("");
  };

  const readImages = async (e) => {
    // setImageUrl(newState.length = 0);

    const file = e.target.files[0];
    console.log("file",file)
    // const id = uuid();
    const storageRef = firebase.storage().ref('images').child(IDCard);
    // const imageRef = firebase.database().ref('images').child('daily').child(id);
    await storageRef.put(file);
    storageRef.getDownloadURL().then((url) => {
    // imageRef.set(url);
    
      const newState = [...imageUrl, { IDCard, url }];
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
      <div style={{ backgroundColor: "white" ,borderRadius: "50px",boxShadow: "gray 0.1em 0.1em 0.2em"}} className="main-InputHistory">
        <div className="form-InputHistory">
          <h1 style={{color: "rgb(9 32 165)"}}>สมัครสมาชิกนักกายภาพ</h1>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              // required
              style={{ width: "595px", margin: "5px" }}
              type="text"
              label="ชื่อ-สกุล"
              variant="outlined"
              onChange={(e) => setNameSurname(e.target.value)}
              value={NameSurname}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="ชื่อเล่น"
              variant="outlined"
              onChange={(e) => setNickName(e.target.value)}
              value={NameNickName}
            />
            <TextField
              className="input-text"
              id="date"
              label="วันเดือนปีเกิด"
              type="date"
              defaultValue="2017-05-24"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setTimeBirthday(e.target.value)}
              value={TimeBirthday}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="เบอร์โทร"
              variant="outlined"
              onChange={(e) => setPhone(e.target.value)}
              value={Phone}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "400px", margin: "5px" }}
              type="text"
              label="อีเมล"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={Email}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="เลขบัตรประชาชน"
              variant="outlined"
              onChange={(e) => setIDCard(e.target.value)}
              value={IDCard}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ที่อยู่"
              variant="outlined"
              onChange={(e) => setAddress(e.target.value)}
              value={Address}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ความชำนาญในการรักษา"
              variant="outlined"
              onChange={(e) => setExpertise(e.target.value)}
              value={Expertise}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="จบการศึกษาระดับสาขาอาชีพ"
              variant="outlined"
              onChange={(e) => setEducation(e.target.value)}
              value={Education}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ประวัติการศึกษา การอบรมและการดูงาน"
              variant="outlined"
              onChange={(e) => setEducationHistory(e.target.value)}
              value={EducationHistory}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ประวัติการทำงาน"
              variant="outlined"
              onChange={(e) => setWorkHistory(e.target.value)}
              value={WorkHistory}
            />
          </div>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="อื่น ๆ"
              variant="outlined"
              onChange={(e) => setAnother(e.target.value)}
              value={Another}
            />
          </div>
          <div style={{ float: "left" }} className="input-InputHistory">
          <h3>อัพโหลด รูปภาพหมอ</h3>
          <input type="file" id="file" accept="image/*" onChange={readImages} />
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
                color="primary" //secondary
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
