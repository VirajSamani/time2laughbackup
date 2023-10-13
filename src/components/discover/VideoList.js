import React, { useState } from "react";
import { Button, Row, Col } from "antd";
import styled from "styled-components";
import { color } from "../../utils/color";
import CustomCard from "../customCard/CustomCard";

const VideoListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
  .ant-card-body {
    padding: 0 !important;
  }
`;

const LoadMoreButton = styled(Button)`
  margin-top: 20px;
  width: 100%;
  background-color: ${color.primary};
  color: white;
  border: none;
  border-radius: 8px;
  &:hover {
    background-color: ${color.secondary};
  }
`;

const DiscoveryVideoList = ({ data }) => {
  const [visibleVideos, setVisibleVideos] = useState(3);

  const loadMoreVideos = () => {
    setVisibleVideos((prevVisibleVideos) => prevVisibleVideos + 3);
  };

  return (
    <div>
      <VideoListWrapper>
        {data.slice(0, visibleVideos).map((video) => (
          <CustomCard data={video} type="video" />
        ))}
      </VideoListWrapper>
      {visibleVideos < data.length && (
        <Row justify="center">
          <Col span={22} style={{ textAlign: "center" }}>
            <LoadMoreButton onClick={loadMoreVideos}>Load More</LoadMoreButton>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default DiscoveryVideoList;
