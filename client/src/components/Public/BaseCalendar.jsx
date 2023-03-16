import { useEffect, useState } from 'react';
import { HashLink } from "react-router-hash-link"

import moment from 'moment';

import { createCalendar, getNextMonth, getPrevMonth } from "../../utils/calenderHelpers";
import TimeSelector from './TimeSelector';

const BaseCalendar = () => {
    const [currentDate, setCurrentDate] = useState(moment());
    const [currentMonth, setCurrentMonth] = useState(currentDate.format("YYYY-MM")) 
    const [calendarData, setCalendarDate] = useState(createCalendar(currentDate));
    const [selectedDate, setSlectedDate] = useState(new Date())
    const [displayTime, setDisplayTime] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    const availability = [
      {1: ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30"]},
      {2: ["09:30", "10:00", "10:30", "11:00"]},
      {3: ["10:00", "09:30", "10:30", "11:00"]},
      {4: ["10:30", "09:30", "10:00", "11:00"]},
      {5: ["11:00", "09:30", "10:00", "10:30"]},
    ]

    const availableDow = []
    availability.map(eachDow => {
      if(Object.values(eachDow)[0].length > 0){
        availableDow.push(Object.keys(eachDow)[0])
      }
    })
    // console.log(availableDow);

    useEffect(() => {
      setCalendarDate(createCalendar(currentDate))
    }, [currentDate])

    const today = moment()
    const year = currentDate.get('year')
    const month = currentDate.format('MMM')
    const dow = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
    
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
      setDisplayTime(Object.values(timeArray[0])[0])
    }

    return (
      <div className='flex flex-col md:flex-row'>
        <div className='md:w-1/2 p-10'>
          <div className="flex justify-between items-center mb-5">
            <svg onClick={() => handleChangeMonth("prev")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <div className='text-2xl text-bold'>{`${year} ${month}`}</div>
            <svg onClick={() => handleChangeMonth("next")} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </div>
          <div className='flex justify-around mb-10'>
            {dow.map((item, index) => <div key={index} className='text-sm'>{item}</div>)}
          </div>
          {calendarData && 
            calendarData.map((week, index) => (
              <div key={index} className="flex h-12">
                {week.map((day, index) => {
                  if(currentMonth !== day.month){              
                    return (
                      <div key={index} className='flex-1 flex justify-center items-center'>
                        <div className="text-center text-gray-300">{day.date}</div>
                      </div>
                    )
                  }else if(moment(`${day.month}-${day.date}`)._i === today.format("YYYY-MM-DD")){
                    return (
                      <div key={index} className='flex-1 flex justify-center items-center'>
                        <div className="text-center font-bold text-green-400 rounded-full">{day.date}</div>
                      </div>
                    ) 
                  }else if(availableDow.includes(moment(`${day.month}-${day.date}`).format('d'))){
                    // Get target available time
                    const timeArray = availability.filter(e => Object.keys(e)[0] === String(moment(`${day.month}-${day.date}`).format('d')))
                    return (
                      <div key={index} className='flex-1 flex justify-center items-center relative group'>
                        <div className='flex justify-center items-center w-[2rem] h-[2rem] md:w-10 md:h-10 bg-green-200 rounded-full group-hover:bg-green-400'>
                          <HashLink smooth to="#timeSelect" onClick={() => handleClickDate(`${day.month}-${day.date}`, timeArray)} className="text-center z-50">{day.date}</HashLink>
                        </div>
                      </div>
                    )  
                  }else{
                    return (
                      <div key={index} className='flex-1 flex justify-center items-center'>
                        <div className="text-center">{day.date}</div>
                      </div>
                    )  
                  }
                })}
              </div>
            ))
          }
          <hr className='mt-5'/>
        </div>
        {isOpen && <TimeSelector timeArray={displayTime} selectDate={selectedDate} /> }
      </div>
    )
}

export default BaseCalendar

// https://reffect.co.jp/vue/javascript-vue-js-create-calendar
