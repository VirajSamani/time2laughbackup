import React, { useEffect } from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";

import CustomContainer from "../../styled-common-components/CustomContainer";
import { Flex } from "../../styled-common-components/Display";
import Section from "../../styled-common-components/Section";

import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import IntroPlayer from "../../components/introPlayer/IntroPlayer";
import SubInfo from "../../components/subInfo/SubInfo";
import Achievements from "../../components/achivements/Achivements";

import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import useProfileStore from "../../store/profileStore";
import ProfileContentTab from "../../components/profileContentTab/ProfileContentTab";

const Container = styled(CustomContainer)`
  padding-top: 20px;
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
        <Flex>
          <UserProfileCard />
          <IntroPlayer />
        </Flex>
        <SubInfo
          title={"Tag Line"}
          description={profile.tagline || "This is tagline."}
        />
        <SubInfo
          title={"About"}
          description={profile.about || "This is about."}
        />
        {profile?.achievements?.length ? (
          <Achievements title={"Experience & Achivement"} />
        ) : (
          <></>
        )}
        <SubInfo
          title={"Why This?"}
          description={profile.why || "This is why."}
        />
        <ProfileContentTab />
        <br />
        <br />
        <br />
        <br />
        <br />
      </Container>
    </Section>
  );
};

export default Profile;
