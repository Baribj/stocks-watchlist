import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  height: "0px",
  width: "0px",
};

export const windowDimensionsSlice = createSlice({
  name: "windowDimensions",
  initialState,
  reducers: {
    getDimensions: (state, { payload }) => {
      state.height = payload.height;
      state.width = payload.width;
    },
  },
});

export const { getDimensions } = windowDimensionsSlice.actions;

export const windowDimensions = (state) => state.windowDimensions;

export default windowDimensionsSlice.reducer;
