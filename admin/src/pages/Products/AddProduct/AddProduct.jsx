import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message, Upload } from "antd";

import axios from "axios";
import TextArea from "antd/es/input/TextArea";

const AddProduct = (props) => {
  const [open, setOpen] = React.useState(false);
  const [nameProduct, setNameProduct] = useState("");
  const [brandProduct, setBrandProduct] = useState("");
  const [cateProduct, setCateProduct] = useState("");
  const [priceProduct, setPriceProduct] = useState("");
  const [descProduct, setDescProduct] = useState("");
  const [file, setFile] = useState("");
  const [isLoadding, setIsLoading] = message.useMessage();
  const success = () => {
    isLoadding
      .open({
        type: "loading",
        content: "Sản Phẩm Đang Được Thêm",
        duration: 2.5,
      })
      .then(() => message.success("Thêm Sản Phẩm Thành Công", 2.5));
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAddProduct = async (url) => {
    await axios
      .post("http://localhost:8000/api/create-Product/", {
        name: nameProduct,
        unitprice: priceProduct,
        Description: descProduct,
        brand_id: brandProduct,
        category_id: cateProduct,
        img: url,
      })
      .then((res) => {
        if (res.data.product.errCode === 1) {
          message.error("Sản Phẩm Đã Tồn Tại");
          return;
        }

        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Thêm Sản Phẩm Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });

    setOpen(false);
  };
  const handleUploadImage = async () => {
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
          callAddProduct(res?.data?.res?.url);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Sản Phẩm</i>
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
          <div className="form-title">Sản Phẩm Mới</div>
          <div className="form-input">
            <form>
              <label>Tên Sản Phẩm</label>
              <Input
                type="text"
                placeholder="Name"
                onChange={(e) => setNameProduct(e.target.value)}
              />
              <label>Mã Danh Mục</label>
              <Input
                type="number"
                placeholder="Mã Danh Mục"
                onChange={(e) => setCateProduct(e.target.value)}
              />
              <label>Mã Thương Hiệu</label>
              <Input
                type="number"
                placeholder="Mã Thương Hiệu"
                onChange={(e) => setBrandProduct(e.target.value)}
              />
              <label>Giá</label>
              <Input
                type="number"
                placeholder="Giá"
                step="0"
                onChange={(e) => setPriceProduct(e.target.value)}
              />
              <label>Mô Tả</label>
              <TextArea
                type="text"
                placeholder="Mô Tả"
                onChange={(e) => setDescProduct(e.target.value)}
              />
              <label>Hình Ảnh</label>
              <Input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          {setIsLoading}
          <Button
            onClick={() => {
              success();
              handleUploadImage();
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddProduct;
