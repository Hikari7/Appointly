import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {
      hostUser: "641e13400eec447fa1cd2aee",
      appointmentDateTime: [
        { date: "Mar.26", time: "11:00" },
        { date: "Mar.27", time: "11:00" },
      ],
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
