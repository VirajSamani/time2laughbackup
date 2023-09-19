import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";
import Private from "../layout/private/Private";
import Profile from "../pages/profile/Profile";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Signup} />
      <Route path="/" Component={Home} exact={true} />
      <Route path="/" Component={Private}>
        <Route path="/profile" Component={Profile} />
      </Route>
    </Routes>
  );
};

export default Routers;
