import { useState } from "react";
import axios from "axios";

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const uploadImage = async (featureFile, productFile) => {
    if (!featureFile || !productFile) {
      setError("Please select both images before uploading.");
      return;
    }

    const formData = new FormData();

    formData.append("featureImage", featureFile);
    formData.append("productImage", productFile);

    setIsUploading(true);
    setError(null);

    try {
      const response = await axios.post(
        "https://service.bestelectronics.com.bd/feature/api/add-product/",
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

      setSuccessMessage("Images uploaded successfully!");
      console.log(response.data);
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
  };
};

export default useImageUpload;
