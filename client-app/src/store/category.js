import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedCategory: "",
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    selectCategory(state, { payload }) {
      state.selectedCategory = payload.category.toLowerCase();
    },
  },
});

export const { selectCategory } = categorySlice.actions;

const categoryReducer = categorySlice.reducer;

export default categoryReducer;
