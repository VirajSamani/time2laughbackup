import React, { useEffect, useState } from "react";
import CustomTitleBar from "../titleBar/CustomTitleBar";
import { apiCall } from "../../utils/apiCall";
import VideoCardGrid from "../cardGrid/VideoCardGrid";
import { isAuth } from "../../utils/auth";

const VideoFeedSection = () => {
  const [data, setData] = useState([]);

  const feedApi = () => {
    apiCall(isAuth() ? "feed/videos" : "feed/videos").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    feedApi();
  }, []);

  return (
    <>
      <CustomTitleBar title="Latest Videos" />
      <VideoCardGrid data={data} />
    </>
  );
};

export default VideoFeedSection;
