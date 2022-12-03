import { loginFailure, loginStart, loginSuccess } from "./adminLogin";
import axios from "axios";
import { message } from "antd";

export const loginAdmin = async (dispatch, admin, navigate) => {
  dispatch(loginStart());
  await axios
    .post("http://localhost:8000/api/login-admin/", admin)
    .then((res) => {
      if (res.data.errorCode === 0) {
        message.success("Đăng Nhập Thành Công");
        dispatch(loginSuccess());
        localStorage.setItem("admin", res.data.data.id);
        localStorage.setItem("nameAdmin", res.data.data.fullname);
        navigate(window.history.back());
        return;
      }
      if (!res.data.password || !res.data.email) {
        message.error("Sai Mật Khẩu Hoặc Email");
        return;
      }
    })
    .catch((err) => {
      console.log(err);
      dispatch(loginFailure());
    });
};
