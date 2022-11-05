import React, { useState } from "react";

import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import axios from "axios";
import "antd/dist/antd.css";
import { Button, message, Space } from "antd";
// import Button from "./../../components/Button";

const Register = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
    username: "",
    phone: "",
    birthday: "",
  });

  const [email, setEmail] = useState("");
  const [password, setPassWord] = useState("");
  const [userName, setUserName] = useState("");
  const [phone, setPhone] = useState("");
  const [birthDay, setBirthDay] = useState("");

  const callApi = async () => {
    await axios
      .post("http://localhost:8000/api/sign-up-user/", {
        email: email,
        password: password,
        fullname: userName,
        phonenumber: phone,
        avatar: "",
        birthday: birthDay,
      })
      .then((res) => {
        if (res.data.errCode === 0) {
          message.success("ĐĂNG KÝ THÀNH CÔNG");
        }
        if (res.data.errCode === 1) {
          message.error("TRÙNG EMAIL");
        }
        if (res.data.errCode === 2) {
          message.error("THIẾU THÔNG TIN");
        }
        setValues(res);
      })
      .catch(() => {
        message.error("Fail");
      });
  };

  // const inputs = [
  //   {
  //     name: "email",
  //     type: "email",
  //     placeholder: "Email",
  //     errorMessage: "Email không hợp lệ",
  //     label: "Email",
  //     pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
  //     required: true,
  //   },

  //   {
  //     name: "password",
  //     type: "password",
  //     placeholder: "Password",
  //     errorMessage:
  //       "Password giới hạn từ 8-20 kí tự và có ít nhất một kí tự chữ, một kí tự số",
  //     label: "Mật khẩu",
  //     // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
  //     required: true,
  //   },

  //   {
  //     name: "username",
  //     type: "text",
  //     placeholder: "Full name",
  //     errorMessage: "Fullname không được trống",
  //     label: "Full Name",
  //     pattern: null,
  //     required: true,
  //   },
  //   {
  //     name: "phone",
  //     type: "text",
  //     placeholder: "Phone",
  //     errorMessage: "Phone phải có ít nhất 10 số",
  //     label: "Phone",
  //     pattern: "[0-9]{10}",
  //     required: true,
  //   },
  //   {
  //     name: "birthday",
  //     type: "date",
  //     placeholder: "Date of birth",
  //     errorMessage: "Date of birth không được trống",
  //     label: "Date of birth",
  //     pattern: "mm-dd-yyyy",
  //     required: true,
  //   },
  // ];

  // const onChangeHandler = (e) => {
  //   setValues({ ...values, [e.target.name]: e.target.value });
  // };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassWord(e.target.value);
  };
  const handleName = (e) => {
    setUserName(e.target.value);
  };
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  const handleDate = (e) => {
    setBirthDay(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    callApi();
  };

  return (
    <Helmet name="Đăng kí">
      <div className="register">
        <div className="register__container">
          <div className="register__title">Đăng kí</div>
          <div className="register__content">
            <form>
              <div className="form-input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={handleEmail}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handlePassword}
                />
                <label>UserName</label>
                <input
                  type="text"
                  placeholder="UserName"
                  onChange={handleName}
                />
                <label>Phone</label>
                <input
                  type="phone"
                  placeholder="Phone"
                  onChange={handlePhone}
                />
                <label>Date of birth</label>
                <input
                  type="date"
                  placeholder="Date of birth"
                  onChange={handleDate}
                />
              </div>

              <Button onClick={onHandleSubmit} size="large" type="primary">
                Đăng ký
              </Button>
            </form>
            <div className="login__sign">
              <div className="login__sign__phone">
                <div className="login__sign__phone__icon">
                  <i class="bx bxs-user"></i>
                </div>
                <div className="login__btnphone">
                  Sử dụng email/ Số điện thoại
                </div>
              </div>
              <div className="login__sign__gg">
                <div className="login__sign__gg__icon">
                  <i class="bx bxl-google"></i>
                </div>
                <div className="login__btngg">Tiếp tục với Google</div>
              </div>
              <div className="login__sign__fb">
                <div className="login__sign__fb__icon">
                  <i class="bx bxl-facebook-circle"></i>
                </div>
                <div className="login__btnfb">Tiếp tục với facebook</div>
              </div>
            </div>
            <div className="register__redirect">
              <Link to={"/login"}>
                <span>Đã có tài khoản? Đăng nhập</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Register;
