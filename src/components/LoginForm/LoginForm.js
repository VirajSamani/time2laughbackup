import React from "react";
import FormWrapper from "../../styled-common-components/FormWrapper";
import { styled } from "styled-components";
import Title from "antd/es/typography/Title";
import Input from "antd/es/input/Input";
import { Button } from "antd";

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
`;

const SubmitButton = styled(Button)`
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500 !important;
  margin: 24px 0 12px;
`;

const LoginForm = () => {
  return (
    <Center>
      <FormWrapper>
        <CustomTitle style={{ color: "white" }}>Sign In</CustomTitle>
        <CustomInput type="text" placeholder="Email" />
        <CustomInput type="text" placeholder="Password" />
        <SubmitButton size="large">Sign In</SubmitButton>
      </FormWrapper>
    </Center>
  );
};

export default LoginForm;
