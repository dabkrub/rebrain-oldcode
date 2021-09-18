import React, { useState } from "react";
import firebase from "../Firebase/firebase";
import "../css/ShowData_User.css";

import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#2c2c2f",//theme.palette.common.black
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function ShowData_User({ todo }) {
  const classes = useStyles();
  return (
    <div>
      <h1>ข้อมูลประวัติ</h1>
      <TableContainer component={Paper}  style={{ marginTop: "20px" }}>
        <Table  className={classes.table}>
          <TableHead>
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" , fontWeight: "bold"}}> <h2>ข้อมูลประวัติ</h2></StyledTableCell>
              <StyledTableCell align="left"><h2>รายละเอียด</h2></StyledTableCell>
            </StyledTableRow >
          </TableHead>
          <TableBody>
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>เลขรหัสบัตรประจำตัวประชาชน : </StyledTableCell>
              <StyledTableCell align="left">{todo.Person_ID}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>ชื่อ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Name}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>เกิดวันที่ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Birthday}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>อายุ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Age} ปี</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>ที่อยู่ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Address}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>เพศ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Gender}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>ที่พักปัจจุบัน : </StyledTableCell>
              <StyledTableCell align="left">{todo.Curren_Address}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>คำวินิจฉัยแพทย์ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Diagnosis}</StyledTableCell>
            </StyledTableRow >
            <StyledTableRow >
              <StyledTableCell align="right" style={{ width: "25%" }}>เบอร์โทรศัพท์ : </StyledTableCell>
              <StyledTableCell align="left">{todo.Tel}</StyledTableCell>
            </StyledTableRow >
          </TableBody>
        </Table>
      </TableContainer>
      <br></br>
      <hr></hr>
{/* 
      <div className="showdata-page">
        <div className="column-showdata">
          <h2>เลขรหัสบัตรประจำตัวประชาชน: </h2>
          <h2>ชื่อ: </h2>
          <h2>เกิดวันที่: </h2>
          <h2>อายุ:</h2>
          <h2>ที่อยู่: </h2>
          <h2>เพศ: </h2>
          <h2>ที่พักปัจจุบัน: </h2>
          <h2>คำวินิจฉัยแพทย์: </h2>
          <h2>เบอร์โทรศัพท์: </h2>
        </div>
        <div className="column">
          <h2>{todo.Person_ID}</h2>
          <h2>{todo.Name}</h2>
          <h2>{todo.Birthday}</h2>
          <h2>{todo.Age}</h2>
          <h2>{todo.Address}</h2>
          <h2>{todo.Gender}</h2>
          <h2>{todo.Curren_Address}</h2>
          <h2>{todo.Diagnosis}</h2>
          <h2>{todo.Tel}</h2>
        </div>
      </div> */}
    </div>
  );
}

export default ShowData_User;
