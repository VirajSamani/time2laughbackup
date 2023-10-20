import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import { UploadOutlined } from "@ant-design/icons";
import { Spin, message } from "antd";
import Cloudinary from "../Cloudinary/Cloudinary";
import { color } from "../../utils/color";
import TextArea from "antd/es/input/TextArea";

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

const StyledButtonUpload = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  background-color: ${color.secondary};
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

const StyledButtonReset = styled.button`
  padding: 10px 30px;
  border-radius: 5px;
  background-color: #0f0f0f;
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

const StyledButtons = styled.div`
  padding: 10px 0px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledTextArea = styled(TextArea)`
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
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

const PostUploadComponent = () => {
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [secureUrl, setSecureUrl] = useState("");

  const resetForm = () => {
    setTitle("");
    setTags("");
    setSecureUrl("");
    setIsSuccess(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!title || !secureUrl) {
      setError("Title and Image are required.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const object = { content: title, tags: tags.split(","), url: secureUrl };

      await apiCall("/posts/", "POST", object);

      setIsLoading(false);
      setIsSuccess(true);
      message.success("Image uploaded successfully!");
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image:", error);
      setError("An error occurred while uploading the image.");
    }
  };

  return (
    <LoadingSpinner spinning={isLoading}>
      <FormContainer>
        <StyledForm>
          <FormTitle>Upload Your Post</FormTitle>

          <StyledLabel>Content:</StyledLabel>
          <StyledTextArea 
            type="text"
            placeholder="Enter your post content"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <StyledLabel>Tags:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          <StyledLabel>Post Image:</StyledLabel>
          <Cloudinary
            secureUrl={secureUrl}
            setSecureUrl={setSecureUrl}
            type="image"
          />

          {error && <ErrorText>{error}</ErrorText>}

          {isSuccess && (
            <SuccessMessage>Image uploaded successfully!</SuccessMessage>
          )}

          <StyledButtons>
            <StyledButtonUpload disabled={isLoading} onClick={handleUpload}>
              {isLoading ? "Uploading..." : "Upload"}
            </StyledButtonUpload>
            <StyledButtonReset disabled={isLoading} onClick={resetForm}>
              {isLoading ? "Uploading..." : "Reset"}
            </StyledButtonReset>
          </StyledButtons>
        </StyledForm>
      </FormContainer>
    </LoadingSpinner>
  );
};

export default PostUploadComponent;
