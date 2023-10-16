import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import VideoPlayer from "../../components/videoPlayer/VideoPlayer";
import { useLoader } from "../../context/LoaderContext";
import { apiCall } from "../../utils/apiCall";
import styled from "styled-components";
import Rating from "../../components/rating/Rating";
import useAuthStore from "../../store/authStore";
import ActionHandler from "../../components/actionHandler/ActionHandler";
import { Modal, Button, Form, Input, message } from "antd";
import MetaProifile from "../../components/MetaProfile/MetaProifle";
import Cloudinary from "../../components/Cloudinary/Cloudinary";

const DetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
  padding: 20px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const Description = styled.p`
  font-size: 16px;
  line-height: 1.5;
`;

const ThumbnailImage = styled.img`
  width: 50%;
`;

const VideoWatcher = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const { showLoader, hideLoader } = useLoader();

  const { user } = useAuthStore();

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [secureUrl, setSecureUrl] = useState("");

  const showActionStatus = user?.username === data?.username;

  const getVideoData = () => {
    showLoader();
    apiCall(`videos/${id}`)
      .then((response) => {
        setData(response);
        setLoading(false);
        hideLoader();
      })
      .catch((error) => {
        console.error("Error fetching video data:", error);
        setLoading(false);
        hideLoader();
      });
  };

  const handleRatingChange = (rating) => {
    apiCall(`/videos/rating/${data._id}`, "POST", { rate: rating }).then(
      (response) => {
        setData({ ...data, rating: response.rating });
      }
    );
  };

  useEffect(() => {
    getVideoData();
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
    setSecureUrl("");
    setEditModalVisible(false);
  };

  const openDeleteModal = () => {
    setDeleteModalVisible(true);
  };

  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };

  const handleDelete = () => {
    apiCall(`/videos/${data._id}`, "DELETE").then((response) => {
      message.success(response.msg);
      setDeleteModalVisible(false);
      navigate("/profile");
    });
    setDeleteModalVisible(false);
  };

  const handleEditSubmit = () => {
    form.validateFields().then((values) => {
      values = { ...values, tags: values.tags.split(",") };
      let payload = { ...values, thumbnail: data.thumbnail };
      if (secureUrl) {
        payload = { ...values, thumbnail: secureUrl };
      }
      apiCall(`/videos/${data._id}`, "PUT", payload).then((response) => {
        setData({ ...data, ...response });
      });
      closeEditModal();
    });
  };

  return (
    <Section>
      <VideoPlayer
        center={true}
        height="450px"
        thumbnail={
          data.thumbnail ||
          "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
        }
        src={
          data.url ||
          "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        }
      />
      <CustomContainer loading={loading}>
        {showActionStatus && (
          <ActionHandler
            onEditClick={openEditModal} // Open the Edit modal when the button is clicked
            onDeleteClick={openDeleteModal} // Open the Delete modal when the button is clicked
          />
        )}
        <DetailWrapper>
          <Title>{data.title}</Title>
          <Rating
            rate={data.rating}
            yourRate={data.yourReview}
            onRate={handleRatingChange}
            isReviewAllowed={true}
          />
          <MetaProifile username={data.username} nickName={data.nickName} />
          <Description>{data.description}</Description>
        </DetailWrapper>
      </CustomContainer>

      <Modal
        title="Edit Video"
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
            initialValue={data.title} // Set initial value from the video data
            rules={[{ required: true, message: "Please enter the title" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            initialValue={data.description} // Set initial value from the video data
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item label="Thumbnail Image">
            <ThumbnailImage
              src={
                secureUrl ||
                data.thumbnail ||
                "https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png"
              }
              alt="Something went wrong."
            />
            <Cloudinary
              type="image"
              secureUrl={secureUrl}
              setSecureUrl={setSecureUrl}
            />
          </Form.Item>
          <Form.Item
            label="Tags"
            name="tags"
            initialValue={data?.tags?.join(",")} // Set initial value from the video data
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Delete Video"
        visible={deleteModalVisible}
        onOk={handleDelete}
        onCancel={closeDeleteModal}
        okText="DELETE"
        okType="danger"
      >
        <p>Are you sure you want to delete this video?</p>
      </Modal>
    </Section>
  );
};

export default VideoWatcher;
