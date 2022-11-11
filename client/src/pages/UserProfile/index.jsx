import React, { useCallback } from "react";
import "./_userprofile.scss";
import pf from "../../assets/images/UserProfile/man.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import moment from "moment";
import { DatePicker } from "antd";
import "moment/locale/zh-cn";

const UserProfile = () => {
  const [detailUser, setDetailUser] = useState({});
  const newCustomer = localStorage.getItem("User").toString();
  console.log("asd");
  const callUser = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-by-Id/${newCustomer}`)
      .then((res) => {
        setDetailUser(res.data.customer);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [newCustomer]);
  useEffect(() => {
    callUser();
  }, [callUser, newCustomer]);

  let newDate1 = new Date();
  newDate1 = detailUser.birthday;
  console.log(newDate1);
  return (
    <>
      <div className="user__profile">
        <p className="user__profile__url">
          Home | <span className="user__profile__url__main">My account</span>
        </p>
      </div>
      <div className="user__content">
        {/* star user content left */}
        <div className="user__content__left">
          <div className="user__content__left__profile">
            <img
              src={pf}
              alt=""
              className="user__content__left__profile__img"
            />
            <div className="user__content__left__profile__name">
              {detailUser.fullname}
            </div>
          </div>
          <div className="user__content__left__card">
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>Personal Information</span>
            </div>
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>My Address</span>
            </div>
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>My Wishlist</span>
            </div>
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>Order List</span>
            </div>
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>My Voucher</span>
            </div>
            <div className="user__content__left__card__item">
              <i className="bx bx-user "></i>
              <span>My Voucher</span>
            </div>
          </div>
        </div>
        {/* end user content left */}

        {/* start user content right */}
        <div className="user__content__right">
          <div className="user__content__right__profile">
            Personal Information
          </div>

          <div className="user__content__right__desc">
            {/* start user content right form */}
            <div className="user__content__right__desc__form">
              <input
                type="text"
                className="form-input"
                placeholder={detailUser?.fullname}
                disabled
              />
              <input
                type="email"
                className="form-input"
                placeholder={detailUser?.email}
                disabled
              />
              {/* <input
                className="form-date"
                value={moment(detailUser.birthday).format("MM/DD/YYYY")}
              /> */}
              <DatePicker defaultValue={moment("2022-01-01", "YYYY-MM-DD")} />
              <select className="form-input">
                <option value="0" selected disabled>
                  Select your gender
                </option>
                <option value="1">Male</option>
                <option value="2">Female</option>
                <option value="3">Other</option>
              </select>
              <div className="user__content__right__desc__form__submit">
                <input type="submit" value="Save" className="form-submit" />
              </div>
            </div>
            {/* end user content right form */}

            {/* start user content right update */}
            <div className="user__content__right__desc__update">
              <h3>Phone and Email</h3>
              <div className="user__content__right__desc__update__info">
                <div className="user__content__right__desc__update__info__name">
                  <i className="bx bx-user"></i>
                  <span>{detailUser?.phonenumber}</span>
                </div>
                <button className="user__content__right__desc__update__info__name__btn">
                  Update
                </button>
              </div>

              <div className="user__content__right__desc__update__info">
                <div className="user__content__right__desc__update__info__name">
                  <i className="bx bx-user"></i>
                  <span>{detailUser?.email}</span>
                </div>
                <button className="user__content__right__desc__update__info__name__btn">
                  Update
                </button>
              </div>

              <h3 className="user__content__right__desc__update__pw">
                Security
              </h3>
              <div className="user__content__right__desc__update__info">
                <div className="user__content__right__desc__update__info__name">
                  <i className="bx bx-user"></i>
                  <span>PassWord</span>
                </div>
                <button className="user__content__right__desc__update__info__name__btn">
                  Update
                </button>
              </div>
            </div>
            {/* end user content right update */}
          </div>
        </div>
        {/* end user content right */}
      </div>
    </>
  );
};

export default UserProfile;
