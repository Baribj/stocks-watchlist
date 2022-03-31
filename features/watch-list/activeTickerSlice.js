import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ticker: "",
};

export const activeTickerSlice = createSlice({
  name: "activeTicker",
  initialState,
  reducers: {
    selectActive: (state, { payload }) => {
      state.ticker = payload;
    },
  },
});

export const { selectActive } = activeTickerSlice.actions;

export const selectedTicker = (state) => state.activeTicker.ticker;

export default activeTickerSlice.reducer;
