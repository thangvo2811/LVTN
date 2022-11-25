import axios from "axios";
import React from "react";
import { loginFailure, loginStart, loginSuccess } from "./userLogin";
import { message } from "antd";
import { addCartSuccess, addStart } from "./cartRedux";

export const loginUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  await axios
    .post("http://localhost:8000/api/get-user-login", user)
    .then((res) => {
      if (res.data.errorCode === 0) {
        message.success("ĐĂNG NHẬP THÀNH CÔNG");
        dispatch(loginSuccess(res.data));
        localStorage.setItem("User", res.data.data.id);
        localStorage.setItem("nameUser", res.data.data.fullname);
        navigate("/");
      } else if (!res.data.password || !res.data.email) {
        message.error("SAI MẬT KHẨU HOẶC EMAIL");
      }
    })
    .catch(() => {
      message.error("ĐĂNG NHẬP THẤT BẠI");
      dispatch(loginFailure());
    });
};
export const addCart = async (dispatch, user, idProduct) => {
  dispatch(addStart());
  await axios
    .post("http://localhost:8000/api/add-to-cart", {
      cus_id: parseInt(user),
      product_id: idProduct,
    })
    .then((res) => {
      if (res.data.errCode === 0) {
        message.success("THÊM SẢN PHẨM THÀNH CÔNG");
      }
      localStorage.setItem(
        "cartItem",
        parseInt(localStorage.getItem("cartItem")) + 1
      );
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
