import React, { useEffect } from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import styled from "styled-components";
import { Flex } from "../../styled-common-components/Display";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import IntroPlayer from "../../components/introPlayer/IntroPlayer";
import Section from "../../styled-common-components/Section";
import { apiCall } from "../../utils/apiCall";
import { useLoader } from "../../context/LoaderContext";
import useProfileStore from "../../store/profileStore";
import BookMark from "../../components/bookmark/BookMark";

const Container = styled(CustomContainer)`
  padding-top: 20px;
`;

const Profile = () => {
  const { addProfileInfo } = useProfileStore();
  const { showLoader, hideLoader } = useLoader();
  
  useEffect(() => {
    showLoader();
    apiCall("comedian").then((data) => {
      addProfileInfo(data)
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
        <BookMark /> 
      </Container>
    </Section>
  );
};

export default Profile;
