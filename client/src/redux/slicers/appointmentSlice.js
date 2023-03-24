import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {
      hostUser: "64163374a2409176fff88fc2",
      appointmentDateTime: { date: "", time: "" },
    },
  },

  reducers: {
    setFromCalendar: (state, action) => {
      state.appointment.appointmentDateTime = action.payload;
    },
  },
});

export const {
  setFromCalendar,
  // setFromForm
} = appointmentSlice.actions;

export default appointmentSlice.reducer;
