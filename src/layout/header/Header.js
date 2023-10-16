import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { SearchOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import logo from "../../assets/finallogo.png";
import { Avatar, Button, Dropdown, Menu as AntdMenu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { isAuth } from "../../utils/auth";
import { color } from "../../utils/color";
import LoginButton from "../../components/buttons/LoginButton";
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/profileStore";

const HeaderSection = styled.div`
  background: ${(props) => (props.isScrolled ? "black" : "transparent")};
  box-shadow: ${(props) =>
    props.isScrolled ? "0 2px 10px rgba(0, 0, 0, 0.1)" : "none"};
  position: fixed;
  top: ${(props) => (props.isHidden ? "-60px" : "0")};
  width: 100%;
  z-index: 1000;
  transition: top 0.3s ease, background 0.3s ease, box-shadow 0.3s ease;
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
`;

const Menu = styled(AntdMenu)`
  list-style: none;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  background: transparent;
  @media (max-width: 768px) {
    display: none;
  }
`;

const MenuItem = styled.li`
  margin-right: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
  transition: color 0.3s ease;
  &:hover {
    color: #333;
  }
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
  background-color: #fff;
  position: fixed;
  top: ${(props) => (props.isOpen ? "0" : "-100%")}; /* Slide from top */
  left: 0; /* Start from the left edge */
  width: 100%; /* Full width */
  overflow-y: auto;
  box-shadow: ${(props) =>
    props.isOpen ? "0 2px 4px rgba(0, 0, 0, 0.1)" : "none"};
  z-index: 1;
  transition: top 0.3s ease, box-shadow 0.3s ease;
`;

const CloseIcon = styled(CloseOutlined)`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: ${color.primary};
  transition: transform 0.3s ease;
  &:hover {
    transform: scale(1.1);
  }
`;

const MobileMenuItem = styled.li`
  padding: 15px;
  text-align: center;
  font-size: 16px;
  color: #555;
  transition: color 0.3s ease;
  &:hover {
    color: #333;
    background-color: ${color.primary}; /* Add background color on hover */
    color: white; /* Change text color to white on hover */
    border-radius: 5px; /* Add rounded corners on hover */
  }
`;

const Header = () => {
  const mobileMenuRef = useRef(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { removeUserInfo } = useAuthStore();
  const { profile } = useProfileStore();
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    removeUserInfo();
    localStorage.clear();
    navigate("/");
  };

  const avatarMenu = (
    <Menu>
      <Menu.Item key="1">
        <Link to="/profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="2">
        <Button onClick={handleLogout}>Logout</Button>
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      if (currentScrollPos > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollPos > prevScrollPos) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollPos]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "auto";
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  // Close mobile menu after clicking a menu item
  const handleMobileMenuItemClick = () => {
    closeMobileMenu();
    navigate("/login");
  };

  return (
    <HeaderSection isScrolled={isScrolled} isHidden={isHidden}>
      <HeaderContainer>
        <Logo onClick={() => navigate("/")} src={logo} alt="logo" />
        <MobileMenuButton onClick={toggleMobileMenu}>
          {mobileMenuOpen ? (
            <CloseIcon onClick={closeMobileMenu} />
          ) : (
            <MenuOutlined style={{ fontSize: "20px", color: color.primary }} />
          )}
        </MobileMenuButton>
        <Menu>
          {isAuth() ? (
            <>
              <MenuItem>
                <Link to="/search">
                  <SearchOutlined
                    style={{
                      color: color.primary,
                      backgroundColor: "transperent",
                    }}
                  />
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/profile">
                  <Dropdown overlay={avatarMenu}>
                    <Avatar
                      style={{ border: `1px solid ${color.secondary}` }}
                      src={
                        profile?.profilePicture ||
                        "https://xsgames.co/randomusers/avatar.php?g=pixel"
                      }
                    />
                  </Dropdown>
                </Link>
              </MenuItem>
            </>
          ) : (
            <MenuItem>
              <LoginButton onClick={() => navigate("/login")} />
            </MenuItem>
          )}
        </Menu>
      </HeaderContainer>
      <MobileMenu isOpen={mobileMenuOpen} ref={mobileMenuRef}>
        <CloseIcon onClick={closeMobileMenu} />
        {isAuth() ? (
          <>
            <MobileMenuItem onClick={() => navigate("/profile")}>
              Profile
            </MobileMenuItem>
            <MobileMenuItem onClick={() => navigate("/search")}>
              Search
            </MobileMenuItem>
            <MobileMenuItem onClick={handleLogout}>Logout</MobileMenuItem>
          </>
        ) : (
          <MobileMenuItem onClick={handleMobileMenuItemClick}>
            Login
          </MobileMenuItem>
        )}
      </MobileMenu>
    </HeaderSection>
  );
};

export default Header;
