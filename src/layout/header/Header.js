import React from "react";
import styled from "styled-components";
import CustomContainer from "../../styled-common-components/CustomContainer";
import logo from "../../assets/finallogo.png"

const Img = styled.img`
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
`;

const Header = () => {
  return (
    <CustomContainer fluid={true}>
      <Img src={logo} alt="logo" />
    </CustomContainer>
  );
};

export default Header;
