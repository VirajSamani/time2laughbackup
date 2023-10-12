import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import { UploadOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";

const StyledForm = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const FormTitle = styled.h2`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
  color: #333;
  text-align: left;
`;

const StyledButton = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s;

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }

  &:hover {
    background-color: #0056b3;
  }
`;

const FormContainer = styled.div`
  text-align: center;
`;

const StyledFileInputButton = styled.label`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px dashed #007bff;
  border-radius: 5px;
  background-color: transparent;
  transition: border 0.3s;
  color: #007bff;

  &:hover {
    border: 1px dashed #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const FileInputText = styled.span`
  margin-left: 10px;
`;

const UploadIcon = styled(UploadOutlined)`
  font-size: 24px;
`;

const LoadingSpinner = styled(Spin)`
  margin: 20px 0;
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const VideoUploadComponent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Disable video input after selecting a file
    const videoInput = document.getElementById("videoInput");
    if (videoInput) videoInput.disabled = !!videoFile;
  }, [videoFile]);

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setVideoFile(null);
    setThumbnailFile(null);
    setIsSuccess(false);
    setError("");
  };

  const handleVideoUpload = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleThumbnailUpload = (event) => {
    const file = event.target.files[0];
    setThumbnailFile(file);
  };

  const handleUpload = async () => {
    if (!title || !videoFile || !thumbnailFile) {
      setError("Title, Video, and Thumbnail are required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("fileData", videoFile);
      formData.append("fileData", thumbnailFile);

      await apiCall("/videos/", "POST", formData);

      setIsLoading(false);
      setIsSuccess(true);
      message.success("Video uploaded successfully!");
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading video:", error);
      setError("An error occurred while uploading the video.");
    }
  };

  return (
    <LoadingSpinner spinning={isLoading}>
      <FormContainer>
        <StyledForm>
          <FormTitle>Upload Your Video</FormTitle>

          <StyledLabel>Title:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <StyledLabel>Description:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <StyledLabel>Tags:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <div>
            <StyledFileInputButton>
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoUpload}
                id="videoInput"
                style={{ display: "none" }}
              />
              <UploadIcon />
              <FileInputText>Upload Video</FileInputText>
            </StyledFileInputButton>
          </div>
          <div>
            <StyledFileInputButton>
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailUpload}
                style={{ display: "none" }}
              />
              <UploadIcon />
              <FileInputText>Upload Thumbnail</FileInputText>
            </StyledFileInputButton>
          </div>

          {error && <ErrorText>{error}</ErrorText>}

          {isSuccess && (
            <SuccessMessage>Video uploaded successfully!</SuccessMessage>
          )}

          <StyledButton disabled={isLoading} onClick={handleUpload}>
            {isLoading ? "Uploading..." : "Upload Video"}
          </StyledButton>
        </StyledForm>
      </FormContainer>
    </LoadingSpinner>
  );
};

export default VideoUploadComponent;
