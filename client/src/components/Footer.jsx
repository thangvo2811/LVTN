import React from "react";

import Grid from "./Grid";

// import logo from "../assets/images/prologo1.png";
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
const footerCustomerContact = [
  {
    display: "phunguyen@gmail.com",
    path: "/about",
  },
  {
    display: "vohoangthang2811@gmail.com",
    path: "/about",
  },
  {
    display: "0909090909",
    path: "/about",
  },
  {
    display: "0908070605",
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
            <div>
              <div className="footer__title">Thông Tin Liên Hệ</div>
              <div className="footer__content">
                {footerCustomerContact.map((item, index) => {
                  return (
                    <p key={index}>
                      <Link to={item.path}>{item.display}</Link>
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        </Grid>
      </div>
    </div>
  );
};

export default Footer;
