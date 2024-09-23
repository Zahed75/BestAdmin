"use client";
import { useState, useEffect } from "react";
import useImageUpload from "@/utils/useImageUpload";
import Image from "next/image";
import axios from "axios";

const ImageUploadModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState("upload");
  const [featureFile, setFeatureFile] = useState(null);
  const [productFile, setProductFile] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const [allImages, setAllImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    uploadImage,
    isUploading,
    uploadProgress,
    error: uploadError,
    successMessage,
  } = useImageUpload();

  useEffect(() => {
    if (isOpen) {
      fetchImages();
    }
  }, [isOpen]);

  const fetchImages = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("https://via.placeholder.com/300x200"); // Replace with your API URL
      setAllImages(response.data); // Assuming response contains an array of images
    } catch (err) {
      setError("Failed to fetch images. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFeatureFileChange = (e) => {
    setFeatureFile(e.target.files[0]);
  };

  const handleProductFileChange = (e) => {
    setProductFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadImage(featureFile, productFile);
  };

  const handleImageSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const imgList = [
    {
      id: 1,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 2,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 3,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 4,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 5,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 6,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 7,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 8,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 9,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
    {
      id: 10,
      src: "https://via.placeholder.com/300x200",
      selected: false,
    },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl shadow-lg overflow-y-auto max-h-[80vh] md:mx-10 mx-4 lg:max-w-6xl lg:px-10 scrollbar_hidden">
            {/* Increased size and added max height */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-700">
                Upload or Select Images
              </h2>
              <button
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            {/* Tab Switcher */}
            <div className="flex justify-center mb-6">
              <button
                className={`py-2 px-6 text-sm font-semibold ${
                  activeTab === "upload"
                    ? "text-white bg-[#f26522]"
                    : "text-gray-700 bg-gray-200"
                } rounded-l-md focus:outline-0 duration-700 ease-in-out`}
                onClick={() => setActiveTab("upload")}
              >
                Upload Images
              </button>
              <button
                className={`py-2 px-6 text-sm font-semibold ${
                  activeTab === "select"
                    ? "text-white bg-[#f26522]"
                    : "text-gray-700 bg-gray-200"
                } rounded-r-md focus:outline-0 duration-700 ease-in-out`}
                onClick={() => setActiveTab("select")}
              >
                Select Images
              </button>
            </div>
            {/* Content Based on Tab */}
            {activeTab === "upload" && (
              <form onSubmit={handleSubmit}>
                <div
                  className="relative w-[400px] rounded-lg p-6 flex items-center justify-center cursor-pointer min-h-[50vh] mx-auto"
                  id="dropzone"
                >
                  <input
                    type="file"
                    className="absolute inset-0 w-full opacity-0 z-50"
                  />
                  <div className="text-center">
                    <img
                      className="mx-auto h-12 w-12 text-[#f26522]"
                      src="https://www.svgrepo.com/show/357902/image-upload.svg"
                      alt="pngLogo"
                    />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer"
                      >
                        <span>Drag and drop</span>
                        <span className="text-[#f26522]"> or browse</span>
                        <span> to upload</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                        />
                      </label>
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      PNG, JPG, JPEG up to 10MB
                    </p>
                  </div>
                  <img
                    src=""
                    className="mt-4 mx-auto max-h-40 hidden"
                    id="preview"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isUploading}
                  className="bg-[#f26522] text-white text-lg py-2 px-4 rounded-lg mt-4 focus:outline-none transition ease-in-out duration-200 flex ml-auto"
                >
                  {isUploading ? "Uploading..." : "Upload Images"}
                </button>

                {isUploading && (
                  <p className="mt-4 text-gray-600">
                    Upload Progress: {uploadProgress}%
                  </p>
                )}
                {uploadError && (
                  <p className="mt-4 text-red-500">{uploadError}</p>
                )}
                {successMessage && (
                  <p className="mt-4 text-green-500">{successMessage}</p>
                )}
              </form>
            )}
        
            {activeTab === "select" && (
              <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto min-h-[60vh] scrollbar_hidden`}>
                {imgList.map((image) => (
                  <div key={image.id} className="relative">
                    <img
                      src={image.src}
                      alt="Uploaded"
                      className={`w-full h-32 object-cover rounded-lg shadow-sm cursor-pointer ${selectedImages.includes(image.id) ? "border-2 border-[#f26522]" : ""}`}
                      onClick={() => handleImageSelect(image.id)}
                    />
                    {selectedImages.includes(image.id) && (
                      <div className="absolute top-0 right-0 bg-[#f26522] text-white p-1 h-6 w-6 flex items-center justify-center rounded-full">
                        <span className="text-sm">✔</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUploadModal;
