import axios from "axios";
import moment from "moment";
import React, { useCallback, useEffect, useState } from "react";
import { SectionTitle } from "../../../components/Section";
import ChangeName from "../ChangeName";
import ChangePassWord from "../ChangePassWord";
import ChangePhone from "../ChangePhone";

const MyAccount = () => {
  const [detailUser, setDetailUser] = useState({});
  const newCustomer = localStorage.getItem("User").toString();
  const callUser = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-by-Id/${newCustomer}`)
      .then((res) => {
        console.log(res.data.customer.user);
        setDetailUser(res.data.customer.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);
  useEffect(() => {
    callUser();
  }, [callUser, newCustomer]);
  return (
    <div className="user__content__right">
      <SectionTitle>Thông Tin Cá Nhân</SectionTitle>
      <div className="user__content__right__desc">
        {/* start user content right form */}
        <div className="user__content__right__desc__form">
          <input
            type="text"
            className="form-input"
            defaultValue={detailUser?.fullname}
            disabled
          />
          <input
            type="text"
            className="form-input"
            defaultValue={detailUser?.phonenumber}
            disabled
          />
          <input
            type="email"
            className="form-input"
            defaultValue={detailUser?.email}
            disabled
          />
          <input
            type="date"
            className="form-date"
            value={moment(detailUser?.birthday).format("YYYY-MM-DD")}
          />
          <input
            type="text"
            className="form-input"
            defaultValue={detailUser?.address}
            disabled
          />
        </div>
        {/* end user content right form */}

        {/* start user content right update */}
        <div className="user__content__right__desc__update">
          <h3>Số Điện Thoại & Họ Tên</h3>
          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bx-phone"></i>
              <span>Số Điện Thoại</span>
            </div>
            <ChangePhone
              phone={detailUser?.phonenumber}
              name={detailUser?.fullname}
              refresh={callUser}
            ></ChangePhone>
          </div>

          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bx-user"></i>
              <span>Họ Tên</span>
            </div>
            <ChangeName
              name={detailUser?.fullname}
              phone={detailUser?.phonenumber}
              refresh={callUser}
            ></ChangeName>
          </div>

          <h3 className="user__content__right__desc__update__pw">Mật Khẩu</h3>
          <div className="user__content__right__desc__update__info">
            <div className="user__content__right__desc__update__info__name">
              <i className="bx bxs-key"></i>
              <span>Mật Khẩu</span>
            </div>
            <ChangePassWord></ChangePassWord>
          </div>
        </div>
        {/* end user content right update */}
      </div>
    </div>
  );
};

export default MyAccount;
