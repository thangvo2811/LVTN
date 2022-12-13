import React, { useState, useEffect, useCallback } from "react";

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
import { deleteAllCart } from "../../redux/apiCalls";

const Cart = () => {
  const [cartItem, setCartItem] = useState([]);
  const [totalProduct, setTotalProduct] = useState();
  const [totalPrice, setToTalPrice] = useState([]);

  const newCustomer = localStorage.getItem("User");

  const dispatch = useDispatch();
  const callCartItem = useCallback(async () => {
    await axios
      .get(`http://localhost:8000/api/get-cart-by-customer-id/${newCustomer}/`)
      .then((res) => {
        setCartItem(res.data.cartitem);
        setTotalProduct(res.data.quantity);
        setToTalPrice(res.data.cartitem);
        res.data.cartitem.forEach((item) => {
          console.log("Item", item);
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
  }, [dispatch, newCustomer]);

  const idCartItem = cartItem?.map((item, index) => item.CartItemProduct.id);
  console.log("ID CART ITEM", idCartItem);

  const priceProduct = 6000000;

  useEffect(() => {
    callCartItem();
  }, [callCartItem]);

  const handleDeleteAllCart = (e) => {
    e.preventDefault();
    deleteAllCart(dispatch, idCartItem);
    callCartItem();
  };

  return (
    <Helmet name="Giỏ hàng">
      <div className="cart">
        <div className="cart__desc">
          <div className="cart__desc__item">
            {cartItem?.map((item, index) => {
              return (
                <CartItem
                  cartItem={item}
                  id={item.id}
                  key={index}
                  reload={callCartItem}
                  idCartItem={item.CartItemProduct.id}
                ></CartItem>
              );
            })}
          </div>
          <div className="cart__desc__clear">
            <Button size="sm" animate2={true} onClick={handleDeleteAllCart}>
              Xóa Tất Cả
            </Button>
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
                {totalProduct ? totalProduct : 0}
              </div>
            </div>
            <div className="cart__info__content__item">
              {/* <div className="cart__info__content__item__title">Thanh toán</div> */}
              <div className="cart__info__content__item__price">
                {/* {totalPrice ? numberWithCommas(totalPrice) : ""} VND */}
              </div>
            </div>
            <div className="cart__info__content__item cart__info__content__item__main">
              <div className="cart__info__content__item__title">Tổng giá</div>
              <div className="cart__info__content__item__price">
                {priceProduct ? numberWithCommas(priceProduct) : ""} VND
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
