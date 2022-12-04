import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";
import Categories from "../pages/Categories/Categories";
import Brand from "../pages/Brand/Brand";
import Products from "../pages/Products/Products";
import Blog from "../pages/Blog/Blog";
import Option from "../pages/Option/Option";
import Comments from "../pages/Comments/Comments";
import Login from "../pages/Login/Login";
import Employee from "../pages/Employee/Employee";
const isLogin = localStorage.getItem("admin") ? true : false;
const Routes = () => {
  return (
    <Switch>
      {isLogin ? (
        <>
          <Route path="/" exact component={Dashboard} />
          <Route path="/employee" exact component={Employee} />
          <Route path="/customers" exact component={Customers} />
          <Route path="/categories" exact component={Categories} />
          <Route path="/brand" exact component={Brand} />
          <Route path="/products" exact component={Products} />
          <Route path="/option" exact component={Option} />
          <Route path="/comment" exact component={Comments} />
          <Route path="/blog" exact component={Blog} />
        </>
      ) : (
        <Redirect from="" to="login" />
      )}
      <Route path="/login" exact component={Login} />
    </Switch>
  );
};

export default Routes;
