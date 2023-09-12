import React from "react";
import FormWrapper from "../../styled-common-components/FormWrapper";
import { styled } from "styled-components";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import { Button } from "antd";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const CustomInput = styled(Input)`
  background-color: #333333;
  border: none;
  height: 50px;
  color: white;
  font-size: 16px;
  margin-bottom: 28px;

  &::placeholder {
    color: #ffffff70;
  }
`;

const CustomTitle = styled(Title)`
  margin-bottom: 28px !important;
  text-align: center;
  margin-top: 28px;
`;

const SubmitButton = styled(Button)`
  border-radius: 4px !important;
  font-size: 18px !important;
  font-weight: bold !important;
  margin: 24px 0 12px !important;
  background-color: #4fb7d0 !important;
  border: none !important;
  padding: 10px !important;
  height: fit-content !important;

  @media (max-width: 768px) {
    font-size: 14px !important;
  }

  &:hover{
    color: black !important;
  }
`;

const RegisterText = styled.div`
  padding-top: 50px;
  color: #737373;
  font-size: 20px;
  font-weight: 400;
  margin-top: 16px;

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const SignUpForm = () => {
  return (
    <Center>
      <FormWrapper>
        <Img src={logo} alt="logo" />
        <CustomTitle style={{ color: "white" }}>Register</CustomTitle>
        <CustomInput type="text" placeholder="User Name" />
        <CustomInput type="text" placeholder="Email" />
        <CustomInput type="text" placeholder="Password" />
        <SubmitButton htmlType="submit" size="large">
          Register
        </SubmitButton>
        <RegisterText>
          <span>Already Registered? </span>
          <Link to="/login">Log In</Link>
        </RegisterText>
      </FormWrapper>
    </Center>
  );
};

export default SignUpForm;
