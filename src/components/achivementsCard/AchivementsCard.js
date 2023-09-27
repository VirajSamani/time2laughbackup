import React from 'react';
import styled from 'styled-components';
import trophy from "../../assets/trophy.png"

// Define a styled component for the Achievement container
const AchievementContainer = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
`;

// Define a styled component for the badge image
const BadgeImage = styled.img`
  max-width: 100px; /* Adjust the badge size as needed */
  height: auto;
`;

// Define a styled component for the achievement text
const AchievementText = styled.p`
  font-size: 14px;
  margin-top: 5px;
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
