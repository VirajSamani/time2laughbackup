import React from "react";
import styled from "styled-components";
import useProfileStore from "../../store/profileStore";
import { color } from "../../utils/color";
import FollowButton from "../followButton/FollowButton";
import useAuthStore from "../../store/authStore";
import NamePlate from "../namePlate/NamePlate";

const Card = styled.div`
  width: 400px;
  background-color: #fff;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  @media (max-width: 768px) {
    width: 83%;
  }
`;

const ProfileImageWrapper = styled.div`
  width: 150px;
  height: 150px;
  background-color: ${color.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  // margin: -75px auto 20px;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: white;
  object-fit: cover;
  border: 4px solid ${color.secondary};
`;

const UserInfoWrapper = styled.div`
  text-align: center;
`;

const UserName = styled.h1`
  font-size: 1.5rem;
  margin: 10px 0 0;
`;

const Email = styled.p`
  font-size: 1rem;
  color: #888;
`;

const FollowersCount = styled.p`
  font-size: 1.2rem;
  color: ${color.secondary};
  margin-top: 20px;
`;

const JoinedDate = styled.p`
  font-size: 0.9rem;
  color: #888;
  margin-top: 10px;
`;

const UserProfileCard = () => {
  const { user } = useAuthStore();
  const { profile } = useProfileStore();

  const showFollowButton = user.id !== profile?._id;

  return (
    <Card>
      <ProfileImageWrapper>
        <ProfileImage
          src={profile?.profilePicture || "https://xsgames.co/randomusers/avatar.php?g=pixel"}
          alt="Profile Picture"
        />
      </ProfileImageWrapper>
      <UserInfoWrapper>
        <UserName>
          <NamePlate
            nickName={profile?.nickName}
            username={profile?.username}
            verified={profile?.verified}
          />
        </UserName>
        <Email>Email: {profile?.email}</Email>
        <FollowersCount>Followers: {profile?.followers || 0}</FollowersCount>
        <JoinedDate>
          Joined: {new Date(profile?.createdAt).toLocaleDateString()}
        </JoinedDate>
        {showFollowButton && <FollowButton />}
      </UserInfoWrapper>
    </Card>
  );
};

export default UserProfileCard;
