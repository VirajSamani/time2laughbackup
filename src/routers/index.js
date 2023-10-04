import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";
import Private from "../layout/private/Private";
import Profile from "../pages/profile/Profile";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import VideoWatcher from "../pages/videoWatcher/VideoWatcher";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Signup} />
      <Route path="/" Component={Home} exact={true} />
      <Route path="/" Component={Private}>
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/:username" Component={Profile} />
        <Route path="/video/:id" Component={VideoWatcher} />
      </Route>
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
};

export default Routers;
