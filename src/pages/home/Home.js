import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { apiCall } from "../../utils/apiCall";
import { Button } from "antd";

const Home = () => {
  const { user, addUserInfo, removeUserInfo } = useAuthStore();

  let userInfo = <></>;

  if (user?.email) {
    userInfo = (
      <>
        You Logged In As: {user.email} <br />
        <Button onClick={removeUserInfo}>Log Out</Button>
        <hr />
      </>
    );
  }

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      apiCall("/users/current").then((response) => {
        addUserInfo(response);
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
    </center>
  );
};

export default Home;
