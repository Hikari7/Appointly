import { createSlice } from "@reduxjs/toolkit";

export const availabilitySlice = createSlice({
  name: "availability",
  initialState: {
    weekly: [
      {Sun: false, time: [{start: "", end: ""}]},
      {Mon: false, time: [{start: "", end: ""}]},
      {Tue: false, time: [{start: "", end: ""}]},
      {Wed: false, time: [{start: "", end: ""}]},
      {Thu: false, time: [{start: "", end: ""}]},
      {Fri: false, time: [{start: "", end: ""}]},
      {Sat: false, time: [{start: "", end: ""}]},
    ],
    daily: [{date: "", time: [{start: "", end: ""}]}]
  },

  reducers: {
    // After get user availability from db.
    setAvailability: (state, action) => {
      const prevAvailability = action.payload.weekly
      const prevAvailabilityDows = prevAvailability.map(eachObj => Object.keys(eachObj)[0])
      state.weekly.map(eachStateObj => {
        prevAvailabilityDows.forEach(eachDow => {
          if(eachStateObj[Object.keys(eachStateObj)[0]] === eachDow){
            eachStateObj = prevAvailability.find(eachPrevObj => eachPrevObj[eachDow] === eachDow)
          }else{
            return true
          }
        })
      })
      // state.daily = action.payload.daily
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
      if(targetTimePosition === "start"){
        state.weekly[targetDowObjIndex].time[timeIndex].start = time
      }else{
        state.weekly[targetDowObjIndex].time[timeIndex].end = time
      }
    },
    setDailyAvailabilityTime: (state, action) => {
      const { position, time, date } = action.payload
      const targetDate = state.daily.find(eachObj => eachObj.date === date)
      console.log(targetDate);
    }
  },
});

export const { setCheckBox, addNewTimeObj, deleteTimeObj, setTimeValue, setDailyAvailabilityTime } = availabilitySlice.actions;

export default availabilitySlice.reducer;
