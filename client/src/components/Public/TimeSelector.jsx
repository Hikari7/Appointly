import moment from "moment" 
import { useState, useEffect } from "react"

const TimeSelector = ({ timeArray, selectDate }) => {
  const [selectedTime, setSlectedTime] = useState("")
  const [selectedDate, setSelectedDate] = useState(moment(selectDate).format('YYYY-MM-DD'))

  useEffect(() => {
    setSelectedDate(moment(selectDate).format('YYYY-MM-DD'))
    setSlectedTime("")
  }, [selectDate])

  return (
    <div id='timeSelect' className='flex flex-col justify-center w-1/2 md:w-1/3 mx-auto my-5'>
      <div className="flex flex-col justify-content items-center">
        <div className="flex items-center mb-2">
          <div className="w-[30%] mr-2">Date:</div>
          <div className="text-center w-[8rem] h-[1.9rem] py-.5 text-lg border border-gray-500 rounded">{selectedDate}</div>
        </div>
        <div className="flex items-center">
          <div className="w-[30%] mr-2">Time:</div>
          <div className="text-center w-[8rem] h-[1.9rem] py-.5 text-lg border border-gray-500 rounded">{selectedTime}</div>
        </div>
      </div>
      <div id='timeSelect' className='flex flex-col justify-center my-8 gap-5'>
        {timeArray && 
          timeArray.map((eachTime, index) => (
            <button onClick={() => setSlectedTime(eachTime)} key={index} className='py-1 px-3 border-2 border-green-400 rounded hover:bg-green-400 hover:text-white'>
              {eachTime}
            </button>
          ))        
        }
      </div>
    </div>
  )
}

export default TimeSelector