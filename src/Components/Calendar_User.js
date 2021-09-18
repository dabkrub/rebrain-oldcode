import React, { Component } from "react";
import {
  DayPilot,
  DayPilotCalendar,
  DayPilotNavigator,
  DayPilotScheduler,
} from "daypilot-pro-react";
import "../css/CalendarStyles.css";
import firebase from "../Firebase/firebase";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

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
  clear: {
    clear: "both"
  },
};
export default class Calendar_User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      days: 30,
      resources: [],
      scale: "Day",
      timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "dd" }],
      cellWidthSpec: "Auto",
      cellWidth: 50,
      barColor: "#FF0000",
      events: [],
      DateTimeEnd: "",
      DateTimeStart: "",
      text: "",
      Doctor: "",
      ID: "",
      user: "",
      detail: "",
      onEventClick: (args) => {
        // console.log("Click " + args.e.data.start);
        this.setState({
          DateTimeStart: args.e.data.start,
          DateTimeEnd: args.e.data.end,
          text: args.e.data.text,
          Doctor: args.e.data.Doctor,
          ID: args.e.data.id,
          user: args.e.data.user,
          detail: args.e.data.detail,
        });
        console.log("args", args);
        console.log("argsId", args.e.data.id);
        console.log("setStateuser", args.e.data.Doctor);
      },

    };
  }



  componentDidMount() {

    console.log(localStorage.getItem("Username_User"));
    const DataPull = firebase.database().ref("Calendar");
    DataPull.on("value", (snapshort) => {
      const data = snapshort.val();
      const DataList = [];
      for (let i in data) {
        if (data[i].userid == localStorage.getItem("Username_User")) {
          DataList.push({ i, ...data[i] });
        }
      }
      //  if(DataList.id == this.state.ID){
      //     console.log("inIdIf","xxxxxxxxxxxxxxxx")
      //   }

      const datatest = [];
      for (let id in DataList) {
        datatest.push({
          id,
          ...{
            name: DataList[id].text,
            id:
              DataList[id].user +
              DataList[id].start
                .value /*DataList[id].userid+DataList[id].start */,
          },
        });
      }
      console.log("datatest", datatest);
      this.setState({
        resources: datatest,
      });
      const EventAdd = [];
      for (let i in DataList) {
        EventAdd.push({
          i,
          ...{
            start: DataList[i].start.value,
            end: DataList[i].end.value,
            id: DataList[i].ids,
            text: DataList[i].text,
            resource: DataList[i].user + DataList[i].start.value,
            barColor: DataList[i].barColor,
            Doctor: DataList[i].resource,
            detail: DataList[i].detail,
          },
        });
      }
      this.setState({
        events: EventAdd,
      });
    });

  }
  render() {
    // console.log("stateDoc", this.state.Doctor);
    const DataDoctor = firebase.database().ref("Doctor_History");
    DataDoctor.on("value", (snapshort) => {
      const dataDoctor = snapshort.val();
      const DoctorList = [];
      for (let i in dataDoctor) {
        DoctorList.push({ i, ...dataDoctor[i] });
        if (this.state.Doctor == dataDoctor[i].IDCard) {
          // alert("ตรงแล้ว"+dataDoctor[i].Name)
          this.setState({
            Doctor: dataDoctor[i].Name,
            NickName: dataDoctor[i].NickName,
            Phone: dataDoctor[i].Phone,
            Email: dataDoctor[i].Email,
            Expertise: dataDoctor[i].Expertise,
            EducationHistory: dataDoctor[i].EducationHistory,
            WorkHistory: dataDoctor[i].WorkHistory,
          });
        }
      }
      console.log("DoctorList", DoctorList)
    })

    const handleOpen = () => {
      if (this.state.DateTimeStart == "") {
        alert("กรุณาคลิกเลือกหมอ");
      } else {
        this.setState({
          open: true,
        });
      }
    };
    const handleClose = () => {
      this.setState({
        open: false,
      });
    };

    const { ...config } = this.state;
    return (
      <div>

        <div style={{ float: "left", width: "100%" }}>
          <h1>ข้อมูลการนัดหมาย</h1>
          <TableContainer style={{ marginTop: "20px" }}>
            <Table style={{ width: "100%" }}>
              <TableHead>
                <TableRow>
                  <TableCell align="center">ชื่อเคส</TableCell>
                  <TableCell align="center">วันที่เริ่มนัด</TableCell>
                  <TableCell align="center">เวลาเริ่มนัด</TableCell>
                  <TableCell align="center">วันที่สิ้นสุดนัด</TableCell>
                  <TableCell align="center">เวลาสิ้นสุดนัด</TableCell>
                  {/* <TableCell align="center">หมอผู้รักษา</TableCell> */}
                  <TableCell align="center">รายละเอียด</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell align="center">{this.state.text}</TableCell>
                  <TableCell align="center"><a style={{ color:"#66CC66" }}>{this.state.DateTimeStart.toString().substring(0, 10)}</a></TableCell>
                  <TableCell align="center"><a style={{ color:"#66CC66" }}>{this.state.DateTimeStart.toString().substring(11)}</a></TableCell>
                  <TableCell align="center"><a style={{ color:"#FF6666" }}>{this.state.DateTimeEnd.toString().substring(0, 10)}</a></TableCell>
                  <TableCell align="center"><a style={{ color:"#FF6666" }}>{this.state.DateTimeEnd.toString().substring(11)}</a></TableCell>
                  {/* <TableCell
                    align="center"
                  ><a href="#" style={{ color:"#6666FF"}} onClick={handleOpen}>{this.state.Doctor}</a></TableCell> */}
                  {/* () => console.log("Value2","รายละเอียดชื่อหมอ "+this.state.Doctor) */}
                  <TableCell align="center">{this.state.detail}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <br></br>
          <hr></hr>
          <h1>ตารางนัดหมาย</h1>
        </div>

        <div style={styles.clear}></div>
        <div style={styles.wrap}>
          <div style={styles.left}>
            <DayPilotNavigator
              selectMode={"day"}
              showMonths={2} // 2
              skipMonths={1}
              onTimeRangeSelected={(args) => {
                this.setState({
                  startDate: args.day,
                });
              }}
            />
          </div>
          <div style={styles.main}>
            <DayPilotScheduler
              {...config}
              ref={(component) => {
                this.scheduler = component && component.control;
              }}
            />
          </div>
        </div>


        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className="modal"
          open={this.state.open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <div align="center" style={{ marginTop: "5%" }}>
            <Fade in={this.state.open}>
              <div className="paper">
                <h2 id="transition-modal-title">รายละเอียดเพิ่มเติมของหมอ</h2>
                <div
                  id="transition-modal-description"
                  style={{ textAlign: "start", marginLeft: "20px" }}
                >
                  <p>หมอชื่อ : {this.state.Doctor}</p>
                  <p>ชื่อเล่น : {this.state.NickName}</p>
                  <p>เบอร์โทรศัพท์ : {this.state.Phone}</p>
                  <p>อีเมล : {this.state.Email}</p>
                  <p>ความชำนาญในการรักษา : {this.state.Expertise}</p>
                  <p>ประวัติการศึกษา : {this.state.EducationHistory}</p>
                  <p>ประวัติการทำงาน : {this.state.WorkHistory}</p>

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
    );
  }
}
