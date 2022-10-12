import React from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { addItem } from "../redux/cart-item/cartItemRedux";
import { useState, useEffect } from "react";
import pf from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";

import axios from "axios";

const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHandleAddCartItem = () => {
    // const newItem = {
    //   productId: product.productId,
    //   title: product.title,
    //   price: product.price,
    //   brand: product.brand,
    //   quantity: 1,
    // };
    // dispatch(addItem(newItem));
  };
  return (
    <>
      <div className="product-card">
        <div className="product-card__image">
          <img
            src={product.ProductImg}
            alt=""
            onError={(e) => {
              e.target.setAttribute("src", pf);
            }}
          />
        </div>
        <div className="product-card__interact">
          <div
            className="product-card__interact__btn"
            onClick={() => navigate("/detailproduct/" + product.id)}
          >
            Xem ngay
          </div>
          <i className="bx bxs-cart-add" onClick={onHandleAddCartItem}></i>
          <i className="bx bx-heart-circle"></i>
        </div>
        <div className="product-card__info">
          <div className="product-card__info__title">{product.name}</div>
          <div className="product-card__info__price">
            {numberWithCommas(product.unitprice)} VNĐ
          </div>
        </div>
      </div>
    </>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object,
};

export default ProductCard;
