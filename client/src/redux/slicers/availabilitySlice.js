import { createSlice } from "@reduxjs/toolkit";

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    weekly: [
      {Sun: false, time: [{start: "", end: ""}], dow: 0},
      {Mon: false, time: [{start: "", end: ""}], dow: 1},
      {Tue: false, time: [{start: "", end: ""}], dow: 2},
      {Wed: false, time: [{start: "", end: ""}], dow: 3},
      {Thu: false, time: [{start: "", end: ""}], dow: 4},
      {Fri: false, time: [{start: "", end: ""}], dow: 5},
      {Sat: false, time: [{start: "", end: ""}], dow: 6},
    ],
    daily: [{date: "", time: [{start: "", end: ""}]}]
  },

  reducers: {
    // After get user availability from db.
    setAvailability: (state, action) => {
      state.weekly = action.payload.weekly
      state.daily = action.payload.daily
    },
    setDailyAvailability: (state, action) => {
      state.daily.push(action.payload.daily)
    },
    setCheckBox: (state, action) => {
      const targetObjIndex = state.weekly.findIndex(eachDow => Object.keys(eachDow)[0] === action.payload)
      state.weekly[targetObjIndex][action.payload] = !(state.weekly[targetObjIndex][action.payload])
      if(state.weekly[targetObjIndex][action.payload]){
        //If checkbox is true, add initial time obj.
        state.weekly[targetObjIndex].time = [{start: "09:00", end: "17:00"}]
      }else{
        //If checkbox is false, reset the time array.
        state.weekly[targetObjIndex].time = [{start: "", end: ""}]
      }
    },
    addNewTimeObj: (state, action) => {
      const timeObj = {start: "", end: ""}
      const targetObjIndex = state.weekly.findIndex(eachObj => Object.keys(eachObj)[0] === action.payload)
      state.weekly[targetObjIndex].time.push(timeObj)
    },
    deleteTimeObj: (state, action) => {
      const targetObjIndex = state.weekly.findIndex(eachObj => Object.keys(eachObj)[0] === action.payload.dow)
      state.weekly[targetObjIndex].time = action.payload.filterdTimeArr
      if(action.payload.filterdTimeArr.length === 0){
        state.weekly[targetObjIndex][action.payload.dow] = false
        state.weekly[targetObjIndex].time = [{start: "", end: ""}]
      } 

      // const targetObjIndex = state.weekly.findIndex(eachObj => Object.keys(eachObj)[0] === action.payload.dow)
      // const filteredArr = state.weekly[targetObjIndex].time.filter(elem => elem !== action.payload.data)
      // state.weekly[targetObjIndex].time = filteredArr
    },
    setTimeValue: (state, action) => {
      const { selectedItem, timeIndex, time } = action.payload
      const targetDow = selectedItem.split('+')[0]
      const targetTimePosition = selectedItem.split('+')[1]
      const targetDowObjIndex = state.weekly.findIndex(eachDow => Object.keys(eachDow)[0] === targetDow)
      state.weekly[targetDowObjIndex].time[timeIndex][targetTimePosition] = time
    },
    // setUnavailable: (state, action) => {

    // },
  },
});

export const { 
  setAvailability,
  setCheckBox,
  addNewTimeObj,
  deleteTimeObj,
  setTimeValue,
  setDailyAvailability,
} = availabilitySlice.actions;

export default availabilitySlice.reducer;
