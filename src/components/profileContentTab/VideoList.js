// VideoList.js
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import Rating from "../rating/Rating";

const VideoListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const VideoItem = styled(Card)`
  width: 300px;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  h3 {
    margin: 10px 0;
  }
`;

const VideoList = () => {
  const [videos, setVideos] = useState([]);

  const getVideoList = () => {
    apiCall("/videos/").then((response) => {
      setVideos(response);
    });
  };

  useEffect(() => {
    getVideoList();
  }, []);

  return (
    <VideoListWrapper>
      {videos.map((video) => (
        <VideoItem key={video._id}>
          <img
            src={
              video.thumbnail ||
              "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
            }
            alt={video.title}
          />
          <h3>{video.title}</h3>
          <p>{video.description}</p>
          <p>
            <Rating rate={video.rating} />
          </p>
        </VideoItem>
      ))}
    </VideoListWrapper>
  );
};

export default VideoList;
