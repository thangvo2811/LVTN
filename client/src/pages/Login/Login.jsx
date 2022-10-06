import React, { useEffect, useState } from "react";

import FormInput from "../../components/FormInput";

import Button from "../../components/Button";
import { Link } from "react-router-dom";
import Helmet from "../../components/Helmet";
import axios from "axios";

const Login = () => {
  const callUser = async () => {
    await axios.get("http://localhost:8000/api/get-user-login").then((res) => {
      console.log(res);
    });
  };
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const inputs = [
    {
      name: "email",
      type: "email",
      placeholder: "Tài khoản",
      errorMessage: "",
      label: "Email",
    },
    {
      name: "password",
      type: "password",
      placeholder: "Mật khẩu",
      errorMessage: "",
      label: "Mật khẩu",
    },
  ];
  const inputHandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    callUser();
  };
  console.log(values);
  return (
    <Helmet name="Đăng nhập">
      <div className="login">
        <div className="login__container">
          <div className="login__title">Đăng nhập</div>
          <div className="login__content">
            <form onSubmit={onHandleSubmit}>
              {inputs.map((input, index) => {
                return (
                  <FormInput
                    key={index}
                    {...input}
                    onChange={inputHandler}
                    value={values[input.name]}
                  ></FormInput>
                );
              })}
              <Button size="sm" animate2={true}>
                Đăng nhập
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
            <div className="login__redirect">
              <Link to={"/register"}>
                Bạn chưa có tài khoản? <span> Đăng kí</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
