import React from "react";
import styled from "styled-components";

const SubInfoContainer = styled.div`
  background: #262626;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 10px 0px;
  width: 90%;
  @media (max-width: 768px) {
    width: 84%;
  }
`;

const SubInfoTitle = styled.h2`
  font-size: 24px;
  color: #ddd;
  margin-bottom: 10px;
`;

const SubInfoText = styled.p`
  font-size: 16px;
  color: #aaa;
`;

const SubInfo = ({ title, infoText }) => {
  return (
    <SubInfoContainer>
      <SubInfoTitle>{title}</SubInfoTitle>
      <SubInfoText>{infoText}</SubInfoText>
    </SubInfoContainer>
  );
};

export default SubInfo;
