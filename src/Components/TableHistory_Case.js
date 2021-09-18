import firebase from "../Firebase/firebase";
import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
function TableHistory_Case() {
  const [DataList_CheckBox, setDataList_CheckBox] = useState([]);
  const [CheckIn, setCheckIn] = useState("");
  const [CheckOut, setCheckOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [Name, setName] = useState("");
  const columns = [
    { field: "", headerName: "", width: 0 },
    {
      field: "CaseName",
      headerName: "ชื่อเคส",
      width: 200,
      editable: false,
    },
    {
      field: "Date",
      headerName: "วันที่นัด",
      width: 200,
      editable: false,
    },
    {
      field: "Time",
      headerName: "เวลา",
      width: 150,
      editable: false,
    },
    {
      field: "CheckIN",
      headerName: "Check In",
      width: 200,
      editable: false,
    },
    {
      field: "CheckOut",
      headerName: "Check Out",
      width: 200,
      editable: false,
    },
    {
      field: "Doctor",
      headerName: "ผู้ดำเนินการ",
      width: 200,
      editable: false,
    },
    {
      field: "Payment",
      headerName: "Payment",
      width: 200,
      editable: false,
    },
  ];
  useEffect(() => {
    fetchdata();
  }, [CheckIn]);

  function fetchdata() {
    const dataList = [];
    var checkin = "";
    var checkout = "";
    var name = "";
    const getdata_calendar_History = firebase
      .database()
      .ref("Calendar_History");
    const getdata_CheckIn_CheckOut = firebase
      .database()
      .ref("CheckIn_Out_History");
    const getdata_doctor = firebase.database().ref("Doctor_History");
    const getdata_cancelcase = firebase.database().ref("CancelCase");
    getdata_calendar_History.orderByKey().on("child_added", (snap) => {
      getdata_calendar_History.child(snap.key).on("value", (data) => {
        getdata_CheckIn_CheckOut
          .orderByChild("id")
          .equalTo(data.val().id)
          .on("child_added", (checkinout) => {
            checkin = checkinout.val().checkin;
            checkout = checkinout.val().checkout;
            console.log("CheckIn: ", checkin);
            console.log("CheckOut: ", checkout);
            setCheckIn(checkin);
            setCheckOut(checkout);
          });
        getdata_doctor
          .orderByChild("IDCard")
          .equalTo(data.val().resource)
          .on("child_added", (name) => {
            name = name.val().Name;
            console.log(name);
            setName(name);
          });
        try {
          dataList.push({
            ...{
              id: data.val().id,
              CaseName: data.val().text,
              Date: data.val().start.toString().substring(0, 10),
              Time: data.val().start.toString().substring(11),
              CheckIN: CheckIn,
              CheckOut: CheckOut,
              Doctor: Name,
              Payment: data.val().Status_Pay,
            },
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
    getdata_cancelcase.orderByKey().on("child_added", (key) => {
      getdata_cancelcase.child(key.key).on("value", (data) => {
        try {
          dataList.push({
            ...{
              id: data.val().idCalendar,
              CaseName: data.val().text,
              Date: data.val().start.toString().substring(0, 10),
              Time: data.val().start.toString().substring(11),
              CheckIN: "-",
              CheckOut: "-",
              Doctor: data.val().doctor,
              Payment: data.val().Status_Pay,
            },
          });
        } catch (err) {
          console.log(err);
        }
      });
    });
    console.log("DataList: ", dataList);
    setDataList_CheckBox(dataList);
  }

  return (
    <div>
      <div style={{ height: 800, width: "100%" }}>
        <DataGrid
          rows={DataList_CheckBox}
          columns={columns}
          pageSize={15}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </div>
  );
}

export default TableHistory_Case;
