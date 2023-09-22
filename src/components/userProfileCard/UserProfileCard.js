import React from "react";
import styled from "styled-components";

const User = styled.div`
  width: 30%;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const UserProfileCard = () => {
  return (
    <User>
      <h1>Profile</h1>
      <p>Your profile information goes here...</p>
    </User>
  );
};

export default UserProfileCard;
