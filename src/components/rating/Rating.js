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
  & .ant-rate-star-full .anticon {
    color: ${color.primary}; /* Change the color to your desired color */
  }
`;

const Rating = () => (
  <>
    <CustomRate
      disabled={true}
      defaultValue={4}
      character={({ index }) => customIcons[index + 1]}
    />
  </>
);
export default Rating;
