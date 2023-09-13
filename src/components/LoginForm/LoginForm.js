import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/logo.png";
import FormWrapper from "../../styled-common-components/FormWrapper";

const { Title } = Typography;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 28px !important;
`;

const CustomTitle = styled(Title)`
  text-align: center;
  margin-top: 28px;
`;

const RightAlignedButtonWrapper = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.right
      ? "flex-end"
      : "flex-start"}; /* Align the button to the right */
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
  width: 30%;

  @media (max-width: 768px) {
    font-size: 14px !important;
  }

  &:hover {
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

const Img = styled.img`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const LoginForm = () => {
  const [form] = Form.useForm();

  const [buttonRight, setButtonRight] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  const onFinish = (values) => {
    console.log("Received values:", values);
    // You can handle form submission logic here
  };

  const handleMouseEnter = () => {
    const { email, password } = form.getFieldsValue();
    if (!email || !password) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else {
      setShowEmoji(false);
    }
  };

  return (
    <Center>
      <FormWrapper>
        <Img src={logo} alt="logo" />
        <CustomTitle style={{ color: "white" }}>Sign In</CustomTitle>
        <Form form={form} onFinish={onFinish} name="sign_in_form">
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
            ]}
          >
            <CustomInput placeholder="Email" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
            ]}
          >
            <CustomInput type="password" placeholder="Password" />
          </FormItem>
          <RightAlignedButtonWrapper right={buttonRight}>
            <SubmitButton
              onMouseEnter={handleMouseEnter}
              htmlType="submit"
              size="large"
            >
              {showEmoji ? "🤬" : " Sign In"}
            </SubmitButton>
          </RightAlignedButtonWrapper>
        </Form>
        <RegisterText>
          <span>New to Time2Laugh? </span>
          <Link to="/register">Register Now</Link>
        </RegisterText>
      </FormWrapper>
    </Center>
  );
};

export default LoginForm;
