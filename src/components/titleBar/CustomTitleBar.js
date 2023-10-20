import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/auth";

const { Title } = Typography;

const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  // background-color: #1e1e1e; 
  padding: 10px 20px;

  @media (max-width: 767px) {
    padding: 10px; 
  }
`;

const SeeMoreLink = styled(Link)`
  color: #40a9ff;
  text-decoration: none;
  transition: color 0.3s; 

  &:hover {
    color: #1890ff;
  }
`;

const MainTitle = styled(Title)`
  color: white !important;
  margin: 0;
`;

const CustomTitleBar = ({ title  }) => {
  return (
    <TitleBar>
      <MainTitle level={3}>{title}</MainTitle>
      <SeeMoreLink to={isAuth() ? "/discovery" :"/login"}>See More</SeeMoreLink>
    </TitleBar>
  );
};

export default CustomTitleBar;
