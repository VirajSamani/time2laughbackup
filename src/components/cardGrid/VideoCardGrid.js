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

const VideoCardGrid = ({ data }) => {
  return (
    <GridContainer>
      <Row gutter={24}>
        {data.map((video, index) => (
          <CardCol key={index} xs={24} sm={12} md={8} lg={6}>
            <Card
              style={{ width: 270 }}
              cover={
                <img
                  style={{ height: "170px" }}
                  alt="example"
                  src={
                    video.thumbnail ||
                    "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
                  }
                />
              }
              actions={[
                <Rating key="rating" rate={video.rating || 0} />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={
                  <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
                }
                title={video.title}
                description={
                  <NamePlate
                    nickName={video.nickName}
                    username={video.username}
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

export default VideoCardGrid;
