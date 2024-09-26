import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedGalleryImages: [],
};

const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    setSelectedGalleryImages: (state, action) => {
      state.selectedGalleryImages = action.payload;
    },
    addGalleryImage: (state, action) => {
      state.selectedGalleryImages.push(action.payload);
    },
    removeGalleryImage: (state, action) => {
      state.selectedGalleryImages = state.selectedGalleryImages.filter(
        (image) => image !== action.payload
      );
    },
  },
});

export const { setSelectedGalleryImages, addGalleryImage, removeGalleryImage } = gallerySlice.actions;

export default gallerySlice.reducer;