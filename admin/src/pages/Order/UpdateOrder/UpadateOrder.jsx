import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";

const UpadateOrder = (props) => {
  const [open, setOpen] = React.useState(false);
  const status = props.statusOrder;

  const handleUpdateOrder = async (id) => {
    await axios
      .put(`http://localhost:8000/api/update-accept-order/${id}/`)
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("Cập nhật trạng thái đơn hàng thành công");
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          <div className="form-title">Xác Nhận Đơn Hàng</div>
          <div className="form-input">
            <form></form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button onClick={() => handleUpdateOrder(props.idOrder)}>
            Xác Nhận
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpadateOrder;
