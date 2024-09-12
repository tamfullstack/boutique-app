import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedTrendingProduct: null,
};

const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    showPopup(state, { payload }) {
      state.selectedTrendingProduct = { ...payload.product };
    },

    hidePopup(state) {
      state.selectedTrendingProduct = null;
    },
  },
});

export const { showPopup, hidePopup } = popupSlice.actions;

const popupReducer = popupSlice.reducer;

export default popupReducer;
