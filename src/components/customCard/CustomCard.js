import React from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const CardContainer = styled.div`
  position: relative;
  height: 150px;
  width: ${(props) => (props.width ? props.width : "23%")};
  background-color: #fce3e3; /* Light pink background color */
  border-radius: 10px;
  overflow: hidden;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  margin: 10px 0px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  @media (max-width: 768px) {
    width: 45%;
    height: 240px;
  }

  ${(props) =>
    props.isJoke &&
    css`
      width: 45%;

      @media (max-width: 768px) {
        width: 95%;
      }
    `}
`;

const CardImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  transition: opacity 0.3s;

  &:hover {
    opacity: 0.8;
  }
`;

const ProfilePicture = styled.img`
  position: absolute;
  bottom: 10px;
  right: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: 2px solid #ffffff;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  color: #ffffff;
  padding: 10px; /* Increased padding for better readability */
  font-size: 16px; /* Larger font size for better visibility */
  opacity: 0;
  transition: opacity 0.3s;
`;

const ContentWrapper = styled.div`
  position: relative;
  height: 100%;
  &:hover ${Tooltip} {
    opacity: 1;
  }
`;

const JokeContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(
    -50%,
    -50%
  ); /* Center the text vertically and horizontally */
  text-align: center; /* Center-align text */
  font-size: 18px; /* Larger font size for jokes */
  color: #333; /* Dark text color */
`;

const CustomCard = ({ data, type, width }) => {
  const isJoke = type === "joke";

  if (isJoke) {
    return (
      <CardContainer width={width} key={data._id} isJoke={isJoke}>
        <ProfilePicture
          src={
            data.profilePicture ||
            "https://xsgames.co/randomusers/avatar.php?g=pixel"
          }
        />
        <Tooltip>{data.content}</Tooltip>
        <JokeContent>{data.content}</JokeContent>
        <Link to={`/profile/${data.username}`}>
          <ProfilePicture
            src={
              data.profilePicture ||
              "https://xsgames.co/randomusers/avatar.php?g=pixel"
            }
          />
        </Link>
      </CardContainer>
    );
  }

  let url = "";
  switch (type) {
    case "video":
      url = `/video/${data._id}`;
      break;
    case "post":
      url = `/post/${data._id}`;
      break;
    default:
      url = "/login";
  }

  return (
    <CardContainer width={width} key={data._id}>
      <ContentWrapper>
        <Link to={url}>
          <CardImage
            src={
              data.thumbnail ||
              "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
            }
            alt={data.title}
          />
        </Link>
        <Link to={`/profile/${data.username}`}>
          <ProfilePicture
            src={
              data.profilePicture ||
              "https://xsgames.co/randomusers/avatar.php?g=pixel"
            }
          />
        </Link>
        <Tooltip>
          {data?.title?.slice(0, 40) || data?.content?.slice(0, 40)}
        </Tooltip>
      </ContentWrapper>
    </CardContainer>
  );
};

export default CustomCard;
