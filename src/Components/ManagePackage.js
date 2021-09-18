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

export default function ManagePackage() {
  const [NamePackage, setNamePackage] = useState("");
  const [PackagePrice, setPackagePrice] = useState("");
  const [PackageAmount, setPackageAmount] = useState("");
  const [PackageList, setPackageList] = useState([]);
  // const [Status, setStatus] = useState("0");

  const onSaveData = () => {
    let password = prompt("Please enter your password:");
    if (password == "ReBRAINNumber1") {
      const Add_firebase = firebase.database().ref("Package");
      const History = {
        NamePackage: NamePackage,
        PackagePrice: PackagePrice,
        PackageAmount: PackageAmount,
      };
      Add_firebase.push(History);
      setNamePackage("");
      setPackagePrice("");
      setPackageAmount("");
    }
    else { }
  };
  const onClearData = () => {
    setNamePackage("");
    setPackagePrice("");
    setPackageAmount("");
  };

  useEffect(() => {
    const PackageRef = firebase.database().ref('Package');
    PackageRef.on('value', (snapshot) => {
      const Packages = snapshot.val();
      const PackageList = [];
      for (let id in Packages) {
        PackageList.push({ id, ...Packages[id] });
      }
      setPackageList(PackageList);
      console.log(PackageList)


      const id = localStorage.getItem('id') || null;
      setState({ id: id, rows: PackageList })
    });

  }, []);

  function deletePackage(id) {
    let password = prompt("Please enter your password:");
    if (password == "ReBRAINNumber1") {
      const todoRef = firebase.database().ref("Package").child(id);
      todoRef.remove();
      // alert(`hello, ${id}`);
    }
    else { }
  }
  function updatePackage(id, NP, PP, PA) {
    let password = prompt("Please enter your password:");
    if (password == "ReBRAINNumber1") {
      if (NamePackage == '' && PackagePrice == '' && PackageAmount == '' && NamePackage == '') {
        // alert(`hello, ${id}`);
        setNamePackage(NP)
        setPackagePrice(PP)
        setPackageAmount(PA)
      } else {
        const updatePackage = firebase.database().ref("Package").child(id);
        updatePackage.update({
          NamePackage: NamePackage,
          PackagePrice: PackagePrice,
          PackageAmount: PackageAmount,
        });
        setNamePackage("")
        setPackagePrice("")
        setPackageAmount("")
      }
    }
    else { }
  }

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
          <h1>จัดการแพ็คเกจ: เพิ่มแพ็คเกจ </h1>
          <div className="input-InputHistory">
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
          </div>

          <div className="input-InputHistory">
            <div className="button-InputHistory">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px" }}
                onClick={onSaveData}
              >
                บันทึก
              </Button>
              <Button
                variant="contained"
                color="primary" //secondary
                style={{ width: "200px", marginLeft: "10px" }}
                onClick={onClearData}
              >
                ล้างข้อมูล
              </Button>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table" >
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">ชื่อแพ็คเกจ</TableCell>
                  <TableCell align="right">ราคาแพ็คเกจ</TableCell>
                  <TableCell align="right">จำนวนครั้ง/แพ็คเกจ</TableCell>
                  <TableCell align="right">ปุ่มแก้ไข</TableCell>
                  <TableCell align="right">ปุ่มลบ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {PackageList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((Package, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {(index + 1)}
                      {/* {index + 1}.{Package.id} */}
                    </TableCell>
                    <TableCell align="right" onClick={() => console.log("Test", "xxxxxxxxxxxxxxxxxxxx")}>{Package.NamePackage}</TableCell>
                    <TableCell align="right">{Package.PackagePrice}</TableCell>
                    <TableCell align="right">{Package.PackageAmount}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => updatePackage(Package.id, Package.NamePackage, Package.PackagePrice, Package.PackageAmount)}
                      >Edit</Button>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => deletePackage(Package.id)}
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
