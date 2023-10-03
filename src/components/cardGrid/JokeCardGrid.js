import React from "react";
import { Card, Row, Col, Avatar } from "antd";
import styled from "styled-components";
import { EllipsisOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import Rating from "../rating/Rating";
import NamePlate from "../namePlate/NamePlate";

// Create a styled component for the grid container
const GridContainer = styled.div`
  padding: 20px;
`;

const CardCol = styled(Col)`
  display: flex;
  justify-content: center;
`;

const JokeCardGrid = ({ data }) => {
  return (
    <GridContainer>
      <Row gutter={24}>
        {data.map((joke, index) => (
          <CardCol key={index} xs={24} sm={24} md={24} lg={24}>
            <Card
              style={{ width: "100%" }}
              actions={[
                <Rating key="rating" rate={joke.rating || 0} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={joke.content}
                description={
                  <NamePlate
                    nickName={joke.nickName}
                    username={joke.username}
                    verified={true}
                  />
                }
              />
            </Card>
          </CardCol>
        ))}
      </Row>
    </GridContainer>
  );
};

export default JokeCardGrid;
