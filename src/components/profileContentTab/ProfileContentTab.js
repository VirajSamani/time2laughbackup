import React from "react";
import { Tabs } from "antd";
import VideoList from "./VideoList";
import PostList from "./PostList";
import JokeList from "./JokeList";
import styled from "styled-components";

const { TabPane } = Tabs;

const ProfileContentTabContainer = styled.div`
  // background-color: #1e1e1e;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TabsContainer = styled.div`
  // background-color: #252525;
  border-radius: 8px;
  overflow: hidden;
`;

const ProfileContentTab = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <ProfileContentTabContainer>
      <TabsContainer>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane tab={"Videos"} key="1">
            <VideoList />
          </TabPane>
          <TabPane tab={"Posts"} key="2">
            <PostList />
          </TabPane>
          <TabPane tab={"Jokes"} key="3">
            <JokeList />
          </TabPane>
        </Tabs>
      </TabsContainer>
    </ProfileContentTabContainer>
  );
};

export default ProfileContentTab;
