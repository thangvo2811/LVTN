import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message } from "antd";

const UpdateBlog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [descBlog, setDescBlog] = useState("");
  const [statusBlog, setSatusBlog] = useState("");
  const [nameBlog, setNameBlog] = useState("");
  const idBlog = props.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callUpdateBlog = async (id, desc, status, name) => {
    await axios
      .put("http://localhost:8000/api/update-blog/", {
        id: id,
        Description: desc,
        sta_id: status,
        name: name,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Thành Công");
      });
    setOpen(false);
  };
  const handleDescBlog = (e) => {
    e.preventDefault();
    setDescBlog(e.target.value);
  };
  const handleStatusBlog = (e) => {
    e.preventDefault();
    setSatusBlog(e.target.value);
  };
  const handleNameBlog = (e) => {
    e.preventDefault();
    setNameBlog(e.target.value);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <i className="bx bxs-edit"></i>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Cập Nhật Bài Viết</div>
          <div className="form-input">
            <form>
              <label>Id</label>
              <input type="number" defaultValue={idBlog} disabled />
              <label>Mô Tả Bài Viết</label>
              <input type="text" defaultValue={props.descBlog} />
              <label>Tình Trạng</label>
              <input type="text" defaultValue={props.statusBlog} />
              <label>Tên Bài Viết</label>
              <input type="text" defaultValue={props.nameBlog} />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              callUpdateBlog(idBlog, descBlog, statusBlog, nameBlog)
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateBlog;
