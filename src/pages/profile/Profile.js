import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import CustomContainer from "../../styled-common-components/CustomContainer";
import { Flex } from "../../styled-common-components/Display";
import Section from "../../styled-common-components/Section";

import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import IntroPlayer from "../../components/introPlayer/IntroPlayer";
import Achievements from "../../components/achivements/Achivements";
import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import useProfileStore from "../../store/profileStore";
import ProfileContentTab from "../../components/profileContentTab/ProfileContentTab";
import SubInfo from "../../components/subInfo/SubInfo";
import { Button, Modal } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { color } from "../../utils/color";
import EditProfileForm from "../../components/forms/EditProfileForm";

const Container = styled(CustomContainer)`
  background-color: #0f0f0f;
  color: #ddd;
  border-radius: 8px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
`;

const UserDetailsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (min-width: 768px) {
    width: 44%;
  }
`;

const MainTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 20px;
  color: #ddd;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const EditButton = styled(Button)`
  && {
    background-color: ${color.primary};
    border-color: ${color.primary};
    color: #000; // Text color
    :hover {
      background-color: ${color.secondary};
      color: #000; // Text colors
    }
  }
`;

const Profile = () => {
  const { username } = useParams();
  const { profile, addProfileInfo } = useProfileStore();
  const { showLoader, hideLoader } = useLoader();

  const [isEditing, setIsEditing] = useState(false); // State for the modal

  const openEditModal = () => {
    setIsEditing(true);
  };

  const closeEditModal = () => {
    setIsEditing(false);
  };

  useEffect(() => {
    showLoader();
    const url = username ? `comedian/${username}` : "comedian";
    apiCall(url).then((data) => {
      addProfileInfo(data);
      hideLoader();
    });
  }, []);

  return (
    <Section>
      <Container>
        <TitleDiv>
          <MainTitle>Comedian Profile</MainTitle>
          <EditButton onClick={openEditModal} icon={<EditOutlined />}>
            Edit
          </EditButton>
        </TitleDiv>
        <UserProfileCard />
        <Flex flexWrap="wrap">
          <UserDetailsWrapper>
            <IntroPlayer />
            <SubInfo
              title="About"
              infoText={profile.about || "This is about."}
            />
            <SubInfo
              title="Tag Line"
              infoText={profile.tagline || "This is tagline."}
            />
            {profile?.achievements?.length ? (
              <Achievements title={"Experience & Achievement"} />
            ) : (
              <></>
            )}
            <SubInfo
              title="Why This?"
              infoText={profile.why || "This is why."}
            />
          </UserDetailsWrapper>
          <ProfileContentTab />
        </Flex>
      </Container>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Modal
        title="Edit Profile"
        visible={isEditing}
        onCancel={closeEditModal}
        footer={null}
      >
        <EditProfileForm closeEditModal={closeEditModal} data={profile} setData={addProfileInfo} />
      </Modal>
    </Section>
  );
};

export default Profile;
