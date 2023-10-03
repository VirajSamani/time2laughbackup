import React, { useEffect, useState } from "react";
import CustomTitleBar from "../titleBar/CustomTitleBar";
import { apiCall } from "../../utils/apiCall";
import JokeCardGrid from "../cardGrid/JokeCardGrid";
import { isAuth } from "../../utils/auth";

const JokeFeedSection = () => {
  const [data, setData] = useState([]);

  const feedApi = () => {
    apiCall(isAuth() ? "feed/jokes" : "feed/jokes").then((response) => {
      setData(response.data);
    });
  };

  useEffect(() => {
    feedApi();
  }, []);

  return (
    <>
      <CustomTitleBar title="Latest Jokes" />
      <JokeCardGrid data={data} />
    </>
  );
};

export default JokeFeedSection;
