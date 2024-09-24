"use client";
import GalleryUploadModal from "@/components/global/modal/GalleryUploadModal";
import ImageUploadModal from "@/components/global/modal/ImageUploadModal ";
import { useState } from "react";

const ImageUploadComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold my-6">Image Manager </h1>
      <button
        className="bg-[#f26522] text-white py-2 px-4 rounded"
        onClick={openModal}
      >
        Open Image Manager
      </button>

      <ImageUploadModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ImageUploadComponent;
