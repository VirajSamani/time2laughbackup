import React from "react";
import useAuthStore from "../../store/authStore";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";
import { apiCall } from "../../utils/apiCall";
import Header from "../header/Header";

const Private = () => {
  const { user, addUserInfo } = useAuthStore();
  const { showLoader } = useLoader();
  const navigate = useNavigate();

  if (user?.email)
    return (
      <>
        <Header />
        <Outlet />
      </>
    );

  const token = localStorage.getItem("authToken");

  if (token) {
    showLoader();
    apiCall("/users/current").then((response) => {
      // hideLoader();
      if (response) {
        addUserInfo(response);
      } else {
        addUserInfo(response);
        localStorage.clear();
        navigate("/login");
      }
    });
  } else {
    return <Navigate to="/login" />;
  }
};

export default Private;
