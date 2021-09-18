import shadows from "@material-ui/core/styles/shadows";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import ShowData_User from "../Components/ShowData_User";
import Calendar_User from "../Components/Calendar_User"
import Show_Report_User from "../Components/Show_Report_User";
import firebase from "../Firebase/firebase";
import "../css/User.css";
function User() {
  const [ShowData, setShowData] = useState(false);
  const [ShowTable, setShowTable] = useState(false);
  const [ShowReport, setShowReport] = useState(false)
  const [DataLists, setDataLists] = useState([]);
  const [Username, setUsername] = useState(
    localStorage.getItem("Username_User")
  );
  const nextPage = useHistory();
  if (localStorage.getItem("isLoginUser") == 0) {
    nextPage.push("/");
  }
  const Clear=()=>{
    setShowData(false);
    setShowTable(false);
    setShowReport(false)
  }
  const onShowData_User = () => {
    Clear()
    setShowData(true);
  
  };
  const onLogout = () => {
    nextPage.push("/");
  };
  const onTable = () => {
    Clear()
    setShowTable(true);
 
  };
  const onShowReport=()=>{
    Clear()
    setShowReport(true)
  }
  useEffect(() => {
    const PullData = firebase.database().ref("User_History");
    PullData.orderByChild("Person_ID")
      .equalTo(Username)
      .on("value", (snapshot) => {
        const todos = snapshot.val();
        const TodoList = [];
        for (let id in todos) {
          TodoList.push({ id, ...todos[id] });
        }
        setDataLists(TodoList);
      });
  }, []);
  return (
    <div className="page-user">
      <div className="column-left">
        <h1>User Page</h1>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowData_User}
        >
          หน้าประวัติผู้ป่วย
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onTable}
        >
          ตารางนัด
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onShowReport}
        >
          ตารางแสดงรายงาน
        </Button>
        <Button
          style={{ width: "90%", margin: "5px" }}
          variant="contained"
          color="primary"
          onClick={onLogout}
        >
          Log Out
        </Button>
      </div>
      <div className="column-rigth">
        {ShowData
          ? DataLists.map((todo, index) => (
              <ShowData_User todo={todo} key={index} />
            ))
          : ""}
          {ShowTable?<Calendar_User/>:null}
          {ShowReport?<Show_Report_User/>:null}
      </div>
    </div>
  );
}

export default User;
