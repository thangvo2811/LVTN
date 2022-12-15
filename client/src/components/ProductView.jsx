import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import Button from "../components/Button";
import numberWithCommas from "../utils/numberWithCommas";
import InputEmoji from "react-input-emoji";

import Rating from "@mui/material/Rating";

import pf from "../assets/images/products/laptop-asus-tuf-gaming-f15-fx506lh_4_.jpg";
import pd from "../assets/images/products/laptop-asus-rog-strix-g15-g513ih-hn015t-1.jpg";
import pfUser from "../assets/images/UserProfile/man.png";

import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCart, addNumberCart } from "../redux/apiCalls.js";

import axios from "axios";
import {
  addCartByCartIdAction,
  addNumberCartDecrease,
  addNumberCartIncrease,
  removeCartByCartIdAction,
} from "../redux/cartRedux";
import { message } from "antd";
import UpdateComment from "../pages/Comment/UpdateComment";
import { useCallback } from "react";
import DeleteComment from "../pages/Comment/DeleteComment";

const ProductView = (props) => {
  const param = useParams();
  const array = props.arr;
  const filter = array.filter((item) => item !== null && item !== "");
  console.log("Null", filter);
  const [quantity, setQuantity] = useState(1);
  const [text, setText] = useState("");
  const [commentProduct, setCommentProduct] = useState([]);
  const [reloadPage, setReloadPage] = useState("");
  const callbackFunction = (childData) => {
    setReloadPage(childData);
  };

  const dispatch = useDispatch();
  const newCustomer = localStorage.getItem("User");
  const newItemFromState = useSelector(
    (state) => state.cart.numberCartByCartId
  );
  const newItemByCartId = newItemFromState[props.id];
  console.log(newItemByCartId);

  const callCommentProduct = useCallback(async () => {
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
  }, [param.category_id]);
  useEffect(() => {
    callCommentProduct();
  }, [callCommentProduct, param.category_id, reloadPage]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
    // setQuantity(dispatch(addNumberCartIncrease));
    // addNumberCart(dispatch, props.id, "+");
    // dispatch(
    //   addCartByCartIdAction({
    //     cartId: props.id,
    //     currentAmount: quantity + 1,
    //   })
    // );
  };
  const decreaseQuantity = () => {
    setQuantity(quantity < 2 ? 1 : quantity - 1);
    // setQuantity(dispatch(addNumberCartDecrease));
    // addNumberCart(dispatch, props.id, "-");
    // dispatch(
    //   removeCartByCartIdAction({
    //     cartId: props.id,
    //     currentAmount: quantity < 2 ? 1 : quantity - 1,
    //   })
    // );
  };

  // const id = props.iDOption;
  // console.log("ID OPTION", id);
  const handleAddCart = () => {
    console.log("add cart");
    const newProduct = props.product_id;
    addCart(dispatch, newCustomer, newProduct, filter, quantity);
  };
  const handleClick = (e) => {
    e.preventDefault();
    message.error("Bạn Chưa Đăng Nhập");
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
                Thương hiệu: {props.nameBrand ? props.nameBrand : ""}
              </div>
              <div className="product-top__info__content__desc__category">
                Danh mục: {props.nameCategory ? props.nameCategory : ""}
              </div>
              <div className="product-top__info__status">
                {/* Trạng thái: {props.statusProduct ? props.statusProduct : ""} */}
              </div>
              <div className="product-top__info__quantity">
                <i className="bx bx-minus" onClick={decreaseQuantity}></i>
                <div>{quantity}</div>
                <i className="bx bx-plus" onClick={increaseQuantity}></i>
              </div>
              {newCustomer ? (
                <div className="product-top__info__cart">
                  <Button size="sm" animate2={true} onClick={handleAddCart}>
                    thêm vào giỏ hàng
                  </Button>
                </div>
              ) : (
                <div className="product-top__info__cart" onClick={handleClick}>
                  <Link to={"/Login"}>
                    <Button size="sm" animate2={true}>
                      thêm vào giỏ hàng
                    </Button>
                  </Link>
                </div>
              )}
            </div>
            <div className="product-top__info__content__option">
              <div className="product-top__info__content__option__left">
                {props.color}
              </div>
              <div className="product-top__info__content__option__right">
                {props.screen}
              </div>
              <div className="product-top__info__content__option__right">
                {props.switch}
              </div>
              <div className="product-top__info__content__option__right">
                {props.hdd}
              </div>
              <div className="product-top__info__content__option__right">
                {props.ssd}
              </div>
            </div>
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

      <div className="product__comment">
        <div className="product__comment__title">Comments</div>
        {commentProduct?.map((item, index) => {
          return (
            <div className="product__comment__content__desc">
              <div className="product__comment__content__desc__img">
                <img src={pfUser} alt="" />
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
                  <DeleteComment
                    idComment={item?.id}
                    parentCallback={callbackFunction}
                  ></DeleteComment>

                  <UpdateComment
                    idComment={item?.id}
                    idCustomer={item?.cus_id}
                    idProduct={item?.product_id}
                    descProduct={item?.description}
                    rateProduct={item?.rate}
                    idCus={item.idCus}
                    parentCallback={callbackFunction}
                  ></UpdateComment>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* end product comment */}
    </div>
  );
};

ProductView.propTypes = {
  product: PropTypes.object,
};

export default ProductView;
