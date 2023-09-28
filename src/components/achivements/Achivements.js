import React from "react";
import styled from "styled-components";
import AchievementCard from "../achivementsCard/AchivementsCard";
import useProfileStore from "../../store/profileStore";

const AchievementWrapper = styled.div`
  padding: 20px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.4);
  margin: 20px 0;

  @media (max-width: 768px) {
    padding: 10px;
    margin: 10px 0;
  }
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const Achievements = ({ title }) => {
  const { profile } = useProfileStore();

  return (
    <AchievementWrapper>
      <Title>{title}</Title>
      {profile.achievements.map((achievement) => (
        <AchievementCard
          key={achievement._id}
          imageUrl={achievement.image}
          title={achievement.title}
        />
      ))}
    </AchievementWrapper>
  );
};

export default Achievements;
