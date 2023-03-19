import moment from "moment" 
import { useState, useEffect } from "react"

const TimeSelector = ({ timeArray, selectDate }) => {
  const [timeList, setTimeList] = useState(timeArray)
  const [selectedTime, setSlectedTime] = useState("")

  const appointment = [
    {bookedDateTime: {date: "2023-03-20", time: "10:00"}},
    {bookedDateTime: {date: "2023-03-21", time: "11:00"}}
  ]

  useEffect(() => {
    setSlectedTime("")
    setTimeList(timeArray)
    appointment.forEach(eachAppointment => {
      if(eachAppointment.bookedDateTime.date === selectDate){
        const filteredTimeArray = timeList.filter(eachTime => {
          // console.log(eachTime);
          // console.log(eachAppointment.bookedDateTime.time);
          return eachTime !== eachAppointment.bookedDateTime.time 
        })
        setTimeList(filteredTimeArray)
      }
    })
  }, [selectDate])

  return (
    <div id='timeSelect' className='flex flex-col justify-center md:w-[40%] my-5 md:text-xl'>
      <div className="flex justify-center items-center gap-5">
        <div className="flex flex-col md:w-1/2 justify-content items-baseline">
          <div className="flex w-full items-center mb-2">
            <div className="w-[33%]">Date:</div>
            <div className="text-center w-[8rem] h-[1.9rem] py-.5 text-lg border border-gray-500 rounded md:text-xl">{selectDate}</div>
          </div>
          <div className="flex w-full items-center">
            <div className="w-[33%]">Time:</div>
            <div className="text-center w-[8rem] h-[1.9rem] py-.5 text-lg border border-gray-500 rounded md:text-xl">{selectedTime}</div>
          </div>
        </div>
        <button className="md:text-2xl bg-green-400 text-white rounded-lg px-4 py-1 md:h-[2.5rem]">
          Next
        </button>
      </div>
      <div id='timeSelect' className='flex flex-col justify-center items-center my-8 gap-5'>
        {timeList && 
          timeList.map((eachTime, index) => (
            <button onClick={() => setSlectedTime(eachTime)} key={index} className='py-1 w-[70%] md:w-[60%] border-2 border-green-400 rounded hover:bg-green-400 hover:text-white'>
              {eachTime}
            </button>
          ))        
        }
      </div>
    </div>
  )
}

export default TimeSelector