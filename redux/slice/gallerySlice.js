import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImages: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
    addGalleryImage: (state, action) => {
      state.selectedImages.push(action.payload);
    },
    removeGalleryImage: (state, action) => {
      state.selectedImages = state.selectedImages.filter(
        (image) => image !== action.payload
      );
    },
  },
});

export const { setSelectedImages, addGalleryImage, removeGalleryImage } = gallerySlice.actions;

export default gallerySlice.reducer;