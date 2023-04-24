import { createSlice } from "@reduxjs/toolkit";

export const registerInfoSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {
      appointmentDateTime: {},
    },
  },

  reducers: {
    setFromCalendar: (state, action) => {
      state.appointment.appointmentDateTime = action.payload;
    }
  },
});

export const {
  setFromCalendar,
} = registerInfoSlice.actions;

export default registerInfoSlice.reducer;
