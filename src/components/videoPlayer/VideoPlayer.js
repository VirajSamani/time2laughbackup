import React, { useRef, useState } from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  height: 0;
  padding-bottom: 56.25%;
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: ${(props) => (props.isPlaying ? 1 : 0)};
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 10px;
`;

function VideoPlayer({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handlePause = () => {
    // setIsPlaying(false);
  };

  const handleThumbnailClick = () => {
    const video = videoRef.current;
    video.play();
  };

  return (
    <VideoContainer onClick={handleThumbnailClick}>
      <ThumbnailImage
        src={thumbnail}
        alt="Thumbnail"
        style={{ opacity: isPlaying ? 0 : 1 }}
      />
      <VideoElement
        ref={videoRef}
        controls
        controlsList="nodownload"
        isPlaying={isPlaying}
        onPlay={handlePlay}
        onPause={handlePause}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoElement>
    </VideoContainer>
  );
}

export default VideoPlayer;
