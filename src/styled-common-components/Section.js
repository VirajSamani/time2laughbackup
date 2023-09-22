import React from "react";
import { useLoader } from "../context/LoaderContext";
import styled from "styled-components";

const CustomSection = styled.section`
  min-height: 100vh;
  background-color: #f8f8f8;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Section = ({ children }) => {
  const { isLoading } = useLoader();
  return <CustomSection>{!isLoading && children}</CustomSection>;
};

export default Section;
