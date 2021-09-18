import React, { useEffect, useState } from "react";
import "../css/ManageDoctor.css";
import _ from 'lodash'
import firebase from "../Firebase/firebase";

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

import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";

import { DataGrid } from "@material-ui/data-grid";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";

import Tooltip from "@material-ui/core/Tooltip";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { setISODay } from "date-fns";
import SetCaseName from "./SetCaseName";

import FormLabel from "@material-ui/core/FormLabel";

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
    // const [StatePopup, setStatePopup] = useState(false);

    // const [Id, setId] = useState("");
    // const [User, setUser] = useState([]);
    const [DataList, setDataList] = useState([]);

    const [editOpen, setEditOpen] = useState(false);
    const [Name, setName] = useState("");
    const [Iduser, setIduser] = useState("");
    const [CaseName, setCaseName] = useState("");

    const [TimeBirthday, setTimeBirthday] = useState("");
    const [Gender, setGender] = useState("");
    const [Age, setAge] = useState("");
    const [Symptom, setSymptom] = useState("");
    const [Hospitalized, setHospitalized] = useState("");
    const [Diagnosis, setDiagnosis] = useState("");
    const [Current_symptoms, setCurrent_symptoms] = useState("");
    const [Address, setAddress] = useState("");
    const [Curren_Address_Radio, setCurren_Address_Radio] = useState("");
    const [Curren_Address, setCurren_Address] = useState("");
    const [Landmark, setLandmark] = useState("");
    const [Count_Want, setCount_Want] = useState("");
    const [NameSurname_parent, setNameSurname_parent] = useState("");
    const [RelationShip, setRelationShip] = useState("");
    const [Tel, setTel] = useState("");
    const [PositionCar, setPositionCar] = useState("");
    const [Recommend, setRecommend] = useState("");
    const [Keyword, setKeyword] = useState("");
    const [Recommender, setRecommender] = useState("");
    const [Person_ID, setPerson_ID] = useState("")
    const [CountPackage, setCountPackage] = useState("")
    const [CountEnd, setCountEnd] = useState("")

    const [AutoNumber, setAutoNumber] = useState("")
    const [Etc, setEtc] = useState("")

    useEffect(() => {
        const fetchData = firebase.database().ref("Doctor_History");
        fetchData.on("value", (datasnap) => {
            const data = datasnap.val();
            const dataList = [];
            for (let i in data) {
                // if (data[i].Name != Name) {
                dataList.push({ i, ...{ id: data[i].IDCard, Name: data[i].Name } });
                // }
            }
            setDataList(dataList);
            console.log("dataList", dataList)
        });

        const User_HistoryRef = firebase.database().ref('User_History');
        User_HistoryRef.on('value', (snapshot) => {
            const User_Historys = snapshot.val();
            const User_HistoryList = [];
            for (let id in User_Historys) {
                //   if(User_Historys[id].CountPackage < 0){
                User_HistoryList.push({ id, ...User_Historys[id] });
                //   }
            }
            setUser_HistoryList(User_HistoryList);
            console.log(User_HistoryList)


            const id = localStorage.getItem('id') || null;
            setState({ id: id, rows: User_HistoryList })
        });

    }, []);

    // const handleClose = () => {
    //     setStatePopup(false);
    // };

    // function handleOpen(Person_ID) {
    //     // if(window.confirm("ต้องการลบข้อมูลนี้ใช่หรือไม่")==true){
    //     setStatePopup(true);
    //     setId(Person_ID);

    //     const UserRef = firebase.database().ref('User_History');
    //     UserRef.on('value', (snapshot) => {
    //         const Users = snapshot.val();
    //         const UserList = [];
    //         for (let id in Users) {
    //             if (Users[id].Person_ID == Person_ID) {
    //                 UserList.push({ id, ...Users[id] });
    //             }
    //         }
    //         setUser(UserList);
    //     });

    // }


    const [state, setState] = useState({ id: null, rows: [] });
    // const [page, setPage] = useState(0);
    // const [rows, setRows] = useState([]);
    // const [rowsPerPage, setRowsPerPage] = useState(5);

    // const handleChangePage = (event, newPage) => {
    //     setPage(newPage);
    // };

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(+event.target.value);
    //     setPage(0);
    // };

    const columns = [
        { field: "AutoNumber", headerName: "รหัสลูกค้า", width: 150 },
        {
            field: "text", headerName: "ชื่อเคส", width: 150, editable: true,
            disableClickEventBubbling: true,
            // renderCell: (params) => {
            //     //หาวิธีกรองก่อนบันทึก
            //     console.log("params", params)
            //     console.log("params.value", params.value)

            //     // const updatePackage = firebase.database().ref("User_History").child(params.row.id);
            //     // updatePackage.update({
            //     //     text: params.value,
            //     // });
            //     // alert("บันทึกสำเร็จ")
            // }
        },
        { field: "Name", headerName: "ชื่อสกุล", width: 200, editable: false, },
        { field: "Symptom", headerName: "วัน / เดือน / ปี", width: 160, editable: false, },
        {
            field: "status",
            headerName: "สถานะ", width: 180, editable: true, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                const saveStatusUser = (statususer) => {
                    // alert(statususer + params.row.id)
                    const updateStatusUser = firebase.database().ref("User_History").child(params.row.id);
                    updateStatusUser.update({
                        status: statususer,
                    });
                }
                var textColor = ""
                if (params.value == "Action") { var textColor = "#00cc00" }
                else if (params.value == "Rest") { var textColor = "#ffb266" }
                else { var textColor = "#ff6666" }
                return (
                    <FormControl style={{ width: "100%" }} variant="standard">
                        {/* <InputLabel></InputLabel> */}

                        <Select value={params.value} style={{ color: textColor }}>
                            {/* <MenuItem value={params.value}>{params.value}</MenuItem> */}
                            <MenuItem onClick={() => saveStatusUser("Action")} value="Action">Action</MenuItem>
                            <MenuItem onClick={() => saveStatusUser("Rest")} value="Rest">Rest</MenuItem>
                            <MenuItem onClick={() => saveStatusUser("Stop")} value="Stop">Stop</MenuItem>
                        </Select>
                    </FormControl>
                )
            }
        },
        {
            field: "zone", headerName: "โซน", width: 150, editable: false, headerAlign: 'center', align: 'center',
            renderCell: (params) => {
                const saveZoneUser = (zoneuser) => {
                    // alert(statususer + params.row.id)
                    const updateZone = firebase.database().ref("User_History").child(params.row.id);
                    updateZone.update({
                        zone: zoneuser,
                    });
                }
                return (
                    <FormControl style={{ width: "100%" }} variant="standard">
                        <Select value={params.value}>
                            <MenuItem onClick={() => saveZoneUser("นน")} value="นน">นน</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("ปทุม")} value="ปทุม">ปทุม</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("เมือง")} value="เมือง">เมือง</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("บางนา")} value="บางนา">บางนา</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("มีน")} value="มีน">มีน</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("ฝั่งธน")} value="ฝั่งธน">ฝั่งธน</MenuItem>
                            <MenuItem onClick={() => saveZoneUser("พระราม2")} value="พระราม2">พระราม2</MenuItem>
                        </Select>
                    </FormControl>
                )
            }
        },
        {
            field: "CountEnd",
            description: 'จำนวนครั้งทั้งหมดที่รักษา',
            headerName: "จำนวน", width: 120, editable: false, headerAlign: 'center', align: 'center',
        },
        {
            field: "etc",
            headerName: "หมายเหตุ", width: 235, editable: true,
        },
        {
            field: "edit",
            width: 150,
            headerName: "แก้ไขข้อมูล",
            disableClickEventBubbling: true,
            // renderCell: (params) => {
            //     const onClick = () => {
            //         return alert(params.row.id);
            //     };
            //     return <Button style={{ width: "100%", backgroundColor: "#3333ff" }} variant="contained" color="primary" onClick={onClick}>Edit</Button>;
            // }
            renderCell: (params) => (
                <>
                    <Button
                        style={{
                            backgroundColor: "#ffcc00",
                            marginRight: 40,
                            padding: "3px 35px"
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={() => handleEditOpen(params.row)}
                    >
                        แก้ไข
                    </Button>

                <Dialog
                  disableBackdropClick
                  open={editOpen}
                  onClose={handleEditClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Edit Case : {CaseName}</DialogTitle>
                  {/* <form
                    noValidate
                    // onSubmit={() => handleSubmit()}
                  > */}
                    <DialogContent>
                      {/* <TextField
                        value={Iduser}
                        placeholder={"Id : "+ Iduser}
                        fullWidth
                        disabled
                      /> */}
                      <TextField
                        label="รหัสผู้ป่วย"
                        value={AutoNumber}
                        fullWidth
                        disabled
                      />
                      <TextField
                        value={CaseName}
                        onChange={(event) => setCaseName(event.target.value)}
                        margin="dense"
                        id="case"
                        label="ชื่อเคส"
                        type="text"
                        fullWidth
                      />
                      <TextField
                        value={Name}
                        onChange={(event) => setName(event.target.value)}
                        label="ชื่อสกุล"
                        margin="dense"
                        id="name"
                        type="text"
                        fullWidth
                      />
                      <TextField
                        value={Person_ID}
                        onChange={(event) => setPerson_ID(event.target.value)}
                        label="เลขบัตรประชาชน"
                        margin="dense"
                        type="text"
                        fullWidth
                      />
                      <TextField
                        value={CountEnd}
                        onChange={(event) => setCountEnd(event.target.value)}
                        label="จำนวนครั้งการรักษา"
                        margin="dense"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        value={CountPackage}
                        onChange={(event) => setCountPackage(event.target.value)}
                        label="จำนวนแพ็คเกจ"
                        margin="dense"
                        type="number"
                        fullWidth
                      />
                      <TextField
                        value={Age}
                        onChange={(event) => setAge(event.target.value)}
                        label="อายุ"
                        margin="dense"
                        type="text"
                        fullWidth
                      />
                    <FormLabel><span style={{fontSize:"12px"}}>เพศ</span></FormLabel>
                    <FormControl style={{ width: "100%" }} variant="standard">
                        <Select value={Gender}>
                            <MenuItem onClick={() => setGender("ชาย")} value="ชาย">ชาย</MenuItem>
                            <MenuItem onClick={() => setGender("หญิง")} value="หญิง">หญิง</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        id="date"
                        margin="dense"
                        label="วันเกิด"
                        type="date"
                        defaultValue="2017-05-24"
                        onChange={(e) => setTimeBirthday(e.target.value)}
                        value={TimeBirthday}
                        fullWidth
                    />
                    <TextField
                        id="date"
                        margin="dense"
                        label="วันแรกที่มีอาการ"
                        type="date"
                        defaultValue="2017-05-24"
                        onChange={(e) => setSymptom(e.target.value)}
                        value={Symptom}
                        fullWidth
                    />
                    <TextField
                        value={Hospitalized}
                        onChange={(event) => setHospitalized(event.target.value)}
                        label="รักษาตัวที่โรงพยาบาล"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Diagnosis}
                        onChange={(event) => setDiagnosis(event.target.value)}
                        label="คำวินิจฉัยแพทย์"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Current_symptoms}
                        onChange={(event) => setCurrent_symptoms(event.target.value)}
                        label="อาการปัจุบัน"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <FormLabel><span style={{fontSize:"12px"}}>ปัจจุบันผู้ป่วยอยู่ที่</span></FormLabel>
                    <FormControl style={{ width: "100%" }} variant="standard">
                        <Select value={Curren_Address_Radio}>
                            <MenuItem onClick={() => setCurren_Address_Radio("อยู่โรงพยาบาล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)")} value="อยู่โรงพยาบาล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)">อยู่โรงพยาบาล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)</MenuItem>
                            <MenuItem onClick={() => setCurren_Address_Radio("เพิ่งกลับบ้าน (1 สัปดาห์)")} value="เพิ่งกลับบ้าน (1 สัปดาห์)">เพิ่งกลับบ้าน (1 สัปดาห์)</MenuItem>
                            <MenuItem onClick={() => setCurren_Address_Radio("อยู่ที่บ้านนานแล้ว")} value="อยู่ที่บ้านนานแล้ว">อยู่ที่บ้านนานแล้ว</MenuItem>
                            <MenuItem onClick={() => setCurren_Address_Radio("อยู่ศูนย์ฟื้นฟู/ศูนย์ดูแล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)")} value="อยู่ศูนย์ฟื้นฟู/ศูนย์ดูแล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)">อยู่ศูนย์ฟื้นฟู/ศูนย์ดูแล กำลังจะกลับบ้าน (อีกประมาณ 3-5 วัน)</MenuItem>
                            <MenuItem onClick={() => setCurren_Address_Radio("อื่นๆ")} value="อื่นๆ">อื่นๆ</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        value={Address}
                        onChange={(event) => setAddress(event.target.value)}
                        label="ที่พักปัจจุบัน"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Curren_Address}
                        onChange={(event) => setCurren_Address(event.target.value)}
                        label="เลขที่บ้าน/ห้อง"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Landmark}
                        onChange={(event) => setLandmark(event.target.value)}
                        label="จุดสังเกต"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Count_Want}
                        onChange={(event) => setCount_Want(event.target.value)}
                        label="จำนวนครั้งที่ต้องการต่อสัปดาห์"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={NameSurname_parent}
                        onChange={(event) => setNameSurname_parent(event.target.value)}
                        label="ชื่อ-สกุล(ผู้ติดต่อ)"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={RelationShip}
                        onChange={(event) => setRelationShip(event.target.value)}
                        label="ความสัมพันธ์กับผู้ป่วย"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Tel}
                        onChange={(event) => setTel(event.target.value)}
                        label="เบอร์ติดต่อ"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={PositionCar}
                        onChange={(event) => setPositionCar(event.target.value)}
                        label="พื้นที่จอดรถ"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Recommend}
                        onChange={(event) => setRecommend(event.target.value)}
                        label="มีผู้แนะนำให้รู้จัก ReBRAIN"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Keyword}
                        onChange={(event) => setKeyword(event.target.value)}
                        label="ใช้คำค้นหาว่าอย่างไร"
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Recommender}
                        onChange={(event) => setRecommender(event.target.value)}
                        label="ผู้แนะนำ..."
                        margin="dense"
                        type="text"
                        fullWidth
                    />
                    <TextField
                        value={Etc}
                        onChange={(event) => setEtc(event.target.value)}
                        label="หมายเหตุ"
                        margin="dense"
                        type="text"
                        fullWidth
                    />

                    {/* เหลือ Autonumber กับ etc */}

                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleEditClose} color="primary">
                        ยกเลิก
                      </Button>
                      <Button onClick={() => handleSubmit()} color="primary" type="submit">
                        แก้ไข
                      </Button>
                    </DialogActions>
                  {/* </form> */}
                </Dialog>
                </>
            )
        },

        // {
        //     field: "action",
        //     headerName: "Action",
        //     width: 250,
        //     // Important: passing customers state so I can edit each user
        //     renderCell: (params) => (
        //         <>
        //             <Button
        //                 style={{
        //                     backgroundColor: "#ffcc00",
        //                     marginRight: 40,
        //                     padding: "3px 35px"
        //                 }}
        //                 variant="contained"
        //                 color="primary"
        //                 type="submit"
        //                 onClick={() => handleEditData(params.row)}
        //             >
        //                 Edit
        //             </Button>
        //         </>
        //     )
        // },

        // {
        //     field: "act",
        //     width: 120,
        //     headerName: "Act",
        //     disableClickEventBubbling: true,
        //     renderCell: (params) => {
        //         const onClick = () => {
        //             // return alert(params.row.id);
        //             const updatePackage = firebase.database().ref("User_History").child(params.row.id);
        //             updatePackage.update({
        //                 status: "Action",
        //             });
        //         };

        //         return <Button style={{ width: "100%", backgroundColor: "#00cc00" }} variant="contained" color="primary" onClick={onClick}>Act</Button>;
        //     }
        // },
        // {
        //     field: "rest",
        //     width: 120,
        //     headerName: "Rest",
        //     disableClickEventBubbling: true,
        // },
        // {
        //     field: "stop",
        //     width: 120,
        //     headerName: "Stop",
        //     disableClickEventBubbling: true,
        //     renderCell: (params) => {
        //         const onClick = () => {
        //             // return alert(params.row.id);
        //             const updatePackage = firebase.database().ref("User_History").child(params.row.id);
        //             updatePackage.update({
        //                 status: "Stop",
        //             });
        //         };

        //         return <Button style={{ width: "100%", backgroundColor: "#ff6666" }} variant="contained" color="primary" onClick={onClick}>Stop</Button>;
        //     }
        // },
    ];

    // บันทึกข้อมูลลงฐานข้อมูล
    const handleSubmit = () => {
        const updatePackage = firebase.database().ref("User_History").child(Iduser);
        updatePackage.update({
            Name: Name,
            text: CaseName,
            //update ที่เหลือต่อจากด้านล่าง
            Person_ID: Person_ID,
            Birthday: TimeBirthday,
            Gender: Gender,
            Age: Age,
            Symptom: Symptom,
            Hospitalized: Hospitalized,
            Diagnosis: Diagnosis,
            Current_symptoms: Current_symptoms,
            Address: Address,
            Curren_Address_Radio: Curren_Address_Radio,
            Curren_Address: Curren_Address,
            Landmark: Landmark,
            Count_Want: Count_Want,
            NameSurname_parent: NameSurname_parent,
            RelationShip: RelationShip,
            Tel: Tel,
            PositionCar: PositionCar,
            Recommend: Recommend,
            Keyword: Keyword,
            Recommender: Recommender,
            CountPackage: CountPackage,
            CountEnd: CountEnd,
            etc: Etc,
            //เหลือ Autonumber กับ etc
        });
        //จริงๆต้อง update username&&password ด้วย
        setEditOpen(false);
      };

    // setตัวแปรตอนกด Edit เพื่อดึงข้อมูลมาใส่ฟิวส์
    const handleEditOpen = (id) => {
        console.log("idddddddddddddddddddddddd",id)
        setIduser(id.id)
        setCaseName(id.text)
        setName(id.Name)
        setSymptom(id.Symptom)
        setPerson_ID(id.Person_ID)
        setAge(id.Age)
        setGender(id.Gender)
        setTel(id.Tel)
        setTimeBirthday(id.Birthday)
        setHospitalized(id.Hospitalized)
        setDiagnosis(id.Diagnosis)
        setCurrent_symptoms(id.Current_symptoms)
        setAddress(id.Address)
        setCurren_Address_Radio(id.Curren_Address_Radio)
        setCurren_Address(id.Curren_Address)
        setLandmark(id.Landmark)
        setCount_Want(id.Count_Want)
        setNameSurname_parent(id.NameSurname_parent)
        setRelationShip(id.RelationShip)
        setPositionCar(id.PositionCar)
        setRecommend(id.Recommend)
        setKeyword(id.Keyword)
        setRecommender(id.Recommender)
        setCountPackage(id.CountPackage)
        setCountEnd(id.CountEnd)
        setAutoNumber(id.AutoNumber)
        setEtc(id.etc)
        //เหลือ Autonumber กับ etc
        setEditOpen(true);
    }

    //ปุ่ม Action เดียวเอาออก
    // const handleEditData = (clickedUser) => {
    //     console.log("clickedUser",clickedUser)
        
    //     const updatePackage = firebase.database().ref("User_History").child(clickedUser.id);
    //     updatePackage.update({
    //         text: clickedUser.text,
    //     });
    //     alert("แก้ไขข้อมูลสำเร็จแล้ว")
    // };

    //ปุ่ม Closeปิดpopup
    const handleEditClose = () => {
        setEditOpen(false);
    };

    const classes = useStyles();

    return (
        <div>
            <div className="main-InputHistory">
                <div className="form-InputHistory">
                    <h1>จัดการข้อมูลผู้ป่วย</h1>

                    <div style={{ width: "1450px", margin: "5px" }} className="input-InputHistory">
                        <div className="button-InputHistory">

                        </div>
                    </div>

                    <div style={{ height: 650, width: 1505 }}>
                        <DataGrid
                            rows={User_HistoryList}
                            columns={columns}
                            pageSize={10}
                            // checkboxSelection
                            disableSelectionOnClick
                            rowsPerPageOptions={[5, 10, 25, 100]}
                            footer-props="{'items-per-page-options':[15, 30, 50, 100, -1]}"
                        // onSelectionModelChange={(e) => setTeamDoctor(e.selectionModel)}
                        />
                    </div>

                    {/* <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table" >
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
                                {User_HistoryList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((User, index) => (
                                    <TableRow key={index}>
                                        <TableCell component="th" scope="row">
                                            {(index + 1)}
                                        </TableCell>
                                        <TableCell align="right">{User.text}</TableCell>
                                        <TableCell align="right">{User.Name}</TableCell>
                                        <TableCell align="right" onClick={() => console.log("Test", "xxxxxxxxxxxxxxxxxxxx")}>{User.Birthday}</TableCell>
                                        <TableCell align="right">{User.Age}</TableCell>
                                        <TableCell align="right">{User.Tel}</TableCell>
                                        <TableCell align="right"><a style={{ color: "#FF0000" }}>{User.CountPackage}</a></TableCell>
                                        <TableCell align="right">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                // onClick={handleOpen}
                                                onClick={() => handleOpen(User.Person_ID)}
                                            >VIEW</Button>
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
                                    <h2 id="transition-modal-title">รายละเอียดเพิ่มเติมคนไข้ : ค้างจ่าย</h2>
                                    <div
                                        id="transition-modal-description"
                                        style={{ textAlign: "start", marginLeft: "20px" }}
                                    >

                                        {User.map((value) => (
                                            <p>
                                                {"ชื่อเคส : " + value.text}<br></br>
                                                {"ชื่อ-สกุล : " + value.Name}<br></br>
                                                {"เลขบัตรประชาชน : " + value.Person_ID}<br></br>
                                                {"เพศ : " + value.Gender}<br></br>
                                                {"อายุ : " + value.Age + " ปี"}<br></br>
                                                {"รักษาที่โรงพยาบาล : " + value.Hospitalized}<br></br>
                                                {"คำวินิจฉัยแพทย์ : " + value.Diagnosis}<br></br>
                                                {"อาการปัจจุบัน : " + value.Current_symptoms}<br></br>
                                                {"ปัจจุบันผู้ป่วยอยู่ที่ : " + value.Curren_Address_Radio}<br></br>
                                                {"ที่อยู่ : " + value.Address + " " + value.Curren_Address}<br></br>
                                                {"จุดสังเกต : " + value.Landmark}<br></br>
                                                {"ชื่อ-สกุล(ผู้ติดต่อ) : " + value.NameSurname_parent}<br></br>
                                                {"ความสัมพันธ์กับผู้ป่วย : " + value.RelationShip}<br></br>
                                                {"เบอร์โทรติดต่อ : " + value.Tel}<br></br>
                                                {"พื้นที่จอดรถ : " + value.PositionCar}<br></br>
                                                {"รู้จักจาก : " + value.Recommend}<br></br>
                                                {"ใช้คำค้นหาว่า : " + value.Keyword}<br></br>
                                                {"ผู้แนะนำ : " + value.Recommender}<br></br>
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
                    </Modal> */}

                </div>
            </div>
        </div>
    );
}
