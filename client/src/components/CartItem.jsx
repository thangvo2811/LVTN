import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import lp from "../assets/images/products/chuot-choi-game-co-day-logitech-g502-hero.jpg";
import axios from "axios";
import { message } from "antd";
import Button from "./Button";

const CartItem = (props) => {
  const itemCart = props.cartItem;

  const [quantity, setQuantity] = useState(0);

  const handleDeleteProduct = async (id, e) => {
    e.preventDefault();
    await axios
      .delete(`http://localhost:8000/api/handle-Delete-Cartitem/${id}/`)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__image">
          <img src={lp} alt="" />
        </div>
        <div className="cart-item__info">
          <div className="cart-item__info__title">{itemCart.title}</div>
          <div className="cart-item__info__price">
            Đơn giá: {numberWithCommas(itemCart.unitprice)} VND
          </div>
          <div className="cart-item__info__brand">
            Thương hiệu: {itemCart.brand_id}
          </div>

          <div className="cart-item__info__id">Mã sp: {itemCart.id}</div>
        </div>
        <div className="cart-item__total">
          <div className="cart-item__total__quantity">
            <i className="bx bx-minus" onClick={decreaseQuantity}></i>
            <div>{itemCart.Cartitem.amount}</div>
            <i className="bx bx-plus" onClick={increaseQuantity}></i>
          </div>
          <div className="cart-item__total__total">
            Tổng :{" "}
            {numberWithCommas(itemCart.Cartitem.amount * itemCart.unitprice)}{" "}
            VND
          </div>
        </div>
        <div
          className="cart-item__delete"
          onClick={(e) => handleDeleteProduct(itemCart.id, e)}
        >
          <i className="bx bx-trash"></i>
        </div>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
