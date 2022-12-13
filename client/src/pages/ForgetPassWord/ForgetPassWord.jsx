import React, { useState } from "react";
import Button from "../../components/Button";
import Helmet from "../../components/Helmet";
import "./style.scss";
import axios from "axios";
import { message } from "antd";

const ForgetPassWord = () => {
  const [newEmail, setNewEmail] = useState("");
  const handleForgetPassWord = async () => {
    await axios
      .post("http://localhost:8000/api/forgot-password/", {
        email: newEmail,
      })
      .then((res) => {
        if (newEmail === "") {
          message.error("Mời Bạn Nhập Email");
          return;
        }
        if (res.data.errCode === 1) {
          message.error("Email Không Tồn Tại");
          return;
        }
        console.log(res.data);
        message.success("Vui Lòng Kiểm Tra Email");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleForgetPassWord();
  };
  return (
    <Helmet name="Quên Mật Khẩu">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Quên Mật Khẩu</div>
          <div className="forget-pw__content">
            <form onSubmit={handleSubmit}>
              <div className="form-input">
                <label>Email</label>
                <input
                  type="email"
                  placeholder="Email"
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </div>
              <div className="btn-info">
                <button type="submit" className="btn-click">
                  Gửi
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ForgetPassWord;
