// FollowButton.js
import React from "react";
import styled from "styled-components";
import { color } from "../../utils/color";

// Define the styled button component
const StyledFollowButton = styled.button`
  margin-top: 10px;
  background-color: ${color.secondary};
  color: #ffffff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 5px;
  outline: none;

  &:hover {
    background-color: #005e8a;
  }
`;

// Create the FollowButton component
const FollowButton = () => {
  return <StyledFollowButton>Follow</StyledFollowButton>;
};

export default FollowButton;
