import React, { useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";

const EditBrand = (props) => {
  const [open, setOpen] = React.useState(false);
  const [idBrand, setIdBrand] = useState("");
  const [nameBrand, setNameBrand] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdateBrand = async () => {
    await axios
      .put("http://localhost:8000/api/update-brand", {
        id: idBrand,
        name: nameBrand,
      })
      .then((res) => {
        console.log(res.data.brand);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChange = (e) => {
    setNameBrand(e.target.value);
    setIdBrand(e.target.value);
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
      >
        <DialogTitle id="alert-dialog-title"></DialogTitle>
        <DialogContent>
          <div className="form-title">UPDATE BRAND</div>
          <div className="form-input">
            <form>
              <input
                type="text"
                defaultValue={props.name}
                onChange={onChange}
              />
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateBrand}>OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditBrand;
