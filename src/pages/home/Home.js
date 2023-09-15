import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { apiCall } from "../../utils/apiCall";
import { Button } from "antd";
import { useLoader } from "../../context/LoaderContext";
import UnAuthHome from "./UnAuthHome";
import AuthHome from "./AuthHome";

const Home = () => {
  const { user, addUserInfo, removeUserInfo } = useAuthStore();
  const { showLoader, hideLoader } = useLoader();

  let userInfo = <></>;
  let home = <UnAuthHome />;

  if (user?.email) {
    userInfo = (
      <>
        You Logged In As: {user.email} <br />
        <Button onClick={removeUserInfo}>Log Out</Button>
        <hr />
      </>
    );
    home = <AuthHome />;
  }

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      showLoader();
      apiCall("/users/current").then((response) => {
        addUserInfo(response);
        hideLoader();
      });
    }
  }, []);

  return (
    <center>
      <br />
      {userInfo}
      Home page will be updated
      <hr />
      pages availble <br />
      1. <Link to="/login">Login</Link> <br />
      1. <Link to="/register">Register</Link> <br />
      <hr />
      {home}
    </center>
  );
};

export default Home;
