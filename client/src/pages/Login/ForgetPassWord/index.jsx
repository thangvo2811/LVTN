import React from "react";
import Button from "../../../components/Button";
import Helmet from "../../../components/Helmet";
import "./style.scss";

const ForgetPassWord = () => {
  return (
    <Helmet name="Đăng nhập">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Quên Mật Khẩu</div>
          <div className="forget-pw__content">
            <form>
              <div className="form-input">
                <label>Email</label>
                <input type="email" placeholder="Email" />
              </div>
              <Button size="xl" animate4={true}>
                Gửi
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ForgetPassWord;
