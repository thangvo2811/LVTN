import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";
const UpdateOption = (props) => {
  const id = props.id;
  const [open, setOpen] = React.useState(false);
  const [newName, setNewName] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newIdProduct, setNewIdProduct] = useState("");
  const [newIdOption, setNewIdOption] = useState("");
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateOption = async (
    id,
    nameOption,
    priceOption,
    idProuct,
    idoption
  ) => {
    await axios
      .put("http://localhost:8000/api/update-option-product", {
        id: id,
        name: nameOption,
        price: priceOption,
        product_id: idProuct,
        option_id: idoption,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập Nhật Thuộc Tính Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
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
        <DialogContent>
          <div className="form-title">Cập Nhật Danh Mục</div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.id} disabled />
              <label>Tên</label>
              <Input
                type="text"
                defaultValue={props.name}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Giá</label>
              <Input
                type="number"
                defaultValue={props.price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>Mã sản phẩm</label>
              <Input
                type="number"
                defaultValue={props.idProduct}
                onChange={(e) => setNewIdProduct(e.target.value)}
              />
              <label>Mã thuộc tính</label>
              <Input
                type="number"
                defaultValue={props.idOption}
                onChange={(e) => setNewIdOption(e.target.value)}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleUpdateOption(
                id,
                newName,
                newPrice,
                newIdProduct,
                newIdOption
              )
            }
          >
            Cập Nhật
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateOption;
