import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Signup from "../pages/signup/Signup";
import Home from "../pages/home/Home";
import Private from "../layout/private/Private";
import Profile from "../pages/profile/Profile";
import NotFoundPage from "../pages/notFoundPage/NotFoundPage";
import VideoWatcher from "../pages/videoWatcher/VideoWatcher";
import SearchPage from "../pages/search/SearchPage";
import Discovery from "../components/discover/Discovery";
import ForgotPass from "../pages/forgotPass/ForgotPass";
import ResetPass from "../pages/forgotPass/ResetPass";
import PostWatcher from "../pages/postWatcher/PostWatcher";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Signup} />
      <Route path="/forgot-password" Component={ForgotPass} />
      <Route path="/reset-password" Component={ResetPass} />
      <Route path="/" Component={Home} exact={true} />
      <Route path="/" Component={Private}>
        <Route path="/profile" Component={Profile} />
        <Route path="/profile/:username" Component={Profile} />
        <Route path="/video/:id" Component={VideoWatcher} />
        <Route path="/post/:id" Component={PostWatcher} />
        <Route path="/search" Component={SearchPage} />
        <Route path="/discovery" Component={Discovery} />
      </Route>
      <Route path="*" Component={NotFoundPage} />
    </Routes>
  );
};

export default Routers;
