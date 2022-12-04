import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import "../style.scss";
import { Input, message } from "antd";
import Item from "antd/es/list/Item";
import TextArea from "antd/es/input/TextArea";
import { Backdrop, CircularProgress } from "@mui/material";

const UploadProduct = (props) => {
  const id = props.id;
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newIdCate, setNewIdCate] = useState("");
  const [newIdBrand, setNewIdBrand] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [file, setFile] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateProduct = async (url) => {
    console.log(url);
    await axios
      .put("http://localhost:8000/api/update-Product/", {
        id: id,
        name: newName,
        unitprice: newPrice,
        brand_id: newIdBrand,
        category_id: newIdCate,
        img: url,
        Description: newDesc,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Sản Phẩm Thành Công");
        return;
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleUploadImage = async () => {
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
          handleUpdateProduct(res?.data?.res?.url);
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
        {" "}
        <DialogTitle id="alert-dialog-title"> </DialogTitle>
        <DialogContent>
          <div className="form-title">Cập Nhật Sản Phẩm </div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.id} disabled />
              <label>Tên sản phẩm</label>
              <Input
                type="text"
                defaultValue={props.nameProduct}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Mã Danh Mục</label>
              <Input
                type="text"
                defaultValue={props.idCate}
                onChange={(e) => setNewIdCate(e.target.value)}
              />
              <label>Mã Thương Hiệu</label>
              <Input
                type="text"
                defaultValue={props.idBrand}
                onChange={(e) => setNewIdBrand(e.target.value)}
              />
              <label>Giá</label>
              <Input
                type="number"
                defaultValue={props.price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>Mô Tả</label>
              <TextArea
                rows="4"
                cols="111"
                defaultValue={props.descProduct}
                onChange={(e) => setNewDesc(e.target.value)}
              />
              <label>Hình Ảnh</label>

              <Input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
              ></Input>
              {file && <img src={URL.createObjectURL(file)} alt="" /> ? (
                file && <img src={URL.createObjectURL(file)} alt="" />
              ) : (
                <img src={props.imgProduct} alt="" />
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
            <Button
              onClick={() => {
                handleUploadImage();
              }}
            >
              Cập Nhật
            </Button>
          )}
          {/*  */}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadProduct;
