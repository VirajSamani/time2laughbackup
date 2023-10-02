import React, { useEffect, useState } from "react";
import { apiCall } from "../../utils/apiCall";
import CustomTitleBar from "../../components/titleBar/CustomTitleBar";
import CustomContainer from "../../styled-common-components/CustomContainer";
import VideoCardGrid from "../../components/videoCard/VideoCardGrid";

const UnAuthHome = () => {
  const [data, setData] = useState([]);

  const feedApi = () => {
    apiCall("feed/videos").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    feedApi();
  }, []);

  return (
    <CustomContainer>
      <CustomTitleBar title="Latest Videos" />
      <VideoCardGrid data={data} />
    </CustomContainer>
  );
};

export default UnAuthHome;
