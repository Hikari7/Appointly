import { useState, useEffect } from 'react'
import { HashLink } from "react-router-hash-link"

import moment from 'moment';

import { createCalendar, getNextMonth, getPrevMonth } from "../../utils/calenderHelpers";
import TimeAvailability from './TimeAvailability';

const DailyAvailability = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(currentDate.format("YYYY-MM")) 
    const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
    const [selectedDate, setSlectedDate] = useState(new Date())
    const [currentAvailbleTime, setCurrentAvailbleTime] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [selectedItem, setSelectedItem] = useState("")

    useEffect(() => {
      setCalendarDate(createCalendar(currentDate))
    }, [currentDate])


    const today = moment()
    const year = currentDate.get('year')
    const month = currentDate.format('MMM')
    const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const weeklyAvailability = [
      {dow: "1", time: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"]},
      {dow: "2", time: ["09:30", "10:00", "10:30", "11:00"]},
      {dow: "3", time: ["09:30", "10:00", "10:30", "12:00"]},
      {dow: "4", time: ["09:30", "10:00", "10:30", "11:00"]},
      {dow: "5", time: ["09:00", "09:30", "10:00", "11:00"]},
    ]

    const availableDowArr = []
    weeklyAvailability.map(e => availableDowArr.push(e.dow))
    
    const handleChangeMonth = (direction) => {
      if(direction === "next"){
        setCurrentDate(moment(getNextMonth(currentDate)._d))
        setCurrentMonth(moment(getNextMonth(currentDate)._d).format("YYYY-MM"))
      }else{
        setCurrentDate(moment(getPrevMonth(currentDate)._d))
        setCurrentMonth(moment(getPrevMonth(currentDate)._d).format("YYYY-MM"))
      }
    }

    const handleClickDate = (date, timeArray) => {
      setIsOpen(true)
      setSlectedDate(date)
      setCurrentAvailbleTime(timeArray)
      setSelectedItem(date)
    }

  return (
    <div className='flex flex-col m-10 md:flex-row md:justify-center'>
        <div className='md:w-1/3 p-5'>
          <div className="flex justify-between items-center mb-5">
            <svg onClick={() => handleChangeMonth("prev")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className='text-2xl md:text-3xl text-bold'>{`${year} ${month}`}</div>
            <svg onClick={() => handleChangeMonth("next")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className='flex justify-around mb-10'>
            {dow.map((item, index) => <div key={index} className='text-sm md:text-base'>{item}</div>)}
          </div>
          {calendarData && 
            calendarData.map((week, index) => (
              <div key={index} className="flex h-12 md:text-xl">
                {week.map((day, weekIndex) => {
                  if(moment(`${day.month}-${day.date}`).isBefore(today.format("YYYY-MM-DD")) | currentMonth !== day.month){              
                    return (
                      <div key={weekIndex} className='flex-1 flex justify-center items-center'>
                        <div className="text-center text-gray-300">{day.date}</div>
                      </div>
                    )
                  }else if(moment(`${day.month}-${day.date}`)._i === today.format("YYYY-MM-DD")){
                    return (
                      <div key={weekIndex} className='flex-1 flex justify-center items-center'>
                        <div className="text-center font-bold text-green-400 rounded-full">{day.date}</div>
                      </div>
                    ) 
                  }else if(availableDowArr.includes(moment(`${day.month}-${day.date}`).format('d'))){
                    const timeArray = weeklyAvailability.filter(e => e.dow === String(moment(`${day.month}-${day.date}`).format('d')))
                    return (
                      selectedItem === `${day.month}-${day.date}`
                        ? (<div onClick={() => handleClickDate(`${day.month}-${day.date}`, timeArray[0].time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                            <div className="text-center w-[1.5rem] h-[1.5rem] bg-green-200 rounded-full">{day.date}</div>
                          </div>)
                        : (<div onClick={() => handleClickDate(`${day.month}-${day.date}`, timeArray[0].time)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                            <div className="text-center">{day.date}</div>
                          </div>)  
                    )
                  }else{
                    return (
                      selectedItem === `${day.month}-${day.date}`
                        ? (<div onClick={() => handleClickDate(`${day.month}-${day.date}`)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                            <div className="text-center w-[1.5rem] h-[1.5rem] bg-green-200 rounded-full">{day.date}</div>
                          </div>)
                        : (<div onClick={() => handleClickDate(`${day.month}-${day.date}`)} key={weekIndex} id={`${day.month}-${day.date}`} className="flex-1 flex justify-center items-center">
                            <div className="text-center">{day.date}</div>
                          </div>)  
                  )}
                })}
              </div>
            ))
          }
          <hr className='mt-5 md:hidden'/>
        </div>
        {isOpen && <TimeAvailability timeArray={currentAvailbleTime} selectDate={selectedDate} /> }
      </div>
  )
}

export default DailyAvailability