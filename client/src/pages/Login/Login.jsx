import React, { useEffect, useState } from "react";

import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import Helmet from "../../components/Helmet";
import { loginUser, AddProductToCart } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";

const Login = () => {
  const [emailUser, setEmail] = useState("");
  const [passwordUser, setPassWord] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setEmail(e.target.value);
  };
  const handlePassWord = (e) => {
    setPassWord(e.target.value);
  };
  const onHandleSubmit = (e) => {
    e.preventDefault();
    const newUser = { email: emailUser, password: passwordUser };
    loginUser(dispatch, newUser, navigate);
  };

  return (
    <Helmet name="Đăng nhập">
      <div className="login">
        <div className="login__container">
          <div className="login__title">Đăng nhập</div>
          <div className="login__content">
            <form onSubmit={onHandleSubmit}>
              <div className="form-input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={inputHandler}
                />
                <label>Password</label>
                <input
                  type="password"
                  placeholder="Password"
                  onChange={handlePassWord}
                />
              </div>
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
                Bạn chưa có tài khoản ? <span> Đăng kí</span>
              </Link>
            </div>
            <div className="login__redirect">
              <Link to={"/register"}>
                <span> Quên mật khẩu ?</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Login;
