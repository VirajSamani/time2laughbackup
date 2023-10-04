import { Avatar } from "antd";
import React from "react";
import { Link } from "react-router-dom";

const ProfileAvatar = ({ username }) => {
  return (
    <Link to={`/profile/${username}`}>
      <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
    </Link>
  );
};

export default ProfileAvatar;
