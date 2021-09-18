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
import Form_FirstCase_Report from "../Components/Form_FirstCase_Report";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Admin from "../Page/Admin";
function ShowReport_Admin() {
  const history = useHistory();
  const [DataList_FirstCase, setDataList_FirstCase] = useState([]);
  const [SelectName, setSelectName] = useState([]);
  const [DataList_Day, setDataList_Day] = useState([]);
  const [DataList_Month, setDataList_Month] = useState([]);
  const [ShowFirstCase, setShowFirstCase] = useState(false);
  const [Check, setCheck] = useState(true);
  const [Obj, setObj] = useState([]);
  const [Query_Name, setQuery_Name] = useState("");
  const [to,setTo]=useState("")
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

  function onFetchFirstCase_Report() {
    const FetchData = firebase.database().ref("FirstCase_Report");
    FetchData.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      setDataList_FirstCase(dataList);
      setSelectName(dataList);
    });
  }
  function onFetchDay_Report() {
    const FetchData = firebase.database().ref("Day_Report");
    FetchData.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      setDataList_Day(dataList);
    });
  }
  function onFetchMonth_Report() {
    const FetchData = firebase.database().ref("Month_Report");
    FetchData.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      setDataList_Month(dataList);
    });
  }
  useEffect(() => {
    onFetchFirstCase_Report();
    onFetchDay_Report();
    onFetchMonth_Report();
  }, []);
  const onDetail = () => {
    setTo({data:Obj})
    setCheck(false);
    setShowFirstCase(true);
  };
  
  function onSearch(e) {
    const data = [];
    for (let i in DataList_FirstCase) {
      if (DataList_FirstCase[i].CaseName == Query_Name) {
        data.push({ i, ...DataList_FirstCase[i] });
      }
    }
    setDataList_FirstCase(data);
    const data1 = [];
    for (let i in DataList_Day) {
      if (DataList_Day[i].CaseName == Query_Name) {
        data1.push({ i, ...DataList_Day[i] });
      }
    }
    setDataList_Day(data1);
    const data2 = [];
    for (let i in DataList_Month) {
      if (DataList_Month[i].CaseName == Query_Name) {
        data2.push({ i, ...DataList_Month[i] });
      }
    }
    setDataList_Month(data2);
    // setQuery_Name("");
    // onSearch("")
  }

  const onClear = () => {
    onFetchFirstCase_Report();
    onFetchDay_Report();
    onFetchMonth_Report();
  };
  return (
    <div>
        <div>
          <div>
            {/* เปลี่ยนมาเป็น onclick เอาจะได้ไม่บัค */}
            <div style={{ float: "left", width: "80%", margin: "10px" ,marginTop: "30px"}}>
              <InputLabel id="demo-simple-select-helper-label">
                ค้นหารายงาน
              </InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                value={Query_Name}
                onChange={(e) => (
                  console.log("e.target.value",e.target.value)+
                  setQuery_Name(e.target.value), onSearch(e.target.value)
                )}
                style={{ width: "450px" }}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {SelectName.map((value) => (
                  <MenuItem value={value.CaseName}>
                    {/* onClick={() => setQuery_Name(value.CaseName), onSearch(value.CaseName)} */}
                    {"(" + value.CaseName + ")" + value.Name}
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
          </div>

          <div>
            <TableContainer style={{ marginTop: "20px" }}>
              <Table style={{ width: "100%" }}>
                <TableHead style={{ width: "250px" }}>
                  <h1>ตารางรายการแรกรับ</h1>
                  <TableRow>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อเคสรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อคนไข้</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">วันที่ส่งรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ดูผลรายงาน</TableCell>
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
                          onClick={() => (setObj(value),history.push({
                            pathname: '/firstreport',
                            data:value
                          }))}
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
              <Table style={{ width: "100%" }}>
                <TableHead style={{ width: "250px" }}>
                  <h1>ตารางรายวัน</h1>
                  <TableRow>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อเคสรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อคนไข้</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">วันที่ส่งรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ดูผลรายงาน</TableCell>
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
                          onClick={() => (setObj(value),history.push({
                            pathname: '/dayreport',
                            data:value
                          }))}
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
              <Table style={{ width: "100%" }}>
                <TableHead style={{ width: "250px" }}>
                  <h1>ตารางรายเดือน</h1>
                  <TableRow>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อเคสรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ชื่อคนไข้</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">วันที่ส่งรายงาน</TableCell>
                    <TableCell style={{ width: "25%" }} align="center">ดูผลรายงาน</TableCell>
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
                          onClick={() => (setObj(value),history.push({
                            pathname: '/monthreport',
                            data:value
                          }))}
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
        </div>
    </div>
  );
}

export default ShowReport_Admin;
