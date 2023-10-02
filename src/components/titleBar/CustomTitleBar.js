import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";

const { Title } = Typography;

// Create a styled component for the title bar
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 767px) {
    padding-left: 10px;
    padding-right: 10px;
  }
`;

const SeeMoreLink = styled(Link)`
  color: #1890ff;
  &:hover {
    color: #40a9ff;
  }
`;

const CustomTitleBar = ({ title, seeMoreLink }) => {
  return (
    <TitleBar>
      <Title level={3}>{title}</Title>
      <SeeMoreLink to={seeMoreLink || "/login"}>See More</SeeMoreLink>
    </TitleBar>
  );
};

export default CustomTitleBar;
