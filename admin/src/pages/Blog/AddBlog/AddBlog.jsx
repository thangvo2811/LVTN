import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { message, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
const AddBlog = (props) => {
  const [open, setOpen] = React.useState(false);
  const [descBlog, setDescBlog] = useState("");
  const [statusBlog, setStatusBlog] = useState("");
  const [nameBlog, setNameBlog] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddBlog = async () => {
    await axios
      .post("http://localhost:8000/api/create-blog/", {
        Description: descBlog,
        sta_id: statusBlog,
        name: nameBlog,
      })
      .then((res) => {
        console.log(res.data.blog);
        props.parentCallback(Date.now());
        message.success("Thêm Bài Viết Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleDescBlog = (e) => {
    e.preventDefault();
    setDescBlog(e.target.value);
  };
  const handleStatusBlog = (e) => {
    e.preventDefault();
    setStatusBlog(e.target.value);
  };
  const handleNameBlog = (e) => {
    e.preventDefault();
    setNameBlog(e.target.value);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Bài Blog</i>
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
          <div className="form-title">Thêm Bài Viết Mới</div>
          <div className="form-input">
            <form>
              <label>Name</label>
              <Input type="text" placeholder="Name" onChange={handleNameBlog} />
              <label>Mô tả</label>
              <TextArea
                rows="8"
                cols="111"
                type="text"
                placeholder="Name"
                onChange={handleDescBlog}
              />
              <label>Status</label>
              <Input
                type="text"
                placeholder="Status"
                onChange={handleStatusBlog}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleAddBlog(descBlog, statusBlog, nameBlog)}>
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddBlog;
