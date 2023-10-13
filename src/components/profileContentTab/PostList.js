import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import CustomCard from "../customCard/CustomCard";
import { UploadOutlined } from "@ant-design/icons";
import { color } from "../../utils/color";
import PostUploadComponent from "../forms/PostUploadForm";
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/profileStore";

const PostListContainer = styled.div`
  max-height: 830px; /* Set the maximum height you desire */
  overflow-y: auto; /* Add vertical scroll when content overflows */
`;

const PostListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const UploadButton = styled(Button)`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 20px;
  font-size: 20px;
  background-color: ${color.primary};
  border: none;
  border-radius: 10px;
  color: #000;
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: ${color.secondary};
    color: #000;
  }

  &.icon {
    font-size: 24px;
    margin-right: 10px;
  }
`;

const NoPostsMessage = styled.div`
  width: 100%;
  font-size: 18px;
  text-align: center;
  color: #888;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Emoji = styled.span`
  font-size: 36px;
  margin-bottom: 10px;
`;

const FunnySVG = styled.svg`
  width: 100px;
  height: 100px;
  fill: #ff69b4; /* Pink color */
`;

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user } = useAuthStore();
  const { profile } = useProfileStore();

  const showUploadButton = user.id === profile?._id;

  const getPostList = () => {
    apiCall("/posts/").then((response) => {
      setPosts(response);
    });
  };

  useEffect(() => {
    getPostList();
  }, []);

  // Handle modal visibility
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <PostListContainer>
      {showUploadButton && (
        <UploadButton type="primary" onClick={showModal} className="icon">
          <UploadOutlined />
          Upload Post
        </UploadButton>
      )}
      <PostListWrapper>
        {posts.length === 0 ? (
          <NoPostsMessage>
            <Emoji role="img" aria-label="Laughing Face">
              😂
            </Emoji>
            No posts found.
            <FunnySVG>...</FunnySVG>
          </NoPostsMessage>
        ) : (
          posts.map((post) => (
            <CustomCard width="45%" data={post} type="post" />
          ))
        )}
      </PostListWrapper>
      <Modal
        title="Add New Content"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <PostUploadComponent />
      </Modal>
    </PostListContainer>
  );
};

export default PostList;
