import React from "react";
import VerifiedBadge from "../badges/VerifiedBadge";
import { Tooltip } from "antd";

const NamePlate = ({ nickName, username, verified }) => {
  let verifyBadge = <></>;

  if (verified) {
    verifyBadge = <VerifiedBadge />;
  }

  return (
    <>
      <Tooltip placement="bottom" title="Verified" >
        @{nickName || username} {verifyBadge}
      </Tooltip>
    </>
  );
};

export default NamePlate;
