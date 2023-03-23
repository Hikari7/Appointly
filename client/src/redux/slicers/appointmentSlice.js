import { createSlice } from "@reduxjs/toolkit";

export const appointmentSlice = createSlice({
  name: "appointment",
  initialState: {
    appointment: {
      hostUser: "64163374a2409176fff88fc2",
      appointmentDateTime: { date: "", time: "" },
    },
  },

  //appointment.dateとかオブジェクトに入れて、それをaxiosを発動させるときにこのSliceを使っていくよ
  reducers: {
    setFromCalendar: (state, action) => {
      state.appointment.appointmentDateTime = action.payload;
<<<<<<< HEAD
    },

    // setFromForm: (state, action) => {
    //   console.log(action.payload.name);
    //   state.appointment.name = action.payload.name;
    //   state.appointment.email = action.payload.email;
    //   state.appointment.message = action.payload.message;
    // },
=======
    }
>>>>>>> f15e0c4de67201a3198d57285779cd2bf2f1ce64
  },
});

export const { setFromCalendar, setFromForm } = appointmentSlice.actions;

export default appointmentSlice.reducer;
