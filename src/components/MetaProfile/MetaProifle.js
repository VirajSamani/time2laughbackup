import React from "react";
import ProfileAvatar from "../badges/ProfileAvatar";
import styled from "styled-components";
import { Link } from "react-router-dom";
import NamePlate from "../namePlate/NamePlate";

const MetaWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const MetaTitle = styled(Link)`
  font-size: 18px;
  text-decoration: none;
  color: #333; /* Adjust color as needed */
`;

const MetaProifile = ({ username, nickName }) => {
  return (
    <>
      <MetaWrapper>
        <ProfileAvatar username={username} />
        <MetaTitle to={`/profile/${username}`}>
          <NamePlate
            nickName={nickName}
            username={username}
            verified={true}
          />
        </MetaTitle>
      </MetaWrapper>
    </>
  );
};

export default MetaProifile;
