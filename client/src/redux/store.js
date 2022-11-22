import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userLogin";
import cartReducer from "./cartRedux";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
