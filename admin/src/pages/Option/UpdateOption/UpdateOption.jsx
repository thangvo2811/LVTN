import React, { useEffect, useState } from "react";
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
  const [selectProduct, setSelectProduct] = useState("");
  const [allProductOption, setAllProductOption] = useState([]);
  const [selectOption, setSelectOption] = useState("");
  const [allOption, setAllOption] = useState([]);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAllOption = async () => {
    await axios
      .get(`${process.env.REACT_APP_API_URL}/api/get-option/`)
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
        `${process.env.REACT_APP_API_URL}/api/get-all-product-admin/?brand_id=&category_id=`
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
  const handleUpdateOption = async (
    id,
    nameOption,
    priceOption,
    idProuct,
    idoption
  ) => {
    await axios
      .put(`${process.env.REACT_APP_API_URL}/api/update-option-product`, {
        id: id,
        name: nameOption,
        price: priceOption,
        product_id: idProuct,
        option_id: idoption,
      })
      .then((res) => {
        console.log(res.data);
        props.parentCallback(Date.now());
        message.success("C???p Nh???t Thu???c T??nh Th??nh C??ng");
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
          <div className="form-title">C???p Nh???t Thu???c T??nh</div>
          <div className="form-input">
            <form>
              <label>ID</label>
              <Input type="number" value={props.id} disabled />
              <label>T??n</label>
              <Input
                type="text"
                defaultValue={props.name}
                onChange={(e) => setNewName(e.target.value)}
              />
              <label>Gi??</label>
              <Input
                type="number"
                defaultValue={props.price}
                onChange={(e) => setNewPrice(e.target.value)}
              />
              <label>T??n S???n Ph???m</label>
              <br />
              <select
                // value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
              >
                <option>{props.nameProduct}</option>
                {allProductOption?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
              <label>T??n Thu???c T??nh</label>
              <br />
              <select
                // value={selectOption}
                onChange={(e) => setSelectOption(e.target.value)}
              >
                <option>{props.nameOption}</option>
                {allOption?.map((item, index) => (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>H???y</Button>
          <Button
            onClick={() =>
              handleUpdateOption(
                id,
                newName,
                newPrice,
                selectProduct,
                selectOption
              )
            }
          >
            C???p Nh???t
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UpdateOption;
