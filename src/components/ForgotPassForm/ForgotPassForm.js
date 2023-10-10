import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/finallogo.png";
import FormWrapper from "../../styled-common-components/FormWrapper";
import { useLoader } from "../../context/LoaderContext";
import { color } from "../../utils/color";
import { apiCall } from "../../utils/apiCall";

const { Title } = Typography;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 60px;
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22.4px !important;
`;

const RightAlignedButtonWrapper = styled.div`
  display: flex;
  justify-content: ${(props) => (props.right ? "flex-end" : "flex-start")};
`;

const CustomTitle = styled(Title)`
  text-align: center;
  margin-top: 22.4px;
  padding-bottom: 42.4px;
  font-size: 28px !important;
`;

const SubmitButton = styled(Button)`
  border-radius: 3.2px !important;
  font-size: 14.4px !important;
  font-weight: bold !important;
  margin: 19.2px 0 9.6px !important;
  background-color: ${color.primary} !important;
  border: none !important;
  padding: 8px !important;
  height: fit-content !important;
  min-width: 24%;

  @media (max-width: 768px) {
    font-size: 11.2px !important;
  }

  &:hover {
    color: black !important;
  }
`;

const RegisterText = styled.div`
  padding-top: 40px;
  color: #737373;
  font-size: 16px;
  font-weight: 400;
  margin-top: 12.8px;

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12.8px;
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const CustomInput = styled(Input)`
  background-color: #333333;
  border: none;
  height: 40px;
  color: white;
  font-size: 12.8px;
  margin-bottom: 22.4px !important;

  &::placeholder {
    color: #ffffff70;
  }

  input {
    background-color: #333333;
    color: white !important;

    &::placeholder {
      color: #ffffff70 !important;
    }
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 320px;
  margin: 0 auto;
`;

const ForgotPassForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [form] = Form.useForm();
  const { showLoader, hideLoader } = useLoader();

  const [buttonRight, setButtonRight] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [mailSent, setMailSent] = useState(false);

  const onFinish = (values) => {
    showLoader();
    apiCall("users/forget-password", "POST", values)
      .then((response) => {
        message.success(response.msg);
        setMailSent(true);
      })
      .finally(hideLoader);
  };

  const handleMouseEnter = () => {
    const { email } = form.getFieldsValue();
    if (!email) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else if (!emailRegex.test(email)) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else {
      setShowEmoji(false);
    }
  };

  const handleChange = () => {
    const { email } = form.getFieldsValue();
    setMailSent(false);
    if (email && emailRegex.test(email)) {
      setShowEmoji(false);
    } else {
      setShowEmoji(true);
    }
  };

  return (
    <Center>
      <FormWrapper>
        <NavLink to="/">
          <Img src={logo} alt="logo" />
        </NavLink>
        <CustomTitle style={{ color: "white" }}>Forgot Password</CustomTitle>
        <Form form={form} onFinish={onFinish} name="forgot_pass_form">
          <FormItem
            name="email"
            rules={[
              {
                required: true,
                message: "Please enter your email!",
              },
              {
                type: "email",
                message: "Invalid email format!",
              },
            ]}
          >
            <CustomInput onChange={handleChange} placeholder="Email" />
          </FormItem>
          <RightAlignedButtonWrapper right={buttonRight}>
            <SubmitButton
              onMouseEnter={handleMouseEnter}
              htmlType="submit"
              size="large"
              disabled={mailSent}
            >
              {showEmoji ? "🤬" : " Send"}
            </SubmitButton>
          </RightAlignedButtonWrapper>
        </Form>
        <RegisterText>
          <span>Already Registered? </span>
          <NavLink to="/login">Log In</NavLink>
        </RegisterText>
      </FormWrapper>
    </Center>
  );
};

export default ForgotPassForm;
