import React from 'react';
import styled from 'styled-components';
import trophy from "../../assets/trophy.png";

const AchievementContainer = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px;
  }
`;

const BadgeImage = styled.img`
  max-width: 80px; /* Adjust the badge size as needed */
  height: auto;

  @media (max-width: 768px) {
    max-width: 60px;
  }
`;

const AchievementText = styled.p`
  font-size: 16px;
  margin-top: 5px;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AchievementCard = ({ title, imageUrl }) => {
  return (
    <AchievementContainer>
      <BadgeImage src={imageUrl || trophy} alt={title} />
      <AchievementText>{title.toUpperCase()}</AchievementText>
    </AchievementContainer>
  );
};

export default AchievementCard;
