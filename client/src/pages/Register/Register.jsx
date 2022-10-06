import React, { useState } from "react";

import FormInput from "../../components/FormInput";

import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    // confirmPassword: "",
    email: "",
    phone: "",
  });

  const callApi = async () => {
    await axios
      .post("http://localhost:8000/api/sign-up-user/", {
        fullname: values.username,
        password: values.password,
        email: values.email,
        phonenumber: values.phone,
        avatar: "1212",
      })
      .then((res) => {
        console.log(res);
        setValues(res);
      });
  };

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "Email không hợp lệ",
      label: "Email",
      pattern: "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+[a-zA-Z0-9-.]+$",
      required: true,
    },

    {
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage:
        "Password giới hạn từ 8-20 kí tự và có ít nhất một kí tự chữ, một kí tự số",
      label: "Mật khẩu",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    // {
    //   name: "confirmPassword",
    //   type: "password",
    //   placeholder: "Confirm Password",
    //   errorMessage: "Password không trùng",
    //   label: "Xác nhận mật khẩu",
    //   pattern: values.password,
    //   required: true,
    // },
    {
      name: "Full Name",
      type: "text",
      placeholder: "Full name",
      errorMessage: "Fullname không được trống",
      label: "Full Name",
      pattern: null,
      required: true,
    },
    {
      name: "phone",
      type: "text",
      placeholder: "Phone",
      errorMessage: "Phone phải có ít nhất 10 số",

      label: "Phone",
      pattern: "[0-9]{10}",
      required: true,
    },
  ];

  const onChangeHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
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
            <form onSubmit={onHandleSubmit}>
              {inputs.map((input, index) => {
                return (
                  <FormInput
                    key={index}
                    {...input}
                    value={values[input.name]}
                    onChange={onChangeHandler}
                  ></FormInput>
                );
              })}
              <Button size="sm" animate2={true}>
                đăng kí
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
