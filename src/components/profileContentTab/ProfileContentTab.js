import React from "react";
import { Tabs } from "antd";
import VideoList from "./VideoList";
import PostList from "./PostList";
import JokeList from "./JokeList";

const onChange = (key) => {
  console.log(key);
};
const items = [
  {
    key: "1",
    label: "Videos",
    children: <VideoList />,
  },
  {
    key: "2",
    label: "Posts",
    children: <PostList />,
  },
  {
    key: "3",
    label: "Jokes",
    children: <JokeList />,
  },
];
const ProfileContentTab = () => (
  <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
);
export default ProfileContentTab;
