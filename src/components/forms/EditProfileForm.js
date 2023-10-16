import React, { useState } from "react";
import styled from "styled-components";
import { Form, Input, Button, Modal } from "antd";

const EditProfileFormWrapper = styled.div`
  text-align: center;
  margin: 20px;
`;

const EditProfileForm = ({ data }) => {
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  const [form] = Form.useForm(); // Initialize the Ant Design Form

  const showImageModal = () => {
    setImageModalVisible(true);
  };

  const closeImageModal = () => {
    setImageModalVisible(false);
  };

  const onFinish = (values) => {
    // Handle form submission, e.g., updating the user's profile
    console.log("Form values:", values);
  };

  console.log("data", data);

  return (
    <EditProfileFormWrapper>
      <h2>Edit Profile</h2>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{ nickname: data.nickName }}
      >
        <Form.Item name="nickname" label="Nickname">
          <Input placeholder="Nickname" />
        </Form.Item>
        <Form.Item
          name="username"
          label="Username"
          initialValue={data.username}
        >
          <Input value={data.username} disabled />
        </Form.Item>
        <Form.Item label="Profile Picture">
          <Button onClick={showImageModal}>Edit Profile Image</Button>
        </Form.Item>
        <Form.Item label="Intro Video">
          <Button onClick={showImageModal}>Edit Intro Video</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>

      <Modal
        title="Edit Profile Image"
        visible={isImageModalVisible}
        onOk={closeImageModal}
        onCancel={closeImageModal}
      >
        {/* Your profile image update form goes here */}
      </Modal>

      <Modal
        title="Edit Intro Video"
        visible={isImageModalVisible}
        onOk={closeImageModal}
        onCancel={closeImageModal}
      >
        {/* Your profile image update form goes here */}
      </Modal>
    </EditProfileFormWrapper>
  );
};

export default EditProfileForm;
