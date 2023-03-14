import { createSlice } from "@reduxjs/toolkit";

export const useInfoSlice = createSlice({
  name: "userInfo",
  initialState: { user: null },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = useInfoSlice.actions;

export default useInfoSlice.reducer;

//loginした時にDispatchでUserを書き換える
//(email, uid, uername)をストアする
