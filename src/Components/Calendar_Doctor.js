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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import FirstReport from "../Components/Patient_report_Primary_Case";
import DayReport from "../Components/Day_Report";
import MonthReport from "../Components/Month_Report";

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
};
export default class Calendar_Doctor extends Component {
  constructor(props) {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    month = month < 10 ? "0" + month : (month = month);
    var DateToday = year + "-" + month + "-" + date;
    super(props);
    this.state = {
      days: 7,
      scale: "Day",
      resources: [],
      DataStatus: [],
      dataList: [],
      timeHeaders: [{ groupBy: "Month" }, { groupBy: "Day", format: "d" }],
      cellWidthSpec: "Auto",
      cellWidth: 50,
      DateTimeEnd: "",
      DateTimeStart: "",
      text: "",
      Doctor: "",
      Status_Pay: "",
      zone: "",
      ID: "",
      ID_PK: "1",
      ID_PK_CheckOut: "",
      Doctor_ID: "",
      events: [],
      check: false,
      open: false,
      ID_Checkin: "",
      CalendarList: [],
      IndexPage: true,
      first_reportPage: false,
      day_reportPage: false,
      month_reportPage: false,
      DoctorName: "",
      onEventClick: (args) => {
        console.log("Click " + args.e.data.start);
        console.log(
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx ",
          "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        );
        console.log(args.e.data.zone)
        this.setState({
          barColor: args.e.data.barColor,
          Doctor: args.e.data.doctor,
          Doctor_ID: args.e.data.doctor_ID,
          ID: args.e.data.id,
          DateTimeStart: args.e.data.start,
          DateTimeEnd: args.e.data.end,
          text: args.e.data.text,
          user: args.e.data.user,
          userid: args.e.data.userid,
          Status_Pay: args.e.data.Status_Pay,
          zone: args.e.data.zone,
        });

        console.log("args", args);

        const datapull = firebase.database().ref("Calendar");
        datapull.on("value", (snapshort) => {
          const data = snapshort.val();
          for (let i in data) {
            if (data[i].ids == this.state.ID) {
              this.setState({ ID_Checkin: i });
            }
          }
          console.log("ID_Checkin", this.state.ID_Checkin);
        });

        const datapull2 = firebase.database().ref("User_History");
        datapull2.on("value", (snapshort) => {
          const data = snapshort.val();
          for (let i in data) {
            if (data[i].Person_ID == this.state.userid) {
              this.setState({ UserHistory: data[i] });
              this.setState({ CountEnd: data[i].CountEnd });
            }
          }
        });
      },
    };
  }
  async componentDidMount() {
    const DoctorRef = firebase.database().ref("Doctor_History");
    DoctorRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        if (data[i].IDCard == localStorage.getItem("Username_Doctor")) {
          dataList.push({ i, ...data[i] });
          this.setState({
            DoctorName: data[i].Name,
          });
        }
      }
    });

    const dataPull = await firebase.database().ref("Calendar");
    await dataPull.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        console.log("data[i].resource: " + data[i].resource);
        if (data[i].resource == localStorage.getItem("Username_Doctor")) {
          dataList.push({ i, ...data[i] });
        } else {
          console.log("Fail");
        }
      }

      this.setState({
        dataList: [...dataList],
      });

      console.log("dataList", dataList);

      const dataStatus = [];
      for (let i in this.state.dataList) {
        if (this.state.dataList[i].status == 1) {
          dataStatus.push({ i, ...this.state.dataList[i] });
        }
      }
      this.setState({
        DataStatus: dataStatus,
      });
      const dataResource = [];
      var year = new Date().getFullYear();
      var month = new Date().getMonth() + 1;
      month = month < 10 ? "0" + month : (month = month);
      var day = new Date().getDay() - 1;
      day = day < 10 ? "0" + day : (day = day);
      var date = year + "-" + month + "-" + day;

      console.log("date", date);

      var currentdate = new Date();
      var datetime =
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      console.log("datetime", datetime);

      for (let id in dataList) {
        console.log();
        if (dataList[id].start.value.toString().substring(0, 10) >= date) {
          dataResource.push({
            id,
            // ...{ name: dataList[id].user, id: dataList[id].resource_query }, //แบบ User
            // ...{ name: parseInt(id)+1, id: dataList[id].resource_query }, //แบบตัวเลข
            ...{
              name: dataList[id].start.value.toString().substring(0, 10),
              id: dataList[id].resource_query,
            }, //แบบวันที่
          });
        }
      }
      this.setState({
        resources: dataResource,
      });
      const EventAdd = [];
      for (let i in dataList) {
        EventAdd.push({
          i,
          ...{
            start: dataList[i].start.value,
            end: dataList[i].end.value,
            id: dataList[i].ids,
            text:
              dataList[i].text +
              " เริ่ม: " +
              dataList[i].start.value.toString().substring(11) +
              " น.",
            resource: dataList[i].resource_query,
            doctor: dataList[i].resource,
            barColor: dataList[i].barColor,
            user: dataList[i].user,
            doctor_ID: dataList[i].resource,
            userid: dataList[i].userid,
            zone: dataList[i].zone,
            Status_Pay: dataList[i].Status_Pay,
          },
        });
      }
      this.setState({
        events: EventAdd,
      });
    });

    console.log("events " + this.state.events);
  }
  render() {
    var { ...config } = this.state;

    const Checkin = () => {
      if (this.state.DateTimeStart == "") {
        alert("กรุณาคลิกเลือกคนไข้");
      } else {
        if (window.confirm("ต้องการ CHECKIN ใช่หรือไม่") == true) {
          var currentdate = new Date();
          var datetime =
            (currentdate.getDate() < 10
              ? "0" + currentdate.getDate()
              : currentdate.getDate()) +
            "/" +
            (currentdate.getMonth() + 1 < 10
              ? "0" + (currentdate.getMonth() + 1)
              : currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            "-" +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();

          console.log("ID_CheckinในCheckin", this.state.ID_Checkin);

          const Checkinout = firebase.database().ref("CheckIn_Out_History");
          const datacheckinout = {
            idCalendar: this.state.ID_Checkin,
            checkin: datetime,
            checkout: 0,
            id: this.state.ID,
            resource: this.state.Doctor_ID,
          };
          Checkinout.push(datacheckinout);

          const datapull = firebase.database().ref("Calendar");
          datapull.child(this.state.ID_Checkin).update({
            status: 1,
            barColor: "#00FF00",
          });
          window.location.reload();
        } else {
        }
      }
    };

    const CancelCase = () => {
      if (this.state.DateTimeStart == "") {
        alert("กรุณาคลิกเลือกคนไข้");
      } else {
        // alert("ยกเลิก Case คนไข้คนนี้ "+this.state.ID_Checkin);
        //ส่วน ลบ Calendar
        if (window.confirm("ต้องการ ยกเลิก เคสนี้ใช่หรือไม่") == true) {
          const CalendarRef = firebase
            .database()
            .ref("Calendar")
            .child(this.state.ID_Checkin);
          CalendarRef.remove();

          //ฟังก์ชั่น คำนวณหาวันและเวลาปัจจุบัน
          var currentdate = new Date();
          console.log(
            "currentdate.getMonth()+1",
            currentdate.getMonth() + 1 <= 10
              ? "0" + (currentdate.getMonth() + 1)
              : currentdate.getMonth() + 1
          );
          var cancelDate =
            (currentdate.getDate() < 10
              ? "0" + currentdate.getDate()
              : currentdate.getDate()) +
            "/" +
            (currentdate.getMonth() + 1 < 10
              ? "0" + (currentdate.getMonth() + 1)
              : currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear();

          var currentdate = new Date();
          var cancelTime =
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds();

          // <= 10? ("0"+(currentdate.getMonth()+1)):(currentdate.getMonth()+1)
          console.log("barColor", this.state.barColor);
          console.log("end", this.state.DateTimeEnd);
          console.log("id", this.state.ID);
          console.log("start", this.state.DateTimeStart);
          console.log("text", this.state.text);
          console.log("user", this.state.user);
          console.log("userid", this.state.userid);
          console.log("Doctorid", this.state.Doctor_ID);
          console.log("cancelDate", cancelDate);
          console.log("cancelTime", cancelTime);

          console.log("ID_Checkin", this.state.ID_Checkin);
          //ส่วน เพิ่มในCancelCase
          console.log(this.state.zone);
          const CancelCaseRef = firebase.database().ref("CancelCase");
          const CancelCase = {
            barColor: this.state.barColor,
            end: this.state.DateTimeEnd,
            idCalendar: this.state.ID,
            // resource: this.state.,
            // resource_query: this.state.,
            start: this.state.DateTimeStart,
            // status: this.state.,
            text: this.state.text,
            user: this.state.user,
            userid: this.state.userid,
            cancelDate: cancelDate,
            cancelTime: cancelTime,
            doctor: this.state.DoctorName,
            doctorid: localStorage.getItem("Username_Doctor"),
            Status_Pay: this.state.Status_Pay,
            zone: this.state.zone,
          };
          CancelCaseRef.push(CancelCase);
        } else {
        }
      }
    };

    const first_report = () => {
      this.setState({
        IndexPage: false,
        first_reportPage: true,
        day_reportPage: false,
        month_reportPage: false,
      });
      // alert("รายงานแรกรับ");
    };
    const day_report = () => {
      this.setState({
        IndexPage: false,
        first_reportPage: false,
        day_reportPage: true,
        month_reportPage: false,
      });
      // alert("รายงานรายวัน");
    };
    const month_report = () => {
      this.setState({
        IndexPage: false,
        first_reportPage: false,
        day_reportPage: false,
        month_reportPage: true,
      });
      // alert("รายงานรายเดือน");
    };

    const onCheckOut = async () => {
      this.setState({
        check: true,
      });
      const datapull = await firebase.database().ref("Calendar");
      await datapull.on("value", (snapshort) => {
        const data = snapshort.val();
        for (let i in data) {
          if (data[i].id == this.state.ID && this.state.check) {
            this.setState({
              ID_PK_CheckOut: i,
            });
          }
        }
      });

      await datapull.child(this.state.ID_PK_CheckOut).update({
        status: 2,
        barColor: "#0033F1",
      });
      var copyData = 0;
      datapull.child(this.state.ID_PK_CheckOut).on("value", (snap) => {
        copyData = snap.val();
      });
      console.log(copyData.resource);
      console.log("CopyData", copyData);
      const calendar_History = firebase.database().ref("Calendar_History");
      const PasteData = {
        start: copyData.start.value,
        end: copyData.start.value,
        text: copyData.text,
        user: copyData.user,
        userid: copyData.userid,
        barColor: copyData.barColor,
        resource: copyData.resource,
        resource_query: copyData.resource + copyData.start.value,
        status: copyData.status,
        id: copyData.id,
        zone: copyData.zone,
        Status_PayPayment: copyData.Status_Pay,
      };
      calendar_History.push(PasteData);
      datapull.child(this.state.ID_PK_CheckOut).remove();
    };
    console.log("this.state.DataStatus", this.state.DataStatus);

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

    return (
      <div>
        {this.state.IndexPage ? (
          <div style={{ float: "left", width: "30%" }}>
            <TableContainer style={{ marginTop: "20px" }}>
              <Table style={{ width: "450px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">รายการ</TableCell>
                    <TableCell align="center">รายละเอียด</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      ชื่อเคส :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      {this.state.text}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      คนไข้ผู้รักษา :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <a
                        href="#"
                        style={{ color: "#6666FF" }}
                        onClick={handleOpen}
                      >
                        {this.state.user}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      วันที่เริ่มนัด :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <a style={{ color: "#66CC66" }}>
                        {this.state.DateTimeStart.toString().substring(0, 10)}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      เวลาเริ่มนัด :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <a style={{ color: "#66CC66" }}>
                        {this.state.DateTimeStart.toString().substring(11)}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      วันที่สิ้นสุดนัด :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <a style={{ color: "#FF6666" }}>
                        {this.state.DateTimeEnd.toString().substring(0, 10)}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      เวลาสิ้นสุดนัด :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      <a style={{ color: "#FF6666" }}>
                        {this.state.DateTimeEnd.toString().substring(11)}
                      </a>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="center" scope="row">
                      จำนวนครั้งการรักษา :{" "}
                    </TableCell>
                    <TableCell align="left" scope="row">
                      {this.state.CountEnd}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <div style={{ width: "100%" }}>
              <Button
                style={{ width: "40%", margin: "20px" }}
                variant="contained"
                color="secondary"
                onClick={CancelCase}
              >
                ยกเลิกการกายภาพ
              </Button>

              <Button
                style={{ width: "40%", margin: "20px" }}
                variant="contained"
                color="primary"
                onClick={Checkin}
              >
                Checkin
              </Button>
            </div>
          </div>
        ) : null}

        {this.state.IndexPage ? (
          <div style={{ float: "left", width: "70%" }}>
            <TableContainer style={{ marginTop: "20px" }}>
              <Table style={{ width: "1100px" }}>
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ชื่อเคส</TableCell>
                    <TableCell align="center">ชื่อผู้ป่วย</TableCell>
                    <TableCell align="center">เวลาเริ่ม</TableCell>
                    <TableCell align="center">เวลาออก</TableCell>
                    <TableCell align="center">สถานะ</TableCell>
                    <TableCell align="center">รายงานแรกรับ</TableCell>
                    <TableCell align="center">รายงานรายวัน</TableCell>
                    <TableCell align="center">รายงานรายเดือน</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {this.state.DataStatus.map((value, index) => (
                    <TableRow>
                      <TableCell align="center" scope="row">
                        {value.text}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {value.user}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {value.start.value}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        {value.end.value}
                      </TableCell>
                      <TableCell align="center" scope="row">
                        <a style={{ color: "#99FF99" }}>กำลังเช็คอิน</a>
                      </TableCell>
                      <TableCell align="center" scope="row">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => (
                            this.setState({ first_report: value }),
                            first_report()
                          )}
                          style={{ width: "100px" }}
                        >
                          แรกรับ
                        </Button>
                      </TableCell>
                      <TableCell align="center" scope="row">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => (
                            this.setState({ day_report: value }), day_report()
                          )}
                          style={{ width: "100px" }}
                        >
                          รายวัน
                        </Button>
                      </TableCell>
                      <TableCell align="center" scope="row">
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => (
                            this.setState({ month_report: value }),
                            month_report()
                          )}
                          style={{ width: "100px" }}
                        >
                          รายเดือน
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ) : null}

        <div style={{ clear: "both" }}></div>
        {this.state.IndexPage ? (
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
              />{" "}
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
        ) : null}

        {this.state.IndexPage ? (
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
                    {/* {console.log("UserHistory",this.state.UserHistory)} */}
                    <p>
                      ชื่อเคส :{" "}
                      {this.state.open ? this.state.UserHistory.text : null}
                    </p>
                    <p>
                      ชื่อคนไข้ :{" "}
                      {this.state.open ? this.state.UserHistory.Name : null}
                    </p>
                    <p>
                      เพศ :{" "}
                      {this.state.open ? this.state.UserHistory.Gender : null}
                    </p>
                    <p>
                      อายุ :{" "}
                      {this.state.open
                        ? this.state.UserHistory.Age + " ปี"
                        : null}
                    </p>
                    <p>
                      วันเกิด :{" "}
                      {this.state.open ? this.state.UserHistory.Birthday : null}
                    </p>
                    <p>
                      เบอร์โทรศัพท์ :{" "}
                      {this.state.open ? this.state.UserHistory.Tel : null}
                    </p>
                    <p>
                      ที่อยู่ :{" "}
                      {this.state.open ? this.state.UserHistory.Address : null}+
                      {this.state.open
                        ? this.state.UserHistory.Curren_Address
                        : null}
                    </p>
                    <p>
                      จุดสังเกต :{" "}
                      {this.state.open ? this.state.UserHistory.Landmark : null}
                    </p>
                    <p>
                      ที่จอดรถ :{" "}
                      {this.state.open
                        ? this.state.UserHistory.PositionCar
                        : null}
                    </p>
                    <p>
                      อาการปัจจุบัน :{" "}
                      {this.state.open
                        ? this.state.UserHistory.Current_symptoms
                        : null}
                    </p>
                    <p>
                      วันที่มีอาการ :{" "}
                      {this.state.open ? this.state.UserHistory.Symptom : null}
                    </p>
                    <p>
                      ผู้ที่ติดต่อ :{" "}
                      {this.state.open
                        ? this.state.UserHistory.NameSurname_parent
                        : null}
                    </p>
                    <p>
                      ความสัมพันธ์ :{" "}
                      {this.state.open
                        ? this.state.UserHistory.RelationShip
                        : null}
                    </p>
                    <p>
                      โรงพยาบาลที่เข้าการรักษา :{" "}
                      {this.state.open
                        ? this.state.UserHistory.Hospitalized
                        : null}
                    </p>
                    <p>
                      คำวินิจฉัย :{" "}
                      {this.state.open
                        ? this.state.UserHistory.Diagnosis
                        : null}
                    </p>
                    <p>
                      จำนวนครั้งการรักษา :{" "}
                      {this.state.open ? this.state.UserHistory.CountEnd : null}
                    </p>

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
        ) : null}

        {this.state.first_reportPage ? (
          <FirstReport CalendarId={this.state.first_report} />
        ) : null}
        {this.state.day_reportPage ? (
          <DayReport CalendarId={this.state.day_report} />
        ) : null}
        {this.state.month_reportPage ? (
          <MonthReport CalendarId={this.state.month_report} />
        ) : null}
      </div>
    );
  }
}
