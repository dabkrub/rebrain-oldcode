import React, { useEffect, useState } from "react";
import "../css/ManageDoctor.css";
import _ from 'lodash'
import firebase from "../Firebase/firebase";
// import ManagePackageList from './ManagePackageList';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import TablePagination from "@material-ui/core/TablePagination";

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
  table: {
    minWidth: 650,
  },
}));

export default function CancelCase() {
  const [NamePackage, setNamePackage] = useState("");
  const [PackagePrice, setPackagePrice] = useState("");
  const [PackageAmount, setPackageAmount] = useState("");
  const [CancelCaseList, setCancelCaseList] = useState([]);
  const [DoctorName, setDoctorName] = useState("");

  // const onSaveData = () => {
  //   const Add_firebase = firebase.database().ref("Package");
  //   const History = {
  //     NamePackage: NamePackage,
  //     PackagePrice: PackagePrice,
  //     PackageAmount: PackageAmount,
  //   };
  //   Add_firebase.push(History);
  //   setNamePackage("");
  //   setPackagePrice("");
  //   setPackageAmount("");
  // };
  // const onClearData = () => {
  //   setNamePackage("");
  //   setPackagePrice("");
  //   setPackageAmount("");
  // };

  useEffect(() => {

    const CancelCaseRef = firebase.database().ref('CancelCase');
    CancelCaseRef.on('value', (snapshot) => {
      const CancelCases = snapshot.val();
      const CancelCaseList = [];
      for (let id in CancelCases) {
        CancelCaseList.push({ id, ...CancelCases[id] });
      }
      setCancelCaseList(CancelCaseList);
      console.log(CancelCaseList)


      const id = localStorage.getItem('id') || null;
      setState({ id: id, rows: CancelCaseList })
    });

    // const DoctorRef = firebase.database().ref("Doctor_History");
    // DoctorRef.on("value", (snapshort) => {
    //   const data = snapshort.val();
    //   const dataList = [];
    //   for (let i in data) {
    //     if (data[i].IDCard == CancelCaseList[i].Doctor) {
    //       // console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxx","xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx")
    //       dataList.push({ i, ...data[i] });
    //       setDoctorName(data[i].Name)
    //     }
    //   }
    // });

  }, []);

  function deleteCancelCase(id) {
    if(window.confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่")==true){
    const todoRef = firebase.database().ref("CancelCase").child(id);
    todoRef.remove();
    // alert(`hello, ${id}`);
    }else{}
  }

  // function updatePackage(id, NP, PP, PA) {
  //   if (NamePackage == '' && PackagePrice == '' && PackageAmount == '' && NamePackage == '') {
  //     // alert(`hello, ${id}`);
  //     setNamePackage(NP)
  //     setPackagePrice(PP)
  //     setPackageAmount(PA)
  //   } else {
  //     const updatePackage = firebase.database().ref("Package").child(id);
  //     updatePackage.update({
  //       NamePackage: NamePackage,
  //       PackagePrice: PackagePrice,
  //       PackageAmount: PackageAmount,
  //     });
  //     setNamePackage("")
  //     setPackagePrice("")
  //     setPackageAmount("")
  //   }
  // }

  const [state, setState] = useState({ id: null, rows: [] });
  const [page, setPage] = useState(0);
  const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const classes = useStyles();

  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">
          <h1>ประวัติการยกเลิกคิว: ของหมอ </h1>
          {/* <div className="input-InputHistory">
            <TextField
              className="input-text"
              id="outlined-basic"
              // required
              style={{ width: "695px", margin: "5px" }}
              type="text"
              label="ชื่อแพ็คเกจ"
              variant="outlined"
              onChange={(e) => setNamePackage(e.target.value)}
              value={NamePackage}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "350px", margin: "5px" }}
              type="number"
              label="ราคาแพ็คเกจ"
              variant="outlined"
              onChange={(e) => setPackagePrice(e.target.value)}
              value={PackagePrice}
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "200px", margin: "5px" }}
              type="number"
              label="จำนวนครั้ง/แพ็คเกจ"
              variant="outlined"
              onChange={(e) => setPackageAmount(e.target.value)}
              value={PackageAmount}
            />
          </div> */}

          <div  style={{ width: "1450px", margin: "5px" }} className="input-InputHistory">
            <div className="button-InputHistory">
              {/* <Button
                variant="contained"
                color="primary"
                style={{ width: "200px" }}
                // onClick={onSaveData}
              >
                บันทึกข้อมูล
              </Button>
              <Button
                variant="contained"
                color="primary" //secondary
                style={{ width: "200px", marginLeft: "10px" }}
                // onClick={onClearData}
              >
                ล้างข้อมูล
              </Button> */}
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">ชื่อเคส</TableCell>
                  <TableCell align="right">วันที่เริ่มนัด</TableCell>
                  <TableCell align="right">เวลาเริ่มนัด</TableCell>
                  <TableCell align="right">วันที่สิ้นสุดนัด</TableCell>
                  <TableCell align="right">เวลาสิ้นสุดนัด</TableCell>
                  <TableCell align="right">วันเวลาที่ยกเลิกนัด</TableCell>
                  <TableCell align="right">ชื่อคนไข้</TableCell>
                  <TableCell align="right">หมอที่ยกเลิก</TableCell>
                  <TableCell align="right">ปุ่มลบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {CancelCaseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((CancelCase, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {(index + 1)}
                      {/* {index + 1}.{Package.id} */}
                    </TableCell>
                    <TableCell align="right">{CancelCase.text}</TableCell>
                    <TableCell align="right" onClick={() => console.log("Test","xxxxxxxxxxxxxxxxxxxx")}><a style={{ color: "#00CC00" }}>{CancelCase.start.toString().substring(0, 10)}</a></TableCell>
                    <TableCell align="right"><a style={{ color: "#00CC00" }}>{CancelCase.start.toString().substring(11)} น.</a></TableCell>
                    <TableCell align="right"><a style={{ color: "#FF0000" }}>{CancelCase.end.toString().substring(0, 10)}</a></TableCell>
                    <TableCell align="right"><a style={{ color: "#FF0000" }}>{CancelCase.end.toString().substring(11)} น.</a></TableCell>
                    <TableCell align="right"><a style={{ color: "#FF00FF" }}>{CancelCase.cancelDate} : {CancelCase.cancelTime} น.</a></TableCell>
                    <TableCell align="right">{CancelCase.user}</TableCell>
                    <TableCell align="right">{CancelCase.doctor}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deleteCancelCase(CancelCase.id)}
                      >Delete</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={state.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>

        </div>
      </div>
    </div>
  );
}
