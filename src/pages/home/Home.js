import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAuthStore from "../../store/authStore";
import { apiCall } from "../../utils/apiCall";
import { Button } from "antd";
import { useLoader } from "../../context/LoaderContext";
import UnAuthHome from "./UnAuthHome";
import AuthHome from "./AuthHome";
import Header from "../../layout/header/Header";
import Section from "../../styled-common-components/Section";

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
        if (response) {
          addUserInfo(response);
        } else {
          addUserInfo(response);
          localStorage.clear();
        }
      }).finally(hideLoader);
    }
  }, []);

  return (
    <>
      <Header />
      <Section>{home}</Section>
      <center>
        <br />
        {userInfo}
        Home page will be updated
        <hr />
        pages availble <br />
        1. <Link to="/login">Login</Link> <br />
        2. <Link to="/register">Register</Link> <br />
        3. <Link to="/profile">Profile</Link> <br />
        <hr />
      </center>
    </>
  );
};

export default Home;
