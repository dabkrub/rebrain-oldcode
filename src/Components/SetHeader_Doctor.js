import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import firebase from "../Firebase/firebase";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@material-ui/core/TextField";
import "../css/SetHeader_Doctor.css";
function SetHeader_Doctor() {
  const [DataList, setDataList] = useState([]);
  const [Name, setName] = useState("");
  const [TeamDoctor, setTeamDoctor] = useState([]);
  const [TeamName, setTeamName] = useState("");
  const [DataList_CheckBox, setDataList_CheckBox] = useState([]);
  const [IDDoctor, setIDDoctor] = useState("");
  useEffect(() => {
    onFetchName();
  }, []);
  function onFetchName() {
    const fetchData = firebase.database().ref("Doctor_History");
    fetchData.on("value", (datasnap) => {
      const data = datasnap.val();
      const dataList = [];

      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      setDataList(dataList);
    });
  }
  function onFetchTable() {
    const fetchData = firebase.database().ref("Doctor_History");
    fetchData.on("value", (datasnap) => {
      const data = datasnap.val();
      const dataList2 = [];
      for (let i in data) {
        if (data[i].Name != Name) {
          dataList2.push({ i, ...{ id: data[i].IDCard, Name: data[i].Name } });
        }
      }
      setDataList_CheckBox(dataList2);
    });
  }
  const columns = [
    { field: "id", headerName: "ID", width: 300 },
    {
      field: "Name",
      headerName: "Doctor Name",
      width: 1000,
      editable: false,
    },
  ];
  const onSetTeamDoctor = () => {
    const PushData = firebase.database().ref("Doctor_Team");
    const FetchData = firebase.database().ref("Doctor_History");
    var data = [];
    for (let i in TeamDoctor) {
      console.log("TestSetTeam: ", TeamDoctor[i]);
      FetchData.orderByKey().on("child_added", (key) => {
        console.log(key.val());
        if (key.val().IDCard == TeamDoctor[i]) {
          data.push({ i, ...{ ID: TeamDoctor[i], Name: key.val().Name } });
        }
      });
    }
    const data2 = {
      TeamName: TeamName,
      HeaderName: Name,
      IDDoctor: IDDoctor,
      Person: data,
    };
    console.log("data: ", data);
    PushData.push(data2);
    for (let i in data) {
      const DataUpdate2 = firebase.database().ref("Doctor_History");
      DataUpdate2.orderByKey().on("child_added", (snapshort) => {
        const Check = firebase
          .database()
          .ref("Doctor_History")
          .child(snapshort.key);
        Check.on("value", (snap) => {
          if (snap.val().IDCard == data[i].ID) {
            Check.update({
              HeaderTeamName: Name,
              HeaderTeamID: IDDoctor,
            });
          }
        });
      });

      const DataUpdate3 = firebase.database().ref("Doctor_Login");
      DataUpdate3.orderByKey().on("child_added", (snapshort) => {
        const Check = firebase
          .database()
          .ref("Doctor_Login")
          .child(snapshort.key);
        Check.on("value", (snap) => {
          if (snap.val().Username ==IDDoctor) {
            Check.update({
              Status:1, 
              HeaderTeamName: Name,
              HeaderTeamID: IDDoctor,
            });
          }
        });
      });
    }
  };
  const rows = [DataList_CheckBox];
  return (
    <div>
      <div className="main">
        <div className="setDoctor">
          <InputLabel id="demo-simple-select-helper-label">
            หัวหน้าหมอ
          </InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={Name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: "300px" }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {DataList.map((value) => (
              <MenuItem
                value={value.Name}
                onClick={() => setIDDoctor(value.IDCard)}
              >
                {value.Name}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            style={{ marginLeft: "20px" }}
            onClick={onFetchTable}
          >
            ตั้งเป็นหัวหน้าหมอ
          </Button>
        </div>
        <div className="setDoctor">
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ width: "1490px", margin: "5px" }}
            type="text"
            label="ชื่อทีม"
            variant="outlined"
            value={TeamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </div>
        <div className="setDoctor" style={{ height: 400, width: 1500 }}>
          <DataGrid
            rows={DataList_CheckBox}
            columns={columns}
            pageSize={5}
            checkboxSelection
            disableSelectionOnClick
            onSelectionModelChange={(e) => setTeamDoctor(e.selectionModel)}
          />
        </div>
        <div className="setDoctor">
          <Button
            variant="contained"
            color="primary"
            style={{ width: "1500px" }}
            onClick={onSetTeamDoctor}
          >
            ตกลง
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SetHeader_Doctor;
