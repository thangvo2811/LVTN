import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";

const AddWarrantyTwo = (props) => {
  const [open, setOpen] = React.useState(false);
  const [info, setInfo] = useState("");
  const [desc, setDesc] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [staffId, setStaffId] = useState("");
  const [orderCode, setOrderCode] = useState("");
  const [seriNumber, setSeriNumber] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callCreateWarrantyInfo = async (
    info,
    desc,
    idProduct,
    staId,
    order,
    seri
  ) => {
    await axios
      .post("http://localhost:8000/api/create-warranty/", {
        infor: info,
        description: desc,
        product_id: idProduct,
        sta_id: staId,
        orderCode: order,
        serinumber: seri,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Tạo Đơn Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Tạo Đơn</i>
        </div>
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {<></>}
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">Đơn Bảo Hành</div>
          <div className="form-input">
            <form>
              <label>Thông Tin Đơn</label>
              <Input
                type="text"
                placeholder="Thông Tin Đơn"
                onChange={(e) => setInfo(e.target.value)}
              />
              <label>Nội Dung Bảo Hành</label>
              <Input
                type="text"
                placeholder="Nội Dung Bảo Hành"
                onChange={(e) => setDesc(e.target.value)}
              />
              <label>Mã Sản Phẩm</label>
              <Input
                type="text"
                placeholder="Mã Sản Phẩm"
                onChange={(e) => setIdProduct(e.target.value)}
              />
              <label>Mã Nhân Viên</label>
              <Input
                type="text"
                placeholder="Mã Nhân Viên"
                onChange={(e) => setStaffId(e.target.value)}
              />
              <label>Mã Đơn Hàng</label>
              <Input
                type="text"
                placeholder="Mã Đơn Hàng"
                onChange={(e) => setOrderCode(e.target.value)}
              />
              <label>Thông Số Máy</label>
              <Input
                type="text"
                placeholder="Thông Số Máy"
                onChange={(e) => setSeriNumber(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              callCreateWarrantyInfo(
                info,
                desc,
                idProduct,
                staffId,
                orderCode,
                seriNumber
              )
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddWarrantyTwo;
