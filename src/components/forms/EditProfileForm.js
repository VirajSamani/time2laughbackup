import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Modal, message } from "antd";
import Stepper from "react-stepper-horizontal";
import Cloudinary from "../Cloudinary/Cloudinary";
import { apiCall } from "../../utils/apiCall";

const EditProfileFormWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const ThumbnailImage = styled.img`
  width: 50%;
`;

const EditProfileForm = ({ closeEditModal, data, setData }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [isImageModalVisible, setImageModalVisible] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);
  const [secureUrl, setSecureUrl] = useState("");

  const [form] = Form.useForm();

  const showImageModal = () => {
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  const showVideoModal = () => {
    setVideoModalVisible(true);
  };

  const okImageModal = () => {
    if (secureUrl) {
      const payload = { profilePicture: secureUrl };
      apiCall("/comedian", "PATCH", payload).then((response) => {
        setData({ ...data, profilePicture: response.profilePicture });
        message.success("Profile Image updated successfully.");
        setImageModalVisible(false);
      });
    }
  };

  const closeVideoModal = () => {
    setVideoModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission, e.g., updating the user's profile
    if (values.nickname) {
      const payload = { nickName: values.nickname };
      apiCall("/comedian", "PATCH", payload)
        .then((response) => {
          setData({ ...data, nickName: response.nickName });
          message.success("Profile updated successfully.");
          setImageModalVisible(false);
        })
        .finally(closeEditModal);
    }
  };

  const handleNextStep = () => {
    // Handle moving to the next step
    if (currentStep === 0 && videoFile) {
      setCurrentStep(currentStep + 1);
    } else if (currentStep === 1 && thumbnailFile && videoFile) {
      const payload = {
        introVideo: videoFile,
        introThumbnail: thumbnailFile,
      };
      apiCall("/comedian", "PATCH", payload)
        .then((response) => {
          setData({ ...data, nickName: response.nickName });
          message.success("Profile updated successfully.");
          setImageModalVisible(false);
        })
        .finally(closeVideoModal);
      message.success("Intro Video and Thumbnail updated successfully.");
    }
  };

  return (
    <EditProfileFormWrapper>
      <h2>Edit Profile</h2>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ nickname: data.nickName }}
      >
        <Form.Item
          name="username"
          label="Username"
          initialValue={data.username}
        >
          <Input value={data.username} disabled />
        </Form.Item>
        <Form.Item name="nickname" label="Nickname">
          <Input placeholder="Nickname" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
        <Form.Item label="Profile Picture">
          <Button onClick={showImageModal}>Edit Profile Image</Button>
        </Form.Item>
        <Form.Item label="Intro Video">
          <Button onClick={showVideoModal}>Edit Intro Video</Button>
        </Form.Item>
      </Form>

      <Modal
        title="Edit Profile Image"
        visible={isImageModalVisible}
        onOk={okImageModal}
        onCancel={closeImageModal}
      >
        <ThumbnailImage
          src={
            secureUrl ||
            data.profilePicture ||
            "https://xsgames.co/randomusers/avatar.php?g=pixel"
          }
          alt="Something went wrong."
        />
        <Cloudinary
          type="image"
          secureUrl={secureUrl}
          setSecureUrl={setSecureUrl}
        />
      </Modal>

      <Modal
        title="Edit Intro Video"
        visible={isVideoModalVisible}
        onOk={handleNextStep}
        onCancel={closeVideoModal}
        okText={currentStep === 0 ? "Next" : "Save"}
      >
        <Stepper
          steps={[{ title: "Upload Video" }, { title: "Upload Thumbnail" }]}
          activeStep={currentStep}
        />
        {currentStep === 0 && (
          <Cloudinary
            type="video"
            secureUrl={videoFile}
            setSecureUrl={setVideoFile}
          />
        )}
        {currentStep === 1 && (
          <Cloudinary
            type="image"
            secureUrl={thumbnailFile}
            setSecureUrl={setThumbnailFile}
          />
        )}
      </Modal>
    </EditProfileFormWrapper>
  );
};

export default EditProfileForm;
