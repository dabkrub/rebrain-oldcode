import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import firebase from '../Firebase/firebase'
import { useHistory } from "react-router-dom";
import "../css/Login.css";
import Regis_User from "../Components/Register_User"

export default function LoginUser() {
  const [Username, setUsername] = useState("")
  const [Password, setPassword] = useState("")
  localStorage.setItem("Username_User","")
  const nextPage=useHistory();
  localStorage.setItem("isLoginUser",0)
  const onSubmit=()=>{
    
    const PullData=firebase.database().ref("User_Login");
    PullData.on("value",(snapshoet)=>{
      const data=snapshoet.val()
      for(let i in data){
       if(data[i].Username==Username && data[i].Password==Password){
         console.log("Login Sucess")
         localStorage.setItem("isLoginUser",1)
         localStorage.setItem("Username_User",data[i].Username)
         nextPage.push('/user')
       }
      }
    })
  }
  const [Register_User, setRegister_User] = useState(false);
  const [User_Login, setUser_Login] = useState(true);

  const onRegister_User=()=>{
    setRegister_User(true)
    setUser_Login(false)
  }

  return (
    <div>
      
      {Register_User?<Regis_User/>:null}
      {User_Login?
      <div className="page-login">
      <h1 style={{color: "rgb(9 32 165)"}}>User Login</h1>
      <div className="main-login">
        <div className="form-login">
          <div className="login-input">
            <TextField
              label="User Name"
              type="text"
              style={{width:"300px", marginBottom:"10px"}}
              value={Username}
              onChange={(e)=>{setUsername(e.target.value)}}
            />
            <TextField
              label="Password"
              type="password"
              style={{width:"300px"}}
              value={Password}
              onChange={(e)=>{setPassword(e.target.value)}}
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
      <div style={{margin: "5px" ,marginLeft: "0px" }}><a onClick={onRegister_User} href="#">สมัครสมาชิก</a></div>
    </div>
      :null}

    </div>
  );
}
