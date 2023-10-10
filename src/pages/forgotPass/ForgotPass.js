import React from "react";
import styled from "styled-components";
import background from "../../assets/bg.jpg";
import ForgotPassForm from "../../components/ForgotPassForm/ForgotPassForm";

const ForgotPassSection = styled.section`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
  width: 100%;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: url(${(props) => props.image});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 1;
    z-index: -1;
  }
`;

const ForgotPass = () => {
  return (
    <ForgotPassSection image={background}>
      <ForgotPassForm />
    </ForgotPassSection>
  );
};

export default ForgotPass;
