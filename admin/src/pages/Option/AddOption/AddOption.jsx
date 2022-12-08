import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";
import { useEffect } from "react";

const AddOption = (props) => {
  const [open, setOpen] = useState(false);
  const [allOption, setAllOption] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [idProduct, setIdProduct] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleAddOption = async () => {
    await axios
      .post("http://localhost:8000/api/create-option-product", {
        name: newName,
        price: newPrice,
        product_id: idProduct,
        option_id: selectedOption,
      })
      .catch((res) => {
        if (newName === "") {
          message.error("Thiếu Tên Thuộc Tính");
          return;
        }
        console.log(res.data.Option);
        message.success("Thêm Thuộc Tính Thành Công");
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
  useEffect(() => {
    callAllOption();
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
          <div className="form-title">Thuộc Tính Mới</div>
          <div className="form-input">
            <form>
              <label>Tên</label>
              <Input
                type="text"
                placeholder="Tên"
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Giá</label>
              <Input
                type="number"
                placeholder="Giá"
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>Mã Sản Phẩm</label>
              <Input
                type="number"
                placeholder="Mã Sản Phẩm"
                onChange={(e) => setIdProduct(e.target.value)}
              />
              <label>Tên Thuộc Tính</label>
              <select
                value={selectedOption}
                onChange={(e) => setSelectedOption(e.target.value)}
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
            onClick={() => {
              handleAddOption(newName, newPrice, idProduct, selectedOption);
            }}
          >
            Thêm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddOption;
