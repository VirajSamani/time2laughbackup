import { useState } from "react";
import CloudinaryUploadWidget from "./CloudinaryUploadWidget";

export default function Cloudinary({ type, secureUrl, setSecureUrl }) {
  const [cloudName] = useState("dsylorgbb");
  const [uploadPreset] = useState("zha2racy");

  const [uwConfig] = useState({
    cloudName,
    uploadPreset,
    sources: ["local"],
    resource_type: type,
  });

  return (
    <CloudinaryUploadWidget
      type={type}
      uwConfig={uwConfig}
      secureUrl={secureUrl}
      setSecureUrl={setSecureUrl}
    />
  );
}
