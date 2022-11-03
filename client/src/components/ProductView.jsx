import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";

import numberWithCommas from "../utils/numberWithCommas";
import InputEmoji from "react-input-emoji";

import pf from "../assets/images/UserProfile/man.jpg";
import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";

import { useParams } from "react-router-dom";

const ProductView = (props) => {
  const param = useParams();
  const [quantity, setQuantity] = useState(0);
  const [text, setText] = useState("");

  useEffect(() => {}, [param.id]);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity - 1 < 0 ? 0 : quantity - 1);
  };

  const handleOnEnter = (text) => {
    console.log("User: ", text);
  };

  return (
    <div className="product">
      <div className="product-top">
        <div className="product-top__images">
          <div className="product-top__images__main">
            <img
              src={props.imgProduct}
              alt=""
              onError={(e) => {
                e.target.setAttribute("src", pd);
              }}
            />
          </div>
          <div className="product-top__images__sub">
            <img
              src={props.imgProduct}
              alt=""
              onError={(e) => {
                e.target.setAttribute("src", pd);
              }}
            />
            <img
              src={props.imgProduct}
              alt=""
              onError={(e) => {
                e.target.setAttribute("src", pd);
              }}
            />
            <img
              src={props.imgProduct}
              alt=""
              onError={(e) => {
                e.target.setAttribute("src", pd);
              }}
            />
          </div>
        </div>
        <div className="product-top__info">
          <div className="product-top__info__title">{props.nameProduct}</div>
          <div className="product-top__info__price">
            {props.priceProduct ? numberWithCommas(props.priceProduct) : ""} VND
          </div>
          <div className="product-top__info__brand">
            Thương hiệu: {props.brandProduct ? props.brandProduct : ""}
          </div>
          <div className="product-top__info__category">
            Danh mục: {props.cateProduct ? props.cateProduct : ""}
          </div>
          <div className="product-top__info__status">
            Trạng thái: {props.statusProduct}{" "}
          </div>
          <div className="product-top__info__quantity">
            <i className="bx bx-minus" onClick={decreaseQuantity}></i>
            <div>{quantity}</div>
            <i className="bx bx-plus" onClick={increaseQuantity}></i>
          </div>
          <div className="product-top__info__cart">
            <Button size="sm" animate2={true}>
              mua ngay
            </Button>
            <Button size="sm" animate2={true}>
              thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </div>
      <div className="product-bottom">
        <div className="product-bottom__title">chi tiết sản phẩm</div>
        <div className="product-bottom__description">{props.desProduct}</div>
      </div>

      {/* start prodcut comment */}
      <div className="product__comment">
        <div className="product__comment__title">Comments</div>
        <div className="product__comment__content">
          <div className="product__comment__content__image">
            <img src={pf} alt="" />
          </div>
          <div className="product__comment__content__cmt">
            <InputEmoji
              value={text}
              onChange={setText}
              // cleanOnEnter
              onEnter={handleOnEnter}
              placeholder="Write comments"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
