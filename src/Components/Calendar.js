import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
  DayPilotScheduler,
  DayPilotMonth,
} from "daypilot-pro-react";
import "../css/CalendarStyles.css";
import firebase from "../Firebase/firebase";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Autocomplete from '@material-ui/lab/Autocomplete';
const styles = {
  wrap: {
    display: "flex",
    color: "red",
  },
  left: {
    marginRight: "0px",
  },
  main: {
    flexGrow: "1",
  },
  root: {
    width: "100%",
    maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  listSection: {
    backgroundColor: "inherit",
  },
  ul: {
    backgroundColor: "inherit",
    padding: 0,
  },
};
const options = ['Option 1', 'Option 2'];
class Calendar extends Component {
  constructor(props) {
    if (localStorage.getItem("isLogin") == 1) {
      console.log(localStorage.getItem("isLogin") + "Sucess");
    } else {
      console.log(localStorage.getItem("isLogin") + "Fail");
      props.history.push("/");
    }
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    //ตัวแปร วัน/เดือน/ปี // console.log("newDate",date+"-"+month+"-"+year);

    // if(month < 10){month = "0"+month;}else{month = month}
    date = date < 10 ? "0" + date : (date = date);
    month = month < 10 ? "0" + month : (month = month); //short if
    var DateToday = year + "-" + month + "-" + date;
    // console.log("DateToday", DateToday);
    super(props);

    this.state = {
      DateToday: year + "-" + month + "-" + date,
      days: 1,
      scale: "CellDuration",
      cellDuration: 30,
      resources: [],
      timeHeaders: [
        { groupBy: "Day", format: "dd/MM/yyyy" },
        { groupBy: "Hour", format: "hh:mm" },
      ],
      cellWidthSpec: "Auto",
      cellWidth: 50,
      userid: "",
      NameSelect: null,
      eventDeleteHandling: "Update",
      UserHistory: [],
      names: [],
      barColor: "#FF0000",
      text: "",
      detail: "",
      events: [],
      CaseName: [],
      Status_queue: "New",
      CountEnd: "",
      CountPackage: "",
      ShowButton: "Day",
      editOpen: false,
      IdStatusEdit: "",
      NameStatusEdit: "",
      value:[],
      inputValue:"",
      //Add to firebase
      onTimeRangeSelected: (args) => {
        console.log("args",args)
        let dp = this.scheduler;
        var userid = this.state.userid;
        var name = this.state.NameSelect;
        var textCase = this.state.textCase;
        var detail = this.state.detail;
        var barColor = this.state.barColor;
        var Status_queue = this.state.Status_queue;
        var zone = this.state.zone;
        if (Status_queue == "New") { barColor = "#FF00A4"; }
        if (Status_queue == "Draft") { barColor = "#FFFF00"; }
        if (Status_queue == "Confirm") { barColor = "#FFAA00"; }
        var CountEnd = "";
        var CountPackage = "";
        var Status_Pay = "";
        DayPilot.Modal.confirm("ชื่อเคส(ชื่อคนไข้) : " + this.state.textCase + "(" + this.state.NameSelect + ")").then(
          function (modal) {
            dp.clearSelection();
            if (!modal.result) {
              return;
            }
            if (name !== null) {
              const UserRef = firebase.database().ref("User_History");
              UserRef.on("value", (snapshort) => {
                const data = snapshort.val();
                for (let i in data) {
                  if (data[i].Person_ID == userid) {
                    CountEnd = data[i].CountEnd + 1;
                    if (data[i].CountPackage < 0) {
                      Status_Pay = "ค้างชำระ";
                    } else {
                      Status_Pay = "ชำระแล้ว";
                    }
                    CountPackage = data[i].CountPackage - 1;
                  }
                }
              });

              const fireAddRef = firebase.database().ref("Calendar");
              const fireAdd = {
                ids: DayPilot.guid(),
                start: args.start,
                end: args.end,
                text: textCase,
                detail: detail,
                user: name,
                userid: userid,
                barColor: barColor,
                zone: zone,
                resource: args.resource,
                resource_query: args.resource + args.start,
                status: 0,
                status_queue: Status_queue,
                Status_Pay: Status_Pay,
              };
              fireAddRef.push(fireAdd);
              // Update จำนวนการรักษา
              const DataUpdate2 = firebase.database().ref("User_History");
              DataUpdate2.orderByKey().on("child_added", (snapshort) => {
                const Check = firebase
                  .database()
                  .ref("User_History")
                  .child(snapshort.key);
                Check.on("value", (snap) => {
                  if (snap.val().Person_ID == userid) {
                    Check.update({
                      CountEnd: CountEnd,
                      CountPackage: CountPackage,
                    });
                  }
                });
              });
            }
          }
        );
        //fetch ข้อมูลจำนวนการรักษามาจาก User_History

        this.setState({ text: "" });
        this.setState({ detail: "" });
      },
      onEventResized: (args) => {
        console.log(
          "Event resized: ",
          args.e.data.id,
          args.newStart,
          args.newEnd
        );
        this.scheduler.message("Event resized: " + args.e.data.text);
      },
      //แบบคลิก ------------------------------------
      onEventClick: (args) => {

        console.log("argsonEventClick", args);
        // DayPilot.Modal.confirm("รายชื่อคนไข้ : " + args.e.data.text);

        this.setState({
          editOpen: true,
          IdStatusEdit: args.e.data.ids,
          NameStatusEdit: args.e.data.text,
        });
        // alert(args.e.data.ids)
        // var editOpen = this.state.editOpen
        // alert(editOpen)

      },
      onEventResize: (args) => {
        var check = true;
        const todoRef = firebase.database().ref("Calendar");
        todoRef.on("value", (snapshot) => {
          const todos = snapshot.val();
          const todoList = [];
          for (let id in todos) {
            todoList.push({ id, ...todos[id] });
            if (todos[id].ids == args.e.data.id && check == true) {
              const fireupdateStartRef = firebase
                .database()
                .ref(`Calendar/${id}/start`); //.child(id)
              fireupdateStartRef.update({
                value: args.newStart.value,
              });
              const fireupdateEndRef = firebase
                .database()
                .ref(`Calendar/${id}/end`); //.child(id)
              fireupdateEndRef.update({
                value: args.newEnd.value,
              });
              check = false;
            }
          }
        });
      },
      onEventMove: (args) => {
        var check = true;
        const todoRef = firebase.database().ref("Calendar");
        todoRef.on("value", (snapshot) => {
          const todos = snapshot.val();
          const todoList = [];
          for (let id in todos) {
            todoList.push({ id, ...todos[id] });
            if (todos[id].ids == args.e.data.id && check == true) {
              const fireupdateStartRef = firebase
                .database()
                .ref(`Calendar/${id}/start`); //.child(id)
              fireupdateStartRef.update({
                value: args.newStart.value,
              });
              const fireupdateEndRef = firebase
                .database()
                .ref(`Calendar/${id}/end`); //.child(id)
              fireupdateEndRef.update({
                value: args.newEnd.value,
              });
              const fireupdateresourceRef = firebase
                .database()
                .ref(`Calendar/${id}`); //.child(id)
              fireupdateresourceRef.update({
                resource: args.newResource,
              });
              check = false;
            }
          }
        });
      },
      onEventDeleted: (args) => {
        const DeleteRef = firebase.database().ref("Calendar");
        DeleteRef.on("value", (snapshot) => {
          const todos = snapshot.val();
          const todoList = [];
          for (let id in todos) {
            todoList.push({ id, ...todos[id] });
            if (args.e.data.id == todos[id].ids) {
              DeleteRef.child(id).remove();
            }
          }
        });
      },
    };
    this.data = {
      events: [...this.state.events],
    };
  }
  async componentDidMount() {
    const User_HistoryRef = firebase.database().ref("User_History");
    User_HistoryRef.on("value", (snapshot) => {
      const UserHistory = snapshot.val();
      const UserHistoryList = [];
      const UserNameHistoryList = [];
      for (let id in UserHistory) {
        UserHistoryList.push({ id, ...UserHistory[id] });
        UserNameHistoryList.push(UserHistory[id].Name);
      }
      console.log("UserHistory1", UserHistoryList);

       


      this.setState({
        UserHistory: UserHistoryList,
        names: UserHistoryList,
        userName: UserNameHistoryList,
      });

      console.log("names", this.state.names);
      console.log("UserHistoryListstate", this.state.UserHistory);
    });

    const DoctorData = await firebase.database().ref("Doctor_History");
    await DoctorData.on("value", (snapshot) => {
      const data = snapshot.val();
      const dataList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      const datatest = [];
      for (let id in dataList) {
        datatest.push({
          id,
          ...{
            // eventHeight: 20,
            marginTop: 15,
            name: dataList[id].Name,
            id: dataList[id].resource,
            areas: [
              {
                left: 3,
                top: 1,
                width: 36,
                height: 36,
                image:
                  dataList[id].image == ""
                    ? "https://firebasestorage.googleapis.com/v0/b/doctorproject3310.appspot.com/o/images%2F1509970156166?alt=media&token=e1faf5f4-5c51-4afe-9c3b-9bcab6476322"
                    : dataList[id].image,
              },
            ],
          },
        });
      }
      console.log("datatest",datatest);
      this.setState({
        resources: datatest,
      });

      const images = [];
      for (let id in dataList) {
        images.push({
          id,
          ...{ name: dataList[id].image },
        });
      }
      this.setState({
        image: images,
      });
      console.log("images", images);
    });
    const todoRef = firebase.database().ref("Calendar");
    todoRef.on("value", (snapshot) => {
      const todos = snapshot.val();
      const todoList = [];
      for (let id in todos) {
        todoList.push({ id, ...todos[id] });
        console.log("id", todos[id]);
      }
      const EventAdd = [];
      for (let i in todoList) {
        EventAdd.push({
          i,
          ...{
            ids: todoList[i].id,
            start: todoList[i].start.value,
            end: todoList[i].end.value,
            id: todoList[i].ids,
            text: todoList[i].user + " " + "(" + todoList[i].status_queue + ")",
            detail: todoList[i].detail,
            resource: todoList[i].resource,
            // nameDoctor: todoList[i].name,
            barColor: todoList[i].barColor,
          },
        });
        console.log("todoList[i]", todoList[i])
      }
      this.setState({
        events: EventAdd,
      });
    });
  }
  render() {
    var { ...config } = this.state;
    var { ...config2 } = this.data;
    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
      PaperProps: {
        style: {
          maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
          width: 250,
        },
      },
    };
    const handleChange = (e) => {
      this.setState({
        NameSelect: e.target.value,
      });
    };
    var currentMonth = new Date().getMonth() + 1;
    var startOfMonth = currentMonth;
    const onChangeMonth = () => {
      this.setState({
        startDate: new DayPilot.Date(this.state.DateToday).firstDayOfMonth(),
        days: new DayPilot.Date(this.state.DateToday).daysInMonth(),
        scale: "Day",
        timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "dd" }],
        ShowButton: "Day",
      });
    };
    const onChangeDay = () => {
      this.setState({
        startDate: new DayPilot.Date(this.state.DateToday),
        days: 1,
        scale: "CellDuration",
        cellDuration: 30,
        timeHeaders: [
          { groupBy: "Day", format: "dd/MM/yyyy" },
          { groupBy: "Hour", format: "hh:mm" },
        ],
        ShowButton: "Month",
      });
    };

    const onClickConfirm = () => {
      const updateConfirm = firebase.database().ref("Calendar").child(this.state.IdStatusEdit);
      updateConfirm.update({
        barColor: "#FFAA00",
        status_queue: "Confirm",
      })
      this.setState({ editOpen: false, });
    };
    const onClickCancle = () => {
      const updateCancle = firebase.database().ref("Calendar").child(this.state.IdStatusEdit);
      updateCancle.update({
        barColor: "#FF0000",
        status_queue: "Cancle",
      })
      this.setState({ editOpen: false, });
    };
    const onClickDelete = () => {
      const DeleteRef = firebase.database().ref("Calendar");
      DeleteRef.child(this.state.IdStatusEdit).remove();
      this.setState({ editOpen: false, });
    };


    return (
      <div>
        {/* {console.log("this.state.userName",this.state.userName)}
        {console.log("this.state.userName-options",options)}
        {console.log("this.state.value",this.state.value)}
        {console.log("this.state.inputValue",this.state.inputValue)}
        <div>onInputChange : {this.state.value !== null ?  this.state.value : null}</div>
      <div>inputValue : {this.state.inputValue}</div>
        <Autocomplete
        value={this.state.value}
        onChange={(event, newValue) => {
          this.setState({ value: newValue, });
        }}
        inputValue={this.state.inputValue}
        onInputChange={(event, newInputValue) => {
          this.setState({ inputValue: newInputValue, });
        }}
        id="controllable-states-demo"
        options={options}
        style={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="ชื่อเคส(ชื่อคนไข้)" variant="outlined" />}
      /> */}
        {/* <h1>Test Local {localStorage.getItem("isLogin")}</h1> */}
        <h1>ตารางเคส</h1>

        <Dialog
          disableBackdropClick
          open={this.state.editOpen}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">ชื่อเคส(สถานะ) : {this.state.NameStatusEdit}</DialogTitle>
          <hr></hr>
          {/* <DialogContent>IdStatusEdit : {this.state.IdStatusEdit}</DialogContent> */}
          <Button onClick={() => onClickConfirm()} style={{ margin: "10px", backgroundColor: "#69d412" }} color="primary" variant="contained">
            Confirm
          </Button>
          <Button onClick={() => onClickCancle()} style={{ margin: "10px", backgroundColor: "#FF5555" }} color="primary" variant="contained">
            Cancle
          </Button>
          <Button onClick={() => onClickDelete()} style={{ margin: "10px", backgroundColor: "#d41212" }} color="primary" variant="contained">
            Delete
          </Button>
          <DialogActions>
            <Button onClick={() => this.setState({ editOpen: false })} color="primary">
              ยกเลิก
            </Button>
          </DialogActions>
        </Dialog>

        <div style={{ float: "left", width: "20%", margin: "10px" }}>
        {/* <InputLabel>ชื่อเคส(ชื่อคนไข้)</InputLabel>
          <input onChange={(e) => this.setState({ NameSelect: e.target.value })} style={{ float: "left", width: "100%", margin: "10px" }} placeholder="ชื่อเคส(ชื่อคนไข้)" list="opts" />
          <datalist value={this.state.NameSelect} id="opts">
          {this.state.names.map((name) => (
              <option
                onClick={() =>
                  // this.setState({ userid: name.Person_ID }) +
                  // console.log("Value1", name.Name) +
                  // console.log("Value2", name.Person_ID) +
                  // this.setState({ textCase: name.text }) +
                  // console.log("Value3", name.CountPackage) +
                  // this.setState({ CountPackage: name.CountPackage })
                  alert("xxx")
                }
                key={name.Person_ID}
                value={name.Name}
              >
                {name.text +
                  " (" +
                  name.Name +
                  ")" +
                  "(" +
                  name.CountPackage +
                  ")"}
              </option>
            ))}
          </datalist> */}
          <InputLabel>ชื่อเคส(ชื่อคนไข้)</InputLabel>
          <Select
            style={{ float: "left", width: "100%", margin: "10px" }}
            value={this.state.NameSelect}
            onChange={(e) => this.setState({ NameSelect: e.target.value })}
          >
            {this.state.names.map((name) => (
              <MenuItem
                onClick={() =>
                  this.setState({ userid: name.Person_ID }) +
                  console.log("Value1", name.Name) +
                  console.log("Value2", name.Person_ID) +
                  this.setState({ textCase: name.text }) +
                  console.log("Value3", name.CountPackage) +
                  this.setState({ CountPackage: name.CountPackage })+
                  console.log("Value4", name.zone)+
                  this.setState({ zone: name.zone })
                }
                key={name.Person_ID}
                value={name.Name}
              >
                {name.text +
                  " (" +
                  name.Name +
                  ")" +
                  "(" +
                  name.CountPackage +
                  ")"}
              </MenuItem>
            ))}
          </Select>
        </div>

        <div style={{ float: "left", width: "10%", margin: "10px" }}>
          <InputLabel>สถานะ</InputLabel>
          <Select
            style={{ float: "left", width: "100%", margin: "10px" }}
            value={this.state.Status_queue}
            onChange={(e) => this.setState({ Status_queue: e.target.value })}
          >
            <MenuItem key={1} value={"New"}>
              New
            </MenuItem>
            <MenuItem key={2} value={"Draft"}>
              Draft
            </MenuItem>
            <MenuItem key={3} value={"Confirm"}>
              Confirm
            </MenuItem>
          </Select>
        </div>
        <div style={{ float: "left", width: "65%", margin: "10px" }}>
          <TextField
            className="input-text"
            id="outlined-basic"
            style={{ float: "left", width: "100%", margin: "10px" }}
            type="text"
            label="รายละเอียดเพิ่มเติม"
            variant="outlined"
            value={this.state.detail}
            onChange={(e) => this.setState({ detail: e.target.value })}
          />
        </div>

        <div style={{ clear: "both" }}></div>

        <div style={styles.wrap}>
          <div style={styles.left}>
            <DayPilotNavigator
              selectMode={"day"}
              showMonths={1} // 2
              skipMonths={1}
              onTimeRangeSelected={(args) => {
                this.setState({
                  startDate: args.day,
                });
              }}
            />{" "}
            {this.state.ShowButton == "Month" ?
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px", marginTop: "10px", height: "50px", marginLeft: "5px" }}
                onClick={onChangeMonth}
              >
                Monthly
              </Button> : null}
            {this.state.ShowButton == "Day" ?
              <Button
                variant="contained"
                color="primary"
                style={{
                  width: "200px",
                  marginTop: "10px",
                  marginLeft: "5px",
                  height: "50px",
                }}
                onClick={onChangeDay}
              >
                Daily
              </Button>
              : null}
          </div>
          <div style={styles.main}>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "99%", marginBottom: "10px", marginLeft: "10px" }}
              onClick={() => (window.location.reload())}>
              ยืนยันการบันทึก
            </Button>
            <DayPilotScheduler
              {...config}
              ref={(component) => {
                this.scheduler = component && component.control;
              }}
            />
            {/* <Button
              variant="contained"
              color="primary"
              style={{ width: "200px" ,marginTop: "10px"}}
              onClick={onChangeMonth}
            >
              มองแบบเดือน
            </Button>
            <Button
              variant="contained"
              color="primary"
              style={{ width: "200px" ,marginTop: "10px" ,marginLeft: "10px"}}
              onClick={onChangeDay}
            >
              มองแบบวัน
            </Button> */}

          </div>
        </div>
      </div>
    );
  }
}

export default Calendar;
