import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input } from "antd";
import axios from "axios";
import { message } from "antd";
import { useState } from "react";
import { useEffect } from "react";

const AddOption = (props) => {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  // const [newIdProduct, setNewIdProduct] = useState("");
  const [selectProduct, setSelectProduct] = useState("");
  const [allProductOption, setAllProductOption] = useState([]);
  const [selected, setSelected] = useState("");
  const [allOption, setAllOption] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAddOption = async () => {
    await axios
      .post("http://localhost:8000/api/create-option-product", {
        name: newName,
        price: newPrice,
        product_id: selectProduct,
        option_id: selected,
      })
      .then((res) => {
        console.log(res.data);

        message.success("Thêm Thuộc Tính Thành Công");
        props.parentCallback(Date.now());
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const callAllOption = async () => {
    await axios
      .get("http://localhost:8000/api/get-option/")
      .then((res) => {
        setAllOption(res.data.option);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllProduct = async () => {
    await axios
      .get(
        "http://localhost:8000/api/get-all-product-admin/?brand_id=&category_id="
      )
      .then((res) => {
        setAllProductOption(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllOption();
    callAllProduct();
  }, []);
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <div className="form-name">
          <i className="bx bx-plus">Thêm Thuộc Tính</i>
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
          <div className="form-title">Thuộc Tính</div>
          <div className="form-input">
            <form>
              <label>Tên Thuộc Tính</label>
              <Input
                type="text"
                placeholder="Tên Thuộc Tính"
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Giá</label>
              <Input
                type="number"
                placeholder="Giá"
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>Tên Sản Phẩm</label>
              <br />
              <select
                value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
              >
                <option>Chọn Sản Phẩm</option>
                {allProductOption?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>Tên Thuộc Tính</label>
              <br />
              <select
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                <option>Chọn Thuộc Tính</option>
                {allOption?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              callAddOption(newName, newPrice, selectProduct, selected)
            }
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOption;
