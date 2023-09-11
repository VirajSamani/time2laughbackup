import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  max-width: ${(props) => (props.fluid ? "100%" : "1140px")};
  margin-left: auto;
  margin-right: auto;
  padding-left: 15px;
  padding-right: 15px;
  @media (max-width: 767px) {
    max-width: 100%;
  };
  position: absolute;
  z-index: 1;
`;

const CustomContainer = ({ children, ...props }) => {
  return <Container {...props}>{children}</Container>;
};

export default CustomContainer;
