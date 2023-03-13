import { createSlice } from "@reduxjs/toolkit";

export const useInfoSlice = createSlice({
  name: "userInfo",
  initialState: { user: { role: "admin" } },
//   initialState: { user: { role: null } },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = useInfoSlice.actions;

export default useInfoSlice.reducer;
