import React, { useEffect, useState } from "react";
import CustomTitleBar from "../titleBar/CustomTitleBar";
import { apiCall } from "../../utils/apiCall";
import PostCardGrid from "../cardGrid/PostCardGrid";
import { isAuth } from "../../utils/auth";

const PostFeedSection = () => {
  const [data, setData] = useState([]);

  const feedApi = () => {
    apiCall(isAuth() ? "feed/posts" : "feed/posts").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    feedApi();
  }, []);

  return (
    <>
      <CustomTitleBar title="Latest Posts" />
      <PostCardGrid data={data} />
    </>
  );
};

export default PostFeedSection;
