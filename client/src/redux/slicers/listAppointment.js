import { createSlice } from "@reduxjs/toolkit";

export const listAppointmentSlice = createSlice({
  name: "listAppointment",
  initialState: { listAppointment: [] },

  reducers: {
    setListAppointment: (state, action) => {
      state.listAppointment = action.payload;
    },
  },
});

export const { setListAppointment } = listAppointmentSlice.actions;

export default listAppointmentSlice.reducer;
