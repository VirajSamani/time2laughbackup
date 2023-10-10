import React from "react";
import { useLoader } from "../context/LoaderContext";
import styled from "styled-components";

const CustomSection = styled.section`
  min-height: 100vh;
  background-color: #0f0f0f;
  // background-color: #000;
  display: flex;
  flex-direction: column;
  padding-top: 70px;
`;

const Section = ({ children }) => {
  const { isLoading } = useLoader();
  return <CustomSection>{!isLoading && children}</CustomSection>;
};

export default Section;
