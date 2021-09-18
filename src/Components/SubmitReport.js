import React,{useEffect,useState} from 'react'
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
import { useHistory } from "react-router-dom";
function SubmitReport() {
    const history=useHistory()
    const [DataList_Month, setDataList_Month] = useState([]);
    const [Doctor_ID, setDoctor_ID] = useState(
        localStorage.getItem("Username_Doctor")
      );
      const [Obj, setObj] = useState("");
    function onFetchMonth_Report() {
        const dataList = [];
        const fectData = firebase.database().ref("Month_Report");
        fectData.orderByKey().on("child_added", (snapshort) => {
          const Check = firebase
            .database()
            .ref("Month_Report")
            .child(snapshort.key);
          Check.on("value", (snap) => {
            if (snap.val().IDHeaderDoctor == Doctor_ID) {
              dataList.push({ ...snap.val() });
            }
          });
        });
        console.log(dataList)
        setDataList_Month(dataList);
      }
    useEffect(() => {
        onFetchMonth_Report()
    }, [])
    return (
        <div>
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
                        status:1
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
    )
}

export default SubmitReport
