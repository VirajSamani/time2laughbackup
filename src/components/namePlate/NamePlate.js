import React from "react";
import VerifiedBadge from "../badges/VerifiedBadge";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import { isAuth } from "../../utils/auth";

const NamePlate = ({ nickName, username, verified }) => {
  let verifyBadge = <></>;

  if (verified) {
    verifyBadge = <VerifiedBadge />;
  }

  return (
    <>
      <Tooltip placement="bottom" title={verified && "Verified"}>
        <Link to={isAuth() ? `/profile/${username}` : "/login"}>
          {nickName || username} {verifyBadge}
        </Link>
      </Tooltip>
    </>
  );
};

export default NamePlate;
