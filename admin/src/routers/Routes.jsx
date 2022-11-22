import React from "react";

import { Route, Switch } from "react-router-dom";

import Dashboard from "../pages/Dashboard/Dashboard";
import Customers from "../pages/Customers/Customers";
import Categories from "../pages/Categories/Categories";
import Brand from "../pages/Brand/Brand";
import Products from "../pages/Products/Products";

const Routes = () => {
  return (
    <Switch>
      <Route path="/" exact component={Dashboard} />
      <Route path="/customers" component={Customers} />
      <Route path="/categories" component={Categories} />
      <Route path="/brand" component={Brand} />
      <Route path="/product" component={Products} />
    </Switch>
  );
};

export default Routes;
