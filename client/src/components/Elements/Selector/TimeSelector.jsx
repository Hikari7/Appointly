import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import moment from "moment" 

import { setFromCalendar } from '../../../redux/slicers/registerInfo'
import { useParams } from "react-router"
import userAppointmentApi from "../../../api/userAppointmentApi"

const TimeSelector = ({ timeArray, selectDate }) => {
  const [timeList, setTimeList] = useState([])
  const [selectedTime, setSlectedTime] = useState("")
  const dispatch = useDispatch()
  const uidFromParam = useParams()

  const formattedDate = moment(selectDate).format("MMM DD, YYYY")

  useEffect(() => {
    setSlectedTime("")
    fetchAppointmentList()
  }, [selectDate])

  useEffect(() => {
    fetchAppointmentList()
  }, [])

  // Create display array from props
  const timeArr = []
  timeArray.map(eachTimeObj => {
    const startTime = moment(`2023-03-31 ${eachTimeObj.start}`)
    const endTime = moment(`2023-03-31 ${eachTimeObj.end}`)
    let baseTime = startTime
    while(baseTime.format('HH:mm') !== endTime.format('HH:mm')){
      timeArr.push(baseTime.format('HH:mm'))
      baseTime.add(30, 'm')
    }
  })

  const fetchAppointmentList = async () => {
    try {
      const res = await userAppointmentApi.getAll(uidFromParam.uid)
      if(res.data.length > 0){
        const appoList = res.data.map(eachAppo => {
          return {bookedDateTime: eachAppo.appointmentDateTime}
        })
        // Remove time which already have appointment
        appoList.forEach(eachAppointment => {
          if(eachAppointment.bookedDateTime.date === selectDate){
            const filteredTimeArray = timeArr.filter(eachTime => {
              return eachTime !== eachAppointment.bookedDateTime.time 
            })
            setTimeList(filteredTimeArray)
          }else{
            setTimeList(timeArr)
          }
        })
      }else{
        setTimeList(timeArr)
      }

    } catch (error) {
      console.log(error);
    }    
  }
  

  const handleNext = () => {
    dispatch(setFromCalendar({date: selectDate, time: selectedTime}))
    setSlectedTime("")
  }

  return (
    <div className='flex flex-col justify-center md:w-[50%] my-5 md:text-xl'>
      <div className="flex flex-col justify-center items-center gap-5">
        <div className="flex flex-col md:w-full justify-center items-center">
          <div className="flex w-full items-center justify-center mb-2">
            <div className="w-[33%] md:w-[20%]">Date:</div>
            <div className="text-center w-[8rem] h-[1.9rem] py-.5 text-lg border border-gray-500 rounded md:text-xl">{formattedDate}</div>
          </div>
          <div className="flex w-full items-center justify-center">
            <div className="w-[33%] md:w-[20%]">Time:</div>
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