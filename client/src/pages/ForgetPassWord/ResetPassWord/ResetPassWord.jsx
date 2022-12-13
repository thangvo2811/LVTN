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
      name: "newPassWord",
      type: "password",
      placeholder: "Nhập mật khẩu mới",
      errorMessage: "Hãy nhập mật khẩu mới",
      label: "Mật khẩu mới",
      // pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    // {
    //   key: 2,
    //   name: "reNewPassWord",
    //   type: "password",
    //   placeholder: "Xác nhận mật khẩu",
    //   errorMessage: "Mật khẩu không trùng",
    //   label: "Xác nhận mật khẩu",
    //   required: true,
    // },
  ];
  const localUrl = "http://localhost:3000/password?";
  const callUpdatePassWord = async () => {
    const queryString = window.location.search.split("?");
    console.log("Query", queryString);
    await axios
      .put("http://localhost:8000/api/forgot-password/", {
        email: queryString,
        newpassword: newPassWord,
      })
      .then((res) => {
        console.log(res.data);
        message.success("Cập Nhật Mật Khẩu Thành Công");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleNewPw = (e) => {
    e.preventDefault();
    setNewPassWord(e.target.value);
  };

  return (
    <Helmet name="Quên Mật Khẩu">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Tạo Mật Khẩu Mới</div>
          <div className="forget-pw__content">
            <form>
              <div className="form-input">
                <FormInput {...inputs[0]} onchange={handleNewPw} />
                {/* <FormInput {...inputs[1]} /> */}
                {/* <label>Mật Khẩu Mới</label>
                <input
                  type="password"
                  placeholder="Mật Khẩu Mới"
                  onChange={handleNewPw}
                />
                <label>Nhập Lại Mật Khẩu Mới</label>
                <input
                  type="password"
                  placeholder="Nhập Lại Mật Khẩu Mới"
                  onChange={handleReNewPw}
                /> */}
              </div>
              <div className="btn-info">
                <button
                  type="submit"
                  className="btn-click"
                  onClick={() => callUpdatePassWord(newPassWord)}
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
