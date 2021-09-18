import React, { useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "../css/ManageDoctor.css";
import firebase from "../Firebase/firebase";
import { v4 as uuid } from 'uuid';

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";

import MapUser from './Map_MUser';
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
  const [Expertise, setExpertise] = useState("ระบบประสาท");
  const [Education, setEducation] = useState("");
  const [EducationHistory, setEducationHistory] = useState("");
  const [WorkHistory, setWorkHistory] = useState("");
  const [Another, setAnother] = useState("");

  const [imageUrl, setImageUrl] = useState([]);
  const [Url, setUrl] = useState("");

  const [License, setLicense] = useState("");

  const onSaveData = (e) => {
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
      License:License,
    };
    Add_firebase.push(History);
    const AddLoginUser_firebase = firebase.database().ref("Doctor_Login");
    const LoginDoctor = {
      Username: IDCard.toString().replaceAll("-", ""),
      Password: Phone,
      Status:0
    };
    console.log("Success")
    console.log("Url",Url)
    

    AddLoginUser_firebase.push(LoginDoctor);
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
    setLicense("")

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
    setLicense("")
    setImageUrl([]);
    document.getElementById('file').value= null;
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
// console.log("ImageUrl",imageUrl)
  // const getImageUrl = () => {
  //   const imageRef = firebase.database().ref('images').child('daily');
  //   imageRef.on('value', (snapshot) => {
  //     const imageUrls = snapshot.val();
  //     const urls = [];
  //     for (let id in imageUrls) {
  //       urls.push({ id, url: imageUrls[id] });
  //     }
  //     const newState = [...imageUrl, ...urls];
  //     setImageUrl(newState);
  //   });
  // };

  const deleteImage = (id) => {
    setImageUrl([]);
    document.getElementById('file').value= null;
  //   const storageRef = firebase.storage().ref('images').child(id);
  //   const imageRef = firebase.database().ref('images').child('daily').child(id);
  //   storageRef.delete().then(() => {
  //     imageRef.remove();
  //   });
  };

  // useEffect(() => {
  //   // getImageUrl();
  // }, []);

  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">
          <h1>จัดการหมอ: เพิ่มประวัติข้อมูลหมอ </h1>
          <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              // required
              style={{ width: "395px", margin: "5px" }}
              type="text"
              label="ชื่อ-สกุล"
              variant="outlined"
              onChange={(e) => setNameSurname(e.target.value)}
              value={NameSurname}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "190px", margin: "5px" }}
              type="text"
              label="ชื่อเล่น"
              variant="outlined"
              onChange={(e) => setNickName(e.target.value)}
              value={NameNickName}
            />
             <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "250px", margin: "5px" }}
              type="text"
              label="เลขใบประกอบวิชาชีพ"
              variant="outlined"
              onChange={(e) => setLicense(e.target.value)}
              value={License}
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
            {IDCard != "" ? <div style={{ width: "1100px", height: "500px", marginLeft: "20px" }}><MapUser UserID={IDCard} /></div> : null}
          </div>
          <div className="input-InputHistory">
           {/*  <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ความชำนาญในการรักษา"
              variant="outlined"
              onChange={(e) => setExpertise(e.target.value)}
              value={Expertise}
            /> */}
            <FormControl
              style={{ width: "1070px", margin: "5px" ,textAlign: "left"}}
              variant="outlined" >
              <Select value={Expertise}>
                {/* <MenuItem value={params.value}>{params.value}</MenuItem> */}
                <MenuItem onClick={() => setExpertise("ระบบประสาท")} value="ระบบประสาท">ระบบประสาท</MenuItem>
                <MenuItem onClick={() => setExpertise("ระบบกระดูกและกล้ามเนื้อ")} value="ระบบกระดูกและกล้ามเนื้อ">ระบบกระดูกและกล้ามเนื้อ</MenuItem>
                <MenuItem onClick={() => setExpertise("ระบบหายใจ")} value="ระบบหายใจ">ระบบหายใจ</MenuItem>
                <MenuItem onClick={() => setExpertise("คนไข้เด็ก")} value="คนไข้เด็ก">คนไข้เด็ก</MenuItem>
              </Select>
            </FormControl>

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
          {IDCard != "" ?
          <div style={{ float: "left" }} className="input-InputHistory">
            <hr></hr>
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
           : ''}
            <hr></hr>
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
