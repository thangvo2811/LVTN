import React, { useState } from "react";

import "../../scss/index.scss";

import { Link } from "react-router-dom";

import Dropdown from "../dropdown/Dropdown";

import ThemeMenu from "../thememenu/ThemeMenu";

import notifications from "../../assets/JsonData/notification.json";

import user_image from "../../assets/images/man.png";

import user_menu from "../../assets/JsonData/user_menus.json";
import axios from "axios";
import { useEffect } from "react";
import { message } from "antd";
const nameAdmin = localStorage.getItem("nameAdmin");

const curr_user = {
  display_name: nameAdmin,
  image: user_image,
};

const renderNotificationItem = (item, index) => (
  <div className="notification-item" key={index}>
    <i className={item.icon}></i>
    <span>{item.content}</span>
  </div>
);

const renderUserToggle = (user) => (
  <div className="topnav__right-user">
    <div className="topnav__right-user__image">
      <img src={user.image} alt="" />
    </div>
    <div className="topnav__right-user__name">{user.display_name}</div>
  </div>
);

const renderUserMenu = (item, index) => (
  <Link to="/login" key={index}>
    <div
      className="notification-item"
      onClick={() => {
        window.location.href = "/login";
      }}
    >
      <i className={item.icon}></i>
      <span>{item.content}</span>
    </div>
  </Link>
);

const Topnav = () => {
  const [orderCus, setOrderCus] = useState();

  const callAllOrderCus = async () => {
    await axios
      .get("http://localhost:8000/api/get-all-order-status-1/")
      .then((res) => {
        setOrderCus(res.data.order);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const notificationOrder = [
    {
      icon: "bx bx-cart",
      content: `Có ${orderCus} Đơn Hàng Chưa Xác Nhận `,
    },
  ];

  useEffect(() => {
    callAllOrderCus();
  }, []);
  return (
    <div className="topnav">
      <div className="topnav__search">
        {/* <input type="text" placeholder="Search here..." />
        <i className="bx bx-search"></i> */}
      </div>
      <div className="topnav__right">
        <div className="topnav__right-item">
          {/* dropdown here */}
          <Dropdown
            customToggle={() => renderUserToggle(curr_user)}
            contentData={user_menu}
            renderItems={(item, index) => renderUserMenu(item, index)}
          />
        </div>
        <div className="topnav__right-item">
          <Dropdown
            icon="bx bx-bell"
            badge={orderCus}
            contentData={notificationOrder}
            renderItems={(item, index) => renderNotificationItem(item, index)}
            // renderFooter={() => <Link to="/">View All</Link>}
          />
          {/* dropdown here */}
        </div>
        <div className="topnav__right-item">
          <ThemeMenu />
        </div>
      </div>
    </div>
  );
};

export default Topnav;
