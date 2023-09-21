import React from "react";
import styled from "styled-components";
import first from "../../assets/not_found.png";

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const NotFoundTitle = styled.h1`
  font-size: 4rem;
  color: #333;
`;

const NotFoundMessage = styled.p`
  font-size: 1.5rem;
  color: #777;
`;

const NotFoundPage = () => {
  const images = [first];
  const randomIndex = Math.floor(Math.random() * (images.length + 1))
  return (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundMessage>Page Not Found</NotFoundMessage>
    </NotFoundContainer>
  );
};

export default NotFoundPage;
