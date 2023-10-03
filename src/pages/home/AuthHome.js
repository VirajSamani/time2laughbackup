import React from "react";
import CustomContainer from "../../styled-common-components/CustomContainer";
import VideoFeedSection from "../../components/feedSection/VideoFeedSection";
import PostFeedSection from "../../components/feedSection/PostFeedSection";
import JokeFeedSection from "../../components/feedSection/JokeFeedSection";

const AuthHome = () => {
  return (
    <>
      <CustomContainer>
        <VideoFeedSection />
        <hr />
        <PostFeedSection />
        <hr />
        <JokeFeedSection />
      </CustomContainer>
    </>
  );
};

export default AuthHome;
