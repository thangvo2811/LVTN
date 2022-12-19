import axios from "axios";
import React from "react";
import { loginFailure, loginStart, loginSuccess } from "./userLogin";
import { message } from "antd";
import {
  addCartAction,
  addNumberCartStart,
  addStart,
  deleteAllCartStart,
  deleteAllCartSuccess,
  deleteCartStart,
  deleteCartSuccess,
} from "./cartRedux";

export const loginUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  await axios
    .post("http://localhost:8000/api/get-user-login", user)
    .then((res) => {
      if (res.data.errorCode === 0) {
        message.success("Đăng Nhập Thành Công");
        dispatch(loginSuccess(res.data));
        localStorage.setItem("User", res.data.data.id);
        localStorage.setItem("nameUser", res.data.data.fullname);
        navigate("/");
      } else if (!res.data.password || !res.data.email) {
        message.error("Sai Mật Khẩu Hoặc Email");
      }
    })
    .catch(() => {
      message.error("Đăng Nhập Thất Bại");
      dispatch(loginFailure());
    });
};
export const addCart = async (
  dispatch,
  user,
  idProduct,
  idOption,
  qty,
  idWarehouse
) => {
  dispatch(addStart());
  await axios
    .post("http://localhost:8000/api/add-to-cart", {
      cus_id: parseInt(user),
      product_id: idProduct,
      optionvalue: idOption,
      amount: qty,
      warehouse_id: idWarehouse,
    })
    .then((res) => {
      console.log(res);
      if (res.data.errCode === 3) {
        message.error("Bạn Chưa Chọn Thuộc Tính");
        return;
      }
      if (res.data.errCode === 5) {
        message.error("Bạn Chưa Chọn Thuộc Tính");
        return;
      }
      if (res.data.errCode === 6) {
        message.error(res.data.errMessage);
        return;
      }
      if (res.data.errCode === 0 || res.data.errCode === -1) {
        message.success("Thêm Sản Phẩm Thành Công");
      }
      // let cartNumber = parseInt(localStorage.getItem("cartItem")) + 1;
      dispatch(addCartAction());
      // localStorage.setItem(
      //   "cartItem",
      //   parseInt(localStorage.getItem("cartItem")) + 1
      // );
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
// export const deleteCart = async (dispatch, cartId) => {
//   dispatch(deleteCartStart());
//   await axios
//     .delete(`http://localhost:8000/api/handle-Delete-Cartitem/${cartId}/`)
//     .then((res) => {
//       console.log(res.data);
//       message.success("Xóa Sản Phẩm Thành Công");
//       dispatch(deleteCartSuccess());
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// export const deleteAllCart = async (dispatch, [cartId]) => {
//   dispatch(deleteAllCartStart());
//   await axios
//     .delete(`http://localhost:8000/api/handle-Delete-All-Cartitem/${cartId}/`)
//     .then((res) => {
//       console.log(res.data);
//       message.success("Xóa Sản Phẩm Thành Công");
//       dispatch(deleteAllCartSuccess());
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
export const addNumberCart = async (dispatch, cartId, idProduct, qty) => {
  dispatch(addNumberCartStart());
  console.log(cartId);
  await axios
    .put("http://localhost:8000/api/update-amount-cart", {
      id: cartId,
      product_id: idProduct,
      amount: qty,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const addQuantityCart = async (dispatch, idCart, key) => {
  dispatch(addNumberCartStart());
  await axios
    .put("http://localhost:8000/api/plusminus-amount", {
      cart_id: idCart,
      key: key,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
