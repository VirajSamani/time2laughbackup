import React from "react";
import { Typography } from "antd";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { color } from "../../utils/color";

const { Title } = Typography;

// Create a styled component for the title bar
const TitleBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  // background-color: #1e1e1e; /* Dark background color */
  padding: 10px 20px; /* Add some padding for spacing */

  @media (max-width: 767px) {
    padding: 10px; /* Adjust padding for smaller screens */
  }
`;

const SeeMoreLink = styled(Link)`
  color: #40a9ff; /* Link color */
  text-decoration: none;
  transition: color 0.3s; /* Add a smooth color transition */

  &:hover {
    color: #1890ff; /* Change link color on hover */
  }
`;

const MainTitle = styled(Title)`
  color: white !important; /* Title text color */
  margin: 0; /* Remove default margin */
`;

const CustomTitleBar = ({ title, seeMoreLink }) => {
  return (
    <TitleBar>
      <MainTitle level={3}>{title}</MainTitle>
      <SeeMoreLink to={seeMoreLink || "/login"}>See More</SeeMoreLink>
    </TitleBar>
  );
};

export default CustomTitleBar;
