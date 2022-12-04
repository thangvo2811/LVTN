import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { Input, message } from "antd";
import { Backdrop, CircularProgress } from "@mui/material";

const UpdateBlog = (props) => {
  const id = props.id;
  const [open, setOpen] = React.useState(false);
  const [descBlog, setDescBlog] = useState("");
  const [statusBlog, setSatusBlog] = useState("");
  const [nameBlog, setNameBlog] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const idBlog = props.id;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateBlog = async (url) => {
    await axios
      .put("http://localhost:8000/api/update-blog/", {
        id: id,
        Description: descBlog,
        sta_id: statusBlog,
        name: nameBlog,
        img: url,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Thành Công");
      });
    setOpen(false);
  };
  const handleUpdateBlogImage = async () => {
    setIsLoading(true);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      await axios
        .post("http://localhost:8000/api/create-img-product", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          // setFile(file.secure_url);
          console.log(res?.data?.res?.url);
          handleUpdateBlog(res?.data?.res?.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setIsLoading(false);
    setOpen(false);
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
              <label>ID</label>
              <Input type="number" value={idBlog} disabled />
              <label>Tên Bài Viết</label>
              <Input
                type="text"
                defaultValue={props.nameBlog}
                onChange={(e) => setNameBlog(e.target.value)}
              />
              <label>Mô Tả Bài Viết</label>
              <Input
                type="text"
                defaultValue={props.descBlog}
                onChange={(e) => setDescBlog(e.target.value)}
              />
              <label>Tình Trạng</label>
              <Input
                type="text"
                defaultValue={props.statusBlog}
                onChange={(e) => setSatusBlog(e.target.value)}
              />
              <label>Hình Ảnh</label>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
              {file && <img src={URL.createObjectURL(file)} alt="" /> ? (
                file && <img src={URL.createObjectURL(file)} alt="" />
              ) : (
                <img src={props.imgBlog} alt="" />
              )}
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {isLoading ? (
            <Backdrop
              sx={{
                color: "#fff",
                zIndex: (theme) => theme.zIndex.drawer + 1,
              }}
              open={open}
              onClick={handleClose}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          ) : (
            <Button onClick={() => handleUpdateBlogImage()}>Cập Nhật</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateBlog;
