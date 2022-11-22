import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "../components/Button";
import numberWithCommas from "../utils/numberWithCommas";
import InputEmoji from "react-input-emoji";
import { FaStar } from "react-icons/fa";

import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";

import pf from "../assets/images/products/laptop-asus-tuf-gaming-f15-fx506lh_4_.jpg";
import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";

import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart } from "../redux/apiCalls.js";
import axios from "axios";

const ProductView = (props) => {
  const param = useParams();
  const [quantity, setQuantity] = useState(1);
  const [text, setText] = useState("");
  const [commentProduct, setCommentProduct] = useState([]);

  const imgs = [
    {
      id: 0,
      value: pd,
    },
    {
      id: 1,
      value: pf,
    },
    {
      id: 2,
      value: pd,
    },
  ];
  const [slider, setSlider] = useState(imgs[0]);

  const callCommentProduct = async () => {
    await axios
      .get(
        `http://localhost:8000/api/get-comment-of-product/${param.category_id}/`
      )
      .then((res) => {
        console.log(res.data.Comment);
        setCommentProduct(res.data.Comment);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    callCommentProduct();
  }, [param.category_id]);

  useEffect(() => {}, [param.id]);
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    setQuantity(quantity < 2 ? 1 : quantity - 1);
  };

  const handleOnEnter = (text) => {
    console.log("Customer:", text);
  };

  // const newUser = useSelector((state) => state.user.currentUser);

  const newCustomer = localStorage.getItem("User");

  const handleClick = (index) => {
    console.log(index);
    const imgSlider = imgs[index];
    setSlider(imgSlider);
  };

  const dispatch = useDispatch();
  const handleAddCart = () => {
    console.log("add cart");
    const newProduct = props.product_id;
    addCart(dispatch, newCustomer, newProduct);
  };

  return (
    <div className="product">
      <div className="product-top">
        <div className="product-top__images">
          <div className="product-top__images__main">
            <img src={slider.value} alt="" />
          </div>
          <div className="product-top__images__sub">
            {imgs?.map((item, index) => (
              <img src={item.value} alt="" onClick={() => handleClick(index)} />
            ))}
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
              <div className="product-top__info__quantity">
                <i className="bx bx-minus" onClick={decreaseQuantity}></i>
                <div>{quantity}</div>
                <i className="bx bx-plus" onClick={increaseQuantity}></i>
              </div>
              <div className="product-top__info__cart">
                <Button size="sm" animate2={true}>
                  mua ngay
                </Button>
                <Button
                  size="sm"
                  animate2={true}
                  onClick={() => {
                    handleAddCart();
                  }}
                >
                  thêm vào giỏ hàng
                </Button>
              </div>
            </div>

            {/* Start option product */}
            <div className="product-top__info__content__select">
              {/* start option name product */}
              <div className=" product-top__info__content__select__left">
                <div className="product-top__info__content__select__left__title">
                  {props.optionNameProduct}
                </div>
              </div>

              {/* end option name product */}

              {/* start option attribute product */}
              <div className=" product-top__info__content__select__right">
                {props.optionAttribute}
              </div>
              {/* end */}
            </div>
            {/* end */}
          </div>
        </div>
      </div>

      {/* detail Product */}
      <div className="product-bottom">
        <div className="product-bottom__title">chi tiết sản phẩm</div>
        <div className="product-bottom__description">{props.desProduct}</div>
      </div>
      {/* end detail product */}

      {/* start prodcut comment */}
      {newCustomer ? (
        <div className="product__comment">
          <div className="product__comment__title">Comments</div>
          <div className="product__comment__content">
            <div className="product__comment__content__image">
              <img src={pf} alt="" />
            </div>
            <div className="product__comment__content__cmt">
              <div className="product__comment__content__cmt__type">
                <InputEmoji
                  value={text}
                  onChange={setText}
                  // cleanOnEnter
                  onEnter={handleOnEnter}
                  placeholder="Write comments"
                />
              </div>
              <div className="product__comment__content__cmt__rate">
                <Rating name="half-rating" defaultValue={0} precision={0.5} />
              </div>
            </div>
          </div>
          {commentProduct?.map((item, index) => {
            return (
              <div className="product__comment__content__desc">
                <div className="product__comment__content__desc__img">
                  <img src={pf} alt="" />
                </div>
                <div className="product__comment__content__desc__type">
                  <div className="product__comment__content__desc__type__user">
                    {item?.commentUser?.fullname}
                  </div>
                  <div className="product__comment__content__desc__type__key">
                    {item?.description}{" "}
                  </div>
                  <div className="product__comment__content__desc__type__rate">
                    {item?.rate ? (
                      <Rating
                        name="half-rating"
                        defaultValue={item.rate}
                        readOnly
                      />
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="product__comment__content__desc__type__features">
                    <div className="product__comment__content__desc__type__features__delete">
                      Xóa
                    </div>
                    <div className="product__comment__content__desc__type__features__update">
                      Sửa
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="product__comment">
          <div className="product__comment__title">Comments</div>
          {commentProduct?.map((item, index) => {
            return (
              <div className="product__comment__content__desc">
                <div className="product__comment__content__desc__img">
                  <img src={pf} alt="" />
                </div>
                <div className="product__comment__content__desc__type">
                  <div className="product__comment__content__desc__type__user">
                    {item?.commentUser?.fullname}
                  </div>
                  <div className="product__comment__content__desc__type__key">
                    {item?.description}{" "}
                  </div>
                  <div className="product__comment__content__desc__type__rate">
                    {item?.rate ? (
                      <Rating
                        name="half-rating"
                        defaultValue={item.rate}
                        readOnly
                      />
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* end product comment */}
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
