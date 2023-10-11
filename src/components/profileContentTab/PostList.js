import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import Rating from "../rating/Rating";
import CustomCard from "../customCard/CustomCard";
import { UploadOutlined } from "@ant-design/icons";
import { color } from "../../utils/color";

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

  // Add form states
  const [form] = Form.useForm();

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

  // Handle form submission
  const onFinish = (values) => {
    // You can send a POST request to your server with the content data here
    console.log("Received values:", values);
    // Close the modal
    setIsModalVisible(false);
    // Clear the form
    form.resetFields();
  };

  return (
    <PostListContainer>
      <UploadButton type="primary" onClick={showModal} className="icon">
        <UploadOutlined />
        Upload Post
      </UploadButton>
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
        <Form form={form} name="addContent" onFinish={onFinish}>
          <Form.Item
            name="contentTitle"
            label="Content Title"
            rules={[
              { required: true, message: "Please enter the content title!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </PostListContainer>
  );
};

export default PostList;
