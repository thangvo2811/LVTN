import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const AddStore = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allWareHouse, setAllWareHouse] = useState([]);
  const [idProduct, setIdProduct] = useState("");

  const [quantity, setQuantity] = useState("");
  const [optionValue, setOptionValue] = useState("");
  const [selected, setSelected] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddWareHouse = async () => {
    await axios
      .post("http://localhost:8000/api/create-warehouse-product/", {
        product_id: idProduct,
        warehouse_id: selected,
        quantity: quantity,
        optionvalue: [optionValue],
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Đã Thêm Sản Phẩm Trong Kho");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const callAllWareHouse = async () => {
    await axios
      .get("http://localhost:8000/api/get-warehouse/")
      .then((res) => {
        setAllWareHouse(res.data.Warehouse);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllWareHouse();
  }, []);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Sản Phẩm Kho</i>
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
          <div className="form-title">Thêm Sản Phẩm Kho</div>
          <div className="form-input">
            <form>
              <label>Mã Sản Phẩm</label>
              <Input
                type="number"
                placeholder="Mã Sản Phẩm"
                onChange={(e) => setIdProduct(e.target.value)}
              />
              <label>Tên Kho</label>
              <br />
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>Chọn Kho</option>
                {allWareHouse?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Số Lượng</label>
              <Input
                type="number"
                placeholder="Số Lượng"
                onChange={(e) => setQuantity(e.target.value)}
              />
              <label>Thuộc Tính</label>
              <Input
                type="number"
                placeholder="Thuộc Tính"
                onChange={(e) => setOptionValue([e.target.value])}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleAddWareHouse(idProduct, selected, quantity, optionValue)
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddStore;
