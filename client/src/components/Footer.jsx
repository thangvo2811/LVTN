import React from "react";

import Grid from "./Grid";

import logo from "../assets/images/prologo1.png";
import { Link } from "react-router-dom";

const footerAboutLink = [
  {
    display: "Giới thiệu",
    path: "/about",
  },
  {
    display: "Liên hệ",
    path: "/about",
  },
  {
    display: "Tin tức",
    path: "/about",
  },
  {
    display: "Tuyển dụng",
    path: "/about",
  },
  {
    display: "Hệ thống cửa hàng",
    path: "/about",
  },
];

const footerCustomerLink = [
  {
    display: "Chính sách đổi trả",
    path: "/about",
  },
  {
    display: "Chính sách bảo hành",
    path: "/about",
  },
  {
    display: "Chính sách hoàn tiền",
    path: "/about",
  },
];

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <Grid col={4} mdCol={2} smCol={1} gap={20}>
          <div>
            <div className="footer__title">Tổng đài hỗ trợ</div>
            <div className="footer__content">
              <p>
                Liên hệ đặt hàng <strong>0945678912</strong>
              </p>
              <p>
                Thắc mắc đơn hàng <strong>0945678912</strong>
              </p>
              <p>
                Hỗ trợ khách hàng <strong>0945678912</strong>
              </p>
            </div>
          </div>
          <div>
            <div className="footer__title">About</div>
            <div className="footer__content">
              {footerAboutLink.map((item, index) => {
                return (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <div className="footer__title">Chăm sóc khách hàng</div>
            <div className="footer__content">
              {footerCustomerLink.map((item, index) => {
                return (
                  <p key={index}>
                    <Link to={item.path}>{item.display}</Link>
                  </p>
                );
              })}
            </div>
          </div>
          <div>
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Consequatur itaque dolorem vel accusantium reprehenderit modi id
              sunt beatae facilis nesciunt.
            </p>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
