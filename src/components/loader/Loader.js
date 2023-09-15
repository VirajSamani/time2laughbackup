import React, { useEffect } from "react";
import loadGIF from "../../assets/mr-bean-waiting.gif";
import styled, { keyframes } from "styled-components";
import { useLoader } from "../../context/LoaderContext";

const blink = keyframes`
  0% {
    opacity: 0.9;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.9;
  }
`;

const LoaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8); /* Semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* Ensure the loader is above other content */
  animation: ${blink} 0.5s linear infinite; /* Fast blinking animation */
`;

const LoaderImage = styled.img`
  @media (max-width: 768px) {
    width: 100% !important;
  }
`

const Loader = () => {
  const { isLoading } = useLoader(); // Access the loader state

  useEffect(() => {
    // Disable background scrolling when the loader is displayed
    document.body.style.overflow = isLoading ? "hidden" : "visible";

    // Cleanup function to enable scrolling again when the loader is removed
    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isLoading]);

  return (
    isLoading && (
      <LoaderContainer>
        <LoaderImage src={loadGIF} alt="Loading..." />
      </LoaderContainer>
    )
  );
};

export default Loader;
