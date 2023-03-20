import { createSlice } from "@reduxjs/toolkit";

export const appointmentlice = createSlice({
  name: "appointment",
<<<<<<< HEAD
  initialState: { appointment: {
    name: "",
    email: "",
    message: "",
    appointmentDateTime: { date: "", time: ""},
  }},
=======
  initialState: {
    appointment: {
      name: "",
      email: "",
      date: "",
      message: "",
      hostAdmin: "",
    },
  },
>>>>>>> a40912b2ae5e55271a952ef2cfcb36c2b58d930f

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ
  reducers: {
    setAppointment: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setAppointment } = appointmentlice.actions;

export default appointmentlice.reducer;

