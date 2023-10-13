import React from "react";
import { FrownOutlined, MehOutlined, SmileOutlined } from "@ant-design/icons";
import { Rate } from "antd";
import styled from "styled-components";
import { color } from "../../utils/color";

const customIcons = {
  1: <FrownOutlined style={{ fontSize: "16px" }} />,
  2: <FrownOutlined style={{ fontSize: "16px" }} />,
  3: <MehOutlined style={{ fontSize: "16px" }} />,
  4: <SmileOutlined style={{ fontSize: "16px" }} />,
  5: <SmileOutlined style={{ fontSize: "16px" }} />,
};

const CustomRate = styled(Rate)`
  .anticon {
    color: gray;
  }
  & .ant-rate-star-full .anticon {
    color: ${color.primary};
  }
`;

const RatingContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 16px;
  color: ${color.primary};
`;

const Rating = ({ rate, isReviewAllowed, onRate, yourRate }) => (
  <RatingContainer>
    <CustomRate
      disabled={isReviewAllowed ? false : true}
      defaultValue={isReviewAllowed ? yourRate || 0 : rate}
      onChange={onRate}
      character={({ index }) => customIcons[index + 1]}
    />
    {isReviewAllowed ? `${rate || 0}` : ""}
  </RatingContainer>
);

export default Rating;
