import React from "react";
import styled from "styled-components";

// Define the styled components
const InfoWrapper = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  margin: 10px 0px;

  @media (max-width: 768px) {
    padding: 10px;
    width: 90%;
    margin: 10px auto;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Description = styled.p`
  font-size: 16px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const SubInfo = ({ title, description }) => {
  return (
    <InfoWrapper>
      <Title>{title}</Title>
      <Description>{description}</Description>
    </InfoWrapper>
  );
};

export default SubInfo;
