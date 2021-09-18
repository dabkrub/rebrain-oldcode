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
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import firebase from "../Firebase/firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import "../css/SetCaseName.css";
function SetCaseName() {
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
  const classes = useStyles();
  const [DataList, setDataList] = useState([]);
  const [Name, setName] = useState("");
  const [Person_ID, setPerson_ID] = useState("");
  const [CaseName, setCaseName] = useState("");
  const [Age, setAge] = useState("");
  const [Birthday, setBirthday] = useState("");
  const [Tel, setTel] = useState("");
  const [Gender, setGender] = useState("");
  const [Current_symptoms, setCurrent_symptoms] = useState("");
  const [Address, setAddress] = useState("");
  const [Zone, setZone] = useState("");
  const [Status, setStatus] = useState("");

  const [NameSurname_parent, setNameSurname_parent] = useState("");
  const [DataListCaseName, setDataListCaseName] = useState([]);
  const FetchData = () => {
    const DataPull = firebase.database().ref("User_History");
    DataPull.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        if (data[i].text == "" || data[i].zone == "" || data[i].status == "") {
          dataList.push({ i, ...data[i] });
        }
      }
      setDataList([...dataList]);
    });
  };
  const onShow = () => {
    const Check = firebase.database().ref("User_History");
    Check.on("value", (snap) => {
      const data = snap.val();
      const dataList = [];
      for (let i in data) {
        if (data[i].text != "") {
          dataList.push({ i, ...data[i] });
        }
      }
      console.log(dataList);
      setDataListCaseName(dataList)
    });
  };
  const onSave = () => {
    console.log(Person_ID);
    const DataUpdate = firebase.database().ref("User_History");
    DataUpdate.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase
        .database()
        .ref("User_History")
        .child(snapshort.key);
      Check.on("value", (snap) => {
        if (snap.val().Person_ID == Person_ID) {
          Check.update({
            text: CaseName,
            zone: Zone,
            status: Status,
          });
        }
      });
    });
  };
  useEffect(() => {
    FetchData();
  }, []);
  return (
    <div>
      <div className="formData">
        <div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-helper-label">
              ชื่อคนไข้ที่ยังไม่ได้ตั้งชื่อเคส
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={Name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: "555px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {DataList.map((value) => (
                <MenuItem
                  key={value.id}
                  value={value.Name}
                  onClick={() => (
                    setPerson_ID(value.Person_ID),
                    setAge(value.Age),
                    setBirthday(value.Birthday),
                    setTel(value.Tel),
                    setGender(value.Gender),
                    setAddress(value.Address),
                    setNameSurname_parent(value.NameSurname_parent),
                    setCurrent_symptoms(value.Current_symptoms)
                  )}
                >
                  {value.Name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            className="input-text1"
            id="outlined-basic"
            style={{ width: "270px", margin: "5px" }}
            type="text"
            label="ชื่อเคสที่ตั้ง"
            variant="outlined"
            value={CaseName}
            onChange={(e) => setCaseName(e.target.value)}
          />
          <FormControl className={classes.formControl}>
            <InputLabel>
              เลือกโซน
            </InputLabel>
            <Select
              value={Zone}
              onChange={(e) => setZone(e.target.value)}
              style={{ width: "270px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"นน"}>
                นน
              </MenuItem>
              <MenuItem value={"ปทุม"}>
                ปทุม
              </MenuItem>
              <MenuItem value={"เมือง"}>
                เมือง
              </MenuItem>
              <MenuItem value={"บางนา"}>
                บางนา
              </MenuItem>
              <MenuItem value={"มีน"}>
                มีน
              </MenuItem>
              <MenuItem value={"ฝั่งธน"}>
                ฝั่งธน
              </MenuItem>
              <MenuItem value={"พระราม2"}>
                พระราม2
              </MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.formControl} style={{ marginLeft: "10px" }}>
            <InputLabel>
              สถานะ
            </InputLabel>
            <Select
              value={Status}
              onChange={(e) => setStatus(e.target.value)}
              style={{ width: "270px" }}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={"Action"}>
                Action
              </MenuItem>
              <MenuItem value={"Rest"}>
                Rest
              </MenuItem>
              <MenuItem value={"Stop"}>
                Stop
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="อายุผู้ป่วย"
            variant="filled"
            value={Age}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="เลขประจำตัวประชาชน"
            variant="filled"
            value={Person_ID}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="วันเกิด"
            variant="filled"
            value={Birthday}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="เบอร์ติดต่อ"
            variant="filled"
            value={Tel}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="เพศ"
            variant="filled"
            value={Gender}
          />

          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="ที่อยู่"
            variant="filled"
            value={Address}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="ชื่อญาติ"
            variant="filled"
            value={NameSurname_parent}
          />
          <TextField
            className="input-text"
            style={{ width: "270px", margin: "5px" }}
            disabled
            id="filled-disabled"
            label="อาการปัจจุบัน"
            variant="filled"
            value={Current_symptoms}
          />
        </div>
      </div>

      <div className="btn">
        <Button
          variant="contained"
          color="primary"
          style={{ width: "200px", marginLeft: "10px" }}
          onClick={onSave}
        >
          บันทึกข้อมูล
        </Button>
        {"  "}
        <Button
          variant="contained"
          color="primary"
          style={{ width: "200px", marginLeft: "10px" }}
          onClick={onShow}
        >
          แสดงข้อมูลรายชื่อเคส
        </Button>
      </div>
      <div className="table">
        <div >
          <TableContainer style={{ marginTop: "20px" }}>
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ชื่อ</TableCell>
                  <TableCell align="center">ชื่อเคส</TableCell>
                  <TableCell align="center">โซน</TableCell>
                  <TableCell align="center">สถานะ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {DataListCaseName.map((value, index) => (
                  <TableRow>
                    <TableCell align="center" scope="row">
                      {value.Name}
                    </TableCell>
                    <TableCell align="center" scope="row">
                      {value.text}
                    </TableCell >
                    <TableCell align="center" scope="row">
                      {value.zone}
                    </TableCell >
                    <TableCell align="center" scope="row">
                      {value.status}
                    </TableCell >
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>

    </div>
  );
}

export default SetCaseName;
