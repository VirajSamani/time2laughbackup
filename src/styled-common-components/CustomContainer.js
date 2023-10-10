import React from "react";
import { styled } from "styled-components";

const Container = styled.div`
  max-width: ${(props) => (props.fluid ? "100%" : "1140px")};
  margin-left: auto;
  margin-right: auto;
  @media (max-width: 767px) {
    max-width: 100%;
    padding-left: 0px;
    padding-right: 0px;
  }
  z-index: 1;
  width: 100%;
`;

const CustomContainer = ({ loading, children, ...props }) => {
  return <Container {...props}>{!loading && children}</Container>;
};

export default CustomContainer;
