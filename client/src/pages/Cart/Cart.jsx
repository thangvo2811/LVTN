import React, { useState, useEffect } from "react";

import Button from "../../components/Button";
import CartItem from "../../components/CartItem";
import Helmet from "../../components/Helmet";

import { Link } from "react-router-dom";

import numberWithCommas from "../../utils/numberWithCommas";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  addCartByCartIdAction,
  initialCartByCartIdAction,
} from "../../redux/cartRedux";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  // const [totalPrice, setTotalPrice] = useState();
  // const [totalProduct, setTotalProduct] = useState();
  const newCustomer = localStorage.getItem("User");
  const dispatch = useDispatch();
  const callCartItem = async () => {
    await axios
      .get(`http://localhost:8000/api/get-cart-by-customer-id/${newCustomer}/`)
      .then((res) => {
        console.log(res.data.cartitem);
        setCartItem(res.data.cartitem);

        res.data.Cartitem.forEach((item) => {
          dispatch(
            initialCartByCartIdAction({
              cartId: item.id,
              currentAmount: item.amount,
            })
          );
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    callCartItem();
  }, []);
  return (
    <Helmet name="Giỏ hàng">
      <div className="cart">
        <div className="cart__desc">
          <div className="cart__desc__item">
            {cartItem?.map((item, index) => {
              return (
                <CartItem cartItem={item} id={item.id} key={index}></CartItem>
              );
            })}
          </div>
          <div className="cart__desc__clear">
            {/* {cartItem?.map((item, index) => (
              <Button
                size="sm"
                animate2={true}
                onClick={(e) => handleDeleteAll(item.cart_id, e)}
              >
                Clear All
              </Button>
            ))} */}
          </div>
        </div>

        <div className="cart__info">
          <div className="cart__info__content">
            <div className="cart__info__content__title">Tổng Kết</div>
            <div className="cart__info__content__item">
              {/* <div className="cart__info__content__item__title">Tiền ship</div>
              <div className="cart__info__content__item__price">0,000 VND</div> */}
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
              {/* <div className="cart__info__content__item__title">Thanh toán</div> */}
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
