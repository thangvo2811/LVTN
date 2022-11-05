import axios from "axios";
import { loginFailure, loginStart, loginSuccess } from "./userLogin";
import { message } from "antd";

export const loginUser = async (dispatch, user, navigate) => {
  dispatch(loginStart());
  await axios
    .post("http://localhost:8000/api/get-user-login", user)
    .then((res) => {
      if (res.data.errorCode === 0) {
        message.success("ĐĂNG NHẬP THÀNH CÔNG");
        dispatch(loginSuccess(res.data));
        navigate("/");
      } else if (res.data.errorCode === 1) {
        message.error("SAI TÀI KHOẢN HOẶC MẬT KHẨU");
      }
    })
    .catch(() => {
      message.error("LỖI ĐĂNG NHẬP");
      dispatch(loginFailure());
    });
};
