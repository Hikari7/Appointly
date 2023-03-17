import { createSlice } from "@reduxjs/toolkit";

export const appointmentlice = createSlice({
  name: "appointment",
  initialState: { appointment: null },

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ

  reducers: {
    setUser: (state, action) => {
      state.appointment = action.payload;
    },
  },
});

export const { setUser } = appointmentlice.actions;

export default useSlice.reducer;
