import { createSlice } from "@reduxjs/toolkit";

export const appointmentlice = createSlice({
  name: "appointment",

  initialState: {
    appointment: {
      userId: "",
      name: "",
      email: "",
      message: "",
      appointmentDateTime: { date: "", time: "" },
    },
  },

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appointmentlice.actions;

export default appointmentlice.reducer;
