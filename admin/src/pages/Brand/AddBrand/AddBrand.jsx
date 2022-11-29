import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";

const AddBrand = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameBrand, setNameBrand] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddBrand = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:8000/api/get-create-brand", {
        name: nameBrand,
      })
      .then((res) => {
        if (nameBrand === "") {
          message.error("Bạn chưa nhập thương hiệu");
          return;
        }
        if (res.data.brand.errCode === 1) {
          message.error("Thương hiệu đã tồn tại");
          return;
        }
        if (res.data.brand.errCode === 0) {
          console.log(res.data.brand);
          props.parentCallback(Date.now());
          message.success("Thêm Thương Hiệu Thành Công");
          return;
        }
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };

  const onChange = (e) => {
    e.preventDefault();
    setNameBrand(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Add New</i>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Thêm Thương Hiệu Mới</div>
          <div className="form-input">
            <form>
              <input
                type="text"
                placeholder="Name"
                value={nameBrand}
                onChange={onChange}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={(e) => handleAddBrand(e, e.target.value)}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBrand;
