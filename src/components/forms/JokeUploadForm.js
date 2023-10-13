import React, { useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
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
`;

const FormContainer = styled.div`
  text-align: center;
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

const LoadingSpinner = styled(Spin)`
  margin: 20px 0;
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const JokeUploadComponent = () => {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const resetForm = () => {
    setContent("");
    setTags("");
    setIsSuccess(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!content) {
      setError("Content is required.");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      await apiCall("/jokes/", "POST", { content, tags: tags.split(",") });

      setIsLoading(false);
      setIsSuccess(true);
      message.success("Joke uploaded successfully!");
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading joke:", error);
      setError("An error occurred while uploading the joke.");
    }
  };

  return (
    <LoadingSpinner spinning={isLoading}>
      <FormContainer>
        <StyledForm>
          <FormTitle>Upload Your Joke</FormTitle>

          <StyledLabel>Content:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter your joke content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <StyledLabel>Tags:</StyledLabel>
          <StyledInput
            type="text"
            placeholder="Enter tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />

          {error && <ErrorText>{error}</ErrorText>}

          {isSuccess && (
            <SuccessMessage>Joke uploaded successfully!</SuccessMessage>
          )}

          <StyledButton disabled={isLoading} onClick={handleUpload}>
            {isLoading ? "Uploading..." : "Upload Joke"}
          </StyledButton>
        </StyledForm>
      </FormContainer>
    </LoadingSpinner>
  );
};

export default JokeUploadComponent;
