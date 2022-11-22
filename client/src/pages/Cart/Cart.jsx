import React, { useState, useEffect } from "react";

import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import Helmet from "../../components/Helmet";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import numberWithCommas from "../../utils/numberWithCommas";
import axios from "axios";
import { AddProductToCart } from "../../redux/apiCalls";

const Cart = () => {
  const [products, setProducts] = useState();
  // const [totalPrice, setTotalPrice] = useState();
  // const [totalProduct, setTotalProduct] = useState();
  return (
    <Helmet name="Giỏ hàng">
      <div className="cart">
        <div className="cart__item">
          {products?.map((item, index) => {
            return <CartItem item={item} key={index}></CartItem>;
          })}
        </div>
        <div className="cart__info">
          <div className="cart__info__content">
            <div className="cart__info__content__title">Tổng Kết</div>
            <div className="cart__info__content__item">
              <div className="cart__info__content__item__title">Tiền ship</div>
              <div className="cart__info__content__item__price">0,000 VND</div>
            </div>
            <div className="cart__info__content__item">
              <div className="cart__info__content__item__title">
                Tổng sản phẩm
              </div>
              <div className="cart__info__content__item__price">
                {/* {totalProduct ? totalProduct : ""} */}
              </div>
            </div>
            <div className="cart__info__content__item">
              <div className="cart__info__content__item__title">Thanh toán</div>
              <div className="cart__info__content__item__price">
                {/* {totalPrice ? numberWithCommas(totalPrice) : ""} VND */}
              </div>
            </div>
            <div className="cart__info__content__item cart__info__content__item__main">
              <div className="cart__info__content__item__title">Tổng</div>
              <div className="cart__info__content__item__price">
                {/* {totalPrice ? numberWithCommas(totalPrice) : ""} VND */}
              </div>
            </div>
          </div>
          <div className="cart__info__btn cart__info__btn__payment">
            <Button size="stable" animate3={true}>
              <Link to={"/payment"}>Tiếp tục thanh toán</Link>
            </Button>
          </div>
          <div className="cart__info__btn cart__info__btn__cart">
            <Button size="stable" animate3={true}>
              <Link to={"/product"}>tiếp tục mua hàng</Link>
            </Button>
          </div>
        </div>
      </div>
    </Helmet>
  );
};

export default Cart;
