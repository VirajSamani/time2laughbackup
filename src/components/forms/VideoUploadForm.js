import React from "react";
import { Form, Input, Button } from "antd";

const VideoUploadForm = ({ onFinish, form }) => {
  return (
    <Form form={form} name="uploadVideo" onFinish={onFinish}>
      <Form.Item
        name="videoTitle"
        label="Video Title"
        rules={[{ required: true, message: "Please enter the video title!" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Upload
        </Button>
      </Form.Item>
    </Form>
  );
};

export default VideoUploadForm;
