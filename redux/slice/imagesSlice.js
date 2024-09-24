import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedImages: [],
};

const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setSelectedImages: (state, action) => {
      state.selectedImages = action.payload;
    },
    addImage: (state, action) => {
      state.selectedImages.push(action.payload);
    },
    removeImage: (state, action) => {
      state.selectedImages = state.selectedImages.filter(
        (image) => image !== action.payload
      );
    },
  },
});

export const { setSelectedImages, addImage, removeImage } = imageSlice.actions;

export default imageSlice.reducer;
