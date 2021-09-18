import React, { useState }  from "react";
import LoginAdmin from "../Components/LoginAdmin";
import LoginUser from "../Components/LoginUser";
import "../css/Home.css";
function Home() {
  const [state, setState] = useState(<LoginUser />);
  localStorage.setItem('isLogin',0)
  localStorage.setItem('isLogin_User',0)

  const onSetUser= () => {
    console.log("onSetUser","onSetUser")
    setState(<LoginUser />);
    

  }
  const onSetDoctor= () => {
    console.log("onSetDoctor","onSetDoctor")
    setState(<LoginAdmin />);

  }


  
  return (
    <div className="page-home">
      {/*  className="title-home" */}
      <h1 style={{color: "#FFF", textShadow: "black 0.1em 0.1em 0.2em",fontSize: "50px"}} >ReBRAIN Connect</h1>
      <div style={{margin: "5px" ,marginLeft: "300px" }}>
        <a onClick={onSetUser} href="#">สมาชิก </a> 
        / 
        <a onClick={onSetDoctor} href="#"> นักกายภาพ</a>
      </div>
    
      <div className="component">
          {state}
      </div>
      
    </div>
  );
}

export default Home;
