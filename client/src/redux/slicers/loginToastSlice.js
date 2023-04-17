import { createSlice } from "@reduxjs/toolkit";

export const loginToastSlice = createSlice({
  name: "loginToast",
  initialState: { isLogined: false },

  reducers: {
    setLoginToast: (state, action) => {
      state.isLogined = action.payload;
    },
    
  },
});

export const { setLoginToast } = loginToastSlice.actions;

export default loginToastSlice.reducer;
