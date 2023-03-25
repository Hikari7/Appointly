import moment from 'moment';
import { useDispatch } from "react-redux";

import { setTimeValue } from '../../../redux/slicers/availbilitySlice'


const TimeDropdown = ({  selectedItem, timeIndex, position }) => {
    const dispatch = useDispatch()

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
        dispatch(setTimeValue({selectedItem, timeIndex, time}))
    }

    const startTimeStyle = "flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[-10%] z-50"
    const endTimeStyle = "flex flex-col bg-white m-4 px-1.5 border-2 border-green-400 rounded-lg w-fit h-[400%] overflow-y-scroll absolute top-[55%] left-[46%] z-50"

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