import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import CustomCard from "../customCard/CustomCard";
import { useParams } from "react-router-dom";
import { Button, Form, Modal } from "antd";
import VideoUploadForm from "../forms/VideoUploadForm";
import { UploadOutlined } from "@ant-design/icons";
import { color } from "../../utils/color";
import useAuthStore from "../../store/authStore";
import useProfileStore from "../../store/profileStore";

const VideoListContainer = styled.div`
  max-height: 830px;
  overflow-y: auto;
`;

const VideoListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 20px;
`;

const NoVideosMessage = styled.div`
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
  fill: #ff69b4;
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

const ModalWrapper = styled(Modal)`
  .ant-modal-content {
    border-radius: 10px;
  }
`;

const VideoList = () => {
  const { username } = useParams();
  const [videos, setVideos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { user } = useAuthStore();
  const { profile } = useProfileStore();

  const [form] = Form.useForm();

  const showUploadButton = user.id === profile?._id;

  const getVideoList = () => {
    const url = username ? `/videos/user/${username}` : "/videos/";
    apiCall(url).then((response) => {
      setVideos(response);
    });
  };

  useEffect(() => {
    getVideoList();
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onFinish = (values) => {
    console.log("Received values:", values);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
    <VideoListContainer>
      {showUploadButton && <UploadButton type="primary" onClick={showModal} className="icon">
        <UploadOutlined />
        Upload Video
      </UploadButton>}
      <VideoListWrapper>
        {videos.length === 0 ? (
          <NoVideosMessage>
            <Emoji role="img" aria-label="Laughing Face">
              😂
            </Emoji>
            No videos found.
            <FunnySVG>...</FunnySVG>
          </NoVideosMessage>
        ) : (
          videos.map((video) => (
            <CustomCard width="45%" data={video} type="video" />
          ))
        )}
      </VideoListWrapper>
      <ModalWrapper
        title="Upload Video"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <VideoUploadForm onFinish={onFinish} form={form} />
      </ModalWrapper>
    </VideoListContainer>
  );
};

export default VideoList;
