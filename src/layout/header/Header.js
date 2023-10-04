import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/finallogo.png";
import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import { isAuth } from "../../utils/auth";

const HeaderSection = styled.div`
  background: rgb(230, 244, 241);
  background: linear-gradient(
    0deg,
    rgba(230, 244, 241, 0) 0%,
    rgba(0, 167, 217, 1) 100%
  );

  // box-shadow: 0 2px 10px rgb(230, 244, 241);
  position: fixed;
  top: 0;
  height: 8 0px;
  width: 100%;
  z-index: 1000;
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
  cursor: pointer;
  max-width: 170px;
  width: 100%;
  filter: brightness(0) invert(20%);
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
  cursor: pointer;
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
  const mobileMenuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

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
        <Logo onClick={() => navigate("/")} src={logo} alt="logo" />
        <MobileMenuButton onClick={toggleMobileMenu}>
          <MenuOutlined style={{ fontSize: "20px" }} />
        </MobileMenuButton>
        <Menu>
          {isAuth() ? (
            <>
              <MenuItem onClick={() => navigate("/search")}>
                <SearchOutlined />
              </MenuItem>
              <MenuItem onClick={() => navigate("/profile")}>
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              </MenuItem>
            </>
          ) : (
            <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
          )}
        </Menu>
      </HeaderContainer>
      <MobileMenu isOpen={mobileMenuOpen} ref={mobileMenuRef}>
        {isAuth() ? (
          <>
            <MobileMenuItem onClick={() => navigate("/profile")}>
              Profile
            </MobileMenuItem>
            <MobileMenuItem onClick={() => navigate("/search")}>
              Search
            </MobileMenuItem>
          </>
        ) : (
          <MenuItem onClick={() => navigate("/login")}>Login</MenuItem>
        )}
      </MobileMenu>
    </HeaderSection>
  );
};

export default Header;
