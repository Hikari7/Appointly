import { useEffect, useState, useContext } from 'react';
import { useDispatch } from "react-redux";

import moment from 'moment';

import { setTimeValue, setDailyAvailability } from '../../../redux/slicers/availabilitySlice'
import { TargetTime } from '../../User/DailyAvailability'

const TimeDropdown = ({ selectedItem, timeIndex, position, from, eachTimeObjIndex }) => {
    const dispatch = useDispatch()
    const { currentAvailbleTime, setCurrentAvailbleTime } = useContext(TargetTime) || {}
    const [startTimeStyle, setStartTimeStyle] = useState("")
    const [endTimeStyle, setEndTimeStyle] = useState("")

    useEffect(() => {
        if(from === "daily"){
            setStartTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-24.5%] z-50")
            setEndTimeStyle("flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-25%] z-50")
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
            const tempArray = currentAvailbleTime
            tempArray[eachTimeObjIndex][position] = time
            setCurrentAvailbleTime(tempArray)
            dispatch(setDailyAvailability({daily: tempArray}))
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