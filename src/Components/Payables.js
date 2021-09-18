import React, { useEffect, useState } from "react";
import "../css/ManageDoctor.css";
import _ from "lodash";
import firebase from "../Firebase/firebase";
// import ManagePackageList from './ManagePackageList';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TablePagination from "@material-ui/core/TablePagination";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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

export default function Payables() {
  const [User_HistoryList, setUser_HistoryList] = useState([]);
  const [StatePopup, setStatePopup] = useState(false);

  const [Id, setId] = useState("");
  const [User, setUser] = useState([]);

  useEffect(() => {
    const User_HistoryRef = firebase.database().ref("User_History");
    User_HistoryRef.on("value", (snapshot) => {
      const User_Historys = snapshot.val();
      const User_HistoryList = [];
      for (let id in User_Historys) {
        // console.log("User_Historys",User_Historys[id].CountPackage)
        if (User_Historys[id].CountPackage < 0) {
          User_HistoryList.push({ id, ...User_Historys[id] });
        }
      }
      setUser_HistoryList(User_HistoryList);
      console.log(User_HistoryList);

      const id = localStorage.getItem("id") || null;
      setState({ id: id, rows: User_HistoryList });
    });
  }, []);

  const handleClose = () => {
    setStatePopup(false);
  };

  function handleOpen(Person_ID) {
    // if(window.confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่")==true){
    setStatePopup(true);
    setId(Person_ID);

    const UserRef = firebase.database().ref("User_History");
    UserRef.on("value", (snapshot) => {
      const Users = snapshot.val();
      const UserList = [];
      for (let id in Users) {
        if (Users[id].Person_ID == Person_ID) {
          UserList.push({ id, ...Users[id] });
        }
      }
      setUser(UserList);
    });
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
          <h1>รายชื่อคนไข้: ค้างจ่าย </h1>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">ชื่อเคส</TableCell>
                  <TableCell align="right">ชื่อ-นามสกุล</TableCell>
                  <TableCell align="right">วันเกิด</TableCell>
                  <TableCell align="right">อายุ</TableCell>
                  <TableCell align="right">เบอร์โทร</TableCell>
                  <TableCell align="right">จำนวนคงเหลือ</TableCell>
                  <TableCell align="right">ดูเพิ่มเติม</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {User_HistoryList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((User, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {index + 1}
                      {/* {index + 1}.{User.id} */}
                    </TableCell>
                    <TableCell align="right">{User.text}</TableCell>
                    <TableCell align="right">{User.Name}</TableCell>
                    <TableCell
                      align="right"
                      onClick={() =>
                        console.log("Test", "xxxxxxxxxxxxxxxxxxxx")
                      }
                    >
                      {User.Birthday}
                    </TableCell>
                    <TableCell align="right">{User.Age}</TableCell>
                    <TableCell align="right">{User.Tel}</TableCell>
                    <TableCell align="right">
                      <a style={{ color: "#FF0000" }}>{User.CountPackage}</a>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        color="primary"
                        // onClick={handleOpen}
                        onClick={() => handleOpen(User.Person_ID)}
                      >
                        VIEW
                      </Button>
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

          <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className="modal"
            open={StatePopup}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
          >
            <div align="center" style={{ marginTop: "5%" }}>
              <Fade in={StatePopup}>
                <div className="paper">
                  <h2 id="transition-modal-title">
                    รายละเอียดเพิ่มเติมคนไข้ : ค้างจ่าย
                  </h2>
                  <div
                    id="transition-modal-description"
                    style={{ textAlign: "start", marginLeft: "20px" }}
                  >
                    {User.map((value) => (
                      <p>
                        {"ชื่อเคส : " + value.text}
                        <br></br>
                        {"ชื่อ-สกุล : " + value.Name}
                        <br></br>
                        {"เลขบัตรประชาชน : " + value.Person_ID}
                        <br></br>
                        {"เพศ : " + value.Gender}
                        <br></br>
                        {"อายุ : " + value.Age + " ปี"}
                        <br></br>
                        {"รักษาที่โรงพยาบาล : " + value.Hospitalized}
                        <br></br>
                        {"คำวินิจฉัยแพทย์ : " + value.Diagnosis}
                        <br></br>
                        {"อาการปัจจุบัน : " + value.Current_symptoms}
                        <br></br>
                        {"ปัจจุบันผู้ป่วยอยู่ที่ : " +
                          value.Curren_Address_Radio}
                        <br></br>
                        {"ที่อยู่ : " +
                          value.Address +
                          " " +
                          value.Curren_Address}
                        <br></br>
                        {"จุดสังเกต : " + value.Landmark}
                        <br></br>
                        {"ชื่อ-สกุล(ผู้ติดต่อ) : " + value.NameSurname_parent}
                        <br></br>
                        {"ความสัมพันธ์กับผู้ป่วย : " + value.RelationShip}
                        <br></br>
                        {"เบอร์โทรติดต่อ : " + value.Tel}
                        <br></br>
                        {"พื้นที่จอดรถ : " + value.PositionCar}
                        <br></br>
                        {"รู้จักจาก : " + value.Recommend}
                        <br></br>
                        {"ใช้คำค้นหาว่า : " + value.Keyword}
                        <br></br>
                        {"ผู้แนะนำ : " + value.Recommender}
                        <br></br>
                      </p>
                    ))}

                    <div style={{ flex: 1, textAlign: "center" }}>
                      <Button
                        variant="contained"
                        color="Back"
                        onClick={handleClose}
                        style={{ margin: "10px" }}
                      >
                        ออก
                      </Button>
                    </div>
                  </div>
                </div>
              </Fade>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  );
}
