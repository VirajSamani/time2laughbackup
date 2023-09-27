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
import { useParams } from "react-router-dom";
import SubInfo from "../../components/subInfo/SubInfo";
import Achivements from "../../components/achivements/Achivements";

const Container = styled(CustomContainer)`
  padding-top: 20px;
`;

const Profile = () => {
  const { username } = useParams();
  const { addProfileInfo } = useProfileStore();
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
          description="this tagline will come from backend."
        />
        <SubInfo
          title={"About"}
          description="this section will come from backend."
        />
        <Achivements title={"Experience & Achivement"}/>
        <SubInfo
          title={"Why This?"}
          description="this section will come from backend."
        />
      </Container>
    </Section>
  );
};

export default Profile;
