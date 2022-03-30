import { configureStore } from "@reduxjs/toolkit";

import activeTickerReducer from "../features/sidePanel/activeTickerSlice";

export default configureStore({
  reducer: {
    activeTicker: activeTickerReducer,
  },
});
