import { configureStore } from "@reduxjs/toolkit";

import userInfoReducer from "../redux/slicers/userSlice";
import registerInfoReducer from "../redux/slicers/registerInfo";
import availabilityReducer from "../redux/slicers/availbilitySlice";
import listAppointmentReducer from "./slicers/listAppointment";

export const store = configureStore({
  reducer: {
    user: userInfoReducer,
    appointment: registerInfoReducer,
    availability: availabilityReducer,
    listAppointment: listAppointmentReducer
  },
});
