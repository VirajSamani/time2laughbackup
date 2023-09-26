import React from 'react';
import styled from 'styled-components';

const BookmarkContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

const BookmarkIcon = styled.span`
  font-size: 24px;
  color: #007bff; /* Blue color, you can change it */
`;

const BookmarkText = styled.span`
  font-size: 16px;
  font-weight: bold;
`;

const BookMark = () => {
  return (
    <BookmarkContainer>
      <BookmarkIcon>&#9733;</BookmarkIcon>
      <BookmarkText>Bookmark</BookmarkText>
    </BookmarkContainer>
  );
};

export default BookMark;
