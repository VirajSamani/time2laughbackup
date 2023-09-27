import React from "react";
import styled from "styled-components";
import AchievementCard from "../achivementsCard/AchivementsCard";

// Define the styled components
const AchivementWrapper = styled.div`
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  margin: 10px 0px;

  @media (max-width: 768px) {
    padding: 5px; 
    margin: 5px 0px; /* Adjust margin for smaller screens */
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Achivements = ({ title }) => {
  return (
    <AchivementWrapper>
      <Title>{title}</Title>
      <AchievementCard title="achivement-1" />
      <AchievementCard title="achivement-2" />
      <AchievementCard title="achivement-3" />
    </AchivementWrapper>
  );
};

export default Achivements;
