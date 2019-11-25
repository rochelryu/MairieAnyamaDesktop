
import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";
import "assets/scss/paper-dashboard.scss?v=1.1.0";
import "assets/demo/demo.css";
import "perfect-scrollbar/css/perfect-scrollbar.css";

import AdminLayout from "layouts/Admin.jsx";
import AdminLayoutTwo from "layouts/Admins.jsx";
import Login from "views/Login.jsx";
import Print from "views/Print.jsx";

const hist = createBrowserHistory();

const PrivateRoute = ({component:Component, ...rest}) =>(
  <Route {...rest} render={props => localStorage.getItem("tokenCore") ? (<Component {...props}/>) :
      (<Redirect to={{pathname:'/login',state:{from:props.location}}}/>)}/>);
ReactDOM.render(
  <Router history={hist}>
    <Switch>
      <PrivateRoute path="/admin" component={AdminLayout} />
      <PrivateRoute path="/admins" component={AdminLayoutTwo} />
      <PrivateRoute path="/print/:handle" component={Print} />
      <Route path="/login" render={props => <Login {...props} />} />
      <Redirect to="/login" />
    </Switch>
  </Router>,
  document.getElementById("root")
);
