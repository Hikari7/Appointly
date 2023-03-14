import { configureStore } from "@reduxjs/toolkit";

import useInfoReducer from "../redux/slicers/userInfoSlice";

export const store = configureStore({
  reducer: {
    userInfo: useInfoReducer,
  },
});
