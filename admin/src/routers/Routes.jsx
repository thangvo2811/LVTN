import React from "react";

import { Route, Switch } from "react-router-dom";

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

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/login" component={Login} />
      <Route path="/employee" component={Employee} />
      <Route path="/customers" component={Customers} />
      <Route path="/categories" component={Categories} />
      <Route path="/brand" component={Brand} />
      <Route path="/products" component={Products} />
      <Route path="/option" component={Option} />
      <Route path="/comment" component={Comments} />
      <Route path="/blog" component={Blog} />
    </Switch>
  );
};

export default Routes;
