import moment from "moment" 
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import { Link } from "react-router-dom"
import { setFromCalendar } from '../../redux/slicers/appointmentSlice'

const TimeSelector = ({ timeArray, selectDate }) => {
  const [timeList, setTimeList] = useState([])
  const [selectedTime, setSlectedTime] = useState("")
  const dispatch = useDispatch()

  const appointment = [
    {bookedDateTime: {date: "2023-03-27", time: "10:00"}},
    {bookedDateTime: {date: "2023-03-28", time: "10:00"}},
    {bookedDateTime: {date: "2023-03-29", time: "10:00"}}
  ]

  useEffect(() => {
    setSlectedTime("")
    setTimeList(timeArray)
    appointment.forEach(eachAppointment => {
      if(eachAppointment.bookedDateTime.date === selectDate){
        const filteredTimeArray = timeArray.filter(eachTime => {
          return eachTime !== eachAppointment.bookedDateTime.time 
        })
        setTimeList(filteredTimeArray)
      }else{
        return true
      }
    })
  }, [selectDate])

  const handleNext = () => {
    dispatch(setFromCalendar({date: selectDate, time: selectedTime}))
    setSlectedTime("")
  }

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
        <Link to={"../guestform"}>
          <button 
            
            onClick={handleNext}
            className="md:text-2xl bg-green-400 text-white rounded-lg px-4 py-1 md:h-[2.5rem] disabled:opacity-30"
            disabled={!(selectDate && selectedTime)}
          >
            Next
          </button>

        </Link>
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