import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from "../Firebase/firebase";
import { useHistory } from "react-router-dom";
import "../css/Login.css";
import Regis_Doctor from "../Components/Register_Doctor"

export default function LoginAdmin() {
  const [Username, setUsername] = useState("");
  const [Password, setPassword] = useState("");
  const history = useHistory();
  localStorage.setItem("isLogin", 0);
  localStorage.setItem("isLoginDoctor", 0);
  function onSubmit() {
    if (Username === "user" && Password === "1234") {
      localStorage.setItem("isLogin", 1);
      history.push("/admin");
    } else {
      const PullData = firebase.database().ref("Doctor_Login");
      PullData.on("value", (snapshoet) => {
        const data = snapshoet.val();
        for (let i in data) {
          if (data[i].Username == Username && data[i].Password == Password && data[i].Status==0) {
            console.log("Login Sucess");
            localStorage.setItem("isLoginDoctor", 1);
            localStorage.setItem("Username_Doctor", data[i].Username);
            history.push("/doctor");
          }else if(data[i].Username == Username && data[i].Password == Password && data[i].Status==1){
            localStorage.setItem("isLoginDoctor", 1);
            localStorage.setItem("Username_Doctor", data[i].Username);
            history.push("/headerdoctor");
          }
        }
      });
    }
  }
  const [Register_Doctor, setRegister_Doctor] = useState(false);
  const [Doctor_Login, setDoctor_Login] = useState(true);

  const onRegister_Doctor=()=>{
    setRegister_Doctor(true)
    setDoctor_Login(false)
  }
  return (
    <div>
      {Register_Doctor?<Regis_Doctor/>:null}
      {Doctor_Login?
    <div className="page-login">
      <h1 style={{color: "rgb(9 32 165)"}}>Doctor Login</h1>
      <div className="main-login">
        <div className="form-login">
          <div className="login-input">
            <TextField
              label="User Name"
              style={{width:"300px", marginBottom:"10px"}}
              value={Username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
              label="Password"
              style={{width:"300px"}}
              type="password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="main-login">
        <div className="form-login">
          <div className="login-input">
            <Button variant="contained" color="primary" onClick={onSubmit}>
              Login
            </Button>
          </div>
          <div className="login-input">
            <Button variant="contained" color="primary">
              Cancel
            </Button>
          </div>
        </div>
      </div>
      <hr></hr>
      <div style={{margin: "5px" ,marginLeft: "0px" }}><a onClick={onRegister_Doctor} href="#">สมัครสมาชิกนักกายภาพ</a></div>
    </div>
    :null}
    </div>
  );
}
