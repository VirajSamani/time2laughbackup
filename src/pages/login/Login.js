import React from "react";
import logo from "../../assets/logo.png";
import CustomContainer from "../../styled-common-components/CustomContainer";
import { styled } from "styled-components";
import background from "../../assets/background2.webp";
import LoginForm from "../../components/LoginForm/LoginForm";

const LoginSection = styled.section`
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

const Img = styled.img`
  width: 100%;
  max-width: 400px; /* Adjust the maximum width as needed */
  margin: 0 auto; /* Center the image horizontally */
`;

const Login = () => {
  return (
    <LoginSection image={background}>
      <CustomContainer fluid>
        <Img src={logo} alt="logo" />
      </CustomContainer>
      <LoginForm />
    </LoginSection>
  );
};

export default Login;
