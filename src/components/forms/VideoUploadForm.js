import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { apiCall } from "../../utils/apiCall";
import { message } from "antd";
import Cloudinary from "../Cloudinary/Cloudinary";
import Stepper from "react-stepper-horizontal";

const StyledForm = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const FormContainer = styled.div`
  text-align: center;
`;

const FormContent = styled.div`
  padding: 20px;
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

const ErrorText = styled.p`
  color: red;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const SuccessMessage = styled.div`
  color: green;
  font-weight: bold;
  margin-top: 10px;
  text-align: center;
`;

const StyledStepper = styled(Stepper)`
  background-color: transparent;
`;

const StyledStepContent = styled.div`
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  width: 95%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #007bff;
  }
`;

const VideoUploadComponent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [videoSecureUrl, setVideoSecureUrl] = useState("");
  const [imageSecureUrl, setImageSecureUrl] = useState("");

  const titleRef = useRef();
  const descriptionRef = useRef();
  const tagsRef = useRef();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setVideoSecureUrl("");
    setImageSecureUrl("");
    setIsSuccess(false);
    setError("");
  };

  const handleUpload = async () => {
    if (!title || !videoSecureUrl || !imageSecureUrl) {
      setError("Title, Video and Image are required.");
      return;
    }

    setError("");
    setIsLoading(true);
    try {
      const object = {
        title: title,
        tags: tags.split(","),
        url: videoSecureUrl,
        thumbnail: imageSecureUrl,
        description: description,
      };

      await apiCall("/videos/", "POST", object);

      setIsLoading(false);
      setIsSuccess(true);
      message.success("Video posted successfully!");
      resetForm();
    } catch (error) {
      setIsLoading(false);
      console.error("Error uploading image:", error);
      setError("An error occurred while uploading the image.");
    }
  };

  const Step1 = () => (
    <StyledStepContent>
      <StyledLabel>Title:</StyledLabel>
      <StyledInput
        type="text"
        placeholder="Enter title"
        value={title}
        ref={titleRef}
        onChange={(e) => {
          setTitle(e.target.value);
          titleRef.current.focus();
        }}
      />
  
      <StyledLabel>Description:</StyledLabel>
      <StyledInput
        placeholder="Enter your video description"
        value={description}
        ref={descriptionRef}
        onChange={(e) => setDescription(e.target.value)}
      />
  
      <StyledLabel>Tags:</StyledLabel>
      <StyledInput
        type="text"
        placeholder="Enter tags (comma separated)"
        ref={tagsRef}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
    </StyledStepContent>
  );
  

  useEffect(() => {
    if (title) titleRef.current.focus();
  }, [title]);

  useEffect(() => {
    if (description) descriptionRef.current.focus();
  }, [description]);

  useEffect(() => {
    if (tags) tagsRef.current.focus();
  }, [tags]);

  const Step2 = () => (
    <StyledStepContent>
      <StyledLabel>Upload Video:</StyledLabel>
      <Cloudinary
        secureUrl={videoSecureUrl}
        setSecureUrl={setVideoSecureUrl}
        type="video"
      />
    </StyledStepContent>
  );

  const Step3 = () => (
    <StyledStepContent>
      <StyledLabel>Upload Thumbnail:</StyledLabel>
      <Cloudinary
        secureUrl={imageSecureUrl}
        setSecureUrl={setImageSecureUrl}
        type="image"
      />
    </StyledStepContent>
  );

  const steps = [
    { title: "Step 1", content: <Step1 /> },
    { title: "Step 2", content: <Step2 /> },
    { title: "Step 3", content: <Step3 /> },
  ];
  return (
    <FormContainer>
      <StyledStepper
        steps={steps}
        activeStep={activeStep}
        activeColor={"#007bff"}
        completeColor={"#4caf50"}
      />
      <StyledForm>
        {steps[activeStep].content}
        <StyledButtonContainer>
          {activeStep !== 0 && (
            <StyledButtonReset disabled={isLoading} onClick={handlePrev}>
              Previous
            </StyledButtonReset>
          )}
          {activeStep !== steps.length - 1 && (
            <StyledButtonUpload disabled={isLoading} onClick={handleNext}>
              Next
            </StyledButtonUpload>
          )}
          {activeStep === steps.length - 1 && (
            <StyledButtonUpload disabled={isLoading} onClick={handleUpload}>
              {isLoading ? "Uploading..." : "Upload"}
            </StyledButtonUpload>
          )}
        </StyledButtonContainer>
        {error && <ErrorText>{error}</ErrorText>}
        {isSuccess && (
          <SuccessMessage>Video uploaded successfully!</SuccessMessage>
        )}
      </StyledForm>
    </FormContainer>
  );
};

export default VideoUploadComponent;
