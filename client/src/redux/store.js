import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../redux/slicers/userSlice";
import appointmentInfoReducer from "../redux/slicers/appointmentSlice";
import availabilityReducer from "../redux/slicers/availbilitySlice";

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    appointment: appointmentInfoReducer,
    availability: availabilityReducer
  },
});
