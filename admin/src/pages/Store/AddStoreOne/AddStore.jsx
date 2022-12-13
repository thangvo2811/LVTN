import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";

const AddStore = (props) => {
  const [open, setOpen] = React.useState(false);
  const [allWareHouse, setAllWareHouse] = useState([]);
  const [idProduct, setIdProduct] = useState("");
  const [quantity, setQuantity] = useState("");

  const [optionValue, setOptionValue] = useState([]);
  const [optionValue1, setOptionValue1] = useState([]);

  const [selected, setSelected] = useState("");

  const [allProduct, setAllProduct] = useState([]);
  const [selectProduct, setSelectProduct] = useState("");

  const [allOption, setAllOption] = useState([]);
  const [selectOption, setSelectOption] = useState([]);
  const [selectIdOption, setSelectIdOption] = useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const callAllProduct = async () => {
    await axios
      .get(
        "http://localhost:8000/api/get-all-product-admin/?brand_id=&category_id="
      )
      .then((res) => {
        setAllProduct(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllOption = async (id) => {
    await axios
      .get(`http://localhost:8000/api/get-product/${id}/`)
      .then((res) => {
        setAllOption(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const callAllIdOption = async () => {
    await axios
      .get("http://localhost:8000/api/get-option-product/")
      .then((res) => {
        setIdProduct(res.data.Option);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callAllProduct();
    callAllOption(selectProduct);
    callAllIdOption(selectIdOption);
  }, [selectIdOption, selectOption, selectProduct]);
  console.log("Array", selectOption, selectIdOption);
  const handleAddWareHouse = async () => {
    await axios
      .post("http://localhost:8000/api/create-warehouse-product/", {
        product_id: idProduct,
        warehouse_id: selected,
        quantity: quantity,
        optionvalue: [selectOption],
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
              <label>Tên Sản Phẩm</label>
              <br />
              <select
                value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
              >
                <option>Chọn Sản Phẩm</option>
                {allProduct?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select>

              {allOption?.existingOptions?.map((item, index) => {
                return (
                  <>
                    <label>Thuộc Tính {item.name}</label>
                    <select onChange={(e) => setSelectOption(e.target.value)}>
                      <option value={item.id}>{item.name}</option>
                      {item?.values?.map((data, i) => (
                        <option
                          key={i}
                          value={data.option_id}
                          onChange={(e) => {
                            setSelectOption(e.target.value);
                            setSelectIdOption(e.target.value);
                          }}
                        >
                          {data.name}
                        </option>
                      ))}
                    </select>
                  </>
                );
              })}
              {/* <label>Thuộc Tính Sản Phẩm</label>
              <br />
              {allOption?.existingOptions?.map((item, index) => (
                <select
                  onChange={(e) => {
                    setSelectOption(e.target.value);
                    setSelectProduct(e.target.value);
                  }}
                >
                  <option key={index} value={item.id}>
                    {item.name}
                  </option>
                  {item.values.map((data, i) => (
                    <option key={i} value={data.option_id}>
                      {data.name}
                    </option>
                  ))}
                </select>
              ))} */}

              {/* <select
                value={selectProduct}
                onChange={(e) => setSelectProduct(e.target.value)}
              >
                <option>Chọn Sản Phẩm</option>
                {allProduct?.map((item, index) => (
                  <option key={index} value={item?.id}>
                    {item?.name}
                  </option>
                ))}
              </select> */}

              {/* <label>Thuộc Tính 1</label>
              <Input
                type="number"
                placeholder="Thuộc Tính"
                onChange={(e) => {
                  setOptionValue(e.target.value);
                }}
              />
              <label>Thuộc Tính 2</label>
              <Input
                type="number"
                placeholder="Thuộc Tính"
                onChange={(e) => {
                  setOptionValue1(e.target.value);
                }}
              /> */}
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
            </form>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Hủy</Button>
          <Button
            onClick={() =>
              handleAddWareHouse(idProduct, selected, quantity, [
                optionValue,
                optionValue1,
              ])
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
