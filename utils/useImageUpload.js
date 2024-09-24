import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  const uploadImage = async (images, image_names, image_descriptions) => {
    if (!images) {
      setError("Please select both images before uploading.");
      return;
    }

    const formData = new FormData();

    formData.append("images", images);
    formData.append("image_names", image_names);
    formData.append("image_descriptions", image_descriptions);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://service.bestelectronics.com.bd//feature/api/upload-images/",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          },
        }
      );

      console.log(response?.data);
      
      setSuccessMessage("Images uploaded successfully!");
      setActiveTab("select");
    } catch (error) {
      console.error("Error uploading images:", error);
      setError("Error uploading images. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadImage,
    isUploading,
    uploadProgress,
    error,
    successMessage,
    activeTab,
    setActiveTab,
  };
};

export default useImageUpload;
