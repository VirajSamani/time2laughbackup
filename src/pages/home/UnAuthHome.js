import React from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import VideoFeedSection from "../../components/feedSection/VideoFeedSection";
import PostFeedSection from "../../components/feedSection/PostFeedSection";
import JokeFeedSection from "../../components/feedSection/JokeFeedSection";

const UnAuthHome = () => {
  return (
    <CustomContainer>
      <VideoFeedSection />
      <PostFeedSection />
      <JokeFeedSection />
    </CustomContainer>
  );
};

export default UnAuthHome;
