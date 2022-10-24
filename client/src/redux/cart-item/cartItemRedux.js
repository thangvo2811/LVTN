import { createSlice } from "@reduxjs/toolkit";

const items =
  localStorage.getItem("cartItems") !== null
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

const initialState = {
  value: items,
  name: "",
};

const cartItemSlice = createSlice({
  name: "cartItem",
  initialState,
  reducers: {
    //Delete Item
    delItem: (state, action) => {
      state.name = action.payload.name;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const duplicateItem = state.value.find(
        (e) => e.productId.toString() === newItem.productId.toString()
      );
      if (duplicateItem) {
        state.value = state.value.filter(
          (e) => e.productId.toString() !== newItem.productId.toString()
        );
        state.value = [
          ...state.value,
          {
            productId: newItem.productId,
            title: newItem.title,
            price: newItem.price,
            brand: newItem.brand,
            quantity: newItem.quantity + duplicateItem.quantity,
          },
        ];
      } else {
        state.value = [
          ...state.value,
          {
            ...newItem,
          },
        ];
      }
      localStorage.setItem("cartItem", JSON.stringify(state.value));
    },
  },
});

export const { addItem, deleteItem } = cartItemSlice.actions;

export default cartItemSlice.reducer;
