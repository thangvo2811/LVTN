import { Button, Input } from "antd";
import React from "react";
import "./style.scss";

const Login = () => {
  return (
    <div className="login">
      <div className="login__container">
        <div className="login__title">Đăng nhập</div>
        <div className="login__content">
          <form>
            <div className="form-input">
              <label>Email</label>
              <Input type="email" placeholder="Email" />
              <label>Mật Khẩu</label>
              <Input type="password" placeholder="Password" />
            </div>
            <Button size="sm" animate2={true}>
              Đăng nhập
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
