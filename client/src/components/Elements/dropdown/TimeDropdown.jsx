import { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";

import moment from 'moment';

import { setTimeValue, setDailyAvailabilityTime } from '../../../redux/slicers/availbilitySlice'

const TimeDropdown = ({ selectedItem, timeIndex, position, from, date }) => {
    const dispatch = useDispatch()
    const [startTimeStyle, setStartTimeStyle] = useState("")
    const [endTimeStyle, setEndTimeStyle] = useState("")

    useEffect(() => {
        if(from === "daily"){
            setStartTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-6.5%] z-50")
            setEndTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[31%] z-50")
        }else{
            setStartTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-25%] z-50")
            setEndTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-25%] z-50")
        }
    }, [])

    //Create selectable time array
    const timeArr = []
    let baseTime = moment('2023-03-20 00:00')
    while(baseTime.format('HH:mm') !== "23:00"){
        timeArr.push(baseTime.format('HH:mm'))
        baseTime.add(30, 'm')
        if(baseTime.format('HH:mm') === "23:00"){
            timeArr.push("23:00")
            timeArr.push("23:30")
        }
    }

    const handleSetTime = (time) => {
        if(from === "weekly"){
            dispatch(setTimeValue({selectedItem, timeIndex, time}))
        }else{
            dispatch(setDailyAvailabilityTime({position, time, date, timeIndex}))
        }
    }

  return (
    <div className={position === "start"? startTimeStyle: endTimeStyle}>
    {timeArr && timeArr.map((eachTime, index) => (
        <div onClick={() => handleSetTime(eachTime)} key={index} className='p-1 hover:bg-gray-200 rounded-lg'>
            {eachTime}
        </div>
    ))}
    </div>
  )
}

export default TimeDropdown