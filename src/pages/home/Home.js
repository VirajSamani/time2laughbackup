import React, { useEffect } from "react";
import useAuthStore from "../../store/authStore";
import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import UnAuthHome from "./UnAuthHome";
import AuthHome from "./AuthHome";
import Header from "../../layout/header/Header";
import Section from "../../styled-common-components/Section";
import TrendingTopVideo from "../../components/Trending/TrendingTopVideo";

const Home = () => {
  const { user, addUserInfo } = useAuthStore();
  const { showLoader, hideLoader } = useLoader();

  let home = <UnAuthHome />;

  if (user?.email) {
    home = <AuthHome />;
  }

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      showLoader();
      apiCall("/users/current")
        .then((response) => {
          if (response) {
            addUserInfo(response);
          } else {
            addUserInfo(response);
            localStorage.clear();
          }
        })
        .finally(hideLoader);
    }
  }, []);

  return (
    <>
      <Header />
      <TrendingTopVideo />
      <Section>{home}</Section>
    </>
  );
};

export default Home;
