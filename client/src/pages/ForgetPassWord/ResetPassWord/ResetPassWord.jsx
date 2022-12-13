import React from "react";
import Helmet from "../../../components/Helmet";

const ResetPassWord = () => {
  return (
    <Helmet name="Quên Mật Khẩu">
      <div className="forget-pw">
        <div className="forget-pw__container">
          <div className="forget-pw__title">Tạo Mật Khẩu Mới</div>
          <div className="forget-pw__content">
            <form>
              <div className="form-input">
                <label>Mật Khẩu Mới</label>
                <input type="password" placeholder="Mật Khẩu Mới" />
                <label>Nhập Lại Mật Khẩu Mới</label>
                <input type="password" placeholder="Nhập Lại Mật Khẩu Mới" />
              </div>
              <div className="btn-info">
                <button type="submit" className="btn-click">
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
