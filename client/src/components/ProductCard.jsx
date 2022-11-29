import React from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import { useNavigate } from "react-router-dom";

import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";

const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();

  return (
    <>
      <div className="product-card">
        <div className="product-card__image">
          <img
            src={product.img}
            alt=""
            onError={(e) => {
              e.target.setAttribute("src", pd);
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
          <i className="bx bxs-cart-add"></i>
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
