import React from "react";
import { styled } from "styled-components";

const Wrapper = styled.div`
  min-height: 660px;
  padding: 60px 68px 40px;
  margin-bottom: 90px;
  color: white;
  display: flex;
  flex-direction: column;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 4px;
  box-sizing: border-box;
  width: 500px;

  @media (max-width: 767px) {
    width: 100%;
    padding: 60px 30px 40px;
  };
`;

const FormWrapper = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default FormWrapper;
