import { CheckCircleOutlined, UploadOutlined } from "@ant-design/icons";
import { createContext, useEffect, useState } from "react";
import styled from "styled-components";
import { color } from "../../utils/color";

const CloudinaryScriptContext = createContext();

const StyledFileInputButton = styled.button`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px dashed ${color.secondary};
  border-radius: 5px;
  background-color: transparent;
  transition: border 0.3s;
  color: ${color.secondary};
  width: 100%;

  &:hover {
    border: 1px dashed #0056b3;
  }

  /* Add this CSS class to make the button green */
  &.green {
    border: 1px dashed #4caf50;
    color: #4caf50;
  }
`;

const UploadIcon = styled(UploadOutlined)`
  font-size: 24px;
`;

const FileInputText = styled.span`
  margin-left: 10px;
`;

function CloudinaryUploadWidget({ type, secureUrl, uwConfig, setSecureUrl }) {
  const [loaded, setLoaded] = useState(false);

  const label = { video: "Video", image: "Image" };

  useEffect(() => {
    if (!secureUrl) {
      const uwScript = document.getElementById("uw");
      if (!uwScript) {
        const script = document.createElement("script");
        script.setAttribute("async", "");
        script.setAttribute("id", "uw");
        script.src = "https://upload-widget.cloudinary.com/global/all.js";
        script.addEventListener("load", () => setLoaded(true));
        document.body.appendChild(script);
      } else {
        setLoaded(true);
      }
    }
  }, [loaded]);

  const initializeCloudinaryWidget = () => {
    if (!secureUrl) {
      var myWidget = window.cloudinary.createUploadWidget(
        uwConfig,
        (error, result) => {
          if (!error && result && result.event === "success") {
            setSecureUrl(result.info.secure_url);
          }
        }
      );

      document.getElementById("upload_widget").addEventListener(
        "click",
        function () {
          myWidget.open();
        },
        false
      );
    }
  };

  return (
    <CloudinaryScriptContext.Provider value={{ loaded }}>
      <StyledFileInputButton
        id="upload_widget"
        onClick={initializeCloudinaryWidget}
        className={secureUrl ? "green" : ""}
        disabled={secureUrl}
      >
        {secureUrl ? <CheckCircleOutlined /> : <UploadIcon />}
        <FileInputText>Upload {label[type]}</FileInputText>
      </StyledFileInputButton>
    </CloudinaryScriptContext.Provider>
  );
}

export default CloudinaryUploadWidget;
export { CloudinaryScriptContext };
