import React from "react";
import { Tabs } from "antd";
import VideoList from "./VideoList";
import PostList from "./PostList";
import JokeList from "./JokeList";
import styled from "styled-components";
import {
  PlayCircleOutlined,
  EditOutlined,
  SmileOutlined,
} from "@ant-design/icons"; // Import Ant Design icons

const { TabPane } = Tabs;

const ProfileContentTabContainer = styled.div`
  width: 50%;
  background-color: #121212;
  color: #fff;
  border-radius: 0;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;

  @media (max-width: 768px) {
    width: 90%;
    padding: 10px;
  }
`;

const TabsContainer = styled.div`
  border-radius: 0;
  overflow: hidden;
  background-color: #121212;
  border-bottom: 1px solid #333;
  .ant-tabs-content {
    height: 100%; /* Set the content height to 100% */
  }
`;

const TabTitle = styled.h3`
  font-size: 20px;
  color: #fff;
  margin: 0;
  display: flex;
  align-items: center;

  &.videos-tab {
    color: #ff69b4;
  }
  &.posts-tab {
    color: #32cd32;
  }
  &.jokes-tab {
    color: #4169e1;
  }
`;

const ProfileContentTab = () => {
  const onChange = (key) => {
    console.log(key);
  };

  return (
    <ProfileContentTabContainer>
      <TabsContainer>
        <Tabs defaultActiveKey="1" onChange={onChange}>
          <TabPane
            tab={
              <TabTitle className="videos-tab">
                <PlayCircleOutlined /> Videos
              </TabTitle>
            }
            key="1"
          >
            <VideoList />
          </TabPane>
          <TabPane
            tab={
              <TabTitle className="posts-tab">
                <EditOutlined /> Posts
              </TabTitle>
            }
            key="2"
          >
            <PostList />
          </TabPane>
          <TabPane
            tab={
              <TabTitle className="jokes-tab">
                <SmileOutlined /> Jokes
              </TabTitle>
            }
            key="3"
          >
            <JokeList />
          </TabPane>
        </Tabs>
      </TabsContainer>
    </ProfileContentTabContainer>
  );
};

export default ProfileContentTab;
