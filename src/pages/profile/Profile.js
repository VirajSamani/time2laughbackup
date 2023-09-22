import React from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import styled from "styled-components";
import { Flex } from "../../styled-common-components/Display";
import UserProfileCard from "../../components/userProfileCard/UserProfileCard";
import IntroPlayer from "../../components/introPlayer/IntroPlayer";
import Section from "../../styled-common-components/Section";

const Container = styled(CustomContainer)`
  padding-top: 20px;
`;

const Profile = () => {
  return (
    <Section>
      <Container>
        <Flex>
          <UserProfileCard />
          <IntroPlayer />
        </Flex>
      </Container>
    </Section>
  );
};

export default Profile;
