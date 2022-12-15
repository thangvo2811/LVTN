import React, { useState } from "react";
import Helmet from "../../../components/Helmet";
import axios from "axios";

import { message } from "antd";
import { useNavigate } from "react-router-dom";
import FormInput from "../../../components/FormInput";

const ResetPassWord = () => {
  const [newPassWord, setNewPassWord] = useState("");
  const [reNewPassWord, setReNewPassWord] = useState("");

  const navigate = useNavigate();

  const inputs = [
    {
      key: 1,
      name: "password",
      type: "password",
      placeholder: "Nhập mật khẩu mới",
      errorMessage: "Hãy nhập mật khẩu mới",
      value: newPassWord,
      label: "Mật khẩu mới",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },

    {
      key: 2,
      name: "reNewPassWord",
      type: "password",
      placeholder: "Xác nhận mật khẩu",
      errorMessage: "Mật khẩu không trùng",
      value: reNewPassWord,
      label: "Xác nhận mật khẩu",
      pattern: newPassWord,
      required: true,
    },
  ];

  const callUpdatePassWord = async (e) => {
    e.preventDefault();
    const queryString = window.location.search.split("?");
    const filter = queryString.filter((item) => item !== "");
    await axios
      .put("http://localhost:8000/api/forgot-password/", {
        email: filter,
        newpassword: newPassWord,
      })
      .then((res) => {
        if (res.data.errCode === 0) {
          console.log(res.data);
          navigate("/login");
          setTimeout(() => {
            message.success("Cập Nhật Mật Khẩu Thành Công");
          }, 1000);
          return;
        }
        message.error("Cập Nhật Mật Khẩu Thất Bại");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewPassword = (e) => {
    e.preventDefault();
    setNewPassWord(e.target.value);
  };
  const handleRePassword = (e) => {
    e.preventDefault();
    setReNewPassWord(e.target.value);
  };

  return (
    <Helmet name="Quên Mật Khẩu">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Tạo Mật Khẩu Mới</div>
          <div className="forget-pw__content">
            <form>
              <div className="form-input">
                <FormInput
                  {...inputs[0]}
                  onChange={handleNewPassword}
                ></FormInput>
                <FormInput
                  {...inputs[1]}
                  onChange={handleRePassword}
                ></FormInput>
              </div>
              <div className="btn-info">
                <button
                  type="submit"
                  className="btn-click"
                  onClick={(e) => callUpdatePassWord(e, newPassWord)}
                >
                  Cập Nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default ResetPassWord;
