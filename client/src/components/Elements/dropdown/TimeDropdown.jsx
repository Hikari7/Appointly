import { useState } from "react"
import moment from 'moment';

const TimeDropdown = () => {
    //Create selectable time array
    const timeArr = []
    let baseTime = moment('2023-03-20 00:00')
    while(baseTime.format('HH:mm') !== "23:30"){
        timeArr.push(baseTime.format('HH:mm'))
        baseTime.add(30, 'm')
        if(baseTime.format('HH:mm') === "23:00"){
            timeArr.push("23:30")
        }
    }

  return (
    <div className='flex flex-col bg-white m-4 px-2 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] -left-[7%]'>
    {timeArr && timeArr.map((eachTime, index) => (
        <div key={index} className='p-1'>
            {eachTime}
        </div>
    ))}
    </div>
  )
}

export default TimeDropdown