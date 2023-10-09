import React, { useState } from "react";
import { Form, Input, Button, Typography, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import logo from "../../assets/finallogo.png";
import FormWrapper from "../../styled-common-components/FormWrapper";
import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import { color } from "../../utils/color";
import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";

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
  background-color: ${color.primary} !important;
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
  max-width: 320px; /* Reduced width */
  margin: 0 auto;
`;

const PasswordToggle = styled.span`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: ${color.primary};
  font-size: 16px;

  &:hover {
    color: ${color.primaryHover};
  }
`;

const SignUpForm = () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passRegex = /^(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const [buttonRight, setButtonRight] = useState(true);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onFinish = (values) => {
    showLoader();
    apiCall("users/register", "POST", values).then((response) => {
      hideLoader();
      if (response) {
        navigate("/login");
        message.success(
          "Registration success! Login to join the fun. Party awaits you! 🥳"
        );
      }
    });
  };

  const handleMouseEnter = () => {
    const { username, email, password } = form.getFieldsValue();
    if (!username || !email || !password) {
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

  const handleChange = () => {
    const { username, email, password } = form.getFieldsValue();
    if (
      username &&
      email &&
      password &&
      emailRegex.test(email) &&
      passRegex.test(password)
    ) {
      setShowEmoji(false);
    } else {
      setShowEmoji(true);
    }
  };

  const validatePassword = (_, value) => {
    if (!value || passRegex.test(value)) {
      return Promise.resolve();
    }
    return Promise.reject(
      "Password should be more than 8 character, it must include special symbols, numbers, combination of uppercase and lowercase."
    );
  };

  return (
    <Center>
      <FormWrapper>
        <NavLink to="/">
          <Img src={logo} alt="logo" />
        </NavLink>
        <CustomTitle style={{ color: "white" }}>Register</CustomTitle>
        <Form form={form} onFinish={onFinish} name="sign_in_form">
          <FormItem
            name="username"
            rules={[
              {
                required: true,
                message: "Please enter your user name!",
              },
            ]}
          >
            <CustomInput onChange={handleChange} placeholder="User Name" />
          </FormItem>
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
            <CustomInput
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              suffix={
                <PasswordToggle>
                  {showPassword ? (
                    <EyeInvisibleOutlined
                      onClick={() => setShowPassword(false)}
                      color="white"
                    />
                  ) : (
                    <EyeOutlined
                      onClick={() => setShowPassword(true)}
                      color="white"
                    />
                  )}
                </PasswordToggle>
              }
            />
          </FormItem>
          <RightAlignedButtonWrapper right={buttonRight}>
            <SubmitButton
              onMouseEnter={handleMouseEnter}
              htmlType="submit"
              size="large"
            >
              {showEmoji ? "🤬" : "Register"}
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

export default SignUpForm;
