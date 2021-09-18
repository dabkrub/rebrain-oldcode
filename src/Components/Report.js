import React, { useState, useEffect } from "react";
import "../css/Report.css";
import firebase from "../Firebase/firebase";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { shadows } from "@material-ui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "28%",
    width: "330px",
    float: "left",
    padding: "5px",
    margin: "25px",
    height: "150px",
    backgroundColor: "#a7ccff",
  },
  root_cancelcase: {
    maxWidth: "28%",
    width: "330px",
    float: "left",
    padding: "5px",
    margin: "25px",
    height: "150px",
    backgroundColor: "#ffa7a7",
  },
  media: {
    height: "12px",
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  BoxAuto: {
    padding: 0,
    textAlign: "center",
    margin: "auto",
  },
}));

export default function Report() {
  const classes = useStyles();
  const [DataList, setDataList] = useState([]);
  const [CalendarListDay, setCalendarListDay] = useState([]);
  const [CalendarListMonth, setCalendarListMonth] = useState([]);
  const [CalendarListYear, setCalendarListYear] = useState([]);
  const [UserList, setUserList] = useState([]);
  const [User_HistoryList, setUser_HistoryList] = useState([]);
  const [DoctorList, setDoctorList] = useState([]);
  const [CancelCaseList, setCancelCaseList] = useState([]);
  const [CancelCaseTodayList, setCancelCaseTodayList] = useState([]);
  const [CancelCaseMonthList, setCancelCaseMonthList] = useState([]);
  const [CancelCaseYearList, setCancelCaseYearList] = useState([]);
  const [Trade_HistoryList, setTrade_HistoryList] = useState([]);
  const [TradeListDay, setTradeListDay] = useState([]);
  const [TradeListMonth, setTradeListMonth] = useState([]);
  const [TradeListYear, setTradeListYear] = useState([]);
  const [TimeTodayShow, setTimeTodayShow] = useState("");

  const [CalendarNew, setCalendarNew] = useState([]);
  const [UserRest, setUserRest] = useState([]);
  const [UserStop, setUserStop] = useState([]);
  const [CalendarOnProcess, setCalendarOnProcess] = useState([]);
  const [CalendarRemainList, setCalendarRemainList] = useState([]);
  const fetchData = () => {
    const CalendarNewRef = firebase.database().ref("Calendar");
    CalendarNewRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const CalendarNewList = [];
      const CalendarOnProcessList = [];
      for (let i in data) {
        if (data[i].status_queue == "New") {
          CalendarNewList.push({ i, ...data[i] });
        }
        if (data[i].status == "1") {
          CalendarOnProcessList.push({ i, ...data[i] });
        }
        if (data[i].status == "2" && data[i].Status_Pay == "ค้างชำระ") {
          CalendarRemainList.push({ i, ...data[i] });
        }
      }
      setCalendarNew(CalendarNewList);
      setCalendarOnProcess(CalendarOnProcessList);
      setCalendarRemainList(CalendarRemainList);
    });

    const UserRestRef = firebase.database().ref("User_History");
    UserRestRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const UserRestList = [];
      const UserStopList = [];
      for (let i in data) {
        if (data[i].status == "Rest") {
          UserRestList.push({ i, ...data[i] });
        }
        if (data[i].status == "Stop") {
          UserStopList.push({ i, ...data[i] });
        }
      }
      setUserRest(UserRestList);
      setUserStop(UserStopList);
    });

    var currentdate = new Date();
    var CalendarDate =
      (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate()) +
      "/" +
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear();
    var CalendarMonth =
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 0)
        : currentdate.getMonth() + 0) +
      "/" +
      currentdate.getFullYear();

    const DataPull = firebase.database().ref("Calendar_History");
    DataPull.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      const dataListDay = [];
      const dataListMonth = [];
      const dataListMBefore = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
        //   console.log("data[i].checkoutวันเดือนปี",data[i].checkout.toString().substring(0, 10))
        //   console.log("data[i].checkoutวันเดือนปีเทียบ",CalendarDate.toString().substring(0, 10))
        //   console.log("data[i].checkoutเดือนปี",data[i].checkout.toString().substring(3, 10))
        //   console.log("data[i].checkoutเดือนปีเทียบ",CalendarDate.toString().substring(3, 10))
        console.log("data[i].CalendarMonth", CalendarMonth);
        console.log(
          "data[i].checkoutMonthเทียบ",
          data[i].checkout.toString().substring(3, 10)
        );
        if (
          data[i].checkout.toString().substring(0, 10) ==
          CalendarDate.toString().substring(0, 10)
        ) {
          dataListDay.push({ i, ...data[i] });
        }
        if (
          data[i].checkout.toString().substring(3, 10) ==
          CalendarDate.toString().substring(3, 10)
        ) {
          dataListMonth.push({ i, ...data[i] });
        }
        if (data[i].checkout.toString().substring(3, 10) == CalendarMonth) {
          dataListMBefore.push({ i, ...data[i] });
        }
      }
      setDataList(dataList);
      setCalendarListDay(dataListDay);
      setCalendarListMonth(dataListMonth);
      setCalendarListYear(dataListMBefore);
    });
    const UserRef = firebase.database().ref("User_History");
    UserRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      const User_HistoryList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
        if (data[i].CountPackage < 0) {
          User_HistoryList.push({ i, ...data[i] });
        }
      }
      setUser_HistoryList(User_HistoryList);
      setUserList(dataList);
    });

    const DoctorRef = firebase.database().ref("Doctor_History");
    DoctorRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
      }
      setDoctorList(dataList);
    });

    var currentdate = new Date();
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

    const CancelCaseRef = firebase.database().ref("CancelCase");
    CancelCaseRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      const dataListToday = [];
      const dataListMonth = [];
      const dataListYear = [];
      for (let i in data) {
        dataList.push({ i, ...data[i] });
        //     console.log("TimeDateDay",data[i].cancelDate.toString().substring(3, 10))
        //   console.log("TimeDateDay",cancelDate.toString().substring(3, 10))
        if (data[i].cancelDate == cancelDate) {
          dataListToday.push({ i, ...data[i] });
        }
        if (
          data[i].cancelDate.toString().substring(3, 10) ==
          cancelDate.toString().substring(3, 10)
        ) {
          dataListMonth.push({ i, ...data[i] });
        }
        if (
          data[i].cancelDate.toString().substring(6, 10) ==
          cancelDate.toString().substring(6, 10)
        ) {
          dataListYear.push({ i, ...data[i] });
        }
      }
      setCancelCaseList(dataList);
      setCancelCaseTodayList(dataListToday);
      setCancelCaseMonthList(dataListMonth);
      setCancelCaseYearList(dataListYear);
    });

    var currentdate = new Date();
    var TradeDate =
      currentdate.getFullYear() +
      "-" +
      (currentdate.getMonth() + 1 < 10
        ? "0" + (currentdate.getMonth() + 1)
        : currentdate.getMonth() + 1) +
      "-" +
      (currentdate.getDate() < 10
        ? "0" + currentdate.getDate()
        : currentdate.getDate());

    const Trade_HistoryRef = firebase.database().ref("Trade_History");
    Trade_HistoryRef.on("value", (snapshort) => {
      const data = snapshort.val();
      const dataList = [];
      const dataListDay = [];
      const dataListMonth = [];
      const dataListYear = [];
      var SumtotalDay = 0;
      var SumtotalMonth = 0;
      var SumtotalYear = 0;
      for (let i in data) {
        dataList.push({ i, ...data[i] });
        //   console.log("TimeDateDay",data[i].TimeDate.toString().substring(0, 7))
        //   console.log("TimeDateDay",TradeDate.toString().substring(0, 7))
        if (
          data[i].TimeDate.toString().substring(0, 10) ==
          TradeDate.toString().substring(0, 10)
        ) {
          SumtotalDay = SumtotalDay + parseInt(data[i].PackagePrice);
          dataListDay.push(SumtotalDay);
        }
        if (
          data[i].TimeDate.toString().substring(0, 7) ==
          TradeDate.toString().substring(0, 7)
        ) {
          SumtotalMonth = SumtotalMonth + parseInt(data[i].PackagePrice);
          dataListMonth.push(SumtotalMonth);
        }
        if (
          data[i].TimeDate.toString().substring(0, 4) ==
          TradeDate.toString().substring(0, 4)
        ) {
          SumtotalYear = SumtotalYear + parseInt(data[i].PackagePrice);
          dataListYear.push(SumtotalYear);
        }
      }
      setTrade_HistoryList(dataList);
      setTradeListDay(SumtotalDay);
      setTradeListMonth(SumtotalMonth);
      setTradeListYear(SumtotalYear);
    });
  };
  console.log("dataListYear", TradeListYear);

  useEffect(() => {
    fetchData();

    var currentdatetime = new Date();
    var TimeTodayShowdata =
      currentdatetime.getHours() +
      " : " +
      (currentdatetime.getMinutes() < 10
        ? "0" + currentdatetime.getMinutes()
        : currentdatetime.getMinutes()) +
      " : " +
      +(currentdatetime.getSeconds()) +
      " น. ";

    setTimeTodayShow(TimeTodayShowdata);
  },[]);

  console.log("DoctorList", DoctorList);
  console.log("UserList", UserList);
  console.log("DataList", DataList);

  const DATE_OPTIONS = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return (
    <div>
      {/* <h3>Overview | <Button style={{ textAlign:"left"}} variant="contained" color="primary" >payment ( 10 )</Button> </h3>
            <hr></hr> */}
      <div>
        <h2>
          Daily : {new Date().toLocaleDateString("en-US", DATE_OPTIONS)} /{" "}
          {new Date().toLocaleDateString("th", DATE_OPTIONS)}{" "}
          <Button style={{ textAlign: "left" }} color="primary">
            payment ( {CalendarRemainList.length} )
          </Button>{" "}
          <span style={{ float: "right" }}>Time : {TimeTodayShow}</span>{" "}
        </h2>
        {/* <div style={{ clear: "both" }}></div> */}

        <Box height={160}>
          <Box
            component={Grid}
            container
            spacing={5}
            style={{ padding: 0, textAlign: "center", margin: "auto" }}
          >
            <Box
              className={classes.BoxAuto}
              color="success.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>complete : {CalendarListDay.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="error.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>CancelCase : {CancelCaseTodayList.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="warning.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2> On process : {CalendarOnProcess.length} Case</h2>
            </Box>
          </Box>
        </Box>

        <div style={{ clear: "both" }}></div>
        <Box height={60}>
          <h2>Monthly</h2>
        </Box>

        <Box height={150}>
          <Box
            component={Grid}
            container
            spacing={5}
            style={{ padding: 0, textAlign: "center", margin: "auto" }}
          >
            <Box
              className={classes.BoxAuto}
              color="success.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>complete : {CalendarListMonth.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="error.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>CancelCase : {CancelCaseMonthList.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="warning.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2> ค้างชำระ : {CalendarRemainList.length} Case</h2>
            </Box>
          </Box>
        </Box>

        <Box height={150}>
          <Box
            component={Grid}
            container
            spacing={5}
            style={{ padding: 0, textAlign: "center", margin: "auto" }}
          >
            <Box
              className={classes.BoxAuto}
              color="secondary.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>New : {CalendarNew.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="error.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>Stop : {UserRest.length} Case</h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="warning.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2> Rest : {UserStop.length} Case</h2>
            </Box>
          </Box>
        </Box>

        {/* <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Paper className={classes.paper}><a style={{ color: "#FF5555" }}>xxx</a>xs=12</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={6}>
                        <Paper className={classes.paper}>xs=6</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                    <Grid item xs={3}>
                        <Paper className={classes.paper}>xs=3</Paper>
                    </Grid>
                </Grid> */}

        {/* <h2>Monthly</h2> : {DateTodayShow}

                ทั้งหมด<br></br>
                New : {CalendarNew.length} Case<br></br>
                Rest : {UserRest.length} คน<br></br>
                Stop : {UserStop.length} คน<br></br>
                complete(เดือนนี้) : {CalendarListMonth.length} Case<br></br>
                complete(เดือนที่แล้ว) : {CalendarListYear.length} Case<br></br>
                CancelCase(เดือนนี้) : {CancelCaseMonthList.length} Case<br></br>
                ค้างชำระ : {CalendarRemainList.length} Case<br></br>
                <a style={{ color: "#FF0000" }}>complete(ทั้งหมด) : {DataList.length} Case<br></br> </a>
                <a style={{ color: "#FF0000" }}>CancelCase(ทั้งหมด) : {CancelCaseList.length} Case<br></br> </a> */}

        <h2>Income</h2>

        <Box height={250}>
          <Box
            component={Grid}
            container
            spacing={5}
            style={{ padding: 0, textAlign: "left", margin: "auto" }}
          >
            <Box
              className={classes.BoxAuto}
              color="primary.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>ประจำวัน : {TradeListDay} บาท </h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="primary.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>ประจำเดือน : {TradeListMonth} บาท </h2>
            </Box>
            <Box
              className={classes.BoxAuto}
              color="primary.main"
              component={Grid}
              item
              boxShadow={1}
              xs={3}
              border={1}
            >
              <h2>ประจำปี : {TradeListYear} บาท </h2>
            </Box>
          </Box>
        </Box>

        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                เคสทั้งหมด
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {DataList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                วันนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CalendarListDay.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                เดือนนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CalendarListMonth.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                ปีนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CalendarListYear.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
      <div>
        <Card className={classes.root_cancelcase}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                เคสที่ยกเลิกทั้งหมด
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CancelCaseList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root_cancelcase}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                งานที่ยกเลิกวันนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CancelCaseTodayList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root_cancelcase}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                งานที่ยกเลิกเดือนนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CancelCaseMonthList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card className={classes.root_cancelcase}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                งานที่ยกเลิกปีนี้
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {CancelCaseYearList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>

      <div>
        <Card
          className={classes.root_cancelcase}
          style={{ backgroundColor: "#f3c362" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                รายได้
              </Typography>
              <Typography variant="body1" color="textSecondary" component="p">
                <b>
                  ประจำวัน : {TradeListDay} บาท <br></br>
                  ประจำเดือน : {TradeListMonth} บาท<br></br>
                  ประจำปี : {TradeListYear} บาท<br></br>
                </b>
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          className={classes.root_cancelcase}
          style={{ backgroundColor: "#f3c362" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                นักกายภาพทั้งหมด
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {DoctorList.length} คน
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          className={classes.root_cancelcase}
          style={{ backgroundColor: "#f3c362" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                คนไข้ทั้งหมด
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {UserList.length} คน
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
        <Card
          className={classes.root_cancelcase}
          style={{ backgroundColor: "#f3c362" }}
        >
          <CardActionArea>
            <CardMedia
              className={classes.media}
              // image=""
              title="Year"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h3">
                รายการค้างจ่าย
              </Typography>
              <Typography variant="h3" color="textSecondary" component="p">
                {User_HistoryList.length} Case
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </div>
    </div>
  );
}
