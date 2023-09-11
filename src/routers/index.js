import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Login} />
    </Routes>
  );
};

export default Routers;
