import { configureStore } from "@reduxjs/toolkit";

import useInfoReducer from "../redux/slicers/userSlice";

export const store = configureStore({
  reducer: {
    userInfo: useInfoReducer,
  },
});
