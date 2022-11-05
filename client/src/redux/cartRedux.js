import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    product: [],
    cart: [],
    isFetching: false,
    totalPrice: 0,
    numberCart: 0,
  },
  reducers: {
    addStart: (state) => {
      state.isFetching = true;
    },
  },
});
