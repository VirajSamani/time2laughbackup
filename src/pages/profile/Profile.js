import React, { useEffect } from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import styled from "styled-components";
import { getProfile } from "../../services/profileApiCall";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { Flex } from "../../styled-common-components/Display";

const Section = styled.section`
  min-height: 100vh;
`;

const Container = styled(CustomContainer)`
  padding-top: 65px;
`;

const User = styled.div`
  width: 30%;
  background: grey;
`;

const Player = styled.div`
  width: 70%;
`;

const Profile = () => {
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <Section>
      <Container>
        <Flex>
          <User>Profile</User>
          <Player>
            <VideoPlayer
              thumbnail="https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            />
          </Player>
        </Flex>
      </Container>
    </Section>
  );
};

export default Profile;
