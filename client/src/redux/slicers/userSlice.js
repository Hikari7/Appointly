import { createSlice } from "@reduxjs/toolkit";

export const useSlice = createSlice({
  name: "user",
  // initialState: { user: null },

  // initialState: { user: "test"},

  initialState: {
    user: {
      email: "test@test.com",
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MWNkMzFkNzg2OGZhY2Y3YWNkMjk5OCIsImlhdCI6MTY3OTYxMDgzOCwiZXhwIjoxNjc5Njk3MjM4fQ.A0a0nZPh5yPli65FMVcU9kD_ddxYa1X0BO9cb7d2AZc",
      userId: "641cd31d7868facf7acd2998",
      username: "testetst",
    },
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = useSlice.actions;

export default useSlice.reducer;

//loginした時にDispatchでUserを書き換える
//(email, uid, uername)をストアする
