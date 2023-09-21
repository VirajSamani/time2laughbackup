import React, { useRef, useEffect, useState } from "react";

function VideoPlayer({ src, thumbnail }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // You can access the video element through videoRef.current
    const video = videoRef.current;

    // Add event listeners if needed (e.g., for handling playback events)
    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);

    // Remove event listeners when the component is unmounted
    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
    };
  }, []);

  // Custom event handlers
  const handlePlay = () => {
    setIsPlaying(true);
    // Handle video play event here if needed
  };

  const handlePause = () => {
    // Handle video pause event here if needed
  };

  const handleThumbnailClick = () => {
    const video = videoRef.current;
    video.play();
  };

  return (
    <div style={{ position: "relative" }}>
      <img
        src={thumbnail}
        alt="Thumbnail"
        style={{
          display: isPlaying ? "none" : "block",
          cursor: "pointer",
          width: "100%",
        }}
        onClick={handleThumbnailClick}
      />
      <video
        ref={videoRef}
        controls
        controlsList="nodownload"
        style={{ display: isPlaying ? "block" : "none", width: "100%" }}
      >
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default VideoPlayer;
