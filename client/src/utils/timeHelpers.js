import moment from 'moment';

export const setAvailability = () => {
    
}

export const defaultTime = () => {
    let defaultStartTiem = moment('2023-3-15 09:00')
    const defaultTimes = []
    
    while (defaultStartTiem.format('HH:mm') !== "17:30") {
        defaultTimes.push(defaultStartTiem.format('HH:mm'))
        defaultStartTiem.add(30, 'm')
    }

    return defaultTimes
}

export const customiseDefaultTime = (startTime, endTime) => {
    let defaultStartTiem = moment(`2023-3-15 ${startTime}`)
    let setEndTimeCondition = moment(`2023-3-15 ${endTime}`).add(30, 'm')
    const defaultTimes = []

    while (defaultStartTiem.format('HH:mm') !== setEndTimeCondition.format('HH:mm')) {
        defaultTimes.push(defaultStartTiem.format('HH:mm'))
        defaultStartTiem.add(30, 'm')
    }

    return defaultTimes
}


const availability = [
    {mon: {number: 1, time: ["09:00", "09:30", "10:00", "10:30", "11:00"]}},
    {tue: {number: 2, time: ["09:00", "09:30", "10:00", "10:30", "11:00"]}},
    {wed: {number: 3, time: ["09:00", "09:30", "10:00", "10:30", "11:00"]}},
    {thu: {number: 4, time: ["09:00", "09:30", "10:00", "10:30", "11:00"]}},
    {fri: {number: 5, time: ["09:00", "09:30", "10:00", "10:30", "11:00"]}},
  ]