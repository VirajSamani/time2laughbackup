import React from "react";
import styled from "styled-components";
import VideoPlayer from "../videoPlayer/VideoPlayer";

const Player = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto 20px auto;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const IntroPlayer = () => {
  return (
    <Player>
      <VideoPlayer
        center={true}
        thumbnail="https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
      />
    </Player>
  );
};

export default IntroPlayer;
