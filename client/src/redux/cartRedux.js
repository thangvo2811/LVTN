import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    isFetching: false,
    numberCart: 0,
    carts: [],
    _products: [],
    totalPrice: 0,
  },
  reducers: {
    addStart: (state) => {
      state.isFetching = true;
    },
    addCartSuccess: (state, action) => {
      state.isFetching = false;
      state._products = action.payload._products;
      state.numberCart = action.payload._products.length;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { addStart, addCartSuccess } = cartSlice.actions;
export default cartSlice.reducer;
