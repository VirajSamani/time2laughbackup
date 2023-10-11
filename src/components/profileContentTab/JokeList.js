import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form, Input } from "antd";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import Rating from "../rating/Rating";
import { UploadOutlined } from "@ant-design/icons";
import { color } from "../../utils/color";

const JokeListContainer = styled.div`
  max-height: 830px; /* Set the maximum height you desire */
  overflow-y: auto; /* Add vertical scroll when content overflows */
`;

const JokeListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  margin: 0 auto;
`;

const JokeItem = styled(Card)`
  width: 100%;
  .ant-card-body {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  h3 {
    margin: 10px 0;
  }
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

const NoJokesMessage = styled.div`
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

const JokeList = () => {
  const [jokes, setJokes] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Add form states
  const [form] = Form.useForm();

  const getJokeList = () => {
    apiCall("/jokes/").then((response) => {
      setJokes(response);
    });
  };

  useEffect(() => {
    getJokeList();
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
    // You can send a POST request to your server with the joke data here
    console.log("Received values:", values);
    // Close the modal
    setIsModalVisible(false);
    // Clear the form
    form.resetFields();
  };

  return (
    <JokeListContainer>
      <UploadButton type="primary" onClick={showModal} className="icon">
        <UploadOutlined />
        Upload Joke
      </UploadButton>
      <JokeListWrapper>
        {jokes.length === 0 ? (
          <NoJokesMessage>
            <Emoji role="img" aria-label="Laughing Face">
              😄
            </Emoji>
            No jokes found.
            <FunnySVG>...</FunnySVG>
          </NoJokesMessage>
        ) : (
          jokes.map((joke) => (
            <JokeItem key={joke._id}>
              {joke.url && (
                <img
                  src={
                    joke.url ||
                    "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
                  }
                  alt={joke.content}
                />
              )}
              <h3>{joke.content}</h3>
              <Rating rate={joke.rating} />
            </JokeItem>
          ))
        )}
      </JokeListWrapper>
      <Modal
        title="Add New Joke"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} name="addJoke" onFinish={onFinish}>
          <Form.Item
            name="jokeContent"
            label="Joke Content"
            rules={[
              { required: true, message: "Please enter the joke content!" },
            ]}
          >
            <Input />
          </Form.Item>

          {/* You can add more form fields as needed */}

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </JokeListContainer>
  );
};

export default JokeList;
