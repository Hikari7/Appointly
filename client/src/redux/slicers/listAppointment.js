import { createSlice } from "@reduxjs/toolkit";

export const listAppointmentSlice = createSlice({
  name: "listAppointment",
  initialState: {
    listAppointment: [
      {
        name: "test",
        email: "test@test.com",
        message: "test",
        appointmentDateTime: {date: "2023-3-22", time: "11:00"}
      }
    ],
  },
  reducers: {
    setListAppointment: (state, action) => {
      state.listAppointment = action.payload
    },
  },
});

export const { setListAppointment } = listAppointmentSlice.actions;

export default listAppointmentSlice.reducer;
