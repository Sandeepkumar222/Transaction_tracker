import React from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import AboutUser from "./AboutUser";
import LoginPage from "./LoginPage";
import ForgotPassword from "./forgotPassword";
import ChangePassword from "./changePassword";
import AddExpenseIncome from "./AddExpenseIncome";

const Routing = () => {
  const token = localStorage.getItem("token");
  if (token) {
    <Redirect to="/"></Redirect>;
  } else {
    <Redirect to="/login"></Redirect>;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/forgotPassword">
            <ForgotPassword />
          </Route>
          <Route path="/About">
            <About />
          </Route>
          <Route path="/changePassword/:token">
            <ChangePassword />
          </Route>

          <Route path="/home">
            <Home />
          </Route>
          <Route path="/expenses">
            <AddExpenseIncome />
          </Route>
          <Route path="/userStats/:Id">
            <AboutUser />
          </Route>
          <Route path="/userStats">
            <AboutUser />
          </Route>
          <Route path="/aboutme">
            <About />
          </Route>
          <Route path="*">
            <h1>404 Error</h1>
          </Route>
        </Switch>
      </BrowserRouter>

      <div className="footer"></div>
    </>
  );
};
export default Routing;
