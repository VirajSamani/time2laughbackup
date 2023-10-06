import React from "react";
import styled from "styled-components";
import { Tooltip } from "antd";
import { color } from "../../utils/color";
import { UserOutlined } from "@ant-design/icons";

const StyledButton = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1); /* Add a slight scaling effect on hover */
  }
`;

const AvatarContainer = styled.div`
  background-color: ${color.primary};
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  font-weight: bold;
  transition: background-color 0.3s ease;
`;

const StyledTooltip = styled(Tooltip)`
  .ant-tooltip-inner {
    background-color: transparent;
    border: none;
    padding: 0;
    box-shadow: none;
    max-width: none;
    color: white;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    .ant-tooltip-inner {
      opacity: 1;
    }
  }
`;

const LoginButton = ({ onClick }) => {
  return (
    <StyledTooltip
      title="Log In"
      placement="bottom"
      arrow={false}
      autoAdjustOverflow={false}
    >
      <StyledButton onClick={onClick}>
        <AvatarContainer>
          <UserOutlined />
        </AvatarContainer>
      </StyledButton>
    </StyledTooltip>
  );
};

export default LoginButton;
