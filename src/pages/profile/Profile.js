import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import CustomContainer from "../../styled-common-components/CustomContainer";
import { Flex } from "../../styled-common-components/Display";
import Section from "../../styled-common-components/Section";

import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import IntroPlayer from "../../components/introPlayer/IntroPlayer";
import Achievements from "../../components/achivements/Achivements"; // Corrected import
import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import useProfileStore from "../../store/profileStore";
import ProfileContentTab from "../../components/profileContentTab/ProfileContentTab";
import SubInfo from "../../components/subInfo/SubInfo";

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

const Profile = () => {
  const { username } = useParams();
  const { profile, addProfileInfo } = useProfileStore();
  const { showLoader, hideLoader } = useLoader();

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
        <MainTitle>Comedian Profile</MainTitle>
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
    </Section>
  );
};

export default Profile;
