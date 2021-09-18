import React, { useState, useEffect } from 'react';
import firebase from "../Firebase/firebase";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TextField from "@material-ui/core/TextField";

import { DataGrid } from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";

var currentdate = new Date();
var CalendarYear = currentdate.getFullYear();
function Summary() {

    const [saveMonth, setsaveMonth] = useState("0");
    const [saveYear, setsaveYear] = useState(CalendarYear);

    const [UserAll, setUserAll] = useState([]);
    const [UserAction, setUserAction] = useState([]);
    const [UserRest, setUserRest] = useState([]);
    const [UserStop, setUserStop] = useState([]);
    //หาพื้นที่
    const [Usernon, setUsernon] = useState([]);
    const [UsernonAction, setUsernonAction] = useState([]);
    const [UsernonRest, setUsernonRest] = useState([]);
    const [UsernonStop, setUsernonStop] = useState([]);

    const [Userpatum, setUserpatum] = useState([]);
    const [UserpatumAction, setUserpatumAction] = useState([]);
    const [UserpatumRest, setUserpatumRest] = useState([]);
    const [UserpatumStop, setUserpatumStop] = useState([]);

    const [Usermuang, setUsermuang] = useState([]);
    const [UsermuangAction, setUsermuangAction] = useState([]);
    const [UsermuangRest, setUsermuangRest] = useState([]);
    const [UsermuangStop, setUsermuangStop] = useState([]);

    const [Userbangna, setUserbangna] = useState([]);
    const [UserbangnaAction, setUserbangnaAction] = useState([]);
    const [UserbangnaRest, setUserbangnaRest] = useState([]);
    const [UserbangnaStop, setUserbangnaStop] = useState([]);

    const [Usermean, setUsermean] = useState([]);
    const [UsermeanAction, setUsermeanAction] = useState([]);
    const [UsermeanRest, setUsermeanRest] = useState([]);
    const [UsermeanStop, setUsermeanStop] = useState([]);

    const [Userton, setUserton] = useState([]);
    const [UsertonAction, setUsertonAction] = useState([]);
    const [UsertonRest, setUsertonRest] = useState([]);
    const [UsertonStop, setUsertonStop] = useState([]);

    const [Userrama2, setUserrama2] = useState([]);
    const [Userrama2Action, setUserrama2Action] = useState([]);
    const [Userrama2Rest, setUserrama2Rest] = useState([]);
    const [Userrama2Stop, setUserrama2Stop] = useState([]);

    const [CalendarAll, setCalendarAll] = useState([]);
    const [CalendarJan, setCalendarJan] = useState([]);
    const [CalendarFeb, setCalendarFeb] = useState([]);
    const [CalendarMar, setCalendarMar] = useState([]);
    const [CalendarApr, setCalendarArp] = useState([]);
    const [CalendarMay, setCalendarMay] = useState([]);
    const [CalendarJun, setCalendarJun] = useState([]);
    const [CalendarJul, setCalendarJul] = useState([]);
    const [CalendarAug, setCalendarAug] = useState([]);
    const [CalendarSep, setCalendarSep] = useState([]);
    const [CalendarOct, setCalendarOct] = useState([]);
    const [CalendarNov, setCalendarNov] = useState([]);
    const [CalendarDec, setCalendarDec] = useState([]);
    
    const useStyles = makeStyles({
        table: {
            minWidth: 650,
        },
        act: {
            textAlign: "center",
            color: "#00cc00",
        },
        rest: {
            textAlign: "center",
            color: "#ffb266",
        },
        stop: {
            textAlign: "center",
            color: "#ff6666",
        },
        textCen: {
            textAlign: "center",
        }
    });
    const fetchData = () => {
        const UserRestRef = firebase.database().ref("User_History");
        UserRestRef.on("value", (snapshort) => {
            const data = snapshort.val();
            const UserAllList = [];
            const UserActionList = [];
            const UserRestList = [];
            const UserStopList = [];
            //หา พื้นที่
            const UsernonList = [];
            const UsernonActionList = [];
            const UsernonRestList = [];
            const UsernonStopList = [];

            const UserpatumList = [];
            const UserpatumActionList = [];
            const UserpatumRestList = [];
            const UserpatumStopList = [];

            const UsermuangList = [];
            const UsermuangActionList = [];
            const UsermuangRestList = [];
            const UsermuangStopList = [];

            const UserbangnaList = [];
            const UserbangnaActionList = [];
            const UserbangnaRestList = [];
            const UserbangnaStopList = [];

            const UsermeanList = [];
            const UsermeanActionList = [];
            const UsermeanRestList = [];
            const UsermeanStopList = [];

            const UsertonList = [];
            const UsertonActionList = [];
            const UsertonRestList = [];
            const UsertonStopList = [];

            const Userrama2List = [];
            const Userrama2ActionList = [];
            const Userrama2RestList = [];
            const Userrama2StopList = [];

            for (let i in data) {
                UserAllList.push({ i, ...data[i] });
                if (data[i].status == "Action") {
                    UserActionList.push({ i, ...data[i] });
                }
                if (data[i].status == "Rest") {
                    UserRestList.push({ i, ...data[i] });
                }
                if (data[i].status == "Stop") {
                    UserStopList.push({ i, ...data[i] });
                }
                //หา พื้นที่
                if (data[i].zone == "นน") {
                    UsernonList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UsernonActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UsernonRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UsernonStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "ปทุม") {
                    UserpatumList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UserpatumActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UserpatumRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UserpatumStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "เมือง") {
                    UsermuangList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UsermuangActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UsermuangRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UsermuangStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "บางนา") {
                    UserbangnaList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UserbangnaActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UserbangnaRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UserbangnaStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "มีน") {
                    UsermeanList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UsermeanActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UsermeanRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UsermeanStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "ฝั่งธน") {
                    UsertonList.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        UsertonActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        UsertonRestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        UsertonStopList.push({ i, ...data[i] });
                    }
                }
                if (data[i].zone == "พระราม2") {
                    Userrama2List.push({ i, ...data[i] });
                    if (data[i].status == "Action") {
                        Userrama2ActionList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Rest") {
                        Userrama2RestList.push({ i, ...data[i] });
                    }
                    if (data[i].status == "Stop") {
                        Userrama2StopList.push({ i, ...data[i] });
                    }
                }
            }
            setUserAll(UserAllList);
            setUserAction(UserActionList);
            setUserRest(UserRestList);
            setUserStop(UserStopList);

            //หาพื้นที่
            setUsernon(UsernonList);
            setUsernonAction(UsernonActionList);
            setUsernonRest(UsernonRestList);
            setUsernonStop(UsernonStopList);

            setUserpatum(UserpatumList);
            setUserpatumAction(UserpatumActionList);
            setUserpatumRest(UserpatumRestList);
            setUserpatumStop(UserpatumStopList);

            setUsermuang(UsermuangList);
            setUsermuangAction(UsermuangActionList);
            setUsermuangRest(UsermuangRestList);
            setUsermuangStop(UsermuangStopList);

            setUserbangna(UserbangnaList);
            setUserbangnaAction(UserbangnaActionList);
            setUserbangnaRest(UserbangnaRestList);
            setUserbangnaStop(UserbangnaStopList);

            setUsermean(UsermeanList);
            setUsermeanAction(UsermeanActionList);
            setUsermeanRest(UsermeanRestList);
            setUsermeanStop(UsermeanStopList);

            setUserton(UsertonList);
            setUsertonAction(UsertonActionList);
            setUsertonRest(UsertonRestList);
            setUsertonStop(UsertonStopList);

            setUserrama2(Userrama2List);
            setUserrama2Action(Userrama2ActionList);
            setUserrama2Rest(Userrama2RestList);
            setUserrama2Stop(Userrama2StopList);
        });

        const DataPull = firebase.database().ref("Calendar_History");
        DataPull.on("value", (snapshort) => {
            const data = snapshort.val();
            const CalendarAllList = [];
            const CalendarJanList = [];

            const CalendarFebList = [];
            const CalendarMarList = [];
            const CalendarAprList = [];
            const CalendarMayList = [];
            const CalendarJunList = [];
            const CalendarJulList = [];
            const CalendarAugList = [];
            const CalendarSepList = [];
            const CalendarOctList = [];
            const CalendarNovList = [];
            const CalendarDecList = [];

            for (let i in data) {
                if((saveMonth == "0") && saveYear == data[i].checkout.toString().substring(6, 10)){
                    CalendarAllList.push({ i, ...data[i] });
                    if("01" == data[i].checkout.toString().substring(3, 5)){CalendarJanList.push({ i, ...data[i] });}
                    if("02" == data[i].checkout.toString().substring(3, 5)){CalendarFebList.push({ i, ...data[i] });}
                    if("03" == data[i].checkout.toString().substring(3, 5)){CalendarMarList.push({ i, ...data[i] });}
                    if("04" == data[i].checkout.toString().substring(3, 5)){CalendarAprList.push({ i, ...data[i] });}
                    if("05" == data[i].checkout.toString().substring(3, 5)){CalendarMayList.push({ i, ...data[i] });}
                    if("06" == data[i].checkout.toString().substring(3, 5)){CalendarJunList.push({ i, ...data[i] });}
                    if("07" == data[i].checkout.toString().substring(3, 5)){CalendarJulList.push({ i, ...data[i] });}
                    if("08" == data[i].checkout.toString().substring(3, 5)){CalendarAugList.push({ i, ...data[i] });}
                    if("09" == data[i].checkout.toString().substring(3, 5)){CalendarSepList.push({ i, ...data[i] });}
                    if("10" == data[i].checkout.toString().substring(3, 5)){CalendarOctList.push({ i, ...data[i] });}
                    if("11" == data[i].checkout.toString().substring(3, 5)){CalendarNovList.push({ i, ...data[i] });}
                    if("12" == data[i].checkout.toString().substring(3, 5)){CalendarDecList.push({ i, ...data[i] });}
                }
                // if((saveMonth == "01") && saveYear == data[i].checkout.toString().substring(6, 10)){
                //     CalendarJanList.push({ i, ...data[i] });
                // }
                console.log("เดือน", data[i].checkout.toString().substring(3, 5))
                console.log("ปี", data[i].checkout.toString().substring(6, 10))
                // CalendarAllList.push({ i, ...data[i] });
                // if (data[i].checkout.toString().substring(0, 10) == "") {
                //     CalendarAllList.push({ i, ...data[i] });
                // }
                // if (data[i].checkout.toString().substring(3, 10) == CalendarDate.toString().substring(3, 10)) {
                //   dataListMonth.push({ i, ...data[i] });
                // }
                // if (data[i].checkout.toString().substring(3, 10) == CalendarMonth) {
                //   dataListMBefore.push({ i, ...data[i] });
                // }
            }
            setCalendarAll(CalendarAllList);
            setCalendarJan(CalendarJanList);
            //   setCalendarListDay(dataListDay);
            //   setCalendarListMonth(dataListMonth);
            //   setCalendarListYear(dataListMBefore);
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const classes = useStyles();
    return (
        <div>
            <h1>Summary : ฐานข้อมูลผู้ป่วย {saveMonth} : {saveYear} </h1>
            <div style={{width: "25%",float: "left"}}>
                <InputLabel>เลือกเดือน</InputLabel>
                <FormControl style={{ width: "100%", marginBottom: "20px" ,float: "left",textAlign: "center"}} variant="standard">
                    <Select value={saveMonth}>
                        <MenuItem onClick={() => setsaveMonth("0")} value="0">ทุกเดือน</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("01")} value="01">มกราคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("02")} value="02">กุมภาพันธ์</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("03")} value="03">มีนาคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("04")} value="04">เมษายน</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("05")} value="05">พฤษภาคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("06")} value="06">มิถุนายน</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("07")} value="07">กรกฎาคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("08")} value="08">สิงหาคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("09")} value="09">กันยายน</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("10")} value="10">ตุลาคม</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("11")} value="11">พฤศจิกายน</MenuItem>
                        <MenuItem onClick={() => setsaveMonth("12")} value="12">ธันวาคม</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div style={{float: "left"}}>
                {/* <input style={{ width: "100px", marginBottom: "20px" ,float: "left", height: "25px"}} type="number" min="1900" max="2099" step="1"/> */}
                <TextField
                    className="input-text"
                    id="outlined-basic"
                    // required
                    style={{ width: "200px", marginBottom: "20px" ,float: "left", height: "25px",marginLeft: "20px"}}
                    type="number"
                    label="เลือกปี(20xx)"
                    variant="outlined"
                    onChange={(e) => setsaveYear(e.target.value)}
                    value={saveYear}
                />
            </div>
            
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} ><br></br>จำนวนผู้ป่วยทั้งหมด </TableCell>
                            <TableCell align="center">All<br></br>({UserAll.length})&nbsp;100%</TableCell>
                            <TableCell className={classes.act}>Action<br></br>({UserAction.length})&nbsp;{((UserAction.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                            <TableCell className={classes.rest}>Rest<br></br>({UserRest.length})&nbsp;{((UserRest.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                            <TableCell className={classes.stop}>Stop<br></br>({UserStop.length})&nbsp;{((UserStop.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell>พื้นที่</TableCell>
                        <TableCell>1. นน</TableCell>
                        <TableCell align="center">({Usernon.length})&nbsp;{((Usernon.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UsernonAction.length})&nbsp;{((UsernonAction.length * 100) / Usernon.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UsernonRest.length})&nbsp;{((UsernonRest.length * 100) / Usernon.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UsernonStop.length})&nbsp;{((UsernonStop.length * 100) / Usernon.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>2. ปทุม</TableCell>
                        <TableCell align="center">({Userpatum.length})&nbsp;{((Userpatum.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UserpatumAction.length})&nbsp;{((UserpatumAction.length * 100) / Userpatum.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UserpatumRest.length})&nbsp;{((UserpatumRest.length * 100) / Userpatum.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UserpatumStop.length})&nbsp;{((UserpatumStop.length * 100) / Userpatum.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>3. เมือง</TableCell>
                        <TableCell align="center">({Usermuang.length})&nbsp;{((Usermuang.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UsermuangAction.length})&nbsp;{((UsermuangAction.length * 100) / Usermuang.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UsermuangRest.length})&nbsp;{((UsermuangRest.length * 100) / Usermuang.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UsermuangStop.length})&nbsp;{((UsermuangStop.length * 100) / Usermuang.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>4. บางนา</TableCell>
                        <TableCell align="center">({Userbangna.length})&nbsp;{((Userbangna.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UserbangnaAction.length})&nbsp;{((UserbangnaAction.length * 100) / Userbangna.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UserbangnaRest.length})&nbsp;{((UserbangnaRest.length * 100) / Userbangna.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UserbangnaStop.length})&nbsp;{((UserbangnaStop.length * 100) / Userbangna.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>5. มีน</TableCell>
                        <TableCell align="center">({Usermean.length})&nbsp;{((Usermean.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UsermeanAction.length})&nbsp;{((UsermeanAction.length * 100) / Usermean.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UsermeanRest.length})&nbsp;{((UsermeanRest.length * 100) / Usermean.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UsermeanStop.length})&nbsp;{((UsermeanStop.length * 100) / Usermean.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>6. ฝั่งธน</TableCell>
                        <TableCell align="center">({Userton.length})&nbsp;{((Userton.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({UsertonAction.length})&nbsp;{((UsertonAction.length * 100) / Userton.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({UsertonRest.length})&nbsp;{((UsertonRest.length * 100) / Userton.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({UsertonStop.length})&nbsp;{((UsertonStop.length * 100) / Userton.length).toFixed(2)}%</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>7. พระราม 2</TableCell>
                        <TableCell align="center">({Userrama2.length})&nbsp;{((Userrama2.length * 100) / UserAll.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.act}>({Userrama2Action.length})&nbsp;{((Userrama2Action.length * 100) / Userrama2.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.rest}>({Userrama2Rest.length})&nbsp;{((Userrama2Rest.length * 100) / Userrama2.length).toFixed(2)}%</TableCell>
                        <TableCell className={classes.stop}>({Userrama2Stop.length})&nbsp;{((Userrama2Stop.length * 100) / Userrama2.length).toFixed(2)}%</TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
            <br></br>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2} ><br></br>จำนวน visit ทั้งหมด </TableCell>
                            <TableCell align="center">All<br></br>[{CalendarAll.length}]&nbsp;</TableCell>
                            <TableCell className={classes.textCen}>มกราคม<br></br>[{CalendarJan.length}]</TableCell>
                            <TableCell className={classes.textCen}>กุมภาพันธ์<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>มีนาคม<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>เมษายน<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>พฤษภาคม<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>มิถุนายน<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>กรกฎาคม<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>สิงหาคม<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>กันยายน<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>ตุลาคม<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>พฤศจิกายน<br></br>[0]</TableCell>
                            <TableCell className={classes.textCen}>ธันวาคม<br></br>[0]</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableCell>พื้นที่</TableCell>
                        <TableCell>1. นน</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>2. ปทุม</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>3. เมือง</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>4. บางนา</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>5. มีน</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>6. ฝั่งธน</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                    <TableBody>
                        <TableCell></TableCell>
                        <TableCell>7. พระราม 2</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                        <TableCell className={classes.textCen}>x</TableCell>
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default Summary;
