import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";
import { useSelector } from "react-redux";

const ChangeName = (props) => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const IdCus = localStorage.getItem("User");
  const oldPhone = props.phone;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callChangeName = async (idCustomer, newNameCus) => {
    console.log(newNameCus);
    await axios
      .put("http://localhost:8000/api/update-user/", {
        id: idCustomer,
        fullname: newNameCus,
        phonenumber: oldPhone,
        avatar: "",
      })
      .then((res) => {
        console.log(res.data);
        props.refresh();
        message.success("CẬP NHẬT THÀNH CÔNG");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleName = (e) => {
    e.preventDefault();
    setNewName(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div className="form-title">Update Name</div>
          <div className="form-input">
            <form>
              <input
                type={props.name}
                defaultValue={props.name}
                onChange={handleName}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>
            <span className="name-cancel">Cancel</span>
          </Button>
          <Button onClick={() => callChangeName(IdCus, newName)} autoFocus>
            <span className="name-save">Save</span>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ChangeName;
