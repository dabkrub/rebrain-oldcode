import React, { useEffect, useState } from "react";
import firebase from "../Firebase/firebase";
import "../css/BuyPackage.css";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";

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

import { useHistory } from "react-router-dom";
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

export default function BuyPackage() {
  const history = useHistory();
  const [PackageList, setPackageList] = useState([]);
  const [state, setState] = useState({
    PackageId: "",
    PackageName: "",
    PackageAmount: 0,
    PackagePrice: "",
  });
  const [Type, setType] = useState("");
  const [TimeDate, setTimeDate] = useState("");
  const [BankName, setBankName] = useState("");
  const [Time, setTime] = useState("");

  const [UserList, setUserList] = useState([]);
  const [User, setUser] = useState({ Userid: "", UserName: "", User: "" });

  const [TradeList, setTradeList] = useState([]);
  const [DataPackage, setDataPackage] = useState([]);
  const [TableTradeList, setTableTradeList] = useState([]);
  const [stateId, setStateId] = useState({ id: null, rows: [] });
  const [page, setPage] = useState(0);
  // const [rows, setRows] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [Obj, setObj] = useState([]);
  useEffect(() => {
    const PackageRef = firebase.database().ref("Package");
    PackageRef.on("value", (snapshot) => {
      const Packages = snapshot.val();
      const PackageList = [];
      for (let id in Packages) {
        PackageList.push({ id, ...Packages[id] });
      }
      setPackageList(PackageList);
      console.log(PackageList);
    });

    const UserRef = firebase.database().ref("User_History");
    UserRef.on("value", (snapshot) => {
      const Users = snapshot.val();
      const UserList = [];
      for (let id in Users) {
        UserList.push({ id, ...Users[id] });
      }
      setUserList(UserList);
      console.log("UserList", UserList);
    });

    const TradeRef = firebase.database().ref("Trade_History");
    TradeRef.on("value", (snapshot) => {
      const Trades = snapshot.val();
      const TradeList = [];
      for (let id in Trades) {
        TradeList.push({ id, ...Trades[id] });
      }
      console.log("TradeList", TradeList);
      setTradeList(TradeList.length);
    });

    const TableTradeRef = firebase.database().ref("Trade_History");
    TableTradeRef.on("value", (snapshot) => {
      const TableTrades = snapshot.val();
      const TableTradeList = [];
      for (let id in TableTrades) {
        TableTradeList.push({ id, ...TableTrades[id] });
      }
      setTableTradeList(TableTradeList);
      setStateId({ id: null, rows: TableTradeList });
    });
  }, []);

  const onSaveData = () => {
    console.log("bill", TradeList + 1);
    console.log("PackageId", state.PackageId);
    console.log("PackageName", state.PackageName);
    console.log("PackageAmount", state.PackageAmount);
    console.log("PackagePrice", state.PackagePrice);
    console.log("Type", Type);
    console.log("TimeDate", TimeDate);
    console.log("BankName", BankName);
    console.log("Time", Time);
    console.log("UserName", User.UserName);
    console.log("User_Person_ID", User.User_Person_ID);
    console.log("text", User.Usertext);

    const Add_firebase = firebase.database().ref("Trade_History");
    const Trade = {
      bill: TradeList + 1,
      PackageId: state.PackageId,
      PackageName: state.PackageName,
      PackageAmount: state.PackageAmount,
      PackagePrice: state.PackagePrice,
      Type: Type,
      TimeDate: TimeDate,
      BankName: BankName,
      Time: Time,
      UserName: User.UserName,
      User_Person_ID: User.User_Person_ID,
      text: User.Usertext,
    };
    Add_firebase.push(Trade);
    console.log("COuntPackage", User.UserCountPackage);
    console.log("state.PackageAmount", state.PackageAmount);
    if (Math.abs(User.UserCountPackage) <= state.PackageAmount) {
      const DataUpdate2 = firebase.database().ref("Calendar");
      DataUpdate2.orderByKey().on("child_added", (snapshort) => {
        const Check = firebase.database().ref("Calendar").child(snapshort.key);
        Check.on("value", (snap) => {
          if (
            snap.val().userid == User.User_Person_ID &&
            snap.val().Status_Pay === "ค้างชำระ"
          ) {
            Check.update({
              Status_Pay: "ชำระแล้ว",
            });
          }
        });
      });
    } else {
      var count = 0;
      const fetdata = firebase.database().ref("Calendar");
      fetdata.on("value", (snap) => {
        const data = snap.val();
        const dataList = [];
        const key=[]
        for (let i in data) {
          if (
            data[i].userid === User.User_Person_ID &&
            data[i].Status_Pay === "ค้างชำระ" &&
            count < state.PackageAmount
          ) {
            dataList.push({ i, ...data[i] });
            key.push({i})
            count++;
          }
        }
        setDataPackage(dataList);
        console.log("key : ", key);
        console.log("DataPackage : ", DataPackage);
        console.log("dataList : ", dataList);
        const dataupdate = firebase.database().ref("Calendar");
        console.log(DataPackage);
        for (let a in key) {
          console.log("A: ", key[a].i)
          dataupdate.child(key[a].i).update({
            Status_Pay: "ชำระแล้ว",
          }); 
        }
      });
    }

    User.UserCountPackage =
      parseInt(User.UserCountPackage) + parseInt(state.PackageAmount);
    const updatePackage = firebase
      .database()
      .ref("User_History")
      .child(User.Userid);
    updatePackage.update({
      CountPackage: User.UserCountPackage,
    });
  };

  const onClearData = () => {
    console.log("ClearData");
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const classes = useStyles();

  function deleteBill(id) {
    const deleteBillRef = firebase.database().ref("Trade_History").child(id);
    deleteBillRef.remove();
    // alert(`hello, ${id}`);
  }
  return (
    <div>
      <div>
        <div className="form-BuyPackage">
          <h1>ขายแพ็คเกจ</h1>
          <div className="input-InputHistory">
            <InputLabel>เลือกแพ็คเกจ</InputLabel>
            <Select
              style={{ float: "left", width: "96%", margin: "10px" }}
              // value={"xxxx"}
            >
              {PackageList.map((Package) => (
                <MenuItem
                  onClick={() =>
                    setState({
                      PackageId: Package.id,
                      PackageName: Package.NamePackage,
                      PackageAmount: Package.PackageAmount,
                      PackagePrice: Package.PackagePrice,
                    }) +
                    console.log("Value1", Package.id) +
                    console.log("Value2", Package.NamePackage)
                  }
                  key={Package.id}
                  value={Package.NamePackage}
                >
                  {Package.NamePackage} / จำนวน {Package.PackageAmount} ครั้ง /
                  ราคา {Package.PackagePrice} บาท
                </MenuItem>
              ))}
            </Select>
            <br></br><br></br><br></br>
            <InputLabel>รูปแบบการจ่าย</InputLabel>
            <Select
              style={{ float: "left", width: "96%", margin: "10px" }}
              value={Type}
              onChange={(e) => setType(e.target.value)}
            >
              <MenuItem key={1} value={"เงินสด"}>
                เงินสด
              </MenuItem>
              <MenuItem key={2} value={"โอนธนาคาร"}>
                โอนธนาคาร
              </MenuItem>
            </Select>
                  <div style={{ width: "100%", margin: "5px" }}>
            <TextField
              className="input-text"
              id="date"
              style={{ width: "23%", margin: "5px" }}
              label="วันที่"
              type="date"
              onChange={(e) => setTimeDate(e.target.value)}
              value={TimeDate}
            />

            <TextField
              className="input-text"
              id="time"
              style={{ width: "22%", margin: "5px" }}
              label="เวลาจ่ายเงิน"
              type="time"
              onChange={(e) => setTime(e.target.value)}
              value={Time}
            />

            <TextField
              className="input-text"
              id="outlined-basic"
              // required
              style={{ width: "50%", margin: "auto" }}
              type="text"
              label="ธนาคาร"
              variant="outlined"
              onChange={(e) => setBankName(e.target.value)}
              value={BankName}
            />
            </div>
            <InputLabel>No. : ชื่อเคส - (ชื่อคนไข้) : (เหลือจำนวนการจอง)</InputLabel>
            <Select
              style={{ float: "left", width: "96%", margin: "10px" }}
              // value={"xxxx"}
            >
              {UserList.map((User) => (
                <MenuItem
                  onClick={() =>
                    setUser({
                      // UserAutoNumber: User.AutoNumber,
                      Userid: User.id,
                      UserName: User.Name,
                      User_Person_ID: User.Person_ID,
                      UserCountPackage: User.CountPackage,
                      Usertext: User.text,
                    })
                  }
                  key={User.id}
                  value={User.Name}
                >
                  <a> {User.AutoNumber} : </a>
                  <a style={{ color: "#0000FF" }}>
                    {User.text == ""
                      ? "เคสไม่ได้ระบุ : "
                      : "" + User.text}
                  </a>
                  -<a> ({User.Name}) </a> : 
                   {User.CountPackage<0?<a style={{ color: "#FF0000" }}>({User.CountPackage})</a>:<a>({User.CountPackage})</a>}
                </MenuItem>
              ))}
            </Select>
          </div>

          <br></br>
          <br></br>

          <div className="input-BuyPackage">
            <div className="button-BuyPackage">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px", marginLeft: "37%" }}
                onClick={onSaveData}
              >
                บันทึก
              </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px", marginLeft: "10px" }}
                onClick={onClearData}
              >
                ล้างข้อมูล
              </Button>
              <br></br>
            </div>
          </div>

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>เลขที่บิล</TableCell>
                  <TableCell align="right">วันที่ชำระ</TableCell>
                  <TableCell align="right">ชื่อเคส</TableCell>
                  <TableCell align="right">รายชื่อคนซื้อแพ็คเกจ</TableCell>
                  <TableCell align="right">ชื่อแพ็คเกจ</TableCell>
                  <TableCell align="right">จำนวน</TableCell>
                  <TableCell align="right">ราคา</TableCell>
                  <TableCell align="right">รูปแบบการจ่าย</TableCell>
                  <TableCell align="center">ดูบิลใบเสร็จ</TableCell>
                  <TableCell align="center">ลบข้อมูลใบเสร็จ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {TableTradeList.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                ).map((TableTrade, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {" "}
                      {TableTrade.bill}{" "}
                    </TableCell>
                    <TableCell
                      align="right"
                      onClick={() =>
                        console.log("Test", "xxxxxxxxxxxxxxxxxxxx")
                      }
                    >
                      {TableTrade.TimeDate} : {TableTrade.Time} น.
                    </TableCell>
                    <TableCell align="right">{TableTrade.text}</TableCell>
                    <TableCell align="right">{TableTrade.UserName}</TableCell>
                    <TableCell align="right">
                      {TableTrade.PackageName}
                    </TableCell>
                    <TableCell align="right">
                      {TableTrade.PackageAmount} ครั้ง
                    </TableCell>
                    <TableCell align="right">
                      {TableTrade.PackagePrice} บาท
                    </TableCell>
                    <TableCell align="right">{TableTrade.Type}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained" //secondary
                        color="primary"
                        onClick={() => (
                          setObj(TableTrade),
                          history.push({
                            pathname: "/ViewBill",
                            data: TableTrade,
                          })
                        )}
                      >
                        ดูข้อมูล
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained" //secondary
                        color="secondary"
                        onClick={() => deleteBill(TableTrade.id)}
                      >
                        ลบข้อมูล
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, 100]}
              component="div"
              count={stateId.rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </TableContainer>

          {/* <br></br>
        <h4>เลขที่ใบเสร็จ : {TradeList+1}</h4> 
        <h4>Id : {state.PackageId}</h4> 
        <h4>ชื่อแพ็คเกจ : {state.PackageName} / จำนวน : {state.PackageAmount} ครั้ง / ราคา : {state.PackagePrice} บาท</h4>
        <h4>รูปแบบการจ่าย : {Type}</h4>
        <h4>วันที่ : {TimeDate}</h4>
        <h4>ธนาคาร : {BankName}</h4>
        <h4>เวลาจ่ายเงิน : {Time}</h4>
        <h4>รายชื่อคนไข้ : {User.UserName}</h4>
        <h4>เลขบัตรประชาชน : {User.User_Person_ID}+{User.UserCountPackage}</h4> */}
        </div>
      </div>
    </div>
  );
}
