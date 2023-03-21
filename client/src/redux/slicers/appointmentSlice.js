import { createSlice } from "@reduxjs/toolkit";

export const appointmentlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {
      hostUser: "64163374a2409176fff88fc2",
      name: "",
      email: "",
      message: "",
      appointmentDateTime: { date: "", time: "" },
    },
  },

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ
  reducers: {
    // setAppointment: (state, action) => {
    //   // state.appointment = action.payload;
    //   state.appointment = action.payload;
    //   state.appointment = action.payload;
    // },

    setFromCalendar: (state, action) => {
      state.appointment.appointmentDateTime = action.payload;
    },

    setFromForm: (state, action) => {
      console.log(action.payload.name);
      state.appointment.name = action.payload.name;
      state.appointment.email = action.payload.email;
      state.appointment.message = action.payload.message;
    },
  },
});

export const { setFromCalendar, setFromForm } = appointmentlice.actions;

export default appointmentlice.reducer;
