import { configureStore } from "@reduxjs/toolkit";

import activeTickerReducer from "../features/watch-list/activeTickerSlice";

import windowDimensionsReducer from "../features/window-dimensions/windowDimensionsSlice";

export default configureStore({
  reducer: {
    activeTicker: activeTickerReducer,
    windowDimensions: windowDimensionsReducer,
  },
});
