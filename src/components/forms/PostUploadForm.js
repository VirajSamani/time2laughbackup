import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";
import { Cloudinary } from "@cloudinary/url-gen";

export default function PostUploadForm() {
  const [cloudName] = useState("dsylorgbb");
  const [uploadPreset] = useState("zha2racy");
  const [secureUrl, setSecureUrl] = useState("");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
  });

  console.log(secureUrl);

  return (
    <CloudinaryUploadWidget
      uwConfig={uwConfig}
      setSecureUrl={setSecureUrl}
    />
  );
}
