import { createSlice } from "@reduxjs/toolkit";

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    availability: [
        {Sun: false, time: []},
        {Mon: false, time: []},
        {Tue: false, time: []},
        {Wed: false, time: []},
        {Thu: false, time: []},
        {Fri: false, time: []},
        {Sat: false, time: []},
    ]
  },

  reducers: {
    setAvailability: (state, action) => {
        const targetDow = action.payload
        console.log(targetDow);
        console.log(state.availability);
        state.availability[targetDow] = !state.availability[targetDow]
        // state.availability.time.push(action.payload.time)
    }
  },
});

export const { setAvailability } = availabilitySlice.actions;

export default availabilitySlice.reducer;
