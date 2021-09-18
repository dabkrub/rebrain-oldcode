import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import Checkbox from "@material-ui/core/Checkbox";
import FormGroup from "@material-ui/core/FormGroup";
import Button from "@material-ui/core/Button";
import firebase from "../Firebase/firebase";
import "../css/Patient_report_Primary_Case.css";
function Submit_Case() {
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
  }));
  const classes = useStyles();
  return (
    <div>
      <div className="main-InputHistory">
        <div className="form-InputHistory">
          <h1>แบบยืนยันการทำเคส : ReBRAIN</h1>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="ชื่อเคส"
              variant="outlined"
            />
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "535px", margin: "5px" }}
              type="text"
              label="ชื่อนักกายภาพ"
              variant="outlined"
            />
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "535px", margin: "5px" }}
              type="text"
              label="ชื่อผู้ป่วย"
              variant="outlined"
            />
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="date"
              style={{ width: "350px", margin: "5px" }}
              label="วันที่ประเมิน"
              type="date"
              defaultValue={new Date()}
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl style={{ width: "350px", margin: "5px" }} className="input-text" component="fieldset">
              <FormLabel component="legend">วิชาชีพ</FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  value="PT"
                  control={<Radio color="primary" />}
                  label="PT"
                  style={{ textAlign: "start", margin: "auto", paddingLeft: "85px" }}
                  labelPlacement="End"
                />
                <FormControlLabel
                  value="OT"
                  control={<Radio color="primary" />}
                  label="OT"
                  style={{ textAlign: "start", margin: "auto", paddingRight: "85px" }}
                  labelPlacement="End"
                />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ width: "350px", margin: "5px" }} component="fieldset">
              <FormLabel component="legend">เครื่องมือพิเศษ</FormLabel>
              <FormGroup aria-label="position" row className="check-box">
                <FormControlLabel
                  value="Ultrasound"
                  control={<Checkbox color="primary" />}
                  label="Ultrasound"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="TENs"
                  control={<Checkbox color="primary" />}
                  label="TENs"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="ไม่มี"
                  control={<Checkbox color="primary" />}
                  label="ไม่มี"
                  labelPlacement="end"
                />
              </FormGroup>
            </FormControl>
          </div>
          <div className="input-PrimaryCase">
            <TextField
              className="input-text"
              id="outlined-basic"
              style={{ width: "1070px", margin: "5px" }}
              type="text"
              label="หมายเหตุ"
              variant="outlined"
            />
          </div>
          <div className="input-InputHistory">
            <div className="button-InputHistory">
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px" }}
              // onClick={onSaveData}
              >
                บันทึกข้อมูล
                  </Button>
              <Button
                variant="contained"
                color="primary"
                style={{ width: "200px", marginLeft: "10px" }}
              // onClick={onClearData}
              >
                ล้างข้อมูล
                  </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Submit_Case;
