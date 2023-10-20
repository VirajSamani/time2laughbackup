import React from "react";
import styled from "styled-components";
import useProfileStore from "../../store/profileStore";
import FollowButton from "../followButton/FollowButton";
import useAuthStore from "../../store/authStore";
import NamePlate from "../namePlate/NamePlate";

const Card = styled.div`
  max-width: 100%;
  margin: 20px auto;
  display: flex;
  background: linear-gradient(to right, #1c1c1c, #000);
  border: 1px solid #333;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0px 10px 20px 0px rgba(0, 0, 0, 0.4);
  transition: all 0.3s ease;

  &:hover {
    // transform: scale(1.02);
    box-shadow: 0px 12px 24px 0px rgba(0, 0, 0, 0.6);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    max-width: 80%;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: #444;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0px 6px 12px 0px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(10deg);
  }
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
`;

const UserInfoWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  padding-left: 20px;

  @media (max-width: 768px) {
    padding-top: 25px;
    padding-left: 0px;
    align-items: center;
  }
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  margin: 0;
  display: flex;
  align-items: center;
`;

const EmojiIcon = styled.span`
  font-size: 1.5rem;
  margin-right: 10px;
`;

const Email = styled.p`
  font-size: 1.2rem;
  color: #ccc;
  margin: 10px 0;
`;

const FollowersCount = styled.p`
  font-size: 1.2rem;
  color: #bbb;
  margin: 10px 0;
`;

const JoinedDate = styled.p`
  font-size: 1rem;
  color: #ccc;
  margin: 10px 0;
`;

const FollowButtonWrapper = styled.div`
  margin-top: 10px;
  align-self: flex-end;
`;

const UserProfileCard = () => {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();

  const showFollowButton = user._id !== profile?._id;

  return (
    <Card>
      <ProfileImageWrapper>
        <ProfileImage
          src={
            profile?.profilePicture ||
            "https://xsgames.co/randomusers/avatar.php?g=pixel"
          }
          alt="Profile Picture"
        />
      </ProfileImageWrapper>
      <UserInfoWrapper>
        <UserName>
          <EmojiIcon>😄</EmojiIcon>
          <NamePlate
            nickName={profile?.nickName}
            username={profile?.username}
            verified={profile?.verified}
          />
        </UserName>
        <Email>
          <EmojiIcon>✉️</EmojiIcon>
          {profile?.email}
        </Email>
        <FollowersCount>
          <EmojiIcon>👥</EmojiIcon>
          {profile?.followers || 0}
        </FollowersCount>
        <JoinedDate>
          <EmojiIcon>📅</EmojiIcon>
          {new Date(profile?.createdAt).toLocaleDateString()}
        </JoinedDate>
      </UserInfoWrapper>
      <FollowButtonWrapper>
        {showFollowButton && <FollowButton />}
      </FollowButtonWrapper>
    </Card>
  );
};

export default UserProfileCard;
