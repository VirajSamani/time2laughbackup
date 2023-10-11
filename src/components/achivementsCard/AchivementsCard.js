import React from "react";
import styled from "styled-components";
import { TrophyOutlined } from "@ant-design/icons";

const AchievementContainer = styled.div`
  display: inline-block;
  text-align: center;
  margin: 10px;
  padding: 10px;
  border: 1px solid #333; /* Dark border color */
  border-radius: 10px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  background-color: #262626; /* Dark background color */

  @media (max-width: 768px) {
    padding: 5px;
    margin: 5px;
  }
`;

const BadgeImage = styled.div`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ff69b4; /* Pink color, customize as needed */
  border-radius: 50%;
  margin: 0 auto;
  color: #fff;
`;

const AchievementText = styled.p`
  font-size: 16px;
  margin-top: 5px;
  color: #fff; /* Text color for the Achievement text */

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const AchievementCard = ({ title }) => {
  return (
    <AchievementContainer>
      <BadgeImage>
        <TrophyOutlined style={{ fontSize: "40px" }} />
      </BadgeImage>
      <AchievementText>{title.toUpperCase()}</AchievementText>
    </AchievementContainer>
  );
};

export default AchievementCard;
