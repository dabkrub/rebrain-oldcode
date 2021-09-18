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
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
function Show_Report_User() {
  const history = useHistory();
  const [User_ID, setUser_ID] = useState(localStorage.getItem("Username_User"));
  const [Obj, setObj] = useState("");
  const [DataList_FirstCase, setDataList_FirstCase] = useState([]);
  const [DataList_Month, setDataList_Month] = useState([]);
  const [DataList_Day, setDataList_Day] = useState([]);
  const [SelectName, setSelectName] = useState([]);
  const [CaseName, setCaseName] = useState("");
  console.log("TestUser", localStorage.getItem("Username_User"));
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
  const onFetchFirstCase_Report = () => {
    const dataList = [];
    const fectData = firebase.database().ref("FirstCase_Report");
    fectData.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase
        .database()
        .ref("FirstCase_Report")
        .child(snapshort.key);
      Check.on("value", (snap) => {
        if (snap.val().User_ID == User_ID) {
          dataList.push({ ...snap.val() });
        }
      });
    });
    setDataList_FirstCase(dataList);
    setSelectName(dataList)
  };
  function onFetchDay_Report() {
    const dataList = [];
    const fectData = firebase.database().ref("Day_Report");
    fectData.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase.database().ref("Day_Report").child(snapshort.key);
      Check.on("value", (snap) => {
        if (snap.val().User_ID == User_ID) {
          dataList.push({ ...snap.val() });
        }
      });
    });
    setDataList_Day(dataList); 

  }
  function onFetchMonth_Report() {
    const dataList = [];
    const fectData = firebase.database().ref("Month_Report");
    fectData.orderByKey().on("child_added", (snapshort) => {
      const Check = firebase
        .database()
        .ref("Month_Report")
        .child(snapshort.key);
      Check.on("value", (snap) => {
        if (snap.val().User_ID == User_ID && snap.val().status === 1) {
          dataList.push({ ...snap.val() });
        }
      });
    });
    setDataList_Month(dataList);
  }
  useEffect(() => {
    onFetchFirstCase_Report();
    onFetchDay_Report();
    onFetchMonth_Report();
  }, []);
  function onFetchSelect(e) {
    const dataList = [];
    for (let i in DataList_FirstCase) {
      if (DataList_FirstCase[i].Assessment_Date == e) {
        dataList.push({ i, ...DataList_FirstCase[i] });
      }
    }
    setDataList_FirstCase(dataList);

    const dataList2 = [];
    for (let i in DataList_Day) {
      if (DataList_Day[i].Assessment_Date == e) {
        dataList2.push({ i, ...DataList_Day[i] });
      }
    }
    setDataList_Day(dataList2);

    const dataList3 = [];
    for (let i in DataList_Month) {
      if (DataList_Month[i].Assessment_Date == e) {
        dataList3.push({ i, ...DataList_Month[i] });
      }
    }
    setDataList_Month(dataList3);
  }
  const onClear = () => {
    onFetchFirstCase_Report();
    onFetchDay_Report();
    onFetchMonth_Report();
  };
  return (
    <div>
      <div style={{ float: "left", width: "80%", margin: "10px" ,marginTop: "30px"}}>
      <InputLabel id="demo-simple-select-helper-label">ค้นหารายงาน</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={CaseName}
        onChange={(e) => (
          setCaseName(e.target.value), onFetchSelect(e.target.value)
        )}
        style={{ width: "450px" }}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {SelectName.map((value) => (
          <MenuItem value={value.Assessment_Date}>
            {"(" + value.Assessment_Date + ")" + value.Name}
          </MenuItem>
        ))}
      </Select>
      <Button
        color="primary"
        style={{ marginLeft: "30px" }}
        variant="contained"
        onClick={onClear}
      >
        Clear
      </Button>
      </div>
      <TableContainer style={{ marginTop: "20px" }}>
        <Table style={{ width: "1000px" }}>
          <TableHead style={{ width: "250px" }}>
            <h1>ตารางรายการแรกรับ</h1>
            <TableRow>
              <TableCell align="center">ชื่อเคสรายงาน</TableCell>
              <TableCell align="center">ชื่อคนไข้</TableCell>
              <TableCell align="center">วันที่ส่งรายงาน</TableCell>
              <TableCell align="center">ดูผลรายงาน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DataList_FirstCase.map((value, index) => (
              <TableRow>
                <TableCell align="center" scope="row">
                  {value.CaseName}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Name}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Assessment_Date}
                </TableCell>
                <TableCell align="center" scope="row">
                  <Button
                    color="primary"
                    onClick={() => (
                      setObj(value),
                      history.push({
                        pathname: "/firstreport",
                        data: value,
                      })
                    )}
                  >
                    ดูข้อมูล
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer style={{ marginTop: "20px" }}>
        <Table style={{ width: "1000px" }}>
          <TableHead style={{ width: "250px" }}>
            <h1>ตารางรายการรายวัน</h1>
            <TableRow>
              <TableCell align="center">ชื่อเคสรายงาน</TableCell>
              <TableCell align="center">ชื่อคนไข้</TableCell>
              <TableCell align="center">วันที่ส่งรายงาน</TableCell>
              <TableCell align="center">ดูผลรายงาน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DataList_Day.map((value, index) => (
              <TableRow>
                <TableCell align="center" scope="row">
                  {value.CaseName}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Name}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Assessment_Date}
                </TableCell>
                <TableCell align="center" scope="row">
                  <Button
                    color="primary"
                    onClick={() => (
                      setObj(value),
                      history.push({
                        pathname: "/dayreport",
                        data: value,
                      })
                    )}
                  >
                    ดูข้อมูล
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TableContainer style={{ marginTop: "20px" }}>
        <Table style={{ width: "1000px" }}>
          <TableHead style={{ width: "250px" }}>
            <h1>ตารางรายเดือน</h1>
            <TableRow>
              <TableCell align="center">ชื่อเคสรายงาน</TableCell>
              <TableCell align="center">ชื่อคนไข้</TableCell>
              <TableCell align="center">วันที่ส่งรายงาน</TableCell>
              <TableCell align="center">ดูผลรายงาน</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {DataList_Month.map((value, index) => (
              <TableRow>
                <TableCell align="center" scope="row">
                  {value.CaseName}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Name}
                </TableCell>
                <TableCell align="center" scope="row">
                  {value.Assessment_Date}
                </TableCell>
                <TableCell align="center" scope="row">
                  <Button
                    color="primary"
                    onClick={() => (
                      setObj(value),
                      history.push({
                        pathname: "/monthreport",
                        data: value,
                      })
                    )}
                  >
                    ดูข้อมูล
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Show_Report_User;
