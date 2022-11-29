import { createSlice } from "@reduxjs/toolkit";

// { "ProductId" : soLuong}
// VD : {14 : 6, 15 : 2}
// { amount : 5 } =>{ cartID : taora , amount : 5}
// dispatch(addCart(productId))
// => action.payload => productId => 123abc
// if (state.numberCartByProductId[123abc]) => undefined => state.numberCartByProductId[15] = 2
//  VD : {"123abc" : 6}
// => state.numberCartByProductId[123abc] =  state.numberCartByProductId[123abc](6) + 1 = 7
const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isFetching: false,
    numberCart: 0,
    numberCartByCartId: {},
    carts: [],
    _products: [],
    totalPrice: 0,
  },
  reducers: {
    addStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      // console.log(action.payload);
      state.isFetching = false;
      state.numberCart = action.payload;
    },
    addCartAction: (state, action) => {
      // console.log(action.payload);
      state.isFetching = false;
      state.numberCart = state.numberCart + 1;
    },
    initialCartByCartIdAction: (state, action) => {
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      if (!(state.numberCartByCartId[cartId] || false)) {
        // Chua co trong state
        state.numberCartByCartId[cartId] = currentAmount;
      }
    },
    addCartByCartIdAction: (state, action) => {
      // console.log(action.payload);
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      if (!(state.numberCartByCartId[cartId] || false)) {
        // Chua co trong state
        state.numberCartByCartId[cartId] = currentAmount;
      } else {
        state.numberCartByCartId[cartId] = state.numberCartByCartId[cartId] + 1;
      }
    },
    removeCartByCartIdAction: (state, action) => {
      // console.log(action.payload);
      const { cartId, currentAmount } = action.payload;
      state.isFetching = false;
      if (!(state.numberCartByCartId[cartId] || false)) {
        // Chua co trong state
        state.numberCartByCartId[cartId] = currentAmount;
      } else {
        if (state.numberCartByCartId[cartId] === 1) {
          return;
        }
        state.numberCartByCartId[cartId] = state.numberCartByCartId[cartId] - 1;
      }
    },
    deleteCartStart: (state) => {
      state.isFetching = true;
    },
    deleteCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload;
      state.numberCart = action.payload._products.length;
    },

    addNumberCartStart: (state) => {
      state.isFetching = true;
    },
    addNumberCartSuccess: (state, action) => {
      state.isFetching = false;
      state.numberCart = action.payload;
      state.totalPrice = action.payload;
    },
    addNumberCartIncrease: (state, action) => {
      state.isFetching = false;
      state.numberCart = state.numberCart + 1;
    },
    addNumberCartDecrease: (state, action) => {
      state.isFetching = false;
      state.numberCart = state.numberCart - 1;
    },
  },
});

export const {
  addStart,
  addCartSuccess,
  addCartAction,
  deleteCartStart,
  deleteCartSuccess,
  addNumberCartStart,
  addNumberCartSuccess,
  addNumberCartIncrease,
  addNumberCartDecrease,
  addCartByCartIdAction,
  removeCartByCartIdAction,
  initialCartByCartIdAction,
} = cartSlice.actions;
export default cartSlice.reducer;
