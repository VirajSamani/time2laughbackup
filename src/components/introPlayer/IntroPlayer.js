import React from "react";
import styled from "styled-components";
import VideoPlayer from "../videoPlayer/VideoPlayer";

const Player = styled.div`
  width: 70%;
  @media (max-width: 768px) {
    width: 95%;
    margin-top: 10px;
  }
`;

const IntroPlayer = () => {
  return (
    <Player>
      <VideoPlayer
        thumbnail="https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </Player>
  );
};

export default IntroPlayer;
