import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../redux/slicers/userSlice";
import appointmentInfoReducer from "../redux/slicers/appointmentSlice";

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    appointment: appointmentInfoReducer,
  },
});
