import React, { useEffect } from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import styled from "styled-components";
import { getProfile } from "../../services/profileApiCall";

const Section = styled.section`
  min-height: 100vh;
`;

const Container = styled(CustomContainer)`
  padding-top: 65px;
`;

const Profile = () => {

  useEffect(() => {
    getProfile();
  }, [])
  

  return (
    <Section>
      <Container>Profile</Container>
    </Section>
  );
};

export default Profile;
