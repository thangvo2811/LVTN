import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Button from "../components/Button";

import numberWithCommas from "../utils/numberWithCommas";
import InputEmoji from "react-input-emoji";

import pf from "../assets/images/UserProfile/man.jpg";
import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const ProductView = (props) => {
  const param = useParams();
  const [quantity, setQuantity] = useState(0);
  const [text, setText] = useState("");
  const [optionProduct, setOptionProduct] = useState([]);

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
  const newUser = useSelector((state) => state.user.currentUser);

  const callOptionProduct = async () => {
    await axios
      .get(`http://localhost:8000/api/get-option-by-product-id/${1}/`)
      .then((res) => {
        console.log(res);
        setOptionProduct(res.data.Option);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callOptionProduct();
  }, []);
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
          <div className="product-top__info__content">
            <div className="product-top__info__content__desc">
              <div className="product-top__info__content__desc__price">
                {props.priceProduct ? numberWithCommas(props.priceProduct) : ""}{" "}
                VND
              </div>
              <div className="product-top__info__content__desc__brand">
                Thương hiệu: {props.brandProduct ? props.brandProduct : ""}
              </div>
              <div className="product-top__info__content__desc__category">
                Danh mục: {props.cateProduct ? props.cateProduct : ""}
              </div>
              <div className="product-top__info__status">
                Trạng thái: {props.statusProduct ? props.statusProduct : ""}
              </div>
            </div>
            <div className="product-top__info__content__option">
              <div className="product-top__info__content__option__top">
                <div className="product-top__info__content__option__top__color">
                  <div className="product-top__info__content__option__top__color__name">
                    White
                  </div>
                  <div className="product-top__info__content__option__top__color__price">
                    3000000000000000
                  </div>
                </div>
              </div>

              <div className="product-top__info__content__option__bottom">
                <div className="product-top__info__content__option__bottom__memory">
                  <div className="product-top__info__content__option__bottom__memory__name">
                    512GB
                  </div>
                  <div className="product-top__info__content__option__bottom__memory__price">
                    3000000000000000
                  </div>
                </div>
              </div>
            </div>
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
      {newUser ? (
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
      ) : (
        ""
      )}

      {/* end product comment */}
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
