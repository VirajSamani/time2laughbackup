import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import { useLoader } from "../../context/LoaderContext";
import { apiCall } from "../../utils/apiCall";
import styled from "styled-components";
import ActionHandler from "../../components/actionHandler/ActionHandler";
import { Modal, Form, Input, message } from "antd";
import Cloudinary from "../../components/Cloudinary/Cloudinary";
import MetaProifile from "../../components/MetaProfile/MetaProifle";

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  border-radius: 4px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin: 0;
  padding: 10px 0;
`;

const ThumbnailImage = styled.img`
  max-width: 100%;
  height: 500px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin: 0 auto;
`;

const PostWatcher = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { showLoader, hideLoader } = useLoader();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const getPostData = () => {
    showLoader();
    apiCall(`posts/${id}`)
      .then((response) => {
        setData(response);
        setLoading(false);
        hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching post data:", error);
        setLoading(false);
        hideLoader();
      });
  };

  useEffect(() => {
    getPostData();
  }, [id]);

  // Modal states
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // Form states
  const [form] = Form.useForm();

  // Functions to open and close modals
  const openEditModal = () => {
    setEditModalVisible(true);
  };

  const closeEditModal = () => {
    form.resetFields();
    setEditModalVisible(false);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = () => {
    apiCall(`/posts/${data._id}`, "DELETE").then((response) => {
      message.success(response.msg);
      setDeleteModalVisible(false);
      navigate("/profile");
    });
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      values = { ...values, tags: values.tags.split(",") };
      apiCall(`/posts/${data._id}`, "PUT", values).then((response) => {
        setData({ ...data, ...response });
      });
      closeEditModal();
    });
  };

  return (
    <Section>
      <CustomContainer
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          gap: "20px",
        }}
        loading={loading}
      >
        <ThumbnailImage src={data.thumbnail} alt={data.title} />
        <DetailWrapper>
          <Title>{data.content}</Title>
          <MetaProifile username={data.username} nickName={data.nickName} />
        </DetailWrapper>
        <ActionHandler
          onEditClick={openEditModal}
          onDeleteClick={openDeleteModal}
        />
      </CustomContainer>

      <Modal
        title="Edit Post"
        visible={editModalVisible}
        onOk={handleEditSubmit}
        onCancel={closeEditModal}
        okText="Save"
        cancelText="Cancel"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Title"
            name="title"
            initialValue={data.title}
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Video URL"
            name="videoUrl"
            initialValue={data.videoUrl}
            rules={[
              { required: true, message: "Please enter the video URL" },
              {
                type: "url",
                message: "Please enter a valid URL",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            initialValue={data.tags?.join(",")}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Post"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText="DELETE"
        okType="danger"
      >
        <p>Are you sure you want to delete this post?</p>
      </Modal>
    </Section>
  );
};

export default PostWatcher;
