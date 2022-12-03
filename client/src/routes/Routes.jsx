import React from "react";

import { Routes as Switch, Route } from "react-router-dom";
import Cart from "../pages/Cart/Cart";
import Categories from "../pages/Category/Categories";
import Payment from "../pages/Payment/Payment";
import Product from "../pages/Product/Product";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import UserProfile from "../pages/UserProfile";

import FindProduct from "../pages/Product/FindProduct";
import FindCategory from "./../pages/Category/FindCategory";
import ForgetPassWord from "../pages/Login/ForgetPassWord";
import Blog from "../components/Blog";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/user" element={<ForgetPassWord />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/userprofile" element={<UserProfile />}></Route>
      <Route
        path="/findcategory/:category_id"
        element={<FindCategory />}
      ></Route>
      <Route path="/findproduct/:keyword" element={<FindProduct />}></Route>
      <Route path="/product/" element={<Categories />}></Route>
      <Route path="/detailproduct/:category_id" element={<Product />}></Route>
      <Route path="/blog/" element={<Blog />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/payment" element={<Payment />}></Route>
    </Switch>
  );
};

export default Routes;
