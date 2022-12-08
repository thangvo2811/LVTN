import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import numberWithCommas from "../utils/numberWithCommas";
import lp from "../assets/images/products/chuot-choi-game-co-day-logitech-g502-hero.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addCart, addNumberCart, deleteCart } from "../redux/apiCalls";
import {
  addCartByCartIdAction,
  addCartByProductIdAction,
  addNumberCartDecrease,
  addNumberCartIncrease,
  removeCartByCartIdAction,
} from "../redux/cartRedux";

const CartItem = (props) => {
  const itemCart = props.cartItem;
  const [quantity, setQuantity] = useState("");

  const newItem = useSelector((state) => state.cart.numberCart);
  const newItemFromState = useSelector(
    (state) => state.cart.numberCartByCartId
  );
  const newItemByCartId = newItemFromState[itemCart.id];
  console.log("Sluong", newItemByCartId);
  const dispatch = useDispatch();

  const increaseQuantity = () => {
    // setQuantity(quantity + 1);
    addNumberCart(dispatch, itemCart.id, "+");
    dispatch(
      addCartByCartIdAction({
        cartId: itemCart.id,
        currentAmount: itemCart.amount,
      })
    );
  };
  const decreaseQuantity = () => {
    setQuantity(quantity < 2 ? 1 : quantity - 1);
    addNumberCart(dispatch, itemCart.id, "-");
    dispatch(
      removeCartByCartIdAction({
        cartId: itemCart.id,
        currentAmount: itemCart.amount,
      })
    );
  };

  const handleDeleteCartItem = (e) => {
    e.preventDefault();
    deleteCart(dispatch, itemCart.id);
  };

  return (
    <>
      <div className="cart-item">
        <div className="cart-item__image">
          <img src={itemCart.CartItemProduct.img} alt="" />
        </div>
        <div className="cart-item__info">
          <div className="cart-item__info__title"></div>
          <div className="cart-item__info__id">
            Tên sản phẩm: {itemCart.CartItemProduct.name}
          </div>
          <div className="cart-item__info__brand">
            Thương hiệu: {itemCart.CartItemProduct.ProductBrand.name}
          </div>
          <div className="cart-item__info__brand">
            Danh mục: {itemCart.CartItemProduct.CategoryProduct.name}
          </div>
          <div className="cart-item__info__price">
            Đơn giá: {numberWithCommas(itemCart.price)} VND
          </div>
        </div>
        <div className="cart-item__total">
          <div className="cart-item__total__quantity">
            <i className="bx bx-minus" onClick={decreaseQuantity}></i>
            <div>{newItemByCartId || 0}</div>
            <i className="bx bx-plus" onClick={increaseQuantity}></i>
          </div>
          <div className="cart-item__total__total">
            Tổng : {numberWithCommas(itemCart.amount * itemCart.price)} VND
          </div>
        </div>
        <div className="cart-item__delete">
          <i className="bx bx-trash" onClick={handleDeleteCartItem}></i>
        </div>
      </div>
    </>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
