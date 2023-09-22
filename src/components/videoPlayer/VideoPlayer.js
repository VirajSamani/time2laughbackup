import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";

const VideoContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px; /* Set a maximum width if needed */
  margin: 0 auto;
  height: 0;
  padding-bottom: 56.25%; /* 16:9 aspect ratio (9 / 16 * 100%) */
`;

const ThumbnailImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio and cover container */
  cursor: pointer;
`;

const VideoElement = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* Maintain aspect ratio and cover container */
`;

function VideoPlayer({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

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
    <VideoContainer>
      <ThumbnailImage
        src={thumbnail}
        alt="Thumbnail"
        style={{
          display: isPlaying ? "none" : "block",
        }}
        onClick={handleThumbnailClick}
      />
      <VideoElement
        ref={videoRef}
        controls
        controlsList="nodownload"
        style={{ display: isPlaying ? "block" : "none" }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </VideoElement>
    </VideoContainer>
  );
}

export default VideoPlayer;
