import React from "react";
import styled from "styled-components";
import first from "../../assets/not_found.png";
import second from "../../assets/not_found_1.jpg";
import third from "../../assets/not_found_2.png";

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

const Img = styled.img`
  width: 30%;
  @media (max-width: 768px) {
    width: 90% !important;
  }
`;

const NotFoundPage = () => {
  const images = [first, second, third];
  const randomIndex = Math.floor(Math.random() * (images.length + 1));
  console.log(randomIndex);
  let component = (
    <NotFoundContainer>
      <NotFoundTitle>404</NotFoundTitle>
      <NotFoundMessage>Page Not Found</NotFoundMessage>
    </NotFoundContainer>
  );

  if (randomIndex < images.length) {
    component = (
      <NotFoundContainer>
        <Img src={images[randomIndex]} />
      </NotFoundContainer>
    );
  }

  return component;
};

export default NotFoundPage;
