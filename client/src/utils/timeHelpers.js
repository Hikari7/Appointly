import moment from 'moment';

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
