import { createSlice } from "@reduxjs/toolkit";

export const appointmentlice = createSlice({
  name: "appointment",
  initialState: { appointment: {
    name: "",
    email: "",
    message: "",
    appointmentDateTime: { date: "", time: ""},
  }},

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ

  reducers: {
    setUser: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setUser } = appointmentlice.actions;

export default useSlice.reducer;
