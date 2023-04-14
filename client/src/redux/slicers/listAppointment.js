import { createSlice } from "@reduxjs/toolkit";

export const listAppointmentSlice = createSlice({
  name: "listAppointment",
  initialState: { listAppointment: [] },

  reducers: {
    setListAppointment: (state, action) => {
      state.listAppointment = action.payload;
    },
    updateAppointment: (state, action) => {
      const { meetingId, dateTime } = action.payload
      const targetMtgIndex = state.listAppointment.findIndex(e => e._id === meetingId)
      state.listAppointment[targetMtgIndex].appointmentDateTime = dateTime
    }
  },
});

export const { setListAppointment, updateAppointment } = listAppointmentSlice.actions;

export default listAppointmentSlice.reducer;
