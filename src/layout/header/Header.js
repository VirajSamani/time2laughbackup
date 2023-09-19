import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/finallogo.png";
import { color } from "../../utils/color";

const HeaderSection = styled.div`
  background-color: ${color.primaryBg};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed; /* Make the header fixed at the top */
  top: 0; /* Position it at the top of the viewport */
  width: 100%; /* Full width */
  z-index: 1000; /* Adjust the z-index as needed */
`;

const HeaderContainer = styled.div`
  max-width: 1140px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Logo = styled.img`
  max-width: 170px;
  width: 100%;
`;

const Menu = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  @media (max-width: 768px) {
    display: none; /* Hide menu on smaller screens */
  }
`;

const MenuItem = styled.li`
  margin-right: 20px;
`;

const MobileMenuButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled.div`
  list-style: none;
  position: fixed;
  top: 60px;
  right: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1;
  display: ${(props) => (props.isOpen ? "block" : "none")};
`;

const MobileMenuItem = styled.li`
  padding: 10px;
  text-align: center;
`;

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <HeaderSection>
      <HeaderContainer>
        <Logo src={logo} alt="logo" />
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuOutlined style={{ fontSize: "20px" }} />
        </MobileMenuButton>
        <Menu>
          <MenuItem>Test</MenuItem>
          <MenuItem>One</MenuItem>
          <MenuItem>
            <SearchOutlined />
          </MenuItem>
        </Menu>
      </HeaderContainer>
      <MobileMenu isOpen={mobileMenuOpen} ref={mobileMenuRef}>
        <MobileMenuItem>Test</MobileMenuItem>
        <MobileMenuItem>One</MobileMenuItem>
        <MobileMenuItem>Search</MobileMenuItem>
      </MobileMenu>
    </HeaderSection>
  );
};

export default Header;
