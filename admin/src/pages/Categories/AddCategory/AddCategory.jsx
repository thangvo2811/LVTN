import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";

const AddCategory = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameCategory, setNameCategory] = useState("");
  const [parentID, setParentID] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAddCategory = async () => {
    await axios
      .post("http://localhost:8000/api/get-create-Category/", {
        name: nameCategory,
        parent_id: parentID,
      })
      .then((res) => {
        console.log(res.data.category);
        props.parentCallback(Date.now());
        message.success("Thêm danh mục thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleNameCategory = (e) => {
    e.preventDefault();
    setNameCategory(e.target.value);
  };
  const handleParentId = (e) => {
    e.preventDefault();
    setParentID(e.target.value);
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
          <div className="form-title">Thêm Danh Mục Mới</div>
          <div className="form-input">
            <form>
              <label>Tên Thương Hiệu</label>
              <input
                type="text"
                placeholder="Tên"
                onChange={handleNameCategory}
              />
              <label>Mã Danh Mục</label>
              <input type="text" placeholder="Tên" onChange={handleParentId} />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={() => callAddCategory(nameCategory, parentID)}>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddCategory;
