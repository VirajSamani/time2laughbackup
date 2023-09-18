import React, { useState } from "react";
import { Form, Input, Button, Typography } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/finallogo.png";
import FormWrapper from "../../styled-common-components/FormWrapper";
import useAuthStore from "../../store/authStore";
import { useLoader } from "../../context/LoaderContext";

const { Title } = Typography;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-top: 60px; /* Reduced padding */
  padding-bottom: 60px; /* Reduced padding */
`;

const FormItem = styled(Form.Item)`
  margin-bottom: 22.4px !important; /* Reduced margin */
`;

const CustomTitle = styled(Title)`
  text-align: center;
  margin-top: 22.4px; /* Reduced margin */
  font-size: 28px !important; /* Reduced font size */
`;

const RightAlignedButtonWrapper = styled.div`
  display: flex;
  justify-content: ${(props) =>
    props.right
      ? "flex-end"
      : "flex-start"}; /* Align the button to the right */
`;

const SubmitButton = styled(Button)`
  border-radius: 3.2px !important; /* Reduced border radius */
  font-size: 14.4px !important; /* Reduced font size */
  font-weight: bold !important;
  margin: 19.2px 0 9.6px !important; /* Reduced margin */
  background-color: #4fb7d0 !important;
  border: none !important;
  padding: 8px !important; /* Reduced padding */
  height: fit-content !important;
  width: 24%; /* Reduced width */

  @media (max-width: 768px) {
    font-size: 11.2px !important; /* Further reduced font size */
  }

  &:hover {
    color: black !important;
  }
`;

const RegisterText = styled.div`
  padding-top: 40px; /* Reduced padding */
  color: #737373;
  font-size: 16px; /* Reduced font size */
  font-weight: 400;
  margin-top: 12.8px; /* Reduced margin */

  a:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 12.8px; /* Further reduced font size */
  }
`;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
`;

const CustomInput = styled(Input)`
  background-color: #333333;
  border: none;
  height: 40px; /* Reduced height */
  color: white;
  font-size: 12.8px; /* Reduced font size */
  margin-bottom: 22.4px !important; /* Reduced margin */

  &::placeholder {
    color: #ffffff70;
  }
`;

const Img = styled.img`
  width: 100%;
  max-width: 320px; /* Reduced width */
  margin: 0 auto;
`;

const LoginForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const { login } = useAuthStore();

  const [buttonRight, setButtonRight] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);

  const onLoginFinish = (to) => {
    hideLoader();
    navigate(to);
  };

  const onFinish = (values) => {
    showLoader();
    login(values, onLoginFinish);
  };

  const handleMouseEnter = () => {
    const { email, password } = form.getFieldsValue();
    if (!email || !password) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else if (!emailRegex.test(email)) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else if (!passRegex.test(password)) {
      setShowEmoji(true);
      setButtonRight(!buttonRight);
    } else {
      setShowEmoji(false);
    }
  };

  const validatePassword = (_, value) => {
    if (!value || passRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject("Password must meet the criteria.");
  };

  return (
    <Center>
      <FormWrapper>
        <NavLink to="/">
          <Img src={logo} alt="logo" />
        </NavLink>
        <CustomTitle style={{ color: "white" }}>Sign In</CustomTitle>
        <Form form={form} onFinish={onFinish} name="sign_in_form">
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
            <CustomInput placeholder="Email" />
          </FormItem>
          <FormItem
            name="password"
            rules={[
              {
                required: true,
                message: "Please enter your password!",
              },
              {
                validator: validatePassword,
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
          <NavLink to="/register">Register Now</NavLink>
        </RegisterText>
      </FormWrapper>
    </Center>
  );
};

export default LoginForm;
