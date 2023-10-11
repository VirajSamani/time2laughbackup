import React, { useRef, useState } from "react";
import styled from "styled-components";

const VideoWrapper = styled.div`
  width: 100%;
  background-color: #0f0f0f;
`;

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: fit-content;
  margin: ${(props) => (props.center ? "0 auto" : "0")};
  cursor: pointer;
  transition: opacity 0.3s ease;
`;

const ThumbnailImage = styled.img`
  width: 100%;
  height: ${(props) => (props.customHeight ? props.customHeight : "100%")};
  object-fit: cover;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: ${(props) => (props.customHeight ? props.customHeight : "100%")};
  object-fit: cover;
  opacity: ${(props) => (props.isPlaying ? 1 : 0)};
  transition: opacity 0.3s ease;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 8px;
  @media (max-width: 768px) {
    height: 100%;
  }
`;

function VideoPlayer({ src, thumbnail, height, center }) {
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
    <VideoWrapper>
      <VideoContainer center={center} onClick={handleThumbnailClick}>
        <ThumbnailImage
          customHeight={height}
          src={thumbnail}
          alt="Thumbnail"
          style={{ opacity: isPlaying ? 0 : 1 }}
        />
        <VideoElement
          customHeight={height}
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
    </VideoWrapper>
  );
}

export default VideoPlayer;
